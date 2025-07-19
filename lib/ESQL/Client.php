<?php

namespace ESQL;

use PDO;
use PDOStatement;
use stdClass;

/**
 * ESQL - A lightweight PDO wrapper
 *
 */
class Client {
    private ?PDO $pdo = null;
    private string $dsn;
    private ?string $username;
    private ?string $password;
    private array $options;
    private string $driverName = '';
    private int $paramCounter = 0;

    private bool $autoEncodeJson = true;
    private bool $autoDecodeJson = true;

    /**
     * Constructor.
     *
     * @param string $dsn The Data Source Name.
     * @param array $options Additional options.
     */
    public function __construct(
        string $dsn,
        array $options = [],
    ) {

        $this->dsn = $dsn;

        $this->username = $options['username'] ?? null;
        $this->password = $options['password'] ?? null;

        $this->autoEncodeJson = $options['encodeJson'] ?? true;
        $this->autoDecodeJson = $options['decodeJson'] ?? true;

        $this->options = ($options['pdo'] ?? []) + [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ];

        $dsnParts = explode(':', $this->dsn, 2);

        if (count($dsnParts) < 1 || empty($dsnParts[0])) {
            throw new \InvalidArgumentException("Invalid DSN: Unable to determine driver.");
        }

        $this->driverName = strtolower($dsnParts[0]);

        if (!in_array($this->driverName, ['mysql', 'sqlite', 'pgsql'])) {
            throw new \InvalidArgumentException("Unsupported driver: {$this->driverName}. Supported: mysql, sqlite, pgsql.");
        }

        $this->connect();
    }

    /**
     * Establishes the PDO connection.
     * @throws \PDOException If connection fails.
     */
    private function connect(): void {
        try {
            $this->pdo = new PDO($this->dsn, $this->username, $this->password, $this->options);
        } catch (\PDOException $e) {
            throw new \PDOException("Connection failed: " . $e->getMessage() . " (DSN: {$this->dsn})", (int)$e->getCode());
        }
    }

    /**
     * Returns the detected driver name (mysql, sqlite, pgsql).
     */
    public function getDriverName(): string {
        return $this->driverName;
    }

    /**
     * Returns the PDO instance.
     */
    public function getPdo(): ?PDO {
        return $this->pdo;
    }

    /**
     * Resets the internal parameter counter.
     */
    public function resetParamCounter(): void {
        $this->paramCounter = 0;
    }

    /**
     * Generates a unique parameter name.
     */
    private function generateNamedPlaceholder(string $base = 'p'): string {
        $base = preg_replace('/[^a-zA-Z0-9_]/', '', $base);
        if (empty($base)) { $base = 'p'; }
        $base = substr($base, 0, 20);
        return ':' . $base . '_' . ($this->paramCounter++);
    }

    /**
     * Automatically processes a result set to decode any valid JSON strings.
     */
    private function processResults($results, bool $decodeAssoc = true)
    {
        if (!$this->autoDecodeJson || !$results) {
            return $results;
        }

        $isSingleRow = is_array($results) && !is_array(current($results));
        $rows = $isSingleRow ? [$results] : $results;

        if (is_array($rows)) {
            foreach ($rows as &$row) {
                if (is_array($row)) {
                    foreach ($row as &$value) {
                        if (is_string($value) && json_validate($value)) {
                            $value = json_decode($value, $decodeAssoc);
                        }
                    }
                }
            }
        }

        return $isSingleRow ? $rows[0] : $rows;
    }

    // --- Raw SQL Execution Methods ---

    public function query(string $sql, array $params = []): PDOStatement {
        if (!$this->pdo) {
            throw new \PDOException("PDO connection is not established.");
        }
        try {
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute($params);
            return $stmt;
        } catch (\PDOException $e) {
            throw new \PDOException("Query failed: " . $e->getMessage() . " (SQL: {$sql})", (int)$e->getCode());
        }
    }

    public function fetchOne(string $sql, array $params = [], int $fetchStyle = PDO::FETCH_ASSOC) {
        return $this->query($sql, $params)->fetch($fetchStyle);
    }

    public function fetchAll(string $sql, array $params = [], int $fetchStyle = PDO::FETCH_ASSOC): array {
        return $this->query($sql, $params)->fetchAll($fetchStyle);
    }

    public function fetchColumn(string $sql, array $params = [], int $columnNumber = 0) {
        return $this->query($sql, $params)->fetchColumn($columnNumber);
    }

    public function execute(string $sql, array $params = []): int {
        return $this->query($sql, $params)->rowCount();
    }

    // --- SQL Builder Helper Methods ---

    private function quoteSingleIdentifier(string $identifier): string {
        switch ($this->driverName) {
            case 'mysql':
                return "`" . str_replace("`", "``", $identifier) . "`";
            case 'pgsql':
            case 'sqlite':
                return '"' . str_replace('"', '""', $identifier) . '"';
            default:
                return $identifier;
        }
    }

    protected function quoteIdentifier(string $identifier): string {
        if ($this->isComplexIdentifier($identifier)) {
            return $identifier;
        }

        $parts = preg_split('/\s+as\s+|\s+/i', $identifier, 2);
        $mainIdentifier = $parts[0];
        $alias = isset($parts[1]) ? ' ' . $this->quoteSingleIdentifier($parts[1]) : '';

        if (strpos($mainIdentifier, '.') !== false) {
            $quotedParts = array_map([$this, 'quoteSingleIdentifier'], explode('.', $mainIdentifier));
            return implode('.', $quotedParts) . $alias;
        }

        return $this->quoteSingleIdentifier($mainIdentifier) . $alias;
    }

    private function isComplexIdentifier(string $identifier): bool {
         $trimmed = trim($identifier);
         if (empty($trimmed)) {
             return true; // Empty identifier is complex (used for EXISTS)
         }
         return strpos($trimmed, '(') !== false ||
               strpos($trimmed, '*') !== false ||
               ($trimmed[0] === '"' && $trimmed[strlen($trimmed)-1] === '"') ||
               ($trimmed[0] === '`' && $trimmed[strlen($trimmed)-1] === '`');
    }

    private function buildConditionalClause(array $conditions, array &$params, string $placeholderPrefix = '', string $defaultOperator = 'AND'): string {
        $clauses = [];

        if (isset($conditions['AND']) || isset($conditions['OR'])) {
            $operator = isset($conditions['AND']) ? 'AND' : 'OR';
            $subConditions = $conditions[$operator];
            return $this->buildConditionalClause($subConditions, $params, $placeholderPrefix, $operator);
        }

        foreach ($conditions as $key => $value) {
            if (is_string($key) && in_array(strtoupper($key), ['AND', 'OR'])) {
                $clauses[] = [
                    'operator' => strtoupper($key),
                    'clause' => '(' . $this->buildConditionalClause($value, $params, $placeholderPrefix) . ')'
                ];
                continue;
            }

            $clause = '';
            if (is_int($key) && is_array($value) && count($value) === 3) {
                $col = $this->isComplexIdentifier($value[0]) ? $value[0] : $this->quoteIdentifier($value[0]);
                $op = strtoupper($value[1]);
                $val = $value[2];
                if ($val === null) {
                    $clause = "{$col} " . ($op === '=' ? 'IS NULL' : 'IS NOT NULL');
                } elseif (in_array($op, ['IN', 'NOT IN']) && is_array($val)) {
                    // Handle IN and NOT IN clauses with arrays
                    if (empty($val)) {
                        // Empty array - handle edge case
                        $clause = $op === 'IN' ? "1=0" : "1=1"; // FALSE for IN, TRUE for NOT IN
                    } else {
                        $placeholders = [];
                        foreach ($val as $i => $item) {
                            $placeholder = $this->generateNamedPlaceholder($placeholderPrefix . preg_replace('/[^a-zA-Z0-9_]/', '', $value[0]) . '_' . $i);
                            $placeholders[] = $placeholder;
                            $params[substr($placeholder, 1)] = $item;
                        }
                        $clause = "{$col} {$op} (" . implode(', ', $placeholders) . ")";
                    }
                } elseif (in_array($op, ['BETWEEN', 'NOT BETWEEN']) && is_array($val) && count($val) === 2) {
                    // Handle BETWEEN and NOT BETWEEN clauses with arrays
                    $placeholder1 = $this->generateNamedPlaceholder($placeholderPrefix . preg_replace('/[^a-zA-Z0-9_]/', '', $value[0]) . '_start');
                    $placeholder2 = $this->generateNamedPlaceholder($placeholderPrefix . preg_replace('/[^a-zA-Z0-9_]/', '', $value[0]) . '_end');
                    $clause = "{$col} {$op} {$placeholder1} AND {$placeholder2}";
                    $params[substr($placeholder1, 1)] = $val[0];
                    $params[substr($placeholder2, 1)] = $val[1];
                } elseif (in_array($op, ['EXISTS', 'NOT EXISTS'])) {
                    // Handle EXISTS and NOT EXISTS with subquery
                    if (is_string($val)) {
                        // Raw SQL subquery
                        $clause = "{$op} ({$val})";
                    } elseif (is_array($val) && isset($val['table'])) {
                        // Build subquery from array definition
                        $subquery = $this->buildExistsSubquery($val, $params, $placeholderPrefix . 'exists_');
                        $clause = "{$op} ({$subquery})";
                    } else {
                        throw new \InvalidArgumentException("EXISTS/NOT EXISTS requires a string subquery or array with 'table' key");
                    }
                } else {
                    $placeholder = $this->generateNamedPlaceholder($placeholderPrefix . preg_replace('/[^a-zA-Z0-9_]/', '', $value[0]));
                    $clause = "{$col} {$op} {$placeholder}";
                    $params[substr($placeholder, 1)] = $val;
                }
            } elseif (is_string($key)) {
                $col = $this->isComplexIdentifier($key) ? $key : $this->quoteIdentifier($key);
                if ($value === null) {
                    $clause = "{$col} IS NULL";
                } else {
                    $placeholder = $this->generateNamedPlaceholder($placeholderPrefix . preg_replace('/[^a-zA-Z0-9_]/', '', $key));
                    $clause = "{$col} = {$placeholder}";
                    $params[substr($placeholder, 1)] = $value;
                }
            } elseif (is_int($key) && is_string($value)) {
                $clause = $value;
            }

            if ($clause) {
                $clauses[] = ['operator' => $defaultOperator, 'clause' => $clause];
            }
        }

        $result = '';
        foreach ($clauses as $i => $item) {
            if ($i > 0) {
                $result .= ' ' . $clauses[$i-1]['operator'] . ' ';
            }
            $result .= $item['clause'];
        }
        return $result;
    }

    private function buildOnClause(array $conditions): string {
        $clauses = [];
        foreach($conditions as $condition) {
            if (is_array($condition) && count($condition) === 3) {
                $clauses[] = $this->quoteIdentifier($condition[0]) . " {$condition[1]} " . $this->quoteIdentifier($condition[2]);
            } elseif (is_string($condition)) {
                $clauses[] = $condition;
            }
        }
        return implode(' AND ', $clauses);
    }

    private function buildExistsSubquery(array $subqueryDef, array &$params, string $placeholderPrefix): string {
        // Extract subquery components
        $table = $subqueryDef['table'];
        $columns = $subqueryDef['columns'] ?? ['1'];
        $conditions = $subqueryDef['conditions'] ?? [];
        $joins = $subqueryDef['joins'] ?? [];
        
        // Build SELECT part - don't quote literal numbers
        $quotedColumns = [];
        foreach ($columns as $col) {
            if (is_numeric($col)) {
                $quotedColumns[] = $col;
            } else {
                $quotedColumns[] = $this->quoteIdentifier($col);
            }
        }
        $sql = "SELECT " . implode(', ', $quotedColumns) . " FROM " . $this->quoteIdentifier($table);
        
        // Add JOINs if present
        if (!empty($joins)) {
            foreach ($joins as $join) {
                $joinType = strtoupper(trim($join['type'] ?? 'INNER'));
                $joinTable = $this->quoteIdentifier($join['table']);
                $onCondition = is_array($join['on']) ? $this->buildOnClause($join['on']) : $join['on'];
                $sql .= " {$joinType} JOIN {$joinTable} ON {$onCondition}";
            }
        }
        
        // Add WHERE conditions if present
        if (!empty($conditions)) {
            $sql .= " WHERE " . $this->buildConditionalClause($conditions, $params, $placeholderPrefix);
        }
        
        return $sql;
    }

    // --- Core SQL Builder Methods ---

    public function buildSelectQuery(string $table, array $columns = ['*'], array $joins = [], array $conditions = [], array $groupBy = [], array $having = [], array $orderBy = [], ?int $limit = null, ?int $offset = null): array {
        $this->resetParamCounter();
        $sql = "SELECT " . implode(', ', array_map([$this, 'quoteIdentifier'], $columns)) . " FROM " . $this->quoteIdentifier($table);
        $params = [];

        if (!empty($joins)) {
            foreach ($joins as $join) {
                $joinType = strtoupper(trim($join['type'] ?? 'INNER'));
                $joinTable = $this->quoteIdentifier($join['table']);
                $onCondition = is_array($join['on']) ? $this->buildOnClause($join['on']) : $join['on'];
                $sql .= " {$joinType} JOIN {$joinTable} ON {$onCondition}";
            }
        }

        if (!empty($conditions)) {
            $sql .= " WHERE " . $this->buildConditionalClause($conditions, $params, 'where_');
        }

        if (!empty($groupBy)) {
            $sql .= " GROUP BY " . implode(", ", array_map([$this, 'quoteIdentifier'], $groupBy));
        }

        if (!empty($having)) {
            $sql .= " HAVING " . $this->buildConditionalClause($having, $params, 'having_');
        }

        if (!empty($orderBy)) {
            $orderClauses = [];
            foreach ($orderBy as $column => $direction) {
                $colIdentifier = is_int($column) ? explode(' ', (string)$direction, 2)[0] : (string)$column;
                $dir = strtoupper(is_int($column) ? (explode(' ', (string)$direction, 2)[1] ?? 'ASC') : (string)$direction);
                if (!in_array($dir, ['ASC', 'DESC'])) $dir = 'ASC';
                $orderClauses[] = $this->quoteIdentifier($colIdentifier) . " {$dir}";
            }
            $sql .= " ORDER BY " . implode(', ', $orderClauses);
        }

        if ($limit !== null) {
            $sql .= match ($this->driverName) {
                'mysql' => " LIMIT " . intval($offset) . ", " . intval($limit),
                default => " LIMIT " . intval($limit) . " OFFSET " . intval($offset),
            };
        }

        return ['sql' => $sql, 'params' => $params];
    }

    public function buildInsertQuery(string $table, array $data, array $returning = []): array {
        $this->resetParamCounter();
        $params = [];
        $placeholders = [];
        $columns = array_map([$this, 'quoteIdentifier'], array_keys($data));

        foreach ($data as $column => $value) {
            if ($this->autoEncodeJson && (is_array($value) || is_object($value))) {
                $value = json_encode($value);
            }
            $placeholder = $this->generateNamedPlaceholder($column);
            $placeholders[] = $placeholder;
            $params[substr($placeholder, 1)] = $value;
        }

        $sql = "INSERT INTO {$this->quoteIdentifier($table)} (" . implode(', ', $columns) . ") VALUES (" . implode(', ', $placeholders) . ")";
        if (!empty($returning) && in_array($this->driverName, ['pgsql', 'sqlite'])) {
            $sql .= " RETURNING " . implode(', ', array_map([$this, 'quoteIdentifier'], $returning));
        }
        return ['sql' => $sql, 'params' => $params];
    }

    public function buildInsertBatchQuery(string $table, array $data, array $returning = []): array {
        $this->resetParamCounter();
        $firstRow = current($data);
        $columns = array_map([$this, 'quoteIdentifier'], array_keys($firstRow));
        $params = [];
        $rowPlaceholders = [];

        foreach ($data as $row) {
            $singleRow = [];
            foreach ($row as $column => $value) {
                if ($this->autoEncodeJson && (is_array($value) || is_object($value))) {
                    $value = json_encode($value);
                }
                $placeholder = $this->generateNamedPlaceholder($column);
                $singleRow[] = $placeholder;
                $params[substr($placeholder, 1)] = $value;
            }
            $rowPlaceholders[] = '(' . implode(', ', $singleRow) . ')';
        }

        $sql = "INSERT INTO {$this->quoteIdentifier($table)} (" . implode(', ', $columns) . ") VALUES " . implode(', ', $rowPlaceholders);
        if (!empty($returning) && in_array($this->driverName, ['pgsql', 'sqlite'])) {
            $sql .= " RETURNING " . implode(', ', array_map([$this, 'quoteIdentifier'], $returning));
        }
        return ['sql' => $sql, 'params' => $params];
    }

    public function buildUpdateQuery(string $table, array $data, array $conditions, array $returning = []): array {
        $this->resetParamCounter();
        $params = [];
        $setClauses = [];

        foreach ($data as $column => $value) {
            if ($this->autoEncodeJson && (is_array($value) || is_object($value))) {
                $value = json_encode($value);
            }
            $placeholder = $this->generateNamedPlaceholder('set_' . $column);
            $setClauses[] = $this->quoteIdentifier($column) . " = {$placeholder}";
            $params[substr($placeholder, 1)] = $value;
        }

        $sql = "UPDATE {$this->quoteIdentifier($table)} SET " . implode(', ', $setClauses);
        if (!empty($conditions)) {
            $sql .= " WHERE " . $this->buildConditionalClause($conditions, $params, 'where_');
        }
        if (!empty($returning) && in_array($this->driverName, ['pgsql', 'sqlite'])) {
            $sql .= " RETURNING " . implode(', ', array_map([$this, 'quoteIdentifier'], $returning));
        }
        return ['sql' => $sql, 'params' => $params];
    }

    public function buildDeleteQuery(string $table, array $conditions, array $returning = []): array {
        $this->resetParamCounter();
        $sql = "DELETE FROM {$this->quoteIdentifier($table)}";
        $params = [];

        if (!empty($conditions)) {
            $sql .= " WHERE " . $this->buildConditionalClause($conditions, $params, 'where_');
        }
        if (!empty($returning) && in_array($this->driverName, ['pgsql', 'sqlite'])) {
            $sql .= " RETURNING " . implode(', ', array_map([$this, 'quoteIdentifier'], $returning));
        }
        return ['sql' => $sql, 'params' => $params];
    }

    // --- High-Level Public Query Methods ---

    private function getDefaultQueryOptions(): array {
        return [
            'columns'       => ['*'],
            'joins'         => [],
            'conditions'    => [],
            'groupBy'       => [],
            'having'        => [],
            'orderBy'       => [],
            'limit'         => null,
            'offset'        => null,
            'fetchStyle'    => $this->options[PDO::ATTR_DEFAULT_FETCH_MODE] ?? PDO::FETCH_ASSOC,
            'jsonDecodeAssoc' => true,
        ];
    }

    public function select(string $table, array $options = []): array {
        $opt = array_merge($this->getDefaultQueryOptions(), $options);
        $queryParts = $this->buildSelectQuery($table, $opt['columns'], $opt['joins'], $opt['conditions'], $opt['groupBy'], $opt['having'], $opt['orderBy'], $opt['limit'], $opt['offset']);
        $results = $this->fetchAll($queryParts['sql'], $queryParts['params'], $opt['fetchStyle']);
        return $this->processResults($results, $opt['jsonDecodeAssoc']);
    }

    public function selectOne(string $table, array $options = []) {
        $opt = array_merge($this->getDefaultQueryOptions(), $options);
        $opt['limit'] = 1;
        $queryParts = $this->buildSelectQuery($table, $opt['columns'], $opt['joins'], $opt['conditions'], [], [], $opt['orderBy'], $opt['limit'], $opt['offset']);
        $result = $this->fetchOne($queryParts['sql'], $queryParts['params'], $opt['fetchStyle']);
        return $this->processResults($result, $opt['jsonDecodeAssoc']);
    }

    public function insert(array $options) {
        $table = $options['table'] ?? null;
        $data = $options['data'] ?? null;
        $returning = $options['returning'] ?? [];
        if (!$table || !$data) throw new \InvalidArgumentException("'table' and 'data' keys are required for insert.");

        $queryParts = $this->buildInsertQuery($table, $data, $returning);

        if (!empty($returning) && in_array($this->driverName, ['pgsql', 'sqlite'])) {
            $result = $this->fetchOne($queryParts['sql'], $queryParts['params']);
            return $this->processResults($result, $options['jsonDecodeAssoc'] ?? true);
        }
        return $this->execute($queryParts['sql'], $queryParts['params']);
    }

    public function insertBatch(array $options) {
        $table = $options['table'] ?? null;
        $data = $options['data'] ?? null;
        $returning = $options['returning'] ?? [];
        if (!$table || !$data || !is_array(current($data))) throw new \InvalidArgumentException("'table' and 'data' (as array of arrays) are required for insertBatch.");

        $queryParts = $this->buildInsertBatchQuery($table, $data, $returning);

        if (!empty($returning) && in_array($this->driverName, ['pgsql', 'sqlite'])) {
            $results = $this->fetchAll($queryParts['sql'], $queryParts['params']);
            return $this->processResults($results, $options['jsonDecodeAssoc'] ?? true);
        }
        return $this->execute($queryParts['sql'], $queryParts['params']);
    }

    public function update(array $options) {
        $table = $options['table'] ?? null;
        $data = $options['data'] ?? null;
        $conditions = $options['conditions'] ?? [];
        $returning = $options['returning'] ?? [];
        if (!$table || !$data) throw new \InvalidArgumentException("'table' and 'data' keys are required for update.");
        if (empty($conditions)) throw new \InvalidArgumentException("UPDATE requires conditions to prevent full-table updates.");

        $queryParts = $this->buildUpdateQuery($table, $data, $conditions, $returning);

        if (!empty($returning) && in_array($this->driverName, ['pgsql', 'sqlite'])) {
            $results = $this->fetchAll($queryParts['sql'], $queryParts['params']);
            return $this->processResults($results, $options['jsonDecodeAssoc'] ?? true);
        }
        return $this->execute($queryParts['sql'], $queryParts['params']);
    }

    public function delete(array $options) {
        $table = $options['table'] ?? null;
        $conditions = $options['conditions'] ?? [];
        $returning = $options['returning'] ?? [];
        if (!$table) throw new \InvalidArgumentException("'table' key is required for delete.");
        if (empty($conditions)) throw new \InvalidArgumentException("DELETE requires conditions to prevent full-table deletions.");

        $queryParts = $this->buildDeleteQuery($table, $conditions, $returning);

        if (!empty($returning) && in_array($this->driverName, ['pgsql', 'sqlite'])) {
            $results = $this->fetchAll($queryParts['sql'], $queryParts['params']);
            return $this->processResults($results, $options['jsonDecodeAssoc'] ?? true);
        }
        return $this->execute($queryParts['sql'], $queryParts['params']);
    }

    public function count(string $table, array $options = []): int {
        $opt = array_merge([
            'conditions' => [],
            'joins' => [],
            'distinct' => false,
            'column' => '*'
        ], $options);

        // Build the COUNT expression
        $countExpr = $opt['distinct'] ? 
            "COUNT(DISTINCT " . $this->quoteIdentifier($opt['column']) . ")" : 
            "COUNT(" . ($opt['column'] === '*' ? '*' : $this->quoteIdentifier($opt['column'])) . ")";

        // Use the buildSelectQuery method with COUNT as the column
        $queryParts = $this->buildSelectQuery(
            $table, 
            [$countExpr], 
            $opt['joins'], 
            $opt['conditions']
        );

        // Fetch the count value
        $result = $this->fetchColumn($queryParts['sql'], $queryParts['params']);
        
        return (int)$result;
    }

    public function avg(string $table, string $column, array $options = []): ?float {
        $opt = array_merge([
            'conditions' => [],
            'joins' => [],
            'distinct' => false
        ], $options);

        // Build the AVG expression
        $avgExpr = $opt['distinct'] ? 
            "AVG(DISTINCT " . $this->quoteIdentifier($column) . ")" : 
            "AVG(" . $this->quoteIdentifier($column) . ")";

        // Use the buildSelectQuery method with AVG as the column
        $queryParts = $this->buildSelectQuery(
            $table, 
            [$avgExpr], 
            $opt['joins'], 
            $opt['conditions']
        );

        // Fetch the average value
        $result = $this->fetchColumn($queryParts['sql'], $queryParts['params']);
        
        // Return null if no rows or all values are NULL
        return $result === null ? null : (float)$result;
    }

    public function sum(string $table, string $column, array $options = []): float {
        $opt = array_merge([
            'conditions' => [],
            'joins' => [],
            'distinct' => false
        ], $options);

        // Build the SUM expression
        $sumExpr = $opt['distinct'] ? 
            "SUM(DISTINCT " . $this->quoteIdentifier($column) . ")" : 
            "SUM(" . $this->quoteIdentifier($column) . ")";

        // Use the buildSelectQuery method with SUM as the column
        $queryParts = $this->buildSelectQuery(
            $table, 
            [$sumExpr], 
            $opt['joins'], 
            $opt['conditions']
        );

        // Fetch the sum value
        $result = $this->fetchColumn($queryParts['sql'], $queryParts['params']);
        
        // Return 0 if no rows or all values are NULL
        return $result === null ? 0.0 : (float)$result;
    }

    public function exists(string $table, array $options = []): bool {
        // Support both old signature (conditions as array) and new (options array)
        if (!empty($options) && !isset($options['conditions']) && !isset($options['joins'])) {
            // Backward compatibility: assume it's conditions array
            $options = ['conditions' => $options];
        }
        
        $opt = array_merge([
            'conditions' => [],
            'joins' => []
        ], $options);

        // Build a SELECT 1 query with LIMIT 1 for efficiency
        $queryParts = $this->buildSelectQuery(
            $table, 
            ['1'], 
            $opt['joins'],
            $opt['conditions'],
            [], // no groupBy
            [], // no having
            [], // no orderBy
            1,  // limit 1
            0   // offset 0
        );

        // Fetch one column - will return false if no rows exist
        $result = $this->fetchColumn($queryParts['sql'], $queryParts['params']);
        
        return $result !== false;
    }

    public function pluck(string $table, string $column, array $options = []): array {
        $opt = array_merge([
            'conditions' => [],
            'joins' => [],
            'orderBy' => [],
            'limit' => null,
            'offset' => null,
            'keyColumn' => null, // Optional column to use as array keys
            'jsonDecodeAssoc' => true
        ], $options);

        // Determine columns to select
        $columns = $opt['keyColumn'] !== null 
            ? [$opt['keyColumn'], $column] 
            : [$column];

        // Build the select query
        $queryParts = $this->buildSelectQuery(
            $table, 
            $columns, 
            $opt['joins'], 
            $opt['conditions'],
            [], // no groupBy
            [], // no having
            $opt['orderBy'],
            $opt['limit'],
            $opt['offset']
        );

        // Fetch all results
        $results = $this->fetchAll($queryParts['sql'], $queryParts['params']);
        
        // Process results for JSON decoding
        $results = $this->processResults($results, $opt['jsonDecodeAssoc']);
        
        // Process results
        $plucked = [];
        if ($opt['keyColumn'] !== null) {
            // Use keyColumn as array keys
            foreach ($results as $row) {
                $key = $row[$opt['keyColumn']] ?? null;
                $value = $row[$column] ?? null;
                if ($key !== null) {
                    // Warning: duplicate keys will overwrite previous values
                    $plucked[$key] = $value;
                }
            }
        } else {
            // Simple indexed array
            foreach ($results as $row) {
                $plucked[] = $row[$column] ?? null;
            }
        }
        
        return $plucked;
    }

    // --- Transaction and Utility Methods ---

    public function lastInsertId(?string $name = null) {
        return $this->pdo?->lastInsertId($name);
    }

    public function beginTransaction(): bool {
        if (!$this->pdo) throw new \PDOException("PDO connection not established.");
        return $this->pdo->beginTransaction();
    }

    public function commit(): bool {
        if (!$this->pdo) throw new \PDOException("PDO connection not established.");
        return $this->pdo->commit();
    }

    public function rollBack(): bool {
        if (!$this->pdo) throw new \PDOException("PDO connection not established.");
        return $this->pdo->rollBack();
    }

    public function inTransaction(): bool {
        if (!$this->pdo) throw new \PDOException("PDO connection not established.");
        return $this->pdo->inTransaction();
    }

    public function close(): void {
        $this->pdo = null;
    }

    public function __destruct() {
        $this->close();
    }
}
