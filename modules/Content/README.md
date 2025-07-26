# Content Module

[![Core Module](https://img.shields.io/badge/Type-Core%20Module-blue.svg)](https://getcockpit.com)

> **Powerful content management system at the heart of Cockpit CMS**

The Content module provides a flexible, headless content management system with dynamic schemas, multi-language support, and powerful querying capabilities. Create any content structure with Collections, Singletons, and Trees.

## ✨ Features

### 📊 **Content Types**
- **Collections** - Lists of content items (blog posts, products, news)
- **Singletons** - Single content pieces (homepage, settings, about page)
- **Trees** - Hierarchical content (categories, navigation menus)

### 🔧 **Dynamic Schema System**
- **20+ Field Types** - Text, rich text, images, dates, relations, and more
- **Custom Fields** - Create your own field types with Vue.js components
- **Field Validation** - Required fields, patterns, min/max values
- **Conditional Fields** - Show/hide fields based on other field values

### 🌍 **Multi-language Support**
- **Localized Content** - Per-field localization with fallback support
- **Language-aware APIs** - Automatic locale resolution in queries
- **Flexible Translation** - Mix localized and global fields

### ⚡ **Advanced Querying**
- **MongoDB Query Language** - Native MongoDB query syntax for filtering and sorting
- **MongoDB Field Projection** - Return only needed fields for performance
- **Content Population** - Automatic linking and reference resolution

### 🔒 **Security & Permissions**
- **Role-based Access** - Granular permissions per content model
- **Field-level Security** - Control access to individual fields
- **State Management** - Draft, published, archived content states

## 🚀 Quick Start

### 1. Create Your First Content Model

**Via Admin UI:**
```
1. Go to Content
2. Click "Create Model"
3. Choose model type (Collection/Singleton/Tree)
4. Add fields and configure settings
5. Save your model
```

**Via API:**
```php
// Create a blog collection
$fields = [
    ['name' => 'title', 'type' => 'text', 'required' => true],
    ['name' => 'content', 'type' => 'wysiwyg'],
    ['name' => 'published', 'type' => 'boolean'],
    ['name' => 'tags', 'type' => 'tags', 'multiple' => true]
];

$app->module('content')->createModel('blog', [
    'type' => 'collection',
    'fields' => $fields,
    'meta' => [
        'label' => 'Blog Posts',
        'icon' => 'rss'
    ]
]);
```

### 2. Add Content

```php
// Save a blog post
$post = $app->module('content')->saveItem('blog', [
    'title' => 'Hello World',
    'content' => '<p>My first blog post!</p>',
    'published' => true,
    'tags' => ['introduction', 'cockpit']
]);
```

### 3. Fetch Content

```php
// Get all published posts
$posts = $app->module('content')->items('blog', [
    'filter' => ['published' => true],
    'sort' => ['_created' => -1],
    'limit' => 10
]);

// Get single post
$post = $app->module('content')->item('blog', ['title' => 'Hello World']);
```

## 📋 Content Types

### Collections

Perfect for lists of similar content items.

```php
// Create collection
$app->module('content')->createModel('products', [
    'type' => 'collection',
    'fields' => [
        ['name' => 'name', 'type' => 'text', 'required' => true],
        ['name' => 'price', 'type' => 'number'],
        ['name' => 'description', 'type' => 'wysiwyg'],
        ['name' => 'images', 'type' => 'asset', 'multiple' => true],
        ['name' => 'category', 'type' => 'contentItemLink', 'link' => 'categories']
    ]
]);

// Query collection
$products = $app->module('content')->items('products', [
    'filter' => ['category.name' => 'Electronics'],
    'populate' => 1  // Include linked content
]);
```

### Singletons

For unique content pieces that exist only once.

```php
// Create singleton
$app->module('content')->createModel('homepage', [
    'type' => 'singleton',
    'fields' => [
        ['name' => 'hero_title', 'type' => 'text'],
        ['name' => 'hero_image', 'type' => 'asset'],
        ['name' => 'features', 'type' => 'repeater', 'fields' => [
            ['name' => 'title', 'type' => 'text'],
            ['name' => 'description', 'type' => 'textarea']
        ]]
    ]
]);

// Get singleton data
$homepage = $app->module('content')->item('homepage');
```

### Trees

For hierarchical content with parent-child relationships.

```php
// Create tree model
$app->module('content')->createModel('categories', [
    'type' => 'tree',
    'fields' => [
        ['name' => 'name', 'type' => 'text', 'required' => true],
        ['name' => 'slug', 'type' => 'text'],
        ['name' => 'description', 'type' => 'textarea']
    ]
]);

// Create hierarchy
$electronics = $app->module('content')->saveItem('categories', [
    'name' => 'Electronics',
    'slug' => 'electronics'
]);

$smartphones = $app->module('content')->saveItem('categories', [
    'name' => 'Smartphones', 
    'slug' => 'smartphones',
    '_pid' => $electronics['_id']  // Parent ID
]);

// Get tree structure
$tree = $app->module('content')->tree('categories');
```

### Localization Fields

```php
// Localized text field
['name' => 'title', 'type' => 'text', 'i18n' => true]
// Creates: title, title_de, title_fr, etc.

// Mixed localized and global fields
$fields = [
    ['name' => 'title', 'type' => 'text', 'i18n' => true],      // Localized
    ['name' => 'content', 'type' => 'wysiwyg', 'i18n' => true], // Localized  
    ['name' => 'price', 'type' => 'number'],                     // Global
    ['name' => 'sku', 'type' => 'text']                          // Global
];
```

## 🌐 Multi-language Support

### Localized Content

```php
// Save content with locales
$app->module('content')->saveItem('blog', [
    'title' => 'Hello World',           // English (default)
    'title_de' => 'Hallo Welt',        // German
    'title_fr' => 'Bonjour le Monde',  // French
    'content' => '<p>English content</p>',
    'content_de' => '<p>German content</p>',
    'published' => true  // Global field
]);

// Fetch localized content
$post_en = $app->module('content')->item('blog', ['_id' => $id], null, ['locale' => 'default']);
$post_de = $app->module('content')->item('blog', ['_id' => $id], null, ['locale' => 'de']);
```

### Locale-aware Queries

```php
// Filter by localized field
$posts = $app->module('content')->items('blog', [
    'filter' => ['title:locale' => 'Hello']  // Uses current locale
], ['locale' => 'de']);

// Sort by localized field
$posts = $app->module('content')->items('blog', [
    'sort' => ['title:locale' => 1]
], ['locale' => 'de']);
```

## 🔍 Advanced Querying

Cockpit uses **MongoDB Query Language** for all filtering, sorting, and field projection. This works with both MongoDB and SQLite backends.

📖 **Reference**: [MongoDB Query Documentation](https://docs.mongodb.com/manual/tutorial/query-documents/)

### Filtering

```php
// Basic filters
$app->module('content')->items('blog', [
    'filter' => [
        'published' => true,
        'tags' => 'cockpit'
    ]
]);

// Advanced MongoDB query operators
$app->module('content')->items('products', [
    'filter' => [
        'price' => ['$gte' => 100, '$lte' => 500],  // Between 100-500
        'category' => ['$in' => ['electronics', 'gadgets']], // In array
        'name' => ['$regex' => 'phone', '$options' => 'i'],  // Case-insensitive
        '$or' => [                                           // OR conditions
            ['featured' => true],
            ['discount' => ['$gt' => 0]]
        ]
    ]
]);

// Date filters
$app->module('content')->items('events', [
    'filter' => [
        'date' => ['$gte' => time()],  // Future events
        'status' => 'published'
    ]
]);
```

### Filtering by Linked Content

The Content module supports filtering by properties of linked content using the `@` syntax:

```php
// Filter by linked content properties
$posts = $app->module('content')->items('blog', [
    'filter' => [
        '@author.name' => 'John Doe',              // Author's name
        '@category.status' => 'active'             // Active categories only
    ]
]);

// With MongoDB operators on linked fields
$products = $app->module('content')->items('products', [
    'filter' => [
        '@vendor.rating' => ['$gte' => 4.0],       // Highly rated vendors
        '@vendor.country' => ['$in' => ['US', 'CA']], // North American vendors
        '@category.name' => ['$regex' => 'tech', '$options' => 'i']
    ]
]);

// Complex linked field queries
$orders = $app->module('content')->items('orders', [
    'filter' => [
        '$and' => [
            ['@customer.verified' => true],         // Verified customers
            ['@product.price' => ['$gt' => 100]],  // High-value products
            ['status' => 'completed']              // Completed orders
        ]
    ]
]);

// Nested properties in linked content
$posts = $app->module('content')->items('blog', [
    'filter' => [
        '@author.address.city' => 'New York',      // Author's city
        '@author.profile.verified' => true         // Verified profile
    ]
]);
```

#### Performance Considerations for Linked Filters

The filter helper includes depth limiting to prevent performance issues:

```php
// Default max depth is 3 levels
$filter = ['@author.name' => 'John'];

// Process filter in-place (modifies $filter directly)
$this->app->helper('content.linkedfilter')->process(
    $filter, 
    'posts',
    ['maxDepth' => 5]  // Allow up to 5 levels
);

// Use the processed filter
$posts = $app->module('content')->items('posts', [
    'filter' => $filter
]);
```

**Notes:**
- The `@` syntax automatically resolves linked content IDs
- All MongoDB operators work with linked fields
- Depth limiting prevents excessive queries and circular references
- Filters exceeding max depth are passed through unprocessed

### Field Projection

Uses **MongoDB Field Projection** syntax for selecting which fields to return.

📖 **Reference**: [MongoDB Projection Documentation](https://docs.mongodb.com/manual/tutorial/project-fields-from-query-results/)

```php
// Return only specific fields
$posts = $app->module('content')->items('blog', [
    'fields' => [
        'title' => 1,
        'excerpt' => 1, 
        '_created' => 1
    ]
]);

// Exclude fields
$posts = $app->module('content')->items('blog', [
    'fields' => [
        'content' => 0,  // Exclude large content field
        'internal_notes' => 0
    ]
]);

// Nested field projection
$posts = $app->module('content')->items('blog', [
    'fields' => [
        'title' => 1,
        'author.name' => 1,      // Only author name
        'seo.title' => 1,        // Only SEO title
    ]
]);
```

### Sorting

```php
// Basic sorting
$app->module('content')->items('blog', [
    'sort' => ['_created' => -1]  // Newest first
]);

// Multi-field sorting
$app->module('content')->items('products', [
    'sort' => [
        'featured' => -1,  // Featured first
        'price' => 1       // Then by price ascending
    ]
]);

// Localized sorting
$app->module('content')->items('blog', [
    'sort' => ['title:locale' => 1]
], ['locale' => 'de']);
```

### Pagination

```php
// Paginated results
$page = 2;
$limit = 10;

$posts = $app->module('content')->items('blog', [
    'filter' => ['published' => true],
    'sort' => ['_created' => -1],
    'limit' => $limit,
    'skip' => ($page - 1) * $limit
]);

// Get total count for pagination
$total = $app->module('content')->count('blog', ['published' => true]);
$totalPages = ceil($total / $limit);
```

### Content Population

```php
// Populate linked content (1 level)
$posts = $app->module('content')->items('blog', [
    'populate' => 1
]);
// author.name becomes full author object

// Populate multiple levels
$posts = $app->module('content')->items('blog', [
    'populate' => 2  
]);
// author.company.address becomes fully populated

// Post-populate field projection
$posts = $app->module('content')->items('blog', [
    'fields' => [
        'title' => 1,
        'author' => 1,
        '..author.name' => 1,     // Only author name after population
        '..author.email' => 1     // Only author email after population  
    ],
    'populate' => 1
]);
```

### Aggregation

Uses **MongoDB Aggregation Pipeline** for complex data processing.

📖 **Reference**: [MongoDB Aggregation Documentation](https://docs.mongodb.com/manual/aggregation/)

```php
// Group by category
$stats = $app->module('content')->aggregate('products', [
    ['$group' => [
        '_id' => '$category',
        'count' => ['$sum' => 1],
        'avgPrice' => ['$avg' => '$price']
    ]]
]);

// Complex aggregation pipeline
$pipeline = [
    ['$match' => ['published' => true]],
    ['$unwind' => '$tags'],
    ['$group' => [
        '_id' => '$tags',
        'count' => ['$sum' => 1]
    ]],
    ['$sort' => ['count' => -1]],
    ['$limit' => 10]
];

$topTags = $app->module('content')->aggregate('blog', $pipeline);
```

## 📊 API Reference

### REST API

#### Get Single Item

```bash
# Get blog post by ID
GET /api/content/item/blog/60f1b2b3c4d5e6f7a8b9c0d1

# Get with specific fields
GET /api/content/item/blog/60f1b2b3c4d5e6f7a8b9c0d1?fields={"title":1,"content":1}

# Get with population
GET /api/content/item/blog/60f1b2b3c4d5e6f7a8b9c0d1?populate=1

# Get localized version
GET /api/content/item/blog/60f1b2b3c4d5e6f7a8b9c0d1?locale=de
```

#### Get Multiple Items

```bash
# Get all published posts
GET /api/content/items/blog?filter={"published":true}

# Get with pagination
GET /api/content/items/blog?limit=10&skip=20

# Get with sorting
GET /api/content/items/blog?sort={"_created":-1}

# Complex query
GET /api/content/items/products?filter={"price":{"$gte":100}}&fields={"name":1,"price":1}&limit=5
```

#### Create/Update Items

```bash
# Create new item
POST /api/content/item/blog
Content-Type: application/json
Cockpit-Token: your-api-token

{
    "title": "New Post",
    "content": "<p>Post content</p>",
    "published": true
}

# Update existing item
POST /api/content/item/blog/60f1b2b3c4d5e6f7a8b9c0d1
Content-Type: application/json
Cockpit-Token: your-api-token

{
    "title": "Updated Title",
    "published": true
}
```

#### Tree Operations

```bash
# Get tree structure
GET /api/content/tree/categories

# Get tree with specific parent
GET /api/content/tree/categories?parent=60f1b2b3c4d5e6f7a8b9c0d1

# Get tree with filters
GET /api/content/tree/categories?filter={"status":"active"}
```

### GraphQL API

#### Query Single Item

```graphql
query GetBlogPost($id: String!, $locale: String) {
  contentItem(model: "blog", id: $id, locale: $locale) {
    _id
    title
    content
    published
    _created
    author {
      name
      email
    }
  }
}
```

#### Query Multiple Items

```graphql
query GetBlogPosts($filter: JSON, $sort: JSON, $limit: Int) {
  contentItems(model: "blog", filter: $filter, sort: $sort, limit: $limit) {
    _id
    title
    excerpt
    published
    _created
    tags
  }
}
```

#### Mutations

```graphql
# Create content item
mutation CreatePost($model: String!, $data: JSON!) {
  saveContentItem(model: $model, data: $data) {
    _id
    title
    _created
  }
}

# Update content item  
mutation UpdatePost($model: String!, $id: String!, $data: JSON!) {
  saveContentItem(model: $model, id: $id, data: $data) {
    _id
    title
    _modified
  }
}

# Delete content item
mutation DeletePost($model: String!, $filter: JSON!) {
  removeContentItem(model: $model, filter: $filter)
}
```

### JavaScript/Frontend Usage

```javascript
// Fetch blog posts
const posts = await fetch('/api/content/items/blog?filter={"published":true}')
  .then(res => res.json());

// Create new post
const newPost = await fetch('/api/content/item/blog', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Cockpit-Token': 'your-api-token'
  },
  body: JSON.stringify({
    title: 'New Post',
    content: '<p>Content here</p>',
    published: true
  })
}).then(res => res.json());

// GraphQL query
const query = `
  query {
    contentItems(model: "blog", filter: {published: true}) {
      _id
      title
      content
      _created
    }
  }
`;

const data = await fetch('/api/gql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query })
}).then(res => res.json());
```

## 🔧 Events & Hooks

### Content Lifecycle Events

```php
// Before content save
$app->on('content.item.save.before', function($modelName, &$item, $isUpdate) {
    // Modify item before saving
    $item['slug'] = strtolower(str_replace(' ', '-', $item['title']));
});

// After content save
$app->on('content.item.save.after', function($modelName, $item, $isUpdate) {
    // Clear cache, send notifications, etc.
    if ($modelName === 'blog' && $item['published']) {
        // Send to social media, clear cache, etc.
    }
});

// Model-specific events
$app->on('content.item.save.blog', function($item, $isUpdate) {
    // Only for blog model
});

// Before content removal
$app->on('content.remove.before', function($modelName, &$filter) {
    // Log deletion, backup data, etc.
});
```

## 🖥️ CLI Commands

The Content module provides CLI commands for content maintenance and optimization tasks.

### Field Operations

Clean up content data after model changes:

```bash
# Remove field from all content items
./tower content:field:remove blog old_field_name

# Rename field in all content items  
./tower content:field:rename blog current_name new_name
```

**Use Cases:**
- Remove deprecated fields after model updates
- Rename fields for consistency
- Clean up data after schema changes

### Database Index Management

Optimize query performance with database indexes:

```bash
# Create single field index
./tower content:index:create blog '{"title": 1}'

# Create compound index
./tower content:index:create products '{"category": 1, "price": -1}'

# Create text index for search
./tower content:index:create blog '{"title": "text", "content": "text"}'

# Create index with options
./tower content:index:create blog '{"slug": 1}' '{"unique": true}'

# List all indexes for a model
./tower content:index:list blog

# Remove specific index
./tower content:index:remove blog index_name
```

**Index Examples:**

```bash
# Performance indexes
./tower content:index:create blog '{"published": 1, "_created": -1}'  # Published posts by date
./tower content:index:create products '{"category": 1, "featured": -1, "price": 1}'  # Category browsing

# Search indexes  
./tower content:index:create blog '{"$**": "text"}'  # Full-text search on all fields
./tower content:index:create products '{"name": "text", "description": "text"}'  # Product search

# Unique constraints
./tower content:index:create users '{"email": 1}' '{"unique": true}'  # Unique email
./tower content:index:create products '{"sku": 1}' '{"unique": true}'  # Unique SKU
```

**Index Configuration Options:**

| Option | Description | Example |
|--------|-------------|---------|
| `unique` | Enforce unique values | `{"unique": true}` |
| `sparse` | Skip null values | `{"sparse": true}` |
| `background` | Build index in background | `{"background": true}` |
| `name` | Custom index name | `{"name": "custom_idx"}` |

## 🔒 Security & Permissions

### Role-based Access Control

```php
// Check permissions
$app->helper('acl')->isAllowed('content/blog/read', 'editor');
$app->helper('acl')->isAllowed('content/blog/create', 'author');

// Set permissions for role
$app->helper('acl')->allow('editor', 'content/blog/*');     // All operations
$app->helper('acl')->allow('author', 'content/blog/read');  // Read only
$app->helper('acl')->deny('guest', 'content/blog/*');       // No access
```

### Content States

```php
// Content states
// _state: -1 = deleted, 0 = draft, 1 = published

// Only published content in API
$published = $app->module('content')->items('blog', [
    'filter' => ['_state' => 1]
]);

// Include drafts (admin only)
$all = $app->module('content')->items('blog', [
    'filter' => ['_state' => ['$gte' => 0]]  // Exclude deleted
]);
```

## 🐛 Troubleshooting

### Common Issues

**❌ Model not found errors**
- Verify model exists: `$app->module('content')->exists('modelname')`
- Check model file in `/storage/content/` directory
- Ensure proper model configuration

**❌ Permission denied**
- Check ACL permissions for current user role
- Verify API token has correct permissions
- Review content model security settings

**❌ Population not working**
- Ensure linked models exist and are accessible
- Check populate depth limits
- Verify relationship field configuration

**❌ Localized content not showing**
- Check locale configuration in settings
- Verify field has `i18n: true` setting
- Ensure locale parameter is passed correctly

### Performance Optimization

```php
// Use field projection to limit data
$posts = $app->module('content')->items('blog', [
    'fields' => ['title' => 1, 'excerpt' => 1]  // Only needed fields
]);

// Limit population depth
$posts = $app->module('content')->items('blog', [
    'populate' => 1  // Don't over-populate
]);

// Use appropriate indexes
// MongoDB: Ensure indexes on frequently queried fields
// SQLite: Add indexes via database tools
```

## 📄 License

This is a core module of Cockpit CMS distributed under the MIT license.

---

**Ready to build?** The Content module provides everything you need to create flexible, scalable content management systems!