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
    public readonly ?string $offendingValue; // Optionally store the token value causing the error

    /**
     * Constructor for QueryParsingException.
     *
     * @param string $message The primary error message.
     * @param string $query The full SQL query string being parsed.
     * @param int $position The character position in the query where the error likely occurred.
     * @param ?string $offendingValue The value of the token that might have caused the error.
     * @param int $code The exception code.
     * @param ?Throwable $previous The previous throwable used for exception chaining.
     */
    public function __construct(
        string $message,
        string $query,
        int $position,
        ?string $offendingValue = null,
        int $code = 0,
        ?Throwable $previous = null
    ) {
        $this->query = $query;
        $this->position = max(0, $position); // Ensure position is not negative
        $this->offendingValue = $offendingValue;

        // Add context to the error message
        $context = $this->getErrorContext($this->query, $this->position);
        $fullMessage = sprintf(
            "%s%s\nAt position ~%d: ...%s...\n%s%s",
            $message,
            ($offendingValue !== null ? " (near '{$offendingValue}')" : ""),
            $this->position,
            $context['snippet'],
            str_repeat(' ', strlen("At position ~{$this->position}: ...")), // Align pointer
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
        $queryLength = strlen($query);
        $start = max(0, $position - $contextLength);
        // Calculate length carefully to avoid going past the end of the string
        $length = min($queryLength - $start, $contextLength * 2 + 1); // +1 to potentially include the char at position
        $snippet = substr($query, $start, $length);

        // Create a pointer ('^') indicating the error position within the snippet
        $pointerPosition = max(0, $position - $start); // Position relative to snippet start
        // Ensure pointer doesn't exceed snippet length (can happen if error is at the very end)
        $pointerPosition = min($pointerPosition, strlen($snippet));

        // Basic pointer alignment (works well for ASCII/single-byte)
        $pointer = str_repeat(' ', $pointerPosition) . '^';

        // Handle potential multibyte characters if precise alignment is critical (more complex)
        // If multibyte support is needed:
        // $prefix = mb_substr($snippet, 0, $pointerPosition);
        // $pointer = mb_str_repeat(' ', mb_strlen($prefix)) . '^';

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
 * - Logical operators: AND, OR (respecting precedence), NOT
 * - Parentheses for grouping: (...)
 * - IN (value1, value2, ...), NOT IN (value1, value2, ...)
 * - BETWEEN value1 AND value2, NOT BETWEEN value1 AND value2
 * - IS NULL, IS NOT NULL
 * - LIKE pattern, NOT LIKE pattern (with % and _ wildcards, configurable case sensitivity)
 * - REGEXP pattern (maps directly to $regex, pattern must be a valid PCRE string)
 * - Strings (single/double quoted, with standard \' and \" escapes)
 * - Numbers (integer, float)
 * - Booleans (TRUE, FALSE - case-insensitive keywords)
 * - NULL literal (case-insensitive keyword)
 * - Field names (including dot notation like 'user.address' and backtick-quoted names `` `field name with spaces` ``)
 *
 * Limitations:
 * - Does not support SQL functions, arithmetic operations, JOINs, subqueries, aliases, etc.
 * - LIKE conversion is basic and does not support the SQL `ESCAPE` clause.
 * - `field = NULL` and `field != NULL` translation follows MongoDB's common interpretation (`$eq: null`, `$ne: null`)
 * which differs from strict SQL three-valued logic (where they usually evaluate to UNKNOWN/FALSE).
 */
class SQLToMongoQuery
{
    // --- Constants for Keywords and Operators ---
    private const K_AND = 'AND';
    private const K_OR = 'OR';
    private const K_NOT = 'NOT';
    private const K_IN = 'IN';
    private const K_NOT_IN = 'NOT IN'; // Internal use, helps clarity
    private const K_LIKE = 'LIKE';
    private const K_NOT_LIKE = 'NOT LIKE'; // Internal use
    private const K_IS = 'IS';
    private const K_NULL = 'NULL';
    private const K_BETWEEN = 'BETWEEN';
    private const K_NOT_BETWEEN = 'NOT BETWEEN'; // Internal use
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

    // --- MongoDB Operators ---
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

    // SQL operators to MongoDB operators mapping (simple cases)
    private const OPERATOR_MAP = [
        self::OP_EQ => self::MGO_EQ,
        self::OP_NE => self::MGO_NE,
        self::OP_NE_ALT => self::MGO_NE,
        self::OP_GT => self::MGO_GT,
        self::OP_LT => self::MGO_LT,
        self::OP_GTE => self::MGO_GTE,
        self::OP_LTE => self::MGO_LTE,
        self::K_REGEXP => self::MGO_REGEX, // Handled directly
        // Special operators (IS NULL, IN, LIKE, BETWEEN, NOT variants) handled in parseCondition
    ];

    /** @var array<array{value: string, type: string, pos: int}> Processed tokens */
    private array $tokens = [];
    /** @var int Current position in the token array */
    private int $position = 0;
    /** @var string Original unmodified query string for error reporting */
    private readonly string $originalQuery;
    /** @var string Query string trimmed for parsing */
    private readonly string $processedQuery;

    // --- Configurable Options ---
    /** @var bool Whether LIKE/NOT LIKE comparisons should be case-insensitive */
    private bool $likeCaseInsensitive = false;

    /**
     * Constructor.
     *
     * @param string $query The SQL WHERE clause string.
     * @param array $options Optional configuration:
     * - 'likeCaseInsensitive' (bool): Set LIKE/NOT LIKE matching to be case-insensitive (default: false). Maps to MongoDB regex 'i' option.
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
     * @return array<string, mixed> The MongoDB query filter array. Returns empty array for empty input string.
     * @throws QueryParsingException If parsing fails due to syntax errors or unsupported constructs.
     */
    public function toMongo(): array
    {
        if (empty($this->processedQuery)) {
            return []; // Empty query string results in an empty filter (match all)
        }

        try {
            $this->tokenize();
            if (empty($this->tokens)) {
                 // Could happen if query was just whitespace or comments not handled
                return [];
            }

            $result = $this->parseExpression(); // Start parsing with lowest precedence

            // After parsing, check if all tokens were consumed
            if ($this->position < count($this->tokens)) {
                $this->throwParsingException(
                    "Unexpected token found after main expression",
                    $this->tokens[$this->position]['value'] ?? null // Provide offending token if possible
                );
            }
            return $result;

        } catch (QueryParsingException $e) {
            // Re-throw our specific exception
            throw $e;
        } catch (Throwable $e) {
            // Wrap other potential errors (e.g., regex errors during LIKE conversion)
            $pos = $this->getCurrentTokenCharPosition();
            $currentToken = ($this->position < count($this->tokens)) ? $this->tokens[$this->position]['value'] : null;
            throw new QueryParsingException(
                "Failed to parse SQL query: {$e->getMessage()}",
                $this->originalQuery,
                $pos,
                $currentToken,
                $e->getCode(),
                $e // Chain the previous exception
            );
        }
    }

    /**
     * Tokenizes the input query string into fundamental units (keywords, operators, values, etc.).
     * @throws QueryParsingException if unknown characters are found or strings/identifiers are malformed.
     */
    private function tokenize(): void
    {
        // Regex breakdown:
        // \s* : Skip leading whitespace
        // Capturing groups (?<name>...) for different token types:
        // string_single: '...' with escaped \'
        // string_double: "..." with escaped \"
        // identifier_backtick: `...` with escaped \`
        // number: Integer or float (simple form)
        // operator: <=, >=, !=, <>, =, <, > (order matters: longest first)
        // keyword: Case-insensitive match for known keywords
        // identifier: Standard SQL identifiers (letters, numbers, _, starting with letter or _) including dot notation
        // paren: (, ), or ,
        // \s* : Skip trailing whitespace
        // x modifier: Ignore whitespace in pattern, allow comments (#)
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
                (?<operator><=|>=|!=|<>|=|<|>) # Comparison operators (longest first)
                |
                # Keywords (case-insensitive match using (?i:...))
                (?<keyword>(?i:AND|OR|NOT|IN|LIKE|IS|NULL|BETWEEN|REGEXP|TRUE|FALSE))
                |
                # Plain Identifiers (field names, potentially dotted)
                (?<identifier>[a-zA-Z_][a-zA-Z0-9_\.]*)
                |
                (?<paren>[\(\),]) # Parentheses and comma
            )
            \s* # Skip trailing whitespace
        /x';

        $flags = PREG_SET_ORDER | PREG_OFFSET_CAPTURE;
        $matches = []; // Initialize $matches
        $result = preg_match_all($pattern, $this->processedQuery, $matches, $flags);

        // Check for preg_match_all errors (e.g., regex compilation issues, backtrack limits)
        if ($result === false) {
             throw new QueryParsingException("Regex error during tokenization: " . preg_last_error_msg(), $this->originalQuery, 0);
        }

        $this->tokens = [];
        $matchedLength = 0;
        $lastMatchEndPos = 0;

        foreach ($matches as $match) {
            // Check for gaps between matches, indicating unrecognized characters
            if ($match[0][1] > $lastMatchEndPos) {
                 $unmatchedPos = $lastMatchEndPos;
                 $this->throwParsingException(
                    "Unrecognized character sequence in query",
                    null, // Offending value is unknown here
                    $unmatchedPos
                 );
            }

            // $match[1] is the captured token group
            $value = $match[1][0];
            $pos = $match[1][1]; // Starting character position of the token itself

            // Determine token type robustly by checking which named capture group was successful
            // Note: $match['group_name'][1] will be -1 if that group didn't match this specific token
            $type = 'unknown';
            if (isset($match['string_single']) && $match['string_single'][1] !== -1) $type = 'string';
            elseif (isset($match['string_double']) && $match['string_double'][1] !== -1) $type = 'string';
            elseif (isset($match['identifier_backtick']) && $match['identifier_backtick'][1] !== -1) $type = 'identifier';
            elseif (isset($match['number']) && $match['number'][1] !== -1) $type = 'number';
            elseif (isset($match['operator']) && $match['operator'][1] !== -1) $type = 'operator';
            elseif (isset($match['keyword']) && $match['keyword'][1] !== -1) $type = 'keyword';
            elseif (isset($match['identifier']) && $match['identifier'][1] !== -1) $type = 'identifier';
            elseif (isset($match['paren']) && $match['paren'][1] !== -1) $type = 'paren';

            if ($type === 'unknown') {
                 // Should not happen if regex is correct and covers all cases
                 $this->throwParsingException("Internal tokenizer error: Failed to determine type for matched token", $value, $pos);
            }

            $this->tokens[] = ['value' => $value, 'type' => $type, 'pos' => $pos];

            $matchedLength += strlen($match[0][0]); // Length of full match including surrounding whitespace
            $lastMatchEndPos = $match[0][1] + strlen($match[0][0]);
        }

        // Check if the entire string was consumed by the tokenizer
        if ($lastMatchEndPos < strlen($this->processedQuery)) {
            $this->throwParsingException(
                "Unrecognized character sequence at the end of the query",
                null,
                $lastMatchEndPos // Error occurred after the last successfully matched token
            );
        }

         // Check if tokenization produced no tokens for a non-empty query (should be caught earlier)
        if (empty($this->tokens) && !empty($this->processedQuery)) {
             $this->throwParsingException("Could not tokenize the query string.", null, 0);
        }


        $this->position = 0; // Reset token position for the parser
    }


    /**
     * Parses expressions involving logical operators (AND, OR) respecting precedence.
     * Implements precedence climbing method.
     * AND has higher precedence (2) than OR (1).
     *
     * @param int $minPrecedence The minimum precedence level to bind.
     * @return array<string, mixed> The MongoDB filter array for the parsed expression.
     * @throws QueryParsingException If syntax errors occur.
     */
    private function parseExpression(int $minPrecedence = 0): array
    {
        if ($this->position >= count($this->tokens)) {
            $this->throwParsingException("Unexpected end of query while parsing expression", null, true); // true -> point to end of previous token
        }

        // Parse the left-hand side operand (primary expression or higher precedence expression)
        $left = $this->parsePrimary();

        // Loop while the next operator has precedence >= $minPrecedence
        while ($this->position < count($this->tokens)) {
            $currentToken = $this->tokens[$this->position];

            // Check if it's a logical operator we handle at this level
            if ($currentToken['type'] !== 'keyword') break;
            $operator = strtoupper($currentToken['value']);
            if ($operator !== self::K_AND && $operator !== self::K_OR) break;

            $precedence = $this->getLogicalOperatorPrecedence($operator);

            // If the operator's precedence is lower than the minimum required, break the loop
            if ($precedence < $minPrecedence) {
                break;
            }

            $this->position++; // Consume the AND/OR operator

            // Parse the right-hand side operand, requiring operators with higher precedence
            $right = $this->parseExpression($precedence + 1); // For right-associativity, use $precedence

            $mongoOp = match ($operator) {
                self::K_AND => self::MGO_AND,
                self::K_OR => self::MGO_OR,
                default => $this->throwParsingException("Internal error: Unhandled logical operator", $operator) // Should not happen
            };

            // Combine left and right operands under the MongoDB operator ($and/$or)
            // Optimize by flattening consecutive operators of the same type
            if (isset($left[$mongoOp]) && is_array($left[$mongoOp])) {
                // Append right to existing $and/$or array in left
                $left[$mongoOp][] = $right;
            } elseif (isset($right[$mongoOp]) && is_array($right[$mongoOp]) && count($right[$mongoOp]) === 1 && key($right[$mongoOp]) === 0) {
                 // If right is [$mongoOp => [$singleExpr]], prepend left
                 array_unshift($right[$mongoOp], $left);
                 $left = $right;
            } else {
                 // Create a new $and/$or structure
                $left = [$mongoOp => [$left, $right]];
            }
        }

        return $left;
    }

    /**
     * Parses primary expressions:
     * - Parenthesized expressions `( expression )`
     * - Unary NOT operator `NOT primary_expression`
     * - Basic conditions `field op value`, `field IS NULL`, etc.
     *
     * @return array<string, mixed> The MongoDB filter array for the parsed primary expression.
     * @throws QueryParsingException If syntax errors occur.
     */
    private function parsePrimary(): array
    {
        if ($this->position >= count($this->tokens)) {
            $this->throwParsingException("Unexpected end of query while looking for an expression or condition", null, true);
        }

        $currentToken = $this->tokens[$this->position];

        // Handle Parentheses: ( expression )
        if ($currentToken['type'] === 'paren' && $currentToken['value'] === '(') {
            $this->position++; // Consume '('
            $expr = $this->parseExpression(0); // Parse expression inside parens, resetting precedence

            if ($this->position >= count($this->tokens) || $this->tokens[$this->position]['value'] !== ')') {
                $expectedToken = $this->tokens[$this->position] ?? null;
                $this->throwParsingException(
                    "Expected ')' to close parenthesized expression",
                     $expectedToken['value'] ?? null
                );
            }
            $this->position++; // Consume ')'
            return $expr;
        }

        // Handle NOT operator: NOT primary_expression
        if ($currentToken['type'] === 'keyword' && strtoupper($currentToken['value']) === self::K_NOT) {
            $this->position++; // Consume 'NOT'

            // Recursively parse the operand of NOT. This handles NOT (expr), NOT NOT expr, NOT field=val etc.
            $operand = $this->parsePrimary(); // NOT has high precedence

            // --- Simplification Heuristic for NOT ---
            // Try to simplify negations where possible (e.g., NOT (field = 5) -> field != 5)
            // This is an optimization and relies on the structure of the $operand array.

            // Check if operand is a single field condition: { field: { $op: value } }
            if (count($operand) === 1) {
                $field = key($operand);
                $condition = current($operand);

                // Check if condition is a simple { $op: value } structure
                if (is_array($condition) && count($condition) === 1) {
                    $mongoOp = key($condition);
                    $value = current($condition);

                    $negatedOp = match($mongoOp) {
                        self::MGO_EQ => self::MGO_NE,      // NOT (=) -> !=
                        self::MGO_NE => self::MGO_EQ,      // NOT (!=) -> =
                        self::MGO_GT => self::MGO_LTE,     // NOT (>) -> <=
                        self::MGO_GTE => self::MGO_LT,     // NOT (>=) -> <
                        self::MGO_LT => self::MGO_GTE,     // NOT (<) -> >=
                        self::MGO_LTE => self::MGO_GT,     // NOT (<=) -> >
                        self::MGO_IN => self::MGO_NIN,     // NOT (IN) -> NIN
                        self::MGO_NIN => self::MGO_IN,     // NOT (NIN) -> IN
                        self::MGO_EXISTS => ($value === true ? self::MGO_EXISTS : null), // NOT (IS NOT NULL / $exists:true) -> IS NULL / $exists:false
                        // Add more direct negations if needed (e.g., $regex?)
                        default => null // Cannot simplify this operator directly
                    };

                    // Special handling for EXISTS negation
                    if ($mongoOp === self::MGO_EXISTS && $negatedOp === self::MGO_EXISTS) {
                         return [$field => [self::MGO_EXISTS => false]]; // $not:{$exists:true} -> $exists:false
                    } elseif ($negatedOp !== null) {
                        // Apply the simplified negated operator
                        return [$field => [$negatedOp => $value]];
                    }
                    // If no simplification, fall through to general $not wrapper
                }
                 // Handle simple equality case: { field: value } which implies { field: { $eq: value } }
                 else if (!is_array($condition)) {
                     // NOT (field = value) -> field != value
                     return [$field => [self::MGO_NE => $condition]];
                 }
            }

            // If operand is complex or couldn't be simplified, use the general MongoDB $not operator
            // Example: NOT (a=1 AND b=2) -> { $not: { $and: [ {a: {$eq: 1}}, {b: {$eq: 2}} ] } }
            return [self::MGO_NOT => $operand];
        }

        // Otherwise, assume it's a simple condition like "field op value", "field IS NULL", etc.
        // parseCondition expects to start at the identifier.
        return $this->parseCondition();
    }


    /**
     * Parses simple conditions like:
     * - `field operator value`
     * - `field IS [NOT] NULL`
     * - `field [NOT] IN (list)`
     * - `field [NOT] LIKE pattern`
     * - `field [NOT] BETWEEN val1 AND val2`
     * - `field [NOT] REGEXP pattern`
     * Assumes the current token is the field identifier.
     *
     * @return array<string, mixed> The MongoDB filter array for the parsed condition.
     * @throws QueryParsingException If syntax errors occur.
     */
    private function parseCondition(): array
    {
        // 1. Expect Field Identifier
        if ($this->position >= count($this->tokens) || $this->tokens[$this->position]['type'] !== 'identifier') {
            $this->throwParsingException(
                "Expected field name to start a condition",
                $this->tokens[$this->position]['value'] ?? null
            );
        }
        $fieldToken = $this->tokens[$this->position++];
        $field = $this->parseIdentifier($fieldToken['value']); // Handle backticks

        if ($this->position >= count($this->tokens)) {
            $this->throwParsingException("Unexpected end of query after field name '{$field}'", null, true);
        }

        // 2. Expect Operator or Keyword acting as operator (IS, IN, LIKE, BETWEEN, REGEXP, NOT)
        $operatorToken = $this->tokens[$this->position];
        $operatorValue = $operatorToken['value'];
        $operatorUpper = strtoupper($operatorValue);
        $this->position++; // Consume the operator/keyword token

        // --- Handle multi-word operators and special forms ---
        switch ($operatorUpper) {
            case self::K_IS: // Handles: IS NULL, IS NOT NULL
                $isNot = false;
                if ($this->peekKeyword(self::K_NOT)) {
                    $isNot = true;
                    $this->position++; // Consume 'NOT'
                }
                if (!$this->expectKeyword(self::K_NULL)) {
                    $this->throwParsingException("Expected NULL after IS" . ($isNot ? " NOT" : ""), $this->getCurrentTokenValue());
                }
                // IS NULL     -> { field: { $exists: true, $eq: null } } (stricter) or { field: { $eq: null } } or { field: { $exists: false } } (common interpretation)
                // IS NOT NULL -> { field: { $ne: null } } or { field: { $exists: true } } (common interpretation)
                // We map IS NOT NULL to $exists: true (field must be present)
                // We map IS NULL to $eq: null (field must be null, implies existence) - aligns better with $ne: null
                // Alternative for IS NULL: $exists: false (more common SQL mapping, but less consistent with $ne: null)
                 return $isNot
                    ? [$field => [self::MGO_NE => null]] // IS NOT NULL -> { field: {$ne: null} } (exists and not null)
                    : [$field => [self::MGO_EQ => null]]; // IS NULL -> { field: {$eq: null} } (exists and is null)
                // return [$field => [self::MGO_EXISTS => !$isNot]]; // Alternative mapping

            case self::K_NOT: // Check specifically for NOT IN, NOT LIKE, NOT BETWEEN, NOT REGEXP
                if ($this->position >= count($this->tokens)) {
                    $this->throwParsingException("Expected IN, LIKE, BETWEEN, or REGEXP after NOT", null, true);
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
                        $patternValue = $this->parseValue(); // Expects the regex pattern value next
                        if (!is_string($patternValue)) {
                            $this->throwParsingException("REGEXP pattern must be a string value", is_scalar($patternValue) ? (string)$patternValue : gettype($patternValue), false, $this->position -1);
                        }
                        // MongoDB equivalent: { field: { $not: { $regex: pattern } } }
                        return [$field => [self::MGO_NOT => [self::MGO_REGEX => $patternValue]]];
                    default:
                        $this->throwParsingException("Unexpected keyword '{$nextToken['value']}' following NOT for field '{$field}'. Expected IN, LIKE, BETWEEN, or REGEXP.", $nextToken['value']);
                }
                // break; // Unreachable

            case self::K_IN: // Handles: IN (list)
                return $this->parseInCondition($field, false); // isNotIn = false

            case self::K_LIKE: // Handles: LIKE pattern
                return $this->parseLikeCondition($field, false); // isNotLike = false

            case self::K_BETWEEN: // Handles: BETWEEN val1 AND val2
                return $this->parseBetweenCondition($field, false); // isNotBetween = false

            // --- Handle standard single-token operators (=, !=, <>, >, <, >=, <=, REGEXP) ---
            default:
                if (!isset(self::OPERATOR_MAP[$operatorValue]) && $operatorUpper !== self::K_REGEXP) {
                    // Check OPERATOR_MAP using original case if needed, but map uses constants anyway.
                    // The check for REGEXP is needed as it's in OPERATOR_MAP but handled differently if it follows NOT.
                     $this->throwParsingException("Unsupported or misplaced operator '{$operatorValue}' for field '{$field}'", $operatorValue);
                }

                // Expect a value after the operator
                if ($this->position >= count($this->tokens)) {
                    $this->throwParsingException("Expected a value after operator '{$operatorValue}' for field '{$field}'", null, true);
                }

                $value = $this->parseValue(); // Parse the literal value

                // REGEXP is handled like other simple operators here (field REGEXP 'pattern')
                if ($operatorUpper === self::K_REGEXP) {
                     if (!is_string($value)) {
                          $this->throwParsingException("REGEXP pattern must be a string value", is_scalar($value) ? (string)$value : gettype($value), false, $this->position -1);
                      }
                     return [$field => [self::MGO_REGEX => $value]];
                 }


                // Get the corresponding MongoDB operator
                $mongoOp = self::OPERATOR_MAP[$operatorValue] ?? null; // Should exist if we passed the check above
                 if ($mongoOp === null) {
                     $this->throwParsingException("Internal mapping error for operator '{$operatorValue}'", $operatorValue);
                 }


                // --- Special Handling for NULL comparisons ---
                // SQL: `col = NULL` is generally false/unknown. `col IS NULL` is used.
                // SQL: `col != NULL` or `col <> NULL` is generally false/unknown. `col IS NOT NULL` is used.
                // Mongo: `$eq: null` matches documents where the field is explicitly null.
                // Mongo: `$ne: null` matches documents where the field exists and is not null.
                // This parser maps '=' to '$eq' and '!=' / '<>' to '$ne'.
                // So, `field = NULL` becomes `{field: {$eq: null}}`.
                // And `field != NULL` becomes `{field: {$ne: null}}`.
                // This aligns with `IS NULL` / `IS NOT NULL` mappings chosen above but differs from strict SQL.

                // No special code needed here anymore as IS NULL / IS NOT NULL handled above.
                // The $eq/$ne mapping directly applies.

                // Standard condition: { field: { $mongoOp: value } }
                // Optimize simple equality: { field: value } is equivalent to { field: { $eq: value } } in MongoDB
                 if ($mongoOp === self::MGO_EQ) {
                     return [$field => $value];
                 } else {
                     return [$field => [$mongoOp => $value]];
                 }
        }
    }


    /**
     * Parses the value list for an IN or NOT IN operator `(value1, value2, ...)`
     * Assumes the '(' token has just been consumed.
     *
     * @param string $field The field name for the condition.
     * @param bool $isNotIn True if parsing NOT IN, false for IN.
     * @return array<string, mixed> The MongoDB filter array `{ field: { $in/$nin: [values] } }`.
     * @throws QueryParsingException If syntax errors occur (missing comma, parenthesis, or invalid values).
     */
    private function parseInCondition(string $field, bool $isNotIn): array
    {
        // Expect '(' to start the list
        if (!$this->expectParen('(')) {
             $opStr = $isNotIn ? self::K_NOT . ' ' . self::K_IN : self::K_IN;
             $this->throwParsingException("Expected '(' to start value list after {$opStr}", $this->getCurrentTokenValue());
        }

        $values = $this->parseList(); // Parse the comma-separated values

        // Expect ')' to end the list
         if (!$this->expectParen(')')) {
             $opStr = $isNotIn ? self::K_NOT . ' ' . self::K_IN : self::K_IN;
             $this->throwParsingException("Expected ')' to end value list for {$opStr}", $this->getCurrentTokenValue());
         }

        // Handle SQL `IN ()` or `NOT IN ()` - this is often invalid SQL but easy to produce.
        // MongoDB `$in: []` matches nothing.
        // MongoDB `$nin: []` matches everything.
        // This behavior seems reasonable to replicate.
        if (empty($values)) {
            // For `field IN ()`, we want it to match nothing. `$in: []` does this.
            // For `field NOT IN ()`, we want it to match everything (where field exists). `$nin: []` does this.
        }


        $mongoOp = $isNotIn ? self::MGO_NIN : self::MGO_IN;
        return [$field => [$mongoOp => $values]];
    }

    /**
      * Parses the pattern for a LIKE or NOT LIKE operator.
      * Assumes the LIKE or NOT LIKE token(s) have just been consumed.
      *
      * @param string $field The field name for the condition.
      * @param bool $isNotLike True if parsing NOT LIKE, false for LIKE.
      * @return array<string, mixed> The MongoDB filter array `{ field: { $regex: ..., $options: ... } }` or `{ field: { $not: { ... } } }`.
      * @throws QueryParsingException If the pattern is not a string or regex conversion fails.
      */
    private function parseLikeCondition(string $field, bool $isNotLike): array
    {
        if ($this->position >= count($this->tokens)) {
             $opStr = $isNotLike ? self::K_NOT . ' ' . self::K_LIKE : self::K_LIKE;
             $this->throwParsingException("Expected pattern value after {$opStr}", null, true);
        }

        $patternValue = $this->parseValue(); // Expects the pattern value next
        if (!is_string($patternValue)) {
             $opStr = $isNotLike ? self::K_NOT . ' ' . self::K_LIKE : self::K_LIKE;
             $this->throwParsingException(
                "Pattern for {$opStr} must be a string value",
                is_scalar($patternValue) ? (string)$patternValue : gettype($patternValue),
                false,
                $this->position - 1 // Point to the token that was parsed as the value
            );
        }

        try {
            $regex = $this->sqlLikeToRegex($patternValue);
        } catch (Throwable $e) {
            // Catch potential errors during regex conversion/quoting
            $this->throwParsingException("Error converting LIKE pattern to regex: " . $e->getMessage(), $patternValue, false, $this->position - 1);
        }

        $options = $this->likeCaseInsensitive ? 'i' : '';

        $regexCondition = [self::MGO_REGEX => $regex];
        if (!empty($options)) {
            $regexCondition[self::MGO_OPTIONS] = $options;
        }

        if ($isNotLike) {
            // MongoDB equivalent for NOT LIKE: { field: { $not: { $regex: pattern, $options: opts } } }
            return [$field => [self::MGO_NOT => $regexCondition]];
        } else {
            // MongoDB equivalent for LIKE: { field: { $regex: pattern, $options: opts } }
            return [$field => $regexCondition];
        }
    }

    /**
     * Parses the range for a BETWEEN or NOT BETWEEN operator `value1 AND value2`.
     * Assumes the BETWEEN or NOT BETWEEN token(s) have just been consumed.
     *
     * @param string $field The field name for the condition.
     * @param bool $isNotBetween True if parsing NOT BETWEEN, false for BETWEEN.
     * @return array<string, mixed> The MongoDB filter array `{ field: { $gte: val1, $lte: val2 } }` or `{ field: { $not: { ... } } }`.
     * @throws QueryParsingException If syntax errors occur (missing values, missing AND).
     */
    private function parseBetweenCondition(string $field, bool $isNotBetween): array
    {
         $opStr = $isNotBetween ? self::K_NOT . ' ' . self::K_BETWEEN : self::K_BETWEEN;

        // 1. Parse Lower Bound Value
        if ($this->position >= count($this->tokens)) {
             $this->throwParsingException("Expected lower bound value after {$opStr}", null, true);
        }
        $startValue = $this->parseValue();

        // 2. Expect AND Keyword
        if (!$this->expectKeyword(self::K_AND)) {
            $this->throwParsingException("Expected keyword AND after lower bound value in {$opStr} expression", $this->getCurrentTokenValue());
        }

        // 3. Parse Upper Bound Value
        if ($this->position >= count($this->tokens)) {
            $this->throwParsingException("Expected upper bound value after AND in {$opStr}", null, true);
        }
        $endValue = $this->parseValue();

        // Standard BETWEEN condition: { field: { $gte: start, $lte: end } }
        $betweenCondition = [self::MGO_GTE => $startValue, self::MGO_LTE => $endValue];

        if ($isNotBetween) {
            // SQL: NOT BETWEEN a AND b  <=>  < a OR > b
            // MongoDB equivalent: { $not: { $gte: a, $lte: b } }
            // An alternative formulation is { $or: [ { field: { $lt: a } }, { field: { $gt: b } } ] }
            // Using $not is simpler to implement based on the standard BETWEEN condition.
            return [$field => [self::MGO_NOT => $betweenCondition]];
        } else {
            return [$field => $betweenCondition];
        }
    }

    /**
     * Parses a comma-separated list of literal values.
     * Used for IN (...) lists. Assumes the opening '(' has been consumed.
     * Stops parsing at the first token that is not a comma or a valid value type.
     *
     * @return list<mixed> A list of the parsed PHP values.
     * @throws QueryParsingException If an invalid token is found where a value or comma is expected, or on unexpected end of query.
     */
    private function parseList(): array
    {
        $values = [];

        if ($this->position >= count($this->tokens)) {
             $this->throwParsingException("Unexpected end of query while parsing list", null, true);
        }

        // Handle empty list case immediately e.g., IN ()
        if ($this->peekParen(')')) {
            return $values; // Return empty list
        }

        // Parse the first value
        $values[] = $this->parseValue();

        // Loop parsing subsequent values separated by commas
        while ($this->peekParen(',')) {
            $this->position++; // Consume comma
            if ($this->position >= count($this->tokens)) {
                $this->throwParsingException("Unexpected end of query after comma in list", null, true);
            }
            // Handle trailing comma before closing parenthesis: IN (1, 2, )
            if ($this->peekParen(')')) {
                 $this->throwParsingException("Unexpected ')' after comma in list. Expected another value.", ")", false);
                 // Or alternatively, allow trailing commas by just breaking here:
                 // break;
            }
            $values[] = $this->parseValue();
        }

        return $values;
    }

    /**
     * Parses the current token as a literal value (string, number, boolean, null).
     * Consumes the token.
     *
     * @return mixed The parsed PHP value (string, int, float, bool, null).
     * @throws QueryParsingException If the current token is not a valid literal value type.
     */
    private function parseValue(): mixed
    {
        if ($this->position >= count($this->tokens)) {
            $this->throwParsingException("Unexpected end of query, expected a literal value (string, number, TRUE, FALSE, NULL)", null, true);
        }

        $token = $this->tokens[$this->position];
        $value = $token['value'];
        $type = $token['type'];
        $posIndex = $this->position; // Store index before incrementing

        $this->position++; // Consume the token

        switch ($type) {
            case 'string':
                // Remove outer quotes and unescape internal quotes based on the quote char used
                $quoteChar = $value[0]; // ' or "
                $escapedQuote = '\\' . $quoteChar; // \' or \"
                // Use str_replace for simple cases, potentially needs adjustments for other escapes like \\
                return str_replace($escapedQuote, $quoteChar, substr($value, 1, -1));

            case 'number':
                // Convert to int or float based on presence of decimal point
                return strpos($value, '.') === false ? (int)$value : (float)$value;

            case 'keyword':
                // Handle TRUE, FALSE, NULL keywords (case-insensitive match)
                return match (strtoupper($value)) {
                    self::K_TRUE => true,
                    self::K_FALSE => false,
                    self::K_NULL => null,
                    default => $this->throwParsingException(
                        "Unexpected keyword '{$value}' where a literal value was expected",
                        $value,
                        false, // Don't point to end of previous token
                        $posIndex // Use stored index of the problematic token
                    ),
                };

            case 'identifier': // Check if it's an unquoted NULL keyword (often allowed in SQL)
                if (strtoupper($value) === self::K_NULL) {
                     return null;
                 }
                // Fall through intended: An identifier is not a literal value unless it's NULL.

            default:
                // If it's not a string, number, or recognized keyword, it's invalid here.
                $this->throwParsingException(
                    "Invalid token type '{$type}' ('{$value}') where a literal value was expected",
                    $value,
                    false,
                    $posIndex
                );
        }
    }

    /**
     * Parses an identifier token value, removing outer backticks and unescaping internal backticks `\` ` if present.
     *
     * @param string $identifier The raw identifier token value.
     * @return string The cleaned identifier name.
     */
    private function parseIdentifier(string $identifier): string
    {
        if (str_starts_with($identifier, '`') && str_ends_with($identifier, '`')) {
            // Remove outer backticks (first and last char)
            $inner = substr($identifier, 1, -1);
            // Unescape internal escaped backticks (\`)
            return str_replace('\\`', '`', $inner);
        }
        // Return plain identifier (like table.column or simple_field) directly
        return $identifier;
    }


    /**
     * Converts a SQL LIKE pattern string (using % and _ wildcards) to a PCRE regex pattern.
     * - Escapes regex metacharacters in the pattern.
     * - Converts SQL '%' to PCRE '.*'.
     * - Converts SQL '_' to PCRE '.'.
     * - Anchors the regex ('^', '$') unless the pattern starts/ends with '%'.
     *
     * NOTE: Does not support the SQL `ESCAPE` clause for specifying custom escape characters.
     * Assumes '%' and '_' are literal wildcards unless escaped with a standard backslash
     * *if* backslash escaping is intended (this simple version doesn't handle `\%` -> `%` specifically).
     *
     * @param string $pattern The SQL LIKE pattern.
     * @return string The equivalent PCRE regex pattern.
     * @throws \RuntimeException If `preg_quote` fails (highly unlikely).
     */
    private function sqlLikeToRegex(string $pattern): string
    {
        // 1. Escape all PCRE special characters in the input pattern string.
        //    This treats characters like '.', '+', '*', '?', '^', '$', etc. literally.
        //    We use '/' as the delimiter for our final regex.
        $regex = preg_quote($pattern, '/');
        if ($regex === false) {
             // preg_quote failing is extremely rare, maybe memory issues?
             throw new \RuntimeException("preg_quote failed during LIKE to regex conversion");
        }


        // 2. Convert the SQL wildcards (%) and (_) to their PCRE equivalents (.* and .)
        //    We replace the *escaped* versions produced by preg_quote.
        //    Example: If pattern is 'a%b_c', preg_quote makes it 'a\%b\_c'.
        //    We need to change '\%' to '.*' and '\_' to '.'.
        //    Using strtr for simultaneous replacement.
        $regex = strtr($regex, ['%' => '.*', '_' => '.']);

        // 3. Add PCRE anchors (^ for start, $ for end) conditionally.
        //    Anchoring ensures the pattern matches the entire string by default.
        //    However, if the original SQL pattern started or ended with '%',
        //    it implies matching anywhere, so we omit the corresponding anchor.
        $anchorStart = !str_starts_with($pattern, '%');
        $anchorEnd = !str_ends_with($pattern, '%');

        return ($anchorStart ? '^' : '') . $regex . ($anchorEnd ? '$' : '');
    }

    /**
     * Gets the precedence level for logical operators (AND, OR).
     * Higher number means higher precedence (binds tighter).
     *
     * @param string $operator The logical operator (AND or OR).
     * @return int Precedence level (2 for AND, 1 for OR, 0 otherwise).
     */
    private function getLogicalOperatorPrecedence(string $operator): int
    {
        return match (strtoupper($operator)) {
            self::K_AND => 2,
            self::K_OR => 1,
            default => 0, // Should not be used for non-logical operators in parseExpression
        };
    }

    // --- Helper methods for parsing ---

    /** Checks if the next token matches the expected keyword (case-insensitive). Does not consume. */
    private function peekKeyword(string $keyword): bool
    {
        if ($this->position >= count($this->tokens)) return false;
        $token = $this->tokens[$this->position];
        return $token['type'] === 'keyword' && strtoupper($token['value']) === $keyword;
    }

     /** Checks if the next token matches the expected parenthesis character. Does not consume. */
    private function peekParen(string $paren): bool
    {
        if ($this->position >= count($this->tokens)) return false;
        $token = $this->tokens[$this->position];
        return $token['type'] === 'paren' && $token['value'] === $paren;
    }

    /** Consumes the next token if it matches the expected keyword (case-insensitive). Returns true if matched, false otherwise. */
    private function expectKeyword(string $keyword): bool
    {
        if ($this->peekKeyword($keyword)) {
            $this->position++;
            return true;
        }
        return false;
    }

     /** Consumes the next token if it matches the expected parenthesis. Returns true if matched, false otherwise. */
    private function expectParen(string $paren): bool
    {
        if ($this->peekParen($paren)) {
            $this->position++;
            return true;
        }
        return false;
    }

    /** Helper to get the current token's value, or null if at end */
    private function getCurrentTokenValue(): ?string
    {
        if ($this->position < count($this->tokens)) {
            return $this->tokens[$this->position]['value'];
        }
        return null;
    }


    /** Helper to get current token's starting character position for error reporting */
    private function getCurrentTokenCharPosition(bool $endOfPrevious = false): int
    {
        $idx = $this->position;
        if ($endOfPrevious) {
            // If requested position is end of previous, use the token *before* current index
            $idx = max(0, $this->position - 1);
             if ($idx < count($this->tokens)) {
                 $prevToken = $this->tokens[$idx];
                 // Position after the previous token
                 return $prevToken['pos'] + strlen($prevToken['value']);
             }
             // If no previous token, point to start
              return 0;

        } else {
             // Use the current index
             if ($idx < count($this->tokens)) {
                 // Position at the start of the current token
                 return $this->tokens[$idx]['pos'];
             }
        }


        // If position is beyond available tokens (end of query reached unexpectedly)
        // point to the position immediately after the last character of the query string.
        return !empty($this->processedQuery) ? strlen($this->processedQuery) : 0;
    }

    /**
     * Helper to throw a QueryParsingException consistently.
     *
     * @param string $message The base error message.
     * @param ?string $offendingValue (Optional) The token value near the error.
     * @param bool $pointToEndOfPrevious If true, the error position refers to the end of the *previous* token (useful for "unexpected end of query").
     * @param ?int $overridePosIndex (Optional) Explicitly specify the token index causing the error, otherwise uses current position.
     * @throws QueryParsingException Always throws.
     * @return never PHP 8.1 never return type hint
     */
    private function throwParsingException(
        string $message,
        ?string $offendingValue = null,
        bool $pointToEndOfPrevious = false,
        ?int $overridePosIndex = null
    ): never
    {
        $posIndex = $overridePosIndex ?? $this->position;
        $charPos = 0; // Default character position

        if ($pointToEndOfPrevious) {
            // Calculate position after the token *before* posIndex
            $targetIndex = max(0, $posIndex - 1);
            if ($targetIndex < count($this->tokens)) {
                $token = $this->tokens[$targetIndex];
                $charPos = $token['pos'] + strlen($token['value']);
            } elseif (!empty($this->processedQuery)) {
                 // If pointing after previous but we're at index 0, point to end of query
                 $charPos = strlen($this->processedQuery);
            } // else charPos remains 0
        } elseif ($posIndex < count($this->tokens)) {
            // Point to the start of the token at posIndex
            $charPos = $this->tokens[$posIndex]['pos'];
            // If offending value wasn't provided, try to get it from the token
             if ($offendingValue === null) {
                 $offendingValue = $this->tokens[$posIndex]['value'];
             }
        } elseif (!empty($this->tokens)) {
            // If posIndex is beyond the last token, point after the last token
            $lastToken = $this->tokens[count($this->tokens) - 1];
            $charPos = $lastToken['pos'] + strlen($lastToken['value']);
        } elseif (!empty($this->processedQuery)) {
             // If no tokens exist but query isn't empty, point to the end of the query
             $charPos = strlen($this->processedQuery);
        }
         // else: empty query and no tokens, charPos remains 0

        throw new QueryParsingException(
            $message,
            $this->originalQuery,
            $charPos,
            $offendingValue // Pass the determined or provided offending value
        );
    }


    /**
     * Static convenience method to translate an SQL WHERE clause directly.
     * Creates an instance of the parser and calls `toMongo()`.
     *
     * @param string $sql The SQL WHERE clause string.
     * @param array $options Optional configuration (see constructor), e.g., ['likeCaseInsensitive' => true].
     * @return array<string, mixed> The MongoDB query filter array.
     * @throws QueryParsingException If parsing fails.
     */
    public static function translate(string $sql, array $options = []): array
    {
        $parser = new self($sql, $options);
        return $parser->toMongo();
    }
}
