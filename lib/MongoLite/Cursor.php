<?php

namespace MongoLite;

use Iterator;
use PDO;

/**
 * Cursor object.
 */
class Cursor implements Iterator {

    /**
     * @var boolean|integer
     */
    protected bool|int $position = false;

    /**
     * @var array
     */
    protected array $data = [];

    /**
     * @var Collection object
     */
    protected Collection $collection;

    /**
     * @var string|null
     */
    protected ?string $criteria;

    /**
     * @var array|null
     */
    protected ?array $projection;

    /**
     * @var null|integer
     */
    protected ?int $limit = null;

    /**
     * @var null|integer
     */
    protected ?int $skip = null;

    /**
     * @var null|array
     */
    protected ?array $sort = null;

    /**
     * Constructor
     *
     * @param object $collection
     * @param mixed $criteria
     */
    public function __construct(Collection $collection, mixed $criteria, ?array $projection = null) {
        $this->collection  = $collection;
        $this->criteria    = $criteria;
        $this->projection  = $projection;
    }

    /**
     * Destructor method to clean up resources or perform necessary actions
     * when the object is destroyed.
     *
     * @return void
     */
    public function __destruct() {

        if ($this->criteria) {
            $this->collection->database->unregisterCriteriaFunction($this->criteria);
        }
    }

    /**
     * Documents count
     *
     * @return integer
     */
    public function count(): int {
        
        // Get sanitized collection name
        $sanitizedName = $this->getSanitizedCollectionName();

        if (!$this->criteria) {

            $stmt = $this->collection->database->connection->query("SELECT COUNT(*) AS C FROM `{$sanitizedName}`");

        } else {
            
            // Sanitize criteria function ID
            $sanitizedCriteriaId = $this->collection->database->sanitizeCriteriaId($this->criteria);
            if (!$sanitizedCriteriaId) {
                throw new \InvalidArgumentException("Invalid criteria function ID");
            }

            $sql = ["SELECT COUNT(*) AS C FROM `{$sanitizedName}`"];

            $sql[] = "WHERE document_criteria('{$sanitizedCriteriaId}', document)";

            if ($this->limit) {
                $sql[] = "LIMIT ".(int)$this->limit;
            }

            $stmt = $this->collection->database->connection->query(implode(' ', $sql));
        }

        $res  = $stmt->fetch(PDO::FETCH_ASSOC);

        return intval(isset($res['C']) ? $res['C']:0);
    }

    /**
     * Set limit
     *
     * @param  int $limit
     * @return object       Cursor
     */
    public function limit(?int $limit): self {

        $this->limit = $limit;

        return $this;
    }

    /**
     * Set sort
     *
     * @param  mixed $sorts
     * @return object       Cursor
     */
    public function sort(?array $sorts): self {

        $this->sort = $sorts;

        return $this;
    }

    /**
     * Set skip
     *
     * @param  int $skip
     * @return object       Cursor
     */
    public function skip(?int $skip): self {

        $this->skip = $skip;

        return $this;
    }

    /**
     * Loop through result set
     *
     * @param  mixed $callable
     * @return object
     */
    public function each(mixed $callable): self {


        foreach ($this->current() as $document) {
            $callable($document);
        }

        return $this;
    }

    /**
     * Get documents matching criteria
     *
     * @return array
     */
    public function toArray(): array {
        return $this->getData();
    }


    /**
     * Get documents matching criteria
     *
     * @return array
     */
    protected function getData(): array {
        
        // Get sanitized collection name
        $sanitizedName = $this->getSanitizedCollectionName();

        $conn = $this->collection->database->connection;
        $sql = ["SELECT document FROM `{$sanitizedName}`"];

        if ($this->criteria) {
            // Sanitize criteria function ID
            $sanitizedCriteriaId = $this->collection->database->sanitizeCriteriaId($this->criteria);
            if (!$sanitizedCriteriaId) {
                throw new \InvalidArgumentException("Invalid criteria function ID");
            }
            
            $sql[] = "WHERE document_criteria('{$sanitizedCriteriaId}', document)";
        }

        if ($this->sort) {

            $orders = [];

            foreach ($this->sort as $field => $direction) {
                $orders[] = 'document_key('.$conn->quote($field).', document) '.($direction==-1 ? 'DESC':'ASC');
            }

            $sql[] = 'ORDER BY '. implode(',', $orders);
        }

        if ($this->limit) {
            $sql[] = "LIMIT ".(int)$this->limit;

            if ($this->skip) { $sql[] = "OFFSET ".(int)$this->skip; }
        }

        $sql = implode(' ', $sql);

        $stmt      = $conn->query($sql);
        $result    = $stmt->fetchAll( PDO::FETCH_ASSOC);
        $documents = [];

        foreach ($result as &$doc) {
            $documents[] = json_decode($doc['document'], true);
        }

        if (is_array($this->projection)) {
            $documents = Projection::onDocuments($documents, $this->projection);
        }

        return $documents;
    }

    /**
     * Iterator implementation
     */
    public function rewind(): void {

        if ($this->position!==false) {
            $this->position = 0;
        }
    }

    public function current(): array {

        return $this->data[$this->position];
    }

    public function key(): int {
        return $this->position;
    }

    public function next(): void {
        ++$this->position;
    }

    public function valid(): bool {

        if ($this->position===false) {

            $this->data     = $this->getData();
            $this->position = 0;
        }

        return isset($this->data[$this->position]);
    }
    
    /**
     * Get sanitized collection name to prevent SQL injection
     * 
     * @return string
     * @throws \InvalidArgumentException if collection name is invalid
     */
    protected function getSanitizedCollectionName(): string {
        $sanitized = preg_replace('/[^a-zA-Z0-9_-]/', '', $this->collection->name);
        
        if ($sanitized !== $this->collection->name || empty($sanitized)) {
            throw new \InvalidArgumentException("Invalid collection name: {$this->collection->name}");
        }
        
        return $sanitized;
    }

}
