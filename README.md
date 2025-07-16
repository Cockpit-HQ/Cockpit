# Cockpit CMS - Headless Content Management

![cockpit banner](https://github.com/user-attachments/assets/c8d4daf1-86cc-45c9-be24-5c6a6a2ca8ca)

> **Modern, flexible CMS that adapts to your workflow**

Cockpit is a headless CMS that gives you the flexibility to build content-driven applications your way. Whether you're creating websites, mobile apps, or IoT applications, Cockpit provides the content infrastructure you need.

## ✨ Why Developers Choose Cockpit

- **🚀 Headless by Design** - Use any frontend technology (React, Vue, Flutter, etc.)
- **📊 Flexible Content Models** - Collections, Singletons, and Trees with custom fields
- **🔗 GraphQL & REST APIs** - Modern APIs with real-time capabilities  
- **🌍 Multi-language Support** - Built-in internationalization for global applications
- **🎨 No Vendor Lock-in** - Own your data, deploy anywhere
- **⚡ Performance First** - MongoDB or SQLite backend, your choice

## 🚀 Quick Start

Get Cockpit running in under 5 minutes:

### Option 1: Traditional Setup

```bash
# Download and extract
wget https://github.com/cockpit-hq/cockpit/releases/latest/download/cockpit.zip
unzip cockpit.zip && cd cockpit

# Make storage writable  
chmod -R 755 storage/

# Open in browser and complete setup
open http://localhost/cockpit/install
```

### Option 2: Docker (Recommended)

```bash
# Run Cockpit with persistent storage
docker run -d \
  --name cockpit \
  -p 8080:80 \
  -v cockpit_storage:/var/www/html/storage \
  cockpithq/cockpit:core-latest

# Access at http://localhost:8080/install
```

### Start Building

Once installed, create content models through the admin UI or via API:

```javascript
// Fetch your content anywhere
fetch('/api/content/items/blog')
  .then(res => res.json())
  .then(posts => {
    // Use in React, Vue, mobile apps, etc.
    console.log('My content:', posts);
  });
```

## 🛠️ Key Features

| Feature | Description | 
|---------|-------------|
| **Content Modeling** | Collections, Singletons, Trees with 20+ field types |
| **Asset Management** | Image processing, video thumbnails, CDN integration |
| **User Management** | Roles, permissions, 2FA, API tokens |
| **Multi-language** | Localized content with fallback support |
| **Developer Tools** | GraphQL playground, REST docs, CLI commands |
| **Extensibility** | Custom fields, addons, hooks, events |
| **Multi-tenancy** | Spaces for multiple sites and clients |

## 📋 System Requirements

- **PHP** >= 8.3 with PDO, GD extensions
- **Database** SQLite (default) or MongoDB
- **Web Server** Apache with mod_rewrite or Nginx
- **Permissions** Writable `/storage` directory

Ensure `$_SERVER['DOCUMENT_ROOT']` is properly configured.

## 🌐 API Examples

### REST API

```bash
# Get all published blog posts
curl "https://yoursite.com/api/content/items/blog?filter={tags:'cms'}"

# Get single post by ID
curl "https://yoursite.com/api/content/item/blog/60f1b2b3c4d5e6f7a8b9c0d1"

# Create new post
curl -X POST "https://yoursite.com/api/content/item/blog" \
  -H "Cockpit-Token: your-token" \
  -H "Content-Type: application/json" \
  -d '{"title":"New Post","content":"Content here","tags":["cms"]}'
```

### GraphQL

```graphql
# Query blog posts with pagination
query GetBlogPosts($limit: Int, $skip: Int) {
  blog(limit: $limit, skip: $skip, filter: {tags: "cms"}) {
    _id
    title
    content
    _created
    _modified
  }
}

# Create new blog post  
mutation CreatePost($data: JSON!) {
  saveContentItem(model: "blog", data: $data) {
    _id
    title
  }
}
```


## 🔗 Resources

- **[Documentation](https://getcockpit.com/documentation)** - Complete guides and API reference
- **[GitHub](https://github.com/cockpit-hq/cockpit)** - Source code and issues
- **[Community Forum](https://discourse.getcockpit.com)** - Get help and share knowledge

## 📱 Use Cases

- **Headless Websites** - Static sites with JAMstack
- **Mobile Apps** - iOS/Android with native or hybrid frameworks  
- **E-commerce** - Product catalogs and content management
- **Corporate Sites** - Multi-language corporate websites
- **IoT Dashboards** - Content for smart devices and displays
- **Multi-tenant SaaS** - Content infrastructure for platforms


## 🐳 Docker

Run Cockpit in containers for consistent, scalable deployments across any environment.

### Quick Start with Docker

```bash
# Run with SQLite (development)
docker run -d \
  --name cockpit \
  -p 8080:80 \
  -v cockpit_storage:/var/www/html/storage \
  cockpithq/cockpit:core-latest

# Access at http://localhost:8080/install
```

### Production Setup with MongoDB

```yaml
# docker-compose.yml
version: '3.8'
services:
  cockpit:
    image: cockpithq/cockpit:core-latest
    ports:
      - "80:80"
    environment:
      - COCKPIT_DATABASE_SERVER=mongodb://mongo:27017
      - COCKPIT_DATABASE_NAME=cockpit
    volumes:
      - ./storage:/var/www/html/storage
      - ./config:/var/www/html/config
    depends_on:
      - mongo
      
  mongo:
    image: mongo:8
    volumes:
      - mongo_data:/data/db
    environment:
      - MONGO_INITDB_DATABASE=cockpit

volumes:
  mongo_data:
```

### Configuration

Create a `config/config.php` file and mount it to connect to MongoDB:

```php
<?php
// config/config.php
return [
    'database' => [
        'server' => $_ENV['COCKPIT_DATABASE_SERVER'] ?? 'mongodb://mongo:27017',
        'database' => $_ENV['COCKPIT_DATABASE_NAME'] ?? 'cockpit'
    ],
    'sec-key' => $_ENV['COCKPIT_SEC_KEY'] ?? 'your-random-security-key'
];
```

**Mount config via Docker Compose:**
```yaml
volumes:
  - ./config:/var/www/html/config
```

**Or create custom Docker image:**
```dockerfile
FROM cockpithq/cockpit:core-latest
COPY ./config/config.php /var/www/html/config/config.php
```

### Available Tags

- `core-latest` - Latest stable release
- `core-{version}` - Specific version tags
- `pro-latest` - Latest pro stable release
- `pro-{version}` - Specific pro version tags

Visit [Docker Hub](https://hub.docker.com/r/cockpithq/cockpit/tags) for all available tags.

## 💐 Partners

[![ginetta](https://user-images.githubusercontent.com/321047/132780497-37da444d-d910-4433-a92a-d7629f3a4405.png)](https://www.ginetta.net)<br>
We create websites and apps that click with users.


[![BrowserStack](https://user-images.githubusercontent.com/355427/27389060-9f716c82-569d-11e7-923c-bd5fe7f1c55a.png)](https://www.browserstack.com)<br>
Live, Web-Based Browser Testing


## 💐 Sponsors

[![Backers on Open Collective](https://opencollective.com/cockpit/backers/badge.svg)](#backers) [![Sponsors on Open Collective](https://opencollective.com/cockpit/sponsors/badge.svg)](#sponsors)

Become a backer or sponsor through:

- [Patreon](https://www.patreon.com/aheinze)
- [OpenCollective](https://opencollective.com/cockpit#backer)

Thank you to all our backers! 🙏


## Copyright and license

Copyright since 2015 [🅰🅶🅴🅽🆃🅴🅹🅾](https://agentejo.com) under the MIT license.

See [LICENSE](LICENSE) for more information.
