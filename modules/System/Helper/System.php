<?php

namespace System\Helper;

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

}
