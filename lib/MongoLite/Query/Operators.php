<?php

namespace MongoLite\Query;

/**
 * Query filter operators - used for field-level comparisons in find() queries
 *
 * These operators work differently from expression operators:
 * - Query: {age: {$gt: 25}} - compares field value to a literal
 * - Expression: {$gt: ['$field1', '$field2']} - compares two expressions
 */
class Operators {

    /**
     * Evaluate a query operator
     *
     * @param string $operator The operator name (e.g., '$gt')
     * @param mixed $fieldValue The field value from the document
     * @param mixed $conditionValue The value to compare against
     * @return bool Whether the condition is satisfied
     */
    public static function evaluate(string $operator, mixed $fieldValue, mixed $conditionValue): bool {
        if ($fieldValue === null) {
            // A missing or null field is "not equal" to any value other than null, as in MongoDB
            switch ($operator) {
                case '$exists':
                    break;
                case '$ne':
                    return $conditionValue !== null;
                case '$nin':
                    return \is_array($conditionValue) && !\in_array(null, $conditionValue, true);
                default:
                    return false;
            }
        }

        switch ($operator) {
            case '$type':
                return self::checkType($fieldValue, $conditionValue);

            case '$not':
                if (\is_string($conditionValue)) {
                    if (\is_string($fieldValue)) {
                        $pattern = isset($conditionValue[0]) && $conditionValue[0] === '/'
                            ? $conditionValue
                            : '/' . $conditionValue . '/iu';
                        return !\preg_match($pattern, $fieldValue);
                    }
                } elseif (\is_array($conditionValue)) {
                    return !self::checkConditions($fieldValue, $conditionValue);
                }
                return false;

            case '$eq':
                return $fieldValue == $conditionValue;

            case '$ne':
                return $fieldValue != $conditionValue;

            case '$gte':
                return self::compareValues($fieldValue, $conditionValue) >= 0;

            case '$gt':
                return self::compareValues($fieldValue, $conditionValue) > 0;

            case '$lte':
                return self::compareValues($fieldValue, $conditionValue) <= 0;

            case '$lt':
                return self::compareValues($fieldValue, $conditionValue) < 0;

            case '$in':
                if (\is_array($fieldValue)) {
                    return \is_array($conditionValue) && \count(\array_intersect($fieldValue, $conditionValue)) > 0;
                }
                return \is_array($conditionValue) && \in_array($fieldValue, $conditionValue);

            case '$nin':
                if (\is_array($fieldValue)) {
                    return \is_array($conditionValue) && \count(\array_intersect($fieldValue, $conditionValue)) === 0;
                }
                return \is_array($conditionValue) && !\in_array($fieldValue, $conditionValue);

            case '$has':
                if (\is_array($conditionValue)) {
                    throw new \InvalidArgumentException('Invalid argument for $has: array not supported');
                }
                return \is_array($fieldValue) && \in_array($conditionValue, $fieldValue);

            case '$all':
                if (!\is_array($fieldValue) || !\is_array($conditionValue)) {
                    return false;
                }
                return \count(\array_intersect($conditionValue, $fieldValue)) === \count($conditionValue);

            case '$size':
                return \is_array($fieldValue) && \count($fieldValue) === $conditionValue;

            case '$mod':
                return isset($conditionValue[0], $conditionValue[1]) &&
                       $fieldValue % $conditionValue[0] === $conditionValue[1];

            case '$exists':
                return true; // Existence is checked before calling this method

            case '$regex':
            case '$preg':
            case '$match':
                if (\is_string($conditionValue)) {
                    $pattern = isset($conditionValue[0]) && $conditionValue[0] === '/'
                        ? $conditionValue
                        : '/' . $conditionValue . '/iu';
                }
                return \is_string($fieldValue) && (bool)\preg_match($pattern, $fieldValue);

            case '$text':
                $search = $conditionValue['$search'] ?? $conditionValue;
                $language = $conditionValue['$language'] ?? 'none';
                $caseSensitive = $conditionValue['$caseSensitive'] ?? false;
                $diacriticSensitive = $conditionValue['$diacriticSensitive'] ?? false;

                if (!\is_string($search) || !\is_string($fieldValue)) {
                    return false;
                }

                $fieldToMatch = $fieldValue;
                $searchToMatch = $search;

                if (!$caseSensitive) {
                    $fieldToMatch = \mb_strtolower($fieldToMatch, 'UTF-8');
                    $searchToMatch = \mb_strtolower($searchToMatch, 'UTF-8');
                }

                if (!$diacriticSensitive) {
                    $fieldToMatch = self::removeDiacritics($fieldToMatch);
                    $searchToMatch = self::removeDiacritics($searchToMatch);
                }

                $words = \preg_split('/\s+/', $searchToMatch, -1, PREG_SPLIT_NO_EMPTY);
                foreach ($words as $word) {
                    if (\str_contains($fieldToMatch, $word)) {
                        return true;
                    }
                }
                return false;

            case '$elemMatch':
                if (!\is_array($fieldValue)) {
                    return false;
                }
                foreach ($fieldValue as $element) {
                    // $elemMatch conditions are document-level criteria with field names,
                    // not operator conditions, so use UtilArrayQuery::evaluateCondition
                    if (\is_array($element) && \MongoLite\UtilArrayQuery::evaluateCondition($element, $conditionValue)) {
                        return true;
                    }
                }
                return false;

            case '$fuzzy':
                $search = $conditionValue['$search'] ?? $conditionValue;
                $minScore = $conditionValue['$minScore'] ?? 2;
                if (!\is_string($search) || !\is_string($fieldValue)) {
                    return false;
                }
                return levenshtein_utf8($search, $fieldValue) <= $minScore;

            case '$func':
            case '$fn':
            case '$f':
                $conditionValue = \MongoLite\ClosureGuard::requireAnonymous(
                    $conditionValue,
                    'Invalid argument for ' . $operator . ': anonymous closure expected'
                );
                return (bool)$conditionValue($fieldValue);

            // Geo operators - simplified implementations
            case '$geoWithin':
                return self::geoWithin($fieldValue, $conditionValue);

            case '$geoIntersects':
                return self::geoIntersects($fieldValue, $conditionValue);

            case '$near':
                return self::near($fieldValue, $conditionValue);

            default:
                throw new \InvalidArgumentException("Unknown query operator: {$operator}");
        }
    }

    /**
     * Check multiple conditions against a value
     */
    public static function checkConditions(mixed $value, array $conditions): bool {
        foreach ($conditions as $operator => $conditionValue) {
            if ($operator === '$options') {
                continue;
            }
            if (!self::evaluate($operator, $value, $conditionValue)) {
                return false;
            }
        }
        return true;
    }

    /**
     * Compare two values with type coercion
     */
    private static function compareValues(mixed $a, mixed $b): int {
        if ((\is_numeric($a) && \is_numeric($b)) || (\is_string($a) && \is_string($b))) {
            return $a <=> $b;
        }
        if (\is_numeric($a) && \is_string($b) && \is_numeric($b)) {
            return $a <=> (float)$b;
        }
        if (\is_string($a) && \is_numeric($b) && \is_numeric($a)) {
            return (float)$a <=> $b;
        }
        return (string)$a <=> (string)$b;
    }

    /**
     * Check if a value matches a type
     */
    private static function checkType(mixed $value, $type): bool {
        $typeMap = [
            'double' => 'double', 'float' => 'double',
            'string' => 'string', 'object' => 'object',
            'array' => 'array', 'bool' => 'boolean',
            'null' => 'NULL', 'int' => 'integer',
            'integer' => 'integer', 'long' => 'integer'
        ];

        $expectedType = $typeMap[$type] ?? $type;
        $actualType = \gettype($value);

        if ($expectedType === 'number') {
            return $actualType === 'integer' || $actualType === 'double';
        }

        return $actualType === $expectedType;
    }

    /**
     * Remove diacritics from a string
     */
    private static function removeDiacritics(string $str): string {
        $transliterator = \Transliterator::create('NFD; [:Nonspacing Mark:] Remove; NFC');
        return $transliterator ? $transliterator->transliterate($str) : $str;
    }

    /**
     * Check if a point is within a geometry
     */
    private static function geoWithin($fieldValue, $conditionValue): bool {
        if (!\is_array($fieldValue)) {
            return false;
        }

        $coords = $fieldValue['coordinates'] ?? $fieldValue;
        if (!\is_array($coords) || \count($coords) < 2) {
            return false;
        }

        if (isset($conditionValue['$box'])) {
            $box = $conditionValue['$box'];
            return $coords[0] >= $box[0][0] && $coords[0] <= $box[1][0] &&
                   $coords[1] >= $box[0][1] && $coords[1] <= $box[1][1];
        }

        if (isset($conditionValue['$polygon'])) {
            return self::pointInPolygon($coords, $conditionValue['$polygon']);
        }

        if (isset($conditionValue['$center'])) {
            $center = $conditionValue['$center'][0];
            $radius = $conditionValue['$center'][1];
            $dx = $coords[0] - $center[0];
            $dy = $coords[1] - $center[1];
            return \sqrt($dx * $dx + $dy * $dy) <= $radius;
        }

        if (isset($conditionValue['$centerSphere'])) {
            $center = $conditionValue['$centerSphere'][0];
            $radiusRadians = $conditionValue['$centerSphere'][1];
            $radiusMeters = $radiusRadians * 6378100;
            $distance = self::haversineDistance($coords, $center);
            return $distance <= $radiusMeters;
        }

        if (isset($conditionValue['$geometry'])) {
            $geometry = $conditionValue['$geometry'];
            if ($geometry['type'] === 'Polygon') {
                return self::pointInPolygon($coords, $geometry['coordinates'][0]);
            }
        }

        return false;
    }

    /**
     * Check if geometries intersect
     */
    private static function geoIntersects($fieldValue, $conditionValue): bool {
        // Simplified: just check if point is within geometry
        return self::geoWithin($fieldValue, $conditionValue);
    }

    /**
     * Check if a point is near another point
     */
    private static function near($fieldValue, $conditionValue): bool {
        if (!\is_array($fieldValue)) {
            return false;
        }

        $coords = $fieldValue['coordinates'] ?? $fieldValue;
        if (!\is_array($coords) || \count($coords) < 2) {
            return false;
        }

        $geometry = $conditionValue['$geometry'] ?? null;
        $maxDistance = $conditionValue['$maxDistance'] ?? null;
        $minDistance = $conditionValue['$minDistance'] ?? 0;

        if (!$geometry || !isset($geometry['coordinates'])) {
            return false;
        }

        $targetCoords = $geometry['coordinates'];
        $distance = self::haversineDistance($coords, $targetCoords);

        if ($maxDistance !== null && $distance > $maxDistance) {
            return false;
        }

        return $distance >= $minDistance;
    }

    /**
     * Check if a point is inside a polygon
     */
    private static function pointInPolygon(array $point, array $polygon): bool {
        $x = $point[0];
        $y = $point[1];
        $inside = false;
        $n = \count($polygon);

        for ($i = 0, $j = $n - 1; $i < $n; $j = $i++) {
            $xi = $polygon[$i][0];
            $yi = $polygon[$i][1];
            $xj = $polygon[$j][0];
            $yj = $polygon[$j][1];

            if ((($yi > $y) !== ($yj > $y)) &&
                ($x < ($xj - $xi) * ($y - $yi) / ($yj - $yi) + $xi)) {
                $inside = !$inside;
            }
        }

        return $inside;
    }

    /**
     * Calculate distance between two points using Haversine formula
     */
    private static function haversineDistance(array $point1, array $point2): float {
        $lat1 = \deg2rad($point1[1]);
        $lon1 = \deg2rad($point1[0]);
        $lat2 = \deg2rad($point2[1]);
        $lon2 = \deg2rad($point2[0]);

        $dlat = $lat2 - $lat1;
        $dlon = $lon2 - $lon1;

        $a = \sin($dlat / 2) ** 2 + \cos($lat1) * \cos($lat2) * \sin($dlon / 2) ** 2;
        $c = 2 * \asin(\sqrt($a));

        return 6378100 * $c; // Earth's radius in meters
    }
}

/**
 * UTF-8 compatible levenshtein function
 */
function levenshtein_utf8(string $s1, string $s2): int {
    $map = [];
    $utf8_to_extended_ascii = function ($str) use (&$map) {
        $matches = [];
        if (!\preg_match_all('/[\xC0-\xF7][\x80-\xBF]+/', $str, $matches)) {
            return $str;
        }
        foreach ($matches[0] as $mbc) {
            if (!isset($map[$mbc])) {
                $map[$mbc] = \chr(128 + \count($map));
            }
        }
        return \strtr($str, $map);
    };

    return \levenshtein($utf8_to_extended_ascii($s1), $utf8_to_extended_ascii($s2));
}
