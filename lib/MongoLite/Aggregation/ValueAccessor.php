<?php

namespace MongoLite\Aggregation;

// Utility for setting/unsetting array values with dot notation
class ValueAccessor {

    /**
     * Get a value from an array using dot notation.
     *
     * @param array $document The array to search within.
     * @param string $fieldPath The dot-separated field path.
     * @param mixed $default Default value if path not found.
     * @return mixed The value found or default.
     */
    public static function get(array $document, string $fieldPath, mixed $default = null): mixed {

        if (!str_contains($fieldPath, '.')) {
            return $document[$fieldPath] ?? $default;
        }

        $keys = explode('.', $fieldPath);
        $value = $document;

        foreach ($keys as $key) {

            if (!is_array($value) || !array_key_exists($key, $value)) {
                return $default;
            }
            $value = $value[$key];
        }

        return $value;
    }

    /**
     * Set a value in an array using dot notation.
     * Creates nested arrays if needed.
     *
     * @param array &$document The array to modify (by reference).
     * @param string $fieldPath The dot-separated field path.
     * @param mixed $value The value to set.
     */
    public static function set(array &$document, string $fieldPath, mixed $value): void {
        $keys = explode('.', $fieldPath);
        $current = &$document;

        foreach ($keys as $i => $key) {
            if ($i === count($keys) - 1) {
                $current[$key] = $value;
            } else {
                if (!isset($current[$key]) || !is_array($current[$key])) {
                    $current[$key] = [];
                }
                $current = &$current[$key];
            }
        }
    }

    /**
     * Unset a value in an array using dot notation.
     *
     * @param array &$document The array to modify (by reference).
     * @param string $fieldPath The dot-separated field path.
     */
    public static function unset(array &$document, string $fieldPath): void {
        $keys = explode('.', $fieldPath);
        $current = &$document;
        $lastKey = array_pop($keys);

        foreach ($keys as $key) {
            if (!isset($current[$key]) || !is_array($current[$key])) {
                return; // Path does not exist
            }
            $current = &$current[$key];
        }

        if (is_array($current)) {
            unset($current[$lastKey]);
        }
    }
}
