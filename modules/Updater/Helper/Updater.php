<?php

namespace Updater\Helper;

class Updater extends \Lime\Helper {

    protected string $releasesUrl;

    protected function initialize() {

        $this->releasesUrl = rtrim($this->app->retrieve('updater/releasesUrl', 'https://files.getcockpit.com/releases'), '/');
    }

    public function update(string $version = 'master', string $target = 'core'): bool {

        if (!in_array($target, ['core', 'pro'])) {
            $target = 'core';
        }

        $zipUrl = "{$this->releasesUrl}/{$version}/cockpit-{$target}.zip";

        $this->process($zipUrl, "cockpit-{$target}");

        return true;
    }

    public function getLatestReleaseInfo() {

        $url = "{$this->releasesUrl}/latest.json";
        $contents = $this->app->helper('utils')->urlGetContents($url);

        if (!$contents) {
            return [
                'version' => APP_VERSION,
                'date' => date('Y-m-d'),
            ];
        }

        return json_decode($contents, true);
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

        if (!file_put_contents("{$tmppath}/{$zipname}", $this->app->helper('utils')->urlGetContents($zipUrl))) {
            throw new \Exception("Couldn't download {$zipUrl}!");
        }

        // extract zip contents
        if (!is_dir("{$tmppath}/update-{$zipname}")) {
            @mkdir("{$tmppath}/update-{$zipname}", 0777);
        }

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

        // delete modules cache
        $cache = ['#cache:modules.cache.php'];

        // delete modules cache for all spaces
        $spaces = $this->app->helper('spaces')->spaces();

        foreach ($spaces as $space) {
            $cache[] = APP_SPACES_DIR."/{$space['name']}/storage/cache/modules.cache.php";
        }

        foreach ($cache as $file) {
            if ($this->app->path($file)) {
                $fs->delete($file);
            }
        }

        // clear opcache
        if (function_exists('opcache_reset')) {
            opcache_reset();
        }

        return true;
    }
}
