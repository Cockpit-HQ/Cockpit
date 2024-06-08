<?php

namespace IndexLite;

use PDO;

class Index {

    private PDO $db;
    private array $fields;

    public function __construct(string $path) {
        $this->db = new PDO("sqlite:{$path}");
        $this->fields = $this->getFieldsFromExistingTable();

        $this->db->exec('PRAGMA journal_mode = MEMORY');
        $this->db->exec('PRAGMA synchronous = OFF');
        $this->db->exec('PRAGMA PAGE_SIZE = 4096');
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
    public function addDocument(mixed $id, array $data, bool $safe = true) {

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
    public function replaceDocument(mixed $id, array $data) {
        return $this->addDocument($id, $data, true);
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
                $document['id'] = uuidv4();
            }

            $data = [];

            foreach ($this->fields as $field) {

                if (!isset($document[$field])) {
                    $document[$field] = null;
                }

                $value = $document[$field];

                if (is_array($value) || is_object($value)) {
                    $value = $this->stringify((array)$value);
                }

                if (!is_string($value)) {
                    $value = is_null($value) ? null : (string)$value;
                }

                // does value contain html?
                if (!is_null($value) && preg_match('/<[^>]+>/', $value)) {
                    $value = strip_tags(preg_replace('/\<br(\s*)?\/?\>/i', "\n", $value));
                }

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
        $sql = "DELETE FROM documents WHERE id = :id LIMIT 1";
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
    public function countDocuments(string $query = '', string $filter = '') {

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
    public function clear() {
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
     *   - payload: Whether to include the full payload in the search results (default: false).
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
            'payload' => false
        ], $options);

        $keepPayload = $options['payload'];
        $fields = is_array($options['fields']) ? implode(', ', $options['fields']) : $options['fields'];

        if ($fields !== '*') {
            $fields .= ', __payload';
        }

        if ($query) {

            $where = $this->buildMatchQuery($query);

            if ($options['filter']) {
                $where = "({$where}) AND {$options['filter']}";
            }

            $sql = "SELECT {$fields} FROM documents WHERE {$where} ORDER BY rank LIMIT :limit OFFSET :offset";

        } else {
            $sql = "SELECT {$fields} FROM documents LIMIT :limit OFFSET :offset";
        }

        $stmt = $this->db->prepare($sql);
        $stmt->bindValue(':limit', intval($options['limit']), PDO::PARAM_INT);
        $stmt->bindValue(':offset', intval($options['offset']), PDO::PARAM_INT);
        $stmt->execute();

        $items = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $keys = array_filter(array_keys($items[0] ?? []), fn($key) => !in_array($key, ['id', '__payload']));

        foreach ($items as &$item) {

            $payload = json_decode($item['__payload'], true);

            unset($item['__payload']);

            if ($keepPayload) {

                foreach ($payload as $key => $value) {
                    $item[$key] = $value;
                }

            } else {

                foreach ($keys as $key) {

                    if (isset($payload[$key])) {
                        $item[$key] = $payload[$key];
                    }
                }
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
    public function facetSearch($query, $facetField, $options = []) {

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
    private function buildMatchQuery(string $query, int $fuzzyDistance = null): string {

        $fields = [];
        $_fields = $this->fields;

        if (preg_match('/(\w+):/', $query)) {

            preg_match_all('/(\w+):\s*([\'"][^\'"]+[\'"]|\S+)/', $query, $matches, PREG_SET_ORDER);

            foreach ($matches as $match) {

                if (!in_array($match[1], $_fields)) continue;

                $field = $match[1];
                $value = trim($match[2], '\'"');
                $fields[$field] = $this->escapeFts5SpecialChars($value);
            }

        } else {

            foreach ($_fields as $field) {
                $fields[$field] = $this->escapeFts5SpecialChars($query);
            }
        }

        $searchQueries = [];

        foreach ($fields as $field => $q) {

            if ($field === 'id' || $field === '__payload') {
                continue;
            }

            $searchQuery = "{$field} MATCH '{$q}'";

            if ($fuzzyDistance !== null) {
                $searchQuery = "{$field} MATCH '\"{$q}\" NEAR/{$fuzzyDistance}'";
            }

            $searchQueries[] = $searchQuery;
        }

        return implode(' OR ', $searchQueries);
    }

    /**
     * Escapes special characters in a query string for use in FTS5 queries.
     *
     * @param string $query The query string to escape.
     *
     * @return string The escaped query string.
     */
    private function escapeFts5SpecialChars($query) {
        // Define the special characters that need to be escaped in FTS5 queries
        $specialChars = '.-@';

        // Split the query string into individual terms
        $terms = preg_split('/\s+/', $query);

        // Iterate through the terms and escape special characters and double quotes
        $escapedTerms = array_map(function ($term) use ($specialChars) {
            // Replace double quotes with two double quotes
            $escapedTerm = str_replace('"', '""', $term);

            // Escape special characters with double quotes
            $pattern = '/([' . preg_quote($specialChars, '/') . '])/';
            $escapedTerm = preg_replace($pattern, '"$1"', $escapedTerm);

            return $escapedTerm;
        }, $terms);

        // Combine the escaped terms back into a single query string
        $escapedQuery = implode(' ', $escapedTerms);

        return $escapedQuery;
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
     * Converts the given input into a string representation.
     *
     * @param mixed $input The input to convert.
     * @return string The string representation of the input. If the input is already a string, it is returned as-is.
     * If the input is not an array or an object, an empty string is returned. If the input is an array or an object,
     * all the string values found recursively are concatenated with a space separator.
     */
    protected function stringify(mixed $input): string {

        $str = [];

        if (is_string($input)) {
            return $input;
        }

        if (!(is_array($input) || !is_object($input))) {
            return '';
        }

        foreach ($input as $value) {

            if (is_string($value)) {
                $str[] = $value;
            } elseif (is_array($value) || is_object($value)) {
                $str[] = $this->stringify($value);
            }
        }

        return implode(' ', $str);
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
}

/**
 * Generates a version 4 UUID (Universally Unique Identifier).
 *
 * @return string The generated UUID.
 */
function uuidv4(): string {

    if (function_exists('random_bytes')) {
        $uuid = bin2hex(random_bytes(16));
    } elseif (function_exists('openssl_random_pseudo_bytes')) {
        $uuid = bin2hex(openssl_random_pseudo_bytes(16));
    } else {
        $uuid = md5(uniqid('', true));
    }

    $uuid[12] = '4';
    $uuid[16] = dechex(hexdec($uuid[16]) & 3 | 8);

    return substr($uuid, 0, 8) . '-' . substr($uuid, 8, 4) . '-' . substr($uuid, 12, 4) . '-' . substr($uuid, 16, 4) . '-' . substr($uuid, 20);
}
