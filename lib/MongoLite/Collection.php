<?php

namespace MongoLite;

/**
 * Collection object.
 */
class Collection {

    /**
     * @var object Database
     */
    public Database $database;

    /**
     * @var string
     */
    public string $name;

    /**
     * Constructor
     *
     * @param string $name
     * @param Database $database
     */
    public function __construct(string $name, Database $database) {
        $this->name = $name;
        $this->database = $database;
    }

    /**
     * Get the database instance
     */
    public function getDatabase(): Database {
        return $this->database;
    }

    /**
     * Drop collection
     */
    public function drop(): void {
        $this->database->dropCollection($this->name);
    }

    /**
     * Insert many documents
     *
     * @param array $documents
     * @return count of inserted documents for arrays
     */
    public function insertMany(array $documents): int {
        return $this->insert($documents);
    }

    /**
     * Insert document
     *
     * @param  array $document
     * @return mixed last_insert_id for single document or
     * count count of inserted documents for arrays
     */
    public function insert(array &$document): mixed {

        if (isset($document[0])) {

            $this->database->connection->beginTransaction();

            foreach ($document as &$doc) {

                if (!\is_array($doc)) continue;

                $res = $this->_insert($doc);

                if (!$res) {
                    $this->database->connection->rollBack();
                    return $res;
                }
            }
            $this->database->connection->commit();
            return \count($document);
        } else {
            return $this->_insert($document);
        }
    }
    /**
     * Insert document
     *
     * @param  array $document
     * @return mixed
     */
    protected function _insert(array &$document): mixed {

        // Sanitize collection name
        $table = $this->getSanitizedCollectionName();
        $document['_id'] = isset($document['_id']) ? $document['_id'] : createMongoDbLikeId();
        $data            = ['document' => \json_encode($document, JSON_UNESCAPED_UNICODE)];

        $fields = [];
        $values = [];

        foreach ($data as $col=>$value){
            $fields[] = "`{$col}`";
            $values[] = (\is_null($value) ? 'NULL' : $this->database->connection->quote($value));
        }

        $fields = \implode(',', $fields);
        $values = \implode(',', $values);

        $sql = "INSERT INTO `{$table}` ({$fields}) VALUES ({$values})";
        $res = $this->database->connection->exec($sql);

        if ($res){
            return $document['_id'];
        } else {
            trigger_error('SQL Error: '.\implode(', ', $this->database->connection->errorInfo()).":\n".$sql);
            return false;
        }
    }

    /**
     * Save document
     *
     * @param  array $document
     * @return mixed
     */
    public function save(array &$document, bool $create = false): mixed {

        if (isset($document['_id'])) {
            $ret = $this->update(['_id' => $document['_id']], ['$set' => $document]);

            // insert document if document doesn't exist
            if (!$ret && $create) {
                $ret = $this->insert($document);
            }

        } else {
            $ret = $this->insert($document);
        }

        return $ret;
    }

    /**
     * Update documents
     *
     * @param  mixed $criteria
     * @param  array $data
     * @return integer
     */
    public function update(mixed $criteria, array $data, bool $merge = true): int {

        $criteriaFnId = $this->database->registerCriteriaFunction($criteria);
        
        // Sanitize criteria function ID to prevent SQL injection
        $sanitizedCriteriaId = $this->database->sanitizeCriteriaId($criteriaFnId);
        if (!$sanitizedCriteriaId) {
            $this->database->unregisterCriteriaFunction($criteriaFnId);
            throw new \InvalidArgumentException("Invalid criteria function ID");
        }
        
        // Sanitize collection name
        $sanitizedName = $this->getSanitizedCollectionName();

        $conn   = $this->database->connection;
        $sql    = "SELECT id, document FROM `{$sanitizedName}` WHERE document_criteria('".$sanitizedCriteriaId."', document)";
        $stmt   = $conn->query($sql);
        $result = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        $this->database->unregisterCriteriaFunction($criteriaFnId);

        foreach ($result as &$doc) {

            $_doc            = \json_decode($doc['document'], true);
            $document        = $merge ? \array_merge($_doc, $data['$set'] ?? []) : $data;
            $document['_id'] = $_doc['_id'];

            $sql = "UPDATE `{$sanitizedName}` SET document=".$conn->quote(json_encode($document, JSON_UNESCAPED_UNICODE))." WHERE id=".(int)$doc['id'];

            $conn->exec($sql);
        }

        return count($result);
    }

    /**
     * Remove documents
     *
     * @param  mixed $criteria
     * @return mixed
     */
    public function remove(mixed $criteria): mixed {

        $criteriaFnId = $this->database->registerCriteriaFunction($criteria);
        
        // Sanitize criteria function ID to prevent SQL injection
        $sanitizedCriteriaId = $this->database->sanitizeCriteriaId($criteriaFnId);
        if (!$sanitizedCriteriaId) {
            $this->database->unregisterCriteriaFunction($criteriaFnId);
            throw new \InvalidArgumentException("Invalid criteria function ID");
        }
        
        // Sanitize collection name
        $sanitizedName = $this->getSanitizedCollectionName();

        $sql = "DELETE FROM `{$sanitizedName}` WHERE document_criteria('".$sanitizedCriteriaId."', document)";

        $result = $this->database->connection->exec($sql);

        $this->database->unregisterCriteriaFunction($criteriaFnId);

        return $result;
    }

    /**
     * Count documents in collections
     *
     * @param  mixed $criteria
     * @return integer
     */
    public function count(mixed $criteria = null): int {

        return $this->find($criteria)->count();
    }

    /**
     * Find documents
     *
     * @param  mixed $criteria
     * @return Cursor Cursor
     */
    public function find(mixed $criteria = null, ?array $projection = null): Cursor {
        return new Cursor($this, $this->database->registerCriteriaFunction($criteria), $projection);
    }

    /**
     * Find one document
     *
     * @param  mixed $criteria
     * @return array
     */
    public function findOne(mixed $criteria = null, ?array $projection = null): ?array {

        $items = $this->find($criteria, $projection)->limit(1)->toArray();

        return $items[0] ?? null;
    }

    /**
     * Data aggregation
     *
     * @param  array $pipeline
     * @return Aggregation\Cursor
     */
    public function aggregate(array $pipeline): Aggregation\Cursor {
        return new Aggregation\Cursor($this, $pipeline);
    }

    /**
     * Rename Collection
     *
     * @param  string $newname [description]
     * @return boolean
     */
    public function renameCollection(string $newname): bool {

        if (!in_array($newname, $this->database->getCollectionNames())) {

            // Sanitize both old and new collection names
            $sanitizedOldName = $this->getSanitizedCollectionName();
            
            $sanitizedNewName = preg_replace('/[^a-zA-Z0-9_-]/', '', $newname);
            if ($sanitizedNewName !== $newname || empty($sanitizedNewName)) {
                throw new \InvalidArgumentException("Invalid new collection name: {$newname}");
            }
            
            $this->database->connection->exec("ALTER TABLE `{$sanitizedOldName}` RENAME TO `{$sanitizedNewName}`");
            $this->name = $newname;

            return true;
        }

        return false;
    }
    
    /**
     * Get sanitized collection name to prevent SQL injection
     * 
     * @return string
     * @throws \InvalidArgumentException if collection name is invalid
     */
    protected function getSanitizedCollectionName(): string {
        $sanitized = preg_replace('/[^a-zA-Z0-9_-]/', '', $this->name);
        
        if ($sanitized !== $this->name || empty($sanitized)) {
            throw new \InvalidArgumentException("Invalid collection name: {$this->name}");
        }
        
        return $sanitized;
    }
}
