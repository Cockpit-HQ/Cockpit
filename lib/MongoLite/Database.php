<?php

namespace MongoLite;

use PDO;

/**
 * Database object.
 */
class Database {

    /**
     * @var string - DSN path form memory database
     */
    public const DSN_PATH_MEMORY = ':memory:';

    /**
     * @var PDO object
     */
    public PDO $connection;

    /**
     * @var array
     */
    protected array $collections = [];

    /**
     * @var string
     */
    protected string $path;

    /**
     * @var array
     */
    protected array $document_criterias = [];

    /**
     * Constructor
     *
     * @param string $path
     * @param array  $options
     */
    public function __construct(string $path = self::DSN_PATH_MEMORY, array $options = []) {

        $dns = "sqlite:{$path}";

        $this->path = $path;
        $this->connection = new PDO($dns, null, null, $options);

        $database = $this;

        $this->connection->sqliteCreateFunction('document_key', function($key, $document){

            $document = \json_decode($document, true);
            $val      = '';

            if (str_contains($key, '.')) {

                $keys = \explode('.', $key);

                switch (\count($keys)) {
                    case 2:
                        $val = isset($document[$keys[0]][$keys[1]]) ? $document[$keys[0]][$keys[1]] : '';
                        break;
                    case 3:
                        $val = isset($document[$keys[0]][$keys[1]][$keys[2]]) ? $document[$keys[0]][$keys[1]][$keys[2]] : '';
                        break;
                    default:
                        $val = isset($document[$keys[0]]) ? $document[$keys[0]] : '';
                }

            } else {
                $val = isset($document[$key]) ? $document[$key] : '';
            }

            return \is_array($val) || \is_object($val) ? \json_encode($val) : $val;
        }, 2);

        $this->connection->sqliteCreateFunction('document_criteria', function($funcid, $document) use($database) {

            $document = \json_decode($document, true);

            return $database->callCriteriaFunction($funcid, $document);
        }, 2);

        $pragma = [
            'journal_mode'  => $options['journal_mode'] ??  'WAL',
            'temp_store'  => $options['temp_store'] ??  'MEMORY',
            'journal_size_limit' => $options['journal_size_limit'] ?? '27103364',
            'synchronous'   => $options['synchronous'] ?? 'NORMAL',
            'mmap_size'     => $options['mmap_size'] ?? '134217728',
            'cache_size'    => $options['cache_size'] ?? '-20000',
            'page_size'     => $options['page_size'] ?? '8192',
            'busy_timeout'  => $options['busy_timeout'] ?? '5000',
            'auto_vacuum'  => $options['auto_vacuum'] ?? 'INCREMENTAL',
        ];

        foreach ($pragma as $key => $value) {
            $this->connection->exec("PRAGMA {$key} = {$value}");
        }
    }

    /**
     * Register Criteria function
     *
     * @param  mixed $criteria
     * @return mixed
     */
    public function registerCriteriaFunction(mixed $criteria): ?string {

        $id = \uniqid('criteria');

        if (\is_callable($criteria)) {
           $this->document_criterias[$id] = $criteria;
           return $id;
        }

        if (is_array($criteria)) {

            $fn = UtilArrayQuery::getFilterFunction($criteria);

            $this->document_criterias[$id] = $fn;

            return $id;
        }

        return null;
    }

    /**
     * Unregisters a criteria function by its identifier.
     *
     * @param string $id The identifier of the criteria function to be unregistered.
     * @return void
     */
    public function unregisterCriteriaFunction(string $id): void {
        if (isset($this->document_criterias[$id])) unset($this->document_criterias[$id]);
    }

    /**
     * Execute registred criteria function
     *
     * @param  string $id
     * @param  array $document
     * @return boolean
     */
    public function callCriteriaFunction(string $id, ?array $document = null): mixed {
        return isset($this->document_criterias[$id]) ? $this->document_criterias[$id]($document):false;
    }

    /**
     * Vacuum database
     */
    public function vacuum(): void {
        $this->connection->query('VACUUM');
    }

    /**
     * Drop database
     */
    public function drop(): void {

        if ($this->path !== static::DSN_PATH_MEMORY) {
            if (file_exists($this->path)) unlink($this->path);
            if (file_exists("{$this->path}-shm")) unlink("{$this->path}-shm");
            if (file_exists("{$this->path}-wal")) unlink("{$this->path}-wal");
            if (file_exists("{$this->path}-journal")) unlink("{$this->path}-journal");
        }
    }

    /**
     * Create a collection
     *
     * @param  string $name
     */
    public function createCollection(string $name): void {
        // Sanitize collection name to prevent SQL injection
        $sanitizedName = $this->sanitizeCollectionName($name);
        if (!$sanitizedName) {
            throw new \InvalidArgumentException("Invalid collection name: {$name}");
        }
        
        $this->connection->exec("CREATE TABLE IF NOT EXISTS `{$sanitizedName}` ( id INTEGER PRIMARY KEY AUTOINCREMENT, document TEXT )");
    }

    /**
     * Drop a collection
     *
     * @param  string $name
     */
    public function dropCollection(string $name): void {
        // Sanitize collection name to prevent SQL injection
        $sanitizedName = $this->sanitizeCollectionName($name);
        if (!$sanitizedName) {
            throw new \InvalidArgumentException("Invalid collection name: {$name}");
        }
        
        $this->connection->exec("DROP TABLE `{$sanitizedName}`");

        // Remove collection from cache
        unset($this->collections[$name]);
    }

    /**
     * Get all collection names in the database
     *
     * @return array
     */
    public function getCollectionNames(): array {

        $stmt   = $this->connection->query("SELECT name FROM sqlite_master WHERE type='table' AND name!='sqlite_sequence';");
        $tables = $stmt->fetchAll( \PDO::FETCH_ASSOC);
        $names  = [];

        foreach ($tables as $table) {
            $names[] = $table['name'];
        }

        return $names;
    }

    /**
     * Get all collections in the database
     *
     * @return array
     */
    public function listCollections(): array {

        foreach ($this->getCollectionNames() as $name) {
            if(!isset($this->collections[$name])) {
                $this->collections[$name] = new Collection($name, $this);
            }
        }

        return $this->collections;
    }

    /**
     * Select collection
     *
     * @param  string $name
     * @return object
     */
    public function selectCollection(string $name): Collection {

        if (!isset($this->collections[$name])) {

            if (!in_array($name, $this->getCollectionNames())) {
                $this->createCollection($name);
            }

            $this->collections[$name] = new Collection($name, $this);
        }

        return $this->collections[$name];
    }

    public function __get($collection) {
        return $this->selectCollection($collection);
    }
    
    /**
     * Sanitize collection name to prevent SQL injection
     * Only allow alphanumeric characters, underscores, and hyphens
     * 
     * @param string $name
     * @return string|null Sanitized name or null if invalid
     */
    public function sanitizeCollectionName(string $name): ?string {
        // Remove any characters that aren't alphanumeric, underscore, or hyphen
        $sanitized = preg_replace('/[^a-zA-Z0-9_-]/', '', $name);
        
        // Check if the sanitized name matches the original and isn't empty
        if ($sanitized === $name && !empty($sanitized) && strlen($sanitized) <= 64) {
            return $sanitized;
        }
        
        return null;
    }
    
    /**
     * Sanitize criteria function ID to prevent SQL injection
     * 
     * @param string $id
     * @return string|null Sanitized ID or null if invalid
     */
    public function sanitizeCriteriaId(string $id): ?string {
        // Only allow alphanumeric characters - criteria IDs are generated by uniqid()
        $sanitized = preg_replace('/[^a-zA-Z0-9]/', '', $id);
        
        if ($sanitized === $id && !empty($sanitized)) {
            return $sanitized;
        }
        
        return null;
    }
}


function createMongoDbLikeId(): string {

    // use native MongoDB ObjectId if available
    if (class_exists('MongoDB\\BSON\\ObjectId')) {
        $objId = new \MongoDB\BSON\ObjectId();
        return (string)$objId;
    }

    // 4 bytes: timestamp (seconds since epoch)
    $timestamp = pack('N', time());

    // 5 bytes: combination of host-specific and random data
    // Instead of trying to convert hex strings directly, use binary data
    $hostHash = md5(php_uname('n'), true); // Get binary hash
    $processHash = md5(getmypid(), true); // Get binary hash

    // Take portions of these hashes to create 5 bytes
    $machineSpecificBytes = substr($hostHash, 0, 3) . substr($processHash, 0, 2);

    // 3 bytes: incrementing counter
    static $counter = null;
    if ($counter === null) {
        // Start from a random position each time the function is first called
        $counter = random_int(0, 0xFFFFFF);
    }
    $counter = ($counter + 1) & 0xFFFFFF;
    $counterBytes = substr(pack('N', $counter), 1, 3);

    // Combine all parts and convert to hex
    return bin2hex($timestamp . $machineSpecificBytes . $counterBytes);
}
