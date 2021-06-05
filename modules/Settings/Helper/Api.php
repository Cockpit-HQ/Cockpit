<?php

namespace Settings\Helper;

class Api extends \Lime\Helper {

    protected array $keys = [];

    protected function initialize() {

        $this->keys = $this->app['debug'] ? $this->cache() : $this->app->helper('cache')->read('app.api.keys', function() {
            return $this->cache();
        });
    }

    public function keys(): array {

        $keys = [];

        foreach ($this->keys as $key) {

            $keys[] = [
                'i18n' => $key['i18n'],
                'name' => $key['name'],
            ];
        }

        return $keys;
    }

    public function cache(): array {

        $cache = [];
        $keys = $this->app->dataStorage->find('system/api_keys')->toArray();

        foreach ($keys as $key) {
            $cache[$key['key']] = $key;
        }

        $this->app->helper('cache')->write('app.api.keys', $cache);

        return $cache;
    }
}