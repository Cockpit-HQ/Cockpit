<?php
/**
 * RedisLite class.
 */
class RedisLite {

    /**
     * @var string
     */
    protected string $path;

    /**
     * @var object
     */
    protected object $connection;

    /**
     * @var string
     */
    protected string $table;

    /**
     * Constructor
     *
     * @param string $path
     * @param array  $options
     */
    public function __construct(string $path = ':memory:', array $options = []) {

        $options = array_merge(['storagetable' => 'storage'], $options);
        $dns     = "sqlite:{$path}";

        $this->path  = $path;
        $this->table = $options['storagetable'];
        $this->connection = new \PDO($dns, null, null, $options);

        $stmt  = $this->connection->query("SELECT name FROM sqlite_master WHERE type='table' AND name='{$this->table}';");
        $table = $stmt->fetch(\PDO::FETCH_ASSOC);

        if (!isset($table['name'])) {
            $this->createTable();
        }
    }

    protected function createTable() {
        $this->connection->exec("CREATE TABLE {$this->table} (key VARCHAR PRIMARY KEY, keyval TEXT)");
        $this->connection->exec("CREATE UNIQUE INDEX key_name on {$this->table} (key);");
    }

    /**
     * Get value for specific key
     *
     * @param  string $key
     * @param  mixed $default
     * @return mixed
     */
    public function get(string $key, mixed $default = null): mixed {

        $stmt = $this->connection->query("SELECT * FROM {$this->table} WHERE `key`='{$key}';");

        if (!$stmt) {
            return $default;
        }

        $res = $stmt->fetch(\PDO::FETCH_ASSOC);

        return isset($res['key']) ? json_decode($res['keyval'], true) : $default;
    }

    /**
     * Set value for specific key
     *
     * @param  string $key
     * @param  mixed $value
     */
    public function set(string $key, mixed $value): void {

        $value = $this->connection->quote(json_encode($value, JSON_NUMERIC_CHECK));

        if ($this->exists($key)) {
            $sql = "UPDATE {$this->table} SET `keyval`={$value} WHERE `key`='{$key}'";
        } else {
            $sql = "INSERT INTO {$this->table} (`key`,`keyval`) VALUES ('{$key}',{$value})";
        }

        $this->connection->exec($sql);
    }

    /**
     * Clear database
     *
     */
    public function flushdb(): void {
        $this->connection->exec("DELETE FROM {$this->table}");
    }

    /**
     * Check if key exists
     *
     * @param  string $key
     */
    public function exists(string $key): bool {

        $stmt = $this->connection->query("SELECT `key` FROM {$this->table} WHERE `key`='{$key}';");
        $res  = $stmt->fetch(\PDO::FETCH_ASSOC);

        return isset($res["key"]);
    }

    /**
     * Get all keys matching a pattern
     *
     * @param  string $pattern
     * @return array
     */
    public function keys(?string $pattern = null): array {

        $keys = [];
        $stmt = $this->connection->query("SELECT `key` FROM {$this->table} ORDER BY `key`;");
        $res  = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        if (!$pattern) {

            foreach ($res as $record) {
                $keys[] = $record["key"];
            }

        } else {

            $matcher = function_exists('fnmatch') ? 'fnmatch': function($pattern, $string){
                return preg_match("#^".strtr(preg_quote($pattern, '#'), array('\*' => '.*', '\?' => '.'))."$#i", $string);
            };

            foreach ($res as $record) {
                if ($matcher($pattern, $record["key"])) {
                    $keys[] = $record["key"];
                }
            }
        }

        return $keys;
    }

    /**
     * Delete Key(s)
     *
     * @param  string $key
     * @return integer
     */
    public function del(string $key): int {

        $keys = func_get_args();
        $removed = 0;

        foreach ($keys as $key) {
            $sql = 'DELETE FROM '.$this->table.' WHERE `key`="'.$key.'"';
            $this->connection->exec($sql);
            $removed++;
        }

        return $removed;
    }

    /**
     * Get value type
     *
     * @param  string $key
     * @return string
     */
    public function type(string $key): string {

        $value = $this->get($key, null);

        return gettype($value);
    }

    /**
     * Increment value by x
     *
     * @param  string  $key
     * @param  integer $by
     * @return integer
     */
    public function incr(string $key, int $by = 1): int {

        $current = $this->get($key, 0);
        $newone  = $current + $by;

        $this->set($key, $newone);

        return $newone;
    }

    /**
     * Decrement value by x
     *
     * @param  string  $key
     * @param  integer $by
     * @return integer
     */
    public function decr(string $key, int $by = 1): int {

        return $this->incr($key, ($by * -1));
    }

    /**
     * Count $value items
     *
     * @param  string $key
     * @return integer
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
     * @return integer
     */
    public function rpush(string $key, mixed $value): int {

        $list = $this->get($key, []);

        $list[] = $value;

        $this->set($key, $list);

        return count($list);
    }

    /**
     * Add item to a value (left)
     *
     * @param  string $key
     * @param  mixed $value
     * @return integer
     */
    public function lpush(string $key, mixed $value): int {

        $list = $this->get($key, []);

        array_unshift($list, $value);

        $this->set($key, $list);

        return count($list);
    }

    /**
     * Set the value of an element in a list by its index
     *
     * @param  string $key
     * @param  integer $index
     * @param  mixed $value
     * @return boolean
     */
    public function lset(string $key, int $index, mixed $value): bool {

        $list = $this->get($key, []);

        if ($index < 0) {
            $index = count($list) - abs($index);
        }

        if (isset($list[$index])){
            $list[$index] = $value;
            $this->set($key, $list);

            return true;
        }

        return false;
    }

    /**
     * Get an element from a list by its index
     *
     * @param  string $key
     * @param  integer $index
     * @return mixed
     */
    public function lindex(string $key, int $index): mixed {

        $list = $this->get($key, []);

        if ($index < 0) {
            $index = count($list) - abs($index);
        }

        return isset($list[$index]) ? $list[$index]:null;
    }

    /**
     * Set the string value of a hash field
     *
     * @param  string $key
     * @param  string $field
     * @param  mixed $value
     */
    public function hset(string $key, string $field, mixed $value): void {

        $set = $this->get($key, []);

        $set[$field] = $value;
        $this->set($key, $set);
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

        $set = $this->get($key, []);

        return isset($set[$field]) ? $set[$field] : $default;
    }

    /**
     * Get all the fields and values in a hash
     *
     * @param  string $key
     * @return array
     */
    public function hgetall(string $key): array {

        $set = $this->get($key, []);

        return $set;
    }

    /**
     * Determine if a hash field exists
     *
     * @param  string $key
     * @param  string $field
     * @return boolean
     */
    public function hexists(string $key, string $field): bool {

        $set = $this->get($key, []);

        return isset($set[$field]);
    }

    /**
     * Get all the fields in a hash
     *
     * @param  string $key
     * @return array
     */
    public function hkeys(string $key): array {

        $set = $this->get($key, []);

        return array_keys($set);
    }

    /**
     * Get all the values in a hash
     *
     * @param  string $key
     * @return array
     */
    public function hvals(string $key): array {

        $set = $this->get($key, []);

        return array_values($set);
    }

    /**
     * Get the number of fields in a hash
     *
     * @param  string $key
     * @return integer
     */
    public function hlen(string $key): int {

        return count($this->hkeys($key));
    }

    /**
     * Delete one or more hash fields
     *
     * @param  string $key
     * @return integer
     */
    public function hdel(string $key): int {

        $set = $this->get($key, []);

        if (!count($set)) return 0;

        $fields  = func_get_args();
        $removed = 0;

        for ($i=1; $i<count($fields); $i++){

            $field = $fields[$i];

            if (isset($set[$field])){
                unset($set[$field]);
                $removed++;
            }
        }

        $this->set($key, $set);

        return $removed;
    }

    /**
     * Increment the integer value of a hash field by the given number
     *
     * @param  string  $key
     * @param  string  $field
     * @param  integer $by
     * @return integer
     */
    public function hincrby(string $key, string $field, int $by = 1): int {

        $current = $this->hget($key, $field, 0);
        $newone  = $current+$by;

        $this->hset($key, $field, $newone);

        return $newone;
    }

    /**
     * Get the values of all the given hash fields
     *
     * @param  string $key
     * @return array
     */
    public function hmget(string $key): array {

        $set     = $this->get($key, []);
        $fields  = func_get_args();
        $values  = [];

        for ($i = 1; $i < count($fields); $i++){
            $field = $fields[$i];
            $values[] = isset($set[$field]) ? $set[$field]:null;
        }

        return $values;
    }

    /**
     * Set multiple hash fields to multiple values
     *
     * @param  string $key
     */
    public function hmset(string $key) {

        $set  = $this->get($key, []);
        $args = func_get_args();

        for ($i=1; $i < count($args); $i++){
            $field = $args[$i];
            $value = isset($args[($i+1)]) ? $args[($i+1)] : null;

            $set[$field] = $value;
            $i = $i + 1;
        }

        $this->set($key, $set);
    }
}
