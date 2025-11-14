<?php

class DeepArrayIterator {

    private array $array;
    private bool $stopIteration = false;
    public const DELETE_KEY = '__DELETE_KEY__';

    public function __construct(array &$array) {
        $this->array = &$array;
    }

    public function iterate(callable $callback, bool $skipEmpty = false): void {
        $this->stopIteration = false;
        $this->deepIterate($this->array, [], $callback, $skipEmpty);
    }

    private function deepIterate(array &$array, array $currentPath, callable $callback, bool $skipEmpty): void {
        if ($this->stopIteration) {
            return;
        }

        $keysToDelete = [];

        foreach ($array as $key => &$value) {
            $newPath = $currentPath;
            $newPath[] = $key;

            if (is_array($value)) {
                $this->deepIterate($value, $newPath, $callback, $skipEmpty);

                if ($skipEmpty && empty($value)) {
                    $keysToDelete[] = $key;
                    continue;
                }
            }

            $result = $callback($value, $key, $newPath, $array);

            if ($result === self::DELETE_KEY) {
                $keysToDelete[] = $key;
            } elseif ($result === false) {
                $this->stopIteration = true;
                return;
            }
        }

        foreach ($keysToDelete as $key) {
            unset($array[$key]);
        }
    }

    public static function deleteKeys(
        array &$array,
        string|array $keys,
        string|array $except = [],
        bool $skipEmpty = true
    ): array {
        $keys = (array)$keys;
        $except = (array)$except;

        $iterator = new self($array);
        $iterator->iterate(function($value, $key) use ($keys, $except) {
            if (in_array($key, $except, true)) {
                return true;
            }
            return in_array($key, $keys, true) ? self::DELETE_KEY : true;
        }, $skipEmpty);

        return $array;
    }

    public static function deleteKeysByPattern(
        array &$array,
        string|array $patterns,
        string|array $exceptPatterns = [],
        bool $skipEmpty = true
    ): array {
        $patterns = (array)$patterns;
        $exceptPatterns = (array)$exceptPatterns;

        $iterator = new self($array);
        $iterator->iterate(function($value, $key) use ($patterns, $exceptPatterns) {
            $stringKey = (string)$key;

            foreach ($exceptPatterns as $exceptPattern) {
                if (preg_match($exceptPattern, $stringKey)) {
                    return true;
                }
            }

            foreach ($patterns as $pattern) {
                if (preg_match($pattern, $stringKey)) {
                    return self::DELETE_KEY;
                }
            }

            return true;
        }, $skipEmpty);

        return $array;
    }

    public static function extractByPaths(array &$array, array $paths, bool $keepStructure = false): array {
        $iterator = new self($array);
        $result = [];

        $iterator->iterate(function($value, $key, $path) use ($paths, $keepStructure, &$result) {
            $currentPath = implode('.', $path);
            if (in_array($currentPath, $paths, true)) {
                if ($keepStructure) {
                    self::setNestedValue($result, $path, $value);
                } else {
                    $result[$currentPath] = $value;
                }
            }
            return true;
        });

        return $result;
    }

    public static function extractByKeys(array &$array, string|array $keys, bool $keepStructure = false): array {
        $iterator = new self($array);
        $keys = (array)$keys;
        $result = [];

        $iterator->iterate(function($value, $key, $path) use ($keys, $keepStructure, &$result) {
            if (in_array($key, $keys, true)) {
                if ($keepStructure) {
                    self::setNestedValue($result, $path, $value);
                } else {
                    $result[implode('.', $path)] = $value;
                }
            }
            return true;
        });

        return $result;
    }

    public static function extractByPatterns(array &$array, string|array $patterns, bool $keepStructure = false): array {
        $iterator = new self($array);
        $patterns = (array)$patterns;
        $result = [];

        $iterator->iterate(function($value, $key, $path) use ($patterns, $keepStructure, &$result) {
            $stringKey = (string)$key;
            foreach ($patterns as $pattern) {
                if (preg_match($pattern, $stringKey)) {
                    if ($keepStructure) {
                        self::setNestedValue($result, $path, $value);
                    } else {
                        $result[implode('.', $path)] = $value;
                    }
                    break;
                }
            }
            return true;
        });

        return $result;
    }

    public static function extractByCondition(array &$array, callable $condition, bool $keepStructure = false): array {
        $iterator = new self($array);
        $result = [];

        $iterator->iterate(function($value, $key, $path) use ($condition, $keepStructure, &$result) {
            if ($condition($value, $key, $path)) {
                if ($keepStructure) {
                    self::setNestedValue($result, $path, $value);
                } else {
                    $result[implode('.', $path)] = $value;
                }
            }
            return true;
        });

        return $result;
    }

    private static function setNestedValue(array &$array, array $path, mixed $value): void {
        $current = &$array;
        foreach ($path as $key) {
            if (!isset($current[$key])) {
                $current[$key] = [];
            }
            $current = &$current[$key];
        }
        $current = $value;
    }
}
