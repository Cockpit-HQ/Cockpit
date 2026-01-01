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
            'maxFileUploads' => $this->helper('utils')->getMaxFileUploads(),
        ];
    }

    /**
     * Get or set the page title.
     *
     * @param string|null $newTitle The new title to set, or null to get the current title.
     * @return string|null The current title or null if not set.
     */
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

    /**
     * Get or set the favicon URL.
     *
     * @param string|null $url The new favicon URL to set, or null to get the current URL.
     * @param string|null $color The color to apply to the favicon (for SVGs), or null to not change the color.
     * @return string|null The current favicon URL or null if not set.
     */
    public function favicon(?string $url = null, ?string $color = null): ?string {

        if ($url) {
            $this->favicon = $this->pathToUrl($url);
            $ext = \strtolower(\pathinfo($this->favicon, PATHINFO_EXTENSION));

            if ($ext != 'svg') {
                return null;
            }

            if ($ext == 'svg' && $color) {
                $path = $this->app->path($url);
                $svg = \file_get_contents($path);
                $svg = \substr($svg, \strpos($svg, '<svg'));
                $svg = \preg_replace('/fill="(.*?)"/', 'fill="'.$color.'"', $svg);
                $this->favicon = 'data:image/svg+xml;base64,'.\base64_encode($svg);
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

    /**
     * Get or set the logo URL.
     *
     * @param string|null $url The new logo URL to set, or null to get the current URL.
     * @return string|null The current logo URL or null if not set.
     */
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

        return $this->app->baseUrl('app:assets/img/logo.svg');
    }

    /**
     * Get theme.
     *
     * @return string|null The current theme or null if not set.
     */
    public function theme() {

        $theme = $this->app->retrieve('theme/default', 'auto');
        $theme = $this->app->helper('auth')->getUser('theme', $theme);

        return $theme;
    }

    /**
     * Get or set the assets for the current page.
     *
     * @param array $assets The assets to set.
     * @param string|null $context The context in which the assets are used.
     * @return array The current assets.
     */
    public function assets(array $assets = [], ?string $context = null) {

        $debug = $this->app->retrieve('debug');

        $core = [];

        if ($context === 'app:header') {
            $core[] = $debug ? 'app:assets/css/app.css' : 'app:assets/app.bundle.css';
            $core[] = $debug ? ['src' => 'app:assets/js/app.js', 'type' => 'module'] : 'app:assets/app.bundle.js';
        }

        if ($context === 'app:footer') {
            $core[] = ['src' => 'app:assets/vendor/JSON5.js', 'position' => 'footer'];
        }

        $assets = \array_merge($core, $assets);

        $this->app->trigger('app.layout.assets', [&$assets, $context]);

        if ($context === 'app:header' && $this->app->path('#config:theme.css')) {
            $assets[] = '#config:theme.css';
        }

        return $this->app->assets($assets, $this->app->retrieve('app.version'));
    }

    /**
     * Get or set the page class.
     *
     * @param string|null $class The new class to set, or null to get the current class.
     * @return string|null The current class or null if not set.
     */
    public function pageClass(?string $class = null) {

        if ($class) {
            $this->pageClass = $class;
            return null;
        }

        return $this->pageClass;
    }

    /**
     * Get or set the page variables.
     *
     * @param array|string|null $name The variable name or an array of variables to set.
     * @param mixed|null $value The variable value to set, or null to get the current value.
     * @return mixed The current variable value or null if not set.
     */
    public function vars(...$args) {

        switch (\count($args)) {
            case 1:

                if (\is_array($args[0])) {
                    $this->vars = \array_merge($this->vars, $args[0]);
                    break;
                }

                return $this->vars[$args[0]] ?? null;
            case 2:
                $this->vars[$args[0]] = $args[1];
                break;
        }

        return $this->vars;
    }
}
