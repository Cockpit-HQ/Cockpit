# Finder Module

[![Core Module](https://img.shields.io/badge/Type-Core%20Module-blue.svg)](https://getcockpit.com)

> **Advanced file manager and browser for Cockpit CMS**

The Finder module provides a powerful, web-based file management interface for Cockpit CMS. It enables super administrators to browse, manage, and edit files across the entire Cockpit installation, including spaces and custom root directories.

## ✨ Features

### 📁 **File Management**
- **Multi-Root Support** - Browse Cockpit, document root, and space directories
- **File Operations** - Create, rename, delete files and folders
- **Batch Operations** - Select and delete multiple files at once
- **File Uploads** - Drag-and-drop file uploading with validation
- **Archive Support** - Extract ZIP files directly in the browser

### ✏️ **File Editing**
- **Code Editor** - Built-in syntax-highlighted code editor
- **Multiple File Types** - Edit PHP, JS, CSS, JSON, and more
- **Save Protection** - PHP file editing restricted to super admins
- **Real-time Updates** - Opcache invalidation on PHP file changes

### 🔍 **File Browser**
- **Tree Navigation** - Hierarchical folder structure
- **File Preview** - View file details and metadata
- **Quick Search** - Search files across directories
- **Sort & Filter** - Sort by name, size, or date

### 📥 **Download & Export**
- **Single File Download** - Download individual files
- **Folder Download** - Download entire folders as ZIP
- **Streaming Downloads** - Efficient streaming for large files
- **File List Export** - Get complete file listings

### 🔒 **Security**
- **Super Admin Only** - Restricted to super administrators
- **Master Instance Only** - Available only on master instance
- **File Type Restrictions** - Control allowed upload types
- **Path Validation** - Prevent directory traversal attacks
- **SVG Sanitization** - Automatic SVG/XML file sanitization

## 🚀 Quick Start

### Access Finder

The Finder is available only to super administrators on the master instance:

1. Navigate to **Settings → Finder**
2. Select a root directory to browse
3. Use the file tree to navigate

### File Operations

```php
// The Finder operates through its web interface
// All operations are performed via AJAX calls to the API endpoint

// Example: Get file listing
fetch('/finder/api', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': COCKPIT_CSRF_TOKEN
    },
    body: JSON.stringify({
        cmd: 'ls',
        path: 'config',
        root: '#root:'
    })
});
```

## 📋 Core Functionality

### Available Roots

The Finder provides access to multiple root directories:

```php
// Default roots
- Cockpit     // Main Cockpit directory (#root:)
- Root        // Document root (if different)
- Space: *    // Each configured space directory

// Custom roots via event
$app->on('finder.collect.roots', function(&$roots) {
    $roots['Custom'] = '/path/to/custom/directory';
});
```

### File Commands

All file operations are performed through the API endpoint with specific commands:

| Command | Description | Parameters |
|---------|-------------|------------|
| `ls` | List directory contents | `path` |
| `upload` | Upload files | `path`, `files` |
| `createfolder` | Create new folder | `path`, `name` |
| `createfile` | Create new file | `path`, `name` |
| `removefiles` | Delete files/folders | `paths[]` |
| `rename` | Rename file/folder | `path`, `name` |
| `readfile` | Read file contents | `path` |
| `writefile` | Save file contents | `path`, `contents` |
| `unzip` | Extract ZIP file | `path`, `zip` |
| `download` | Download file/folder | `path` |
| `getfilelist` | Get all files list | - |

### File Upload

```javascript
// Upload files via FormData
const formData = new FormData();
formData.append('files[]', fileInput.files[0]);

fetch('/finder/api', {
    method: 'POST',
    headers: {
        'X-CSRF-TOKEN': COCKPIT_CSRF_TOKEN
    },
    body: formData
});
```

### File Type Restrictions

Configure allowed file uploads:

```php
// In config/config.php
return [
    'finder' => [
        'allowed_uploads' => 'jpg,jpeg,png,gif,svg,pdf,zip'
    ]
];

// Or allow all (super admin only for PHP files)
return [
    'finder' => [
        'allowed_uploads' => '*'
    ]
];
```

## 🔧 Configuration

### Disable Finder

To completely disable the Finder module:

```php
// In config/config.php
return [
    'finder' => [
        'disabled' => true
    ]
];
```

### Custom Document Root

Set a custom document root for browsing:

```php
// In config/config.php
return [
    'docs_root' => '/var/www/html'
];
```

### File Upload Limits

Configure upload restrictions:

```php
// In config/config.php
return [
    'finder' => [
        'allowed_uploads' => 'jpg,png,pdf,doc,docx',
        'max_upload_size' => '10M'
    ]
];
```

## 🛡️ Security Features

### Path Validation

The Finder validates all paths to prevent directory traversal:

```php
// Automatic validation
- Checks for ../ patterns
- Validates against allowed roots
- Sanitizes file names
- Prevents null byte injection
```

### File Type Security

```php
// PHP file restrictions
- PHP files can only be edited by super admins
- Automatic SVG/XML sanitization
- File extension validation
- MIME type checking
```

### Access Control

```php
// Multi-layer security
if (!$this->helper('acl')->isSuperAdmin() || !$this->helper('spaces')->isMaster()) {
    return $this->stop(401);
}
```

## 🎨 User Interface

### File Browser Features

- **Dual Pane Layout** - Tree view and file list
- **Drag & Drop** - Upload files by dragging
- **Context Menus** - Right-click operations
- **Keyboard Shortcuts** - Quick navigation
- **Responsive Design** - Works on all devices

### File Editor

```javascript
// Built-in code editor features
- Syntax highlighting
- Line numbers
- Auto-indentation
- Search & replace
- Multiple themes
```

## 🔧 Events & Hooks

### Finder Events

```php
// Add custom roots
$app->on('finder.collect.roots', function(&$roots) {
    $roots['Logs'] = '/var/log/cockpit';
    $roots['Backup'] = '/backup/cockpit';
});

// After file upload
$app->on('finder.upload', function($uploaded, $failed) {
    foreach ($uploaded as $file) {
        $this->module('system')->log("File uploaded: {$file}");
    }
});

// After file rename
$app->on('cockpit.media.rename', function($source, $target) {
    $this->module('system')->log("File renamed: {$source} → {$target}");
});

// After file removal
$app->on('cockpit.media.removefiles', function($deletions) {
    foreach ($deletions as $file) {
        $this->module('system')->log("File deleted: {$file}");
    }
});
```

## 📊 API Usage

### JavaScript API

```javascript
// Initialize Finder dialog
App.dialog('app-finder', {
    root: '#root:',
    path: '/',
    onSelect: function(selected) {
        console.log('Selected:', selected);
    }
});

// File operations via API
async function createFolder(path, name) {
    const response = await fetch('/finder/api', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': COCKPIT_CSRF_TOKEN
        },
        body: JSON.stringify({
            cmd: 'createfolder',
            root: '#root:',
            path: path,
            name: name
        })
    });
    
    return response.json();
}

// Read file contents
async function readFile(path) {
    const response = await fetch('/finder/api', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': COCKPIT_CSRF_TOKEN
        },
        body: JSON.stringify({
            cmd: 'readfile',
            root: '#root:',
            path: path
        })
    });
    
    const data = await response.json();
    return data.contents;
}
```

### Vue Component

```javascript
// Use Finder as Vue component
export default {
    methods: {
        openFinder() {
            this.$dialog('app-finder', {
                root: '#root:',
                path: '/config',
                onSelect: (selected) => {
                    this.selectedFile = selected.path;
                }
            });
        }
    }
}
```

## 🐛 Troubleshooting

### Common Issues

**❌ Finder not accessible**
- Verify you're logged in as super admin
- Check you're on the master instance
- Ensure Finder is not disabled in config

**❌ Upload fails**
- Check file type is allowed
- Verify upload size limits
- Ensure target directory is writable
- Check PHP upload settings

**❌ Cannot edit PHP files**
- Confirm super admin status
- Check file permissions
- Verify opcache settings

**❌ Download fails**
- Check file/folder exists
- Verify read permissions
- Review PHP memory limits for large files

### Performance Tips

```php
// For large directories
- Use file list API instead of tree view
- Enable opcache for better performance
- Limit file preview for large files

// Optimize uploads
ini_set('upload_max_filesize', '50M');
ini_set('post_max_size', '50M');
ini_set('max_execution_time', 300);
```

### Debug Mode

Enable debug logging:

```php
// In bootstrap.php or config
$app->on('finder.*', function() {
    $this->module('system')->log('Finder event: ' . $this->trigger_event);
});
```

## 🔒 Best Practices

### Security Guidelines

1. **Restrict Access**
   - Keep Finder limited to super admins
   - Use on master instance only
   - Monitor access logs

2. **File Validation**
   - Always validate file types
   - Sanitize uploaded content
   - Check file sizes

3. **Backup Before Editing**
   - Create backups before bulk operations
   - Version control important files
   - Test changes in staging

### Usage Recommendations

```php
// Safe file operations
- Always use provided API methods
- Avoid direct file system access
- Log important operations
- Implement access auditing

// Performance considerations
- Limit operations on large directories
- Use streaming for large downloads
- Implement caching where appropriate
```

## 📄 License

This is a core module of Cockpit CMS distributed under the MIT license.

---

**Finder Module** - A powerful file management interface providing secure, comprehensive access to your Cockpit CMS file system with advanced editing and organization capabilities.