<?php

namespace MongoHybrid;

class QueryParsingException extends \Exception {

    public string $query;
    public int $position;

    public function __construct(string $message, string $query, int $position) {
        $this->query = $query;
        $this->position = $position;

        // Add context to the error message
        $context = $this->getErrorContext($query, $position);
        $fullMessage = sprintf(
            "%s\nAt position %d: %s\n%s",
            $message,
            $position,
            $context['snippet'],
            $context['pointer']
        );

        parent::__construct($fullMessage);
    }

    private function getErrorContext(string $query, int $position, int $contextLength = 20): array {
        $start = max(0, $position - $contextLength);
        $length = min(strlen($query) - $start, $contextLength * 2);
        $snippet = substr($query, $start, $length);

        // Create a pointer to the error position
        $pointerPosition = $position - $start;
        $pointer = str_repeat(' ', $pointerPosition) . '^';

        return [
            'snippet' => $snippet,
            'pointer' => $pointer
        ];
    }
}

class SQLToMongoQuery {
    // SQL operators to MongoDB operators mapping
    private static $operatorMap = [
        '=' => '$eq',
        '!=' => '$ne',
        '<>' => '$ne',
        '>' => '$gt',
        '<' => '$lt',
        '>=' => '$gte',
        '<=' => '$lte',
        'LIKE' => '$regex',
        'NOT LIKE' => '$not',
        'IN' => '$in',
        'NOT IN' => '$nin',
        'IS NULL' => '$exists',
        'IS NOT NULL' => '$exists',
        'BETWEEN' => '$gte',
        'NOT BETWEEN' => '$not',
        'REGEXP' => '$regex',
        'MATCH' => '$text'
    ];

    // Additional MongoDB specific operators
    private static $mongoOperators = [
        'ALL' => '$all',
        'ELEMATCH' => '$elemMatch',
        'NEAR' => '$near',
        'TEXT' => '$text'
    ];

    private $tokens = [];
    private $position = 0;
    private $query;

    public function __construct(string $query) {
        $this->query = trim($query);
    }

    public function toMongo(): array {
        try {
            $this->tokenize();
            return $this->parseExpression();
        } catch (\Exception $e) {
            throw new QueryParsingException(
                "Failed to parse SQL query: {$e->getMessage()}",
                $this->query,
                $this->position
            );
        }
    }

    private function tokenize(): void {
        $pattern = '/
            \s*
            (
                (?:<=|>=|!=|<>|=|<|>)|         # Operators
                (?:\'[^\']*\'|"[^"]*")|        # Strings
                (?:\d+(?:\.\d+)?)|             # Numbers
                (?:AND|OR|NOT|IN|LIKE|IS|NULL|BETWEEN|REGEXP|MATCH)|  # Keywords
                (?:[a-zA-Z_][a-zA-Z0-9_\.]*)|  # Identifiers
                (?:[\(\),])                    # Parentheses and comma
            )
            \s*
        /x';

        preg_match_all($pattern, $this->query, $matches);
        $this->tokens = $matches[1];
    }

    private function parseExpression($precedence = 0): array {
        $left = $this->parsePrimary();

        while ($this->position < count($this->tokens)) {
            $operator = strtoupper($this->tokens[$this->position] ?? '');
            $nextPrecedence = $this->getOperatorPrecedence($operator);

            if ($nextPrecedence <= $precedence) {
                break;
            }

            $this->position++;
            $right = $this->parseExpression($nextPrecedence);

            switch ($operator) {
                case 'AND':
                    $left = ['$and' => [$left, $right]];
                    break;
                case 'OR':
                    $left = ['$or' => [$left, $right]];
                    break;
                default:
                    throw new QueryParsingException("Unexpected operator: $operator", $this->query, $this->position);
            }
        }

        return $left;
    }

    private function parsePrimary(): array {
        if ($this->position >= count($this->tokens)) {
            throw new QueryParsingException("Unexpected end of query", $this->query, $this->position);
        }

        $token = $this->tokens[$this->position];

        if ($token === '(') {
            $this->position++;
            $expr = $this->parseExpression();
            if ($this->tokens[$this->position] !== ')') {
                throw new QueryParsingException("Expected ')'", $this->query, $this->position);
            }
            $this->position++;
            return $expr;
        }

        if (strtoupper($token) === 'NOT') {
            $this->position++;
            return ['$not' => $this->parsePrimary()];
        }

        return $this->parseCondition();
    }

    private function parseCondition(): array {
        $field = $this->tokens[$this->position++];

        if ($this->position >= count($this->tokens)) {
            throw new QueryParsingException("Unexpected end of query after field", $this->query, $this->position);
        }

        $operator = strtoupper($this->tokens[$this->position++]);

        // Handle special cases
        switch ($operator) {
            case 'IS':
                $isNot = false;
                if (strtoupper($this->tokens[$this->position]) === 'NOT') {
                    $isNot = true;
                    $this->position++;
                }
                if (strtoupper($this->tokens[$this->position++]) !== 'NULL') {
                    throw new QueryParsingException("Expected NULL after IS", $this->query, $this->position);
                }
                return [$field => ['$exists' => $isNot]];

            case 'BETWEEN':
                $start = $this->parseValue();
                if (strtoupper($this->tokens[$this->position++]) !== 'AND') {
                    throw new QueryParsingException("Expected AND in BETWEEN expression", $this->query, $this->position);
                }
                $end = $this->parseValue();
                return [$field => ['$gte' => $start, '$lte' => $end]];

            case 'IN':
            case 'NOT IN':
                if ($this->tokens[$this->position++] !== '(') {
                    throw new QueryParsingException("Expected '(' after IN", $this->query, $this->position);
                }
                $values = $this->parseList();
                if ($this->tokens[$this->position++] !== ')') {
                    throw new QueryParsingException("Expected ')' after IN list", $this->query, $this->position);
                }
                $mongoOp = $operator === 'IN' ? '$in' : '$nin';
                return [$field => [$mongoOp => $values]];

            case 'LIKE':
            case 'NOT LIKE':
                $pattern = $this->parseValue();
                $regex = $this->sqlLikeToRegex($pattern);
                if ($operator === 'LIKE') {
                    return [$field => ['$regex' => $regex, '$options' => 'i']];
                } else {
                    return [$field => ['$not' => ['$regex' => $regex, '$options' => 'i']]];
                }
        }

        // Handle standard operators
        if (!isset(self::$operatorMap[$operator])) {
            throw new QueryParsingException("Unsupported operator: $operator", $this->query, $this->position);
        }

        $value = $this->parseValue();
        $mongoOp = self::$operatorMap[$operator];
        return [$field => [$mongoOp => $value]];
    }

    private function parseList(): array {
        $values = [];
        do {
            $values[] = $this->parseValue();
            if ($this->position >= count($this->tokens) || $this->tokens[$this->position] !== ',') {
                break;
            }
            $this->position++;
        } while (true);
        return $values;
    }

    private function parseValue() {
        $token = $this->tokens[$this->position++];

        // Handle strings
        if ($token[0] === "'" || $token[0] === '"') {
            return substr($token, 1, -1);
        }

        // Handle numbers
        if (is_numeric($token)) {
            return strpos($token, '.') !== false ? (float)$token : (int)$token;
        }

        // Handle booleans
        if (strtoupper($token) === 'TRUE') return true;
        if (strtoupper($token) === 'FALSE') return false;

        // Handle NULL
        if (strtoupper($token) === 'NULL') return null;

        throw new QueryParsingException("Invalid value: $token", $this->query, $this->position);
    }

    private function sqlLikeToRegex(string $pattern): string {
        $pattern = preg_quote($pattern, '/');
        $pattern = str_replace(['%', '_'], ['.*', '.'], $pattern);
        return "^$pattern$";
    }

    private function getOperatorPrecedence(string $operator): int {
        switch (strtoupper($operator)) {
            case 'AND': return 2;
            case 'OR': return 1;
            default: return 0;
        }
    }

    public static function translate(string $sql): array {

        $parser = new self($sql);
        return $parser->toMongo();
    }
}

