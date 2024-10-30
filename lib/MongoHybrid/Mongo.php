<?php

namespace MongoHybrid;

use MongoDB\Client as MongoDBClient;
use MongoDB\BSON\ObjectID;
use MongoDB\Driver\Command;

class Mongo {

    protected MongoDBClient $client;
    protected \MongoDB\Database $db;
    protected array $options;

    public function __construct(string $server, array $options=[], array $driverOptions=[]) {

        $driverOptions = array_merge([
            'typeMap' => ['root' => 'array', 'document' => 'array', 'array' => 'array']
        ], $driverOptions);

        $this->client  = new MongoDBClient($server, $options, $driverOptions);
        $this->db      = $this->client->selectDatabase($options['db']);
        $this->options = $options;
    }

    public function isValidId(string $objectId) {
        try {
            $id = new ObjectID($objectId);
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }

    public function lstCollections(): array {

        $return = [];

        $collections = $this->db->listCollectionNames();

        foreach ($collections as $collection) {

            $return[] = str_replace('_', '/', $collection);
        }

        return $return;
    }

    public function getCollection(string $name, ?string $db = null): \MongoDB\Collection {

        if ($db) {
            $name = "{$db}/{$name}";
        }

        $name = str_replace('/', '_', $name);

        return $this->db->selectCollection($name);
    }

    public function dropCollection(string $name, ?string $db = null): array|object {

        if ($db) {
            $name = "{$db}/{$name}";
        }

        $name = str_replace('/', '_', $name);

        return $this->db->dropCollection($name);
    }

    public function renameCollection(string $name, string $newname, ?string $db = null): bool {

        if ($db) {
            $name = "{$db}/{$name}";
            $newname = "{$db}/{$newname}";
        }

        $name = str_replace('/', '_', $name);
        $newname = str_replace('/', '_', $newname);

        $collections = iterator_to_array($this->db->listCollections([
            'filter' => [ 'name' => $name ]
        ]));

        if (!count($collections)) {
            return false;
        }

        //$dbname = $this->db->getDatabaseName();

        // notice works for mongodb < 4.0
        $this->db->command(["eval" => "db.{$name}.renameCollection({$newname})"]);

        return true;
    }

    public function createIndex(string $collectionName, array $key, array $options = []) {

        $col = $this->getCollection($collectionName);

        return $col->createIndex($key, $options);
    }

    public function dropIndex(string $collectionName, string $indexName, array $options = []) {

        $col = $this->getCollection($collectionName);

        if ($indexName === '*') {
            return $col->dropIndexes($options);
        }

        return $col->dropIndex($indexName, $options);
    }

    public function lstIndexes(string $collectionName, array $options = []): array {

        $indexes = [];

        $col = $this->getCollection($collectionName);
        $idxs = $col->listIndexes($options);

        foreach ($idxs as $idx) {

            $type = null;

            if ($idx->isText()) {
                $type = 'text';
            } elseif ($idx->is2dSphere()) {
                $type = '2dsphere';
            }

            $indexes[] = [
                'name' => $idx->getName(),
                'type' => $type,
                'unique' => $idx->isUnique(),
                'ttl' => $idx->isTtl(),
                'sparse' => $idx->isSparse(),
            ];
        }

        return $indexes;
    }


    public function findOneById(string $collection, mixed $id): ?array {

        if (is_string($id)) $id = new ObjectID($id);

        $doc =  $this->getCollection($collection)->findOne(['_id' => $id]);

        if (isset($doc['_id'])) $doc['_id'] = (string) $doc['_id'];

        return $doc;
    }

    public function findOne(string $collection, ?array $filter = null, ?array $projection = null): ?array {

        if (!$filter) $filter = [];

        $filter = $this->_fixForMongo($filter, true);
        $doc    = $this->getCollection($collection)->findOne($filter, ['projection' => $projection ?? []]);

        if (isset($doc['_id'])) $doc['_id'] = (string) $doc['_id'];

        return $doc;
    }

    public function find(string $collection, array $options = []): ResultSet {

        $filter = isset($options['filter']) && $options['filter'] ? $options['filter'] : [];
        $fields = isset($options['fields']) && $options['fields'] ? $options['fields'] : [];
        $limit  = isset($options['limit'])  && $options['limit']  ? $options['limit']  : null;
        $sort   = isset($options['sort'])   && $options['sort']   ? $options['sort']   : null;
        $skip   = isset($options['skip'])   && $options['skip']   ? $options['skip']   : null;

        $filter = $this->_fixForMongo($filter, true);

        $cursor = $this->getCollection($collection)->find($filter, [
            'projection' => $fields,
            'limit' => $limit,
            'skip'  => $skip,
            'sort'  => $sort
        ]);

        $docs = $cursor->toArray();

        if (count($docs)) {

            foreach ($docs as &$doc) {
                if(isset($doc['_id'])) $doc['_id'] = (string) $doc['_id'];
            }

        } else {
            $docs = [];
        }

        $resultSet = new ResultSet($this, $docs);

        return $resultSet;
    }

    public function aggregate(string $collection, array $pipeline) {

        $cursor = $this->getCollection($collection)->aggregate($pipeline);
        $docs = $cursor->toArray();
        $resultSet = new ResultSet($this, $docs);

        return $resultSet;
    }

    public function getFindTermFilter($term) {

        $terms = str_getcsv(trim($term), ' ');

        $filter = ['$where' => "function() { return JSON.stringify(this).indexOf('{$term}') > -1; }"];

        if (count($terms) > 1) {

            $filter = ['$or' => []];

            foreach ($terms as $term) {
                $filter['$or'][] = ['$where' => "function() { return JSON.stringify(this).indexOf('{$term}') > -1; }"];
            }
        }

        return $filter;
    }

    public function insert(string $collection, array &$doc): mixed {

        if (isset($doc[0])) {

            foreach($doc as &$d) {
                $this->insert($collection, $d);
            }

            return $doc;
        }

        $doc = $this->_fixForMongo($doc);
        $ref = $doc;

        $return = $this->getCollection($collection)->insertOne($ref);

        $ref['_id'] = $return->getInsertedId();

        if (isset($ref['_id'])) $ref['_id'] = (string) $ref['_id'];

        $doc = $ref;

        return $return;
    }

    public function save(string $collection, array &$data, bool $create = false): mixed {

        $data = $this->_fixForMongo($data);
        $ref  = $data;

        if (isset($data['_id'])) {

            if ($create) {
                $return = $this->getCollection($collection)->replaceOne(['_id' => $data['_id']], $ref, ['upsert' => true]);
            } else {
                $return = $this->getCollection($collection)->updateOne(['_id' => $data['_id']], ['$set' => $ref]);
            }

        } else {
            $return = $this->getCollection($collection)->insertOne($ref);
            $ref['_id'] = $return->getInsertedId();
        }

        if (isset($ref['_id'])) $ref['_id'] = (string) $ref['_id'];

        $data = $ref;

        return $return;
    }

    public function update(string $collection, mixed $criteria, array $data) {

        $criteria = $this->_fixForMongo($criteria);
        $data     = $this->_fixForMongo($data);

        return $this->getCollection($collection)->updateMany($criteria, ['$set' => $data]);
    }

    public function remove(string $collection, array $filter = []) {

        if (!$filter) $filter = [];

        $filter = $this->_fixForMongo($filter);

        return $this->getCollection($collection)->deleteMany($filter);
    }

    public function removeField(string $collection, string $field, array $filter = []) {

        $opts = ['$unset' => []];
        $opts['$unset'][$field] = 1;

        $filter = $this->_fixForMongo($filter);

        return $this->getCollection($collection)->updateMany($filter, $opts);
    }

    public function renameField(string $collection, string $field, string $newfield, array $filter = []) {

        $opts = ['$rename' => []];
        $opts['$rename'][$field] = $newfield;

        $filter = $this->_fixForMongo($filter);

        return $this->getCollection($collection)->updateMany($filter, $opts);
    }

    public function count(string $collection, ?array $filter = null, array $options = []) {

        if (!$filter) $filter = [];

        $filter = $this->_fixForMongo($filter, true);

        return $this->getCollection($collection)->countDocuments($filter, $options);
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

                if (is_string($v) && isset($v[0])) {
                    $v = $v[0] === '@' ? \substr($v, 1) : $this->getObjectID($v);
                } elseif (is_array($v)) {

                    if (isset($v['$in'])) {

                        foreach ($v['$in'] as &$id) {
                            $id = $this->getObjectID($id);
                        }
                    }

                    if (isset($v['$nin'])) {

                        foreach ($v['$nin'] as &$id) {
                            $id = $this->getObjectID($id);
                        }
                    }

                    if (isset($v['$ne']) && is_string($v['$ne'])) {
                        $v['$ne'] = $this->getObjectID($v['$ne']);
                    }

                }
            }

            // eg ArrayObject
            if (\is_object($v) && \is_iterable($v)) {
                $v = \json_decode(\json_encode($v), true);
            }

            if (is_string($v) && str_starts_with($v, '$DATE(')) {
                $format = trim(substr($v, 6, -1));
                $v = date($format ?: 'Y-m-d');
            }
        }

        return $data;
    }

    protected function getObjectID($v) {

        if (is_string($v)) {
            try {
                $v = new ObjectID($v);
            } catch (\Throwable $e) {}
        }

        return $v;
    }
}
