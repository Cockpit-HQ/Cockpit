<?php

namespace IndexHybrid;

class Manager {

    protected $manager;
    protected ?string $type = null;

    public function __construct(string $server, array $options = []) {

        if (strpos($server, 'indexlite://') === 0) {
            $this->manager = new \IndexLite\Manager(explode('://', $server, 2)[1], $options);
            $this->type = 'indexlite';
        }

        if (strpos($server, 'meilisearch://') === 0) {

            $server = str_replace('meilisearch://', ($options['https'] ?? true) ? 'https://' : 'http://', $server);

            $this->manager = new \IndexHybrid\Meilisearch\Manager($server, $options);
            $this->type = 'meilisearch';
        }
    }

    public function getType() {
        return $this->type;
    }

    public function __call($method, $args) {
        return call_user_func_array([$this->manager, $method], $args);
    }

}
