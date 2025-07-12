# IndexHybrid

IndexHybrid is a unified search abstraction layer that provides a consistent interface across multiple search backends. It currently supports **IndexLite** (SQLite FTS5 with enhanced fuzzy search) and **Meilisearch**, allowing you to switch between backends without changing your application code.

## Features

- **🔄 Backend Abstraction** - Unified API across IndexLite and Meilisearch
- **🎯 Enhanced Fuzzy Search** - 6+ fuzzy algorithms (IndexLite) + typo tolerance (Meilisearch)
- **📊 Faceted Search** - Consistent faceting interface across backends
- **🚀 Auto-Detection** - Automatic feature detection and capability reporting
- **🔧 Configuration** - Flexible backend-specific configuration options
- **⚡ Performance** - Optimized with connection pooling, retries, and timeouts
- **🛡️ Robust Error Handling** - Comprehensive error handling with retry mechanisms

## Supported Backends

| Backend | Protocol | Features |
|---------|----------|----------|
| **IndexLite** | `indexlite://path/to/db` | Enhanced fuzzy, SQLite FTS5, facets, field boosting |
| **Meilisearch** | `meilisearch://host:port` | Typo tolerance, highlights, synonyms, geo search |

## Quick Start

### Basic Usage

```php
use IndexHybrid\Manager;

// IndexLite backend
$manager = new Manager('indexlite://storage/search.db');

// Meilisearch backend
$manager = new Manager('meilisearch://localhost:7700', [
    'api_key' => 'your_master_key'
]);

// Check what the backend supports
$capabilities = $manager->getCapabilities();
```

### Creating and Using Indexes

```php
// Create an index
$manager->createIndex('products', ['title', 'description', 'category', 'price']);

// Get index instance
$index = $manager->index('products');

// Add documents
$index->addDocument('prod1', [
    'title' => 'iPhone 15 Pro',
    'description' => 'Latest Apple smartphone with advanced features',
    'category' => 'Electronics',
    'price' => 999
]);

// Search with unified interface
$results = $index->search('phone', [
    'fuzzy' => true,
    'limit' => 20,
    'boosts' => ['title' => 2.0],
    'filter' => 'category = "Electronics"'
]);
```

## Search Interface

### Universal Search Options

All backends support these options with automatic translation:

```php
$results = $index->search('query', [
    // Basic options
    'fields' => ['title', 'description'],  // Fields to retrieve
    'limit' => 50,                         // Maximum results
    'offset' => 0,                         // Pagination offset
    'filter' => 'price < 1000',           // Backend-specific filtering
    
    // Fuzzy search options
    'fuzzy' => true,                       // Enable fuzzy matching
    'fuzzy_algorithm' => 'hybrid',         // Algorithm choice (IndexLite)
    'fuzzy_threshold' => 2,                // Distance threshold
    'fuzzy_min_score' => 70,              // Minimum relevance score
    
    // Enhancement options
    'boosts' => ['title' => 2.0],         // Field importance weights
    'highlights' => true,                  // Highlight matches (Meilisearch)
]);
```

### Fuzzy Search Algorithms

#### IndexLite Algorithms

| Algorithm | Best For | Example |
|-----------|----------|---------|
| `fts5` | General search | Standard SQLite FTS5 |
| `levenshtein` | Spelling errors | 'macbok' → 'MacBook' |
| `jaro_winkler` | Names and people | 'galax' → 'Galaxy' |
| `trigram` | Partial matches | 'surfac' → 'Surface' |
| `soundex` | Pronunciation | 'thinkped' → 'ThinkPad' |
| `hybrid` | Best overall | Combined scoring |

#### Meilisearch Algorithms

| Algorithm | Best For | Example |
|-----------|----------|---------|
| `typo_tolerance` | General typos | Automatic typo correction |

### Search Examples

```php
// Basic fuzzy search (works on both backends)
$results = $index->search('iphon', ['fuzzy' => true]);

// Algorithm-specific search (IndexLite)
$results = $index->search('macbok', [
    'fuzzy' => true,
    'fuzzy_algorithm' => 'levenshtein',
    'fuzzy_threshold' => 2
]);

// Typo tolerance (Meilisearch)
$results = $index->search('smartphne', [
    'fuzzy' => true,
    'fuzzy_algorithm' => 'typo_tolerance'
]);

// Field boosting (both backends)
$results = $index->search('laptop', [
    'fuzzy' => true,
    'boosts' => [
        'title' => 3.0,        // Titles are most important
        'description' => 1.0,   // Descriptions are baseline
        'category' => 2.0       // Categories are important
    ]
]);

// Advanced search with highlighting (Meilisearch)
$results = $index->search('professional camera', [
    'fuzzy' => true,
    'highlights' => true,
    'filter' => 'price < 2000',
    'limit' => 10
]);
```

## Faceted Search

### Single Facet

```php
// Get facet distribution for a field
$facets = $index->facetSearch('laptop', 'category', [
    'limit' => 10
]);

foreach ($facets as $facet) {
    echo "{$facet['category']}: {$facet['count']} items\n";
}
```

### Multiple Facets (IndexLite)

```php
// IndexLite supports multiple facets in a single search
$results = $index->search('electronics', [
    'facets' => ['category', 'brand', 'price_range'],
    'facet_limit' => 20
]);

// Access facet data
foreach ($results['facets'] as $field => $facetData) {
    echo "Facets for {$field}:\n";
    foreach ($facetData as $facet) {
        echo "  {$facet['value']}: {$facet['count']}\n";
    }
}
```

### Unified Facet Interface

```php
// Manager-level facet search (works across backends)
$facets = $manager->facetSearch('products', 'smartphone', 'brand');
```

## Backend Configuration

### IndexLite Configuration

```php
$manager = new Manager('indexlite://storage/search.db', [
    // SQLite options
    'journal_mode' => 'WAL',
    'temp_store' => 'MEMORY',
    'cache_size' => '-20000',
    
    // IndexLite specific
    'enable_enhanced_fuzzy' => true,  // Enable enhanced algorithms
]);
```

### Meilisearch Configuration

```php
$manager = new Manager('meilisearch://localhost:7700', [
    // Authentication
    'api_key' => 'your_master_key',
    
    // HTTP configuration
    'timeout' => 30,              // Request timeout (seconds)
    'connect_timeout' => 10,      // Connection timeout (seconds)
    'retry_attempts' => 3,        // Number of retry attempts
    'retry_delay' => 1000,        // Base retry delay (milliseconds)
    
    // SSL options
    'https' => true,              // Use HTTPS
]);
```

## Feature Detection

### Check Backend Capabilities

```php
$capabilities = $manager->getCapabilities();

// Returns array with:
[
    'type' => 'indexlite',                    // Backend type
    'fuzzy' => true,                          // Basic fuzzy support
    'enhanced_fuzzy' => true,                 // Advanced fuzzy algorithms
    'fuzzy_algorithms' => [...],              // Available algorithms
    'facets' => true,                         // Faceted search support
    'multiple_facets' => true,                // Multiple facets per query
    'highlights' => false,                    // Search highlighting
    'synonyms' => false,                      // Synonym support
    'geo_search' => false,                    // Geographic search
    'custom_ranking' => false                 // Custom ranking rules
]
```

### Feature-Specific Checks

```php
// Check specific features
if ($manager->supports('enhanced_fuzzy')) {
    $algorithms = $manager->getFuzzyAlgorithms();
    // Use advanced fuzzy algorithms
}

if ($manager->supports('highlights')) {
    $results = $index->search('query', ['highlights' => true]);
}

if ($manager->supports('synonyms')) {
    // Configure synonyms for better search
}
```

## Error Handling

### Connection Validation

```php
try {
    $manager = new Manager('meilisearch://localhost:7700', [
        'api_key' => 'key',
        'timeout' => 5
    ]);
    
    // Connection is automatically validated
    if ($manager->validateConnection()) {
        echo "Connected successfully\n";
    }
    
} catch (Exception $e) {
    echo "Connection failed: " . $e->getMessage() . "\n";
}
```

### Search Error Handling

```php
try {
    $results = $index->search('query', ['fuzzy' => true]);
    
} catch (Exception $e) {
    // Handle search errors
    if (str_contains($e->getMessage(), 'timeout')) {
        // Handle timeout
    } elseif (str_contains($e->getMessage(), 'client error')) {
        // Handle client errors (400-499)
    } else {
        // Handle server errors (500+)
    }
}
```

### Graceful Degradation

```php
function smartSearch($manager, $query, $options = []) {
    try {
        // Try enhanced fuzzy if available
        if ($manager->supports('enhanced_fuzzy')) {
            return $manager->index('products')->search($query, array_merge($options, [
                'fuzzy' => true,
                'fuzzy_algorithm' => 'hybrid'
            ]));
        }
        
        // Fall back to basic fuzzy
        if ($manager->supports('fuzzy')) {
            return $manager->index('products')->search($query, array_merge($options, [
                'fuzzy' => true
            ]));
        }
        
        // Fall back to exact search
        return $manager->index('products')->search($query, $options);
        
    } catch (Exception $e) {
        // Final fallback
        return ['hits' => [], 'error' => $e->getMessage()];
    }
}
```

## Performance Optimization

### IndexLite Performance

```php
// Optimize for large datasets
$manager = new Manager('indexlite://storage/search.db', [
    'journal_mode' => 'WAL',         // Better concurrency
    'temp_store' => 'MEMORY',        // Faster temporary operations
    'cache_size' => '-50000',        // Larger cache (50MB)
    'mmap_size' => '268435456',      // Memory mapping (256MB)
]);

// Use specific algorithms for better performance
$results = $index->search('query', [
    'fuzzy' => true,
    'fuzzy_algorithm' => 'soundex',  // Faster than hybrid
    'fuzzy_threshold' => 1           // More restrictive = faster
]);
```

### Meilisearch Performance

```php
// Optimize HTTP settings
$manager = new Manager('meilisearch://localhost:7700', [
    'timeout' => 10,                 // Shorter timeout for faster failure
    'connect_timeout' => 3,          // Quick connection attempts
    'retry_attempts' => 2,           // Fewer retries for responsiveness
]);

// Use GET for simple queries (faster)
$results = $index->search('simple query', [
    'limit' => 20,
    'fields' => ['title']  // Minimal field set
]);
```

## Migration Between Backends

### Seamless Backend Switching

```php
class SearchService {
    private $manager;
    
    public function __construct($backend, $options = []) {
        $this->manager = new Manager($backend, $options);
    }
    
    public function search($query, $options = []) {
        // Add backend-specific optimizations
        if ($this->manager->getType() === 'indexlite') {
            $options['fuzzy_algorithm'] = $options['fuzzy_algorithm'] ?? 'hybrid';
        }
        
        if ($this->manager->supports('highlights') && !isset($options['highlights'])) {
            $options['highlights'] = true;
        }
        
        return $this->manager->index('main')->search($query, $options);
    }
}

// Use with IndexLite
$search = new SearchService('indexlite://storage/search.db');

// Switch to Meilisearch without code changes
$search = new SearchService('meilisearch://localhost:7700', ['api_key' => 'key']);
```

### Data Migration

```php
function migrateData($fromManager, $toManager, $indexName) {
    $fromIndex = $fromManager->index($indexName);
    
    // Get all documents (paginated)
    $offset = 0;
    $limit = 100;
    
    do {
        $results = $fromIndex->search('*', [
            'limit' => $limit,
            'offset' => $offset,
            'fields' => '*'
        ]);
        
        if (!empty($results['hits'])) {
            $toManager->index($indexName)->addDocuments($results['hits']);
        }
        
        $offset += $limit;
    } while (count($results['hits']) === $limit);
}
```

## Advanced Use Cases

### Multi-Backend Search

```php
class MultiBackendSearch {
    private $backends = [];
    
    public function addBackend($name, $manager) {
        $this->backends[$name] = $manager;
    }
    
    public function search($query, $options = []) {
        $results = [];
        
        foreach ($this->backends as $name => $manager) {
            try {
                $backendResults = $manager->index('main')->search($query, $options);
                $results[$name] = $backendResults;
            } catch (Exception $e) {
                $results[$name] = ['error' => $e->getMessage()];
            }
        }
        
        return $this->mergeResults($results);
    }
    
    private function mergeResults($results) {
        // Implement result merging logic
        $merged = ['hits' => []];
        
        foreach ($results as $backend => $result) {
            if (isset($result['hits'])) {
                foreach ($result['hits'] as $hit) {
                    $hit['_backend'] = $backend;
                    $merged['hits'][] = $hit;
                }
            }
        }
        
        return $merged;
    }
}
```

### Smart Algorithm Selection

```php
function chooseAlgorithm($manager, $query) {
    $algorithms = $manager->getFuzzyAlgorithms();
    
    // Name-like queries
    if (preg_match('/^[A-Z][a-z]+ [A-Z][a-z]+$/', $query)) {
        return in_array('jaro_winkler', $algorithms) ? 'jaro_winkler' : 'hybrid';
    }
    
    // Short queries with potential typos
    if (strlen($query) <= 6) {
        return in_array('levenshtein', $algorithms) ? 'levenshtein' : 'hybrid';
    }
    
    // Partial words
    if (strlen($query) >= 4 && !str_contains($query, ' ')) {
        return in_array('trigram', $algorithms) ? 'trigram' : 'hybrid';
    }
    
    // Default to best overall
    return in_array('hybrid', $algorithms) ? 'hybrid' : 'fts5';
}
```

## Troubleshooting

### Common Issues

**Backend not connecting**
```php
// Check connection
if (!$manager->validateConnection()) {
    $capabilities = $manager->getCapabilities();
    echo "Backend type: " . $capabilities['type'] . "\n";
    
    // For Meilisearch, check server status
    if ($capabilities['type'] === 'meilisearch') {
        // Verify server is running on the correct port
        // Check API key is valid
    }
}
```

**Search returning no results**
```php
// Debug search options
$query = 'test query';
$options = ['fuzzy' => true, 'fuzzy_algorithm' => 'hybrid'];

echo "Backend: " . $manager->getType() . "\n";
echo "Supports enhanced fuzzy: " . ($manager->supports('enhanced_fuzzy') ? 'YES' : 'NO') . "\n";
echo "Available algorithms: " . implode(', ', $manager->getFuzzyAlgorithms()) . "\n";

// Try with different algorithms
foreach ($manager->getFuzzyAlgorithms() as $algorithm) {
    $results = $index->search($query, array_merge($options, ['fuzzy_algorithm' => $algorithm]));
    echo "Algorithm {$algorithm}: " . count($results['hits']) . " results\n";
}
```

**Performance issues**
```php
// Monitor search performance
$start = microtime(true);
$results = $index->search($query, $options);
$duration = (microtime(true) - $start) * 1000;

echo "Search took {$duration}ms\n";
echo "Results: " . count($results['hits']) . "\n";

if ($duration > 100) {
    echo "Consider:\n";
    echo "- Reducing fuzzy_threshold\n";
    echo "- Using faster algorithms (soundex, fts5)\n";
    echo "- Limiting field set\n";
    echo "- Adding more specific filters\n";
}
```

## API Reference

### Manager Methods

| Method | Description | Returns |
|--------|-------------|---------|
| `__construct($server, $options)` | Create manager instance | `Manager` |
| `index($name)` | Get index instance | `Index` |
| `createIndex($name, $fields, $options)` | Create new index | `Index` |
| `drop($name)` | Remove index | `void` |
| `exists($name)` | Check if index exists | `bool` |
| `getType()` | Get backend type | `string` |
| `supports($feature)` | Check feature support | `bool` |
| `getCapabilities()` | Get all capabilities | `array` |
| `getFuzzyAlgorithms()` | Get available algorithms | `array` |
| `validateConnection()` | Test connection | `bool` |
| `facetSearch($index, $query, $field, $options)` | Unified facet search | `array` |

### Index Methods

| Method | Description | Returns |
|--------|-------------|---------|
| `search($query, $options)` | Search documents | `array` |
| `facetSearch($query, $field, $options)` | Faceted search | `array` |
| `addDocument($id, $data, $safe)` | Add single document | `void` |
| `addDocuments($documents)` | Add multiple documents | `mixed` |
| `removeDocument($id)` | Remove document | `mixed` |
| `countDocuments($query)` | Count matching documents | `int` |
| `clear()` | Remove all documents | `mixed` |

## License

IndexHybrid is part of the Cockpit CMS project and follows the same licensing terms.

## Contributing

Contributions are welcome! When adding new features:

1. Ensure compatibility across both backends
2. Add appropriate feature detection
3. Include comprehensive error handling
4. Update capability detection
5. Add usage examples

Focus on maintaining the unified interface while leveraging each backend's strengths.