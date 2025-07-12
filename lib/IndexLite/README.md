# IndexLite

IndexLite is a powerful, lightweight search engine built on SQLite's FTS5 extension with enhanced fuzzy search capabilities. It provides full-text search with advanced fuzzy matching algorithms, making it perfect for applications requiring intelligent search without the complexity of dedicated search engines.

## Features

- **🔍 Full-Text Search** - Powered by SQLite FTS5 with relevance ranking
- **🎯 Enhanced Fuzzy Search** - 6 different fuzzy matching algorithms
- **📊 Faceted Search** - Group and filter results by field values
- **🚀 Zero Dependencies** - Works with just PHP and SQLite
- **⚡ High Performance** - Optimized for speed and memory efficiency
- **🔧 No Extensions Required** - Uses PDO's sqliteCreateFunction for advanced features
- **📱 Easy Integration** - Simple, intuitive API

## Requirements

- PHP 8.3 or higher
- SQLite 3.9.0 or higher (with FTS5 extension enabled)
- PDO SQLite extension

## Quick Start

### Creating an Index

```php
use IndexLite\Index;

// Create a new index
Index::create('search.db', ['title', 'content', 'tags', 'category']);

// Open existing index
$index = new Index('search.db');
```

### Adding Documents

```php
// Add single document
$index->addDocument('doc1', [
    'title' => 'Getting Started with IndexLite',
    'content' => 'IndexLite is a powerful search engine...',
    'tags' => 'php, search, sqlite',
    'category' => 'Documentation'
]);

// Add multiple documents
$documents = [
    ['id' => 'doc2', 'title' => 'Advanced Features', 'content' => '...'],
    ['id' => 'doc3', 'title' => 'Best Practices', 'content' => '...']
];

foreach ($documents as $doc) {
    $index->addDocument($doc['id'], $doc);
}
```

### Basic Search

```php
// Simple search
$results = $index->search('search query');

// Search with options
$results = $index->search('query', [
    'limit' => 20,
    'offset' => 0,
    'fields' => ['title', 'content'],
    'filter' => 'category = "Documentation"'
]);

// Results structure
echo "Found {$results['estimatedTotalHits']} results\n";
foreach ($results['hits'] as $hit) {
    echo "- {$hit['title']}\n";
}
```

## Enhanced Fuzzy Search

IndexLite includes powerful fuzzy search capabilities that work without requiring SQLite extensions.

### Available Algorithms

| Algorithm | Best For | Example |
|-----------|----------|---------|
| `fts5` | General search (default) | Standard SQLite FTS5 |
| `levenshtein` | Spelling errors | 'macbok' → 'MacBook' |
| `jaro_winkler` | Names and people | 'galax' → 'Galaxy' |
| `trigram` | Partial matches | 'surfac' → 'Surface' |
| `soundex` | Pronunciation | 'thinkped' → 'ThinkPad' |
| `hybrid` | Best overall results | Combined scoring |

### Fuzzy Search Examples

```php
// Basic fuzzy search (uses hybrid algorithm)
$results = $index->search('iphon', ['fuzzy' => true]);
// Finds: 'iPhone 15 Pro', 'phone', etc.

// Algorithm-specific searches
$results = $index->search('macbok', [
    'fuzzy' => true,
    'fuzzy_algorithm' => 'levenshtein',
    'fuzzy_threshold' => 2
]);
// Finds: 'MacBook Pro', 'MacBook Air'

$results = $index->search('smith', [
    'fuzzy' => true,
    'fuzzy_algorithm' => 'soundex'
]);
// Finds: 'Smith', 'Smyth', 'Smithe'

$results = $index->search('galax', [
    'fuzzy' => true,
    'fuzzy_algorithm' => 'jaro_winkler'
]);
// Finds: 'Galaxy S24', 'Galaxy Note'

// Hybrid algorithm with custom scoring
$results = $index->search('searh', [
    'fuzzy' => true,
    'fuzzy_algorithm' => 'hybrid',
    'fuzzy_min_score' => 70,
    'fuzzy_threshold' => 2
]);
// Uses combined scoring for best results
```

### Field Boosting

```php
// Boost title matches over content matches
$results = $index->search('important', [
    'fuzzy' => true,
    'boosts' => [
        'title' => 2.0,
        'content' => 1.0,
        'tags' => 1.5
    ]
]);
```

## Faceted Search

```php
// Single facet
$facets = $index->facetSearch('laptop', 'category', [
    'limit' => 10
]);

foreach ($facets as $facet) {
    echo "{$facet['category']}: {$facet['count']} items\n";
}
```

## Advanced Features

### Field-Specific Queries

```php
// Search specific fields
$results = $index->search('title:MacBook content:professional');

// Multiple field constraints
$results = $index->search('title:"iPhone 15" category:Electronics');
```

### Filtering

```php
// Combine search with filters
$results = $index->search('laptop', [
    'filter' => 'category = "Computers" AND price < 2000',
    'fuzzy' => true
]);
```

### Pagination

```php
// Paginated results
$page1 = $index->search('query', ['limit' => 10, 'offset' => 0]);
$page2 = $index->search('query', ['limit' => 10, 'offset' => 10]);

echo "Showing results 1-10 of {$page1['estimatedTotalHits']}\n";
```

## Search Options Reference

### Basic Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `fields` | string/array | '*' | Fields to retrieve |
| `limit` | int | 50 | Maximum results |
| `offset` | int | 0 | Results offset |
| `filter` | string | '' | Additional SQL filter |

### Fuzzy Search Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `fuzzy` | bool/int | null | Enable fuzzy search |
| `fuzzy_algorithm` | string | 'fts5' | Algorithm to use |
| `fuzzy_threshold` | int | 2 | Distance threshold |
| `fuzzy_min_score` | int | 70 | Minimum score for hybrid |

### Field Boosting

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `boosts` | array | [] | Field importance weights |

## Performance Tips

### Indexing Performance

```php
// Batch insert for better performance
$index->addDocuments($documents);

// Use transactions for large batches
$db = $index->getConnection();
$db->beginTransaction();
foreach ($documents as $doc) {
    $index->addDocument($doc['id'], $doc);
}
$db->commit();
```

### Search Performance

```php
// Use specific algorithms for better performance
$results = $index->search('query', [
    'fuzzy' => true,
    'fuzzy_algorithm' => 'soundex'  // Faster than hybrid
]);

// Limit fuzzy threshold for better performance
$results = $index->search('query', [
    'fuzzy' => true,
    'fuzzy_threshold' => 1  // More restrictive = faster
]);
```

## Integration with IndexHybrid

IndexLite works seamlessly with the IndexHybrid abstraction layer:

```php
use IndexHybrid\Manager;

// Create manager
$manager = new Manager('indexlite://search.db');

// Check feature support
if ($manager->supports('enhanced_fuzzy')) {
    $algorithms = $manager->getFuzzyAlgorithms();
    // ['fts5', 'levenshtein', 'jaro_winkler', 'trigram', 'soundex', 'hybrid']
}

// Use through manager
$index = $manager->index('my_index');
$results = $index->search('query', ['fuzzy' => true]);
```

## Error Handling

```php
try {
    $results = $index->search('query', ['fuzzy' => true]);
} catch (PDOException $e) {
    // Handle database errors
    error_log("Search failed: " . $e->getMessage());
} catch (Exception $e) {
    // Handle other errors
    error_log("Error: " . $e->getMessage());
}
```

## Configuration

### SQLite Optimization

IndexLite automatically configures SQLite for optimal performance:

```php
// These are set automatically
PRAGMA journal_mode = WAL;
PRAGMA temp_store = MEMORY;
PRAGMA synchronous = NORMAL;
PRAGMA mmap_size = 134217728;
PRAGMA cache_size = -20000;
```

### Custom Configuration

```php
$index = new Index('search.db', [
    'journal_mode' => 'WAL',
    'temp_store' => 'MEMORY',
    'cache_size' => '-50000'
]);
```

## Best Practices

### 1. Choose the Right Algorithm

- **General search**: Use `hybrid` for best overall results
- **Typo tolerance**: Use `levenshtein` for spelling corrections
- **Name matching**: Use `jaro_winkler` for person/place names
- **Partial matching**: Use `trigram` for incomplete words
- **Phonetic search**: Use `soundex` for pronunciation-based matching

### 2. Optimize Field Structure

```php
// Good: Specific, searchable fields
Index::create('search.db', ['title', 'content', 'author', 'category']);

// Avoid: Too many or overly broad fields
Index::create('search.db', ['everything']); // Not optimal
```

### 3. Use Appropriate Thresholds

```php
// Conservative (fewer, more accurate results)
$results = $index->search('query', [
    'fuzzy' => true,
    'fuzzy_threshold' => 1,
    'fuzzy_min_score' => 80
]);

// Permissive (more results, some less accurate)
$results = $index->search('query', [
    'fuzzy' => true,
    'fuzzy_threshold' => 3,
    'fuzzy_min_score' => 60
]);
```

### 4. Leverage Field Boosting

```php
// Prioritize different content types
$results = $index->search('query', [
    'fuzzy' => true,
    'boosts' => [
        'title' => 3.0,      // Titles are most important
        'author' => 2.0,     // Authors are important
        'content' => 1.0,    // Content is baseline
        'tags' => 1.5        // Tags are moderately important
    ]
]);
```

## Troubleshooting

### Common Issues

**FTS5 not available**
```bash
# Check if FTS5 is compiled in
php -r "var_dump(class_exists('SQLite3')); $db = new SQLite3(':memory:'); var_dump($db->exec('CREATE VIRTUAL TABLE test USING fts5(content)'));"
```

**Performance issues**
```php
// Check index size
$count = $index->countDocuments();
echo "Index contains {$count} documents\n";

// Optimize database
$db = $index->getConnection();
$db->exec('VACUUM');
$db->exec('PRAGMA optimize');
```

**Memory usage**
```php
// Monitor memory during indexing
echo "Memory: " . memory_get_usage(true) / 1024 / 1024 . " MB\n";
```

## License

IndexLite is part of the Cockpit CMS project and follows the same licensing terms.

## Contributing

Contributions are welcome! Please ensure all changes maintain backward compatibility and include appropriate tests.