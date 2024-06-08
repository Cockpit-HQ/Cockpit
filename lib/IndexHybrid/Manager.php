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

    /**
     * Returns the type of the object.
     *
     * @return string|null The type of the object or null if the type is not set.
     */
    public function getType(): ?string {
        return $this->type;
    }

    /**
     * Magic method that allows calling inaccessible methods on an object.
     *
     * @param string $method The name of the method being called.
     * @param array $args The arguments passed to the method.
     * @return mixed The result of calling the method with the given arguments.
     */
    public function __call($method, $args) {
        return call_user_func_array([$this->manager, $method], $args);
    }

}
