<?php

namespace App\RestApi;

use ArrayObject;

class Query extends \Lime\AppAware {

    protected array $endpoints = [];
    protected bool $initialized = false;

    public function init() {

        if ($this->initialized) return;

        $this->app->trigger('restApi.config', [$this]);
        $this->initialized = true;
    }

    public function process(string $path, string $method = 'GET', ?string $apiKey = null) {

        if (!$this->initialized) {
            $this->init();
        }

        $handler = false;
        $params  = [];
        $idx = $method;

        foreach ($this->endpoints as $pattern => $endpoint) {

            if ((isset($endpoint[$method]) || isset($endpoint['*'])) && $this->isPathMatching($path, $pattern, $params)) {
                $idx = isset($endpoint[$method]) ? $method : '*';
                $handler = $endpoint[$idx];
                break;
            }
        }

        if ($handler && \is_callable($handler)) {
            return \call_user_func($handler, $params, $this->app);
        }

        // custom file based route
        // normalize path
        if (strpos($path, '../') !== false) {
            $path = implode('/', array_filter(explode('/', $path), fn($s) => trim($s, '.')));
        }

        if ($custom = $this->resolveCustomApiRoute($path, $method)) {

            $API_FILE = $custom['file'];
            $API_ARGS = $custom['args'];

            $handler = (function() use($API_FILE, $API_ARGS) {
                return include($API_FILE);
            })->bindTo($this->app, $this->app);

            return $handler();
        }

        return false;
    }

    public function addEndPoint(string $path, array $methods = []) {

        $this->endpoints[$path] = $methods;
    }

    protected function isPathMatching($path, $pattern, &$params = null) {

        $params = [];

        if ($path == $pattern) {
            return true;
        }

        $regex = $this->getRegex($pattern);

        if (preg_match($regex, $path, $matches)) {

            $params = array_intersect_key(
                $matches, array_flip(
                    array_filter(array_keys($matches), 'is_string')
                )
            );

            return true;
        }

        return false;
    }

    protected function getRegex($pattern) {

        if (preg_match('/[^-:\/_{}()a-zA-Z\d]/', $pattern)) return false; // Invalid pattern

        // Turn "(/)" into "/?"
        $pattern = preg_replace('#\(/\)#', '/?', $pattern);

        // Create capture group for ":parameter"
        $allowedParamChars = '[a-zA-Z0-9\_\-]+';
        $pattern = preg_replace(
            '/:(' . $allowedParamChars . ')/',   # Replace ":parameter"
            '(?<$1>' . $allowedParamChars . ')', # with "(?<parameter>[a-zA-Z0-9\_\-]+)"
            $pattern
        );

        // Create capture group for '{parameter}'
        $pattern = preg_replace(
            '/{('. $allowedParamChars .')}/',    # Replace "{parameter}"
            '(?<$1>' . $allowedParamChars . ')', # with "(?<parameter>[a-zA-Z0-9\_\-]+)"
            $pattern
        );

        // Add start and end matching
        $patternAsRegex = "@^" . $pattern . "$@D";

        return $patternAsRegex;
    }

    protected function resolveCustomApiRoute(string $route, string $method) {

        $root   = $this->app->path('#config:api');
        $method = strtolower($method);
        $route  = trim($route, '/');
        $parts  = explode('/', $route);
        $dir    = '';

        if (!$root) {
            return null;
        }

        if (strpos($route, '[...all]') !== false) {
            return null;
        }

        if (file_exists("{$root}/{$route}.{$method}.php")) {

            return [
                'args' => [],
                'file' => "{$root}/{$route}.{$method}.php"
            ];
        }

        if (file_exists("{$root}/{$route}.php")) {

            return [
                'args' => [],
                'file' => "{$root}/{$route}.php"
            ];
        }

        foreach ($parts as $idx => $p) {

            $path = trim("{$dir}/$p", '/');
            $file = null;

            if (file_exists("{$root}/{$path}")) {
                $dir = $path;
                continue;
            }

            // catch all route file
            if (file_exists("{$root}/{$dir}/[...all].{$method}.php")) {
                $file = "{$root}/{$dir}/[...all].{$method}.php";
            } elseif (file_exists("{$root}/{$dir}/[...all].php")) {
                $file = "{$root}/{$dir}/[...all].php";
            }

            // catch all route file
            if ($file) {

                $splat = [];

                foreach (array_splice($parts, $idx) as $s) {

                    $param = explode(':', $s, 2);

                    if (isset($param[1])) {
                        $splat[trim($param[0])] = trim($param[1]);
                    } else {
                        $splat[] = $s;
                    }
                }

                return [
                    'args' => $splat,
                    'file' => $file
                ];
            }
        }

        return null;
    }
}
