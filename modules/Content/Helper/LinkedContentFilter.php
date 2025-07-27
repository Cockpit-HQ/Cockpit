<?php

namespace Content\Helper;

/**
 * LinkedContentFilter Helper for Content Module
 *
 * Handles filtering on linked content fields
 * Supports syntax like: '@author.name' => 'John'
 * Or with operators: '@author.name' => ['$regex' => 'John', '$options' => 'i']
 */
class LinkedContentFilter extends \Lime\Helper {

    /**
     * Maximum depth for linked field resolution
     */
    protected int $maxDepth = 3;

    /**
     * Process filters containing linked content references (modifies filter in-place)
     *
     * @param array &$filter Original filter array (modified by reference)
     * @param array|string $model Model definition or name
     * @param array $options Options including maxDepth
     * @return array
     */
    public function process(array &$filter, $model, array $options = []): mixed
    {

        if (is_string($model)) {
            $model = $this->app->module('content')->model($model);
        }

        if (!$model || empty($filter)) {
            return $filter;
        }

        // Set max depth from options if provided
        if (isset($options['maxDepth']) && is_int($options['maxDepth']) && $options['maxDepth'] > 0) {
            $this->maxDepth = $options['maxDepth'];
        }

        $filter = $this->processFilterRecursive($filter, $model, 0);

        return $filter;
    }

    /**
     * Recursively process filters to handle nested conditions
     *
     * @param array $filter Filter array to process
     * @param array $model Model definition
     * @param int $currentDepth Current depth level
     * @return array Processed filter
     */
    protected function processFilterRecursive(array $filter, array $model, int $currentDepth = 0): array {

        $processed = [];

        foreach ($filter as $key => $value) {
            // Handle logical operators recursively
            if (in_array($key, ['$or', '$and', '$nor'])) {
                if (is_array($value)) {
                    $processed[$key] = array_map(
                        fn($condition) => $this->processFilterRecursive($condition, $model, $currentDepth),
                        $value
                    );
                } else {
                    $processed[$key] = $value;
                }
            }
            // Handle $not operator
            elseif ($key === '$not' && is_array($value)) {
                $processed[$key] = $this->processFilterRecursive($value, $model, $currentDepth);
            }
            // Handle linked fields with @ syntax
            elseif (is_string($key) && str_starts_with($key, '@')) {
                $this->processLinkedField($key, $value, $model, $processed, $currentDepth);
            }
            // Pass through regular fields
            else {
                $processed[$key] = $value;
            }
        }

        return $processed;
    }

    /**
     * Process linked field with @ syntax
     *
     * @param string $path Field path with @ prefix
     * @param mixed $value Filter value
     * @param array $model Model definition
     * @param array &$processed Processed filter array (by reference)
     * @param int $currentDepth Current depth level
     */
    protected function processLinkedField(string $path, $value, array $model, array &$processed, int $currentDepth = 0): void {

        // Check if we've exceeded max depth
        if ($currentDepth >= $this->maxDepth) {
            // Pass through the filter without processing
            $processed[$path] = $value;
            return;
        }

        // Remove @ prefix and split by dots
        $path = substr($path, 1);
        $parts = explode('.', $path);

        if (count($parts) < 2) {
            $processed['@' . $path] = $value;
            return;
        }

        $rootField = array_shift($parts);
        $fieldDef = $this->findFieldDefinition($model, $rootField);

        if (!$fieldDef || $fieldDef['type'] !== 'contentItemLink' || !isset($fieldDef['opts']['link'])) {
            // Not a content link field
            $processed['@' . $path] = $value;
            return;
        }

        // Handle the reference
        try {
            // Resolve the linked IDs
            $ids = $this->resolveLinkedIds(
                $fieldDef['opts']['link'],
                implode('.', $parts),
                $value
            );

            if (empty($ids)) {
                // No matches - use impossible condition
                $processed[$rootField . '._id'] = ['$in' => []];
            } else {
                $processed[$rootField . '._id'] = ['$in' => $ids];
            }

        } catch (\Exception $e) {
            // On error, pass through original filter
            $processed['@' . $path] = $value;
        }
    }


    /**
     * Resolve IDs from linked model
     */
    protected function resolveLinkedIds(string $modelName, string $fieldPath, $filterValue): array {

        $collection = "content/collections/{$modelName}";

        // Build filter - support both simple values and MongoDB operators
        $filter = [$fieldPath => $filterValue];

        try {
            // First check if the collection exists
            $linkedModel = $this->app->module('content')->model($modelName);
            if (!$linkedModel) {
                return [];
            }

            $items = $this->app->dataStorage->find($collection, [
                'filter' => $filter,
                'fields' => ['_id' => 1],
                'limit' => 500, // put a reasonable limit
            ])->toArray();

            return array_column($items, '_id');

        } catch (\Exception $e) {
            return [];
        }
    }

    /**
     * Find field definition in model
     */
    protected function findFieldDefinition(array $model, string $fieldName): ?array {

        foreach ($model['fields'] ?? [] as $field) {
            if ($field['name'] === $fieldName) {
                return $field;
            }
        }

        return null;
    }
}
