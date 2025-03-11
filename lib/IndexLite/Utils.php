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
     * Converts a given input into a single string representation by processing arrays, objects,
     * and primitive data types, with optional filtering based on provided patterns.
     *
     * @param mixed $input The input value to be converted to a string. Can be any type, including null.
     * @param array $options Optional configuration for the stringification process:
     *                       - ignoreKeyPattern (string|null): A regex pattern to filter out keys in arrays/objects.
     *                       - ignoreValuePattern (string|null): A regex pattern to filter out values in the input.
     * @return string A string representation of the input, with filtered and normalized content.
     */
    public static function stringifyValue(mixed $input, array $options = []): string {

        $ignoreKeyPattern = $options['ignoreKeyPattern'] ?? null;
        $ignoreValuePattern = $options['ignoreValuePattern'] ?? null;

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

            if ($ignoreKeyPattern && preg_match($ignoreKeyPattern, $key)) {
                continue;
            }

            // Handle key-value pairs more intelligently for search
            if (is_string($key) && !is_numeric($key)) {
                // Include keys as they might be relevant for search when named meaningfully
                //$parts[] = $key;
            }

            $part = null;

            if (is_string($value)) {
                $part = $value;
            } elseif (is_numeric($value)) {
                $part = (string)$value;
            } elseif (is_array($value) || is_object($value)) {
                $part = self::stringifyValue($value, $options);
            }

            if ($part) {

                if ($ignoreValuePattern && preg_match($ignoreValuePattern, $part)) {
                    continue;
                }

                $parts[] = $part;
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

        /**
     * Escapes special characters in a query string for use in FTS5 queries.
     *
     * @param string $query The query string to escape.
     *
     * @return string The escaped query string.
     */
    public static function escapeFts5SpecialChars($query): string {
        // Define the special characters that need to be escaped in FTS5 queries
        $specialChars = '.-@';

        // Split the query string into individual terms
        $terms = preg_split('/\s+/', $query);

        // Iterate through the terms and escape special characters and double quotes
        $escapedTerms = array_map(function ($term) use ($specialChars) {
            // Replace double quotes with two double quotes
            $escapedTerm = str_replace('"', '""', $term);

            // Escape special characters with double quotes
            $pattern = '/([' . preg_quote($specialChars, '/') . '])/';
            $escapedTerm = preg_replace($pattern, '"$1"', $escapedTerm);

            return $escapedTerm;
        }, $terms);

        // Combine the escaped terms back into a single query string
        $escapedQuery = implode(' ', $escapedTerms);

        return $escapedQuery;
    }
}
