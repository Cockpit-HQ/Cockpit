# IndexLite

IndexLite is a lightweight, file-based search engine built on SQLite's powerful FTS5 extension. It provides full-text search capabilities with minimal setup, making it perfect for small to medium-sized applications where deploying a dedicated search engine like Elasticsearch would be overkill.

This library consists of three main components:
- `Index`: The core search engine class that handles indexing and searching
- `Autocomplete`: Provides suggestion functionality for search interfaces
- `Manager`: Manages multiple indices for applications requiring separate search collections

## Features

- **Simple Setup**: Single file database with zero dependencies beyond PHP and SQLite
- **Full-Text Search**: Powerful searching with relevance ranking
- **Field-Specific Queries**: Target searches to specific fields
- **Boosted Fields**: Give higher importance to matches in specific fields
- **Faceted Search**: Group and filter results by field values
- **Autocomplete**: Smart, typo-tolerant real-time suggestions
- **Search History**: Track and analyze user searches
- **JSON Storage**: Store complete documents with arbitrary structure

## Requirements

- PHP 8.3 or higher
- SQLite 3.9.0 or higher (with FTS5 extension enabled)
- PDO SQLite extension

## Basic Usage

### Creating an Index

```php
use IndexLite\Index;

// Create a new index with specified fields
Index::create('search.db', ['title', 'content', 'tags', 'category']);

// Open an existing index
$index = new Index('search.db');
```

### Adding Documents

```php
// Add a single document with an explicit ID
$index->addDocument('doc1', [
    'title' => 'Getting Started with IndexLite',
    'content' => 'IndexLite is a lightweight search engine built on SQLite...',
    'tags' => 'php, search, sqlite',
    'category' => 'Documentation'
]);

// Add multiple documents in batch (more efficient)
$index->addDocuments([
    [
        'id' => 'doc2',
        'title' => 'Configuring IndexLite',
        'content' => 'IndexLite can be configured with various options...',
        'tags' => 'php, configuration',
        'category' => 'Documentation'
    ],
    [
        'id' => 'doc3',
        'title' => 'Advanced Search Techniques',
        'content' => 'Learn how to use field-specific queries and boosting...',
        'tags' => 'php, advanced, search',
        'category' => 'Tutorial'
    ]
]);
```

### Basic Searching

```php
// Search across all fields
$results = $index->search('sqlite');

// Search with pagination
$results = $index->search('php', [
    'limit' => 20,
    'offset' => 40
]);

// Only return specific fields
$results = $index->search('search engine', [
    'fields' => ['title', 'category']
]);
```

### Field-Specific Searches

```php
// Search only in the title field
$results = $index->search('title:sqlite');

// Combine field-specific and general searches
$results = $index->search('title:php category:Tutorial sqlite');
```

## Advanced Search Features

### Boosted Fields

```php
// Make matches in title 3x more important than other fields
$results = $index->search('search engine', [
    'boosts' => [
        'title' => 3.0,
        'content' => 1.0,
        'tags' => 2.0
    ]
]);
```

### Faceted Search

```php
// Get category distribution for a search query
$facets = $index->facetSearch('php', 'category');

// Output: e.g., [['category' => 'Documentation', 'count' => 5], ['category' => 'Tutorial', 'count' => 3]]
```

### Document Management

```php
// Replace an existing document
$index->replaceDocument('doc1', [
    'title' => 'Updated: Getting Started with IndexLite',
    'content' => 'New updated content...',
    'tags' => 'php, search, sqlite, updated',
    'category' => 'Documentation'
]);

// Remove a document
$index->removeDocument('doc3');

// Count documents
$totalDocs = $index->countDocuments();
$phpDocs = $index->countDocuments('php');
$tutorialDocs = $index->countDocuments('php', "category = 'Tutorial'");

// Clear all documents
$index->clear();
```

## Autocomplete Features

IndexLite includes a powerful autocomplete system that provides real-time suggestions as users type.

### Basic Autocomplete

```php
// Get the autocomplete helper
$autocomplete = $index->autocomplete();

// Get suggestions as the user types
$suggestions = $autocomplete->getSuggestions('progr');
```

### Autocomplete Options

```php
// Get up to 5 suggestions from the title field with highlighting
$suggestions = $autocomplete->getSuggestions('progr', [
    'field' => 'title',
    'limit' => 5,
    'highlight' => true
]);

// Get fuzzy suggestions that allow for typos
$suggestions = $autocomplete->getSuggestions('serch', [
    'fuzzy' => 2, // Integer value sets edit distance, higher value = more typo tolerance (max 3)
]);

// Get suggestions with document counts
$suggestions = $autocomplete->getSuggestions('php', [
    'countMatches' => true
]);
```

### Popular Terms and Recent Searches

```php
// Get popular terms from the index
$popularTerms = $autocomplete->getPopularTerms([
    'limit' => 10,
    'minTermFrequency' => 3
]);

// Track user searches
$autocomplete->logSearch('php tutorial', [
    'user_id' => 123,
    'results_count' => 15
]);

// Get recent searches
$recentSearches = $autocomplete->getRecentSearches([
    'days' => 7,
    'limit' => 10
]);
```

## Performance Optimization

### SQLite Configuration

IndexLite allows for fine-tuning SQLite's performance:

```php
$index = new Index('search.db', [
    'journal_mode' => 'WAL',
    'cache_size' => '-20000',  // 20MB cache
    'mmap_size' => '134217728', // 128MB memory map
    'temp_store' => 'MEMORY'
]);
```

### Batch Operations

Always use batch operations for better performance:

```php
// Much faster than adding documents one by one
$index->addDocuments($largeArrayOfDocuments);
```

### Optimizing Field Structure

Choose fields carefully - more fields increase index size but provide better search targeting.

```php
// Update fields if your schema changes
$index->updateIndexedFields(['title', 'content', 'new_field', 'category']);
```

## Managing Multiple Indices

For applications that need multiple separate search indices, IndexLite provides the `Manager` class to simplify management:

```php
use IndexLite\Manager;

// Create a manager pointing to a directory where index files will be stored
$manager = new Manager('/path/to/indices', [
    // Default SQLite options for all indices
    'journal_mode' => 'WAL',
    'cache_size' => '-20000'
]);

// Create different indices for different collections
$manager->createIndex('products', ['name', 'description', 'category', 'tags']);
$manager->createIndex('articles', ['title', 'content', 'author', 'tags']);
$manager->createIndex('users', ['username', 'bio', 'skills']);

// Check if an index exists
if ($manager->exists('products')) {
    // Get a reference to an existing index
    $productsIndex = $manager->index('products');

    // Use the index normally
    $productsIndex->addDocument('prod1', [
        'name' => 'Smartphone XYZ',
        'description' => 'Latest smartphone with advanced features',
        'category' => 'Electronics',
        'tags' => 'phone, mobile, tech'
    ]);

    // Search in the products index
    $results = $productsIndex->search('smartphone');
}

// Get autocomplete for a specific index
$articlesIndex = $manager->index('articles');
$autocomplete = $articlesIndex->autocomplete();
$suggestions = $autocomplete->getSuggestions('prog');

// Remove an index when no longer needed
$manager->removeIndex('users');
```

The Manager automatically handles file management and caching of index instances, making it efficient to work with multiple search collections.

## Common Use Cases

### Site Search

```php
// Add web pages to the index
$index->addDocument('page1', [
    'url' => 'https://example.com/about',
    'title' => 'About Our Company',
    'content' => 'Full page content here...',
    'description' => 'Short meta description',
    'last_updated' => '2023-09-15'
]);

// Search with boosted fields
$results = $index->search($query, [
    'boosts' => [
        'title' => 5.0,
        'description' => 3.0,
        'content' => 1.0
    ]
]);
```

### Product Search

```php
// Add products to the index
$index->addDocument('prod123', [
    'name' => 'Ergonomic Office Chair',
    'description' => 'Comfortable chair with lumbar support...',
    'category' => 'Office Furniture',
    'tags' => 'chair, ergonomic, office, furniture',
    'price' => 299.99,
    'in_stock' => true
]);

// Search with filtering
$results = $index->search('ergonomic chair', [
    'filter' => "price < 350 AND in_stock = 1"
]);

// Get category facets
$categoryFacets = $index->facetSearch('chair', 'category');
```

### Content Management

```php
// Add articles to the index
$index->addDocument('article123', [
    'title' => 'How to Choose the Right Database',
    'content' => 'When building an application, selecting the right database...',
    'author' => 'Jane Smith',
    'published_date' => '2023-08-22',
    'categories' => ['Technology', 'Development'],
    'status' => 'published'
]);

// Search only published articles
$results = $index->search('database', [
    'filter' => "status = 'published'"
]);

// Autocomplete for article search
$suggestions = $index->autocomplete()->getSuggestions('data', [
    'field' => 'title',
    'highlight' => true
]);
```

## Configuration Options

### Index Creation

```php
// Create with custom tokenizer options
Index::create('search.db', ['title', 'content', 'tags'], [
    'tokenizer' => 'unicode61 remove_diacritics 1 tokenchars .-'
]);
```

### Search Options

```php
$options = [
    'fields' => ['title', 'content'],  // Fields to return
    'limit' => 20,                     // Max results
    'offset' => 0,                     // Pagination offset
    'filter' => "category = 'Tutorial'", // SQL filter
    'boosts' => [                      // Field importance
        'title' => 3.0,
        'content' => 1.0
    ]
];

$results = $index->search('query', $options);
```

### Autocomplete Options

```php
$options = [
    'field' => 'title',           // Specific field to get suggestions from
    'limit' => 5,                 // Max suggestions
    'minLength' => 2,             // Min prefix length
    'filter' => "status = 'active'", // SQL filter
    'countMatches' => true,       // Include document counts
    'highlight' => true,          // Highlight matching prefix
    'fuzzy' => true,              // Allow for typos
    'fuzzyDistance' => 1          // Edit distance for fuzzy matching
];

$suggestions = $autocomplete->getSuggestions('prefix', $options);
```

## Error Handling

```php
try {
    $results = $index->search('complex:query');
} catch (\PDOException $e) {
    // Handle search errors
    echo "Search error: " . $e->getMessage();
}
```

## License

MIT License
