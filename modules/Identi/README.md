# Identi - OpenID Connect Authentication for Cockpit CMS

[![Core Module](https://img.shields.io/badge/Type-Core%20Module-blue.svg)](https://getcockpit.com)

Identi is a module for Cockpit CMS that provides OpenID Connect (OIDC) authentication support, allowing users to authenticate using external identity providers like Azure AD, Google, Keycloak, Auth0, and other OIDC-compliant services.

## Features

- **OpenID Connect Support**: Full OIDC authentication flow with PKCE support
- **Automatic User Management**: Creates and updates users based on OIDC claims
- **Role Mapping**: Maps OIDC claims to Cockpit user roles with security controls
- **Flexible Field Mapping**: Configure which OIDC claims map to user fields
- **Security Features**: Input validation, role restrictions, and default fallbacks
- **Session Management**: Proper token handling and logout support
- **Back-Channel Logout**: RFC 8471 compliant server-to-server logout support

## Configuration

Add the Identi configuration to your Cockpit configuration file (usually `config/config.php` or via the admin interface):

```php
'identi' => [
    // Required settings
    'provider_url' => 'https://your-oidc-provider.com',
    'client_id' => 'your-client-id',
    'client_secret' => 'your-client-secret',
    
    // Optional settings
    'issuer' => null,                    // OIDC issuer URL (auto-discovered if null)
    'pkce' => true,                      // Enable PKCE (recommended: true)
    'scopes' => 'openid profile email',  // OIDC scopes to request
    
    // Field mapping configuration
    'mapping' => [
        'email' => 'email',              // OIDC claim → Cockpit field
        'user' => 'preferred_username',  // Username field mapping
        'name' => 'name',                // Display name mapping
        'role' => 'groups'               // Role/group claim mapping
    ],
    
    // Security and role management
    'allowed_roles' => ['editor', 'admin'], // Restrict roles (null = allow all)
    'default_role' => 'editor',             // Default role if none provided
    
    // UI customization
    'loginText' => 'Login with SSO'      // Custom login button text
]
```

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `provider_url` | string | `null` | **Required.** Base URL of your OIDC provider |
| `client_id` | string | `null` | **Required.** OAuth client ID from your provider |
| `client_secret` | string | `''` | OAuth client secret (required for confidential clients) |
| `issuer` | string | `null` | OIDC issuer URL (auto-discovered from provider_url if null) |
| `pkce` | bool/string | `true` | Enable PKCE. Use `true` for S256 or specify method |
| `scopes` | string | `'openid profile email'` | Space-separated list of OIDC scopes |
| `mapping` | array | See below | Maps OIDC claims to Cockpit user fields |
| `allowed_roles` | array | `null` | Whitelist of allowed role appids (null = allow all) |
| `default_role` | string | `null` | Default role appid when none provided or not allowed |
| `loginText` | string | `'Login via OAuth'` | Text displayed on login button |

### Field Mapping

The `mapping` configuration maps OIDC claims to Cockpit user fields:

```php
'mapping' => [
    'email' => 'email',                    // User email address
    'user' => 'preferred_username',        // Username/login field
    'name' => 'name',                      // Display name
    'role' => 'realm_access/roles/0'       // Role claim (first role in array)
]
```

#### Supported Cockpit Fields

- **`email`** (required): User's email address
- **`user`** (required): Username for login
- **`name`** (optional): Display name
- **`role`** (required): User role assignment

#### OIDC Claim Path Syntax

You can access nested claims using forward slash notation:
- `'role' => 'realm_access/roles/0'` → accesses `userInfo['realm_access']['roles'][0]` (first role)
- `'name' => 'profile/displayName'` → accesses `userInfo['profile']['displayName']`
- `'role' => 'groups/0'` → accesses `userInfo['groups'][0]` (first group)

## Security Features

### Role Management

Identi provides robust role security controls:

1. **Role Whitelisting**: Use `allowed_roles` to restrict which roles can be assigned
2. **Default Fallback**: Use `default_role` to ensure users always get a valid role
3. **Role Validation**: Only alphanumeric characters, hyphens, and underscores allowed

```php
'allowed_roles' => ['viewer', 'editor'], // Only these roles allowed
'default_role' => 'viewer',              // Fallback if role not provided/allowed
```

### Input Validation

All user data is validated and sanitized:
- **Email**: Must be valid email format
- **Username**: Dangerous characters (`<>"'`) are blocked
- **Role**: Must match pattern `^[a-zA-Z0-9_-]+$`
- **Name**: Dangerous characters are stripped

### Authentication Flow

1. User clicks "Login via OAuth" button
2. Redirected to OIDC provider for authentication
3. Provider redirects back to `/identi/callback`
4. User claims are validated and mapped
5. User is created/updated in Cockpit
6. User is logged into Cockpit

## Usage Examples

### Azure AD Configuration

```php
'identi' => [
    'provider_url' => 'https://login.microsoftonline.com/{tenant-id}/v2.0',
    'client_id' => 'your-azure-app-id',
    'client_secret' => 'your-azure-secret',
    'scopes' => 'openid profile email',
    'mapping' => [
        'email' => 'email',
        'user' => 'preferred_username',
        'name' => 'name',
        'role' => 'roles'
    ],
    'allowed_roles' => ['editor', 'publisher'],
    'default_role' => 'editor'
]
```

### Keycloak Configuration

```php
'identi' => [
    'provider_url' => 'https://keycloak.example.com/realms/your-realm',
    'client_id' => 'cockpit-client',
    'client_secret' => 'your-keycloak-secret',
    'scopes' => 'openid profile email roles',
    'mapping' => [
        'email' => 'email',
        'user' => 'preferred_username',
        'name' => 'name',
        'role' => 'realm_access/roles/0'
    ],
    'default_role' => 'viewer'
]
```

### Google OAuth Configuration

```php
'identi' => [
    'provider_url' => 'https://accounts.google.com',
    'client_id' => 'your-google-client-id.googleusercontent.com',
    'client_secret' => 'your-google-secret',
    'scopes' => 'openid profile email',
    'mapping' => [
        'email' => 'email',
        'user' => 'email',  // Use email as username
        'name' => 'name',
        'role' => null      // No role from Google
    ],
    'default_role' => 'editor'  // Always use default role
]
```

## Endpoints

- **`/identi/authenticate`** - Initiates OIDC authentication flow
- **`/identi/callback`** - Handles OIDC provider response
- **`/identi/logout`** - Logs out user and optionally signs out from provider

## Back-Channel Logout (experimental)

This module implements OpenID Connect Back-Channel Logout (RFC 8471) for secure session termination across multiple applications.

### How it works

1. **User logs out** from another application in the same OAuth provider
2. **OAuth provider sends** a POST request to `/identi/logout` with a logout token
3. **Token validation** ensures the logout request is authentic and follows RFC 8471 specifications
4. **Session termination** finds and terminates matching user sessions based on subject ID (`sub`) or session ID (`sid`)
5. **Real-time notification** sends logout event to active user sessions via EventStream
6. **User notification** shows "You have been logged out from another application" message
7. **Automatic redirect** to login page after 1.5 seconds

### Configuration

The back-channel logout endpoint is automatically available at:
```
POST /identi/logout
```

Configure this URL in your OAuth provider's back-channel logout settings.

### Security Features

- JWT logout token validation
- Required claims verification (`iss`, `aud`, `iat`, `events`)
- Event type validation (`http://schemas.openid.net/event/backchannel-logout`)
- Subject (`sub`) or Session ID (`sid`) requirement
- Nonce exclusion enforcement
- User-targeted logout events (only affected users are notified)
- Comprehensive error handling and logging

### Real-Time Features

- **Instant Notifications**: Users receive immediate logout notifications via EventStream
- **Targeted Events**: Only affected users are notified (privacy-preserving)
- **Automatic Cleanup**: Sessions are terminated and users redirected to login
- **15-second Polling**: Frontend checks for events every 15 seconds for near real-time updates

### Events

The module uses these events:
- **EventStream logout events** - Real-time user notifications with custom messages
- **Cockpit logout events** - Standard logout flow integration

## Troubleshooting

### Common Issues

1. **"Missing configuration for Identi"**
   - Ensure `provider_url` and `client_id` are configured
   - Check configuration syntax in your config file

2. **"Role does not exist"**
   - Verify the role exists in Cockpit's role management
   - Check role appid matches exactly

3. **"Role not allowed by configuration"**
   - Add the role to `allowed_roles` array
   - Or set `allowed_roles` to `null` to allow all roles

4. **"Invalid email format"**
   - Check OIDC provider returns valid email in mapped claim
   - Verify email claim mapping is correct

## Dependencies

- `jumbojett/openid-connect-php` - OpenID Connect client library

## License

This module uses the same license as Cockpit.