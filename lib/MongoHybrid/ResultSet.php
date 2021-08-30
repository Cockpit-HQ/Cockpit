<?php

namespace MongoHybrid;

class ResultSet extends \ArrayObject {

    /** Driver */
    protected Mongo|MongoLite $driver;

    /** @var array - Collection docs cache */
    protected array $cache = [];

    /**
     * Constructor
     * @param $driver
     * @param iterable $documents
     */
    public function __construct(Mongo|MongoLite $driver, array &$documents) {

        $this->driver = $driver;
        $this->cache  = [];

        parent::__construct($documents);
    }

    public function hasOne(array $collections): void {

        foreach ($this as &$doc) {

            foreach ($collections as $fkey => $collection) {

                if (isset($doc[$fkey]) && $doc[$fkey]) {

                    if (!isset($this->cache[$collection][$doc[$fkey]])) {
                        $this->cache[$collection][$doc[$fkey]] = $this->driver->findOneById($collection, $doc[$fkey]);
                    }

                    $doc[$fkey] = $this->cache[$collection][$doc[$fkey]];
                }
            }
        }

    }

    public function hasMany(array $collections): void {

        foreach ($this as &$doc) {

            if (isset($doc['_id'])) {

                foreach ($collections as $collection => $fkey) {

                    $doc[$collection] = $this->driver->find($collection, ['filter' => [$fkey=>$doc['_id']]]);
                }
            }
        }
    }

    public function toArray(): array {
        return $this->getArrayCopy();
    }

    public function __toString(): string {
        return json_encode($this->getArrayCopy());
    }
}
