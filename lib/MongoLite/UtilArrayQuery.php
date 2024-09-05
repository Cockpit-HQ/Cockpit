<?php

namespace MongoLite;

class UtilArrayQuery {

    protected static array $closures = [];

    public static function closureCall(string $uid, mixed $doc): mixed {
        return self::$closures[$uid]($doc);
    }

    public static function buildCondition(mixed $criteria, string $concat = ' && '): string {

        //if (!$criteria) return 'true';

        $fn = [];

        foreach ($criteria as $key => $value) {

            switch ($key) {

                case '$and':

                    $_fn = [];

                    foreach ($value as $v) {
                        $_fn[] = self::buildCondition($v, ' && ');
                    }

                    $fn[] = '('.\implode(' && ', $_fn).')';

                    break;
                case '$or':

                    $_fn = [];

                    foreach ($value as $v) {
                        $_fn[] = self::buildCondition($v, ' && ');
                    }

                    $fn[] = '('.\implode(' || ', $_fn).')';

                    break;

                case '$where':

                    if (\is_string($value) || !\is_callable($value)) {
                        throw new \InvalidArgumentException($key.' Function should be callable');
                    }

                    $uid = \uniqid('mongoliteCallable').bin2hex(random_bytes(5));

                    self::$closures[$uid] = $value;

                    $fn[] = '\\MongoLite\\UtilArrayQuery::closureCall("'.$uid.'", $document)';

                    break;

                default:

                    $d = '$document';

                    if (\str_contains($key, '(') || \str_contains($key, '"') || \str_contains($key, "'")) {
                        throw new \InvalidArgumentException('Unallowed characters used in filter keys');
                    }

                    if (\str_contains($key, '.')) {

                        $keys = \explode('.', $key);

                        foreach ($keys as $k) {
                            $d .= '[\''.$k.'\']';
                        }

                    } else {
                        $d .= '[\''.$key.'\']';
                    }

                    if (\is_array($value)) {
                        $fn[] = "\\MongoLite\\UtilArrayQuery::check((isset({$d}) ? {$d} : null), ".\var_export($value, true).')';
                    } else {

                        if (is_null($value)) {

                            $fn[] = "(!isset({$d}))";

                        } else {

                            $_value = \var_export($value, true);

                            $fn[] = "(isset({$d}) && (
                                is_array({$d}) && is_string({$_value})
                                    ? in_array({$_value}, {$d})
                                    : {$d}=={$_value}
                                )
                            )";
                        }
                    }
            }
        }

        return \count($fn) ? \trim(\implode($concat, $fn)) : 'true';
    }


    public static function check(mixed $value, array $condition): bool {

        foreach ($condition as $key => $conditionValue) {

            if ($key == '$options') continue;

            if (!self::evaluate($key, $value, $conditionValue)) {
                return false;
            }
        }

        return true;
    }

    private static function evaluate(string $func, mixed $a, mixed $b): mixed {

        $r = false;

        if (\is_null($a) && $func != '$exists') {
            return false;
        }

        switch ($func) {

            case '$not':

                if (is_string($b)) {

                    if (is_string($a)) {
                        $r = !\preg_match(isset($b[0]) && $b[0]=='/' ? $b : '/'.$b.'/iu', $a);
                    }

                } elseif (is_array($b)) {
                    $r = !self::check($a, $b);
                }

                break;
            case '$eq' :
                $r = $a == $b;
                break;

            case '$ne' :
                $r = $a != $b;
                break;

            case '$gte' :
                if ( (\is_numeric($a) && \is_numeric($b)) || (\is_string($a) && \is_string($b)) ) {
                    $r = $a >= $b;
                }
                break;

            case '$gt' :
                if ( (\is_numeric($a) && \is_numeric($b)) || (\is_string($a) && \is_string($b)) ) {
                    $r = $a > $b;
                }
                break;

            case '$lte' :
                if ( (\is_numeric($a) && \is_numeric($b)) || (\is_string($a) && \is_string($b)) ) {
                    $r = $a <= $b;
                }
                break;

            case '$lt' :
                if ( (\is_numeric($a) && \is_numeric($b)) || (\is_string($a) && \is_string($b)) ) {
                    $r = $a < $b;
                }
                break;

            case '$in' :
                if (\is_array($a)) {
                    $r = \is_array($b) ? \count(\array_intersect($a, $b)) : false;
                } else {
                    $r = \is_array($b) ? \in_array($a, $b) : false;
                }
                break;

            case '$nin' :
                if (\is_array($a)) {
                    $r = \is_array($b) ? (\count(\array_intersect($a, $b)) === 0) : false;
                } else {
                    $r = \is_array($b) ? (\in_array($a, $b) === false) : false;
                }
                break;

            case '$has' :
                if (\is_array($b))
                    throw new \InvalidArgumentException('Invalid argument for $has array not supported');
                if (!\is_array($a)) $a = @\json_decode($a, true) ?  : [];
                $r = \in_array($b, $a);
                break;

            case '$all' :
                if (!\is_array($a)) $a = @\json_decode($a, true) ?  : [];
                if (!\is_array($b))
                    throw new \InvalidArgumentException('Invalid argument for $all option must be array');
                $r = \count(\array_intersect_key($a, $b)) == \count($b);
                break;

            case '$regex' :
            case '$preg' :
            case '$match' :

                if (is_string($b)) {

                    $b = isset($b[0]) && $b[0]=='/' ? $b : '/'.$b.'/iu';

                    if (is_string($a)) {
                        $r = (boolean) \preg_match($b, $a);
                    } elseif (is_countable($a)) {
                        $r = (boolean) \preg_match($b, implode(' ', $a));
                    }
                }

                break;

            case '$ne':
                $r = $a != $b;
                break;

            case '$size' :
                if (!\is_array($a)) $a = @\json_decode($a, true) ?  : [];
                $r = (int) $b == \count($a);
                break;

            case '$mod' :
                if (! \is_array($b))
                    throw new \InvalidArgumentException('Invalid argument for $mod option must be array');
                $r = $a % $b[0] == $b[1] ?? 0;
                break;

            case '$exists':
                $r = $b ? !\is_null($a) : \is_null($a);
                break;

            case '$near':

                if (!isset($a['coordinates'], $b['$geometry']['coordinates'])) {
                    return false;
                }

                // [lng, lat]
                if (!is_array($a['coordinates']) || !is_array($b['$geometry']['coordinates'])) {
                    return false;
                }

                if (!isset($b['$maxDistance']) || !isset($b['$minDistance'])) {
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

            case '$fuzzy':
            case '$text':

                $distance = 3;
                $minScore = 0.7;

                if (\is_array($b) && isset($b['$search'])) {

                    if (isset($b['$minScore']) && \is_numeric($b['$minScore'])) $minScore = $b['$minScore'];
                    if (isset($b['$distance']) && \is_numeric($b['$distance'])) $distance = $b['$distance'];

                    $b = $b['search'];
                }

                $r = fuzzy_search($b, $a, $distance) >= $minScore;
                break;

            default :
                throw new \ErrorException("Condition not valid ... Use {$func} for custom operations");
                break;
        }

        return $r;
    }
}


// Helper Functions
function levenshtein_utf8(string $s1, string $s2): int {

    $map = [];
    $utf8_to_extended_ascii = function($str) use($map) {

        // find all multibyte characters (cf. utf-8 encoding specs)
        $matches = [];

        if (!\preg_match_all('/[\xC0-\xF7][\x80-\xBF]+/', $str, $matches)) return $str; // plain ascii string

        // update the encoding map with the characters not already met
        foreach ($matches[0] as $mbc) {
            if (!isset($map[$mbc])) $map[$mbc] = \chr(128 + \count($map));
        }

        // finally remap non-ascii characters
        return \strtr($str, $map);
    };

    return levenshtein($utf8_to_extended_ascii($s1), $utf8_to_extended_ascii($s2));
}

function fuzzy_search(string $search, string $text, $distance = 3): float {

    $needles = \explode(' ', \mb_strtolower($search, 'UTF-8'));
    $tokens  = \explode(' ', \mb_strtolower($text, 'UTF-8'));
    $score   = 0;

    foreach ($needles as $needle){

        foreach ($tokens as $token) {

            if (\str_contains($token, $needle)) {
                $score += 1;
            } else {

                $d = levenshtein_utf8($needle, $token);

                if ($d <= $distance) {
                    $l       = \mb_strlen($token, 'UTF-8');
                    $matches = $l - $d;
                    $score  += ($matches / $l);
                }
            }
        }

    }

    return $score / \count($needles);
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
