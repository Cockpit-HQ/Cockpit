<?php

namespace IndexLite;

use PDO;

// Include FuzzyEnhancer for enhanced fuzzy search capabilities
require_once __DIR__ . '/FuzzyEnhancer.php';

class Index {

    private PDO $db;
    private array $fields;
    private ?FuzzyEnhancer $fuzzyEnhancer = null;

    public function __construct(string $path, array $options = []) {

        $this->db = new PDO("sqlite:{$path}");
        $this->fields = $this->getFieldsFromExistingTable();

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
            $this->db->exec("PRAGMA {$key} = {$value}");
        }
    }

    /**
     * Returns the database connection.
     *
     * This method is used by the Autocomplete class to access the database.
     *
     * @return PDO The database connection.
     */
    public function getConnection(): PDO {
        return $this->db;
    }

    /**
     * Returns the fields defined in the index.
     *
     * @return array The array of field names.
     */
    public function getFields(): array {
        return $this->fields;
    }

    /**
     * Get or create the fuzzy enhancer instance
     */
    private function getFuzzyEnhancer(): FuzzyEnhancer {
        if (!$this->fuzzyEnhancer) {
            $this->fuzzyEnhancer = new FuzzyEnhancer($this->db);
        }
        return $this->fuzzyEnhancer;
    }

    /**
     * Creates and returns an Autocomplete instance for this index.
     *
     * @return Autocomplete The autocomplete helper for this index.
     */
    public function autocomplete(): Autocomplete {
        return new Autocomplete($this);
    }

    /**
     * Creates a virtual table using FTS5 in an SQLite database.
     *
     * @param string $path The filepath of the SQLite database.
     * @param array $fields An array of field names for the virtual table.
     * @param array $options Optional parameters for customization.
     *
     * @return void
     */
    public static function create(string $path, array $fields, array $options = []) {

        $db = new PDO("sqlite:{$path}");
        $tokenizer = $options['tokenizer'] ?? 'porter unicode61 remove_diacritics 1';

        $ftsFields = ['id UNINDEXED', '__payload UNINDEXED'];

        foreach ($fields as $field) {

            if (in_array($field, ['id', '__payload'])) {
                continue;
            }

            $ftsFields[] = $field;
        }

        $ftsFieldsString = implode(', ', $ftsFields);

        $db->exec("CREATE VIRTUAL TABLE IF NOT EXISTS documents USING fts5({$ftsFieldsString}, tokenize='{$tokenizer}')");
    }

    /**
     * Retrieves the field names from an existing table in the SQLite database.
     *
     * @return array An array of field names, or an empty array if the table does not exist or an error occurs.
     */
    private function getFieldsFromExistingTable(): array {
        $result = $this->db->query("PRAGMA table_info(documents)");
        if ($result === false) {
            return [];
        }

        $fields = [];
        while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
            $fields[] = $row['name'];
        }

        return $fields;
    }

    /**
     * Adds a document to the virtual table in the SQLite database.
     *
     * @param mixed $id The unique identifier for the document.
     * @param array $data The data to be added as a document.
     * @param bool $safe Optional parameter to indicate whether the document needs to be removed before adding (default: true).
     *
     * @return void
     */
    public function addDocument(mixed $id, array $data, bool $safe = true): void {

        if ($safe) {
            $this->removeDocument($id);
        }

        $data['id'] = $id;

        $this->addDocuments([$data]);
    }

    /**
     * Replaces a document in the virtual table using FTS5 in an SQLite database.
     *
     * @param mixed $id The identifier of the document to replace.
     * @param array $data An array of data to replace the document with.
     *
     * @return void
     */
    public function replaceDocument(mixed $id, array $data): void {
        $this->addDocument($id, $data, true);
    }

    /**
     * Adds multiple documents to the database
     *
     * @param array $documents The documents to add
     *
     * @return void
     */
    public function addDocuments(array $documents) {

        $this->db->beginTransaction();
        $insertStmt = $this->db->prepare($this->buildInsertQuery());

        foreach ($documents as $document) {

            if (!isset($document['id'])) {
                $document['id'] = Utils::uuidv4();
            }

            $data = [];

            foreach ($this->fields as $field) {

                if (!isset($document[$field])) {
                    $document[$field] = null;
                }

                $value = $document[$field];
                $value = Utils::stringifyValue($value);
                $value = Utils::processHtmlContent($value);

                $data[":{$field}"] = $value;
            }

            $data[":__payload"] = json_encode($document);

            $insertStmt->execute($data);
        }

        $this->db->commit();
    }

    /**
     * Removes a document from the database by its ID
     *
     * @param mixed $id The ID of the document to remove
     *
     * @return void
     */
    public function removeDocument(mixed $id) {
        $sql = "DELETE FROM documents WHERE id = :id";
        $stmt = $this->db->prepare($sql);
        $stmt->bindValue(':id', $id);
        $stmt->execute();
    }

    /**
     * Counts the number of documents in the database based on the given query and filter.
     * If no query is provided, counts all documents.
     *
     * @param string $query The query string to search for
     * @param string $filter The additional filter to apply to the query
     *
     * @return int The number of documents matching the query and filter
     */
    public function countDocuments(string $query = '', string $filter = ''): int {

        if ($query) {

            $where = $this->buildMatchQuery($query);

            if ($filter) {
                $where = "({$where}) AND {$filter}";
            }

            $sql = "SELECT COUNT(*) FROM documents WHERE {$where}";

        } else {
            $sql = "SELECT COUNT(*) FROM documents";
        }

        $stmt = $this->db->prepare($sql);
        $stmt->execute();

        return $stmt->fetchColumn();
    }

    /**
     * Clears all documents from the database.
     *
     * @return void
     */
    public function clear(): void {
        $this->db->exec('DELETE FROM documents');
    }

    /**
     * Searches for documents based on the given query and options.
     *
     * @param string $query The search query.
     * @param array $options An array of options (optional).
     *  Possible options:
     *   - fields: The fields to retrieve from the documents (default: '*').
     *   - limit: The maximum number of documents to retrieve (default: 50).
     *   - offset: The offset to start retrieving documents from (default: 0).
     *   - filter: Additional filter to apply to the search query (default: '').
     *   - fuzzy: Enable fuzzy search (null=disabled, int=FTS5 NEAR distance, true=enhanced algorithms)
     *   - fuzzy_algorithm: Algorithm for enhanced fuzzy ('fts5', 'levenshtein', 'jaro_winkler', 'trigram', 'soundex', 'hybrid')
     *   - fuzzy_threshold: Distance threshold for algorithms (default: 2)
     *   - fuzzy_min_score: Minimum score for hybrid algorithm (default: 70)
     *
     * @return array The search results as an associative array with the following keys:
     *   - hits: An array of documents matching the search query.
     *   - query: The search query.
     *   - processingTimeMs: The execution time of the search in milliseconds.
     *   - limit: The maximum number of documents retrieved.
     *   - offset: The offset used for retrieving documents.
     *   - estimatedTotalHits: The estimated total number of documents that match the search query.
     */
    public function search(string $query, array $options = []) {

        $start = microtime(true);

        $options = array_merge([
            'fields' => '*',
            'limit' => 50,
            'offset' => 0,
            'filter' => '',
            'boosts' => [],
            'fuzzy' => null,
            'fuzzy_algorithm' => 'fts5',        // Algorithm: fts5, levenshtein, jaro_winkler, trigram, soundex, hybrid
            'fuzzy_threshold' => 2,             // Threshold for distance-based algorithms
            'fuzzy_min_score' => 70,            // Minimum score for hybrid algorithm
        ], $options);

        if ($options['fields'] !== '*') {
            $options['fields'] = is_string($options['fields']) ? array_map(fn($f) => trim($f), explode(',' , $options['fields'])) : $options['fields'];
            $intersectFields = array_flip($options['fields']);
        }

        if ($query) {
            
            // Check if we should use enhanced fuzzy search
            if ($options['fuzzy'] !== null && $options['fuzzy_algorithm'] !== 'fts5') {
                return $this->enhancedFuzzySearch($query, $options);
            }

            $where = $this->buildMatchQuery($query, $options['fuzzy'], $options['boosts']);

            if ($options['filter']) {
                $where = "({$where}) AND {$options['filter']}";
            }

            $sql = "SELECT * FROM documents WHERE {$where} ORDER BY rank LIMIT :limit OFFSET :offset";

        } else {
            $sql = "SELECT * FROM documents LIMIT :limit OFFSET :offset";
        }

        $stmt = $this->db->prepare($sql);
        $stmt->bindValue(':limit', intval($options['limit']), PDO::PARAM_INT);
        $stmt->bindValue(':offset', intval($options['offset']), PDO::PARAM_INT);
        $stmt->execute();

        $items = $stmt->fetchAll(PDO::FETCH_ASSOC);

        foreach ($items as &$item) {

            $payload = json_decode($item['__payload'] ?? '{}', true);
            $item = array_merge($item, $payload);
            unset($item['__payload']);

            if ($options['fields'] !== '*') {
                $item = array_intersect_key($item, $intersectFields);
            }
        }

        $count = count($items);

        if ($options['offset'] || $count === $options['limit']) {
            $count = $this->countDocuments($query);
        }

        $processingTimeMs = (microtime(true) - $start) * 1000;

        $result = [
            'hits' => $items,
            'query' => $query,
            'processingTimeMs' => $processingTimeMs,
            'limit' => $options['limit'],
            'offset' => $options['offset'],
            'estimatedTotalHits' => $count,
        ];

        return $result;
    }

    /**
     * Enhanced fuzzy search using custom SQLite functions
     */
    private function enhancedFuzzySearch(string $query, array $options): array {
        $start = microtime(true);
        $enhancer = $this->getFuzzyEnhancer();
        $fields = $this->getFields();
        
        // Build fuzzy WHERE clause
        $fuzzyWhere = $enhancer->buildEnhancedFuzzyQuery($query, $fields, [
            'algorithm' => $options['fuzzy_algorithm'],
            'threshold' => $options['fuzzy_threshold'],
            'min_score' => $options['fuzzy_min_score'],
        ]);
        
        // Add filter if provided
        if ($options['filter']) {
            $where = "({$fuzzyWhere}) AND {$options['filter']}";
        } else {
            $where = $fuzzyWhere;
        }
        
        // Build relevance score based on algorithm
        $scoreExpr = $this->buildScoreExpression($query, $fields, $options);
        
        // Execute query
        $sql = "SELECT *, {$scoreExpr} as relevance_score 
                FROM documents 
                WHERE {$where} 
                ORDER BY relevance_score DESC 
                LIMIT :limit OFFSET :offset";
        
        $stmt = $this->db->prepare($sql);
        $stmt->bindValue(':limit', intval($options['limit']), PDO::PARAM_INT);
        $stmt->bindValue(':offset', intval($options['offset']), PDO::PARAM_INT);
        $stmt->execute();
        
        $items = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Apply field filtering if needed
        if ($options['fields'] !== '*') {
            $intersectFields = is_string($options['fields']) 
                ? array_flip(array_map('trim', explode(',', $options['fields']))) 
                : array_flip($options['fields']);
        }
        
        // Process results
        foreach ($items as &$item) {
            $payload = json_decode($item['__payload'] ?? '{}', true);
            $item = array_merge($item, $payload);
            unset($item['__payload']);
            
            // Apply field filtering if needed
            if ($options['fields'] !== '*') {
                $item = array_intersect_key($item, $intersectFields);
            }
        }
        
        // Count total results
        $countSql = "SELECT COUNT(*) FROM documents WHERE {$where}";
        $count = $this->db->query($countSql)->fetchColumn();
        
        $processingTimeMs = (microtime(true) - $start) * 1000;
        
        return [
            'hits' => $items,
            'query' => $query,
            'processingTimeMs' => $processingTimeMs,
            'limit' => $options['limit'],
            'offset' => $options['offset'],
            'estimatedTotalHits' => $count,
            'fuzzy_algorithm' => $options['fuzzy_algorithm'],
        ];
    }

    /**
     * Build relevance score expression based on algorithm with SQL injection protection
     */
    private function buildScoreExpression(string $query, array $fields, array $options): string {
        $algorithm = $options['fuzzy_algorithm'];
        $expressions = [];
        
        // Escape the query to prevent SQL injection
        $escapedQuery = $this->escapeQueryForSql($query);
        
        foreach ($fields as $field) {
            if ($field === 'id' || $field === '__payload') continue;
            
            // Sanitize field name (only allow alphanumeric and underscore)
            $sanitizedField = preg_replace('/[^a-zA-Z0-9_]/', '', $field);
            if ($sanitizedField !== $field || empty($sanitizedField)) {
                continue; // Skip invalid field names
            }
            
            $boost = (float) ($options['boosts'][$field] ?? 1.0);
            
            switch ($algorithm) {
                case 'levenshtein':
                    $expressions[] = "(100 - levenshtein_ci({$sanitizedField}, {$escapedQuery}) * 10) * {$boost}";
                    break;
                    
                case 'jaro_winkler':
                    $expressions[] = "jaro_winkler({$sanitizedField}, {$escapedQuery}) * 100 * {$boost}";
                    break;
                    
                case 'trigram':
                    $expressions[] = "trigram_similarity({$sanitizedField}, {$escapedQuery}) * 100 * {$boost}";
                    break;
                    
                case 'hybrid':
                default:
                    $expressions[] = "fuzzy_score({$sanitizedField}, {$escapedQuery}) * {$boost}";
                    break;
            }
        }
        
        // Return the maximum score from all fields, or 0 if no expressions
        if (empty($expressions)) {
            return '0';
        }
        
        if (count($expressions) === 1) {
            return $expressions[0];
        }
        
        return 'MAX(' . implode(', ', $expressions) . ')';
    }

    /**
     * Performs a faceted search for documents based on the given query, facet field, and options.
     *
     * @param string $query The search query.
     * @param string $facetField The field to be used for faceting.
     * @param array $options An array of options (optional).
     *  Possible options:
     *   - limit: The maximum number of facets to retrieve (default: 50).
     *   - offset: The offset to start retrieving facets from (default: 0).
     *   - filter: Additional filter to apply to the search query (default: '').
     *
     * @return array The faceted search results as an associative array with the following keys:
     *   - facets: An array of facets matching the search query, each with the following keys:
     *     - name: The facet field name.
     *     - count: The number of documents that have the facet value.
     *   - query: The search query.
     *   - limit: The maximum number of facets retrieved.
     *   - offset: The offset used for retrieving facets.
     *
     * @throws PDOException if there is an error executing the SQL statement.
     */
    public function facetSearch(string $query, string $facetField, array $options = []): array {

        $options = array_merge([
            'limit' => 50,
            'offset' => 0,
            'filter' => '',
        ], $options);

        $where = $this->buildMatchQuery($query);

        if ($options['filter']) {
            $where = "({$where}) AND {$options['filter']}";
        }

        $sql = "SELECT {$facetField}, COUNT(*) as count FROM documents WHERE {$where} GROUP BY {$facetField} ORDER BY count DESC";

        if ($options['limit']) {

            $limit  = intval($options['limit']);
            $offset = intval($options['offset']);
            $sql   .= " LIMIT {$limit} OFFSET {$offset}";
        }

        $stmt = $this->db->prepare($sql);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * Builds a match query for searching documents based on the given query and fuzzy distance.
     *
     * @param string $query The search query.
     * @param int|null $fuzzyDistance The fuzzy distance for fuzzy matching (optional).
     *
     * @return string The built match query as a string.
     */
    private function buildMatchQuery(string $query, ?int $fuzzyDistance = null, array $boosts = []): string {

        $fields = [];
        $_fields = $this->fields;
        $hasBoosts = !empty($boosts);

        if (preg_match('/(\w+):/', $query)) {

            preg_match_all('/(\w+):\s*([\'"][^\'"]+[\'"]|\S+)/', $query, $matches, PREG_SET_ORDER);

            foreach ($matches as $match) {

                if (!in_array($match[1], $_fields)) continue;

                $field = $match[1];
                $value = trim($match[2], '\'"');
                $fields[$field] = Utils::escapeFts5SpecialChars($value);
            }

        } else {

            foreach ($_fields as $field) {
                $fields[$field] = Utils::escapeFts5SpecialChars($query);
            }
        }

        $searchQueries = [];

        foreach ($fields as $field => $q) {

            if ($field === 'id' || $field === '__payload') {
                continue;
            }

            // Apply fuzzy search if specified
            if ($fuzzyDistance !== null) {
                $matchTerm = "\"{$q}\" NEAR/{$fuzzyDistance}";
            } else {
                $matchTerm = $q;
            }

            // Apply boosting if specified for this field
            if ($hasBoosts && isset($boosts[$field])) {
                $boostValue = (float) $boosts[$field];
                $searchQuery = "(\"{$field}\" MATCH '{$matchTerm}') * {$boostValue}";
            } else {
                $searchQuery = "\"{$field}\" MATCH '{$matchTerm}'";
            }

            $searchQueries[] = $searchQuery;
        }

        // Combine queries with OR
        $combinedQuery = implode(' OR ', $searchQueries);

        // If we have boosts, we need to wrap in a bm25() expression for proper weight calculation
        if ($hasBoosts) {
            return "bm25(documents, {$combinedQuery})";
        }

        return $combinedQuery;
    }

    /**
     * Builds an insert query based on the fields defined in the class.
     *
     * @return string The insert query string.
     *
     * Example usage:
     *
     * $queryBuilder = new QueryBuilder();
     *
     * $query = $queryBuilder->buildInsertQuery();
     *
     * // $query will contain the insert query string based on the fields defined in the QueryBuilder class.
     */
    private function buildInsertQuery() {

        $fields = $this->fields;

        $placeholders = array_map(function ($field) {
            return ":{$field}";
        }, $fields);

        $fieldsString = implode(', ', $fields);
        $placeholdersString = implode(', ', $placeholders);

        return "INSERT INTO documents ({$fieldsString}) VALUES ({$placeholdersString})";
    }

    /**
     * Updates the indexed fields for the documents table.
     *
     * @param array $fields An array of fields to be updated.
     * @param string|null $tokenizer The tokenizer to use for the updated fields (optional).
     *
     * @return void
     */
    public function updateIndexedFields($fields, ?string $tokenizer = null) {

        $fields = array_filter($fields, fn($field) => $field !== 'id' && $field !== '__payload');
        $currentFields = array_filter($this->fields, fn($field) => $field !== 'id' && $field !== '__payload');

        if (!count(array_diff($fields, $currentFields))) {
            return;
        }

        // Rename the current table
        $this->db->exec('ALTER TABLE documents RENAME TO documents_old');

        $fields = array_merge(['id', '__payload'], $fields);
        $currentFields = array_merge(['id', '__payload'], $currentFields);
        $columns = implode(', ', array_intersect($currentFields, $fields));

        // Create a new table with updated fields
        $tokenizer = $tokenizer ?? 'porter unicode61 remove_diacritics 1';
        $ftsFields = ['id UNINDEXED', '__payload UNINDEXED'];

        foreach ($fields as $field) {
            if (in_array($field, ['id', '__payload'])) continue;
            $ftsFields[] = $field;
        }

        $ftsFieldsString = implode(', ', $ftsFields);

        $this->db->exec("CREATE VIRTUAL TABLE IF NOT EXISTS documents USING fts5({$ftsFieldsString}, tokenize='{$tokenizer}')");

        // Copy data from the old table to the new table
        $this->db->exec("INSERT INTO documents ({$columns}) SELECT {$columns} FROM documents_old");
        // Drop the old table
        $this->db->exec('DROP TABLE documents_old');
        // Update the fields property
        $this->fields = $fields;
    }
    
    /**
     * Properly escape query strings for SQL to prevent injection
     */
    protected function escapeQueryForSql(string $query): string {
        // Remove any null bytes
        $query = str_replace("\0", '', $query);
        
        // Escape single quotes by doubling them
        $query = str_replace("'", "''", $query);
        
        // Wrap in single quotes
        return "'{$query}'";
    }
}
