# System Module

[![Core Module](https://img.shields.io/badge/Type-Core%20Module-blue.svg)](https://getcockpit.com)

> **Core system functionality, administration, and platform utilities for Cockpit CMS**

The System module provides essential platform services including user management, API access control, logging, localization, worker processes, and system administration tools. It forms the backbone of Cockpit's administrative capabilities.

## ✨ Features

### 👥 **User Management**
- **User Accounts** - Create and manage user accounts with profiles
- **Role-based Access Control** - Define custom roles with granular permissions
- **Two-Factor Authentication** - Optional 2FA for enhanced security
- **User Sessions** - Track active sessions and login history

### 🔐 **API & Security**
- **API Key Management** - Generate and manage API keys with permissions
- **GraphQL Playground** - Interactive GraphQL API explorer
- **REST API Documentation** - Auto-generated OpenAPI/Swagger docs
- **Rate Limiting** - Protect APIs from abuse

### 🌍 **Localization System**
- **Language Management** - Define available languages and default locale
- **Translation Interface** - Manage UI translations
- **Content Localization** - Support for multilingual content
- **Locale Detection** - Automatic locale resolution

### 📊 **Logging & Monitoring**
- **Activity Logs** - Track system events and user actions
- **Error Logging** - Capture and review system errors
- **Audit Trail** - Security-relevant event tracking
- **Log Channels** - Organize logs by type and source

### ⚙️ **System Tools**
- **Worker Processes** - Background job processing
- **Health Checks** - Monitor system components
- **Cache Management** - Clear and manage caches
- **Terminal Access** - Execute system commands
- **Backup Tools** - Database and file backups

### 🏢 **Multi-tenancy (Spaces)**
- **Space Management** - Create isolated tenant spaces
- **Space Configuration** - Per-space settings and storage
- **Space Switching** - Easy navigation between spaces
- **Resource Isolation** - Separate data and files per space

## 🚀 Quick Start

### User Management

```php
// Get current user
$user = $app->helper('auth')->getUser();

// Create new user
$user = $app->dataStorage->save('system/users', [
    'name' => 'John Doe',
    'email' => 'john@example.com',
    'password' => password_hash('secure-password', PASSWORD_DEFAULT),
    'role' => 'editor',
    'active' => true
]);

// Find users
$users = $app->dataStorage->find('system/users', [
    'filter' => ['active' => true],
    'sort' => ['name' => 1]
]);

// Update user
$app->dataStorage->save('system/users', [
    '_id' => $userId,
    'active' => false
]);
```

### API Key Management

```php
// Generate API key
$apiKey = $app->helper('api')->generateKey();

// Save API key with permissions
$app->dataStorage->save('system/api', [
    'name' => 'Mobile App Key',
    'key' => $apiKey,
    'active' => true,
    'permissions' => [
        'content/*/read',
        'assets/read'
    ]
]);

// Validate API key
$isValid = $app->helper('api')->isValidKey($apiKey);
```

### Logging

```php
// Log to default channel
$app->module('system')->log('User logged in', 'system', 'info', [
    'user' => $user['_id'],
    'ip' => $_SERVER['REMOTE_ADDR']
]);

// Use specific log channel
$logger = $app->helper('log')->channel('security');
$logger->warning('Failed login attempt', ['email' => $email]);

// Query logs
$logs = $app->dataStorage->find('system/logs', [
    'filter' => [
        'channel' => 'security',
        'level' => 'warning',
        'timestamp' => ['$gte' => strtotime('-24 hours')]
    ],
    'sort' => ['timestamp' => -1]
]);
```

### Localization

```php
// Get available locales
$locales = $app->helper('locales')->locales();

// Get current locale
$locale = $app->helper('locales')->getLocale();

// Translate string
$translated = $app->helper('i18n')->get('Save');
$translated = $app->helper('i18n')->get('Welcome, :name', [':name' => $user['name']]);

// Apply locale to data
$localizedData = $app->helper('locales')->applyLocales($data, 'de');
```

## 📋 Core Components

### Helpers

#### **API Helper** (`system.api`)
```php
// Generate API key
$key = $app->helper('api')->generateKey();

// Validate key
$valid = $app->helper('api')->isValidKey($key);

// Get key permissions
$permissions = $app->helper('api')->getKeyPermissions($key);
```

#### **Log Helper** (`system.log`)
```php
// Get log channel
$logger = $app->helper('log')->channel('custom');

// Log levels
$logger->emergency('System is down');
$logger->alert('Action must be taken immediately');
$logger->critical('Critical conditions');
$logger->error('Error conditions');
$logger->warning('Warning conditions');
$logger->notice('Normal but significant condition');
$logger->info('Informational messages');
$logger->debug('Debug-level messages');
```

#### **Locales Helper** (`system.locales`)
```php
// Get configured locales
$locales = $app->helper('locales')->locales();

// Get default locale
$default = $app->helper('locales')->getDefaultLocale();

// Apply locale to data
$localized = $app->helper('locales')->applyLocales($data, 'fr');

// Get locale from request
$locale = $app->helper('locales')->getLocaleFromRequest();
```

#### **System Helper** (`system.system`)
```php
// Get system information
$info = $app->helper('system')->getInfo();

// Get server load
$load = $app->helper('system')->getServerLoad();

// Get disk usage
$disk = $app->helper('system')->getDiskUsage();

// Execute command
$output = $app->helper('system')->exec('ls -la');
```

#### **Worker Helper** (`system.worker`)
```php
// Queue job
$app->helper('worker')->queue('email:send', [
    'to' => 'user@example.com',
    'subject' => 'Welcome!',
    'template' => 'welcome'
]);

// Process queue
$app->helper('worker')->process();

// Get queue status
$status = $app->helper('worker')->status();
```

#### **Spaces Helper** (`system.spaces`)
```php
// Get available spaces
$spaces = $app->helper('spaces')->spaces();

// Create space
$app->helper('spaces')->create('tenant1', [
    'name' => 'Tenant One',
    'config' => ['theme' => 'custom']
]);

// Switch to space
$app->helper('spaces')->switch('tenant1');

// Get current space
$space = $app->helper('spaces')->current();
```

## 🔧 Configuration

### User Roles & Permissions

```php
// Define custom role
$app->dataStorage->save('system/roles', [
    'name' => 'content_editor',
    'label' => 'Content Editor',
    'permissions' => [
        'content/*',
        'assets/read',
        'assets/upload'
    ]
]);

// Check permission
$allowed = $app->helper('acl')->isAllowed('content/create', $user['role']);

// Add permission to role
$app->helper('acl')->addPermission('content_editor', 'content/publish');
```

## 🌐 API Reference

### REST API

#### Health Check
```bash
GET /api/system/healthcheck?checks=db,memory,fs,redis,smtp

Response:
{
    "status": "ok",
    "checks": {
        "db": true,
        "memory": true,
        "fs": true,
        "redis": false,
        "smtp": true
    }
}
```

## 🖥️ CLI Commands

### Cache Management
```bash
# Flush all caches
./tower system:cache:flush

# Flush specific cache
./tower system:cache:flush --cache=data
```

### Worker Management
```bash
# Start worker
./tower system:worker:start

# Stop worker
./tower system:worker:stop

# List workers
./tower system:worker:list
```

### Space Management
```bash
# Create new space
./tower system:spaces:create tenant2 --name="Tenant Two"

# List spaces
./tower system:spaces:list
```

### Translations
```bash
# Create translation file
./tower system:i18n:create de
```

## 🔒 Security

### Authentication
```php
// Login user
$user = $app->helper('auth')->authenticate($email, $password);

// Verify current user password
$verified = $app->module('system')->verifyUser($password);

// Logout
$app->helper('auth')->logout();
```

## 🔧 Events & Hooks

```php
// User events
$app->on('system.user.login', function($user) {
    $this->module('system')->log("User login: {$user['email']}");
});

$app->on('system.user.logout', function($user) {
    // Clear user cache
});

$app->on('system.user.save', function(&$user, $isUpdate) {
    // Validate user data
});

// API events
$app->on('system.api.request', function($key) {
    // Log API usage
});

// System events
$app->on('system.error', function($error) {
    // Send error notification
});
```

## 🐛 Troubleshooting

### Common Issues

**❌ Login failures**
- Check user is active
- Verify password is correct
- Check for 2FA requirement
- Review login attempt logs

**❌ API key not working**
- Ensure key is active
- Check permissions match request
- Verify rate limits
- Check IP restrictions

**❌ Missing translations**
- Clear translation cache
- Check locale file exists
- Verify locale is enabled
- Check for typos in translation keys

**❌ Worker not processing**
- Check worker is running
- Verify queue connection
- Check for job errors
- Review worker logs

## 📄 License

This is a core module of Cockpit CMS distributed under the MIT license.

---

**System Module** - The foundation of Cockpit's administrative capabilities, providing user management, security, logging, and essential platform services.