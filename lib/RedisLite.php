<?php
/**
 * RedisLite class - Production-ready Redis-like interface for SQLite
 *
 * @author Artur Heinze <artur@agentejo.com>
 * @version 2.0.0
 * @license MIT
 */
class RedisLite {

    /**
     * @var string
     */
    protected string $path;

    /**
     * @var ?\PDO
     */
    protected ?\PDO $connection;

    /**
     * @var string
     */
    protected string $table;

    /**
     * @var int
     */
    protected int $transactionDepth = 0;

    /**
     * @var int
     */
    protected int $savepointCounter = 0;

    /**
     * @var int
     */
    protected int $maxRetries = 3;

    /**
     * @var int
     */
    protected int $retryDelay = 100000; // microseconds

    /**
     * @var ?callable
     */
    protected $errorHandler = null;

    /**
     * @var array
     */
    protected array $preparedStatements = [];

    /**
     * @var int
     */
    protected int $maxKeyLength = 255;

    /**
     * @var int
     */
    protected int $maxValueSize = 10485760; // 10MB default

    /**
     * @var int
     */
    protected int $chunkSize = 900;

    /**
     * Constructor
     *
     * @param string $path
     * @param array  $options
     * @throws \InvalidArgumentException
     * @throws \PDOException
     */
    public function __construct(string $path = ':memory:', array $options = []) {

        $options = array_merge([
            'table' => 'redislite',
            'max_retries' => 3,
            'retry_delay' => 100000,
            'max_key_length' => 255,
            'max_value_size' => 10485760,
            'error_handler' => null,
            'chunk_size' => 900,
            \PDO::ATTR_TIMEOUT => 5,
            \PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION,
        ], $options);

        // Validate table name to prevent SQL injection
        if (!preg_match('/^[a-zA-Z][a-zA-Z0-9_]{0,63}$/', $options['table'])) {
            throw new \InvalidArgumentException('Invalid table name. Must start with letter, contain only alphanumeric and underscore, max 64 chars');
        }

        // Validate path
        if ($path !== ':memory:') {
            $dir = dirname($path);
            if (!is_dir($dir)) {
                throw new \InvalidArgumentException("Directory does not exist: {$dir}");
            }
            if (!is_writable($dir)) {
                throw new \InvalidArgumentException("Directory is not writable: {$dir}");
            }
        }

        $this->path = $path;
        $this->table = $options['table'];
        $this->maxRetries = (int)$options['max_retries'];
        $this->retryDelay = (int)$options['retry_delay'];
        $this->maxKeyLength = (int)$options['max_key_length'];
        $this->maxValueSize = (int)$options['max_value_size'];
        $this->errorHandler = $options['error_handler'];
        $this->chunkSize = (int)$options['chunk_size'];
        // Clamp chunkSize to safe range for SQLite parameter limit
        $this->chunkSize = max(1, min(900, $this->chunkSize));

        try {
            $dsn = "sqlite:{$path}";

            // Filter PDO options (only integer keys) and set safe defaults
            $pdoOptions = array_filter($options, 'is_int', ARRAY_FILTER_USE_KEY) + [
                \PDO::ATTR_ERRMODE          => \PDO::ERRMODE_EXCEPTION,
                \PDO::ATTR_EMULATE_PREPARES => false,
                \PDO::ATTR_TIMEOUT          => $options[\PDO::ATTR_TIMEOUT] ?? 5,
            ];

            $this->connection = new \PDO($dsn, null, null, $pdoOptions);

            // Enable foreign keys for data integrity
            $this->connection->exec("PRAGMA foreign_keys = ON");

            // SQLite optimizations with validated options
            $pragma = [
                'journal_mode'  => $options['journal_mode'] ?? 'WAL',
                'temp_store'  => $options['temp_store'] ?? 'MEMORY',
                'journal_size_limit' => $options['journal_size_limit'] ?? '27103364',
                'synchronous'   => $options['synchronous'] ?? 'NORMAL',
                'mmap_size'     => $options['mmap_size'] ?? '134217728',
                'cache_size'    => $options['cache_size'] ?? '-20000',
                'page_size'     => $options['page_size'] ?? '8192',
                'busy_timeout'  => $options['busy_timeout'] ?? '5000',
                'auto_vacuum'  => $options['auto_vacuum'] ?? 'INCREMENTAL',
                'wal_autocheckpoint' => $options['wal_autocheckpoint'] ?? '1000',
            ];

            foreach ($pragma as $key => $value) {
                // Validate pragma values
                $value = $this->sanitizePragmaValue($key, $value);
                $this->connection->exec("PRAGMA {$key} = {$value}");
            }

            // Check if table exists
            $stmt = $this->connection->prepare("SELECT name FROM sqlite_master WHERE type='table' AND name=:table");
            $stmt->execute(['table' => $this->table]);
            $table = $stmt->fetch(\PDO::FETCH_ASSOC);
            $stmt->closeCursor();

            if (!isset($table['name'])) {
                $this->createTable();
            }

            // Prepare commonly used statements
            $this->prepareStatements();

        } catch (\PDOException $e) {
            $this->handleError($e);
            throw new \RuntimeException('Failed to initialize RedisLite: ' . $e->getMessage(), 0, $e);
        }
    }

    /**
     * Sanitize pragma values to prevent injection
     */
    protected function sanitizePragmaValue(string $key, mixed $value): string {
        $numericPragmas = ['journal_size_limit', 'mmap_size', 'cache_size', 'page_size', 'busy_timeout', 'wal_autocheckpoint'];
        $enumPragmas = [
            'journal_mode' => ['DELETE', 'TRUNCATE', 'PERSIST', 'MEMORY', 'WAL', 'OFF'],
            'temp_store' => ['DEFAULT', 'FILE', 'MEMORY'],
            'synchronous' => ['OFF', 'NORMAL', 'FULL', 'EXTRA'],
            'auto_vacuum' => ['NONE', 'FULL', 'INCREMENTAL'],
        ];

        if (in_array($key, $numericPragmas)) {
            if (!is_numeric($value)) {
                throw new \InvalidArgumentException("Invalid numeric value for PRAGMA {$key}");
            }
            return (string)$value;
        }

        if (isset($enumPragmas[$key])) {
            $value = strtoupper($value);
            if (!in_array($value, $enumPragmas[$key])) {
                throw new \InvalidArgumentException("Invalid value '{$value}' for PRAGMA {$key}");
            }
            return $value;
        }

        return (string)$value;
    }

    /**
     * Create the storage table
     */
    protected function createTable(): void {
        $sql = "
            CREATE TABLE {$this->table} (
                key VARCHAR({$this->maxKeyLength}) PRIMARY KEY,
                keyval TEXT NOT NULL CHECK (json_valid(keyval)),
                created_at INTEGER DEFAULT (strftime('%s', 'now')),
                updated_at INTEGER DEFAULT (strftime('%s', 'now')),
                expires_at INTEGER DEFAULT NULL,
                CHECK (length(key) > 0 AND length(key) <= {$this->maxKeyLength})
            ) WITHOUT ROWID
        ";
        $this->connection->exec($sql);

        // Create indexes for performance
        $this->connection->exec("CREATE INDEX idx_{$this->table}_expires ON {$this->table}(expires_at) WHERE expires_at IS NOT NULL");

    }

    /**
     * Prepare commonly used statements
     */
    protected function prepareStatements(): void {
        // Core operations
        $this->preparedStatements['get'] = $this->connection->prepare(
            "SELECT keyval, expires_at FROM {$this->table} WHERE key = :key LIMIT 1"
        );

        $this->preparedStatements['delete'] = $this->connection->prepare(
            "DELETE FROM {$this->table} WHERE key = :key"
        );

        // UPSERT for set operations - clear expires_at on normal set
        $this->preparedStatements['upsert'] = $this->connection->prepare(
            "INSERT INTO {$this->table} (key, keyval, expires_at) VALUES (:key, :value, NULL)
             ON CONFLICT(key) DO UPDATE SET keyval = :value, updated_at = strftime('%s', 'now'), expires_at = NULL"
        );

        // Insert for setnx
        $this->preparedStatements['insert'] = $this->connection->prepare(
            "INSERT INTO {$this->table} (key, keyval) VALUES (:key, :value)"
        );

        // TTL-aware operations (require :now parameter)
        $this->preparedStatements['exists'] = $this->connection->prepare(
            "SELECT 1 FROM {$this->table} WHERE key = :key AND (expires_at IS NULL OR expires_at > :now) LIMIT 1"
        );

        $this->preparedStatements['ttl'] = $this->connection->prepare(
            "SELECT expires_at FROM {$this->table} WHERE key = :key LIMIT 1"
        );

        $this->preparedStatements['expire'] = $this->connection->prepare(
            "UPDATE {$this->table} SET expires_at = :expires_at WHERE key = :key AND (expires_at IS NULL OR expires_at > :now)"
        );

        $this->preparedStatements['persist'] = $this->connection->prepare(
            "UPDATE {$this->table} SET expires_at = NULL WHERE key = :key AND expires_at IS NOT NULL AND expires_at > :now"
        );

        // Race-safe deletion of expired keys
        $this->preparedStatements['delete_if_expired'] = $this->connection->prepare(
            "DELETE FROM {$this->table} WHERE key = :key AND expires_at IS NOT NULL AND expires_at <= :now"
        );

        $this->preparedStatements['dbsize'] = $this->connection->prepare(
            "SELECT COUNT(*) FROM {$this->table} WHERE expires_at IS NULL OR expires_at > :now"
        );

        $this->preparedStatements['keys_all'] = $this->connection->prepare(
            "SELECT key FROM {$this->table} WHERE expires_at IS NULL OR expires_at > :now"
        );

        $this->preparedStatements['keys_pattern'] = $this->connection->prepare(
            "SELECT key FROM {$this->table} WHERE key LIKE :pattern ESCAPE '\\' AND (expires_at IS NULL OR expires_at > :now)"
        );
    }

    /**
     * Validate key
     */
    protected function validateKey(string $key): void {
        if (empty($key)) {
            throw new \InvalidArgumentException('Key cannot be empty');
        }

        if (strlen($key) > $this->maxKeyLength) {
            throw new \InvalidArgumentException("Key exceeds maximum length of {$this->maxKeyLength}");
        }

        // Check for null bytes
        if (strpos($key, "\0") !== false) {
            throw new \InvalidArgumentException('Key cannot contain null bytes');
        }
    }

    /**
     * Validate value size
     */
    protected function validateValue(string $jsonValue): void {
        if (strlen($jsonValue) > $this->maxValueSize) {
            throw new \InvalidArgumentException("Value exceeds maximum size of {$this->maxValueSize} bytes");
        }
    }

    /**
     * Execute with retry logic
     */
    protected function executeWithRetry(callable $operation, string $operationName = 'operation'): mixed {
        $lastException = null;

        for ($attempt = 1; $attempt <= $this->maxRetries; $attempt++) {
            try {
                return $operation();
            } catch (\PDOException $e) {
                $lastException = $e;

                // Don't retry if not recoverable or on last attempt
                if (!$this->isRecoverableError($e) || $attempt === $this->maxRetries) {
                    break;
                }

                // True exponential backoff with jitter
                $sleep = (int)($this->retryDelay * (2 ** ($attempt - 1)) + random_int(0, 1000));
                usleep($sleep);
            }
        }

        $this->handleError($lastException);
        throw new \RuntimeException("Failed to execute {$operationName} after {$this->maxRetries} attempts", 0, $lastException);
    }

    /**
     * Get current timestamp (allows test stubbing)
     */
    protected function now(): int {
        return time();
    }

    /**
     * Check if error is recoverable
     */
    protected function isRecoverableError(\PDOException $e): bool {
        // Use SQLite error codes for reliability
        if (!isset($e->errorInfo[1])) {
            return false;
        }

        // Mask to primary code (handle extended codes like SQLITE_BUSY_SNAPSHOT=517)
        $primary = ((int)$e->errorInfo[1]) & 0xFF;
        // SQLITE_BUSY (5) or SQLITE_LOCKED (6)
        return $primary === 5 || $primary === 6;
    }

    /**
     * Check if error is a constraint violation
     */
    protected function isConstraintViolation(\PDOException $e): bool {
        // SQLSTATE 23000 with SQLite driver code 19 (SQLITE_CONSTRAINT)
        return isset($e->errorInfo[0], $e->errorInfo[1]) &&
               $e->errorInfo[0] === '23000' &&
               (int)$e->errorInfo[1] === 19;
    }

    /**
     * Handle errors
     */
    protected function handleError(\Exception $e): void {
        if ($this->errorHandler !== null && is_callable($this->errorHandler)) {
            call_user_func($this->errorHandler, $e);
        }
    }

    /**
     * Get value for specific key
     *
     * @param  string $key
     * @param  mixed $default
     * @return mixed
     * @throws \InvalidArgumentException
     */
    public function get(string $key, mixed $default = false): mixed {
        $this->validateKey($key);

        return $this->executeWithRetry(function() use ($key, $default) {
            $stmt = $this->preparedStatements['get'] ?? $this->connection->prepare(
                "SELECT keyval, expires_at FROM {$this->table} WHERE key = :key LIMIT 1"
            );

            $stmt->execute(['key' => $key]);
            $res = $stmt->fetch(\PDO::FETCH_ASSOC);
            $stmt->closeCursor();

            if ($res === false) {
                return $default;
            }

            // Check if expired
            if ($res['expires_at'] !== null && $this->now() > (int)$res['expires_at']) {
                // Race-safe deletion - only delete if still expired
                $stmtDel = $this->preparedStatements['delete_if_expired'] ?? $this->connection->prepare(
                    "DELETE FROM {$this->table} WHERE key = :key AND expires_at IS NOT NULL AND expires_at <= :now"
                );
                $stmtDel->execute(['key' => $key, 'now' => $this->now()]);
                return $default;
            }

            try {
                $decoded = json_decode($res['keyval'], true, 512, JSON_THROW_ON_ERROR | JSON_BIGINT_AS_STRING);
                return $decoded;
            } catch (\JsonException $e) {
                $this->handleError($e);
                return $default;
            }
        }, 'get');
    }

    /**
     * Get multiple values
     *
     * @param array $keys
     * @return array Array of values in same order as keys
     */
    public function mget(array $keys): array {
        if (empty($keys)) {
            return [];
        }

        // Validate all keys first
        foreach ($keys as $key) {
            $this->validateKey($key);
        }

        return $this->executeWithRetry(function() use ($keys) {
            // Preserve order
            $results = array_fill_keys($keys, null);

            // Process in chunks to avoid SQLite's ~999 parameter limit
            foreach (array_chunk($keys, $this->chunkSize) as $chunk) {
                $placeholders = rtrim(str_repeat('?,', count($chunk)), ',');
                $sql = "SELECT key, keyval, expires_at FROM {$this->table} WHERE key IN ({$placeholders})";

                $stmt = $this->connection->prepare($sql);
                $stmt->execute($chunk);

                $now = $this->now();
                $expired = [];

                while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)) {
                    // Check if expired
                    if ($row['expires_at'] !== null && $now > (int)$row['expires_at']) {
                        $expired[] = $row['key']; // Track for cleanup
                        continue;
                    }

                    try {
                        $results[$row['key']] = json_decode($row['keyval'], true, 512, JSON_THROW_ON_ERROR | JSON_BIGINT_AS_STRING);
                    } catch (\JsonException) {
                        $results[$row['key']] = null;
                    }
                }
                $stmt->closeCursor();

                // Race-safe deletion of expired keys
                if (!empty($expired)) {
                    $phDel = implode(',', array_fill(0, count($expired), '?'));
                    $sqlDel = "DELETE FROM {$this->table} WHERE key IN ({$phDel}) AND expires_at IS NOT NULL AND expires_at <= ?";
                    $delStmt = $this->connection->prepare($sqlDel);
                    $params = array_merge($expired, [$now]);
                    $delStmt->execute($params);
                }
            }

            // Return values in original order
            return array_map(fn($k) => $results[$k] ?? null, $keys);
        }, 'mget');
    }

    /**
     * Set multiple key/value pairs
     *
     * @param array $keyValues Associative array of key => value
     * @return bool Always returns true
     */
    public function mset(array $keyValues): bool {
        if (empty($keyValues)) {
            return true;
        }

        // Validate all keys first
        foreach (array_keys($keyValues) as $key) {
            $this->validateKey($key);
        }

        return $this->executeWithRetry(function() use ($keyValues) {
            $this->beginTransaction();

            try {
                // Use prepared statement for batch insert/update - clear TTL on update (match SET)
                $stmt = $this->connection->prepare(
                    "INSERT INTO {$this->table} (key, keyval, expires_at) VALUES (:key, :value, NULL)
                     ON CONFLICT(key) DO UPDATE SET
                         keyval = :value,
                         updated_at = strftime('%s', 'now'),
                         expires_at = NULL"
                );

                foreach ($keyValues as $key => $value) {
                    $jsonValue = json_encode($value,
                        JSON_THROW_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_PRESERVE_ZERO_FRACTION
                    );

                    $this->validateValue($jsonValue);

                    $stmt->execute([
                        'key' => $key,
                        'value' => $jsonValue
                    ]);
                }

                $this->commit();
                return true;

            } catch (\Exception $e) {
                $this->rollback();
                throw $e;
            }
        }, 'mset');
    }

    /**
     * Set multiple key/value pairs only if none exist
     *
     * @param array $keyValues Associative array of key => value
     * @return bool True if all keys were set, false if any key exists
     */
    public function msetnx(array $keyValues): bool {
        if (empty($keyValues)) {
            return true;
        }

        // Validate all keys first
        foreach (array_keys($keyValues) as $key) {
            $this->validateKey($key);
        }

        return $this->executeWithRetry(function() use ($keyValues) {
            $this->beginTransaction();

            try {
                // Use INSERT (not UPSERT) to ensure atomicity
                // If any key exists, the UNIQUE constraint will fail
                $stmt = $this->preparedStatements['insert'] ?? $this->connection->prepare(
                    "INSERT INTO {$this->table} (key, keyval) VALUES (:key, :value)"
                );

                foreach ($keyValues as $key => $value) {
                    $jsonValue = json_encode($value,
                        JSON_THROW_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_PRESERVE_ZERO_FRACTION
                    );

                    $this->validateValue($jsonValue);

                    $stmt->execute([
                        'key' => $key,
                        'value' => $jsonValue
                    ]);
                }

                $this->commit();
                return true;

            } catch (\PDOException $e) {
                $this->rollback();

                // Check if it's a unique constraint violation (key exists)
                if ($this->isConstraintViolation($e)) {
                    return false; // At least one key exists
                }

                // Re-throw other errors
                throw $e;

            } catch (\Exception $e) {
                $this->rollback();
                throw $e;
            }
        }, 'msetnx');
    }

    /**
     * Set value for specific key
     *
     * @param  string $key
     * @param  mixed $value
     * @throws \InvalidArgumentException
     * @throws \RuntimeException
     */
    public function set(string $key, mixed $value): void {
        $this->validateKey($key);

        $this->executeWithRetry(function() use ($key, $value) {
            try {
                $jsonValue = json_encode($value,
                    JSON_THROW_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_PRESERVE_ZERO_FRACTION
                );

                $this->validateValue($jsonValue);

                // Use prepared UPSERT statement for better performance - always clear expires_at
                $stmt = $this->preparedStatements['upsert'] ?? $this->connection->prepare(
                    "INSERT INTO {$this->table} (key, keyval, expires_at) VALUES (:key, :value, NULL)
                     ON CONFLICT(key) DO UPDATE SET keyval = :value, updated_at = strftime('%s', 'now'), expires_at = NULL"
                );

                $stmt->execute([
                    'key' => $key,
                    'value' => $jsonValue
                ]);

            } catch (\JsonException $e) {
                throw new \RuntimeException('Failed to encode value as JSON: ' . $e->getMessage(), 0, $e);
            }
        }, 'set');
    }

    /**
     * Internal method to update value while preserving TTL
     *
     * @param string $key
     * @param mixed $value
     * @return void
     */
    protected function updateValue(string $key, mixed $value): void {
        $this->executeWithRetry(function() use ($key, $value) {
            try {
                $jsonValue = json_encode($value,
                    JSON_THROW_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_PRESERVE_ZERO_FRACTION
                );

                $this->validateValue($jsonValue);

                // Update while preserving expires_at
                $stmt = $this->connection->prepare(
                    "UPDATE {$this->table}
                     SET keyval = :value, updated_at = strftime('%s', 'now')
                     WHERE key = :key"
                );

                $stmt->execute([
                    'key' => $key,
                    'value' => $jsonValue
                ]);

                // If no rows updated, key doesn't exist - create it
                if ($stmt->rowCount() === 0) {
                    $this->set($key, $value);
                }

            } catch (\JsonException $e) {
                throw new \RuntimeException('Failed to encode value as JSON: ' . $e->getMessage(), 0, $e);
            }
        }, 'updateValue');
    }

    /**
     * Get old value and set new value atomically
     *
     * @param string $key
     * @param mixed $value
     * @return mixed The old value, or null if key didn't exist
     */
    public function getset(string $key, mixed $value): mixed {
        $this->validateKey($key);

        return $this->executeWithRetry(function() use ($key, $value) {
            return $this->transaction(function() use ($key, $value) {
                $oldValue = $this->get($key, null);

                // Preserve TTL if key exists (Redis behavior)
                if ($oldValue !== null) {
                    $this->updateValue($key, $value);
                } else {
                    $this->set($key, $value);
                }

                return $oldValue;
            });
        }, 'getset');
    }

    /**
     * Set value only if key does not exist
     *
     * @param string $key
     * @param mixed $value
     * @return bool True if key was set, false if key already exists
     */
    public function setnx(string $key, mixed $value): bool {
        $this->validateKey($key);

        return $this->executeWithRetry(function() use ($key, $value) {
            try {
                $jsonValue = json_encode($value,
                    JSON_THROW_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_PRESERVE_ZERO_FRACTION
                );

                $this->validateValue($jsonValue);

                // Use prepared INSERT statement for better performance
                $stmt = $this->preparedStatements['insert'] ?? $this->connection->prepare(
                    "INSERT INTO {$this->table} (key, keyval) VALUES (:key, :value)"
                );

                $stmt->execute([
                    'key' => $key,
                    'value' => $jsonValue
                ]);

                return true;

            } catch (\PDOException $e) {
                // Key already exists (UNIQUE constraint violation)
                if ($this->isConstraintViolation($e)) {
                    return false;
                }
                throw $e;
            } catch (\JsonException $e) {
                throw new \RuntimeException('Failed to encode value as JSON: ' . $e->getMessage(), 0, $e);
            }
        }, 'setnx');
    }

    /**
     * Set value with expiration (TTL)
     * Redis API: setex($key, $ttl, $value)
     *
     * @param string $key
     * @param int $ttl Time to live in seconds
     * @param mixed $value
     */
    public function setex(string $key, int $ttl, mixed $value): void {
        if ($ttl <= 0) {
            throw new \InvalidArgumentException('TTL must be positive');
        }

        $this->validateKey($key);
        $expires_at = $this->now() + $ttl;

        $this->executeWithRetry(function() use ($key, $value, $expires_at) {
            try {
                $jsonValue = json_encode($value,
                    JSON_THROW_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_PRESERVE_ZERO_FRACTION
                );

                $this->validateValue($jsonValue);

                // UPSERT with expiration
                $stmt = $this->connection->prepare(
                    "INSERT INTO {$this->table} (key, keyval, expires_at) VALUES (:key, :value, :expires_at)
                     ON CONFLICT(key) DO UPDATE SET keyval = :value, updated_at = strftime('%s', 'now'), expires_at = :expires_at"
                );

                $stmt->execute([
                    'key' => $key,
                    'value' => $jsonValue,
                    'expires_at' => $expires_at
                ]);

            } catch (\JsonException $e) {
                throw new \RuntimeException('Failed to encode value as JSON: ' . $e->getMessage(), 0, $e);
            }
        }, 'setex');
    }

    /**
     * Set value with expiration in milliseconds
     * Redis API: psetex($key, $ttl_ms, $value)
     *
     * @param string $key
     * @param int $ttl Time to live in milliseconds
     * @param mixed $value
     */
    public function psetex(string $key, int $ttl, mixed $value): void {
        if ($ttl <= 0) {
            throw new \InvalidArgumentException('TTL must be positive');
        }

        // Convert milliseconds to seconds (ceiling to avoid premature expiration)
        $ttl_seconds = (int)ceil($ttl / 1000);
        $this->setex($key, $ttl_seconds, $value);
    }

    /**
     * Get value and delete key atomically
     * Redis API: getdel($key)
     *
     * @param string $key
     * @return mixed The value or null if key doesn't exist
     */
    public function getdel(string $key): mixed {
        $this->validateKey($key);

        return $this->executeWithRetry(function() use ($key) {
            return $this->transaction(function() use ($key) {
                $value = $this->get($key, null);
                if ($value !== null) {
                    $this->del($key);
                }
                return $value;
            });
        }, 'getdel');
    }

    /**
     * Get remaining TTL for a key
     *
     * @param string $key
     * @return int TTL in seconds, -2 if key doesn't exist, -1 if no TTL
     */
    public function ttl(string $key): int {
        $this->validateKey($key);

        return $this->executeWithRetry(function() use ($key) {
            $stmt = $this->preparedStatements['ttl'];
            $stmt->execute(['key' => $key]);
            $res = $stmt->fetch(\PDO::FETCH_ASSOC);
            $stmt->closeCursor();

            if ($res === false) {
                return -2; // Key doesn't exist
            }

            if ($res['expires_at'] === null) {
                return -1; // Key exists but no TTL
            }

            $now = $this->now();
            $remaining = (int)$res['expires_at'] - $now;
            if ($remaining <= 0) {
                // Race-safe deletion instead of del()
                $stmtDel = $this->preparedStatements['delete_if_expired'];
                $stmtDel->execute(['key' => $key, 'now' => $now]);
                return -2;
            }

            return $remaining;
        }, 'ttl');
    }

    /**
     * Remove TTL from key (persist)
     *
     * @param string $key
     * @return bool True if TTL was removed, false if key doesn't exist or has no TTL
     */
    public function persist(string $key): bool {
        $this->validateKey($key);
        $now = $this->now();

        return $this->executeWithRetry(function() use ($key, $now) {
            $stmt = $this->preparedStatements['persist'];
            $stmt->execute(['key' => $key, 'now' => $now]);
            return $stmt->rowCount() > 0;
        }, 'persist');
    }

    /**
     * Set expiration on existing key
     *
     * @param string $key
     * @param int $ttl Time to live in seconds
     * @return bool True if expiration was set, false if key doesn't exist
     */
    public function expire(string $key, int $ttl): bool {
        if ($ttl <= 0) {
            throw new \InvalidArgumentException('TTL must be positive');
        }

        $this->validateKey($key);
        $expires_at = $this->now() + $ttl;
        $now = $this->now();

        return $this->executeWithRetry(function() use ($key, $expires_at, $now) {
            $stmt = $this->preparedStatements['expire'];
            $stmt->execute([
                'key' => $key,
                'expires_at' => $expires_at,
                'now' => $now
            ]);
            return $stmt->rowCount() > 0;
        }, 'expire');
    }

    /**
     * Get value and optionally set/update expiration (Redis 6.2+)
     *
     * @param string $key
     * @param array $options ['ex' => seconds, 'px' => milliseconds, 'persist' => true]
     * @return mixed The value or null if key doesn't exist
     */
    public function getex(string $key, array $options = []): mixed {
        $this->validateKey($key);

        return $this->executeWithRetry(function() use ($key, $options) {
            return $this->transaction(function() use ($key, $options) {
                // Get current value (with TTL check)
                $value = $this->get($key, null);

                if ($value === null) {
                    return null;
                }

                // Update expiration if requested
                if (isset($options['ex'])) {
                    // Set expiration in seconds
                    $this->expire($key, (int)$options['ex']);
                } elseif (isset($options['px'])) {
                    // Set expiration in milliseconds (convert to seconds)
                    $this->expire($key, (int)ceil($options['px'] / 1000));
                } elseif (isset($options['persist']) && $options['persist']) {
                    // Remove expiration
                    $this->persist($key);
                }

                return $value;
            });
        }, 'getex');
    }

    /**
     * Get value with TTL check (for backwards compatibility)
     */
    public function getWithTTL(string $key, mixed $default = false): mixed {
        // Now that expires_at is in the column, regular get() handles TTL
        return $this->get($key, $default);
    }

    /**
     * Purge expired keys with TTL
     * Useful for periodic cleanup of expired entries
     *
     * @param int $limit Maximum number of keys to check (0 = all)
     * @return int Number of purged keys
     */
    public function purgeExpired(int $limit = 1000): int {
        return $this->executeWithRetry(function() use ($limit) {
            $now = $this->now();

            // Much simpler with expires_at column - direct DELETE
            if ($limit > 0) {
                // Delete with limit - use int literal for compatibility with older SQLite versions
                $limit = (int)$limit;
                $sql = "DELETE FROM {$this->table}
                        WHERE key IN (
                            SELECT key FROM {$this->table}
                            WHERE expires_at IS NOT NULL AND expires_at <= :now
                            LIMIT {$limit}
                        )";
                $stmt = $this->connection->prepare($sql);
                $stmt->bindValue(':now', $now, \PDO::PARAM_INT);
            } else {
                // Delete all expired
                $sql = "DELETE FROM {$this->table}
                        WHERE expires_at IS NOT NULL AND expires_at <= :now";
                $stmt = $this->connection->prepare($sql);
                $stmt->bindValue(':now', $now, \PDO::PARAM_INT);
            }

            $stmt->execute();
            return $stmt->rowCount();
        }, 'purgeExpired');
    }

    /**
     * Begin transaction with SAVEPOINT support for nesting
     */
    public function beginTransaction(): bool {
        if ($this->transactionDepth === 0) {
            // Start a new transaction
            $result = $this->connection->beginTransaction();
            if ($result) {
                $this->transactionDepth = 1;
            }
            return $result;
        } else {
            // Create a savepoint for nested transaction
            $this->transactionDepth++;
            $savepointName = 'sp_' . $this->savepointCounter++;
            $this->connection->exec("SAVEPOINT {$savepointName}");
            return true;
        }
    }

    /**
     * Commit transaction with SAVEPOINT support
     */
    public function commit(): bool {
        if ($this->transactionDepth === 0) {
            return false; // No transaction to commit
        }

        if ($this->transactionDepth === 1) {
            // Commit the actual transaction
            $result = $this->connection->commit();
            if ($result) {
                $this->transactionDepth = 0;
                $this->savepointCounter = 0; // Reset savepoint counter
            }
            return $result;
        } else {
            // Release the savepoint (nested transaction)
            $this->transactionDepth--;
            $savepointName = 'sp_' . ($this->savepointCounter - 1);
            $this->connection->exec("RELEASE SAVEPOINT {$savepointName}");
            $this->savepointCounter--;
            return true;
        }
    }

    /**
     * Rollback transaction with SAVEPOINT support
     */
    public function rollback(): bool {
        if ($this->transactionDepth === 0) {
            return false; // No transaction to rollback
        }

        if ($this->transactionDepth === 1) {
            // Rollback the actual transaction
            $result = $this->connection->rollBack();
            if ($result) {
                $this->transactionDepth = 0;
                $this->savepointCounter = 0;
            }
            return $result;
        } else {
            // Rollback to the savepoint (nested transaction)
            $this->transactionDepth--;
            $savepointName = 'sp_' . ($this->savepointCounter - 1);
            $this->connection->exec("ROLLBACK TO SAVEPOINT {$savepointName}");
            $this->connection->exec("RELEASE SAVEPOINT {$savepointName}");
            $this->savepointCounter--;
            return true;
        }
    }

    /**
     * Check if currently in transaction
     */
    public function inTransaction(): bool {
        return $this->transactionDepth > 0;
    }

    /**
     * Execute operations in transaction
     */
    public function transaction(callable $callback): mixed {
        $this->beginTransaction();

        try {
            $result = $callback($this);
            $this->commit();
            return $result;
        } catch (\Exception $e) {
            $this->rollback();
            throw $e;
        }
    }

    /**
     * Clear database
     */
    public function flushdb(): void {
        $this->executeWithRetry(function() {
            // Delete all data from the table
            $this->connection->exec("DELETE FROM {$this->table}");

            // Only touch sqlite_sequence if it exists
            $hasSeq = (bool)$this->connection
                ->query("SELECT 1 FROM sqlite_master WHERE type='table' AND name='sqlite_sequence'")
                ->fetchColumn();

            if ($hasSeq) {
                // Check if this table exists in sqlite_sequence (only AUTOINCREMENT tables are there)
                $stmt = $this->connection->prepare(
                    "SELECT 1 FROM sqlite_sequence WHERE name = :table LIMIT 1"
                );
                $stmt->execute(['table' => $this->table]);

                if ($stmt->fetch() !== false) {
                    // Table has AUTOINCREMENT, safe to reset sequence
                    $stmt = $this->connection->prepare(
                        "UPDATE sqlite_sequence SET seq = 0 WHERE name = :table"
                    );
                    $stmt->execute(['table' => $this->table]);
                }
                $stmt->closeCursor();
            }

            // Optionally run VACUUM to reclaim space (can be slow on large databases)
            // Commented out by default for performance
            // $this->connection->exec("VACUUM");
        }, 'flushdb');
    }

    /**
     * Check if key exists
     *
     * @param  string $key
     * @return bool
     */
    public function exists(string $key): bool {
        $this->validateKey($key);

        return $this->executeWithRetry(function() use ($key) {
            $now = $this->now();
            $stmt = $this->preparedStatements['exists'];
            $stmt->execute(['key' => $key, 'now' => $now]);
            $res = $stmt->fetch();
            $stmt->closeCursor();

            return $res !== false;
        }, 'exists');
    }

    /**
     * Get all keys matching a pattern
     *
     * @param  string|null $pattern
     * @return array
     */
    public function keys(?string $pattern = null): array {
        return $this->executeWithRetry(function() use ($pattern) {
            $now = $this->now();

            if (!$pattern) {
                $stmt = $this->preparedStatements['keys_all'];
                $stmt->execute(['now' => $now]);
            } else {
                // Enhanced pattern conversion supporting more glob features
                $likePattern = $this->globToLike($pattern);
                $stmt = $this->preparedStatements['keys_pattern'];
                $stmt->execute(['pattern' => $likePattern, 'now' => $now]);
            }

            $keys = $stmt->fetchAll(\PDO::FETCH_COLUMN);
            $stmt->closeCursor();

            // Return unsorted (like Redis KEYS command)
            return $keys ?: [];
        }, 'keys');
    }

    /**
     * Convert glob pattern to SQL LIKE pattern
     */
    protected function globToLike(string $pattern): string {
        // Escape special LIKE characters
        $pattern = str_replace(['%', '_', '\\'], ['\\%', '\\_', '\\\\'], $pattern);
        // Convert glob wildcards
        $pattern = str_replace(['*', '?'], ['%', '_'], $pattern);
        return $pattern;
    }

    /**
     * Delete Key(s)
     *
     * @param  string $key
     * @return int Number of deleted keys
     */
    public function del(string $key): int {
        $keys = func_get_args();

        // Validate all keys first
        foreach ($keys as $k) {
            $this->validateKey($k);
        }

        // Single key: use prepared statement (faster for single deletes)
        if (count($keys) === 1) {
            return $this->executeWithRetry(function() use ($keys) {
                $stmt = $this->preparedStatements['delete'] ?? $this->connection->prepare(
                    "DELETE FROM {$this->table} WHERE key = :key"
                );
                $stmt->execute(['key' => $keys[0]]);
                return $stmt->rowCount();
            }, 'del');
        }

        // SQLite has a limit on variables in a single query (~999)
        // For large batches, we need to chunk the deletes
        if (count($keys) > 800) {
            return $this->executeWithRetry(function() use ($keys) {
                $totalDeleted = 0;
                $chunks = array_chunk($keys, $this->chunkSize);

                foreach ($chunks as $chunk) {
                    $placeholders = implode(',', array_fill(0, count($chunk), '?'));
                    $stmt = $this->connection->prepare(
                        "DELETE FROM {$this->table} WHERE key IN ({$placeholders})"
                    );
                    $stmt->execute($chunk);
                    $totalDeleted += $stmt->rowCount();
                }

                return $totalDeleted;
            }, 'del');
        }

        // Multiple keys (but not too many): use IN clause (single query is much faster)
        $placeholders = implode(',', array_fill(0, count($keys), '?'));

        return $this->executeWithRetry(function() use ($placeholders, $keys) {
            $stmt = $this->connection->prepare(
                "DELETE FROM {$this->table} WHERE key IN ({$placeholders})"
            );
            $stmt->execute($keys);
            return $stmt->rowCount();
        }, 'del');
    }

    /**
     * Rename a key (Redis behavior: overwrites existing key)
     *
     * @param string $oldKey
     * @param string $newKey
     * @return bool True if renamed
     * @throws \RuntimeException if oldKey doesn't exist or keys are the same
     */
    public function rename(string $oldKey, string $newKey): bool {
        $this->validateKey($oldKey);
        $this->validateKey($newKey);

        // Redis: renaming a key to itself is an error
        if ($oldKey === $newKey) {
            throw new \RuntimeException("Source and destination keys are the same");
        }

        return $this->executeWithRetry(function() use ($oldKey, $newKey) {
            return $this->transaction(function() use ($oldKey, $newKey) {
                $now = $this->now();

                // Atomically copy/overwrite newKey with oldKey's value (preserve created_at and expires_at)
                // Only rename if oldKey exists and is not expired
                $stmt = $this->connection->prepare(
                    "INSERT INTO {$this->table} (key, keyval, created_at, updated_at, expires_at)
                     SELECT :new, keyval, created_at, strftime('%s', 'now'), expires_at
                     FROM {$this->table}
                     WHERE key = :old AND (expires_at IS NULL OR expires_at > :now)
                     ON CONFLICT(key) DO UPDATE SET
                         keyval = excluded.keyval,
                         created_at = excluded.created_at,
                         updated_at = strftime('%s', 'now'),
                         expires_at = excluded.expires_at"
                );

                $stmt->execute(['new' => $newKey, 'old' => $oldKey, 'now' => $now]);

                // If nothing was inserted/updated, old didn't exist or was expired
                if ($stmt->rowCount() === 0) {
                    throw new \RuntimeException("Source key '{$oldKey}' does not exist");
                }

                // Delete oldKey
                $delStmt = $this->preparedStatements['delete'] ?? $this->connection->prepare(
                    "DELETE FROM {$this->table} WHERE key = :key"
                );
                $delStmt->execute(['key' => $oldKey]);

                return true;
            });
        }, 'rename');
    }

    /**
     * Rename a key only if newKey doesn't exist
     *
     * @param string $oldKey
     * @param string $newKey
     * @return bool True if renamed, false if oldKey doesn't exist or newKey exists
     */
    public function renamenx(string $oldKey, string $newKey): bool {
        $this->validateKey($oldKey);
        $this->validateKey($newKey);

        if ($oldKey === $newKey) {
            return false; // Redis returns false for same key
        }

        return $this->executeWithRetry(function() use ($oldKey, $newKey) {
            return $this->transaction(function() use ($oldKey, $newKey) {
                // Check if new key already exists
                if ($this->exists($newKey)) {
                    return false;
                }

                $now = $this->now();

                // Perform atomic rename using INSERT (will fail if newKey exists)
                // Also filter by TTL to prevent copying expired keys
                try {
                    $stmt = $this->connection->prepare(
                        "INSERT INTO {$this->table} (key, keyval, created_at, updated_at, expires_at)
                         SELECT :new, keyval, created_at, strftime('%s', 'now'), expires_at
                         FROM {$this->table}
                         WHERE key = :old AND (expires_at IS NULL OR expires_at > :now)"
                    );

                    $stmt->execute(['new' => $newKey, 'old' => $oldKey, 'now' => $now]);

                    if ($stmt->rowCount() === 0) {
                        return false; // Old key didn't exist or was expired
                    }

                    // Delete oldKey
                    $delStmt = $this->preparedStatements['delete'] ?? $this->connection->prepare(
                        "DELETE FROM {$this->table} WHERE key = :key"
                    );
                    $delStmt->execute(['key' => $oldKey]);

                    return true;

                } catch (\PDOException $e) {
                    // Constraint violation means newKey exists
                    if ($this->isConstraintViolation($e)) {
                        return false;
                    }
                    throw $e;
                }
            });
        }, 'renamenx');
    }

    /**
     * Get random key
     */
    public function randomKey(): ?string {
        return $this->executeWithRetry(function() {
            $now = $this->now();
            $stmt = $this->connection->prepare(
                "SELECT key FROM {$this->table}
                 WHERE expires_at IS NULL OR expires_at > :now
                 ORDER BY RANDOM() LIMIT 1"
            );

            $stmt->execute(['now' => $now]);
            $key = $stmt->fetchColumn();
            $stmt->closeCursor();

            return $key === false ? null : $key;
        }, 'randomKey');
    }

    /**
     * Get database size
     */
    public function dbsize(): int {
        return $this->executeWithRetry(function() {
            $now = $this->now();
            $stmt = $this->preparedStatements['dbsize'];
            $stmt->execute(['now' => $now]);
            $count = $stmt->fetchColumn();
            $stmt->closeCursor();

            return (int)$count;
        }, 'dbsize');
    }

    /**
     * Get Redis-compatible type name for a key
     *
     * @param  string $key
     * @return string Returns 'string', 'list', 'set', 'hash', or 'none'
     */
    public function type(string $key): string {
        $this->validateKey($key);

        return $this->executeWithRetry(function() use ($key) {
            $now = $this->now();
            $stmt = $this->connection->prepare(
                "SELECT keyval, expires_at FROM {$this->table}
                 WHERE key = :key AND (expires_at IS NULL OR expires_at > :now)"
            );
            $stmt->execute(['key' => $key, 'now' => $now]);
            $res = $stmt->fetch(\PDO::FETCH_ASSOC);
            $stmt->closeCursor();

            if (!$res) {
                return 'none';
            }

            $value = json_decode($res['keyval'], true, 512, JSON_BIGINT_AS_STRING);

            if (!is_array($value)) {
                return 'string';
            }
            return $this->isAssociativeArray($value) ? 'hash' : 'list';
        }, 'type');
    }

    /**
     * Check if an array is associative (has string keys)
     *
     * @param  array $arr
     * @return bool
     */
    protected function isAssociativeArray(array $arr): bool {
        if (empty($arr)) {
            return false;
        }
        return array_keys($arr) !== range(0, count($arr) - 1);
    }

    /**
     * Increment value by x
     *
     * @param  string  $key
     * @param  int $by
     * @return int
     */
    public function incr(string $key, int $by = 1): int {
        $this->validateKey($key);

        return $this->executeWithRetry(function() use ($key, $by) {
            $now = $this->now();
            // Try atomic increment first (much faster and preserves TTL)
            try {
                $stmt = $this->connection->prepare(
                    "UPDATE {$this->table}
                     SET keyval = json(json_extract(keyval, '$') + :by),
                         updated_at = strftime('%s', 'now')
                     WHERE key = :key
                     AND json_type(keyval) IN ('integer', 'real')
                     AND (expires_at IS NULL OR expires_at > :now)
                     RETURNING keyval"
                );

                $stmt->execute(['key' => $key, 'by' => $by, 'now' => $now]);
                $res = $stmt->fetch(\PDO::FETCH_ASSOC);

                if ($res) {
                    $stmt->closeCursor();
                    $value = json_decode($res['keyval'], false, 512, JSON_BIGINT_AS_STRING);
                    // Check for overflow
                    if (is_string($value) || $value > PHP_INT_MAX || $value < PHP_INT_MIN) {
                        throw new \RuntimeException("Integer overflow detected for key '{$key}'");
                    }
                    return (int)$value;
                }
            } catch (\PDOException) {
                // Fall back to transaction method if atomic update fails
            }

            // Fallback to transaction method for complex cases or key creation
            return $this->transaction(function() use ($key, $by) {
                // First check if key exists and get its expiration
                $stmt = $this->connection->prepare(
                    "SELECT keyval, expires_at FROM {$this->table} WHERE key = :key LIMIT 1"
                );
                $stmt->execute(['key' => $key]);
                $res = $stmt->fetch(\PDO::FETCH_ASSOC);
                $stmt->closeCursor();

                $current = 0;
                $expires_at = null;

                if ($res !== false) {
                    // Check if expired
                    if ($res['expires_at'] !== null && $this->now() > (int)$res['expires_at']) {
                        // Expired, treat as not existing
                        $this->del($key);
                    } else {
                        $expires_at = $res['expires_at'];
                        $decoded = json_decode($res['keyval'], true, 512, JSON_BIGINT_AS_STRING);
                        if (!is_numeric($decoded)) {
                            throw new \RuntimeException("Value at key '{$key}' is not numeric");
                        }
                        if (is_string($decoded)) {
                            // Too large for native int - Redis-like overflow error
                            throw new \RuntimeException("Integer overflow detected for key '{$key}'");
                        }
                        $current = (int)$decoded;
                    }
                }

                // Calculate new value with overflow check
                $newValue = $current + $by;
                if ($newValue > PHP_INT_MAX || $newValue < PHP_INT_MIN) {
                    throw new \RuntimeException("Integer overflow detected for key '{$key}'");
                }

                // Update or insert with TTL preservation
                if ($expires_at !== null) {
                    $stmt = $this->connection->prepare(
                        "INSERT INTO {$this->table} (key, keyval, expires_at) VALUES (:key, :value, :expires_at)
                         ON CONFLICT(key) DO UPDATE SET keyval = :value, updated_at = strftime('%s', 'now')"
                    );
                    $stmt->execute([
                        'key' => $key,
                        'value' => json_encode($newValue),
                        'expires_at' => $expires_at
                    ]);
                } else {
                    $this->set($key, $newValue);
                }

                return $newValue;
            });
        }, 'incr');
    }

    /**
     * Decrement value by x
     *
     * @param  string  $key
     * @param  int $by
     * @return int
     */
    public function decr(string $key, int $by = 1): int {
        return $this->incr($key, -$by);
    }

    /**
     * Increment float value
     */
    public function incrbyfloat(string $key, float $by): float {
        $this->validateKey($key);

        return $this->executeWithRetry(function() use ($key, $by) {
            $now = $this->now();
            // Try atomic increment first with RETURNING clause
            try {
                $stmt = $this->connection->prepare(
                    "UPDATE {$this->table}
                     SET keyval = json(json_extract(keyval, '$') + :by),
                         updated_at = strftime('%s', 'now')
                     WHERE key = :key
                     AND json_type(keyval) IN ('integer', 'real')
                     AND (expires_at IS NULL OR expires_at > :now)
                     RETURNING keyval"
                );

                $stmt->execute(['key' => $key, 'by' => $by, 'now' => $now]);
                $res = $stmt->fetch(\PDO::FETCH_ASSOC);

                if ($res) {
                    $stmt->closeCursor();
                    $value = json_decode($res['keyval'], false, 512, JSON_BIGINT_AS_STRING);
                    return (float)$value;
                }
            } catch (\PDOException) {
                // Fall back to transaction method if atomic update fails
            }

            // Fallback to transaction method for complex cases or key creation
            return $this->transaction(function() use ($key, $by) {
                // Get current value and TTL
                $stmt = $this->connection->prepare(
                    "SELECT keyval, expires_at FROM {$this->table} WHERE key = :key LIMIT 1"
                );
                $stmt->execute(['key' => $key]);
                $res = $stmt->fetch(\PDO::FETCH_ASSOC);
                $stmt->closeCursor();

                $current = 0;
                $expires_at = null;

                if ($res !== false) {
                    // Check if expired
                    if ($res['expires_at'] !== null && $this->now() > (int)$res['expires_at']) {
                        // Expired, treat as not existing
                        $this->del($key);
                    } else {
                        $expires_at = $res['expires_at'];
                        $decoded = json_decode($res['keyval'], true, 512, JSON_BIGINT_AS_STRING);
                        if (!is_numeric($decoded)) {
                            throw new \RuntimeException("Value at key '{$key}' is not numeric");
                        }
                        $current = $decoded;
                    }
                }

                $newValue = (float)$current + $by;

                // Update or insert with TTL preservation
                if ($expires_at !== null) {
                    $stmt = $this->connection->prepare(
                        "INSERT INTO {$this->table} (key, keyval, expires_at) VALUES (:key, :value, :expires_at)
                         ON CONFLICT(key) DO UPDATE SET keyval = :value, updated_at = strftime('%s', 'now')"
                    );
                    $stmt->execute([
                        'key' => $key,
                        'value' => json_encode($newValue),
                        'expires_at' => $expires_at
                    ]);
                } else {
                    $this->set($key, $newValue);
                }

                return $newValue;
            });
        }, 'incrbyfloat');
    }

    /**
     * Append string to value
     */
    public function append(string $key, string $value): int {
        $this->validateKey($key);

        return $this->executeWithRetry(function() use ($key, $value) {
            return $this->transaction(function() use ($key, $value) {
                // Single roundtrip - read once (TTL-aware) without extra exists()
                $stmt = $this->connection->prepare(
                    "SELECT keyval, expires_at FROM {$this->table} WHERE key = :key LIMIT 1"
                );
                $stmt->execute(['key' => $key]);
                $row = $stmt->fetch(\PDO::FETCH_ASSOC);
                $stmt->closeCursor();

                $now = $this->now();
                $existed = false;
                $current = '';

                if ($row !== false) {
                    if ($row['expires_at'] !== null && $now > (int)$row['expires_at']) {
                        // Expired - treat as non-existent
                        $this->del($key);
                    } else {
                        $existed = true;
                        $decoded = json_decode($row['keyval'], true, 512, JSON_BIGINT_AS_STRING);
                        if (!is_string($decoded)) {
                            throw new \RuntimeException("Value at key '{$key}' is not a string");
                        }
                        $current = $decoded;
                    }
                }

                $newValue = $current . $value;

                // Preserve TTL if key existed
                if ($existed) {
                    $this->updateValue($key, $newValue);
                } else {
                    $this->set($key, $newValue);
                }

                return strlen($newValue);
            });
        }, 'append');
    }

    /**
     * Get string length
     */
    public function strlen(string $key): int {
        $value = $this->get($key, '');
        return is_string($value) ? strlen($value) : 0;
    }

    /**
     * Count $value items
     *
     * @param  string $key
     * @return int
     */
    public function llen(string $key): int {
        $value = $this->get($key, []);
        return is_array($value) ? count($value) : 0;
    }

    /**
     * Add item to a value (right)
     *
     * @param  string $key
     * @param  mixed $value
     * @return int
     */
    public function rpush(string $key, mixed $value): int {
        $this->validateKey($key);

        return $this->executeWithRetry(function() use ($key, $value) {
            return $this->transaction(function() use ($key, $value) {
                $list = $this->get($key, []);

                if (!is_array($list)) {
                    throw new \RuntimeException("Value at key '{$key}' is not an array");
                }

                $list[] = $value;
                $this->updateValue($key, $list);

                return count($list);
            });
        }, 'rpush');
    }

    /**
     * Add item to a value (left)
     *
     * @param  string $key
     * @param  mixed $value
     * @return int
     */
    public function lpush(string $key, mixed $value): int {
        $this->validateKey($key);

        return $this->executeWithRetry(function() use ($key, $value) {
            return $this->transaction(function() use ($key, $value) {
                $list = $this->get($key, []);

                if (!is_array($list)) {
                    throw new \RuntimeException("Value at key '{$key}' is not an array");
                }

                array_unshift($list, $value);
                $this->updateValue($key, $list);

                return count($list);
            });
        }, 'lpush');
    }

    /**
     * Remove and return element from list (left)
     */
    public function lpop(string $key): mixed {
        $this->validateKey($key);

        return $this->executeWithRetry(function() use ($key) {
            return $this->transaction(function() use ($key) {
                $list = $this->get($key, []);

                if (!is_array($list) || empty($list)) {
                    return null;
                }

                $value = array_shift($list);
                $this->updateValue($key, $list);

                return $value;
            });
        }, 'lpop');
    }

    /**
     * Remove and return element from list (right)
     */
    public function rpop(string $key): mixed {
        $this->validateKey($key);

        return $this->executeWithRetry(function() use ($key) {
            return $this->transaction(function() use ($key) {
                $list = $this->get($key, []);

                if (!is_array($list) || empty($list)) {
                    return null;
                }

                $value = array_pop($list);
                $this->updateValue($key, $list);

                return $value;
            });
        }, 'rpop');
    }

    /**
     * Get range of elements from list
     */
    public function lrange(string $key, int $start, int $stop): array {
        $list = $this->get($key, []);

        if (!is_array($list)) {
            return [];
        }

        $count = count($list);

        // Handle negative indices
        if ($start < 0) {
            $start = max(0, $count + $start);
        }

        if ($stop < 0) {
            $stop = $count + $stop;
        } else {
            $stop = min($stop, $count - 1);
        }

        if ($start > $stop) {
            return [];
        }

        return array_slice($list, $start, $stop - $start + 1);
    }

    /**
     * Trim list to specified range
     */
    public function ltrim(string $key, int $start, int $stop): bool {
        $this->validateKey($key);

        return $this->executeWithRetry(function() use ($key, $start, $stop) {
            return $this->transaction(function() use ($key, $start, $stop) {
                $list = $this->lrange($key, $start, $stop);
                $this->updateValue($key, $list);
                return true;
            });
        }, 'ltrim');
    }

    /**
     * Set the value of an element in a list by its index
     *
     * @param  string $key
     * @param  int $index
     * @param  mixed $value
     * @return bool
     */
    public function lset(string $key, int $index, mixed $value): bool {
        $this->validateKey($key);

        return $this->executeWithRetry(function() use ($key, $index, $value) {
            return $this->transaction(function() use ($key, $index, $value) {
                $list = $this->get($key, []);

                if (!is_array($list)) {
                    throw new \RuntimeException("Value at key '{$key}' is not an array");
                }

                if ($index < 0) {
                    $index = count($list) + $index;
                }

                if (!isset($list[$index])) {
                    return false;
                }

                $list[$index] = $value;
                $this->updateValue($key, $list);

                return true;
            });
        }, 'lset');
    }

    /**
     * Get an element from a list by its index
     *
     * @param  string $key
     * @param  int $index
     * @return mixed
     */
    public function lindex(string $key, int $index): mixed {
        $list = $this->get($key, []);

        if (!is_array($list)) {
            return null;
        }

        if ($index < 0) {
            $index = count($list) + $index;
        }

        return $list[$index] ?? null;
    }

    /**
     * Remove elements from list
     */
    public function lrem(string $key, int $count, mixed $value): int {
        $this->validateKey($key);

        return $this->executeWithRetry(function() use ($key, $count, $value) {
            return $this->transaction(function() use ($key, $count, $value) {
                $list = $this->get($key, []);

                if (!is_array($list)) {
                    return 0;
                }

                $removed = 0;
                $newList = [];

                if ($count > 0) {
                    // Remove first $count occurrences
                    foreach ($list as $item) {
                        if ($item === $value && $removed < $count) {
                            $removed++;
                        } else {
                            $newList[] = $item;
                        }
                    }
                } elseif ($count < 0) {
                    // Remove last $count occurrences
                    $count = abs($count);
                    $list = array_reverse($list);
                    foreach ($list as $item) {
                        if ($item === $value && $removed < $count) {
                            $removed++;
                        } else {
                            $newList[] = $item;
                        }
                    }
                    $newList = array_reverse($newList);
                } else {
                    // Remove all occurrences
                    foreach ($list as $item) {
                        if ($item !== $value) {
                            $newList[] = $item;
                        } else {
                            $removed++;
                        }
                    }
                }

                $this->updateValue($key, $newList);
                return $removed;
            });
        }, 'lrem');
    }

    /**
     * Set the string value of a hash field
     *
     * @param  string $key
     * @param  string $field
     * @param  mixed $value
     * @return int 1 if new field, 0 if field existed
     */
    public function hset(string $key, string $field, mixed $value): int {
        $this->validateKey($key);

        if (empty($field)) {
            throw new \InvalidArgumentException('Field cannot be empty');
        }

        return $this->executeWithRetry(function() use ($key, $field, $value) {
            return $this->transaction(function() use ($key, $field, $value) {
                $hash = $this->get($key, []);

                if (!is_array($hash)) {
                    throw new \RuntimeException("Value at key '{$key}' is not a hash");
                }

                $isNew = !isset($hash[$field]);
                $hash[$field] = $value;
                $this->updateValue($key, $hash);

                return $isNew ? 1 : 0;
            });
        }, 'hset');
    }

    /**
     * Get the value of a hash field
     *
     * @param  string $key
     * @param  string $field
     * @param  mixed $default
     * @return mixed
     */
    public function hget(string $key, string $field, mixed $default = null): mixed {
        $hash = $this->get($key, []);

        if (!is_array($hash)) {
            return $default;
        }

        return $hash[$field] ?? $default;
    }

    /**
     * Get all the fields and values in a hash
     *
     * @param  string $key
     * @return array
     */
    public function hgetall(string $key): array {
        $hash = $this->get($key, []);
        return is_array($hash) ? $hash : [];
    }

    /**
     * Determine if a hash field exists
     *
     * @param  string $key
     * @param  string $field
     * @return bool
     */
    public function hexists(string $key, string $field): bool {
        $hash = $this->get($key, []);
        return is_array($hash) && isset($hash[$field]);
    }

    /**
     * Get all the fields in a hash
     *
     * @param  string $key
     * @return array
     */
    public function hkeys(string $key): array {
        $hash = $this->get($key, []);
        return is_array($hash) ? array_keys($hash) : [];
    }

    /**
     * Get all the values in a hash
     *
     * @param  string $key
     * @return array
     */
    public function hvals(string $key): array {
        $hash = $this->get($key, []);
        return is_array($hash) ? array_values($hash) : [];
    }

    /**
     * Get the number of fields in a hash
     *
     * @param  string $key
     * @return int
     */
    public function hlen(string $key): int {
        $hash = $this->get($key, []);
        return is_array($hash) ? count($hash) : 0;
    }

    /**
     * Delete one or more hash fields
     *
     * @param  string $key
     * @return int
     */
    public function hdel(string $key): int {
        $this->validateKey($key);

        $fields = func_get_args();
        array_shift($fields); // Remove $key from arguments

        if (empty($fields)) {
            return 0;
        }

        return $this->executeWithRetry(function() use ($key, $fields) {
            return $this->transaction(function() use ($key, $fields) {
                $hash = $this->get($key, []);

                if (!is_array($hash)) {
                    return 0;
                }

                $removed = 0;
                foreach ($fields as $field) {
                    if (isset($hash[$field])) {
                        unset($hash[$field]);
                        $removed++;
                    }
                }

                if ($removed > 0) {
                    $this->updateValue($key, $hash);
                }

                return $removed;
            });
        }, 'hdel');
    }

    /**
     * Increment the integer value of a hash field by the given number
     *
     * @param  string  $key
     * @param  string  $field
     * @param  int $by
     * @return int
     */
    public function hincrby(string $key, string $field, int $by = 1): int {
        $this->validateKey($key);

        return $this->executeWithRetry(function() use ($key, $field, $by) {
            return $this->transaction(function() use ($key, $field, $by) {
                $current = $this->hget($key, $field, 0);

                if (!is_numeric($current)) {
                    throw new \RuntimeException("Hash field '{$field}' is not numeric");
                }

                if (is_string($current) && strlen($current) > 15) {
                    // Likely a BigInt string - check for overflow
                    throw new \RuntimeException("Integer overflow detected for hash field '{$field}'");
                }

                $newValue = (int)$current + $by;
                $this->hset($key, $field, $newValue);

                return $newValue;
            });
        }, 'hincrby');
    }

    /**
     * Increment the float value of a hash field
     */
    public function hincrbyfloat(string $key, string $field, float $by): float {
        $this->validateKey($key);

        return $this->executeWithRetry(function() use ($key, $field, $by) {
            return $this->transaction(function() use ($key, $field, $by) {
                $current = $this->hget($key, $field, 0);

                if (!is_numeric($current)) {
                    throw new \RuntimeException("Hash field '{$field}' is not numeric");
                }

                $newValue = (float)$current + $by;
                $this->hset($key, $field, $newValue);

                return $newValue;
            });
        }, 'hincrbyfloat');
    }

    /**
     * Get the values of all the given hash fields
     *
     * @param  string $key
     * @return array
     */
    public function hmget(string $key): array {
        $hash = $this->get($key, []);

        if (!is_array($hash)) {
            $hash = [];
        }

        $fields = func_get_args();
        array_shift($fields); // Remove $key

        $values = [];
        foreach ($fields as $field) {
            $values[] = $hash[$field] ?? null;
        }

        return $values;
    }

    /**
     * Set multiple hash fields to multiple values
     * Redis API: hmset($key, $field1, $value1, $field2, $value2, ...)
     *
     * @param  string $key
     */
    public function hmset(string $key): void {
        $this->validateKey($key);

        $args = func_get_args();
        $cnt = count($args);

        if ($cnt < 3 || ($cnt - 1) % 2 !== 0) {
            throw new \InvalidArgumentException('hmset requires key and field/value pairs');
        }

        $this->executeWithRetry(function() use ($key, $args, $cnt) {
            $this->transaction(function() use ($key, $args, $cnt) {
                $hash = $this->get($key, []);

                if (!is_array($hash)) {
                    $hash = [];
                }

                for ($i = 1; $i < $cnt; $i += 2) {
                    $field = $args[$i];
                    $value = $args[$i + 1] ?? null;
                    $hash[$field] = $value;
                }

                $this->updateValue($key, $hash);
            });
        }, 'hmset');
    }

    /**
     * Get memory usage info
     */
    public function info(): array {
        return $this->executeWithRetry(function() {
            $info = [];

            // Database size with accurate byte length using CAST to BLOB
            // LENGTH() on TEXT counts characters, LENGTH(CAST AS BLOB) counts bytes
            $stmt = $this->connection->prepare(
                "SELECT
                    COUNT(*) as count,
                    SUM(LENGTH(CAST(keyval AS BLOB))) as data_size,
                    SUM(LENGTH(CAST(key AS BLOB))) as keys_size
                 FROM {$this->table}"
            );
            $stmt->execute();
            $stats = $stmt->fetch(\PDO::FETCH_ASSOC);

            $info['keys'] = (int)$stats['count'];
            $info['data_bytes'] = (int)($stats['data_size'] ?? 0);
            $info['keys_bytes'] = (int)($stats['keys_size'] ?? 0);
            $info['total_bytes'] = $info['data_bytes'] + $info['keys_bytes'];

            // SQLite page stats
            $pragma = $this->connection->query("PRAGMA page_count")->fetchColumn();
            $info['page_count'] = (int)$pragma;

            $pragma = $this->connection->query("PRAGMA page_size")->fetchColumn();
            $info['page_size'] = (int)$pragma;

            $info['database_size'] = $info['page_count'] * $info['page_size'];

            // Cache stats
            $pragma = $this->connection->query("PRAGMA cache_size")->fetchColumn();
            $info['cache_size'] = abs((int)$pragma);

            // WAL stats if in WAL mode (without triggering checkpoint)
            try {
                // Check if WAL mode is active
                $journal_mode = $this->connection->query("PRAGMA journal_mode")->fetchColumn();
                if (strtolower($journal_mode) === 'wal') {
                    // Get WAL status without checkpointing
                    // Use wal_autocheckpoint to get current WAL size info
                    $wal_pages = $this->connection->query("PRAGMA wal_autocheckpoint")->fetchColumn();
                    $info['wal_autocheckpoint'] = (int)$wal_pages;

                    // Check if WAL file exists and get its size
                    if ($this->path !== ':memory:' && file_exists($this->path . '-wal')) {
                        $info['wal_size'] = filesize($this->path . '-wal');
                    }
                }
            } catch (\PDOException) {
                // WAL not enabled or not applicable
            }

            // Memory usage efficiency
            if ($info['database_size'] > 0) {
                $info['usage_ratio'] = round(($info['total_bytes'] / $info['database_size']) * 100, 2);
            }

            return $info;
        }, 'info');
    }

    /**
     * Perform database maintenance
     */
    public function optimize(): void {
        $this->executeWithRetry(function() {
            // Analyze for query optimization
            $this->connection->exec("ANALYZE {$this->table}");

            // Vacuum to reclaim space
            $this->connection->exec("VACUUM");

            // Reindex
            $this->connection->exec("REINDEX");
        }, 'optimize');
    }

    /**
     * Export all data
     */
    public function export(): array {
        return $this->executeWithRetry(function() {
            $stmt = $this->connection->prepare("SELECT key, keyval FROM {$this->table} ORDER BY key");
            $stmt->execute();

            $data = [];
            while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)) {
                try {
                    $data[$row['key']] = json_decode($row['keyval'], true, 512, JSON_THROW_ON_ERROR);
                } catch (\JsonException) {
                    // Store raw value if JSON decode fails
                    $data[$row['key']] = $row['keyval'];
                }
            }

            return $data;
        }, 'export');
    }

    /**
     * Import data
     */
    public function import(array $data): int {
        return $this->executeWithRetry(function() use ($data) {
            return $this->transaction(function() use ($data) {
                $imported = 0;

                foreach ($data as $key => $value) {
                    try {
                        $this->set($key, $value);
                        $imported++;
                    } catch (\Exception $e) {
                        // Log error but continue import
                        $this->handleError($e);
                    }
                }

                return $imported;
            });
        }, 'import');
    }

    /**
     * Close connection and cleanup
     */
    public function close(): void {
        // Close prepared statements
        foreach ($this->preparedStatements as $stmt) {
            if ($stmt instanceof \PDOStatement) {
                $stmt->closeCursor();
            }
        }

        $this->preparedStatements = [];

        // Checkpoint WAL if using WAL mode
        try {
            $this->connection->exec("PRAGMA wal_checkpoint(TRUNCATE)");
        } catch (\PDOException) {
            // Ignore errors during cleanup
        }

        // Close connection
        $this->connection = null;
    }

    /**
     * Destructor
     */
    public function __destruct() {
        if ($this->connection !== null) {
            $this->close();
        }
    }
}
