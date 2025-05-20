<?php

namespace JSONStream;

class CollectionWriter {

    protected $resource;
    protected int $key = 0;

    public function __construct(string $path) {

        // Make sure we have an empty file.
        file_put_contents($path, '');

        $this->resource = fopen($path, 'wb');

        // Start the collection
        fwrite($this->resource, '[');
    }

    public function push($item): void {

        if ($this->key !== 0) {
            fwrite($this->resource, ',');
        }

        fwrite($this->resource, json_encode($item));

        $this->key++;
    }

    public function close(): void {
        // In case we attempt to close twice
        if (is_resource($this->resource)) {
            fwrite($this->resource, ']');
            fclose($this->resource);
        }
    }

    public function __destruct() {
        $this->close();
    }

}
