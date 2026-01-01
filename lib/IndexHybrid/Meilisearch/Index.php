<?php

namespace IndexHybrid\Meilisearch;

use IndexLite\Utils;

class Index {

    protected Manager $manager;
    private string $name;

    public function __construct(string $name, Manager $manager) {
        $this->name = $name;
        $this->manager = $manager;
    }

    /**
     * Clears all the documents from the specified index.
     *
     * @return void
     */
    public function clear(): void {
        $this->manager->sendRequest("/indexes/{$this->name}/documents", 'DELETE');
    }

    /**
     * Adds a document to the index.
     *
     * @param mixed $id The identifier of the document.
     * @param array $data The data of the document.
     * @param bool $safe Optional. Specifies whether to remove an existing document with the same ID before adding the new document. Defaults to true.
     * @return void
     */
    public function addDocument(mixed $id, array $data, bool $safe = true): void {

        if ($safe) {
            $this->removeDocument($id);
        }

        $data['id'] = $id;

        $this->addDocuments([$data]);
    }

    /**
     * Add multiple documents to the index.
     *
     * @param array $documents The documents to be added. Each document should be an associative array with the following keys:
     *                        - id (optional) : The ID of the document. If not provided, a UUID will be generated.
     *                        - ... (other fields): Other fields of the document.
     *
     * @return array The response from the manager's sendRequest() method.
     */
    public function addDocuments(array $documents) {

        foreach ($documents as &$document) {

            if (!isset($document['id'])) {
                $document['id'] = Utils::uuidv4();
            }
        }

        return $this->manager->sendRequest("/indexes/{$this->name}/documents", 'POST', $documents);
    }

    /**
     * Replace a document in the index with the given ID.
     *
     * @param mixed $id The ID of the document to be replaced.
     * @param array $document The replacement document. This should be an associative array with the following keys:
     *                        - id : The ID of the document. This should match the $id parameter.
     *                        - ... (other fields): Other fields of the replacement document.
     *
     * @return void
     */
    public function replaceDocument(mixed $id, array $document): void {
        $document['id'] = $id;
        $this->manager->sendRequest("/indexes/{$this->name}/documents", 'POST', $document);
    }

    /**
     * Remove a document from the index.
     *
     * @param mixed $id The ID of the document to be removed.
     *
     * @return array The response from the manager's sendRequest() method.
     */
    public function removeDocument(mixed $id) {
        return $this->manager->sendRequest("/indexes/{$this->name}/documents/{$id}", 'DELETE');
    }

    /**
     * Perform a search query on the specified index.
     *
     * @param string $query The search query string.
     * @param array $options [optional] An array of options for the search query:
     *     - fields: The list of fields to retrieve. It can be either a comma-separated string or an array of field names.
     *     - limit: The number of results to limit to. Defaults to 50.
     *     - offset: The number of results to skip. Defaults to 0.
     *     - filter: A filter to apply to the search results.
     * @return mixed The search results.
     */
    public function search(string $query, array $options = []) {

        $options = \array_merge([
            'fields' => '*',
            'limit' => 50,
            'offset' => 0,
            'filter' => null,
            'fuzzy' => null,
            'fuzzy_algorithm' => 'typo_tolerance',
            'fuzzy_threshold' => null,
            'fuzzy_min_score' => null,
            'boosts' => [],
            'highlights' => false,
            'typoTolerance' => null,
            'rankingScoreThreshold' => null,
            'attributesToHighlight' => null,
            'facets' => [],
            'facet_limit' => 20,
            'facet_offset' => 0,
        ], $options);
        
        // Handle parameter name conversion from snake_case to camelCase
        if (isset($options['typo_tolerance'])) {
            $options['typoTolerance'] = $options['typo_tolerance'];
        }
        if (isset($options['ranking_score_threshold'])) {
            $options['rankingScoreThreshold'] = $options['ranking_score_threshold'];
        }
        if (isset($options['attributes_to_highlight'])) {
            $options['attributesToHighlight'] = $options['attributes_to_highlight'];
        }
        
        // Note: fuzzy_algorithm, fuzzy_threshold, and fuzzy_min_score are IndexLite-specific
        // and are ignored by Meilisearch backend (they may be present in $options but won't be used)

        $params = [
            'q' => $query,
            'limit' => $options['limit'],
            'offset' => $options['offset'],
        ];

        // Handle field selection
        if ($options['fields'] !== '*') {
            $params['attributesToRetrieve'] = \is_string($options['fields']) 
                ? \array_map(fn($f) => \trim($f), \explode(',' , $options['fields'])) 
                : $options['fields'];
        }

        // Handle fuzzy search (typo tolerance)
        if ($options['fuzzy'] !== null) {
            if (\is_bool($options['fuzzy']) && $options['fuzzy']) {
                // Enable typo tolerance with default settings
                $params['typoTolerance'] = ['enabled' => true];
            } elseif (\is_int($options['fuzzy'])) {
                // Set specific typo tolerance level
                $params['typoTolerance'] = [
                    'enabled' => true,
                    'minWordSizeForTypos' => ['oneTypo' => \max(1, $options['fuzzy']), 'twoTypos' => \max(2, $options['fuzzy'] + 1)]
                ];
            }
        }
        
        // Handle direct typo tolerance parameter
        if ($options['typoTolerance'] !== null) {
            if (\is_bool($options['typoTolerance'])) {
                $params['typoTolerance'] = ['enabled' => $options['typoTolerance']];
            } elseif (\is_array($options['typoTolerance'])) {
                $params['typoTolerance'] = $options['typoTolerance'];
            }
        }
        
        // Handle ranking score threshold
        if ($options['rankingScoreThreshold'] !== null) {
            $params['rankingScoreThreshold'] = (float) $options['rankingScoreThreshold'];
        }

        // Handle field boosting
        if (!empty($options['boosts'])) {
            $params['rankingScoreThreshold'] = 0.1; // Enable score-based ranking
            // Note: Meilisearch handles boosting differently - would need index configuration
        }

        // Handle highlights
        if ($options['highlights']) {
            if ($options['attributesToHighlight'] !== null) {
                // Use specific attributes to highlight
                if (\is_string($options['attributesToHighlight'])) {
                    $params['attributesToHighlight'] = \array_map(fn($f) => \trim($f), \explode(',', $options['attributesToHighlight']));
                } elseif (\is_array($options['attributesToHighlight'])) {
                    $params['attributesToHighlight'] = $options['attributesToHighlight'];
                }
            } else {
                // Default to all fields
                $params['attributesToHighlight'] = ['*'];
            }
        }

        // Handle filters
        if ($options['filter']) {
            $params['filter'] = $options['filter'];
        }

        // Handle multi-facets
        if (!empty($options['facets']) && \is_array($options['facets'])) {
            $params['facets'] = \array_values(\array_filter($options['facets'], fn($f) => \is_string($f) && $f !== ''));
            // Ensure requested facet fields are configured as filterable attributes
            if (!empty($params['facets'])) {
                $this->ensureFilterableAttributes($params['facets'], true);
            }
        }

        // Use POST for complex queries, GET for simple ones
        $response = null;
        if (isset($params['filter']) || isset($params['typoTolerance']) || !empty($options['boosts']) || !empty($params['facets'])) {
            $response = $this->manager->sendRequest("/indexes/{$this->name}/search", 'POST', $params);
        } else {
            $queryString = \http_build_query($params);
            $response = $this->manager->sendRequest("/indexes/{$this->name}/search?{$queryString}", 'GET');
        }

        // Normalize multi-facets to unified 'facets' key (preserve original facetDistribution)
        if (!empty($options['facets']) && isset($response['facetDistribution']) && \is_array($response['facetDistribution'])) {
            $facets = [];
            $limit = (int)$options['facet_limit'];
            $offset = \max(0, (int)$options['facet_offset']);
            foreach ($options['facets'] as $field) {
                if (!isset($response['facetDistribution'][$field]) || !\is_array($response['facetDistribution'][$field])) continue;
                $items = [];
                foreach ($response['facetDistribution'][$field] as $value => $count) {
                    $items[] = ['value' => $value, 'count' => (int)$count];
                }
                // Sort by count desc
                \usort($items, fn($a, $b) => $b['count'] <=> $a['count']);
                // Apply offset/limit
                if ($limit > 0) {
                    $items = \array_slice($items, $offset, $limit);
                } elseif ($offset > 0) {
                    $items = \array_slice($items, $offset);
                }
                $facets[$field] = $items;
            }
            if (!empty($facets)) {
                $response['facets'] = $facets;
            }
        }

        return $response;
    }

    /**
     * Ensure the given attributes are set as filterable on the index to enable faceting
     */
    private function ensureFilterableAttributes(array $attributes, bool $wait = true): void {
        // Normalize
        $attributes = \array_values(\array_unique(\array_filter($attributes, fn($a) => \is_string($a) && $a !== '')));
        if (empty($attributes)) return;

        try {
            $current = $this->manager->sendRequest("/indexes/{$this->name}/settings/filterable-attributes", 'GET');
            if (!\is_array($current)) {
                $current = [];
            }
            $missing = \array_values(\array_diff($attributes, $current));
            if (empty($missing)) {
                return;
            }

            $new = \array_values(\array_unique(\array_merge($current, $attributes)));
            $rsp = $this->manager->sendRequest("/indexes/{$this->name}/settings/filterable-attributes", 'PUT', $new);

            // Meilisearch returns taskUid for async update; optionally wait
            if ($wait && \is_array($rsp)) {
                $taskUid = $rsp['taskUid'] ?? $rsp['uid'] ?? $rsp['updateId'] ?? null;
                if (\is_int($taskUid)) {
                    $this->waitForTask($taskUid, 8000);
                }
            }
        } catch (\Exception $e) {
            // Best-effort: ignore and proceed to search
        }
    }

    /**
     * Wait for a Meilisearch task to complete (best-effort)
     */
    private function waitForTask(int $taskUid, int $maxWaitMs = 8000): void {
        $waited = 0;
        $interval = 200; // ms
        while ($waited < $maxWaitMs) {
            try {
                $task = $this->manager->sendRequest("/tasks/{$taskUid}", 'GET');
                $status = $task['status'] ?? null;
                if (\in_array($status, ['succeeded', 'failed'], true)) {
                    return;
                }
            } catch (\Exception $e) {
                return;
            }
            \usleep($interval * 1000);
            $waited += $interval;
        }
    }

    /**
     * Count the number of documents in the specified index.
     *
     * @param string $query [optional] The search query string. Defaults to an empty string.
     * @param string $filter [optional] Additional filter to apply. Defaults to an empty string.
     * @return int The number of documents in the index.
     */
    public function countDocuments(string $query = '', string $filter = ''): int {

        if (!$query && !$filter) {
            return $this->manager->sendRequest("/indexes/{$this->name}/stats", 'GET')['numberOfDocuments'] ?? 0;
        }

        $searchOptions = ['limit' => 1];
        if ($filter) {
            $searchOptions['filter'] = $filter;
        }

        return $this->search($query, $searchOptions)['estimatedTotalHits'] ?? 0;
    }

    /**
     * Perform faceted search on the specified index
     *
     * @param string $query The search query string
     * @param string $facetField The field to facet on
     * @param array $options Additional options
     * @return array The faceted search results
     */
    public function facetSearch(string $query, string $facetField, array $options = []): array {
        $options = \array_merge([
            'limit' => 50,
            'offset' => 0,
            'filter' => null,
        ], $options);

        $params = [
            'q' => $query,
            'limit' => $options['limit'],
            'offset' => $options['offset'],
            'facets' => [$facetField]
        ];

        if ($options['filter']) {
            $params['filter'] = $options['filter'];
        }

        // Ensure facet field is filterable
        $this->ensureFilterableAttributes([$facetField], true);

        $response = $this->manager->sendRequest("/indexes/{$this->name}/search", 'POST', $params);
        
        // Transform Meilisearch facet format to match IndexLite format
        $facets = [];
        if (isset($response['facetDistribution'][$facetField]) && \is_array($response['facetDistribution'][$facetField])) {
            foreach ($response['facetDistribution'][$facetField] as $value => $count) {
                $facets[] = [
                    $facetField => $value,
                    'count' => (int) $count
                ];
            }
        }

        // Sort by count DESC to match IndexLite behavior
        \usort($facets, function($a, $b) {
            return $b['count'] <=> $a['count'];
        });

        // Apply offset and limit on the facet list
        $offset = \max(0, (int)$options['offset']);
        $limit = (int)$options['limit'];
        if ($limit > 0) {
            $facets = \array_slice($facets, $offset, $limit);
        } elseif ($offset > 0) {
            $facets = \array_slice($facets, $offset);
        }

        return $facets;
    }

    /**
     * Get available fields (for compatibility with IndexLite)
     * Note: Meilisearch doesn't have a direct equivalent, so this returns common fields
     */
    public function getFields(): array {
        try {
            $response = $this->manager->sendRequest("/indexes/{$this->name}/settings/displayed-attributes", 'GET');
            return $response ?? ['*'];
        } catch (\Exception $e) {
            // Fallback to common fields
            return ['id', 'title', 'content', 'description'];
        }
    }

    /**
     * Get connection/manager (for compatibility with IndexLite)
     */
    public function getConnection(): Manager {
        return $this->manager;
    }

    /**
     * Create autocomplete functionality (basic implementation for compatibility)
     * Note: This is a simplified version - Meilisearch has more advanced autocomplete features
     */
    public function autocomplete(): object {
        return new class($this) {
            private $index;
            
            public function __construct($index) {
                $this->index = $index;
            }
            
            public function suggest(string $query, array $options = []): array {
                return $this->index->search($query, \array_merge($options, ['limit' => 10]));
            }
        };
    }
}
