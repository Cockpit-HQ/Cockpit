<?php

namespace App\Helper;

class Theme extends \Lime\Helper {

    public function title(?string $newTitle = null): ?string {

        static $customTitle;

        if ($newTitle) {
            $customTitle = $newTitle;
            return null;
        }

        if ($customTitle) {
            return $customTitle;
        }

        return $this->app->retrieve('app.name');
    }

    public function favicon(?string $url = null, ?string $color = null): ?string {

        static $iconUrl;

        if ($url) {
            $iconUrl = $this->pathToUrl($url);
            $ext = \strtolower(\pathinfo($iconUrl, PATHINFO_EXTENSION));

            if ($ext != 'svg') {
                return null;
            }

            if ($ext == 'svg' && $color) {
                $path = $this->app->path($url);
                $svg = file_get_contents($path);
                $svg = preg_replace('/fill="(.*?)"/', 'fill="'.$color.'"', $svg);
                $iconUrl = 'data:image/svg+xml;base64,'.base64_encode($svg);
            }

            return null;
        }

        if ($iconUrl) {
            return $iconUrl;
        }

        if ($this->app->path('#config:favicon.png')) {
            return $this->app->pathToUrl('#config:favicon.png');
        }

        return $this->baseUrl('/favicon.png');
    }

    public function logo(?string $url = null): ?string {

        static $logo;

        if ($url) {
            $logo = $this->pathToUrl($url);;
            return null;
        }

        if ($logo) {
            return $logo;
        }

        if ($this->app->path('#config:logo.svg')) {
            return $this->app->pathToUrl('#config:logo.svg');
        }

        return $this->baseUrl('app:assets/logo.svg');
    }

    public function theme() {

        $theme = $this->app->retrieve('theme/default', 'auto');
        $theme = $this->app->helper('auth')->getUser('theme', $theme);

        return $theme;
    }

    public function assets(array $assets = []) {

        $debug = $this->app->retrieve('debug');

        $assets = array_merge([
            $debug ? 'app:assets/css/app.css' : 'app:assets/app.bundle.css',
            'app:assets/vendor/JSON5.js',
            'app:assets/vendor/noty/noty.min.js',
            'app:assets/vendor/lodash.js',
            $debug ? ['src' => 'app:assets/js/app.js', 'type' => 'module'] : 'app:assets/app.bundle.js',
        ], $assets);

        $this->app->trigger('app.layout.assets', [&$assets, APP_VERSION]);

        if ($this->app->path('#config:theme.css')) {
            $assets[] = '#config:theme.css';
        }

        return $this->app->assets($assets, APP_VERSION);
    }
}