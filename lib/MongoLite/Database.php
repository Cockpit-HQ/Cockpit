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
            'journal_size_limit' => $options['journal_size_limit'] ?? '27103364',
            'synchronous'   => $options['synchronous'] ?? 'NORMAL',
            'mmap_size'     => $options['mmap_size'] ?? '134217728',
            'cache_size'    => $options['cache_size'] ?? '2000',
            'page_size'     => $options['page_size'] ?? '4096',
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

            $fn = null;

            eval('$fn = function($document) { return '.UtilArrayQuery::buildCondition($criteria).'; };');

            $this->document_criterias[$id] = $fn;

            return $id;
        }

        return null;
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
        if ($this->path != static::DSN_PATH_MEMORY) {
            \unlink($this->path);
        }
    }

    /**
     * Create a collection
     *
     * @param  string $name
     */
    public function createCollection(string $name): void {
        $this->connection->exec("CREATE TABLE IF NOT EXISTS `{$name}` ( id INTEGER PRIMARY KEY AUTOINCREMENT, document TEXT )");
    }

    /**
     * Drop a collection
     *
     * @param  string $name
     */
    public function dropCollection(string $name): void {
        $this->connection->exec("DROP TABLE `{$name}`");

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
}


function createMongoDbLikeId(): string {

    // use native MongoDB ObjectId if available
    if (class_exists('MongoDB\\BSON\\ObjectId')) {
        $objId = new \MongoDB\BSON\ObjectId();
        return (string)$objId;
    }

    // based on https://gist.github.com/h4cc/9b716dc05869296c1be6

    $timestamp = \microtime(true);
    $processId = \random_int(10000, 99999);
    $id        = \random_int(10, 1000);
    $result    = '';

    // Building binary data.
    $bin = \sprintf(
        '%s%s%s%s',
        \pack('N', $timestamp * 10000),
        \substr(md5(uniqid()), 0, 3),
        \pack('n', $processId),
        \substr(\pack('N', $id), 1, 3)
    );

    // Convert binary to hex.
    for ($i = 0; $i < 12; $i++) {
        $result .= \sprintf('%02x', ord($bin[$i]));
    }

    return $result;
}
