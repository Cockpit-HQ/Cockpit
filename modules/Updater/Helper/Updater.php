<?php

namespace Updater\Helper;

class Updater extends \Lime\Helper {

    public function update(string $version = 'master', $target = 'core'): bool {

        if (!in_array($target, ['core', 'pro'])) {
            $target = 'core';
        }

        $zipUrl = "https://files.getcockpit.com/releases/{$version}/cockpit-{$target}.zip";

        $this->process($zipUrl, "cockpit-{$target}");

        return true;
    }

    protected function process(string $zipUrl, string $zipRoot = '/'): bool {

        if (!is_writable(APP_DIR)) {
            throw new \Exception("App root is not writable!");
        }

        $targetPath = APP_DIR;

        $fs = $this->app->helper('fs');
        $tmppath = $this->app->path('#tmp:');
        $zipname = null;
        $zipRoot = trim($zipRoot, '/');

        // download

        $zipname = basename($zipUrl);

        if (!file_put_contents("{$tmppath}/{$zipname}", $handle = @fopen($zipUrl, 'r'))) {
            throw new \Exception("Couldn't download {$zipUrl}!");
        }

        @fclose($handle);

        // extract zip contents
        @mkdir("{$tmppath}/update-{$zipname}", 0777);
        $zip = new \ZipArchive;

        if ($zip->open("{$tmppath}/{$zipname}") === true) {

            if (!$zip->extractTo("{$tmppath}/update-{$zipname}")) {
                throw new \Exception('Extracting zip file failed!');
            }

            $zip->close();

        } else {
            throw new \Exception('Open zip file failed!');
        }

        $fs->delete("{$tmppath}/update-{$zipname}/{$zipRoot}/config");
        $fs->delete("{$tmppath}/update-{$zipname}/{$zipRoot}/storage");

        // copy files
        $fs->copy("{$tmppath}/update-{$zipname}/{$zipRoot}", $targetPath);

        // cleanup
        $fs->delete("{$tmppath}/{$zipname}");
        $fs->delete("{$tmppath}/update-{$zipname}");

        $moduleCacheFile = '#cache:modules.cache.php';

        if ($this->app->path($moduleCacheFile)) {
            $fs->delete($moduleCacheFile);
        }

        if (function_exists('opcache_reset')) {
            \opcache_reset();
        }

        return true;
    }
}
