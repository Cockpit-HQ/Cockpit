<?php

class DeepArrayIterator
{
    private $array;
    private $currentPath = [];

    public function __construct(array &$array) {
        $this->array = &$array;
    }

    public function iterate(callable $callback) {
        $this->deepIterate($this->array, $this->currentPath, $callback);
    }

    private function deepIterate(array &$array, array $currentPath, callable $callback) {

        foreach ($array as $key => &$value) {
            $newPath = $currentPath;
            $newPath[] = $key;

            $callback($value, $key, $newPath, $array);

            if (is_array($value)) {
                $this->deepIterate($value, $newPath, $callback);
            }
        }
    }

    public static function loop(array &$array, callable $callback) {
        $iterator = new DeepArrayIterator($array);
        $iterator->iterate($callback);
        return $array;
    }
}

