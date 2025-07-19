# ESQL - A Lightweight PDO Wrapper

ESQL is a lightweight PHP PDO wrapper that provides SQL dialect-aware query generation with support for MySQL, PostgreSQL, and SQLite. It offers both raw SQL execution capabilities and a fluent query builder interface with **automatic JSON encoding/decoding**.

## Features

- **Multi-Database Support**: MySQL, PostgreSQL, SQLite
- **Automatic JSON Handling**: Seamless encoding/decoding of arrays and objects
- **SQL Dialect Awareness**: Automatic identifier quoting based on database type
- **Query Builder**: Fluent interface for SELECT, INSERT, UPDATE, DELETE operations
- **Aggregate Functions**: Built-in methods for COUNT, AVG, SUM with full query options
- **Utility Methods**: EXISTS checks, PLUCK for single column extraction
- **Advanced Conditions**: Support for nested AND/OR conditions, EXISTS/NOT EXISTS
- **JOIN Support**: Multiple join types with structured ON clauses
- **Batch Operations**: Efficient batch INSERT operations
- **Transaction Support**: Full transaction management
- **Parameter Binding**: Automatic parameter binding with unique placeholders
- **RETURNING Clauses**: Support for PostgreSQL and SQLite RETURNING clauses
- **Subquery Support**: EXISTS/NOT EXISTS with both raw SQL and structured syntax

## Installation

Simply include the ESQL class in your project:

```php
require_once 'path/to/ESQL/Client.php';
use ESQL\Client;
```

## Quick Start

```php
// Initialize connection with automatic JSON handling (default)
$db = new Client('mysql:host=localhost;dbname=testdb', [
    'username' => 'user',
    'password' => 'pass'
]);

// Insert data with automatic JSON encoding
$db->insert([
    'table' => 'users', 
    'data' => [
        'name' => 'John', 
        'email' => 'john@example.com',
        'preferences' => ['theme' => 'dark', 'notifications' => true] // Auto-encoded to JSON
    ]
]);

// Select data with automatic JSON decoding
$users = $db->select('users', ['conditions' => ['status' => 'active']]);
// $users[0]['preferences'] is automatically decoded back to array
```

## Connection

### Constructor

```php
public function __construct(string $dsn, array $options = [])
```

**Parameters:**
- `$dsn`: Data Source Name (e.g., `mysql:host=localhost;dbname=mydb`)
- `$options`: Array of configuration options

**Available Options:**
- `username`: Database username
- `password`: Database password
- `encodeJson`: Auto-encode arrays/objects to JSON (default: `true`)
- `decodeJson`: Auto-decode JSON strings back to arrays/objects (default: `true`)
- `pdo`: Array of PDO connection options

**Examples:**

```php
// Basic connection
$db = new Client('mysql:host=localhost;dbname=myapp', [
    'username' => 'user',
    'password' => 'pass'
]);

// PostgreSQL with custom options
$db = new Client('pgsql:host=localhost;dbname=myapp', [
    'username' => 'user',
    'password' => 'pass',
    'encodeJson' => true,  // Enable auto JSON encoding (default)
    'decodeJson' => true,  // Enable auto JSON decoding (default)
    'pdo' => [
        PDO::ATTR_TIMEOUT => 30
    ]
]);

// SQLite with JSON disabled
$db = new Client('sqlite:/path/to/database.db', [
    'encodeJson' => false,
    'decodeJson' => false
]);
```

## Automatic JSON Handling

ESQL automatically handles JSON encoding and decoding, making it seamless to work with complex data structures.

### Automatic Encoding (INSERT/UPDATE)

When inserting or updating data, arrays and objects are automatically converted to JSON:

```php
$db->insert([
    'table' => 'users',
    'data' => [
        'name' => 'John',
        'settings' => [                    // This array will be JSON-encoded
            'theme' => 'dark',
            'language' => 'en',
            'notifications' => [
                'email' => true,
                'push' => false
            ]
        ],
        'tags' => ['admin', 'premium']     // This array will be JSON-encoded
    ]
]);
```

### Automatic Decoding (SELECT)

When fetching data, valid JSON strings are automatically decoded back to arrays/objects:

```php
$user = $db->selectOne('users', ['conditions' => ['id' => 1]]);
// $user['settings'] is automatically an array, not a JSON string
// $user['tags'] is automatically an array

// Control JSON decoding behavior
$user = $db->selectOne('users', [
    'conditions' => ['id' => 1],
    'jsonDecodeAssoc' => false  // Decode as stdClass objects instead of arrays
]);
```

## Raw SQL Methods

### query()
Execute raw SQL with parameter binding:

```php
$stmt = $db->query("SELECT * FROM users WHERE status = :status", ['status' => 'active']);
```

### fetchOne()
Fetch a single row:

```php
$user = $db->fetchOne("SELECT * FROM users WHERE id = :id", ['id' => 123]);
```

### fetchAll()
Fetch all rows:

```php
$users = $db->fetchAll("SELECT * FROM users WHERE created_at > :date", ['date' => '2024-01-01']);
```

### fetchColumn()
Fetch a single column value:

```php
$count = $db->fetchColumn("SELECT COUNT(*) FROM users WHERE status = :status", ['status' => 'active']);
```

### execute()
Execute INSERT/UPDATE/DELETE and get affected row count:

```php
$affected = $db->execute("UPDATE users SET status = :status WHERE id = :id", [
    'status' => 'inactive', 
    'id' => 123
]);
```

## Query Builder

### SELECT Operations

#### Basic Select

```php
// Select all columns
$users = $db->select('users');

// Select specific columns
$users = $db->select('users', ['columns' => ['id', 'name', 'email']]);

// With conditions
$users = $db->select('users', [
    'conditions' => ['status' => 'active', 'role' => 'admin']
]);
```

#### Advanced Conditions

```php
// Array format with operators
$users = $db->select('users', [
    'conditions' => [
        ['age', '>', 18],
        ['status', '=', 'active'],
        ['name', 'LIKE', '%john%']
    ]
]);

// Nested AND/OR conditions
$users = $db->select('users', [
    'conditions' => [
        'status' => 'active',
        'OR' => [
            ['age', '>', 65],
            ['role', '=', 'premium']
        ]
    ]
]);

// Complex nested conditions
$users = $db->select('users', [
    'conditions' => [
        'AND' => [
            'status' => 'active',
            'OR' => [
                ['age', '>', 18],
                ['verified', '=', true]
            ]
        ]
    ]
]);
```

#### JOINs

```php
$data = $db->select('users', [
    'columns' => ['users.name', 'profiles.bio', 'roles.title'],
    'joins' => [
        [
            'type' => 'LEFT',
            'table' => 'profiles',
            'on' => [['users.id', '=', 'profiles.user_id']]
        ],
        [
            'type' => 'INNER', 
            'table' => 'user_roles ur',
            'on' => [['users.id', '=', 'ur.user_id']]
        ],
        [
            'type' => 'INNER',
            'table' => 'roles',
            'on' => [['ur.role_id', '=', 'roles.id']]
        ]
    ],
    'conditions' => ['users.status' => 'active']
]);
```

#### Grouping and Ordering

```php
$stats = $db->select('orders', [
    'columns' => ['status', 'COUNT(*) as count', 'SUM(amount) as total'],
    'conditions' => [['created_at', '>', '2024-01-01']],
    'groupBy' => ['status'],
    'having' => [['COUNT(*)', '>', 5]],
    'orderBy' => ['total' => 'DESC'],
    'limit' => 10
]);
```

#### selectOne()
Get a single record:

```php
$user = $db->selectOne('users', [
    'conditions' => ['email' => 'john@example.com'],
    'columns' => ['id', 'name', 'email'],
    'jsonDecodeAssoc' => false  // Optional: decode JSON as objects
]);
```

### INSERT Operations

#### Single Insert

```php
$rowsAffected = $db->insert([
    'table' => 'users',
    'data' => [
        'name' => 'John Doe',
        'email' => 'john@example.com',
        'status' => 'active',
        'metadata' => ['signup_source' => 'web', 'referrer' => 'google'] // Auto JSON-encoded
    ]
]);

// PostgreSQL/SQLite with RETURNING
$newUser = $db->insert([
    'table' => 'users',
    'data' => [
        'name' => 'Jane', 
        'email' => 'jane@example.com',
        'preferences' => ['theme' => 'light']
    ],
    'returning' => ['id', 'created_at']
]);
```

#### Batch Insert

```php
$rowsAffected = $db->insertBatch([
    'table' => 'users',
    'data' => [
        [
            'name' => 'User 1', 
            'email' => 'user1@example.com',
            'tags' => ['admin', 'beta']
        ],
        [
            'name' => 'User 2', 
            'email' => 'user2@example.com',
            'tags' => ['user']
        ],
        [
            'name' => 'User 3', 
            'email' => 'user3@example.com',
            'tags' => ['premium', 'vip']
        ]
    ]
]);
```

### UPDATE Operations

```php
$rowsAffected = $db->update([
    'table' => 'users',
    'data' => [
        'status' => 'inactive',
        'updated_at' => date('Y-m-d H:i:s'),
        'settings' => ['last_action' => 'logout', 'reason' => 'inactive'] // Auto JSON-encoded
    ],
    'conditions' => [
        ['last_login', '<', '2023-01-01'],
        'status' => 'active'
    ]
]);

// PostgreSQL/SQLite with RETURNING
$updatedUsers = $db->update([
    'table' => 'users',
    'data' => [
        'status' => 'premium',
        'upgrade_data' => ['date' => date('Y-m-d'), 'plan' => 'pro']
    ],
    'conditions' => ['id' => 123],
    'returning' => ['id', 'name', 'updated_at']
]);
```

### DELETE Operations

```php
$rowsAffected = $db->delete([
    'table' => 'users',
    'conditions' => [
        ['created_at', '<', '2020-01-01'],
        'status' => 'inactive'
    ]
]);

// PostgreSQL/SQLite with RETURNING
$deletedUsers = $db->delete([
    'table' => 'users',
    'conditions' => ['status' => 'banned'],
    'returning' => ['id', 'name']
]);
```

## Transactions

```php
try {
    $db->beginTransaction();
    
    $db->insert([
        'table' => 'orders', 
        'data' => [
            'user_id' => 1, 
            'total' => 100,
            'items' => [  // This array will be JSON-encoded
                ['product_id' => 1, 'quantity' => 2],
                ['product_id' => 2, 'quantity' => 1]
            ]
        ]
    ]);
    $orderId = $db->lastInsertId();
    
    $db->insertBatch([
        'table' => 'order_items',
        'data' => [
            ['order_id' => $orderId, 'product_id' => 1, 'quantity' => 2],
            ['order_id' => $orderId, 'product_id' => 2, 'quantity' => 1]
        ]
    ]);
    
    $db->commit();
} catch (Exception $e) {
    $db->rollBack();
    throw $e;
}
```

## Condition Syntax Reference

### Simple Conditions (Associative Array)
```php
['column' => 'value']           // column = 'value'
['column' => null]              // column IS NULL
```

### Array Format with Operators
```php
['column', 'operator', 'value']        // column operator value
['age', '>', 18]                       // age > 18
['name', 'LIKE', '%john%']             // name LIKE '%john%'
['status', 'IN', [1, 2, 3]]            // status IN (1, 2, 3)
['role', 'NOT IN', ['guest', 'temp']]  // role NOT IN ('guest', 'temp')
['created_at', 'BETWEEN', ['2024-01-01', '2024-12-31']] // created_at BETWEEN '2024-01-01' AND '2024-12-31'
['score', 'NOT BETWEEN', [0, 50]]      // score NOT BETWEEN 0 AND 50
```

**Note:** The `IN`, `NOT IN`, `BETWEEN`, and `NOT BETWEEN` operators automatically handle arrays by creating individual parameter bindings for each value, ensuring proper SQL injection protection while maintaining optimal query performance.

### EXISTS and NOT EXISTS Operators

The library supports `EXISTS` and `NOT EXISTS` operators with both raw SQL subqueries and structured array syntax:

#### Raw SQL Subquery
```php
// Find users who have orders
$usersWithOrders = $db->select('users', [
    'conditions' => [
        ['', 'EXISTS', 'SELECT 1 FROM orders WHERE orders.user_id = users.id']
    ]
]);

// Find users without any orders
$usersWithoutOrders = $db->select('users', [
    'conditions' => [
        ['', 'NOT EXISTS', 'SELECT 1 FROM orders WHERE orders.user_id = users.id']
    ]
]);
```

#### Structured Array Syntax
```php
// Find active users with completed orders
$users = $db->select('users', [
    'conditions' => [
        'status' => 'active',
        ['', 'EXISTS', [
            'table' => 'orders',
            'conditions' => [
                'orders.user_id = users.id',  // Correlation condition
                'status' => 'completed'
            ]
        ]]
    ]
]);

// Complex EXISTS with JOINs
$usersWhoBoughtElectronics = $db->select('users', [
    'conditions' => [
        ['', 'EXISTS', [
            'table' => 'orders o',
            'joins' => [
                [
                    'type' => 'INNER',
                    'table' => 'order_items oi',
                    'on' => [['o.id', '=', 'oi.order_id']]
                ],
                [
                    'type' => 'INNER',
                    'table' => 'products p',
                    'on' => [['oi.product_id', '=', 'p.id']]
                ]
            ],
            'conditions' => [
                'o.user_id = users.id',
                ['p.category', '=', 'Electronics']
            ]
        ]]
    ]
]);
```

**Note:** For EXISTS/NOT EXISTS operators, use an empty string `''` as the column name since these operators don't apply to a specific column.

### Logical Operators
```php
[
    'status' => 'active',       // Default AND
    'age' => 25
]

[
    'OR' => [
        'status' => 'active',
        'role' => 'admin'
    ]
]

[
    'AND' => [
        'status' => 'active',
        'OR' => [
            ['age', '>', 65],
            'role' => 'premium'
        ]
    ]
]
```

### Raw SQL Conditions
```php
[
    'status' => 'active',
    'YEAR(created_at) = 2024'   // Raw SQL string
]

// Raw SQL with subqueries
[
    'status' => 'active',
    'id IN (SELECT user_id FROM orders WHERE total > 1000)'  // Subquery as raw SQL
]
```

## JSON Handling Examples

### Working with Complex Data

```php
// Insert user with complex preferences
$db->insert([
    'table' => 'users',
    'data' => [
        'name' => 'John',
        'preferences' => [
            'ui' => ['theme' => 'dark', 'language' => 'en'],
            'notifications' => [
                'email' => ['newsletters' => true, 'updates' => false],
                'push' => ['mentions' => true, 'messages' => true]
            ],
            'privacy' => ['public_profile' => false, 'show_email' => false]
        ]
    ]
]);

// Retrieve and work with the data
$user = $db->selectOne('users', ['conditions' => ['name' => 'John']]);
// $user['preferences']['ui']['theme'] === 'dark'
// $user['preferences']['notifications']['email']['newsletters'] === true

// Update specific preference
$currentPrefs = $user['preferences'];
$currentPrefs['ui']['theme'] = 'light';

$db->update([
    'table' => 'users',
    'data' => ['preferences' => $currentPrefs], // Will be re-encoded to JSON
    'conditions' => ['id' => $user['id']]
]);
```

### Controlling JSON Behavior

```php
// Disable JSON for specific operations
$db = new Client('mysql:host=localhost;dbname=test', [
    'username' => 'user',
    'password' => 'pass',
    'encodeJson' => false,  // Disable auto-encoding
    'decodeJson' => false   // Disable auto-decoding
]);

// Or control per-query
$user = $db->selectOne('users', [
    'conditions' => ['id' => 1],
    'jsonDecodeAssoc' => false  // Decode JSON as stdClass objects
]);
```

## Aggregate Functions

ESQL provides convenient methods for common aggregate operations:

### count()
Count records in a table:

```php
// Simple count
$totalUsers = $db->count('users');

// Count with conditions
$activeUsers = $db->count('users', [
    'conditions' => ['status' => 'active']
]);

// Count distinct values
$uniqueCities = $db->count('users', [
    'distinct' => true,
    'column' => 'city'
]);

// Count with joins
$usersWithOrders = $db->count('users', [
    'joins' => [
        [
            'type' => 'INNER',
            'table' => 'orders',
            'on' => [['users.id', '=', 'orders.user_id']]
        ]
    ],
    'distinct' => true,
    'column' => 'users.id'
]);
```

### avg()
Calculate average value of a column:

```php
// Simple average
$avgAge = $db->avg('users', 'age');

// Average with conditions
$avgPremiumAge = $db->avg('users', 'age', [
    'conditions' => ['subscription' => 'premium']
]);

// Average of distinct values
$avgUniqueScore = $db->avg('game_scores', 'score', [
    'distinct' => true
]);

// Average with joins
$avgOrderAmount = $db->avg('orders', 'amount', [
    'joins' => [
        [
            'type' => 'INNER',
            'table' => 'users',
            'on' => [['orders.user_id', '=', 'users.id']]
        ]
    ],
    'conditions' => ['users.country' => 'US']
]);
```

### sum()
Calculate sum of column values:

```php
// Simple sum
$totalRevenue = $db->sum('orders', 'amount');

// Sum with conditions
$monthlyRevenue = $db->sum('orders', 'amount', [
    'conditions' => [
        ['created_at', '>=', '2024-01-01'],
        ['created_at', '<', '2024-02-01']
    ]
]);

// Sum distinct values
$uniqueAmounts = $db->sum('payments', 'amount', [
    'distinct' => true
]);

// Sum with joins
$categoryRevenue = $db->sum('order_items', 'quantity * price', [
    'joins' => [
        [
            'type' => 'INNER',
            'table' => 'products',
            'on' => [['order_items.product_id', '=', 'products.id']]
        ]
    ],
    'conditions' => ['products.category' => 'Electronics']
]);
```

### exists()
Check if records exist (more efficient than count > 0):

```php
// Simple existence check
if ($db->exists('users', ['email' => 'john@example.com'])) {
    echo "User already exists";
}

// With multiple conditions
$hasActiveAdmin = $db->exists('users', [
    'conditions' => [
        'role' => 'admin',
        'status' => 'active'
    ]
]);

// With joins
$hasOrders = $db->exists('orders', [
    'joins' => [
        [
            'type' => 'INNER',
            'table' => 'users',
            'on' => [['orders.user_id', '=', 'users.id']]
        ]
    ],
    'conditions' => [
        'users.email' => 'john@example.com',
        ['orders.created_at', '>', '2024-01-01']
    ]
]);
```

### pluck()
Extract values from a single column as an array:

```php
// Get all email addresses
$emails = $db->pluck('users', 'email');
// Returns: ['john@example.com', 'jane@example.com', ...]

// Pluck with conditions and ordering
$topUsernames = $db->pluck('users', 'username', [
    'conditions' => ['status' => 'active'],
    'orderBy' => ['score' => 'DESC'],
    'limit' => 10
]);

// Create associative array with keyColumn
$userNames = $db->pluck('users', 'name', [
    'keyColumn' => 'id'
]);
// Returns: [1 => 'John', 2 => 'Jane', 3 => 'Bob', ...]

// Pluck with joins
$orderNumbers = $db->pluck('orders', 'order_number', [
    'joins' => [
        [
            'type' => 'INNER',
            'table' => 'users',
            'on' => [['orders.user_id', '=', 'users.id']]
        ]
    ],
    'conditions' => ['users.country' => 'US'],
    'orderBy' => ['orders.created_at' => 'DESC']
]);

// Get user ID to email mapping
$userEmails = $db->pluck('users', 'email', [
    'keyColumn' => 'id',
    'conditions' => ['verified' => true]
]);
// Returns: [1 => 'john@example.com', 2 => 'jane@example.com', ...]
```

**Note:** When using `keyColumn`, duplicate keys will overwrite previous values. The last occurrence of a key will be retained.

## Utility Methods

```php
// Get driver name
$driver = $db->getDriverName(); // 'mysql', 'pgsql', or 'sqlite'

// Get PDO instance
$pdo = $db->getPdo();

// Get last insert ID
$id = $db->lastInsertId();

// Transaction status
$inTransaction = $db->inTransaction();

// Close connection
$db->close();
```

## Error Handling

ESQL throws `PDOException` for database errors and `InvalidArgumentException` for invalid parameters:

```php
try {
    $db = new Client('invalid:dsn');
} catch (InvalidArgumentException $e) {
    echo "Invalid DSN: " . $e->getMessage();
} catch (PDOException $e) {
    echo "Database error: " . $e->getMessage();
}
```

## Database-Specific Features

### MySQL
- Uses backticks for identifier quoting: `` `column` ``
- LIMIT with offset: `LIMIT offset, limit`

### PostgreSQL  
- Uses double quotes for identifier quoting: `"column"`
- Supports RETURNING clauses
- Standard LIMIT/OFFSET: `LIMIT limit OFFSET offset`

### SQLite
- Uses double quotes for identifier quoting: `"column"`
- Supports RETURNING clauses (modern SQLite versions)
- Standard LIMIT/OFFSET syntax

## Best Practices

1. **Always use conditions** for UPDATE and DELETE operations (required by ESQL)
2. **Use transactions** for multi-step operations
3. **Leverage automatic JSON handling** for complex data structures
4. **Use batch operations** for multiple inserts
5. **Handle exceptions** appropriately
6. **Close connections** when done (automatic in destructor)
7. **Consider disabling JSON handling** if working with raw JSON strings

## License

This library is provided as-is. Please ensure it meets your security and performance requirements before using in production.