<?php

namespace JSONStream;

use InvalidArgumentException;
use JsonException;
use RuntimeException;
use Generator;

/**
 * Reads a large JSON file structured as an array of objects ([{...}, {...}])
 * in a streaming, memory-efficient manner.
 *
 * Parses the stream incrementally and yields individual objects.
 * Handles UTF-8 characters and JSON string escaping correctly.
 */
class CollectionReader {

    protected const int CHUNK_SIZE = 8192;

    protected $resource;
    protected bool $asArray = false;
    protected string $buffer = '';
    protected int $nestingLevel = 0;
    protected bool $inString = false; // State: Track if currently inside a JSON string "..."
    protected bool $escaped = false;  // State: Track if the previous character was an escape '\'

    /**
     * @param string $path Path to the JSON file.
     * @param bool $asArray Decode objects as associative arrays (true) or stdClass objects (false).
     * @throws InvalidArgumentException If the file path is invalid or the file cannot be opened.
     */
    public function __construct(string $path, bool $asArray = true) {
        if (!is_readable($path) || !is_file($path)) {
            throw new InvalidArgumentException('File does not exist or is not readable at given path: ' . $path);
        }

        $this->asArray = $asArray;
        // Use error suppression for fopen and check the result
        $resource = @fopen($path, 'rb');
        if ($resource === false) {
            // Optionally capture detailed error with error_get_last() if needed
            throw new InvalidArgumentException('Failed to open file for reading: ' . $path);
        }
        $this->resource = $resource;
    }

    /**
     * Closes the file resource if it is open.
     */
    public function close(): void {
        if (is_resource($this->resource)) {
            fclose($this->resource);
            $this->resource = null; // Ensure resource is marked as closed
        }
    }

    /**
     * Returns a Generator that yields each top-level object from the JSON array.
     *
     * @return Generator Decoded objects (or arrays based on $asArray).
     * @throws RuntimeException If reading from the file stream fails.
     * @throws JsonException If the JSON is malformed or truncated.
     */
    public function get(): Generator {
        // Reset state for each full iteration attempt
        $this->buffer = '';
        $this->nestingLevel = 0;
        $this->inString = false;
        $this->escaped = false;

        if (!is_resource($this->resource)) {
             throw new RuntimeException('File stream is not available or already closed.');
        }

        // Ensure we start from the beginning
        if (ftell($this->resource) !== 0) {
             rewind($this->resource);
        }

        while (!feof($this->resource)) {
            $chunk = @fread($this->resource, self::CHUNK_SIZE);
            if ($chunk === false) { // Handle read errors
                 $this->close();
                 throw new RuntimeException('Failed to read from file stream.');
            }
            if ($chunk === '') { // Avoid processing empty chunks unnecessarily
                continue;
            }
            // Delegate parsing of the current buffer + new chunk
            yield from $this->parseChunk($chunk);
        }

        // Final checks after processing the entire file
        if ($this->nestingLevel !== 0) {
            $this->close();
            throw new JsonException("Invalid JSON structure: unexpected end of file - nesting level is {$this->nestingLevel}, expected 0.");
        }
        if ($this->inString) {
             $this->close();
            throw new JsonException("Invalid JSON structure: unexpected end of file - parser ended inside a string literal.");
        }
        // Check for non-whitespace trailing data outside the main structure
        $trimmedBuffer = trim($this->buffer);
        if ($trimmedBuffer !== '' && $trimmedBuffer !== ']') { // Allow trailing whitespace or the final ']'
             $this->close();
             throw new JsonException("Invalid JSON structure: unexpected trailing data in buffer: '" . mb_substr($trimmedBuffer, 0, 50) . "...'");
        }
    }

    /**
     * Parses the buffered data including the new chunk, yielding complete objects.
     * Manages parsing state ($nestingLevel, $inString, $escaped) across chunks.
     *
     * @param string $chunk The newly read chunk of data.
     * @return Generator Decoded objects/arrays found in the buffer.
     * @throws JsonException If JSON is invalid during parsing or decoding.
     */
    private function parseChunk(string $chunk): Generator {
        $this->buffer .= $chunk;

        $startCharIndex = -1; // Character index where the current top-level object started
        $keepFromCharIndex = 0; // Character index from where to keep the buffer for the next round

        // Use mb_str_split for proper multi-byte character iteration by character index
        $split = mb_str_split($this->buffer);

        foreach ($split as $position => $char) {
            $processChar = true; // Flag to indicate if char influences state/structure

            // --- State Machine Logic ---
            if ($this->escaped) {
                // Current char is escaped, does not affect structure or string state itself
                $this->escaped = false;
                $processChar = false; // Don't process this char further for state changes
            } elseif ($char === '\\') {
                // Next char will be escaped
                $this->escaped = true;
                $processChar = false; // Don't process this char further for state changes
            } elseif ($char === '"') {
                // Entering or exiting a string (only if not escaped)
                $this->inString = !$this->inString;
                $processChar = false; // Don't process this char for structure changes
            }

            // Only process structural characters if not inside a string and the char wasn't escaped
            if ($processChar && !$this->inString) {
                if ($char === '{') {
                    if ($this->nestingLevel === 0) {
                        $startCharIndex = $position; // Mark start character index
                    }
                    $this->nestingLevel++;
                } elseif ($char === '}') {
                    // Check for underflow before decrementing
                    if ($this->nestingLevel <= 0) {
                        $this->close();
                        throw new JsonException("Invalid JSON structure: unexpected '}' found near buffer character offset " . $position);
                    }

                    $this->nestingLevel--;

                    // Check if we just closed a top-level object
                    if ($this->nestingLevel === 0 && $startCharIndex !== -1) {
                        $endCharIndex = $position;
                        $length = $endCharIndex - $startCharIndex + 1;

                        // Extract the JSON object string (multi-byte safe)
                        $jsonString = mb_substr($this->buffer, $startCharIndex, $length);

                        // Attempt to decode
                        // Suppress errors here as we check json_last_error immediately after
                        $decoded = @json_decode($jsonString, $this->asArray);
                        $error = json_last_error();

                        if ($error !== JSON_ERROR_NONE) {
                            $this->close();
                            $snippet = mb_substr($jsonString, 0, 100) . (mb_strlen($jsonString) > 100 ? '...' : '');
                            throw new JsonException(json_last_error_msg() . " - near JSON snippet: \"" . $snippet . "\"", $error);
                        }

                        yield $decoded;

                        // Reset start index, update buffer keep position
                        $startCharIndex = -1;
                        $keepFromCharIndex = $endCharIndex + 1;
                    }
                }
                // Note: We deliberately ignore '[' and ']' outside of strings,
                // relying on correct nesting of '{}' at level 0 to find items.
                // Assumes the input file structure is fundamentally `[{...}, {...}]`.
            }
            // --- End State Machine ---

        } // end foreach character

        // Keep the unparsed part of the buffer for the next chunk (multi-byte safe)
        if ($keepFromCharIndex > 0) {
             // If $keepFromCharIndex points beyond the current buffer length (can happen if last char processed was end of object)
             // ensure we don't cause an error with mb_substr. An empty string is the correct result.
             if ($keepFromCharIndex >= count($split)) {
                 $this->buffer = '';
             } else {
                 $this->buffer = mb_substr($this->buffer, $keepFromCharIndex);
             }
        }
        // If $keepFromCharIndex is 0, the entire buffer is kept (e.g., still inside an object, or leading whitespace)
    }

    /**
     * Ensures the file resource is closed when the object is destroyed.
     */
    public function __destruct() {
        $this->close();
    }
}
