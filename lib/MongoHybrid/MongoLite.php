<?php

namespace MongoHybrid;

use MongoLite\Client as MongoLiteClient;

class MongoLite {

    protected MongoLiteClient $client;
    protected string $db;

    public function __construct(string $server, array $options = []) {

        $this->client = new MongoLiteClient(str_replace('mongolite://', '', $server));
        $this->db     = $options['db'];
    }

    public function isValidId(string $objectId) {
        return preg_match('/^[0-9a-f]{24}$/', $objectId) === 1;
    }

    public function lstCollections(): array {

        $return = [];

        $databases = $this->client->listDBs();

        foreach ($databases as $database) {

            $collections = $this->client->selectDB($database)->getCollectionNames();

            foreach ($collections as $collection) {

                $return[] = str_replace('_', '/', "{$database}/{$collection}");
            }
        }

        return $return;
    }

    public function getCollection(string $name, ?string $db = null): \MongoLite\Collection {

        if (str_contains($name, '/')) {
            list($db, $name) = explode('/', $name, 2);
        }

        if (!$db) {
            $db = $this->db;
        }

        $name = str_replace('/', '_', $name);

        return $this->client->selectCollection($db, $name);
    }

    public function dropCollection(string $name, ?string $db = null) {

        if (str_contains($name, '/')) {
            list($db, $name) = explode('/', $name, 2);
        }

        if (!$db) {
            $db = $this->db;
        }

        $name = str_replace('/', '_', $name);

        return $this->client->selectDB($db)->dropCollection($name);
    }

    public function renameCollection(string $name, string $newname, ?string $db = null): bool {

        if (str_contains($name, '/')) {
            list($db, $name) = explode('/', $name, 2);
        }

        if (!$db) {
            $db = $this->db;
        }

        $db = $this->client->selectDB($db);

        $name = str_replace('/', '_', $name);
        $newname = str_replace('/', '_', $newname);

        if (!in_array($name, $db->getCollectionNames())) {
            return false;
        }

        $db->connection->exec("ALTER TABLE `{$name}` RENAME TO `{$newname}`");

        return true;
    }

    public function createIndex(string $collectionName, array $key, array $options = []) {
        return uniqid('index.');
    }

    public function dropIndex(string $collectionName, string $indexName, array $options = []) {
        return [];
    }

    public function lstIndexes(string $collectionName, array $options = []): array {
        return [];
    }

    public function findOne(string $collection, ?array $filter = null, ?array $projection = null): ?array {
        if (!$filter) $filter = [];

        $filter = $this->_fixForMongo($filter, true);

        return $this->getCollection($collection)->findOne($filter, $projection);
    }

    public function findOneById(string $collection, string $id): ?array {
        return $this->getCollection($collection)->findOne(['_id' => $id]);
    }

    public function find(string $collection, array $options = []): ResultSet {

        $filter = $options['filter'] ?? [];
        $fields = isset($options['fields']) && $options['fields'] ? $options['fields'] : null;
        $limit  = $options['limit'] ?? null;
        $sort   = $options['sort'] ?? null;
        $skip   = $options['skip'] ?? null;

        $filter = $this->_fixForMongo($filter, true);
        $cursor = $this->getCollection($collection)->find($filter, $fields);

        if ($limit) $cursor->limit($limit);
        if ($sort)  $cursor->sort($sort);
        if ($skip)  $cursor->skip($skip);

        $docs = $cursor->toArray();

        return new ResultSet($this, $docs);
    }

    public function aggregate(string $collection, array $pipeline): ResultSet {

        $cursor = $this->getCollection($collection)->aggregate($pipeline);
        $docs   = $cursor->toArray();

        return new ResultSet($this, $docs);
    }

    public function getFindTermFilter($term): \Closure {

        $terms = str_getcsv(trim($term), ' ');

        $filter = function ($doc) use ($term) {
            return stripos(json_encode($doc), $term) !== false;
        };

        if (count($terms) > 1) {

            $filter = function($doc) use($terms) {

                $json = json_encode($doc);

                foreach ($terms as $term) {
                    if (stripos($json, $term) !== false) return true;
                }

                return false;
            };
        }

        return $filter;
    }

    public function insert(string $collection, array &$doc) {
        $doc = $this->_fixForMongo($doc, true);
        return $this->getCollection($collection)->insert($doc);
    }

    public function save(string $collection, array &$data, bool $create = false) {
        $data = $this->_fixForMongo($data);
        return $this->getCollection($collection)->save($data, $create);
    }

    public function update(string $collection, mixed $criteria, array $data) {
        $criteria = $this->_fixForMongo($criteria);
        $data     = $this->_fixForMongo($data);
        return $this->getCollection($collection)->update($criteria, ['$set' => $data]);
    }

    public function remove(string $collection, array $filter = []) {

        $filter = $this->_fixForMongo($filter);

        return $this->getCollection($collection)->remove($filter);
    }

    public function removeField(string $collection, string $field, array $filter = []): bool {

        $collection = $this->getCollection($collection);
        $filter = $this->_fixForMongo($filter);

        foreach ($collection->find($filter) as $doc) {

            if (isset($doc[$field])) {
                unset($doc[$field]);
                $collection->update(['_id' => $doc['_id']], $doc, false);
            }
        }

        return true;
    }

    public function renameField(string $collection, string $field, string $newfield, array $filter = []): bool {

        $collection = $this->getCollection($collection);
        $filter = $this->_fixForMongo($filter);

        foreach ($collection->find($filter) as $doc) {

            if (isset($doc[$field])) {
                $doc[$newfield] = $doc[$field];
                unset($doc[$field]);
                $collection->update(['_id' => $doc['_id']], $doc, false);
            }
        }

        return true;
    }

    public function count(string $collection, mixed $filter = null): int {
        $filter = $this->_fixForMongo($filter, true);
        return $this->getCollection($collection)->count($filter);
    }

    protected function _fixForMongo(mixed &$data, bool $infinite = false, int $_level = 0): mixed {

        if (!is_array($data)) {
            return $data;
        }

        if ($_level == 0 && isset($data[0])) {
            foreach ($data as $i => $doc) {
                $data[$i] = $this->_fixForMongo($doc, $infinite);
            }
            return $data;
        }

        foreach ($data as $k => &$v) {

            if (is_array($data[$k]) && $infinite) {
                $data[$k] = $this->_fixForMongo($data[$k], $infinite, $_level + 1);
            }

            if ($k === '_id') {

                if (is_string($v) && isset($v[0]) && $v[0] === '@') {
                    $v = \substr($v, 1);
                }
            }

            if (is_string($v) && str_starts_with($v, '$DATE(')) {
                $format = trim(substr($v, 6, -1));
                $v = date($format ?: 'Y-m-d');
            }
        }

        return $data;
    }

}
