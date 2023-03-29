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

    public function addDocument(mixed $id, array $data, bool $safe = true) {

        if ($safe) {
            $this->removeDocument($id);
        }

        $data['id'] = $id;

        $this->addDocuments([$data]);
    }

    public function replaceDocument(mixed $id, array $data) {
        return $this->addDocument($id, $data, true);
    }

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

                $data[":{$field}"] = $value;
            }

            $data[":__payload"] = json_encode($document);

            $insertStmt->execute($data);
        }

        $this->db->commit();
    }

    public function removeDocument(mixed $id) {
        $sql = "DELETE FROM documents WHERE id = :id LIMIT 1";
        $stmt = $this->db->prepare($sql);
        $stmt->bindValue(':id', $id);
        $stmt->execute();
    }

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

    public function clear() {
        $this->db->exec('DELETE FROM documents');
    }

    public function search(string $query, array $options = []) {

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

        return $items;
    }

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

    private function buildMatchQuery(string $query, int $fuzzyDistance = null): string {

        $fields = [];
        $_fields = $this->fields;

        if (preg_match('/(\w+):/', $query)) {

            preg_match_all('/(\w+):\s*([\'"][^\'"]+[\'"]|\S+)/', $query, $matches, PREG_SET_ORDER);

            foreach ($matches as $match) {

                if (!in_array($match[1], $_fields)) continue;

                $field = $match[1];
                $value = trim($match[2], '\'"');
                $fields[$field] = $value;
            }

        } else {

            foreach ($_fields as $field) {
                $fields[$field] = $query;
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

    private function buildInsertQuery() {

        $fields = $this->fields;

        $placeholders = array_map(function ($field) {
            return ":{$field}";
        }, $fields);

        $fieldsString = implode(', ', $fields);
        $placeholdersString = implode(', ', $placeholders);

        return "INSERT INTO documents ({$fieldsString}) VALUES ({$placeholdersString})";
    }

    protected function stringify(mixed $value): string {

        if (\is_string($value)) {
            return $value;
        }

        if (!$value) {
            return '';
        }

        if (\is_numeric($value)) {
            return $value.'';
        }

        if (\is_array($value)) {

            $str = [];

            array_walk_recursive($value, function($val) use(&$str) {

                if (is_string($val) && strlen($val) > 15) {
                    $str[] = $val;
                }
            });

            return implode(' ', $str);
        }

        return '';
    }

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

function uuidv4() {

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
