<?php

namespace MongoLite;

class UtilArrayQuery {

    protected static array $closures = [];

    /**
     * Create a filter function from criteria array
     */
    public static function getFilterFunction(array $criteria): callable {

        return empty($criteria) ?
                fn() => true :
                fn($document) => self::evaluateCondition($document, $criteria);
    }

    /**
     * Main method to evaluate if a document matches the given criteria
     */
    public static function evaluateCondition($document, array $criteria): bool {

        // Handle empty criteria
        if (empty($criteria)) {
            return true;
        }

        // Process all conditions with AND logic by default
        foreach ($criteria as $key => $value) {

            // Handle special top-level operators
            if ($key[0] === '$') {

                // List of valid top-level operators
                $topLevelOperators = ['$and', '$or', '$where', '$nor', '$expr'];

                if (in_array($key, $topLevelOperators)) {

                    switch ($key) {
                        case '$and':
                            if (!is_array($value)) {
                                return false;
                            }
                            foreach ($value as $subCriteria) {
                                if (!self::evaluateCondition($document, $subCriteria)) {
                                    return false;
                                }
                            }
                            break;

                        case '$or':
                            if (!is_array($value)) {
                                return false;
                            }
                            $orResult = false;
                            foreach ($value as $subCriteria) {
                                if (self::evaluateCondition($document, $subCriteria)) {
                                    $orResult = true;
                                    break;
                                }
                            }
                            if (!$orResult) {
                                return false;
                            }
                            break;

                        case '$where':
                            if (is_string($value) || !is_callable($value)) {
                                throw new \InvalidArgumentException($key . ' Function should be callable');
                            }

                            // Register the closure and get a unique ID
                            $uid = self::registerClosure($value);

                            // Call it the same way as the original implementation
                            if (!self::closureCall($uid, $document)) {
                                return false;
                            }
                            break;

                        case '$nor':
                            if (!is_array($value)) {
                                return false;
                            }
                            foreach ($value as $subCriteria) {
                                if (self::evaluateCondition($document, $subCriteria)) {
                                    return false; // If any criteria matches, $nor fails
                                }
                            }
                            break;
                        case '$expr':
                            if (!is_array($value)) {
                                return false;
                            }
                            if (!self::evaluateExpression($value, $document)) {
                                return false;
                            }
                            break;
                    }

                } else {

                    // Handle field with operator name (e.g., "$exists") as a regular field
                    $fieldValue = self::getNestedValue($document, $key);

                    // Handle as regular field check
                    if (is_array($value) && !empty($value) && isset(array_keys($value)[0]) && array_keys($value)[0][0] === '$') {
                        if (!self::check($fieldValue, $value)) {
                            return false;
                        }
                    } else if (is_null($value)) {
                        if (self::getNestedValueExists($document, $key)) {
                            return false;
                        }
                    } else {
                        if (!self::getNestedValueExists($document, $key) || $fieldValue != $value) {
                            return false;
                        }
                    }
                }
            } else {

                // Handle field conditions
                $fieldValue = self::getNestedValue($document, $key);

                // Check if the value is a condition array or a direct value
                if (is_array($value) && !empty($value) && isset(array_keys($value)[0]) && array_keys($value)[0][0] === '$') {
                    // This is a condition array with operators like {age: {$gt: 25}}
                    if (!self::check($fieldValue, $value)) {
                        return false;
                    }
                } else {
                    // Direct value comparison
                    if (is_null($value)) {
                        // Check for null / non-existence
                        if (self::getNestedValueExists($document, $key)) {
                            return false;
                        }
                    } else {
                        // Regular equality check
                        if (!self::getNestedValueExists($document, $key)) {
                            return false;
                        }

                        // Handle exactly as in the original implementation
                        if (is_array($fieldValue) && is_string($value)) {
                            // If field is array and value is string, check if array contains the string
                            if (!in_array($value, $fieldValue)) {
                                return false;
                            }
                        } else if (is_array($value) && is_string($fieldValue)) {
                            // If value is array and field is string, check if value contains the field
                            if (!in_array($fieldValue, $value)) {
                                return false;
                            }
                        } else if ($fieldValue != $value) {
                            // Simple equality check for other cases
                            return false;
                        }
                    }
                }
            }
        }

        // If we get here, all conditions passed
        return true;
    }

    /**
     * Safely retrieve a nested value from an array using dot notation
     */
    public static function getNestedValue(array $array, string $key) {

        // Security check for illegal characters (from original implementation)
        if (str_contains($key, '(') || str_contains($key, '"') || str_contains($key, "'")) {
            throw new \InvalidArgumentException('Unallowed characters used in filter keys');
        }

        if (!str_contains($key, '.')) {
            return $array[$key] ?? null;
        }

        $keys = explode('.', $key);
        $value = $array;

        foreach ($keys as $k) {
            if (!isset($value[$k])) {
                return null;
            }
            $value = $value[$k];
        }

        return $value;
    }

    /**
     * Check if a nested key exists in the document
     */
    private static function getNestedValueExists(array $array, string $key): bool {

        if (!str_contains($key, '.')) {
            return isset($array[$key]);
        }

        $keys = explode('.', $key);
        $value = $array;

        foreach ($keys as $k) {
            if (!isset($value[$k])) {
                return false;
            }
            $value = $value[$k];
        }

        return true;
    }

    /**
     * Store and execute closures (for $where operator)
     */
    public static function closureCall(string $uid, mixed $doc): mixed {

        // Make sure the closure exists
        if (!isset(self::$closures[$uid])) {
            throw new \RuntimeException("Closure with ID {$uid} not found");
        }

        $return = self::$closures[$uid]($doc);

        unset(self::$closures[$uid]);

        return $return;
    }

    /**
     * Register a closure for the $where operator
     */
    public static function registerClosure(callable $closure): string {
        $uid = uniqid('mongoliteCallable') . bin2hex(random_bytes(5));
        self::$closures[$uid] = $closure;
        return $uid;
    }

    /**
     * Check if a value matches the given condition
     */
    public static function check(mixed $value, array $condition): bool {

        foreach ($condition as $key => $conditionValue) {
            if ($key == '$options') continue;
            if (!self::evaluate($key, $value, $conditionValue)) {
                return false;
            }
        }
        return true;
    }

    /**
     * Evaluates a condition based on specified operators and values.
     *
     * @param string $func The operator to evaluate (e.g., $eq, $ne, $gte, $in, etc.).
     * @param mixed $a The first value to compare or evaluate.
     * @param mixed $b The second value to compare or evaluate. The expected format of $b may depend on the operator used.
     * @return mixed The result of the evaluation, typically a boolean indicating whether the condition is satisfied. For some cases, it may return other types based on operator logic.
     * @throws \InvalidArgumentException If invalid arguments are provided for certain operators.
     * @throws \ErrorException If the specified operator is not valid.
     */
    private static function evaluate(string $func, mixed $a, mixed $b): mixed {
        $r = false;

        if (\is_null($a) && $func != '$exists') {
            return false;
        }

        switch ($func) {
            case '$type':
                $r = checkType($a, $b);
                break;

            case '$not':
                if (is_string($b)) {
                    if (is_string($a)) {
                        $r = !preg_match(isset($b[0]) && $b[0] == '/' ? $b : '/' . $b . '/iu', $a);
                    }
                } elseif (is_array($b)) {
                    $r = !self::check($a, $b);
                }
                break;

            case '$eq':
                $r = $a == $b;
                break;

            case '$ne':
                $r = $a != $b;
                break;

            case '$gte':
                if ((is_numeric($a) && is_numeric($b)) || (is_string($a) && is_string($b))) {
                    $r = $a >= $b;
                } else if (is_numeric($a) && is_string($b) && is_numeric($b)) {
                    $r = $a >= (float)$b;
                } else if (is_string($a) && is_numeric($b) && is_numeric($a)) {
                    $r = (float)$a >= $b;
                } else {
                    // Last resort - compare string representations
                    $r = (string)$a >= (string)$b;
                }
                break;

            case '$gt':
                if ((is_numeric($a) && is_numeric($b)) || (is_string($a) && is_string($b))) {
                    $r = $a > $b;
                } else if (is_numeric($a) && is_string($b) && is_numeric($b)) {
                    $r = $a > (float)$b;
                } else if (is_string($a) && is_numeric($b) && is_numeric($a)) {
                    $r = (float)$a > $b;
                } else {
                    // Last resort - compare string representations
                    $r = (string)$a > (string)$b;
                }
                break;

            case '$lte':
                if ((is_numeric($a) && is_numeric($b)) || (is_string($a) && is_string($b))) {
                    $r = $a <= $b;
                } else if (is_numeric($a) && is_string($b) && is_numeric($b)) {
                    $r = $a <= (float)$b;
                } else if (is_string($a) && is_numeric($b) && is_numeric($a)) {
                    $r = (float)$a <= $b;
                } else {
                    // Last resort - compare string representations
                    $r = (string)$a <= (string)$b;
                }
                break;

            case '$lt':
                if ((is_numeric($a) && is_numeric($b)) || (is_string($a) && is_string($b))) {
                    $r = $a < $b;
                } else if (is_numeric($a) && is_string($b) && is_numeric($b)) {
                    $r = $a < (float)$b;
                } else if (is_string($a) && is_numeric($b) && is_numeric($a)) {
                    $r = (float)$a < $b;
                } else {
                    // Last resort - compare string representations
                    $r = (string)$a < (string)$b;
                }
                break;

            case '$in':
                if (is_array($a)) {
                    $r = is_array($b) && count(array_intersect($a, $b)) > 0;
                } else {
                    $r = is_array($b) && in_array($a, $b);
                }
                break;

            case '$nin':
                if (is_array($a)) {
                    $r = is_array($b) && count(array_intersect($a, $b)) === 0;
                } else {
                    $r = is_array($b) && in_array($a, $b) === false;
                }
                break;

            case '$has':
                if (is_array($b))
                    throw new \InvalidArgumentException('Invalid argument for $has array not supported');
                if (!is_array($a)) $a = @\json_decode($a, true) ?: [];
                $r = in_array($b, $a);
                break;

            case '$all':
                if (!is_array($a)) $a = @\json_decode($a, true) ?: [];
                if (!is_array($b)) {
                    throw new \InvalidArgumentException('Invalid argument for $all option must be array');
                }
                $r = count(array_intersect($b, $a)) == count($b);
                break;

            case '$regex':
                if (is_string($b)) {
                    $b = isset($b[0]) && $b[0] == '/' ? $b : '/' . $b . '/iu';
                    if (is_string($a)) {
                        $r = (boolean)preg_match($b, $a);
                    } elseif (is_countable($a)) {
                        $r = (boolean)preg_match($b, implode(' ', $a));
                    }
                }
                break;

            case '$exists':
                $r = $b ? !is_null($a) : is_null($a);
                break;

            case '$size':
                if (!is_array($a)) $a = @json_decode($a, true) ?: [];
                $r = (int)$b == count($a);
                break;

            case '$mod':
                if (!is_array($b))
                    throw new \InvalidArgumentException('Invalid argument for $mod option must be array');
                $r = $a % $b[0] == ($b[1] ?? 0);
                break;

            case '$near':
                if (!isset($a['coordinates'], $b['$geometry']['coordinates'])) {
                    return false;
                }

                // [lng, lat]
                if (!is_array($a['coordinates']) || !is_array($b['$geometry']['coordinates'])) {
                    return false;
                }

                $distance = calculateDistanceInMeters($a['coordinates'], $b['$geometry']['coordinates']);

                if (isset($b['$maxDistance']) && is_numeric($b['$maxDistance']) && $distance > $b['$maxDistance']) {
                    return false;
                }

                if (isset($b['$minDistance']) && is_numeric($b['$minDistance']) && $distance < $b['$minDistance']) {
                    return false;
                }

                $r = true;
                break;

            case '$text':
                $distance = 3;
                $minScore = 0.7;
                if (is_array($b) && isset($b['$search'])) {
                    if (isset($b['$minScore']) && is_numeric($b['$minScore'])) $minScore = $b['$minScore'];
                    if (isset($b['$distance']) && is_numeric($b['$distance'])) $distance = $b['$distance'];
                    $b = $b['$search'];
                }
                $r = fuzzy_search($b, $a, $distance) >= $minScore;
                break;

            default:
                throw new \ErrorException("Condition not valid ... Use {$func} for custom operations");
                break;
        }

        return $r;
    }

    private static function evaluateExpression(array $expr, array $doc): mixed {
        // Handle basic expressions
        if (isset($expr['$eq'])) {
            return self::evaluateExpressionOperands($expr['$eq'][0], $doc) ===
                   self::evaluateExpressionOperands($expr['$eq'][1], $doc);
        }
        if (isset($expr['$gt'])) {
            return self::evaluateExpressionOperands($expr['$gt'][0], $doc) >
                   self::evaluateExpressionOperands($expr['$gt'][1], $doc);
        }
        if (isset($expr['$gte'])) {
            return self::evaluateExpressionOperands($expr['$gte'][0], $doc) >=
                   self::evaluateExpressionOperands($expr['$gte'][1], $doc);
        }
        if (isset($expr['$lt'])) {
            return self::evaluateExpressionOperands($expr['$lt'][0], $doc) <
                   self::evaluateExpressionOperands($expr['$lt'][1], $doc);
        }
        if (isset($expr['$lte'])) {
            return self::evaluateExpressionOperands($expr['$lte'][0], $doc) <=
                   self::evaluateExpressionOperands($expr['$lte'][1], $doc);
        }
        if (isset($expr['$ne'])) {
            return self::evaluateExpressionOperands($expr['$ne'][0], $doc) !=
                   self::evaluateExpressionOperands($expr['$ne'][1], $doc);
        }

        // Handle logical operators
        if (isset($expr['$and'])) {
            foreach ($expr['$and'] as $subExpr) {
                if (!self::evaluateExpression($subExpr, $doc)) {
                    return false;
                }
            }
            return true;
        }
        if (isset($expr['$or'])) {
            foreach ($expr['$or'] as $subExpr) {
                if (self::evaluateExpression($subExpr, $doc)) {
                    return true;
                }
            }
            return false;
        }
        if (isset($expr['$not'])) {
            return !self::evaluateExpression($expr['$not'], $doc);
        }

        // Handle arithmetic operators
        if (isset($expr['$add'])) {
            $result = 0;
            foreach ($expr['$add'] as $operand) {
                $result += self::evaluateExpressionOperands($operand, $doc);
            }
            return $result;
        }
        if (isset($expr['$subtract'])) {
            $operands = $expr['$subtract'];
            if (count($operands) != 2) {
                throw new \InvalidArgumentException('$subtract requires exactly 2 operands');
            }
            return self::evaluateExpressionOperands($operands[0], $doc) -
                   self::evaluateExpressionOperands($operands[1], $doc);
        }
        if (isset($expr['$multiply'])) {
            $result = 1;
            foreach ($expr['$multiply'] as $operand) {
                $result *= self::evaluateExpressionOperands($operand, $doc);
            }
            return $result;
        }
        if (isset($expr['$divide'])) {
            $operands = $expr['$divide'];
            if (count($operands) != 2) {
                throw new \InvalidArgumentException('$divide requires exactly 2 operands');
            }
            $divisor = self::evaluateExpressionOperands($operands[1], $doc);
            if ($divisor == 0) {
                return null; // Avoid division by zero
            }
            return self::evaluateExpressionOperands($operands[0], $doc) / $divisor;
        }

        // Handle conditional operators
        if (isset($expr['$cond'])) {
            $cond = $expr['$cond'];
            if (is_array($cond) && !isset($cond[0])) {
                // Object syntax { if: <boolean-expression>, then: <true-case>, else: <false-case> }
                $condition = self::evaluateExpression($cond['if'], $doc);
                return $condition ?
                       self::evaluateExpressionOperands($cond['then'], $doc) :
                       self::evaluateExpressionOperands($cond['else'], $doc);
            } else {
                // Array syntax [ <boolean-expression>, <true-case>, <false-case> ]
                $condition = self::evaluateExpression($cond[0], $doc);
                return $condition ?
                       self::evaluateExpressionOperands($cond[1], $doc) :
                       self::evaluateExpressionOperands($cond[2], $doc);
            }
        }

        // If we got here, it's either a simple value or unrecognized operator
        if (count($expr) == 1 && isset($expr[0])) {
            return self::evaluateExpressionOperands($expr[0], $doc);
        }

        throw new \InvalidArgumentException('Unrecognized expression operator: ' . json_encode($expr));
    }

    /**
     * Evaluate an operand in an expression
     *
     * @param mixed $operand The operand to evaluate
     * @param array $doc The document to evaluate against
     * @return mixed The evaluated operand
     */
    public static function evaluateExpressionOperands($operand, array $doc): mixed {
        // If operand is a field path (starts with $)
        if (is_string($operand) && strlen($operand) > 1 && $operand[0] === '$') {
            $fieldPath = substr($operand, 1); // Remove leading $
            return self::getNestedValue($doc, $fieldPath);
        }

        // If operand is a sub-expression
        if (is_array($operand) && count($operand) > 0 &&
            isset(array_keys($operand)[0]) && array_keys($operand)[0][0] === '$') {
            return self::evaluateExpression($operand, $doc);
        }

        // Otherwise, return the literal value
        return $operand;
    }
}

// Helper Functions
function levenshtein_utf8(string $s1, string $s2): int {

    $map = [];
    $utf8_to_extended_ascii = function ($str) use ($map) {

        // find all multibyte characters (cf. utf-8 encoding specs)
        $matches = [];

        if (!preg_match_all('/[\xC0-\xF7][\x80-\xBF]+/', $str, $matches)) return $str; // plain ascii string

        // update the encoding map with the characters not already met
        foreach ($matches[0] as $mbc) {
            if (!isset($map[$mbc])) $map[$mbc] = chr(128 + count($map));
        }

        // finally remap non-ascii characters
        return strtr($str, $map);
    };

    return levenshtein($utf8_to_extended_ascii($s1), $utf8_to_extended_ascii($s2));
}

function fuzzy_search(string $search, string $text, $distance = 3): float {

    $needles = explode(' ', mb_strtolower($search, 'UTF-8'));
    $tokens = explode(' ', mb_strtolower($text, 'UTF-8'));
    $score = 0;

    foreach ($needles as $needle) {

        foreach ($tokens as $token) {

            if (\str_contains($token, $needle)) {
                $score += 1;
            } else {

                $d = levenshtein_utf8($needle, $token);

                if ($d <= $distance) {
                    $l = mb_strlen($token, 'UTF-8');
                    $matches = $l - $d;
                    $score += ($matches / $l);
                }
            }
        }

    }

    return $score / count($needles);
}

function calculateDistanceInMeters($fromPoint, $toPoint) {
    // Earth's radius in meters
    $earthRadius = 6371000;

    // Convert latitude and longitude to radians
    $lng1 = deg2rad($fromPoint[0]);
    $lat1 = deg2rad($fromPoint[1]);
    $lng2 = deg2rad($toPoint[0]);
    $lat2 = deg2rad($toPoint[1]);

    // Calculate differences
    $latDiff = $lat2 - $lat1;
    $lngDiff = $lng2 - $lng1;

    // Haversine formula
    $a = sin($latDiff / 2) * sin($latDiff / 2) +
        cos($lat1) * cos($lat2) *
        sin($lngDiff / 2) * sin($lngDiff / 2);
    $c = 2 * atan2(sqrt($a), sqrt(1 - $a));

    // distance
    return $earthRadius * $c;
}

function isArrayAssociative(array $array): bool {
    if (empty($array)) return false;
    return array_keys($array) !== range(0, count($array) - 1);
}

function checkType($value, $type): bool {
    // Type can be a string name, number, or array of types
    if (is_array($type)) {
        // Check if value matches any of the types
        foreach ($type as $t) {
            if (checkType($value, $t)) {
                return true;
            }
        }
        return false;
    }

    // Map of BSON types to PHP checks
    $typeMap = [
        // Numeric type codes
        1 => fn($v) => is_float($v), // Double
        2 => fn($v) => is_string($v), // String
        3 => fn($v) => is_array($v) && !isArrayAssociative($v), // Object/Document
        4 => fn($v) => is_array($v) && !isArrayAssociative($v), // Array
        8 => fn($v) => is_bool($v), // Boolean
        9 => fn($v) => is_string($v) && strtotime($v) !== false, // Date
        10 => fn($v) => is_null($v), // Null
        16 => fn($v) => is_int($v), // Int
        18 => fn($v) => is_int($v)&& $v >= PHP_INT_MIN && $v <= PHP_INT_MAX, // Long

        // String aliases
        'double' => fn($v) => is_float($v),
        'string' => fn($v) => is_string($v),
        'object' => fn($v) => is_array($v)&& isArrayAssociative($v),
        'array' => fn($v) => is_array($v)&& !isArrayAssociative($v),
        'bool' => fn($v) => is_bool($v),
        'boolean' => fn($v) => is_bool($v),
        'date' => fn($v) => is_string($v)&& strtotime($v) !== false,
        'null' => fn($v) => is_null($v),
        'int' => fn($v) => is_int($v),
        'long' => fn($v) => is_int($v),
        'number' => fn($v) => is_numeric($v),
    ];

    // If type exists in the map, use that check
    if (isset($typeMap[$type])) {
        return $typeMap[$type]($value);
    }

    return false;
}
