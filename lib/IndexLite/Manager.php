<?php

namespace IndexLite;

class Manager {

    protected string $path;
    protected array $indexes = [];
    protected array $options = [];

    public function __construct(string $path, array $options = []) {
        $this->options = $options;
        $this->path = rtrim($path, '/');
    }

    /**
     * Retrieves the index with the given name.
     *
     * @param string $name The name of the index to retrieve.
     * @return Index The index with the given name.
     * @throws \Exception If the index does not exist.
     */
    public function index(string $name): Index {

        if (isset($this->indexes[$name])) {
            return $this->indexes[$name];
        }

        if (!$this->exists($name)) {
            throw new \Exception("Index <{$name}> does not exist.");
        }

        $index = new Index("{$this->path}/$name.idx", $this->options);

        $this->indexes[$name] = $index;

        return $index;
    }

    /**
     * Creates a new index with the given name, fields, and options.
     *
     * @param string $name The name of the index to create.
     * @param array $fields The fields to be indexed.
     * @param array $options The additional options for index creation.
     * @return Index The created index object.
     * @throws \Exception If the index already exists.
     */
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

    /**
     * Removes an existing index with the given name.
     *
     * @param string $name The name of the index to remove.
     * @return void
     */
    public function removeIndex(string $name) {

        if (!$this->exists($name)) {
            return;
        }

        if (file_exists("{$this->path}/$name.idx")) unlink("{$this->path}/{$name}.idx");
        if (file_exists("{$this->path}/$name.idx-shm")) unlink("{$this->path}/{$name}.idx-shm");
        if (file_exists("{$this->path}/$name.idx-wal")) unlink("{$this->path}/{$name}.idx-wal");
        if (file_exists("{$this->path}/$name.idx-journal")) unlink("{$this->path}/{$name}.idx-journal");

        unset($this->indexes[$name]);
    }

    /**
     * Checks if an index with the given name exists.
     *
     * @param string $name The name of the index to check.
     * @return bool True if the index exists, false otherwise.
     */
    public function exists(string $name): bool {
        return file_exists("{$this->path}/$name.idx");
    }
}
