<?php

namespace MongoLite\Aggregation;

use MongoLite\Collection;
use MongoLite\UtilArrayQuery;

class Cursor implements \Iterator {

    protected bool|int $position = false;
    protected array $data = [];

    protected array $pipeline;
    protected Collection $collection;


    public function __construct(Collection $collection, array $pipeline) {

        $this->collection = $collection;
        $this->pipeline = $pipeline;
    }

    /**
     * Get documents matching criteria
     *
     * @return array
     */
    public function toArray(): array {
        return $this->getData();
    }


    /**
     * Get documents matching criteria
     *
     * @return array
     */
    protected function getData(): array {

        $filter = [];
        $pipeline = $this->pipeline;

        if (isset($pipeline[0]['$match'])) {
            $filter = $pipeline[0]['$match'];
            array_shift($pipeline);
        }

        $data = $this->collection->find($filter)->toArray();

        foreach ($pipeline as $stage) {

            $op = array_keys($stage)[0] ?? null;

            if (!$op) continue;

            switch ($op) {

                case '$match':
                    $fn = null;
                    eval('$fn = function($document) { return ' . UtilArrayQuery::buildCondition($stage['$match']) . '; };');
                    $data = array_filter($data, $fn);
                    break;

                case '$skip':
                    $data = array_slice($data, intval($stage['$skip']));
                    break;
                case '$limit':
                    $data = array_slice($data, 0, intval($stage['$limit']));
                    break;
                case '$sort':
                    usort($data, $this->make_cmp($stage['$sort']));
                    break;
            }
        }

        return $data;
    }

    /**
     * Iterator implementation
     */
    public function rewind(): void {

        if ($this->position !== false) {
            $this->position = 0;
        }
    }

    public function current(): array {

        return $this->data[$this->position];
    }

    public function key(): int {
        return $this->position;
    }

    public function next(): void {
        ++$this->position;
    }

    public function valid(): bool {

        if ($this->position === false) {

            $this->data     = $this->getData();
            $this->position = 0;
        }

        return isset($this->data[$this->position]);
    }

    protected function make_cmp(array $sortValues): \Closure {

        return function ($a, $b) use (&$sortValues) {

            foreach ($sortValues as $column => $sortDir) {

                $diff = strcmp($a[$column], $b[$column]);

                if ($diff !== 0) {
                    return 1 === $sortDir ? $diff : $diff * -1;
                }
            }

            return 0;
        };
    }

}