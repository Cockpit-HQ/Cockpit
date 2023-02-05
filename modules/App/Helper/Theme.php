<?php

namespace App\Helper;

class Theme extends \Lime\Helper {

    protected array $vars;
    protected ?string $title = null;
    protected ?string $favicon = null;
    protected ?string $logo = null;
    protected ?string $pageClass = null;

    protected function initialize() {

        $this->vars = [
            'app.version' => $this->app->retrieve('app.version'),
            'siteUrl' => $this->app->getSiteUrl(true),
            'maxUploadSize' => $this->helper('utils')->getMaxUploadSize(),
        ];
    }

    public function title(?string $newTitle = null): ?string {

        if ($newTitle) {
            $this->title = $newTitle;
            return null;
        }

        if ($this->title) {
            return $this->title;
        }

        return $this->app->retrieve('app.name');
    }

    public function favicon(?string $url = null, ?string $color = null): ?string {

        if ($url) {
            $this->favicon = $this->pathToUrl($url);
            $ext = \strtolower(\pathinfo($this->favicon, PATHINFO_EXTENSION));

            if ($ext != 'svg') {
                return null;
            }

            if ($ext == 'svg' && $color) {
                $path = $this->app->path($url);
                $svg = file_get_contents($path);
                $svg = substr($svg, strpos($svg, '<svg'));
                $svg = preg_replace('/fill="(.*?)"/', 'fill="'.$color.'"', $svg);
                $this->favicon = 'data:image/svg+xml;base64,'.base64_encode($svg);
            }

            return null;
        }

        if ($this->favicon) {
            return $this->favicon;
        }

        if ($this->app->path('#config:favicon.png')) {
            return $this->app->pathToUrl('#config:favicon.png');
        }

        return $this->pathToUrl('#app:favicon.png');
    }

    public function logo(?string $url = null): ?string {

        if ($url) {
            $this->logo = $this->app->pathToUrl($url);
            return null;
        }

        if ($this->logo) {
            return $this->logo;
        }

        if ($this->app->path('#config:logo.svg')) {
            return $this->app->pathToUrl('#config:logo.svg');
        }

        return $this->app->baseUrl('app:assets/logo.svg');
    }

    public function theme() {

        $theme = $this->app->retrieve('theme/default', 'auto');
        $theme = $this->app->helper('auth')->getUser('theme', $theme);

        return $theme;
    }

    public function assets(array $assets = [], ?string $context = null) {

        $debug = $this->app->retrieve('debug');

        $assets = array_merge([
            $debug ? 'app:assets/css/app.css' : 'app:assets/app.bundle.css',
            'app:assets/vendor/JSON5.js',
            'app:assets/vendor/noty/noty.min.js',
            'app:assets/vendor/lodash.js',
            $debug ? ['src' => 'app:assets/js/app.js', 'type' => 'module'] : 'app:assets/app.bundle.js'
        ], $assets);

        $this->app->trigger('app.layout.assets', [&$assets, $this->app->retrieve('app.version'), $context]);

        if ($this->app->path('#config:theme.css')) {
            $assets[] = '#config:theme.css';
        }

        return $this->app->assets($assets, $this->app->retrieve('app.version'));
    }

    public function pageClass(?string $class = null) {

        if ($class) {
            $this->pageClass = $class;
            return null;
        }

        return $this->pageClass;
    }

    public function vars(...$args) {

        switch (count($args)) {
            case 1:
                return $this->vars[$args[0]] ?? null;
            case 2:
                $this->vars[$args[0]] = $args[1];
                break;
        }

        return $this->vars;
    }
}
