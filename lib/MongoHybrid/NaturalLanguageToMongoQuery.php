<?php

namespace MongoHybrid;

use Exception;

class NaturalLanguageToMongoQuery {

    private array $customFunctions;

    public static function translate(string $input, array $functions = []): array {
        $parser = new self($functions);
        return $parser->parse($input);
    }

    public function __construct(array $functions = []) {
        $this->customFunctions = array_merge([

        ], $functions);
    }

    public function parse(string $input) : array {
        $tokens = $this->tokenize($input);
        return $this->parseExpression($tokens);
    }

    private function tokenize(string $input) {
        $delimiters = ['(', ')', '>', '<', '=', '!', ' ', '+', '-', '*', '/', ',', "'", '"'];
        $tokens = [];
        $currentToken = '';
        $quoteChar = null;

        for ($i = 0; $i < strlen($input); $i++) {
            $char = $input[$i];

            if (in_array($char, $delimiters)) {
                if ($quoteChar !== null) {
                    $currentToken .= $char;
                    if ($char === $quoteChar) {
                        $quoteChar = null;
                    }
                } else {
                    if ($currentToken !== '') {
                        $tokens[] = $currentToken;
                        $currentToken = '';
                    }
                    if ($char === "'" || $char === '"') {
                        $quoteChar = $char;
                    } elseif ($char !== ' ') {
                        $tokens[] = $char;
                    }
                }
            } else {
                $currentToken .= $char;
            }
        }

        if ($currentToken !== '') {
            $tokens[] = $currentToken;
        }

        for ($i = 0; $i < count($tokens); $i++) {
            if ($tokens[$i] === '=' || $tokens[$i] === '!') {
                if ($tokens[$i + 1] === '=') {
                    $tokens[$i] .= '=';
                    array_splice($tokens, $i + 1, 1);
                }
            }
        }

        return $tokens;
    }

    private function parseExpression(&$tokens) {
        if (count($tokens) === 0) {
            return [];
        }

        $expr = $this->parseOrExpression($tokens);
        return $expr;
    }

    private function parseOrExpression(&$tokens) {
        $expr = $this->parseAndExpression($tokens);
        while (count($tokens) > 0 && strtolower($tokens[0]) === 'or') {
            array_shift($tokens);
            $right = $this->parseAndExpression($tokens);
            $expr = ['$or' => [$expr, $right]];
        }

        return $expr;
    }

    private function parseAndExpression(&$tokens) {
        $expr = $this->parseGroupingExpression($tokens);
        while (count($tokens) > 0 && strtolower($tokens[0]) === 'and') {
            array_shift($tokens);
            $right = $this->parseGroupingExpression($tokens);
            $expr = ['$and' => [$expr, $right]];
        }

        return $expr;
    }

    private function parseGroupingExpression(&$tokens) {
        if (count($tokens) > 0 && $tokens[0] === '(') {
            array_shift($tokens);
            $expr = $this->parseOrExpression($tokens);
            if (count($tokens) === 0 || array_shift($tokens) !== ')') {
                throw new Exception("Mismatched parentheses");
            }
            return $expr;
        } else {
            return $this->parseComparisonExpression($tokens);
        }
    }

    private function parseComparisonExpression(&$tokens) {

        $isNot = false;
        $field = array_shift($tokens);
        $operator = array_shift($tokens);

        if ($operator === 'not') {
            $isNot = true;
            $operator = array_shift($tokens);
        }

        if ($field === 'is') {
            return [$operator => $isNot ? false : true];
        }

        $value = array_shift($tokens);

        if ($value === 'not') {
            $isNot = true;
            $value = array_shift($tokens);
        }

        if (is_numeric($value)) {
            $value = floatval($value);
        } elseif (isset($this->customFunctions[$value])) {

            $functionName = $value;

            if (array_shift($tokens) !== '(') {
                throw new Exception("Expected '(' after custom function name");
            }

            $args = [];
            while ($tokens[0] !== ')') {
                $arg = array_shift($tokens);
                if ($arg === ',') {
                    continue;
                }
                if (is_numeric($arg)) {
                    $arg = floatval($arg);
                }
                $args[] = $arg;
            }

            array_shift($tokens); // Remove ')'

            $value = call_user_func_array($this->customFunctions[$functionName], $args);

        } elseif (in_array($value, ['true','false'])) {
            $value = $value === 'true';
        } elseif ($value == 'null') {
            $value = null;
        } else {
            $value = trim($value, '"\'');
        }

        switch ($operator) {
            case '>':
                return [$field => ['$gt' => $value]];
            case '>=':
                return [$field => ['$gte' => $value]];
            case '<':
                return [$field => ['$lt' => $value]];
            case '<=':
                return [$field => ['$lte' => $value]];
            case 'equals':
            case 'eq':
                return [$field => $isNot ? ['$ne' => $value] : $value];
            case '=':
            case '==':
                return [$field => $value];
            case '!=':
                return [$field => ['$ne' => $value]];

            case 'matches':
            case 'like':
                return [$field => ['$regex' => (string)$value, '$options' => 'i']];

            case 'has':
                return [$field => [$isNot ? '$nin':'$in' => [$value]]];

            default:
                throw new Exception("Unknown operator: $operator");
        }
    }
}
