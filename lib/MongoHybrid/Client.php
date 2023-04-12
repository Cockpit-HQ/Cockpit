<?php

namespace MongoHybrid;

class Client {

    protected Mongo|MongoLite $driver;
    public ?string $type = null;

    public function __construct(string $server, array $options = [], array $driverOptions = []) {

        if (strpos($server, 'mongodb://')===0 || strpos($server, 'mongodb+srv://')===0) {

            $this->driver = new Mongo($server, $options, $driverOptions);
            $this->type = 'mongodb';
        }

        if (strpos($server, 'mongolite://') === 0) {
            $this->driver = new MongoLite($server, $options);
            $this->type = 'mongolite';
        }
    }

    public function dropCollection(string $name, ?string $db = null): mixed {
        return $this->driver->getCollection($name, $db)->drop();
    }

    public function renameCollection(string $name, string $newname, ?string $db = null): mixed {
        return $this->driver->renameCollection($name, $newname, $db);
    }

    public function save(string $collection, array &$data): mixed {
        return $this->driver->save($collection, $data);
    }

    public function insert(string $collection, array &$doc): mixed {
        return $this->driver->insert($collection, $doc);
    }

    public function findTerm(string $collection, string $term, array $options = []) {

        $options['filter'] = $this->driver->getFindTermFilter($term);

        return $this->driver->find($collection, $options);
    }


    /*
        simple key-value storage implementation
    */

    /**
     * Get value for specific key
     *
     * @param  string $collection
     * @param  string $key
     * @param  mixed $default
     * @return mixed
     */
    public function getKey(string $collection, string $key, mixed $default = null): mixed {

        $entry = $this->driver->findOne($collection, ['key' => $key]);

        return $entry ? $entry['val'] : $default;
    }

    /**
     * Set value for specific key
     *
     * @param  string $collection
     * @param  string $key
     * @param  mixed $value
     */
    public function setKey(string $collection, string $key, mixed $value): mixed {

        $entry = $this->driver->findOne($collection, ['key' => $key]);

        if ($entry) {
            $entry['val'] = $value;
        } else {
            $entry = [
                'key' => $key,
                'val' => $value
            ];
        }

        return $this->driver->save($collection, $entry);
    }


    /**
     * Delete Key(s)
     *
     * @param  string $collection
     * @param  string|array $key
     * @return integer
     */
    public function removeKey(string $collection, mixed $key): mixed {
        return $this->driver->remove($collection, ['key' => (is_array($key) ? ['$in' => $key] : $key)]);
    }

    /**
     * Check if key exists
     *
     * @param  string $collection @param  string $collection
     * @param  string $key
     */
    public function keyExists(string $collection, string $key): bool {
        return $this->driver->count($collection, ['key' => $key]) > 0;
    }

    /**
     * Increment value by x
     *
     * @param  string  $collection
     * @param  string  $key
     * @param  integer $by
     * @return integer
     */
    public function incrKey(string $collection, string $key, int $by = 1): int {

        $current = $this->getKey($collection, $key, 0);
        $newone  = $current + $by;

        $this->setKey($collection, $key, $newone);

        return $newone;
    }

    /**
     * Decrement value by x
     *
     * @param  string  $collection
     * @param  string  $key
     * @param  integer $by
     * @return integer
     */
    public function decrKey(string $collection, string $key, int $by = 1): int {
        return $this->incrKey($collection, $key, ($by * -1));
    }

    /**
     * Add item to a value (right)
     *
     * @param  string $collection @param  string $collection
     * @param  string $key
     * @param  mixed $value
     * @return integer
     */
    public function rpush(string $collection, string $key, mixed $value): int {

        $list = $this->getKey($collection, $key, []);

        $list[] = $value;

        $this->setKey($collection, $key, $list);

        return count($list);
    }

    /**
     * Add item to a value (left)
     *
     * @param  string $collection @param  string $collection
     * @param  string $key
     * @param  mixed $value
     * @return integer
     */
    public function lpush(string $collection, string $key, mixed $value): int {

        $list = $this->getKey($collection, $key, []);

        array_unshift($list, $value);

        $this->setKey($collection, $key, $list);

        return count($list);
    }



    /**
     * Set the value of an element in a list by its index
     *
     * @param  string $collection
     * @param  string $key
     * @param  integer $index
     * @param  mixed $value
     * @return boolean
     */
    public function lset(string $collection, string $key, int $index, mixed $value): bool {

        $list = $this->getKey($collection, $key, []);

        if ($index < 0) {
            $index = count($list) - abs($index);
        }

        if (isset($list[$index])){
            $list[$index] = $value;
            $this->setKey($collection, $key, $list);

            return true;
        }

        return false;
    }

    /**
     * Get an element from a list by its index
     *
     * @param  string $collection
     * @param  string $key
     * @param  integer $index
     * @return mixed
     */
    public function lindex(string $collection, string $key, int $index): mixed {

        $list = $this->getKey($collection, $key, []);

        if ($index < 0) {
            $index = count($list) - abs($index);
        }

        return isset($list[$index]) ? $list[$index]:null;
    }

    /**
     * Set the string value of a hash field
     *
     * @param  string $collection
     * @param  string $key
     * @param  string $field
     * @param  mixed $value
     */
    public function hset(string $collection, string $key, string $field, mixed $value): void {

        $set = $this->getKey($collection, $key, []);

        $set[$field] = $value;
        $this->setKey($collection, $key, $set);
    }

    /**
     * Get the value of a hash field
     *
     * @param  string $collection
     * @param  string $key
     * @param  string $field
     * @param  mixed $default
     * @return mixed
     */
    public function hget(string $collection, string $key, string $field, mixed $default = null): mixed {

        $set = $this->getKey($collection, $key, []);

        return isset($set[$field]) ? $set[$field]:$default;
    }

    /**
     * Get all the fields and values in a hash
     *
     * @param  string $collection
     * @param  string $key
     * @return array
     */
    public function hgetall(string $collection, string $key): array {

        $set = $this->getKey($collection, $key, []);

        return $set;
    }

    /**
     * Determine if a hash field exists
     *
     * @param  string $collection
     * @param  string $key
     * @param  string $field
     * @return boolean
     */
    public function hexists(string $collection, string $key, string $field): bool {

        $set = $this->getKey($collection, $key, []);

        return isset($set[$field]);
    }

    /**
     * Get all the fields in a hash
     *
     * @param  string $collection
     * @param  string $key
     * @return array
     */
    public function hkeys(string $collection, string $key): array {

        $set = $this->getKey($collection, $key, []);

        return array_keys($set);
    }

    /**
     * Get all the values in a hash
     *
     * @param  string $collection
     * @param  string $key
     * @return array
     */
    public function hvals(string $collection, string $key): array {

        $set = $this->getKey($collection, $key, []);

        return array_values($set);
    }

    /**
     * Get the number of fields in a hash
     *
     * @param  string $collection
     * @param  string $key
     * @return integer
     */
    public function hlen(string $collection, string $key): int {

        return count($this->hkeys($collection, $key));
    }

    /**
     * Delete one or more hash fields
     *
     * @param  string $collection
     * @param  string $key
     * @return integer
     */
    public function hdel(string $collection, string $key): int {

        $set = $this->getKey($collection, $key, []);

        if (!count($set)) return 0;

        $fields  = func_get_args();
        $removed = 0;
        $cnt     = count($fields);

        for ($i=1; $i<$cnt; $i++){

            $field = $fields[$i];

            if (isset($set[$field])){
                unset($set[$field]);
                $removed++;
            }
        }

        $this->setKey($collection, $key, $set);

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
    public function hincrby(string $collection, string $key, string $field, int $by = 1): int {

        $current = $this->hget($collection, $key, $field, 0);
        $newone  = $current+$by;

        $this->hset($collection, $key, $field, $newone);

        return $newone;
    }

    /**
     * Get the values of all the given hash fields
     *
     * @param  string $collection
     * @param  string $key
     * @return array
     */
    public function hmget(string $collection, string $key): array {

        $set     = $this->getKey($collection, $key, []);
        $fields  = func_get_args();
        $values  = [];
        $cnt     = count($fields);

        for ($i=1; $i<$cnt; $i++){
            $field = $fields[$i];
            $values[] = isset($set[$field]) ? $set[$field]:null;
        }

        return $values;
    }

    /**
     * Set multiple hash fields to multiple values
     *
     * @param  string $collection
     * @param  string $key
     */
    public function hmset(string $collection, string $key): void {

        $set   = $this->getKey($collection, $key, []);
        $args  = func_get_args();
        $cnt   = count($args);

        for ($i=1; $i<$cnt; $i++){
            $field = $args[$i];
            $value = isset($args[($i+1)]) ? $args[($i+1)] : null;

            $set[$field] = $value;
            $i = $i + 1;
        }

        $this->setKey($collection, $key, $set);
    }


    public function __call($method, $args) {

        return call_user_func_array([$this->driver, $method], $args);
    }
}
