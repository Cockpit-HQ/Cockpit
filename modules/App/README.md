# App Module

The App module is the core module of Cockpit CMS, providing essential functionality including authentication, access control, internationalization, theming, and the administrative interface.

## Table of Contents

- [Overview](#overview)
- [Helpers](#helpers)
- [Controllers](#controllers)
- [Routes](#routes)
- [API Infrastructure](#api-infrastructure)
- [Security Features](#security-features)
- [Real-time Features](#real-time-features)
- [Configuration](#configuration)

## Overview

The App module provides the foundation for Cockpit's administrative interface and API layer. It handles user authentication, session management, permissions, and provides various utilities for other modules to build upon.

## Helpers

### Acl
Access Control List management for role-based permissions.

```php
$app->helper('acl')->isAllowed($permission, $role);
$app->helper('acl')->addResource($resource, $actions);
$app->helper('acl')->allow($role, $resource, $actions);
$app->helper('acl')->deny($role, $resource, $actions);
```

### Admin
Administrative utilities and resource locking mechanism.

```php
// Lock a resource for editing
$app->helper('admin')->lockResourceId($resourceId, $user);

// Unlock a resource
$app->helper('admin')->unlockResourceId($resourceId);

// Get locked resources by user
$app->helper('admin')->getLockedResourceIdsByUser($userId);

// Broadcast lock status via EventStream
$app->helper('admin')->broadcastLockResource($resourceId, $userId, $locked);
```

### ApiRateLimiter
Rate limiting for API requests to prevent abuse.

```php
$app->helper('apiRateLimiter')->validate($key, $limit = 100, $duration = 60);
$app->helper('apiRateLimiter')->reset($key);
```

### Auth
User authentication and management.

```php
// Authenticate user
$app->helper('auth')->authenticate($user, $password);

// Get current user
$user = $app->helper('auth')->getUser();

// Generate password reset token
$token = $app->helper('auth')->generatePasswordResetToken($user);

// API authentication
$app->helper('auth')->apiAuthentication();

// Logout
$app->helper('auth')->logout();
```

### Csrf
Cross-Site Request Forgery protection.

```php
// Generate CSRF token
$token = $app->helper('csrf')->token($name);

// Validate CSRF token
$isValid = $app->helper('csrf')->isValid($name, $token);

// Generate HTML meta tag
echo $app->helper('csrf')->meta($name);
```

### EventStream
Real-time event streaming for server-to-client communication.

```php
// Add event to stream
$app->helper('eventStream')->add('notify', [
    'message' => 'Hello World',
    'status' => 'success'
], [
    'to' => $userId, // Optional: target specific user
    'sessionId' => $sessionId // Optional: target specific session
]);

// Get events since timestamp
$events = $app->helper('eventStream')->getEvents($timestamp);

// Cleanup old events (automatically called)
$app->helper('eventStream')->cleanup();
```

### JWT
JSON Web Token creation and validation using Firebase JWT library.

```php
// Create JWT token (uses HS256 algorithm)
$token = $app->helper('jwt')->create($payload, $key = null);

// Alias for create
$token = $app->helper('jwt')->encode($payload, $key = null);

// Decode and verify JWT token
$payload = $app->helper('jwt')->decode($token, $key = null);

// Note: If no key is provided, uses app's 'sec-key' configuration
```

### Menus
Dynamic menu management for the admin interface.

```php
// Register menu section
$app->helper('menus')->addSection($route, $label, $icon);

// Register menu item
$app->helper('menus')->addLink($section, [
    'label' => 'My Item',
    'icon' => 'icon-name',
    'route' => '/my/route',
    'active' => '/my/*'
]);

// Get all sections
$sections = $app->helper('menus')->sections();
```

### ResponseCache
Response caching for improved API performance.

```php
// Check if response is cached
$cached = $app->helper('responseCache')->get($key);

// Cache a response
$app->helper('responseCache')->set($key, $data, $ttl = 300);

// Clear cache
$app->helper('responseCache')->clear($pattern = null);
```

### Theme
Theme and page styling management.

```php
// Set page class
$app->helper('theme')->pageClass('my-custom-class');

// Set favicon
$app->helper('theme')->favicon('path/to/favicon.ico');

// Add assets
$app->helper('theme')->style('path/to/style.css');
$app->helper('theme')->script('path/to/script.js');
```

### TWFA (Two-Factor Authentication)
Two-factor authentication support using RobThree/TwoFactorAuth library.

```php
// Generate secret (default: 160 bits)
$secret = $app->helper('twfa')->createSecret($length = 160);

// Get QR code as data URI (SVG format)
$qrCodeUri = $app->helper('twfa')->getQRCodeImageAsDataUri($secret, $size = 150);

// Get QR code as binary image data
$qrCodeBinary = $app->helper('twfa')->getQRCodeImage($secret, $size = 150);

// Verify TOTP code (6 digits, 30 second window, SHA1)
$isValid = $app->helper('twfa')->verifyCode($secret, $code);

// Note: Uses Bacon QR Code provider for SVG generation
```

### i18n
Internationalization and localization support.

```php
// Translate string
$translated = $app->helper('i18n')->get('Hello', 'default value');

// Load translation file
$app->helper('i18n')->load('path/to/translations.php', 'locale');

// Get/set locale
$locale = $app->helper('i18n')->locale;
```

## Controllers

### Auth Controller
Handles all authentication-related routes:
- `/auth/login` - User login page/API
- `/auth/logout` - User logout
- `/auth/check` - Check authentication status
- `/auth/forgotpassword` - Password reset request
- `/auth/newpassword` - Set new password
- `/auth/magic` - Magic link authentication
- `/auth/activate2fa` - Enable 2FA
- `/auth/deactivate2fa` - Disable 2FA

### Dashboard Controller
- `/` - Main dashboard page displaying system information

### Utils Controller
Utility endpoints for various admin functions:
- `/utils/users` - User management interface
- `/utils/user` - User profile editing
- `/utils/spaces` - Multi-tenancy management
- `/utils/account` - Account settings

## Routes

### Admin Routes

```php
// Main dashboard
$app->bind('/', 'App\\Controller\\Dashboard:index');

// Authentication
$app->bindClass('App\\Controller\\Auth', '/auth');

// Utilities
$app->bindClass('App\\Controller\\Utils', '/utils');

// Session check
$app->bind('/check-session', function() {
    // Returns session status and CSRF token
});

// Event stream for real-time updates
$app->bind('/app-event-stream', function() {
    // Long-polling endpoint for server events
});

// i18n data
$app->bind('/app.i18n.data.js', function() {
    // Returns localized strings as JavaScript
});
```

### API Routes

```php
// GraphQL endpoint
$app->bind('/api/gql', function() {
    // GraphQL query processor
});

// Dynamic REST API routing
$app->bind('/api/*', function($params) {
    // Processes REST API requests
    // Supports file-based routing in #config:api/
});
```

## API Infrastructure

### REST API Routing

The App module provides a flexible REST API routing system through the `RestApi\Query` class:

1. **Programmatic Routes**: Register endpoints via events
2. **File-based Routes**: Automatic routing based on file structure

#### File-based Routing Conventions:
```
#config:api/
├── users.php           # /api/users (all methods)
├── users.get.php       # /api/users (GET only)
├── users.post.php      # /api/users (POST only)
├── users/
│   ├── [id].php        # /api/users/:id (dynamic parameter)
│   └── [id].delete.php # /api/users/:id (DELETE only)
└── posts/
    └── [...all].php    # /api/posts/* (catch-all route)
```

#### Route Parameters:
- Dynamic parameters: `[paramName]` files capture URL segments
- Catch-all routes: `[...all]` files handle remaining path segments
- Method-specific files: `filename.{method}.php` for HTTP method routing

#### API File Structure:
```php
// config/api/users/[id].php
<?php
// Access parameters via $API_ARGS
$userId = $API_ARGS['id'] ?? null;

// $this context is bound to the app instance
return [
    'user' => $this->dataStorage->findOne('users', ['_id' => $userId])
];
```

### GraphQL Support

Full GraphQL implementation through the `GraphQL\Query` class:

Features:
- Query and Mutation support
- Custom types and directives
- Automatic JSON parsing in responses
- Context-aware execution

```php
// Register GraphQL queries via event
$app->on('graphql.config', function($gql) {
    // Add query
    $gql->queries['fields']['myQuery'] = [
        'type' => Type::string(),
        'resolve' => function($root, $args) {
            return 'Hello GraphQL';
        }
    ];
    
    // Add mutation
    $gql->mutations['fields']['myMutation'] = [
        'type' => Type::boolean(),
        'args' => [
            'input' => Type::string()
        ],
        'resolve' => function($root, $args) {
            // Process mutation
            return true;
        }
    ];
});
```

The GraphQL endpoint automatically handles JSON string responses and converts them to proper objects/arrays.

### API Authentication

Multiple authentication methods:
- API Key (`api-key` header)
- Bearer Token (`Authorization: Bearer <token>`)
- User Token (`cockpit-token` header)
- Session-based (for logged-in users)

## Security Features

### CSRF Protection
- Automatic token generation
- Token validation on state-changing requests
- Integration with forms and AJAX requests

### API Security
- CORS support with configurable allowed origins
- Rate limiting to prevent abuse
- API key validation
- JWT token support

### Session Management
- Configurable session lifetime (default: 90 minutes)
- Automatic session validation
- Secure session handling

### Headers
- `X-Frame-Options: SAMEORIGIN` to prevent clickjacking
- Security headers for API responses

## Real-time Features

### EventStream System

Server-sent events implementation for real-time updates:

```javascript
// Client-side (automatically initialized)
window.AppEventStream.on('custom-event', function(evt) {
    console.log('Received:', evt.data);
});

// Built-in event types:
// - notify: Show notification
// - alert: Show alert dialog
// - logout: Force user logout
```

Features:
- 15-second polling interval
- Automatic cleanup of old events (5 minutes)
- User and session targeting
- Extensible event types

### Resource Locking

Prevents concurrent editing:
- Automatic lock when user opens resource
- Visual indication of locked resources
- Automatic unlock on navigation
- EventStream notifications to other users

## Configuration

### Session Configuration

```php
// config/config.php
return [
    'session.name' => 'cockpit-session',
    'session.lifetime' => 5400, // 90 minutes
];
```

### API Configuration

```php
// config/config.php
return [
    'api.security' => true,
    'api.allowed_origins' => ['https://example.com'],
    'cors.allowedOrigins' => '*',
    'cors.allowedMethods' => 'GET, POST, PUT, DELETE, OPTIONS',
    'cors.allowedHeaders' => '*',
];
```

### i18n Configuration

The i18n system automatically detects the client language or uses the user's preferred language setting.

Translation files are loaded in the following order:
1. Custom translations: `#config:i18n/{locale}/{ModuleName}.php`
2. Module translations: `modules/{ModuleName}/i18n/{locale}.php`

For space-specific installations:
- Space translations: `#config:i18n/{locale}/{ModuleName}.php`
- Fallback to app: `#app:config/i18n/{locale}/{ModuleName}.php`

Translation file format:
```php
// config/i18n/de/App.php
<?php
return [
    'Dashboard' => 'Übersicht',
    'Users' => 'Benutzer',
    'Settings' => 'Einstellungen',
    // ... more translations
];
```

The system loads translations automatically based on:
- User's i18n preference (stored in user profile)
- Browser language detection (via `getClientLang()`)
- Default fallback to 'en'

## Events

The App module triggers various events for extensibility:

- `app.admin.request` - Admin request initialized
- `app.admin.init` - Admin interface initialized
- `app.api.request` - API request received
- `restApi.config` - Configure REST API endpoints
- `graphql.config` - Configure GraphQL schema
- `app.i18n.load` - i18n translations loaded

## Usage Examples

### Custom API Endpoint

```php
// config/api/custom/endpoint.php
<?php
return [
    'message' => 'Hello from custom endpoint',
    'user' => $this->helper('auth')->getUser()
];
```

### Broadcasting Events

```php
// Notify all users
$this->helper('eventStream')->add('notify', [
    'message' => 'System maintenance in 5 minutes',
    'status' => 'warning'
]);

// Target specific user
$this->helper('eventStream')->add('notify', [
    'message' => 'Your export is ready',
    'status' => 'success'
], ['to' => $userId]);
```

### Custom Menu Item

```php
// In module bootstrap
$app->on('app.admin.init', function() {
    $this->helper('menus')->addLink('modules', [
        'label' => 'My Module',
        'icon' => 'my-icon',
        'route' => '/my-module',
        'active' => '/my-module/*'
    ]);
});
```

## Frontend Assets

The App module provides core frontend functionality:

- Vue.js 3 integration
- Custom web components (fields-renderer, etc.)
- KISS CSS framework
- App.js with utilities and UI helpers
- i18n client-side support

## Debugging

Enable debug mode for detailed error information:

```php
// config/config.php
return [
    'debug' => true
];
```

This will show detailed error messages and stack traces in development.