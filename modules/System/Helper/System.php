<?php

namespace System\Helper;

use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;
use ArrayObject;

class System extends \Lime\Helper {

    /**
     * Try to execute a callback and handle exceptions.
     *
     * @param callable $callback The callback to execute.
     * @param mixed $rescue The value to return on failure.
     * @param bool $report Whether to report the error.
     * @return mixed The result of the callback or the rescue value.
     */
    public function try(callable $callback, $rescue = null, bool $report = true) {
        try {
            return $callback();
        } catch (\Throwable $e) {
            if ($report) {
                $this->report($e);
            }

            return $rescue instanceof \Closure ? $rescue($e) : $rescue;
        }
    }

    /**
     * Report an error.
     *
     * @param mixed $error The error to report.
     * @return void
     */
    public function report(mixed $error) {
        // to be implemented
    }

    /**
     * Flush the application cache.
     *
     * @return void
     */
    public function flushCache(): void {

        $dirs = ['#cache:','#tmp:'];
        $fs = $this->app->helper('fs');

        foreach ($dirs as $dir) {

            $path = $this->app->path($dir);
            $files = new \RecursiveIteratorIterator(new \RecursiveDirectoryIterator($path), \RecursiveIteratorIterator::SELF_FIRST);

            foreach ($files as $file) {

                if (!$file->isFile() || \preg_match('/(\.gitkeep|\.gitignore|index\.html)$/', $file)) continue;

                @\unlink($file->getRealPath());
            }

            $fs->removeEmptySubFolders($path);
        }

        $this->app->memory->flush();
        $this->app->trigger('app.system.cache.flush');
        $this->vacuumSQLite();

        if (\function_exists('opcache_reset')) {
            \opcache_reset();
        }
    }

    /**
     * Get the size of a directory.
     *
     * @param string $directory The directory path.
     * @param bool $format Whether to format the size.
     * @return int|string The directory size in bytes or formatted size.
     */
    public function getDirectorySize(string $directory, bool $format = false) {

        // Check if 'exec' is allowed
        if (\function_exists('exec')) {

            try {
                $process = new Process(['du', '-sb', $directory]);
                $process->run();

                // Executes after the command finishes
                if (!$process->isSuccessful()) {
                    throw new ProcessFailedException($process);
                }

                $output = $process->getOutput();
                $size = \explode("\t", $output)[0];

                return $format ? $this->app->helper('utils')->formatSize($size) : $size;

            } catch (ProcessFailedException $e) {

            }
        }

        // Fallback to PHP native method
        $size = 0;

        foreach (new \RecursiveIteratorIterator(new \RecursiveDirectoryIterator($directory)) as $file) {
            $size += $file->getSize();
        }

        return $format ? $this->app->helper('utils')->formatSize($size) : $size;;
    }

    /**
     * Vacuum SQLite databases.
     *
     * @return void
     */
    public function vacuumSQLite(): void {

        $validExt = ['db', 'idx', 'sqlite', 'sqlite3'];

        try {

            $iterator = new \DirectoryIterator($this->app->path('#storage:data'));

            foreach ($iterator as $finfo) {

                if (!$finfo->isFile() || !\in_array($finfo->getExtension(), $validExt)) continue;

                $file = $finfo->getRealPath();

                try {
                    $db = new \PDO("sqlite:$file");
                    $db->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
                    $db->exec('VACUUM');
                    $db = null; // Close the connection
                } catch (\PDOException $e) {
                    // log!?
                }

            }

        } catch (\UnexpectedValueException $e) {
            // log !?
        }

    }

}
