<?php

namespace System\Helper;

class Api extends \Lime\Helper {

    protected array $keys = [];

    protected function initialize() {

        $this->keys = $this->app['debug'] ? $this->cache(false) : $this->app->memory->get('app.api.keys', function() {
            return $this->cache();
        });
    }

    /**
     * Get an API key by its identifier.
     *
     * @param string $key The API key identifier.
     * @return mixed The API key value or null if not found.
     */
    public function getKey(string $key) {
        return $this->keys[$key] ?? null;
    }

    /**
     * Get a list of all API keys.
     *
     * @return array The list of API keys.
     */
    public function keys(): array {
        return array_keys($this->keys);
    }

    /**
     * Cache and get the cached API keys.
     *
     * @param bool $persistent Whether to use the persistent cache.
     * @return array The cached API keys.
     */
    public function cache(bool $persistent = true): array {

        $cache = [];
        $keys = $this->app->dataStorage->find('system/api_keys')->toArray();

        foreach ($keys as $key) {
            $cache[$key['key']] = $key;
        }

        if ($persistent) {
            $this->app->memory->set('app.api.keys', $cache);
        }

        return $cache;
    }
}
