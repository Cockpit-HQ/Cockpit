<?php

namespace IndexHybrid;

class Manager {

    protected \IndexLite\Manager|Meilisearch\Manager $manager;
    protected ?string $type = null;

    public function __construct(string $server, array $options = []) {

        if (str_starts_with($server, 'indexlite://')) {
            // Enhanced fuzzy is now built into the base Index class
            $this->manager = new \IndexLite\Manager(explode('://', $server, 2)[1], $options);
            $this->type = 'indexlite';
        } elseif (str_starts_with($server, 'meilisearch://')) {

            $server = str_replace('meilisearch://', ($options['https'] ?? true) ? 'https://' : 'http://', $server);

            $this->manager = new Meilisearch\Manager($server, $options);
            $this->type = 'meilisearch';
        }

        // Validate that a manager was created
        if (!isset($this->manager)) {
            throw new \InvalidArgumentException("Unsupported search backend: {$server}");
        }
    }

    /**
     * Returns the type of the object.
     *
     * @return string|null The type of the object or null if the type is not set.
     */
    public function getType(): ?string {
        return $this->type;
    }

    /**
     * Check if the backend supports a specific feature
     */
    public function supports(string $feature): bool {
        return match($feature) {
            'fuzzy' => true, // Both backends support fuzzy
            'enhanced_fuzzy' => $this->type === 'indexlite', // Built into base IndexLite now
            'facets' => true, // Both backends support facets
            'multiple_facets' => true, // Both backends support multiple facets
            'highlights' => $this->type === 'meilisearch',
            'synonyms' => $this->type === 'meilisearch',
            'typo_tolerance' => $this->type === 'meilisearch',
            'geo_search' => $this->type === 'meilisearch',
            'custom_ranking' => $this->type === 'meilisearch',
            default => false
        };
    }

    /**
     * Get available fuzzy algorithms for the current backend
     */
    public function getFuzzyAlgorithms(): array {
        return match($this->type) {
            'indexlite' => ['fts5', 'levenshtein', 'jaro_winkler', 'trigram', 'soundex', 'hybrid'],
            'meilisearch' => ['typo_tolerance'],
            default => []
        };
    }

    /**
     * Drop (remove) an index
     */
    public function drop(string $name): void {
        if ($this->type === 'indexlite') {
            // IndexLite doesn't have a drop method, but Manager might have removeIndex
            if (method_exists($this->manager, 'removeIndex')) {
                $this->manager->removeIndex($name);
            }
        } else {
            $this->manager->removeIndex($name);
        }
    }

    /**
     * Unified faceted search across backends
     */
    public function facetSearch(string $indexName, string $query, string $facetField, array $options = []): array {
        $index = $this->index($indexName);

        if (method_exists($index, 'facetSearch')) {
            return $index->facetSearch($query, $facetField, $options);
        }

        // Fallback for backends without native facet search
        throw new \Exception("Faceted search not supported by backend: {$this->type}");
    }

    /**
     * Get backend capabilities
     */
    public function getCapabilities(): array {
        return [
            'type' => $this->type,
            'fuzzy' => $this->supports('fuzzy'),
            'enhanced_fuzzy' => $this->supports('enhanced_fuzzy'),
            'fuzzy_algorithms' => $this->getFuzzyAlgorithms(),
            'facets' => $this->supports('facets'),
            'multiple_facets' => $this->supports('multiple_facets'),
            'highlights' => $this->supports('highlights'),
            'synonyms' => $this->supports('synonyms'),
            'geo_search' => $this->supports('geo_search'),
            'custom_ranking' => $this->supports('custom_ranking'),
        ];
    }

    /**
     * Validate connection to backend
     */
    public function validateConnection(): bool {
        try {
            switch ($this->type) {
                case 'indexlite':
                    // For IndexLite, try to get connection
                    return $this->manager instanceof \IndexLite\Manager;

                case 'meilisearch':
                    // For Meilisearch, try to ping the server
                    $response = $this->manager->sendRequest('/health', 'GET');
                    return isset($response['status']) && $response['status'] === 'available';

                default:
                    return false;
            }
        } catch (\Exception $e) {
            return false;
        }
    }

    /**
     * Magic method that allows calling inaccessible methods on an object.
     *
     * @param string $method The name of the method being called.
     * @param array $args The arguments passed to the method.
     * @return mixed The result of calling the method with the given arguments.
     */
    public function __call($method, $args) {
        return call_user_func_array([$this->manager, $method], $args);
    }

}
