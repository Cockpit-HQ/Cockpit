<?php

namespace MongoHybrid;

use Exception;

class Token {
    public $type;
    public $value;
    public $line;
    public $column;

    public function __construct($type, $value, $line, $column) {
        $this->type = $type;
        $this->value = $value;
        $this->line = $line;
        $this->column = $column;
    }
}

class QueryParsingException extends Exception {
    public int $line;
    public $column;

    public function __construct($message, $line, $column) {
        parent::__construct("Error at line $line, column $column: $message");
        $this->line = $line;
        $this->column = $column;
    }
}

class Lexer {
    private $input;
    private $position = 0;
    private $line = 1;
    private $column = 1;
    private static $keywords = ['AND', 'OR', 'NOT'];
    private static $wordOperators = ['LIKE', 'IN', 'NIN', 'EXISTS', 'ALL', 'ELEMATCH', 'NEAR'];

    public function __construct($input) {
        $this->input = $input;
    }

    public function nextToken() {
        if ($this->position >= strlen($this->input)) {
            return new Token('EOF', null, $this->line, $this->column);
        }

        $char = $this->input[$this->position];

        if ($char === "\n") {
            $this->line++;
            $this->column = 1;
            $this->position++;
            return $this->nextToken();
        }

        if (ctype_space($char)) {
            $this->position++;
            $this->column++;
            return $this->nextToken();
        }

        if (ctype_alpha($char) || $char === '_') {
            return $this->readIdentifier();
        }

        if ($char === "'" || $char === '"') {
            return $this->readString();
        }

        if (ctype_digit($char) || ($char === '-' && $this->isDigit($this->peekNextChar()))) {
            return $this->readNumber();
        }

        $this->column++;
        $this->position++;

        switch ($char) {
            case '(': return new Token('LPAREN', '(', $this->line, $this->column - 1);
            case ')': return new Token('RPAREN', ')', $this->line, $this->column - 1);
            case ',': return new Token('COMMA', ',', $this->line, $this->column - 1);
            case '=': return new Token('OPERATOR', '=', $this->line, $this->column - 1);
            case '>':
                if ($this->position < strlen($this->input) && $this->input[$this->position] === '=') {
                    $this->position++;
                    $this->column++;
                    return new Token('OPERATOR', '>=', $this->line, $this->column - 2);
                }
                return new Token('OPERATOR', '>', $this->line, $this->column - 1);
            case '<':
                if ($this->position < strlen($this->input) && $this->input[$this->position] === '=') {
                    $this->position++;
                    $this->column++;
                    return new Token('OPERATOR', '<=', $this->line, $this->column - 2);
                }
                return new Token('OPERATOR', '<', $this->line, $this->column - 1);
            case '!':
                if ($this->position < strlen($this->input) && $this->input[$this->position] === '=') {
                    $this->position++;
                    $this->column++;
                    return new Token('OPERATOR', '!=', $this->line, $this->column - 2);
                }
        }

        throw new QueryParsingException("Unexpected character: $char", $this->line, $this->column - 1);
    }

    private function readIdentifier() {
        $startColumn = $this->column;
        $start = $this->position;
        while ($this->position < strlen($this->input) &&
               (ctype_alnum($this->input[$this->position]) || $this->input[$this->position] === '_' || $this->input[$this->position] === '.')) {
            $this->position++;
            $this->column++;
        }
        $value = substr($this->input, $start, $this->position - $start);
        $upperValue = strtoupper($value);

        if (in_array($upperValue, self::$keywords)) {
            return new Token($upperValue, $upperValue, $this->line, $startColumn);
        }
        if (in_array($upperValue, self::$wordOperators)) {
            return new Token('OPERATOR', $upperValue, $this->line, $startColumn);
        }
        return new Token('IDENTIFIER', $value, $this->line, $startColumn);
    }

    private function readString() {
        $startColumn = $this->column;
        $quote = $this->input[$this->position];
        $start = ++$this->position;
        $this->column++;
        while ($this->position < strlen($this->input) && $this->input[$this->position] !== $quote) {
            if ($this->input[$this->position] === '\\') {
                $this->position++;
                $this->column++;
            }
            $this->position++;
            $this->column++;
        }
        if ($this->position >= strlen($this->input)) {
            throw new QueryParsingException("Unterminated string", $this->line, $startColumn);
        }
        $value = substr($this->input, $start, $this->position - $start);
        $this->position++;
        $this->column++;
        return new Token('STRING', stripcslashes($value), $this->line, $startColumn);
    }

    private function readNumber() {
        $startColumn = $this->column;
        $start = $this->position;
        $dotSeen = false;
        $eSeen = false;

        if ($this->input[$this->position] === '-') {
            $this->position++;
            $this->column++;
        }

        while ($this->position < strlen($this->input)) {
            $char = $this->input[$this->position];
            if ($char === '.' && !$dotSeen && !$eSeen) {
                $dotSeen = true;
            } elseif (($char === 'e' || $char === 'E') && !$eSeen) {
                $eSeen = true;
                if ($this->position + 1 < strlen($this->input) &&
                    ($this->input[$this->position + 1] === '+' || $this->input[$this->position + 1] === '-')) {
                    $this->position++;
                    $this->column++;
                }
            } elseif (!ctype_digit($char)) {
                break;
            }
            $this->position++;
            $this->column++;
        }
        $value = substr($this->input, $start, $this->position - $start);
        return new Token('NUMBER', $value, $this->line, $startColumn);
    }

    private function isDigit($char) {
        return $char !== false && ctype_digit($char);
    }

    private function peekNextChar() {
        return $this->position + 1 < strlen($this->input) ? $this->input[$this->position + 1] : false;
    }
}

class Parser {
    private $lexer;
    private $currentToken;

    private static $operatorMap = [
        '=' => '$eq',
        '!=' => '$ne',
        '>' => '$gt',
        '<' => '$lt',
        '>=' => '$gte',
        '<=' => '$lte',
        'LIKE' => '$regex',
        'IN' => '$in',
        'NIN' => '$nin',
        'EXISTS' => '$exists',
        'ALL' => '$all',
        'ELEMATCH' => '$elemMatch',
        'NEAR' => '$near'
    ];

    public function __construct(Lexer $lexer) {
        $this->lexer = $lexer;
        $this->currentToken = $this->lexer->nextToken();
    }

    private function eat($tokenType) {
        if ($this->currentToken->type === $tokenType) {
            $this->currentToken = $this->lexer->nextToken();
        } else {
            throw new QueryParsingException(
                "Unexpected token: {$this->currentToken->type}, expected: $tokenType",
                $this->currentToken->line,
                $this->currentToken->column
            );
        }
    }

    public function parse() {
        return $this->expression();
    }

    private function expression() {
        $node = $this->term();

        while ($this->currentToken->type === 'OR') {
            $this->eat('OR');
            $node = ['$or' => [$node, $this->term()]];
        }

        return $node;
    }

    private function term() {
        $node = $this->factor();

        while ($this->currentToken->type === 'AND') {
            $this->eat('AND');
            $node = ['$and' => [$node, $this->factor()]];
        }

        return $node;
    }

    private function factor() {
        if ($this->currentToken->type === 'LPAREN') {
            $this->eat('LPAREN');
            $node = $this->expression();
            $this->eat('RPAREN');
            return $node;
        } elseif ($this->currentToken->type === 'NOT') {
            $this->eat('NOT');
            return ['$not' => $this->factor()];
        } else {
            return $this->condition();
        }
    }

    private function condition() {
        $field = $this->currentToken->value;
        $this->eat('IDENTIFIER');
        $operator = strtoupper($this->currentToken->value);
        $this->eat('OPERATOR');

        if ($operator === 'IN' || $operator === 'NIN' || $operator === 'ALL') {
            $this->eat('LPAREN');
            $values = $this->parseList();
            $this->eat('RPAREN');
            return [$field => [self::$operatorMap[$operator] => $values]];
        } elseif ($operator === 'ELEMATCH') {
            $this->eat('LPAREN');
            $subQuery = $this->expression();
            $this->eat('RPAREN');
            return [$field => ['$elemMatch' => $subQuery]];
        } elseif ($operator === 'NEAR') {
            return $this->parseNearCondition($field);
        } else {
            $value = $this->parseValue();

            $mongoOperator = self::$operatorMap[$operator] ?? null;
            if ($mongoOperator === null) {
                throw new QueryParsingException("Unsupported operator: $operator", $this->currentToken->line, $this->currentToken->column);
            }

            if ($mongoOperator === '$regex') {
                $pattern = str_replace(['%', '_', '*'], ['.*', '.', '.*'], preg_quote($value, '/'));
                return [$field => [
                    '$regex' => $pattern,
                    '$options' => 'i'
                ]];
            } elseif ($mongoOperator === '$exists') {
                $value = filter_var($value, FILTER_VALIDATE_BOOLEAN);
            }

            return [$field => [$mongoOperator => $value]];
        }
    }

    private function parseNearCondition($field) {
        $this->eat('LPAREN');
        $longitude = $this->parseNumber();
        $this->eat('COMMA');
        $latitude = $this->parseNumber();
        $this->eat('COMMA');
        $maxDistance = $this->parseNumber();
        $this->eat('RPAREN');

        return [
            $field => [
                '$near' => [
                    '$geometry' => [
                        'type' => 'Point',
                        'coordinates' => [$longitude, $latitude]
                    ],
                    '$maxDistance' => $maxDistance
                ]
            ]
        ];
    }

    private function parseList() {
        $values = [];
        do {
            $values[] = $this->parseValue();
            if ($this->currentToken->type === 'COMMA') {
                $this->eat('COMMA');
            } else {
                break;
            }
        } while (true);

        return $values;
    }

    private function parseValue() {
        $token = $this->currentToken;
        switch ($token->type) {
            case 'STRING':
                $this->eat('STRING');
                return $token->value;
            case 'NUMBER':
                return $this->parseNumber();
            default:
                throw new QueryParsingException("Unexpected token type: {$token->type}", $token->line, $token->column);
        }
    }

    private function parseNumber() {
        $number = '';
        while ($this->currentToken->type === 'NUMBER' || $this->currentToken->value === '-') {
            $number .= $this->currentToken->value;
            $this->currentToken = $this->lexer->nextToken();
        }
        return floatval($number);
    }
}

class SQLToMongoQuery {
    public static function translate(string $input): array {
        $lexer = new Lexer($input);
        $parser = new Parser($lexer);
        return $parser->parse();
    }
}
