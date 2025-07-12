<?php

namespace MongoLite\Aggregation;

use Iterator;
use MongoLite\Collection;
use MongoLite\UtilArrayQuery;
use MongoLite\Projection;

use Exception;
use Throwable;

class Cursor implements Iterator {

    protected bool|int $position = false;
    protected array $data = [];
    protected array $pipeline;
    protected Collection $collection;

    public function __construct(Collection $collection, array $pipeline) {
        $this->collection = $collection;
        $this->pipeline = $pipeline;
    }

    /**
     * Executes the pipeline if needed and returns all results as an array.
     */
    public function toArray(): array {
        if ($this->position === false) {
            $this->getData(); // Ensure data is loaded
        }
        return $this->data;
    }

    /**
     * Internal method to fetch initial data and run the aggregation pipeline.
     * Handles lazy loading trigger.
     */
    protected function getData(): array {
        $filter = [];
        $pipeline = $this->pipeline;

        if (isset($pipeline[0]['$match'])) {
            $filter = $pipeline[0]['$match'];
            array_shift($pipeline);
        }

        $data = $this->collection->find($filter)->toArray();

        // Process the rest of the pipeline
        try {
            $this->data = $this->aggregate($data, $pipeline);
        } catch (Throwable $e) {
            error_log("Aggregation Error in pipeline: " . $e->getMessage());
            $this->data = []; // Clear data on error
            throw $e; // Re-throw
        }

        $this->position = 0; // Mark data as loaded and set initial position
        return $this->data;
    }

    /**
     * Iterates through pipeline stages and applies them sequentially.
     */
    public function aggregate(array $data, array $pipeline): array {
        foreach ($pipeline as $stage) {
            $op = array_key_first($stage);
            if (!$op || !is_string($op) || !str_starts_with($op, '$')) continue;

            $stageDefinition = $stage[$op];

            switch ($op) {
                case '$match':
                    $filterFn = UtilArrayQuery::getFilterFunction($stageDefinition);
                    $data = array_filter($data, $filterFn);
                    $data = array_values($data); // Re-index
                    break;
                case '$skip':
                    $data = array_slice($data, intval($stageDefinition));
                    break;
                case '$limit':
                    $data = array_slice($data, 0, intval($stageDefinition));
                    break;
                case '$project':
                    // Delegate to the refactored Projection class
                    $data = Projection::onDocuments($data, $stageDefinition);
                    break;
                case '$unset':
                    $data = $this->unsetFields($data, $stageDefinition);
                    break;
                case '$sort':
                    usort($data, $this->buildSortComparator($stageDefinition));
                    break;
                case '$group':
                    $data = $this->group($data, $stageDefinition);
                    break;
                case '$sample':
                    $data = $this->sample($data, $stageDefinition);
                    break;
                case '$facet':
                    $data = $this->facet($data, $stageDefinition);
                    break;
                case '$bucket':
                    $data = $this->bucket($data, $stageDefinition);
                    break;
                case '$unwind':
                    $data = $this->unwind($data, $stageDefinition);
                    break;
                case '$lookup':
                    $data = $this->lookup($data, $stageDefinition);
                    break;
                case '$addFields':
                    $data = $this->addFields($data, $stageDefinition);
                    break;
                case '$count':
                    $data = $this->countDocuments($data, $stageDefinition);
                    break;
                case '$sortByCount':
                    $data = $this->sortByCount($data, $stageDefinition);
                    break;
                case '$out':
                    $data = $this->out($data, $stageDefinition);
                    break;
                case '$merge':
                    $data = $this->merge($data, $stageDefinition);
                    break;
                case '$geoNear':
                    $data = $this->geoNear($data, $stageDefinition);
                    break;
                default:
                    throw new Exception("Unsupported aggregation stage: {$op}");
            }
            // Optimization: Stop processing if data is empty (for most stages)
            if (empty($data) && !in_array($op, ['$lookup', '$group', '$facet', '$bucket', '$sortByCount', '$count', '$out', '$merge'])) {
                break;
            }
        }
        return $data;
    }

    // --- Iterator Implementation ---

    public function rewind(): void {

        if ($this->position !== false) {
            $this->position = 0;
        } else {
            // Ensure data is loaded if rewind() is called before iteration
            $this->valid();
            if ($this->position !== false) $this->position = 0;
        }
    }

    public function current(): mixed {
        if ($this->position === false) $this->valid(); // Load data if needed
        return $this->data[$this->position] ?? null;
    }

    public function key(): ?int {
        if ($this->position === false) $this->valid(); // Load data if needed
        return $this->position !== false ? $this->position : null;
    }

    public function next(): void {
        if ($this->position === false) $this->valid(); // Load data if needed
        if (is_int($this->position)) ++$this->position;
    }

    /**
     * Checks if current position is valid. Triggers lazy loading via getData().
     */
    public function valid(): bool {
        // Lazy loading: Process data only when first needed
        if ($this->position === false) {
            $this->getData(); // Sets $this->data and $this->position
        }
        return isset($this->data[$this->position]);
    }

    // --- Stage Implementation Methods ---

    /**
     * Handles the $unset stage using ValueAccessor::unset.
     */
    protected function unsetFields(array $data, array|string $fieldsToUnset): array {
        if (is_string($fieldsToUnset)) $fieldsToUnset = [$fieldsToUnset];
        $result = [];
        foreach ($data as $document) {
            $newDoc = $document;
            foreach ($fieldsToUnset as $fieldPath) {
                $path = ltrim((string)$fieldPath, '$');
                if (!empty($path)) ValueAccessor::unset($newDoc, $path);
            }
            $result[] = $newDoc;
        }
        return $result;
    }

    /**
     * Builds a comparator function for usort using UtilArrayQuery::getNestedValue.
     */
    protected function buildSortComparator(array $sortFields): callable {
        return function ($a, $b) use ($sortFields) {
            foreach ($sortFields as $fieldPath => $order) {
                $direction = ($order === -1 || strtolower($order ?? '') === 'desc') ? -1 : 1;
                $valueA = UtilArrayQuery::getNestedValue($a, $fieldPath);
                $valueB = UtilArrayQuery::getNestedValue($b, $fieldPath);
                // Add MongoDB type comparison logic here if needed for full fidelity
                if ($valueA < $valueB) return -1 * $direction;
                if ($valueA > $valueB) return 1 * $direction;
            }
            return 0;
        };
    }

    /**
     * Handles the $group stage using UtilArrayQuery for expression evaluation.
     */
    protected function group(array $data, array $groupDefinition): array {
        $groups = [];

        if (!array_key_exists('_id', $groupDefinition)) {
            throw new Exception("\$group requires '_id'.");
        }

        $idExpression = $groupDefinition['_id'];

        foreach ($data as $document) {
            // Evaluate _id expression
            $idValue = UtilArrayQuery::evaluateExpressionOperands($idExpression, $document); // Use operand eval helper

            $key = is_scalar($idValue) ? (string)$idValue : json_encode($idValue);
            // Handle NaN key...

            if (!isset($groups[$key])) {
                $groups[$key] = ['_id' => $idValue];
                // Initialize necessary accumulator states (e.g., for $avg)
                foreach ($groupDefinition as $outField => $accDef) {
                    if ($outField !== '_id' && is_array($accDef) && key($accDef) === '$avg') {
                        $groups[$key]["{$outField}_sum"] = 0;
                        $groups[$key]["{$outField}_count"] = 0;
                    }
                }
            }

            // Process accumulators
            foreach ($groupDefinition as $outputField => $accumulatorDefinition) {
                if ($outputField === '_id' || !is_array($accumulatorDefinition) || empty($accumulatorDefinition)) continue;
                $accumulator = key($accumulatorDefinition);
                $inputExpression = current($accumulatorDefinition);
                // Evaluate input expression for the accumulator
                $value = UtilArrayQuery::evaluateExpressionOperands($inputExpression, $document); // Use operand eval helper

                // Apply accumulator logic (using $value)
                switch ($accumulator) {
                    case '$sum':
                        $groups[$key][$outputField] = ($groups[$key][$outputField] ?? 0) + (is_numeric($value) ? $value : 0);
                        break;
                    case '$avg':
                        if (is_numeric($value)) {
                            $groups[$key]["{$outputField}_sum"] += $value;
                            $groups[$key]["{$outputField}_count"]++;
                        }
                        break;
                    case '$min':
                        if ($value !== null && (!isset($groups[$key][$outputField]) || $value < $groups[$key][$outputField])) {
                            $groups[$key][$outputField] = $value;
                        } elseif (!isset($groups[$key][$outputField])) {
                            $groups[$key][$outputField] = null;
                        }
                        break;
                    case '$max':
                        if ($value !== null && (!isset($groups[$key][$outputField]) || $value > $groups[$key][$outputField])) {
                            $groups[$key][$outputField] = $value;
                        } elseif (!isset($groups[$key][$outputField])) {
                            $groups[$key][$outputField] = null;
                        }
                        break;
                    case '$push':
                        if (!isset($groups[$key][$outputField])) $groups[$key][$outputField] = [];
                        $groups[$key][$outputField][] = $value;
                        break;
                    case '$addToSet':
                        if (!isset($groups[$key][$outputField])) $groups[$key][$outputField] = [];
                        // Simple check; consider more robust uniqueness for objects/arrays if needed
                        if (!in_array($value, $groups[$key][$outputField], true)) {
                            $groups[$key][$outputField][] = $value;
                        }
                        break;
                    case '$first':
                        // Only set if not already set (preserve first value)
                        if (!isset($groups[$key][$outputField])) {
                            $groups[$key][$outputField] = $value;
                        }
                        break;
                    case '$last':
                        // Always update to latest value
                        $groups[$key][$outputField] = $value;
                        break;
                    case '$stdDevPop':
                    case '$stdDevSamp':
                        // Initialize tracking arrays for standard deviation
                        if (!isset($groups[$key]["{$outputField}_values"])) {
                            $groups[$key]["{$outputField}_values"] = [];
                        }
                        if (is_numeric($value)) {
                            $groups[$key]["{$outputField}_values"][] = $value;
                        }
                        break;
                    default:
                        throw new Exception("Unsupported accumulator: {$accumulator}");
                }
            }
        }

        // Finalize accumulators (like $avg, $stdDevPop, $stdDevSamp) and cleanup intermediate fields
        foreach ($groups as &$group) {
            foreach ($groupDefinition as $outputField => $accumulatorDefinition) {
                if ($outputField !== '_id' && is_array($accumulatorDefinition)) {
                    $accumulator = key($accumulatorDefinition);
                    
                    if ($accumulator === '$avg') {
                        $count = $group["{$outputField}_count"];
                        $group[$outputField] = ($count > 0) ? ($group["{$outputField}_sum"] / $count) : null;
                        unset($group["{$outputField}_sum"], $group["{$outputField}_count"]);
                    } elseif ($accumulator === '$stdDevPop' || $accumulator === '$stdDevSamp') {
                        $values = $group["{$outputField}_values"] ?? [];
                        $n = count($values);
                        
                        if ($n > 0) {
                            // Calculate mean
                            $mean = array_sum($values) / $n;
                            
                            // Calculate variance
                            $variance = 0;
                            foreach ($values as $value) {
                                $variance += pow($value - $mean, 2);
                            }
                            
                            // Population vs Sample standard deviation
                            if ($accumulator === '$stdDevPop') {
                                $variance = $n > 0 ? $variance / $n : 0;
                            } else { // $stdDevSamp
                                $variance = $n > 1 ? $variance / ($n - 1) : null;
                            }
                            
                            $group[$outputField] = $variance !== null ? sqrt($variance) : null;
                        } else {
                            $group[$outputField] = null;
                        }
                        
                        unset($group["{$outputField}_values"]);
                    }
                }
            }
        }
        unset($group); // Break reference

        return array_values($groups);
    }

    /**
     * Handles the $sample stage.
     */
    protected function sample(array $data, array $sampleParameters): array {
        if (empty($data)) return [];
        if (!isset($sampleParameters['size']) || !is_int($sampleParameters['size']) || $sampleParameters['size'] < 0) {
            throw new Exception("\$sample requires a positive integer 'size'.");
        }
        $size = $sampleParameters['size'];
        if ($size === 0) return [];
        if ($size >= count($data)) {
            shuffle($data);
            return $data;
        }

        $randomKeys = array_rand($data, $size);
        $result = [];
        if (is_array($randomKeys)) {
            foreach ($randomKeys as $key) $result[] = $data[$key];
        } else {
            $result[] = $data[$randomKeys];
        } // Single key case
        return $result;
    }

    /**
     * Handles the $facet stage by running sub-pipelines.
     */
    protected function facet(array $data, array $facetDefinitions): array {
        $facetResult = [];
        foreach ($facetDefinitions as $outputField => $pipeline) {
            if (!is_array($pipeline)) throw new Exception("Pipeline for facet '{$outputField}' must be an array.");
            // Run sub-pipeline on a *copy* of the data
            $facetResult[$outputField] = $this->aggregate(array_merge([], $data), $pipeline);
        }
        return [$facetResult]; // Facet returns a single document containing results
    }

    /**
     * Handles the $lookup stage using UtilArrayQuery::getNestedValue.
     */
    protected function lookup(array $data, array $lookupDefinition): array {
        $required = ['from', 'localField', 'foreignField', 'as'];
        foreach ($required as $field) if (!isset($lookupDefinition[$field])) throw new Exception("\$lookup needs '{$field}'.");

        $fromData = $lookupDefinition['from'];
        $localFieldPath = $lookupDefinition['localField'];
        $foreignFieldPath = $lookupDefinition['foreignField'];
        $as = $lookupDefinition['as'];
        if (!is_array($fromData)) throw new Exception("'from' must be an array.");

        // Index foreign data for faster lookup
        $foreignMap = [];
        foreach ($fromData as $fromDocument) {
            $foreignValue = UtilArrayQuery::getNestedValue($fromDocument, $foreignFieldPath);
            if ($foreignValue !== null) {
                $key = is_scalar($foreignValue) ? $foreignValue : json_encode($foreignValue);
                if (!isset($foreignMap[$key])) $foreignMap[$key] = [];
                $foreignMap[$key][] = $fromDocument;
            }
        }

        // Perform the join
        $result = [];
        foreach ($data as $document) {
            $newDocument = $document;
            $localValue = UtilArrayQuery::getNestedValue($document, $localFieldPath);
            $lookupKey = is_scalar($localValue) ? $localValue : json_encode($localValue);
            $newDocument[$as] = ($localValue !== null && isset($foreignMap[$lookupKey])) ? $foreignMap[$lookupKey] : [];
            $result[] = $newDocument;
        }
        return $result;
    }

    /**
     * Handles the $bucket stage using UtilArrayQuery for expression evaluation.
     */
    protected function bucket(array $data, array $bucketDefinition): array {
        if (!isset($bucketDefinition['groupBy'], $bucketDefinition['boundaries'], $bucketDefinition['output'])) throw new Exception("\$bucket needs 'groupBy', 'boundaries', 'output'.");
        if (!is_array($bucketDefinition['boundaries']) || count($bucketDefinition['boundaries']) < 2) throw new Exception("'boundaries' needs array with >= 2 elements.");

        $groupByExpr = $bucketDefinition['groupBy'];
        $boundaries = $bucketDefinition['boundaries'];
        sort($boundaries);
        $outputDef = $bucketDefinition['output'];
        $defaultBucketId = $bucketDefinition['default'] ?? null;
        $hasDefaultBucket = ($defaultBucketId !== null);

        // Initialize buckets
        $buckets = [];
        $numBoundaries = count($boundaries);
        for ($i = 0; $i < $numBoundaries - 1; $i++) {
            $buckets[] = ['_id' => $boundaries[$i], 'min' => $boundaries[$i], 'max' => $boundaries[$i + 1], 'items' => []];
        }
        $defaultBucketItems = [];

        // Assign documents to buckets
        foreach ($data as $document) {
            $value = UtilArrayQuery::evaluateExpressionOperands($groupByExpr, $document); // Evaluate groupBy
            $assigned = false;
            if ($value !== null) { // Compare based on type if needed
                foreach ($buckets as &$bucket) {
                    if ($value >= $bucket['min'] && $value < $bucket['max']) {
                        $bucket['items'][] = $document;
                        $assigned = true;
                        break;
                    }
                }
                unset($bucket);
            }
            if (!$assigned && $hasDefaultBucket) $defaultBucketItems[] = $document;
        }

        // Process outputs for each bucket
        $resultBuckets = [];
        foreach ($buckets as $bucket) { // Regular buckets
            if (!empty($bucket['items'])) {
                $processedBucket = ['_id' => $bucket['_id']];
                $this->calculateBucketOutput($processedBucket, $outputDef, $bucket['items']);
                $resultBuckets[] = $processedBucket;
            }
        }
        if ($hasDefaultBucket && !empty($defaultBucketItems)) { // Default bucket
            $defaultResult = ['_id' => $defaultBucketId];
            $this->calculateBucketOutput($defaultResult, $outputDef, $defaultBucketItems);
            $resultBuckets[] = $defaultResult;
        }

        // Sort results by _id
        usort($resultBuckets, fn($a, $b) => (is_numeric($a['_id']) && is_numeric($b['_id'])) ? ($a['_id'] <=> $b['_id']) : strcmp((string)$a['_id'], (string)$b['_id']));
        return $resultBuckets;
    }

    /**
     * Helper for $bucket stage - calculates outputs using UtilArrayQuery.
     */
    protected function calculateBucketOutput(array &$processedBucket, array $outputDef, array $items): void {
        foreach ($outputDef as $field => $operation) {
            if ($field === '_id' || !is_array($operation) || empty($operation)) continue;
            $accumulator = key($operation);
            $inputExpr = current($operation);

            // Apply accumulator logic using evaluated input expression
            switch ($accumulator) {
                case '$sum':
                case '$avg':
                    $sum = 0;
                    $count = 0;
                    foreach ($items as $item) {
                        $val = UtilArrayQuery::evaluateExpressionOperands($inputExpr, $item);
                        if (is_numeric($val)) {
                            $sum += $val;
                            $count++;
                        }
                    }
                    $processedBucket[$field] = ($accumulator === '$sum') ? $sum : (($count > 0) ? ($sum / $count) : null);
                    break;
                case '$min':
                case '$max':
                    $aggValue = null;
                    $isMin = ($accumulator === '$min');
                    foreach ($items as $item) {
                        $val = UtilArrayQuery::evaluateExpressionOperands($inputExpr, $item);
                        if ($val !== null) {
                            if ($aggValue === null || ($isMin && $val < $aggValue) || (!$isMin && $val > $aggValue)) {
                                $aggValue = $val;
                            }
                        }
                    }
                    $processedBucket[$field] = $aggValue;
                    break;
                case '$push':
                    $processedBucket[$field] = array_map(fn($item) => UtilArrayQuery::evaluateExpressionOperands($inputExpr, $item), $items);
                    break;
                case '$addToSet':
                    $values = [];
                    $uniqueCheck = [];
                    foreach ($items as $item) {
                        $val = UtilArrayQuery::evaluateExpressionOperands($inputExpr, $item);
                        $key = is_scalar($val) ? (string)$val : json_encode($val);
                        if (!isset($uniqueCheck[$key])) {
                            $values[] = $val;
                            $uniqueCheck[$key] = true;
                        }
                    }
                    $processedBucket[$field] = $values;
                    break;
                case '$first':
                    $processedBucket[$field] = null;
                    foreach ($items as $item) {
                        $val = UtilArrayQuery::evaluateExpressionOperands($inputExpr, $item);
                        $processedBucket[$field] = $val;
                        break; // Take only the first value
                    }
                    break;
                case '$last':
                    $processedBucket[$field] = null;
                    foreach ($items as $item) {
                        $val = UtilArrayQuery::evaluateExpressionOperands($inputExpr, $item);
                        $processedBucket[$field] = $val; // Keep overwriting to get the last
                    }
                    break;
                case '$stdDevPop':
                case '$stdDevSamp':
                    $values = [];
                    foreach ($items as $item) {
                        $val = UtilArrayQuery::evaluateExpressionOperands($inputExpr, $item);
                        if (is_numeric($val)) {
                            $values[] = $val;
                        }
                    }
                    
                    $n = count($values);
                    if ($n > 0) {
                        $mean = array_sum($values) / $n;
                        $variance = 0;
                        foreach ($values as $value) {
                            $variance += pow($value - $mean, 2);
                        }
                        
                        if ($accumulator === '$stdDevPop') {
                            $variance = $n > 0 ? $variance / $n : 0;
                        } else { // $stdDevSamp
                            $variance = $n > 1 ? $variance / ($n - 1) : null;
                        }
                        
                        $processedBucket[$field] = $variance !== null ? sqrt($variance) : null;
                    } else {
                        $processedBucket[$field] = null;
                    }
                    break;
                default:
                    throw new Exception("Unknown bucket accumulator: {$accumulator}");
            }
        }
    }

    /**
     * Handles the $unwind stage using UtilArrayQuery::getNestedValue and ValueAccessor.
     */
    protected function unwind(array $data, array|string $unwindOptions): array {
        // Normalize options...
        if (is_string($unwindOptions)) {
            $pathExpr = $unwindOptions;
            $preserve = false;
            $includeArrayIndex = null;
        } elseif (is_array($unwindOptions)) {
            $pathExpr = $unwindOptions['path'] ?? null;
            $preserve = $unwindOptions['preserveNullAndEmptyArrays'] ?? false;
            $includeArrayIndex = $unwindOptions['includeArrayIndex'] ?? null;
        } else throw new Exception("Invalid \$unwind options.");
        if (!$pathExpr || !is_string($pathExpr) || !str_starts_with($pathExpr, '$')) throw new Exception("\$unwind 'path' must be a string starting with $");
        $fieldPath = substr($pathExpr, 1);

        $result = [];
        foreach ($data as $document) {
            $valueToUnwind = UtilArrayQuery::getNestedValue($document, $fieldPath); // Use getter

            if (is_array($valueToUnwind)) {
                if (!empty($valueToUnwind)) {
                    $isList = array_keys($valueToUnwind) === range(0, count($valueToUnwind) - 1);
                    foreach ($valueToUnwind as $index => $item) {
                        $newDocument = $document;
                        ValueAccessor::set($newDocument, $fieldPath, $item); // Use setter
                        if ($includeArrayIndex !== null) $newDocument[$includeArrayIndex] = $isList ? $index : (string)$index;
                        $result[] = $newDocument;
                    }
                } elseif ($preserve) {
                    $newDocument = $document;
                    ValueAccessor::unset($newDocument, $fieldPath); // Use unsetter
                    if ($includeArrayIndex !== null) $newDocument[$includeArrayIndex] = null;
                    $result[] = $newDocument;
                }
            } elseif ($preserve) {
                $newDocument = $document;
                ValueAccessor::unset($newDocument, $fieldPath); // Use unsetter
                if ($includeArrayIndex !== null) $newDocument[$includeArrayIndex] = null;
                $result[] = $newDocument;
            }
        }

        return $result;
    }

    /**
     * Handles the $addFields stage using UtilArrayQuery and ValueAccessor.
     */
    protected function addFields(array $data, array $fieldsToAdd): array {
        $result = [];
        foreach ($data as $document) {
            $newDoc = $document;
            foreach ($fieldsToAdd as $field => $expression) {
                // Evaluate expression and set using ValueAccessor
                $value = UtilArrayQuery::evaluateExpressionOperands($expression, $document);
                ValueAccessor::set($newDoc, $field, $value);
            }
            $result[] = $newDoc;
        }
        return $result;
    }

    /**
     * Handles the $count stage.
     */
    protected function countDocuments(array $data, string $outputFieldName): array {
        if (!is_string($outputFieldName) || empty($outputFieldName)) throw new Exception("\$count needs non-empty string output field name.");
        return [[$outputFieldName => count($data)]]; // Return single document array
    }

    /**
     * Handles the $sortByCount stage by combining group and sort logic.
     */
    protected function sortByCount(array $data, mixed $groupByExpression): array {
        $groupedData = $this->group($data, ['_id' => $groupByExpression, 'count' => ['$sum' => 1]]);
        usort($groupedData, $this->buildSortComparator(['count' => -1]));
        return $groupedData;
    }

    /**
     * Handles the $out stage - writes results to a new collection.
     * MongoDB compatibility: replaces the target collection entirely.
     */
    protected function out(array $data, string $outputCollection): array {
        if (empty($outputCollection) || !is_string($outputCollection)) {
            throw new Exception('$out requires a valid collection name');
        }

        // Get the database instance from the collection
        $database = $this->collection->getDatabase();
        
        // Sanitize collection name to prevent SQL injection
        $sanitizedName = $database->sanitizeCollectionName($outputCollection);
        if ($sanitizedName === null) {
            throw new Exception("Invalid collection name for \$out: {$outputCollection}");
        }

        // Drop existing collection if it exists
        if (in_array($sanitizedName, $database->getCollectionNames())) {
            $database->selectCollection($sanitizedName)->drop();
        }

        // Create new collection and insert all documents
        $database->createCollection($sanitizedName);
        $targetCollection = $database->selectCollection($sanitizedName);
        
        foreach ($data as $document) {
            $targetCollection->insert($document);
        }

        // $out returns an empty result set
        return [];
    }

    /**
     * Handles the $merge stage - merges results into an existing collection.
     * MongoDB compatibility: supports whenMatched and whenNotMatched options.
     */
    protected function merge(array $data, array $mergeDefinition): array {
        if (!isset($mergeDefinition['into'])) {
            throw new Exception('$merge requires "into" field specifying target collection');
        }

        $targetCollection = $mergeDefinition['into'];
        $whenMatched = $mergeDefinition['whenMatched'] ?? 'merge';
        $whenNotMatched = $mergeDefinition['whenNotMatched'] ?? 'insert';
        $on = $mergeDefinition['on'] ?? '_id';

        // Get database and target collection
        $database = $this->collection->getDatabase();
        $sanitizedName = $database->sanitizeCollectionName($targetCollection);
        if ($sanitizedName === null) {
            throw new Exception("Invalid collection name for \$merge: {$targetCollection}");
        }

        // Create collection if it doesn't exist
        if (!in_array($sanitizedName, $database->getCollectionNames())) {
            $database->createCollection($sanitizedName);
        }

        $target = $database->selectCollection($sanitizedName);

        foreach ($data as $document) {
            // Build match criteria based on "on" field(s)
            $matchCriteria = [];
            if (is_array($on)) {
                foreach ($on as $field) {
                    if (isset($document[$field])) {
                        $matchCriteria[$field] = $document[$field];
                    }
                }
            } else {
                if (isset($document[$on])) {
                    $matchCriteria[$on] = $document[$on];
                }
            }

            // Check if document exists
            $existing = $target->findOne($matchCriteria);

            if ($existing) {
                // Document exists - handle whenMatched
                switch ($whenMatched) {
                    case 'merge':
                        // Merge documents (MongoDB default)
                        $merged = array_merge($existing, $document);
                        $target->update($matchCriteria, $merged);
                        break;
                    case 'replace':
                        $target->update($matchCriteria, $document);
                        break;
                    case 'keepExisting':
                        // Do nothing
                        break;
                    case 'fail':
                        throw new Exception('$merge failed: duplicate key violation');
                    default:
                        throw new Exception("Unsupported whenMatched option: {$whenMatched}");
                }
            } else {
                // Document doesn't exist - handle whenNotMatched
                switch ($whenNotMatched) {
                    case 'insert':
                        $target->insert($document);
                        break;
                    case 'discard':
                        // Do nothing
                        break;
                    case 'fail':
                        throw new Exception('$merge failed: insert into non-existent document');
                    default:
                        throw new Exception("Unsupported whenNotMatched option: {$whenNotMatched}");
                }
            }
        }

        // $merge returns an empty result set
        return [];
    }

    /**
     * Handles the $geoNear stage - finds documents near a geospatial point.
     * Returns documents sorted by distance with distance field added.
     */
    protected function geoNear(array $data, array $geoNearDefinition): array {
        if (!isset($geoNearDefinition['near'])) {
            throw new Exception('$geoNear requires "near" field with coordinates');
        }

        $near = $geoNearDefinition['near'];
        $distanceField = $geoNearDefinition['distanceField'] ?? 'distance';
        $maxDistance = $geoNearDefinition['maxDistance'] ?? null;
        $minDistance = $geoNearDefinition['minDistance'] ?? 0;
        $query = $geoNearDefinition['query'] ?? [];
        $spherical = $geoNearDefinition['spherical'] ?? true;

        // Validate near coordinates
        if (!isset($near['coordinates']) || !is_array($near['coordinates']) || count($near['coordinates']) < 2) {
            throw new Exception('$geoNear "near" must have valid coordinates array');
        }

        $nearCoords = $near['coordinates'];
        $results = [];

        foreach ($data as $document) {
            // Apply additional query filter if specified
            if (!empty($query)) {
                $filterFn = UtilArrayQuery::getFilterFunction($query);
                if (!$filterFn($document)) {
                    continue;
                }
            }

            // Find location field - try common field names
            $docCoords = null;
            foreach (['location', 'coordinates', 'loc', 'position'] as $field) {
                if (isset($document[$field]['coordinates'])) {
                    $docCoords = $document[$field]['coordinates'];
                    break;
                } elseif (isset($document[$field]) && is_array($document[$field]) && count($document[$field]) >= 2) {
                    $docCoords = $document[$field];
                    break;
                }
            }

            if ($docCoords === null || !is_array($docCoords) || count($docCoords) < 2) {
                continue; // Skip documents without valid coordinates
            }

            // Calculate distance
            $distance = \MongoLite\calculateDistanceInMeters($docCoords, $nearCoords);

            // Apply distance filters
            if ($maxDistance !== null && $distance > $maxDistance) {
                continue;
            }
            if ($minDistance !== null && $distance < $minDistance) {
                continue;
            }

            // Add distance field to document
            $resultDoc = $document;
            $resultDoc[$distanceField] = $distance;
            $results[] = $resultDoc;
        }

        // Sort by distance (ascending)
        usort($results, function($a, $b) use ($distanceField) {
            return $a[$distanceField] <=> $b[$distanceField];
        });

        return $results;
    }

}
