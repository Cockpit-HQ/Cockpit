<?php

namespace System\Helper;

use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;
use ArrayObject;

class System extends \Lime\Helper {

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

    public function report(mixed $error) {
        // to be implemented
    }

    public function flushCache() {

        $dirs = ['#cache:','#tmp:'];
        $fs = $this->app->helper('fs');

        foreach ($dirs as $dir) {

            $path = $this->app->path($dir);
            $files = new \RecursiveIteratorIterator(new \RecursiveDirectoryIterator($path), \RecursiveIteratorIterator::SELF_FIRST);

            foreach ($files as $file) {

                if (!$file->isFile() || preg_match('/(\.gitkeep|\.gitignore|index\.html)$/', $file)) continue;

                @unlink($file->getRealPath());
            }

            $fs->removeEmptySubFolders($path);
        }

        $this->app->memory->flush();
        $this->app->trigger('app.system.cache.flush');

        if (function_exists('opcache_reset')) {
            opcache_reset();
        }
    }

    public function getDirectorySize(string $directory, bool $format = false) {

        // Check if 'exec' is allowed
        if (function_exists('exec')) {

            try {
                $process = new Process(['du', '-sb', $directory]);
                $process->run();

                // Executes after the command finishes
                if (!$process->isSuccessful()) {
                    throw new ProcessFailedException($process);
                }

                $output = $process->getOutput();
                $size = explode("\t", $output)[0];

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

}
