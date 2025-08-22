<?php

namespace MongoLite;

use MongoLite\Aggregation\ValueAccessor;

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
        
        // Encode document with error handling
        $json = \json_encode($document, JSON_UNESCAPED_UNICODE);
        if ($json === false) {
            throw new \RuntimeException('Failed to encode document: ' . json_last_error_msg());
        }
        $data = ['document' => $json];

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
            $errorInfo = $this->database->connection->errorInfo();
            throw new \PDOException('SQL Error: ' . implode(', ', $errorInfo) . " - Query: " . $sql, (int)$errorInfo[1]);
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

        // Wrap multi-document updates in a transaction for consistency
        if (count($result) > 0) {
            $conn->beginTransaction();
            
            try {
                foreach ($result as &$doc) {
                    $_doc = \json_decode($doc['document'], true);
                    
                    // Apply update operators
                    $document = $this->applyUpdateOperators($_doc, $data, $merge);
                    $document['_id'] = $_doc['_id'];

                    // Encode document with error handling
                    $json = json_encode($document, JSON_UNESCAPED_UNICODE);
                    if ($json === false) {
                        throw new \RuntimeException('Failed to encode document during update: ' . json_last_error_msg());
                    }
                    
                    $sql = "UPDATE `{$sanitizedName}` SET document=".$conn->quote($json)." WHERE id=".(int)$doc['id'];

                    $conn->exec($sql);
                }
                
                $conn->commit();
            } catch (\Exception $e) {
                $conn->rollBack();
                throw $e;
            }
        }

        return count($result);
    }

    /**
     * Apply update operators to a document
     *
     * @param array $document The original document
     * @param array $updates The update operations
     * @param bool $merge Whether to merge or replace (for backward compatibility)
     * @return array The updated document
     */
    protected function applyUpdateOperators(array $document, array $updates, bool $merge = true): array {
        // Check if we have update operators
        $hasOperators = false;
        foreach ($updates as $key => $value) {
            if (str_starts_with($key, '$')) {
                $hasOperators = true;
                break;
            }
        }
        
        // If no operators and not merging, replace the document
        if (!$hasOperators && !$merge) {
            return $updates;
        }
        
        // If no operators and merging, treat as $set
        if (!$hasOperators && $merge) {
            // Use ValueAccessor for proper dot-notation support in shallow merge
            foreach ($updates as $field => $value) {
                ValueAccessor::set($document, $field, $value);
            }
            return $document;
        }
        
        // Process each operator
        foreach ($updates as $operator => $fields) {
            switch ($operator) {
                case '$set':
                    // Set or update fields using ValueAccessor for proper dot-notation
                    if (is_array($fields)) {
                        foreach ($fields as $field => $value) {
                            ValueAccessor::set($document, $field, $value);
                        }
                    }
                    break;
                    
                case '$unset':
                    // Remove fields using ValueAccessor for proper dot-notation
                    if (is_array($fields)) {
                        foreach ($fields as $field => $value) {
                            // MongoDB uses any truthy value to unset
                            if ($value) {
                                ValueAccessor::unset($document, $field);
                            }
                        }
                    }
                    break;
                    
                case '$inc':
                    // Increment numeric fields with dot-notation support
                    if (is_array($fields)) {
                        foreach ($fields as $field => $increment) {
                            if (is_numeric($increment)) {
                                $current = ValueAccessor::get($document, $field, 0);
                                if (is_numeric($current)) {
                                    ValueAccessor::set($document, $field, $current + $increment);
                                } else {
                                    throw new \InvalidArgumentException("Cannot increment non-numeric field: {$field}");
                                }
                            }
                        }
                    }
                    break;
                    
                case '$push':
                    // Append to array fields with dot-notation support
                    if (is_array($fields)) {
                        foreach ($fields as $field => $value) {
                            $current = ValueAccessor::get($document, $field);
                            if ($current === null) {
                                $current = [];
                            }
                            if (!is_array($current)) {
                                throw new \InvalidArgumentException("Cannot push to non-array field: {$field}");
                            }
                            // Handle $each modifier
                            if (is_array($value) && isset($value['$each']) && is_array($value['$each'])) {
                                foreach ($value['$each'] as $item) {
                                    $current[] = $item;
                                }
                            } else {
                                $current[] = $value;
                            }
                            ValueAccessor::set($document, $field, $current);
                        }
                    }
                    break;
                    
                case '$addToSet':
                    // Add to array only if not already present with dot-notation support
                    if (is_array($fields)) {
                        foreach ($fields as $field => $value) {
                            $current = ValueAccessor::get($document, $field);
                            if ($current === null) {
                                $current = [];
                            }
                            if (!is_array($current)) {
                                throw new \InvalidArgumentException("Cannot addToSet to non-array field: {$field}");
                            }
                            // Handle $each modifier
                            if (is_array($value) && isset($value['$each']) && is_array($value['$each'])) {
                                foreach ($value['$each'] as $item) {
                                    if (!$this->arrayContainsValue($current, $item)) {
                                        $current[] = $item;
                                    }
                                }
                            } else {
                                if (!$this->arrayContainsValue($current, $value)) {
                                    $current[] = $value;
                                }
                            }
                            ValueAccessor::set($document, $field, $current);
                        }
                    }
                    break;
                    
                default:
                    // Unknown operator - for backward compatibility with $set behavior
                    if (str_starts_with($operator, '$')) {
                        // Ignore unknown operators
                    } else if ($merge) {
                        // If not an operator and merge is true, treat as field to set
                        $document[$operator] = $fields;
                    }
                    break;
            }
        }
        
        return $document;
    }
    
    /**
     * Check if an array contains a value (deep comparison for arrays/objects)
     */
    protected function arrayContainsValue(array $array, mixed $value): bool {
        foreach ($array as $item) {
            if ($this->valuesEqual($item, $value)) {
                return true;
            }
        }
        return false;
    }
    
    /**
     * Compare two values for equality (deep comparison for arrays)
     */
    protected function valuesEqual(mixed $a, mixed $b): bool {
        if (is_array($a) && is_array($b)) {
            return json_encode($a) === json_encode($b);
        }
        return $a === $b;
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
     * Count documents matching criteria (ignoring skip/limit)
     * MongoDB-compatible method for accurate document counting
     *
     * @param  mixed $criteria
     * @return integer
     */
    public function countDocuments(mixed $criteria = null): int {
        // Get sanitized collection name
        $sanitizedName = $this->getSanitizedCollectionName();
        
        if (!$criteria) {
            $stmt = $this->database->connection->query("SELECT COUNT(*) AS C FROM `{$sanitizedName}`");
        } else {
            // Register and sanitize criteria
            $criteriaId = $this->database->registerCriteriaFunction($criteria);
            $sanitizedCriteriaId = $this->database->sanitizeCriteriaId($criteriaId);
            
            if (!$sanitizedCriteriaId) {
                throw new \InvalidArgumentException("Invalid criteria function ID");
            }
            
            $sql = "SELECT COUNT(*) AS C FROM `{$sanitizedName}` WHERE document_criteria('{$sanitizedCriteriaId}', document)";
            $stmt = $this->database->connection->query($sql);
            
            // Unregister criteria to prevent memory leaks
            $this->database->unregisterCriteriaFunction($criteriaId);
        }
        
        $res = $stmt->fetch(\PDO::FETCH_ASSOC);
        return intval(isset($res['C']) ? $res['C'] : 0);
    }

    /**
     * Get estimated document count (fast count of all documents)
     * MongoDB-compatible method for quick collection size estimation
     *
     * @return integer
     */
    public function estimatedDocumentCount(): int {
        // Get sanitized collection name
        $sanitizedName = $this->getSanitizedCollectionName();
        
        // Use fast COUNT(*) without criteria for estimation
        $stmt = $this->database->connection->query("SELECT COUNT(*) AS C FROM `{$sanitizedName}`");
        $res = $stmt->fetch(\PDO::FETCH_ASSOC);
        
        return intval(isset($res['C']) ? $res['C'] : 0);
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
        $sanitized = $this->database->sanitizeCollectionName($this->name);
        
        if ($sanitized === null) {
            throw new \InvalidArgumentException("Invalid collection name: {$this->name}");
        }
        
        return $sanitized;
    }
}
