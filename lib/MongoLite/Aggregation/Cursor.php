<?php

namespace MongoLite\Aggregation;

use MongoLite\Collection;
use MongoLite\UtilArrayQuery;
use MongoLite\Projection;

use Exception;

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

        return $this->aggregate($data, $pipeline);
    }

    public function aggregate(array $data, array $pipeline): array {

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
                case '$project':
                    $data = $this->project($data, $stage['$project']);
                    break;
                case '$unset':
                    $data = $this->unset($data, $stage['$unset']);
                    break;
                case '$sort':
                    usort($data, $this->sort($data, $stage['$sort']));
                    break;
                case '$group':
                    $data = $this->group($data, $stage['$group']);
                    break;
                case '$sample':
                    $data = $this->sample($data, $stage['$sample']);
                    break;
                case '$facet':
                    $data = $this->facet($data, $stage['$facet']);
                    break;
                case '$bucket':
                    $data = $this->bucket($data, $stage['$bucket']);
                    break;
                case '$unwind':
                    $data = $this->unwind($data, $stage['$unwind']);
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

    // stages methods

    protected function project(array $data, array $fields): array {
        return Projection::onDocuments($data, $fields);
    }

    protected function unsetFields(array $data, array $fieldsToUnset): array {
        $fields = [];
        foreach ($fieldsToUnset as $field) $fields[$field] = 0;
        return Projection::onDocuments($data, $fields);
    }

    private function group(array $data, array $groupDefinition): array {
        $groups = [];

        foreach ($data as $document) {
            $key = "";

            if (is_array($groupDefinition['_id'])) {
                // Multiple field group definition (e.g. ['category' => '$category', 'product' => '$product'])
                $keyParts = [];
                foreach ($groupDefinition['_id'] as $field => $expression) {
                    $keyParts[] = isset($document[trim($expression, '$')]) ? $document[trim($expression, '$')] : null;
                }
                $key = implode('-', $keyParts);
            } elseif (is_string($groupDefinition['_id']) && str_starts_with($groupDefinition['_id'], '$')) {
                // Single field group definition (e.g. "$category")
                $fieldName = trim($groupDefinition['_id'], '$');
                $key = $document[$fieldName] ?? '';
            }

            if (!isset($groups[$key])) {
                if (is_array($groupDefinition['_id'])) {
                    $groups[$key] = ['_id' => array_combine(array_keys($groupDefinition['_id']), explode('-', $key))];
                } else {
                    $groups[$key] = ['_id' => $key];
                }
            }

            foreach ($groupDefinition as $fieldName => $accumulatorDefinition) {
                if ($fieldName !== '_id') {
                    $accumulator = key($accumulatorDefinition);
                    $valueField = current($accumulatorDefinition);

                    switch ($accumulator) {
                        case '$sum':
                            if (!isset($groups[$key][$fieldName])) {
                                $groups[$key][$fieldName] = 0;
                            }
                            $groups[$key][$fieldName] += $document[$valueField];
                            break;

                        case '$avg':
                            // For average, we need to maintain a sum and a count
                            if (!isset($groups[$key]["{$fieldName}_sum"])) {
                                $groups[$key]["{$fieldName}_sum"] = 0;
                                $groups[$key]["{$fieldName}_count"] = 0;
                            }
                            $groups[$key]["{$fieldName}_sum"] += $document[$valueField];
                            $groups[$key]["{$fieldName}_count"]++;
                            $groups[$key][$fieldName] = $groups[$key]["{$fieldName}_sum"] / $groups[$key]["{$fieldName}_count"];
                            break;

                        case '$min':
                            if (!isset($groups[$key][$fieldName]) || $document[$valueField] < $groups[$key][$fieldName]) {
                                $groups[$key][$fieldName] = $document[$valueField];
                            }
                            break;

                        case '$max':
                            if (!isset($groups[$key][$fieldName]) || $document[$valueField] > $groups[$key][$fieldName]) {
                                $groups[$key][$fieldName] = $document[$valueField];
                            }
                            break;

                        case '$push':
                            if (!isset($groups[$key][$fieldName])) {
                                $groups[$key][$fieldName] = [];
                            }
                            $groups[$key][$fieldName][] = $document[$valueField];
                            break;

                        case '$addToSet':
                            if (!isset($groups[$key][$fieldName])) {
                                $groups[$key][$fieldName] = [];
                            }
                            if (!in_array($document[$valueField], $groups[$key][$fieldName])) {
                                $groups[$key][$fieldName][] = $document[$valueField];
                            }
                            break;
                    }
                }
            }
        }

        // Cleanup any intermediate values used for calculations
        foreach ($groups as &$group) {
            foreach ($groupDefinition as $fieldName => $accumulatorDefinition) {
                if ($fieldName !== '_id') {
                    unset($group["{$fieldName}_sum"], $group["{$fieldName}_count"]);
                }
            }
        }

        return array_values($groups);
    }

    protected function sort(array $data, array $sortFields): array {
        usort($data, function ($a, $b) use ($sortFields) {
            foreach ($sortFields as $field => $order) {
                if ($a[$field] < $b[$field]) return -1 * $order;
                if ($a[$field] > $b[$field]) return 1 * $order;
            }
            return 0;
        });
        return $data;
    }

    protected function sample(array $data, array $sampleParameters): array {
        shuffle($data);
        return array_slice($data, 0, $sampleParameters['size']);
    }

    protected function facet(array $data, array $facetDefinitions): array {
        $facetResult = [];
        foreach ($facetDefinitions as $outputField => $pipeline) {
            $facetResult[$outputField] = $this->aggregate($data, $pipeline);
        }
        return [$facetResult];
    }

    protected function lookup(array $data, array $lookupDefinition): array {
        $fromData = $lookupDefinition['from'];
        $localField = $lookupDefinition['localField'];
        $foreignField = $lookupDefinition['foreignField'];
        $as = $lookupDefinition['as'];
        foreach ($data as &$document) {
            $document[$as] = [];
            foreach ($fromData as $fromDocument) {
                if ($document[$localField] == $fromDocument[$foreignField]) {
                    $document[$as][] = $fromDocument;
                }
            }
        }
        return $data;
    }

    protected function bucket(array $data, array $bucketDefinition): array {

        if (!isset($bucketDefinition['groupBy'], $bucketDefinition['boundaries'], $bucketDefinition['output'])) {
            throw new Exception("The \$bucket stage requires 'groupBy', 'boundaries', and 'output' parameters.");
        }

        $groupBy = $bucketDefinition['groupBy'];
        $boundaries = $bucketDefinition['boundaries'];
        $output = $bucketDefinition['output'];

        $buckets = [];

        foreach ($boundaries as $i => $boundary) {
            if (isset($boundaries[$i + 1])) {
                $buckets[] = [
                    'min' => $boundary,
                    'max' => $boundaries[$i + 1],
                    'items' => []
                ];
            }
        }

        foreach ($data as $document) {
            foreach ($buckets as &$bucket) {
                if ($document[$groupBy] >= $bucket['min'] && $document[$groupBy] < $bucket['max']) {
                    $bucket['items'][] = $document;
                }
            }
        }

        foreach ($buckets as &$bucket) {
            foreach ($output as $field => $operation) {
                $accumulator = key($operation);
                $value = current($operation);

                switch ($accumulator) {
                    case '$sum':
                        $bucket[$field] = array_sum(array_column($bucket['items'], $value));
                        break;

                    case '$avg':
                        $values = array_column($bucket['items'], $value);
                        $bucket[$field] = array_sum($values) / count($values);
                        break;

                    case '$min':
                        $values = array_column($bucket['items'], $value);
                        $bucket[$field] = min($values);
                        break;

                    case '$max':
                        $values = array_column($bucket['items'], $value);
                        $bucket[$field] = max($values);
                        break;

                    case '$push':
                        $bucket[$field] = array_column($bucket['items'], $value);
                        break;

                    case '$addToSet':
                        $bucket[$field] = array_unique(array_column($bucket['items'], $value));
                        break;

                    default:
                        throw new Exception("Unknown accumulator {$accumulator} in \$bucket stage");
                }
            }
            unset($bucket['items']);
        }

        return $buckets;
    }

    protected function unwind(array $data, array|string $unwindOptions): array {

        $result = [];

        if (is_string($unwindOptions)) {
            $path = $unwindOptions;
            $preserve = false;
            $includeArrayIndex = null;
        } else {
            $path = $unwindOptions['path'];
            $preserve = $unwindOptions['preserveNullAndEmptyArrays'] ?? false;
            $includeArrayIndex = $unwindOptions['includeArrayIndex'] ?? null;
        }

        // Ensure the field starts with $
        if (!str_starts_with($path, '$')) {
            throw new Exception("Unwind field should start with a $");
        }

        // Extract the field name from the expression
        $fieldName = substr($path, 1);

        foreach ($data as $document) {
            if (isset($document[$fieldName]) && is_array($document[$fieldName])) {
                if (count($document[$fieldName]) === 0 && $preserve) {
                    $result[] = $document;
                    unset($result[count($result) - 1][$fieldName]);
                } else {
                    foreach ($document[$fieldName] as $index => $item) {
                        $newDocument = $document;
                        $newDocument[$fieldName] = $item;
                        if ($includeArrayIndex !== null) {
                            $newDocument[$includeArrayIndex] = $index;
                        }
                        $result[] = $newDocument;
                    }
                }
            } elseif ($preserve) {
                $newDocument = $document;
                unset($newDocument[$fieldName]);
                $result[] = $newDocument;
            }
        }

        return $result;
    }

}
