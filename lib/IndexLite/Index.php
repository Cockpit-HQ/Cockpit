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

        $ftsFields = ['id UNINDEXED'];

        foreach ($fields as $field) {

            if ($field == 'id') {
                continue;
            }

            $ftsFields[] = $field;
        }

        $ftsFieldsString = implode(', ', $ftsFields);

        $db->exec("CREATE VIRTUAL TABLE IF NOT EXISTS documents USING fts5({$ftsFieldsString})");
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

    public function addDocuments(array $documents) {

        $this->db->beginTransaction();
        $insertStmt = $this->db->prepare($this->buildInsertQuery());

        foreach ($documents as $document) {

            if (!isset($document['id'])) {
                throw new \Exception('Document must have an id');
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

    public function updateDocument(mixed $id, array $data) {

        $updateFields = [];

        foreach ($this->fields as $field) {
            if ($field === 'id' || !isset($data[$field])) continue;
            $updateFields[] = "{$field} = :{$field}";
        }

        $updateFieldsStr = implode(', ', $updateFields);
        $sql = "UPDATE documents SET {$updateFieldsStr} WHERE id = :id LIMIT 1";
        $stmt = $this->db->prepare($sql);
        $stmt->bindValue(':id', $id);

        foreach ($this->fields as $field) {

            if ($field === 'id' || !isset($data[$field])) continue;

            $value = $data[$field];

            if (is_array($value) || is_object($value)) {
                $value = $this->stringify($value);
            }
            $stmt->bindValue(":{$field}", $value);
        }

        $stmt->execute();
    }

    public function search(string $query, array $options = []) {

        $options = array_merge([
            'fields' => '*',
            'limit' => 50,
            'offset' => 0,
            'filter' => '',
        ], $options);


        $fields = is_array($options['fields']) ? implode(', ', $options['fields']) : $options['fields'];
        $where = $this->buildMatchQuery($query);

        if ($options['filter']) {
            $where = "({$where}) AND {$options['filter']}";
        }

        $sql = "SELECT {$fields} FROM documents WHERE {$where} ORDER BY rank LIMIT :limit OFFSET :offset";

        $stmt = $this->db->prepare($sql);
        $stmt->bindValue(':limit', intval($options['limit']), PDO::PARAM_INT);
        $stmt->bindValue(':offset', intval($options['offset']), PDO::PARAM_INT);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function facetSearch($query, $facetField, $limit = 10, $offset = 0, $filter = '')
    {
        $where = $this->buildMatchQuery($query);

        if ($filter) {
            $where = "({$where}) AND {$filter}";
        }

        $sql = "SELECT {$facetField}, COUNT(*) as count FROM documents WHERE {$where} GROUP BY {$facetField} ORDER BY count DESC";
        return $this->executeSearchQuery($sql, $limit, $offset);
    }

    private function buildMatchQuery(string $query, int $fuzzyDistance = null): string {
        if (preg_match_all('/(\w+):/', $query, $matches)) {
            $fieldsInQuery = array_intersect($matches[1], $this->fields);
        } else {
            $fieldsInQuery = $this->fields;
        }

        $searchQueries = [];

        foreach ($fieldsInQuery as $field) {
            $searchQuery = "{$field} MATCH '{$query}'";
            if ($fuzzyDistance !== null) {
                $searchQuery = "{$field} MATCH '\"{$query}\" NEAR/{$fuzzyDistance}'";
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

    private function executeSearchQuery(string $sql, int $limit, int $offset) {

        $stmt = $this->db->prepare($sql);
        $stmt->bindValue(':limit', (int)$limit, PDO::PARAM_INT);
        $stmt->bindValue(':offset', (int)$offset, PDO::PARAM_INT);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
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
}
