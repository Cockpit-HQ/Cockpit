<?php

namespace JSONStream;

use InvalidArgumentException;
use JsonException;
use RuntimeException;

/**
 * Writes a potentially large array of PHP items to a JSON file ([{...}, {...}])
 * in a streaming, robust, and atomic (via temp file) manner.
 */
class CollectionWriter {

    protected const WRITE_MODE = 'wb'; // Use binary mode for consistency

    // Hold the file handle for the temporary file
    protected $resource;
    // The final destination path for the JSON file
    protected string $finalPath;
    // Path to the temporary file being written to, null when handled
    protected ?string $tempPath;
    // Counter for items to manage comma separation
    protected int $key = 0;
    // Flag to indicate if the writer has been successfully closed and renamed
    protected bool $closed = false;

    /**
     * @param string $path The final path for the JSON file.
     * @throws InvalidArgumentException If the path is invalid, directory not writable, or temp file cannot be created/opened.
     * @throws RuntimeException If writing the initial '[' fails.
     */
    public function __construct(string $path) {
        $this->finalPath = $path;
        $dir = dirname($path);

        if (!is_dir($dir)) {
            throw new InvalidArgumentException("Target directory does not exist: " . $dir);
        }
        if (!is_writable($dir)) {
            throw new InvalidArgumentException("Target directory is not writable: " . $dir);
        }

        // Create a unique temporary file in the target directory
        $tempPath = @tempnam($dir, basename($path) . '.tmp_');
        if ($tempPath === false) {
            // error_get_last() could provide more details here if needed
            throw new InvalidArgumentException("Failed to create temporary file in directory: " . $dir);
        }
        $this->tempPath = $tempPath;

        $resource = @fopen($this->tempPath, self::WRITE_MODE);
        if ($resource === false) {
            $this->emergencyCleanup(); // Attempt cleanup before throwing
            throw new InvalidArgumentException("Failed to open temporary file for writing: " . $this->tempPath);
        }
        $this->resource = $resource;

        try {
            // Start the JSON array structure using internal checked write
            $this->write('[');
        } catch (\Throwable $e) {
            $this->emergencyCleanup(); // Ensure cleanup if initial write fails
            throw $e; // Re-throw original exception
        }
    }

    /**
     * Writes a string to the temporary file, checking for errors.
     * @throws RuntimeException if writing fails or stream is not open.
     */
    private function write(string $string): void {
        if (!is_resource($this->resource)) {
             throw new RuntimeException("Attempted to write but stream is not open or invalid.");
        }
        // Skip writing empty strings
        if ($string === '') {
            return;
        }

        $length = strlen($string);
        $bytesWritten = @fwrite($this->resource, $string);

        if ($bytesWritten === false || $bytesWritten < $length) {
            $this->emergencyCleanup(); // Attempt cleanup before throwing
            throw new RuntimeException("Failed to write data to temporary file (disk full?): " . ($this->tempPath ?? 'N/A'));
        }
    }

    /**
     * Encodes and pushes an item onto the JSON array stream.
     *
     * @param mixed $item The item to encode and write (must be encodable by json_encode).
     * @throws RuntimeException If writing fails or the writer is already closed.
     * @throws JsonException If json_encode fails for the item (requires PHP 7.3+ for automatic throw).
     */
    public function push($item): void {
        if ($this->closed) {
            throw new RuntimeException("Cannot push item: Writer has already been closed.");
        }
        if (!is_resource($this->resource)) {
             throw new RuntimeException("Cannot push item: File resource is not valid (writer closed prematurely?).");
        }

        // Throws JsonException on error (PHP 7.3+)
        // Use common options for readable JSON output.
        $encodedItem = json_encode(
            $item,
            JSON_THROW_ON_ERROR | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE
        );

        $prefix = ($this->key === 0) ? '' : ',';
        $this->write($prefix . $encodedItem);

        $this->key++;
    }

    /**
     * Finalizes the JSON file: writes closing bracket, closes temp file,
     * and renames temp file to final destination path.
     *
     * @throws RuntimeException If writing, closing, or renaming fails.
     */
    public function close(): void {
        if ($this->closed) {
            return; // Safe to call multiple times
        }

        if (!is_resource($this->resource)) {
             // If resource is gone but not marked closed, implies an earlier failure or misuse.
             $this->closed = true; // Prevent further operations
             $this->emergencyCleanup(); // Attempt to clean up temp file if it exists
             throw new RuntimeException("Cannot close writer: File resource is not valid (already closed or stream failed?).");
        }

        try {
            $this->write(']'); // Write the closing bracket

            if (!@fclose($this->resource)) {
                 // Even if fclose fails, the resource handle might become invalid. Mark it null.
                 $this->resource = null;
                 throw new RuntimeException("Failed to close temporary file stream: " . ($this->tempPath ?? 'N/A'));
            }
            $this->resource = null; // Mark resource as closed

            // Atomically move the temporary file to the final destination
            if (!@rename($this->tempPath, $this->finalPath)) {
                 // If rename fails, the temp file still exists. Emergency cleanup will handle it.
                 throw new RuntimeException("Failed to rename temporary file '{$this->tempPath}' to final path '{$this->finalPath}'. Check permissions and paths.");
            }

            // Rename successful, mark temp file as handled
            $this->tempPath = null;

        } catch (\Throwable $e) {
            // If anything fails during the close process, trigger cleanup and re-throw
            $this->emergencyCleanup();
            throw $e; // Preserve original exception type and message
        } finally {
             // This flag must be set indicating the close operation was attempted.
             // Subsequent calls will bail out early.
            $this->closed = true;
            // Ensure resource is null if error happened before fclose
            if(is_resource($this->resource)) {
                @fclose($this->resource);
                $this->resource = null;
            }
        }
    }

    /**
     * Performs cleanup: closes resource if open and unlinks temp file if it exists.
     * Suppresses errors during cleanup itself, as it's often called after another error.
     */
    private function emergencyCleanup(): void {
         try {
             if (is_resource($this->resource)) {
                 @fclose($this->resource);
             }
         } finally {
            // Ensure resource is marked null regardless of fclose success/failure
            $this->resource = null;
            // Try to remove temp file if path known and file exists
            if ($this->tempPath && @file_exists($this->tempPath)) {
                @unlink($this->tempPath);
            }
            // Ensure temp path is cleared
            $this->tempPath = null;
            // Mark as closed to prevent further operations
            $this->closed = true;
         }
    }

    /**
     * Destructor: Ensures resources are cleaned up if close() was not explicitly called
     * or if an error occurred during close(). Attempts to prevent orphaned temp files.
     */
    public function __destruct() {
        // Perform cleanup only if the close process wasn't fully completed.
        // Check resource handle validity OR if tempPath still exists (indicating failed rename).
        if (is_resource($this->resource) || ($this->tempPath && @file_exists($this->tempPath))) {
             $this->emergencyCleanup();
        }
    }
}
