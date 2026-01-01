<?php

namespace MongoLite;

class QueryOptimizer {

    protected \PDO $connection;

    public function __construct(\PDO $connection) {
        $this->connection = $connection;
    }

    /**
     * Attempt to convert a MongoDB criteria array into a SQL WHERE clause
     * using native SQLite JSON functions.
     * 
     * Returns null if the query cannot be fully optimized.
     */
    public function optimize(array $criteria): ?string {
        // Empty criteria matches everything
        if (empty($criteria)) {
            return '1';
        }

        try {
            $conditions = [];
            
            foreach ($criteria as $key => $value) {
                // Handle top-level logical operators ($or, $and)
                if ($key === '$or') {
                    $orConditions = [];
                    if (!\is_array($value)) return null;
                    
                    foreach ($value as $subCriteria) {
                        $subSql = $this->optimize($subCriteria);
                        if ($subSql === null) return null;
                        $orConditions[] = "({$subSql})";
                    }
                    
                    if (empty($orConditions)) return '0'; // Empty $or matches nothing
                    $conditions[] = '(' . \implode(' OR ', $orConditions) . ')';
                    continue;
                }
                
                if ($key === '$and') {
                    $andConditions = [];
                    if (!\is_array($value)) return null;
                    
                    foreach ($value as $subCriteria) {
                        $subSql = $this->optimize($subCriteria);
                        if ($subSql === null) return null;
                        $andConditions[] = "({$subSql})";
                    }
                    
                    if (empty($andConditions)) return '1';
                    $conditions[] = '(' . \implode(' AND ', $andConditions) . ')';
                    continue;
                }

                // Skip other top-level operators like $where, $expr for now
                if (\str_starts_with($key, '$')) {
                    return null;
                }

                // Safety check: Disable optimization for dot notation (nested fields)
                // because SQLite's json_extract does not support MongoDB's implicit 
                // array traversal (e.g. "users.name" matching inside an array of user objects).
                // To maintain 100% compatibility, we fallback to PHP for these cases.
                if (\str_contains($key, '.')) {
                    return null;
                }

                // Handle field conditions
                $sql = $this->convertFieldCondition($key, $value);
                if ($sql === null) return null;
                
                $conditions[] = $sql;
            }

            return implode(' AND ', $conditions);
            
        } catch (\Throwable $e) {
            // Fallback to PHP processing on any error
            return null;
        }
    }

    protected function convertFieldCondition(string $field, mixed $value): ?string {
        $path = $this->toJsonPath($field);
        $extracted = "json_extract(document, '{$path}')";
        
        // 1. Direct Equality: ['field' => 'value']
        if (!\is_array($value)) {
            $quoted = $this->quote($value);
            
            if ($value === null) {
                // MongoDB {a: null} matches if a is null OR a is missing
                // SQLite json_extract returns NULL for both cases
                return "{$extracted} IS NULL";
            }
            
            // Match scalar OR value inside array (MongoDB behavior)
            // json_each is used to search inside arrays
            $scalarCheck = "{$extracted} = {$quoted}";
            $arrayCheck = "EXISTS (SELECT 1 FROM json_each(document, '{$path}') WHERE value = {$quoted})";
            
            return "({$scalarCheck} OR {$arrayCheck})";
        }

        // 2. Operators: ['field' => ['$gt' => 10]]
        $conditions = [];
        
        foreach ($value as $op => $opValue) {
            switch ($op) {
                case '$eq':
                    $quoted = $this->quote($opValue);
                    if ($opValue === null) {
                        $conditions[] = "{$extracted} IS NULL";
                    } else {
                        $conditions[] = "({$extracted} = {$quoted} OR EXISTS (SELECT 1 FROM json_each(document, '{$path}') WHERE value = {$quoted}))";
                    }
                    break;

                case '$ne':
                    $quoted = $this->quote($opValue);
                    if ($opValue === null) {
                        $conditions[] = "{$extracted} IS NOT NULL";
                    } else {
                        // Not equal to value AND not in array
                        $conditions[] = "({$extracted} != {$quoted} OR {$extracted} IS NULL) AND NOT EXISTS (SELECT 1 FROM json_each(document, '{$path}') WHERE value = {$quoted})";
                    }
                    break;

                case '$gt':
                case '$gte':
                case '$lt':
                case '$lte':
                    if (!\is_scalar($opValue)) return null; // Only optimize scalar comparisons
                    $operator = match($op) {
                        '$gt' => '>',
                        '$gte' => '>=',
                        '$lt' => '<',
                        '$lte' => '<=',
                    };
                    $quoted = $this->quote($opValue);
                    // Note: MongoDB comparison sorts types. SQLite comparison is simpler.
                    // We assume user is comparing same types (numbers vs numbers).
                    $conditions[] = "{$extracted} {$operator} {$quoted}";
                    break;

                case '$in':
                    if (!\is_array($opValue)) return null;
                    $list = \array_map([$this, 'quote'], $opValue);
                    if (empty($list)) {
                        $conditions[] = "0"; // Nothing in list matches nothing
                    } else {
                        $inList = \implode(', ', $list);
                        // Match scalar IN list OR any array element IN list
                        $conditions[] = "({$extracted} IN ({$inList}) OR EXISTS (SELECT 1 FROM json_each(document, '{$path}') WHERE value IN ({$inList})))";
                    }
                    break;

                case '$nin':
                    if (!\is_array($opValue)) return null;
                    $list = \array_map([$this, 'quote'], $opValue);
                    if (empty($list)) {
                        $conditions[] = "1"; // Nothing to exclude
                    } else {
                        $inList = \implode(', ', $list);
                        $conditions[] = "({$extracted} NOT IN ({$inList}) OR {$extracted} IS NULL) AND NOT EXISTS (SELECT 1 FROM json_each(document, '{$path}') WHERE value IN ({$inList}))";
                    }
                    break;

                case '$exists':
                    // json_type returns NULL if path doesn't exist, 'null' if JSON null
                    $exists = (bool)$opValue;
                    $typeCheck = "json_type(document, '{$path}')";
                    if ($exists) {
                        $conditions[] = "{$typeCheck} IS NOT NULL";
                    } else {
                        $conditions[] = "{$typeCheck} IS NULL";
                    }
                    break;

                case '$size':
                    if (!\is_int($opValue)) return null;
                    // Check if it's an array and has length
                    $conditions[] = "json_type(document, '{$path}') = 'array' AND json_array_length(document, '{$path}') = {$opValue}";
                    break;

                case '$type':
                    // Map MongoDB types to SQLite json_type return values
                    $typeMap = [
                        1 => 'real',      // Double
                        2 => 'text',      // String
                        3 => 'object',    // Object
                        4 => 'array',     // Array
                        8 => ['true', 'false'], // Boolean
                        10 => 'null',     // Null
                        16 => 'integer',  // Int
                        18 => 'integer',  // Long
                        'double' => 'real',
                        'string' => 'text',
                        'object' => 'object',
                        'array' => 'array',
                        'bool' => ['true', 'false'],
                        'boolean' => ['true', 'false'],
                        'null' => 'null',
                        'int' => 'integer',
                        'integer' => 'integer',
                        'long' => 'integer',
                        'number' => ['integer', 'real']
                    ];
                    
                    if (!isset($typeMap[$opValue])) return null; // Unknown type mapping
                    
                    $targetTypes = (array)$typeMap[$opValue];
                    $typeCheck = "json_type(document, '{$path}')";
                    
                    $typeConditions = [];
                    foreach ($targetTypes as $t) {
                        $typeConditions[] = "{$typeCheck} = '{$t}'";
                    }
                    $conditions[] = '(' . \implode(' OR ', $typeConditions) . ')';
                    break;

                default:
                    // Unknown or unsupported operator (e.g., $regex, $elemMatch, $mod)
                    return null;
            }
        }

        return implode(' AND ', $conditions);
    }

    protected function toJsonPath(string $field): string {
        // Convert dot notation "a.b.c" to "$.a.b.c"
        return '$' . ($field === '' ? '' : '.' . $field);
    }

    protected function quote(mixed $value): string {
        if (\is_int($value) || \is_float($value)) {
            return (string)$value;
        }
        if (\is_bool($value)) {
            // SQLite JSON functions use 1/0 or 'true'/'false' depending on context?
            // json_extract returns native types.
            // But in SQL comparison: json_extract(..) = 1
            // Wait, json_extract(doc, '$.bool') returns 0 or 1 for booleans in some versions, or true/false?
            // It actually returns 0 or 1.
            return $value ? '1' : '0';
        }
        if ($value === null) {
            return 'NULL';
        }
        return $this->connection->quote((string)$value);
    }
}
