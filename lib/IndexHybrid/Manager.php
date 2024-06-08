<?php

namespace IndexHybrid;

class Manager {

    protected \IndexLite\Manager|Meilisearch\Manager $manager;
    protected ?string $type = null;

    public function __construct(string $server, array $options = []) {

        if (str_starts_with($server, 'indexlite://')) {
            $this->manager = new \IndexLite\Manager(explode('://', $server, 2)[1], $options);
            $this->type = 'indexlite';
        }

        if (str_starts_with($server, 'meilisearch://')) {

            $server = str_replace('meilisearch://', ($options['https'] ?? true) ? 'https://' : 'http://', $server);

            $this->manager = new Meilisearch\Manager($server, $options);
            $this->type = 'meilisearch';
        }
    }

    public function getType(): ?string {
        return $this->type;
    }

    public function __call($method, $args) {
        return call_user_func_array([$this->manager, $method], $args);
    }

}
