<?php

namespace IndexHybrid;

class Manager {

    protected $manager;
    protected string $type;

    public function __construct(string $server, array $options = []) {

        if (strpos($server, 'indexlite://') === 0) {
            $this->manager = new \IndexLite\Manager(explode('://', $server, 2)[1], $options);
            $this->type = 'indexlite';
        }
    }

    public function __call($method, $args) {

        return call_user_func_array([$this->manager, $method], $args);
    }

}
