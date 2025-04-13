<?php

namespace MongoHybrid;

use Exception;
use Throwable; // Use Throwable for broader catch blocks (PHP 7+)

/**
 * Custom exception for query parsing errors.
 * Includes the original query and the approximate position of the error.
 */
class QueryParsingException extends Exception
{
    // Use PHP 8.1 readonly properties
    public readonly string $query;
    public readonly int $position; // Position in the *original* query string

    /**
     * Constructor for QueryParsingException.
     *
     * @param string $message The primary error message.
     * @param string $query The full SQL query string being parsed.
     * @param int $position The character position in the query where the error occurred.
     * @param int $code The exception code.
     * @param ?Throwable $previous The previous throwable used for exception chaining.
     */
    public function __construct(
        string $message,
        string $query,
        int $position,
        int $code = 0,
        ?Throwable $previous = null
    ) {
        $this->query = $query;
        $this->position = $position;

        // Add context to the error message
        $context = $this->getErrorContext($query, $position);
        $fullMessage = sprintf(
            "%s\nAt position ~%d: ...%s...\n%s",
            $message,
            $position,
            $context['snippet'],
            $context['pointer']
        );

        parent::__construct($fullMessage, $code, $previous);
    }

    /**
     * Generates a snippet of the query around the error position.
     *
     * @param string $query The query string.
     * @param int $position The error position.
     * @param int $contextLength The number of characters to show before/after the position.
     * @return array{snippet: string, pointer: string}
     */
    private function getErrorContext(string $query, int $position, int $contextLength = 20): array
    {
        $start = max(0, $position - $contextLength);
        // Adjust length calculation to handle multibyte characters better if needed,
        // but for context snippet, byte-based substr is often sufficient.
        $length = min(strlen($query) - $start, $contextLength * 2);
        $snippet = substr($query, $start, $length);

        // Create a pointer ('^') indicating the error position within the snippet
        $pointerPosition = max(0, $position - $start); // Ensure pointer position isn't negative
        // Handle potential multibyte characters if precise alignment is critical
        // $pointer = mb_str_repeat(' ', mb_strlen(substr($snippet, 0, $pointerPosition))) . '^';
        $pointer = str_repeat(' ', $pointerPosition) . '^';


        return [
            'snippet' => $snippet,
            'pointer' => $pointer
        ];
    }
}

/**
 * Parses a subset of SQL WHERE clause syntax and converts it into a MongoDB query array.
 *
 * Supports:
 * - Basic comparisons: =, !=, <>, >, <, >=, <=
 * - Logical operators: AND, OR, NOT
 * - Parentheses for grouping: (...)
 * - IN, NOT IN (...)
 * - BETWEEN value1 AND value2, NOT BETWEEN value1 AND value2
 * - IS NULL, IS NOT NULL
 * - LIKE, NOT LIKE (with % and _ wildcards, configurable case sensitivity)
 * - REGEXP (maps directly to $regex, pattern must be a valid PCRE)
 * - Strings (single/double quoted, with \' and \" escapes)
 * - Numbers (int, float)
 * - Booleans (TRUE, FALSE)
 * - NULL literal
 * - Field names (including dot notation like 'user.address' and backtick-quoted names `` `field name` ``)
 */
class SQLToMongoQuery
{
    // --- Constants for Keywords and Operators ---
    private const K_AND = 'AND';
    private const K_OR = 'OR';
    private const K_NOT = 'NOT';
    private const K_IN = 'IN';
    private const K_NOT_IN = 'NOT IN';
    private const K_LIKE = 'LIKE';
    private const K_NOT_LIKE = 'NOT LIKE';
    private const K_IS = 'IS';
    private const K_NULL = 'NULL';
    private const K_BETWEEN = 'BETWEEN';
    private const K_NOT_BETWEEN = 'NOT BETWEEN';
    private const K_REGEXP = 'REGEXP';
    private const K_TRUE = 'TRUE';
    private const K_FALSE = 'FALSE';

    private const OP_EQ = '=';
    private const OP_NE = '!=';
    private const OP_NE_ALT = '<>';
    private const OP_GT = '>';
    private const OP_LT = '<';
    private const OP_GTE = '>=';
    private const OP_LTE = '<=';

    private const MGO_EQ = '$eq';
    private const MGO_NE = '$ne';
    private const MGO_GT = '$gt';
    private const MGO_LT = '$lt';
    private const MGO_GTE = '$gte';
    private const MGO_LTE = '$lte';
    private const MGO_IN = '$in';
    private const MGO_NIN = '$nin';
    private const MGO_EXISTS = '$exists';
    private const MGO_REGEX = '$regex';
    private const MGO_OPTIONS = '$options';
    private const MGO_NOT = '$not';
    private const MGO_AND = '$and';
    private const MGO_OR = '$or';

    // SQL operators to MongoDB operators mapping
    private const OPERATOR_MAP = [
        self::OP_EQ => self::MGO_EQ,
        self::OP_NE => self::MGO_NE,
        self::OP_NE_ALT => self::MGO_NE,
        self::OP_GT => self::MGO_GT,
        self::OP_LT => self::MGO_LT,
        self::OP_GTE => self::MGO_GTE,
        self::OP_LTE => self::MGO_LTE,
        self::K_REGEXP => self::MGO_REGEX,
        // Special operators handled in parseCondition
    ];

    /** @var array<array{value: string, type: string, pos: int}> */
    private array $tokens = [];
    private int $position = 0;
    private readonly string $originalQuery; // Keep original for error reporting
    private readonly string $processedQuery; // Trimmed query for parsing

    // --- Configurable Options ---
    private bool $likeCaseInsensitive = false;

    /**
     * Constructor.
     *
     * @param string $query The SQL WHERE clause string.
     * @param array $options Optional configuration:
     * - 'likeCaseInsensitive' (bool): Set LIKE/NOT LIKE matching to be case-insensitive (default: false).
     */
    public function __construct(string $query, private array $options = [])
    {
        $this->originalQuery = $query;
        $this->processedQuery = trim($query);
        $this->likeCaseInsensitive = (bool)($this->options['likeCaseInsensitive'] ?? false);
    }

    /**
     * Performs the conversion from SQL to MongoDB query array.
     *
     * @return array The MongoDB query filter array.
     * @throws QueryParsingException If parsing fails.
     */
    public function toMongo(): array
    {
        if (empty($this->processedQuery)) {
            return []; // Empty query string results in an empty filter (match all)
        }

        try {
            $this->tokenize();
            if (empty($this->tokens)) {
                // Could happen if query was just whitespace
                 return [];
            }
            $result = $this->parseExpression();
            if ($this->position < count($this->tokens)) {
                $this->throwParsingException("Unexpected token found after main expression");
            }
            return $result;
        } catch (QueryParsingException $e) {
            // Re-throw our specific exception
            throw $e;
        } catch (Throwable $e) {
            // Wrap other potential errors (e.g., regex errors)
            $pos = $this->getCurrentTokenPosition();
            throw new QueryParsingException(
                "Failed to parse SQL query: {$e->getMessage()}",
                $this->originalQuery,
                $pos,
                $e->getCode(),
                $e // Chain the previous exception
            );
        }
    }

    /**
     * Tokenizes the input query string.
     * @throws QueryParsingException if unknown characters are found.
     */
    private function tokenize(): void
    {
        // Enhanced regex to handle escapes in strings and backtick identifiers
        $pattern = '/
            \s* # Skip leading whitespace
            (
                # Capture one of the following:
                (?<string_single>\'(?:\\\\\'|[^\'])*\') # Single-quoted strings with escaped quotes
                |
                (?<string_double>"(?:\\\\"|[^"])*") # Double-quoted strings with escaped quotes
                |
                (?<identifier_backtick>`(?:\\\\`|[^`])*`) # Backtick-quoted identifiers with escaped backticks
                |
                (?<number>\d+(?:\.\d+)?) # Numbers (integer or float)
                |
                (?<operator><=|>=|!=|<>|=|<|>) # Comparison operators
                |
                # Keywords (case-insensitive match)
                (?<keyword>(?i:AND|OR|NOT|IN|LIKE|IS|NULL|BETWEEN|REGEXP|TRUE|FALSE))
                |
                # Plain Identifiers (field names, potentially dotted)
                (?<identifier>[a-zA-Z_][a-zA-Z0-9_\.]*)
                |
                (?<paren>[\(\),]) # Parentheses and comma
            )
            \s* # Skip trailing whitespace
        /x'; // x modifier for free-spacing and comments

        if (!preg_match_all($pattern, $this->processedQuery, $matches, PREG_SET_ORDER | PREG_OFFSET_CAPTURE)) {
             $this->tokens = [];
             // Check if the query wasn't empty - if it wasn't, preg_match_all failing might be an issue
             if(!empty($this->processedQuery)) {
                // Could try to find the position of the first *unmatched* character,
                // but for now, just indicate a general tokenization failure.
                 throw new QueryParsingException("Could not tokenize query string.", $this->originalQuery, 0);
             }
             return;
        }

        $this->tokens = [];
        $matchedLength = 0;
        foreach ($matches as $match) {
            $value = $match[1][0];
            $pos = $match[1][1];
            $matchedLength += strlen($match[0][0]); // Length of full match including whitespace

            // Determine token type (more robust than relying solely on regex groups)
            $type = 'unknown';
            if ($match['string_single'][0] !== null && $match['string_single'][1] !== -1) $type = 'string';
            elseif ($match['string_double'][0] !== null && $match['string_double'][1] !== -1) $type = 'string';
            elseif ($match['identifier_backtick'][0] !== null && $match['identifier_backtick'][1] !== -1) $type = 'identifier';
            elseif ($match['number'][0] !== null && $match['number'][1] !== -1) $type = 'number';
            elseif ($match['operator'][0] !== null && $match['operator'][1] !== -1) $type = 'operator';
            elseif ($match['keyword'][0] !== null && $match['keyword'][1] !== -1) $type = 'keyword';
            elseif ($match['identifier'][0] !== null && $match['identifier'][1] !== -1) $type = 'identifier';
            elseif ($match['paren'][0] !== null && $match['paren'][1] !== -1) $type = 'paren';


            $this->tokens[] = ['value' => $value, 'type' => $type, 'pos' => $pos];
        }

         // Check if the entire string was consumed by the tokenizer
         if ($matchedLength < strlen($this->processedQuery)) {
            // Find the approximate position of the error
            $errorPos = $matchedLength > 0 ? $this->tokens[count($this->tokens) - 1]['pos'] + strlen($this->tokens[count($this->tokens) - 1]['value']) : 0;
             // Attempt to find the actual start of the unmatched portion
             $unmatchedPos = -1;
             $tempPos = 0;
             foreach ($matches as $match) {
                if ($match[0][1] > $tempPos) {
                    $unmatchedPos = $tempPos; // Gap found
                    break;
                }
                $tempPos = $match[0][1] + strlen($match[0][0]);
             }
             if ($unmatchedPos === -1 && $tempPos < strlen($this->processedQuery)) {
                 $unmatchedPos = $tempPos;
             }

             throw new QueryParsingException(
                 "Unrecognized character sequence in query",
                 $this->originalQuery,
                 $unmatchedPos !== -1 ? $unmatchedPos : $errorPos // Use more precise position if found
             );
         }

        $this->position = 0; // Reset position for parsing
    }


    /**
     * Parses expressions involving logical operators (AND, OR) respecting precedence.
     */
    private function parseExpression(int $precedence = 0): array
    {
        if ($this->position >= count($this->tokens)) {
             $this->throwParsingException("Unexpected end of query while parsing expression", true);
        }

        $left = $this->parsePrimary();

        while ($this->position < count($this->tokens)) {
            $currentToken = $this->tokens[$this->position];
            $operator = strtoupper($currentToken['value']);

            if ($currentToken['type'] !== 'keyword' || ($operator !== self::K_AND && $operator !== self::K_OR)) {
                break; // Not a logical operator we handle here
            }

            $nextPrecedence = $this->getOperatorPrecedence($operator);
            if ($nextPrecedence <= $precedence) {
                break; // Lower or equal precedence operator, return to previous level
            }

            $this->position++; // Consume the AND/OR operator

            $right = $this->parseExpression($nextPrecedence); // Parse the right-hand side

            $mongoOp = match ($operator) {
                self::K_AND => self::MGO_AND,
                self::K_OR => self::MGO_OR,
                default => $this->throwParsingException("Unhandled logical operator: {$operator}") // Should not happen
            };

            // Optimize AND/OR combination if possible (flattening)
             if(isset($left[$mongoOp]) && is_array($left[$mongoOp])) {
                 $left[$mongoOp][] = $right;
             } elseif (isset($right[$mongoOp]) && is_array($right[$mongoOp])) {
                 array_unshift($right[$mongoOp], $left);
                 $left = $right;
             } else {
                $left = [$mongoOp => [$left, $right]];
             }
        }

        return $left;
    }

    /**
     * Parses primary expressions: conditions, NOT logic, or parenthesized expressions.
     */
    private function parsePrimary(): array
    {
        if ($this->position >= count($this->tokens)) {
            $this->throwParsingException("Unexpected end of query while looking for expression", true);
        }

        $currentToken = $this->tokens[$this->position];

        // Handle Parentheses: ( expression )
        if ($currentToken['type'] === 'paren' && $currentToken['value'] === '(') {
            $this->position++; // Consume '('
            $expr = $this->parseExpression(0); // Start precedence from 0 inside parens

            if ($this->position >= count($this->tokens) || $this->tokens[$this->position]['value'] !== ')') {
                $this->throwParsingException("Expected ')' after expression");
            }
            $this->position++; // Consume ')'
            return $expr;
        }

        // Handle NOT operator: NOT expression
        if ($currentToken['type'] === 'keyword' && strtoupper($currentToken['value']) === self::K_NOT) {
            $this->position++; // Consume 'NOT'
            // The operand of NOT might be a complex condition, so parsePrimary/parseCondition
            // needs to handle it correctly. A simple condition usually follows.
            // $primary = $this->parsePrimary();
             // Let's assume NOT applies to the immediately following condition/primary for simplicity
             // More complex SQL might require different precedence/grouping for NOT.
            $operand = $this->parseConditionOrPrimary(); // Parse the condition that NOT applies to

             // Check for specific NOT cases like NOT LIKE, NOT IN, NOT BETWEEN handled in parseCondition
             // This generic $not wrapper handles cases like `NOT (field > 5)` or `NOT field = 1`
             // Note: MongoDB often optimizes `field != value` to `$ne`, etc.,
             //       but a general `$not` wrapper is safer for complex operands.
             // A simple $not might sometimes be redundant if parseCondition returns e.g. [$field => ['$ne'=> value]]
             // Let's try to simplify simple negations where possible.

             // Simple heuristic: if operand is a single field condition, negate it directly
             if (count($operand) === 1) {
                 $field = key($operand);
                 $condition = current($operand);
                 if (is_array($condition) && count($condition) === 1) {
                     $mongoOp = key($condition);
                     $value = current($condition);
                     $negatedOp = match($mongoOp) {
                         self::MGO_EQ => self::MGO_NE,
                         self::MGO_NE => self::MGO_EQ,
                         self::MGO_GT => self::MGO_LTE,
                         self::MGO_GTE => self::MGO_LT,
                         self::MGO_LT => self::MGO_GTE,
                         self::MGO_LTE => self::MGO_GT,
                         self::MGO_IN => self::MGO_NIN,
                         self::MGO_NIN => self::MGO_IN,
                         self::MGO_EXISTS => $value === true ? self::MGO_EXISTS : null, // $not:{$exists:true} -> $exists:false
                         default => null
                     };
                     if ($negatedOp === self::MGO_EXISTS) { // Special handling for exists
                        return [$field => [self::MGO_EXISTS => false]];
                     } elseif ($negatedOp !== null) {
                        return [$field => [$negatedOp => $value]];
                     }
                 }
             }
             // Otherwise, use the general $not wrapper
            return [self::MGO_NOT => $operand];
        }

        // Otherwise, assume it's a condition like "field op value"
        return $this->parseCondition();
    }

     /**
     * Parses a condition or a primary expression (used by NOT).
     * This avoids direct recursion issues if NOT precedes another NOT or parentheses.
     */
    private function parseConditionOrPrimary(): array
    {
        if ($this->position >= count($this->tokens)) {
            $this->throwParsingException("Unexpected end of query while looking for condition or primary expression", true);
        }
        $nextToken = $this->tokens[$this->position];
        if ($nextToken['type'] === 'keyword' && strtoupper($nextToken['value']) === self::K_NOT || $nextToken['value'] === '(') {
             return $this->parsePrimary();
        } else {
            return $this->parseCondition();
        }
    }


    /**
     * Parses conditions like "field operator value", "field IS NULL", "field BETWEEN x AND y", etc.
     */
    private function parseCondition(): array
    {
        if ($this->position >= count($this->tokens) || $this->tokens[$this->position]['type'] !== 'identifier') {
             $this->throwParsingException("Expected field name");
        }
        $fieldToken = $this->tokens[$this->position++];
        $field = $this->parseIdentifier($fieldToken['value']); // Handle backticks

        if ($this->position >= count($this->tokens)) {
             $this->throwParsingException("Unexpected end of query after field name '{$field}'");
        }

        $operatorToken = $this->tokens[$this->position++];
        $operator = strtoupper($operatorToken['value']);

        // --- Handle multi-word operators and special forms ---
        switch ($operator) {
            case self::K_IS:
                $isNot = false;
                if ($this->position < count($this->tokens) && strtoupper($this->tokens[$this->position]['value']) === self::K_NOT) {
                    $isNot = true;
                    $this->position++; // Consume 'NOT'
                }
                 if ($this->position >= count($this->tokens) || strtoupper($this->tokens[$this->position]['value']) !== self::K_NULL) {
                     $this->throwParsingException("Expected NULL after IS [NOT]");
                 }
                $this->position++; // Consume 'NULL'
                // IS NULL -> $exists: false (or field: null) - $exists:false is more general
                // IS NOT NULL -> $exists: true
                return [$field => [self::MGO_EXISTS => !$isNot]];

            case self::K_NOT: // Check for NOT IN, NOT LIKE, NOT BETWEEN, NOT REGEXP
                 if ($this->position >= count($this->tokens)) {
                     $this->throwParsingException("Expected IN, LIKE, BETWEEN, or REGEXP after NOT");
                 }
                $nextToken = $this->tokens[$this->position++];
                $subOperator = strtoupper($nextToken['value']);
                switch ($subOperator) {
                    case self::K_IN:
                        return $this->parseInCondition($field, true); // isNotIn = true
                    case self::K_LIKE:
                        return $this->parseLikeCondition($field, true); // isNotLike = true
                    case self::K_BETWEEN:
                        return $this->parseBetweenCondition($field, true); // isNotBetween = true
                    case self::K_REGEXP:
                         $pattern = $this->parseValue();
                         // Basic NOT REGEXP: $not: { $regex: pattern }
                         return [$field => [self::MGO_NOT => [self::MGO_REGEX => $pattern]]];
                    default:
                        $this->throwParsingException("Unexpected token '{$nextToken['value']}' after NOT");
                }
                // break; // Unreachable due to return/throw inside switch

            case self::K_IN:
                return $this->parseInCondition($field, false); // isNotIn = false

            case self::K_LIKE:
                 return $this->parseLikeCondition($field, false); // isNotLike = false

            case self::K_BETWEEN:
                 return $this->parseBetweenCondition($field, false); // isNotBetween = false
        }

        // --- Handle standard single-token operators mapped in OPERATOR_MAP ---
        if (!isset(self::OPERATOR_MAP[$operator])) {
            $this->throwParsingException("Unsupported or misplaced operator: {$operatorToken['value']}");
        }

        if ($this->position >= count($this->tokens)) {
             $this->throwParsingException("Expected value after operator '{$operatorToken['value']}'");
        }

        $value = $this->parseValue();
        $mongoOp = self::OPERATOR_MAP[$operator];

        // Special case for equality with null
        if ($mongoOp === self::MGO_EQ && $value === null) {
             // SQL `field = NULL` is usually false, `field IS NULL` is used.
             // Mapping `=` to `$eq` means `field = NULL` becomes `field: {$eq: null}`
             // which *does* match documents where field is explicitly null.
             // If strict SQL `field = NULL -> false` is needed, this requires different handling.
             // Current behavior matches typical NoSQL expectations for equality checks.
              return [$field => [$mongoOp => $value]];
        }
         // Special case for inequality with null
         if ($mongoOp === self::MGO_NE && $value === null) {
              // SQL `field != NULL` or `field <> NULL` is usually false.
              // Mapping to `$ne: null` matches fields that exist and are not null.
              // This aligns with `IS NOT NULL`.
              return [$field => [$mongoOp => $value]];
         }


        return [$field => [$mongoOp => $value]];
    }


    /** Parses the value list for an IN or NOT IN operator. */
    private function parseInCondition(string $field, bool $isNotIn): array
    {
        if ($this->position >= count($this->tokens) || $this->tokens[$this->position]['value'] !== '(') {
             $this->throwParsingException("Expected '(' after " . ($isNotIn ? self::K_NOT_IN : self::K_IN));
        }
        $this->position++; // Consume '('

        $values = $this->parseList();

        if ($this->position >= count($this->tokens) || $this->tokens[$this->position]['value'] !== ')') {
            $this->throwParsingException("Expected ')' after list for " . ($isNotIn ? self::K_NOT_IN : self::K_IN));
        }
        $this->position++; // Consume ')'

        $mongoOp = $isNotIn ? self::MGO_NIN : self::MGO_IN;
        return [$field => [$mongoOp => $values]];
    }

     /** Parses the pattern for a LIKE or NOT LIKE operator. */
    private function parseLikeCondition(string $field, bool $isNotLike): array
    {
        if ($this->position >= count($this->tokens)) {
            $this->throwParsingException("Expected pattern after " . ($isNotLike ? self::K_NOT_LIKE : self::K_LIKE));
        }
        $pattern = $this->parseValue();
        if (!is_string($pattern)) {
             $this->throwParsingException("LIKE pattern must be a string");
        }

        $regex = $this->sqlLikeToRegex($pattern);
        $options = $this->likeCaseInsensitive ? 'i' : '';

        $condition = [self::MGO_REGEX => $regex];
        if (!empty($options)) {
            $condition[self::MGO_OPTIONS] = $options;
        }

        if ($isNotLike) {
            return [$field => [self::MGO_NOT => $condition]];
        } else {
            return [$field => $condition];
        }
    }

    /** Parses the range for a BETWEEN or NOT BETWEEN operator. */
    private function parseBetweenCondition(string $field, bool $isNotBetween): array
    {
        if ($this->position >= count($this->tokens)) {
             $this->throwParsingException("Expected lower bound value after BETWEEN");
        }
        $start = $this->parseValue();

         if ($this->position >= count($this->tokens) || strtoupper($this->tokens[$this->position]['value']) !== self::K_AND) {
             $this->throwParsingException("Expected AND after lower bound in BETWEEN expression");
         }
        $this->position++; // Consume AND

        if ($this->position >= count($this->tokens)) {
            $this->throwParsingException("Expected upper bound value after AND in BETWEEN");
        }
        $end = $this->parseValue();

        $condition = [self::MGO_GTE => $start, self::MGO_LTE => $end];

        if ($isNotBetween) {
             // NOT BETWEEN a AND b  <=>  < a OR > b
             // MongoDB equivalent: $not: { $gte: a, $lte: b } or { $or: [ { $lt: a }, { $gt: b } ] }
             // Using $not is simpler to implement here.
            return [$field => [self::MGO_NOT => $condition]];
        } else {
            return [$field => $condition];
        }
    }

    /**
     * Parses a comma-separated list of values, typically within parentheses.
     * Stops parsing at the first token that is not a comma or a valid value.
     */
    private function parseList(): array
    {
        $values = [];
        if ($this->position >= count($this->tokens)) {
            $this->throwParsingException("Unexpected end of query while parsing list", true); // Should be inside () normally
        }

        // Handle empty list case immediately e.g., IN () - though this is invalid SQL
        if ($this->tokens[$this->position]['value'] === ')') {
            return $values;
        }

        do {
            if ($this->position >= count($this->tokens)) {
                $this->throwParsingException("Unexpected end of query in list");
            }
            $values[] = $this->parseValue();

            if ($this->position >= count($this->tokens) || $this->tokens[$this->position]['value'] !== ',') {
                break; // End of list (or expected closing parenthesis)
            }
            $this->position++; // Consume comma
        } while (true);

        return $values;
    }

    /**
     * Parses the next token as a literal value (string, number, boolean, null).
     * @return mixed The parsed PHP value.
     * @throws QueryParsingException If the token is not a valid value.
     */
    private function parseValue(): mixed
    {
         if ($this->position >= count($this->tokens)) {
             $this->throwParsingException("Unexpected end of query, expected value", true);
         }
        $token = $this->tokens[$this->position++];
        $value = $token['value'];
        $type = $token['type'];

        switch ($type) {
            case 'string':
                // Remove outer quotes and unescape internal quotes
                $quoteChar = $value[0];
                $escapedQuote = '\\' . $quoteChar;
                return str_replace($escapedQuote, $quoteChar, substr($value, 1, -1));

            case 'number':
                // Convert to int or float
                return strpos($value, '.') === false ? (int)$value : (float)$value;

            case 'keyword':
                 // Handle TRUE, FALSE, NULL keywords
                return match (strtoupper($value)) {
                    self::K_TRUE => true,
                    self::K_FALSE => false,
                    self::K_NULL => null,
                    default => $this->throwParsingException("Unexpected keyword '{$value}' where value was expected", false, $this->position -1),
                };

            case 'identifier': // Sometimes NULL might be tokenized as identifier if not uppercase
                 if (strtoupper($value) === self::K_NULL) return null;
                 // break intentionally omitted - fall through to throw error

             default:
                $this->throwParsingException("Invalid token type '{$type}' where value was expected: {$value}", false, $this->position -1);
        }
    }

    /**
     * Parses an identifier, removing backticks and unescaping if necessary.
     */
    private function parseIdentifier(string $identifier): string
    {
        if (str_starts_with($identifier, '`') && str_ends_with($identifier, '`')) {
            // Remove outer backticks and unescape internal backticks
            return str_replace('\\`', '`', substr($identifier, 1, -1));
        }
        // Return plain identifier directly
        return $identifier;
    }


    /**
     * Converts a SQL LIKE pattern (% wildcard, _ wildcard) to a PCRE regex pattern.
     * Handles basic escaping and optional anchoring.
     *
     * @param string $pattern The SQL LIKE pattern.
     * @return string The PCRE regex pattern.
     */
    private function sqlLikeToRegex(string $pattern): string
    {
        // 1. Escape PCRE special characters in the pattern
        $regex = preg_quote($pattern, '/');

        // 2. Convert SQL wildcards to PCRE wildcards
        //    Replace % with .* (any character, zero or more times)
        //    Replace _ with . (any single character)
        // Note: This simple replacement assumes '%' and '_' were not escaped
        // in the original SQL (e.g., using an ESCAPE clause, which we don't support).
        $regex = str_replace(['%', '_'], ['.*', '.'], $regex);

        // 3. Add anchors conditionally
        // Only anchor start if original pattern didn't start with %
        // Only anchor end if original pattern didn't end with %
        $anchorStart = !str_starts_with($pattern, '%');
        $anchorEnd = !str_ends_with($pattern, '%');

        return ($anchorStart ? '^' : '') . $regex . ($anchorEnd ? '$' : '');
    }

    /**
     * Gets the precedence level for logical operators.
     */
    private function getOperatorPrecedence(string $operator): int
    {
        return match (strtoupper($operator)) {
            self::K_AND => 2,
            self::K_OR => 1,
            default => 0, // Includes NOT, comparison operators, etc.
        };
    }

    /** Helper to get current token's starting position for error reporting */
    private function getCurrentTokenPosition(bool $endOfPrevious = false): int
    {
        $idx = $this->position;
        if ($endOfPrevious) {
            $idx = max(0, $this->position -1);
        }

        if ($idx < count($this->tokens)) {
            return $this->tokens[$idx]['pos'];
        }
        // If position is beyond tokens, return position after the last character
        return !empty($this->processedQuery) ? strlen($this->processedQuery) : 0;
    }

     /** Helper to throw a QueryParsingException consistently */
     private function throwParsingException(string $message, bool $endOfPrevious = false, ?int $overridePosIndex = null): never // PHP 8.1 never return type
     {
         $posIndex = $overridePosIndex ?? $this->position;
         $charPos = 0;

         if ($posIndex < count($this->tokens)) {
             $charPos = $this->tokens[$posIndex]['pos'];
         } elseif (!empty($this->tokens)) {
             // Point after the last token
             $lastToken = $this->tokens[count($this->tokens) - 1];
             $charPos = $lastToken['pos'] + strlen($lastToken['value']);
         } elseif (!empty($this->processedQuery)) {
            // Point to the end of the query string if no tokens exist but query isn't empty
            $charPos = strlen($this->processedQuery);
         }


         throw new QueryParsingException(
             $message,
             $this->originalQuery,
             $charPos
         );
     }


    /**
     * Static convenience method to translate SQL directly.
     *
     * @param string $sql The SQL WHERE clause string.
     * @param array $options Optional configuration (see constructor).
     * @return array The MongoDB query filter array.
     * @throws QueryParsingException If parsing fails.
     */
    public static function translate(string $sql, array $options = []): array
    {
        $parser = new self($sql, $options);
        return $parser->toMongo();
    }
}
