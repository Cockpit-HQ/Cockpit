<?php

namespace Settings\Helper;

class Api extends \Lime\Helper {

    protected array $keys = [];

    protected function initialize() {

        $this->keys = $this->app['debug'] ? $this->cache() : $this->app->helper('cache')->read('app.api.keys', function() {
            return $this->cache();
        }, true);
    }

    public function getKey(string $key) {
        return $this->keys[$key] ?? null;
    }

    public function keys(): array {
        return array_keys($this->keys);
    }

    public function cache(): array {

        $cache = [];
        $keys = $this->app->dataStorage->find('system/api_keys')->toArray();

        foreach ($keys as $key) {
            $cache[$key['key']] = $key;
        }

        $this->app->helper('cache')->write('app.api.keys', $cache, -1, true);

        return $cache;
    }
}