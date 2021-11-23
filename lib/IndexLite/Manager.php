<?php

namespace IndexLite;

use SQLite3;

class Manager {

    protected string $path;

    public function __construct(string $path, array $options = []) {
        $this->path = rtrim($path, '/');
    }

    public function index(string $name): Index {
        $index = new Index("{$this->path}/$name.idx");
        return $index;
    }

    public function createIndex(string $name, array $options) {

        if ($this->exists($name)) {
            throw new \Exception("Index <{$name}> already exists.");
        }

        $options = array_merge([
            'fields' => [],
            'tokenizer' => 'porter'
        ], $options);

        $fields = [];

        $db = new SQLite3("{$this->path}/$name.idx");

        $init = "
            CREATE VIRTUAL TABLE documents
                USING fts5(id,".implode(',', $options['fields']).", tokenize=\"{$options['tokenizer']}\");
        ";

        $db->exec($init);

        return $this->index($name);
    }

    public function removeIndex(string $name) {

        if (!$this->exists($name)) {
            return;
        }

        \unlink("{$this->path}/$name.idx");
    }

    public function exists(string $name): bool {
        return \file_exists("{$this->path}/$name.idx");
    }
}