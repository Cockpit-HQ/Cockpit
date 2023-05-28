<?php

namespace IndexLite;

class Manager {

    protected string $path;
    protected array $indexes = [];

    public function __construct(string $path, array $options = []) {
        $this->path = rtrim($path, '/');
    }

    public function index(string $name): Index {

        if (isset($this->indexes[$name])) {
            return $this->indexes[$name];
        }

        if (!$this->exists($name)) {
            throw new \Exception("Index <{$name}> does not exist.");
        }

        $index = new Index("{$this->path}/$name.idx");

        $this->indexes[$name] = $index;

        return $index;
    }

    public function createIndex(string $name, array $fields = [], array $options = []) {

        if ($this->exists($name)) {
            throw new \Exception("Index <{$name}> already exists.");
        }

        $options = array_merge([
            'fields' => $fields,
            'tokenizer' => 'porter unicode61 remove_diacritics 1'
        ], $options);

        foreach ($options['fields'] as $field) {
            //$fields[] = "{$field} UNINDEXED";
        }

        Index::create("{$this->path}/$name.idx", $options['fields'], $options);

        return $this->index($name);
    }

    public function removeIndex(string $name) {

        if (!$this->exists($name)) {
            return;
        }

        \unlink("{$this->path}/$name.idx");
        unset($this->indexes[$name]);
    }

    public function exists(string $name): bool {
        return \file_exists("{$this->path}/$name.idx");
    }
}
