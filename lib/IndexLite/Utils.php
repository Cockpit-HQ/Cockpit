<?php

namespace IndexLite;

class Utils {

    /**
     * Generates a version 4 UUID (Universally Unique Identifier).
     *
     * @return string The generated UUID.
     */
    public static function uuidv4(): string {

        if (function_exists('random_bytes')) {
            $uuid = bin2hex(random_bytes(16));
        } elseif (function_exists('openssl_random_pseudo_bytes')) {
            $uuid = bin2hex(openssl_random_pseudo_bytes(16));
        } else {
            $uuid = md5(uniqid('', true));
        }

        $uuid[12] = '4';
        $uuid[16] = dechex(hexdec($uuid[16]) & 3 | 8);

        return substr($uuid, 0, 8) . '-' . substr($uuid, 8, 4) . '-' . substr($uuid, 12, 4) . '-' . substr($uuid, 16, 4) . '-' . substr($uuid, 20);
    }

    /**
     * Converts a mixed input into a string representation.
     * Handles various types such as null, strings, numbers, booleans, arrays, and objects.
     * For arrays and objects, it recursively processes their elements and joins them into a single string.
     *
     * @param mixed $input The input value to be converted to a string. Can be of any type.
     * @return string A string representation of the input. Returns an empty string for null or unsupported types.
     */
    public static function stringifyValue(mixed $input): string {

        // Early return for simple types
        if (is_null($input)) {
            return '';
        }

        if (is_string($input)) {
            return $input;
        }

        if (is_numeric($input) || is_bool($input)) {
            return (string)$input;
        }

        if (!is_array($input) && !is_object($input)) {
            return '';
        }

        // Process arrays and objects
        $parts = [];

        // Convert to array if object
        $array = is_object($input) ? get_object_vars($input) : $input;

        // Process each element
        foreach ($array as $key => $value) {
            // Handle key-value pairs more intelligently for search
            if (is_string($key) && !is_numeric($key)) {
                // Include keys as they might be relevant for search when named meaningfully
                //$parts[] = $key;
            }

            if (is_string($value)) {
                $parts[] = $value;
            } elseif (is_numeric($value)) {
                $parts[] = (string)$value;
            } elseif (is_array($value) || is_object($value)) {
                $parts[] = self::stringifyValue($value);
            }
        }

        // Join with spaces and normalize whitespace
        $result = implode(' ', $parts);
        return preg_replace('/\s+/', ' ', trim($result));
    }

    /**
     * Processes an HTML content string by decoding entities, removing tags, and normalizing whitespace.
     *
     * @param string|null $value The HTML content string to process, or null.
     * @return string|null The processed plain text string, or null if the input is invalid or null.
     */
    public static function processHtmlContent(?string $value): ?string {

        if (is_null($value) || !is_string($value)) {
            return null;
        }

        // Check if the content likely contains HTML
        if (preg_match('/<[^>]+>/', $value)) {

            // First handle HTML entities
            $value = html_entity_decode($value, ENT_QUOTES | ENT_HTML5, 'UTF-8');

            // Replace common significant whitespace elements with a space
            // This preserves word boundaries while removing HTML structure
            $value = preg_replace('/<(br|p|div|li|tr|h[1-6]|table|ul|ol)(\s+[^>]*)?>/i', ' ', $value);

            // Strip all HTML tags
            $value = strip_tags($value);

            // Normalize all whitespace to single spaces
            $value = preg_replace('/\s+/', ' ', $value);

            // Trim leading/trailing whitespace
            $value = trim($value);
        }

        return $value;
    }
}
