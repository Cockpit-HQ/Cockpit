# AGENTS.md

This document provides guidance for AI agents working with the Cockpit codebase.

## Project Overview

Cockpit is a headless CMS and content platform built on the **Lime Framework**. It provides a REST/GraphQL API for content management with support for MongoDB and SQLite backends.

### Key Characteristics
- **PHP 8.3+** backend with **Vue 3** frontend
- **Event-driven architecture** using `$app->on()` / `$app->trigger()`
- **Modular design** with core modules in `/modules` and extensions in `/addons`
- **Multitenancy** support via spaces (`:space` URL prefix)
- **Unified storage** abstraction supporting MongoDB and SQLite

### Directory Structure
```
/modules/          # Core system modules (App, Content, Assets, System, Finder)
/addons/           # Optional extensions
/lib/              # Core libraries (Lime, MongoHybrid, etc.)
/config/           # Configuration files, i18n, API routes
/storage/          # Data, cache, uploads (runtime)
```

### Core Modules
- **App** - Authentication, ACL, admin UI, API infrastructure
- **Content** - Collections, Singletons, Trees content models
- **Assets** - File/image management
- **System** - Settings, locales, API keys
- **Finder** - File browser

## Build and Test Commands

### Frontend Build
```bash
npm run build          # Build bundled CSS and JS assets
npm run watch          # Watch for changes and rebuild
npm run build-bundle   # Build app bundle using Rollup
```

### PHP Development Server
```bash
composer serve         # Start dev server at localhost:8080
```

### CLI Commands (Tower)
```bash
./tower                          # List available CLI commands
./tower app:cache:flush          # Flush app cache
```

### Installation
Navigate to `/install` in browser for initial setup. Ensure `/storage` directory is writable.

## Code Style Guidelines

### Formatting Standards
The project uses EditorConfig. Key settings:
- **Indentation**: 4 spaces (PHP, JS, CSS)
- **Line endings**: LF
- **Charset**: UTF-8
- **Trailing whitespace**: Trimmed
- **Final newline**: Required

### PHP Conventions
- Use namespace matching directory structure (e.g., `namespace App\Helper`)
- Classes extend framework base classes (`\Lime\Helper`, `\Lime\App`)
- Use typed properties and return types (PHP 8.3+ features)
- Follow PSR-4 autoloading conventions

```php
// Example class structure
namespace App\Helper;

class ExampleHelper extends \Lime\Helper {

    public string $property = 'value';

    public function methodName(array $data): mixed {
        // Implementation
    }
}
```

### Module File Organization
```
ModuleName/
├── bootstrap.php     # Module init and service registration
├── admin.php         # Admin UI routes
├── api.php           # API endpoints
├── cli.php           # CLI commands (optional)
├── Controller/       # MVC controllers
├── Helper/           # Business logic
├── assets/           # Frontend assets
├── views/            # View templates
└── icon.svg          # Module icon
```

### JavaScript Conventions
- Use ES6+ syntax
- Global `App` object for framework utilities
- Vue 3 components in `assets/vue-components/`
- KISS CSS framework for styling

### Event Naming
- Use dot notation: `app.init`, `content.save`, `graphql.config`
- Prefix with module name for module-specific events

## Testing Instructions

### Current Testing State
The project uses informal test scripts in `/tests/` rather than a formal testing framework. Tests are PHP scripts that can be run directly.

### Running Tests
```bash
# Run individual test scripts
php tests/test.php
php tests/expression.php
php tests/indexlite_smoke.php
```

### Manual Testing Workflow
1. Start the development server: `composer serve`
2. Navigate to `localhost:8080/install` for fresh installation
3. Test API endpoints at `/api/*`
4. Test GraphQL at `/api/gql`

### API Testing
Use these authentication headers:
- `Cockpit-Token` - User/API token
- `Authorization: Bearer <token>` - JWT
- `API-KEY` - API key

### Creating Test Data
```php
// Via CLI or bootstrap
$app = Cockpit::instance();
$app->dataStorage->save('collection_name', [
    'field' => 'value'
]);
```

## Security Considerations

### Authentication and Authorization
- **Password hashing**: Uses `password_verify()` with bcrypt
- **Session security**: Implements session fixation prevention via `regenerateId()`
- **ACL system**: Role-based access control via `Acl` helper
- **CSRF protection**: Built-in CSRF token validation

### Input Validation
- Always validate and sanitize user input before database operations
- Use typed parameters in API endpoints
- Escape output in views using appropriate helpers

### Database Security
- Use parameterized queries through MongoHybrid abstraction
- Never construct queries from raw user input
- Recent security updates block `$out` and `$merge` aggregation stages
- Field names are sanitized in `toJsonPath` to prevent injections

### API Security
- API rate limiting available via `ApiRateLimiter` helper
- Token-based authentication for API access
- JWT support for stateless authentication
- 2FA support via `TWFA` helper

### File Upload Security
- Validate file types and extensions
- Use Flysystem abstraction for file operations
- Store uploads outside web root when possible
- Sanitize filenames before storage

### Secrets Management
- Store sensitive config in `/config/config.php` (not version controlled)
- Use `.env` files for environment-specific secrets
- Change default `sec-key` in production
- Never commit API keys or tokens

### Security Patterns to Follow
```php
// Always check permissions
if (!$this->app->helper('acl')->isAllowed('permission', $role)) {
    return $this->stop(403);
}

// Validate CSRF tokens
if (!$this->app->helper('csrf')->isValid('token_name', $token)) {
    return $this->stop(403);
}
```

## Additional Agent Guidance

### Making Changes
1. Read and understand (addons|modules)/*/README.md for detailed module documentation
2. Follow existing patterns in the codebase
3. Test changes with the development server
4. Clear caches after configuration changes: `./tower app:cache:flush`

### Common Tasks

**Adding an API endpoint:**
Create file in `config/api/`:
- `endpoint.php` - All methods
- `endpoint.get.php` - GET only
- `endpoint/[id].php` - With route parameter

**Adding a module:**
1. Create directory in `/addons/`
2. Add `bootstrap.php` for initialization
3. Add `api.php` for API routes
4. Add `admin.php` for admin UI

**Extending functionality:**
Use the event system:
```php
$app->on('event.name', function($data) {
    // Handle event
});
```

### Debugging
- Enable debug mode in config: `'debug' => true`
- Check `/storage/cache/` for cached data
- Review error logs in PHP error log location
- Use `$app->trigger('error', [...])` for error handling
