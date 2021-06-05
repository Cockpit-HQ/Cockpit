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

        $theme = $this->app->retrieve('theme', 'default');

        return $theme;
    }
}