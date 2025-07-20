# Assets Module

[![Core Module](https://img.shields.io/badge/Type-Core%20Module-blue.svg)](https://getcockpit.com)

> **Comprehensive asset management system for Cockpit CMS**

The Assets module provides powerful file upload, processing, and delivery capabilities with automatic image optimization, video processing, and flexible storage backends. Perfect for building media-rich applications with performance-optimized asset delivery.

## ✨ Features

### 📁 **File Management**
- **Multiple Upload Methods** - Drag & drop, file picker, programmatic upload
- **Folder Organization** - Hierarchical folder structure for content organization
- **File Type Detection** - Automatic MIME type detection and categorization
- **Duplicate Detection** - MD5 hash-based duplicate prevention

### 🖼️ **Image Processing**
- **Automatic Thumbnails** - On-demand thumbnail generation with caching
- **Multiple Resize Modes** - Thumbnail, best fit, exact dimensions, aspect ratio
- **Format Conversion** - Convert between JPEG, PNG, WebP, AVIF formats
- **Color Extraction** - Automatic color palette extraction from images
- **Thumbhash Generation** - Compact image placeholders for better UX

### 🎥 **Video Processing**
- **Video Thumbnails** - Automatic frame extraction for video previews
- **Video Metadata** - Duration, codec, resolution extraction
- **FFmpeg Integration** - Advanced video processing capabilities
- **Streaming Support** - Optimized delivery for video content

### 🚀 **Performance & Delivery**
- **VIPS Integration** - High-performance image processing
- **HTTP Caching** - Browser and CDN-friendly cache headers
- **Responsive Images** - Multiple sizes for different devices
- **Lazy Loading Support** - Thumbhash placeholders for smooth loading

### 🔧 **Storage Flexibility**
- **Local Storage** - File system storage for simple setups
- **Cloud Storage** - S3, Azure Blob, Google Cloud via Flysystem
- **CDN Integration** - Seamless CDN delivery with CloudFlare, AWS CloudFront
- **Stream Processing** - Memory-efficient handling of large files



## 🖼️ Image Processing

### Thumbnail Generation

```php
// Basic thumbnail
$url = $app->helper('asset')->image([
    'src' => '/2023/12/15/image.jpg',
    'width' => 300,
    'height' => 200
]);

// Advanced options
$url = $app->helper('asset')->image([
    'src' => '/2023/12/15/image.jpg',
    'width' => 800,
    'height' => 600,
    'mode' => 'bestFit',        // Resize mode
    'quality' => 85,            // Quality (1-100)
    'mime' => 'webp',           // Output format
    'filters' => []             // Additional filters
]);
```

### Resize Modes

| Mode | Description | Use Case |
|------|-------------|----------|
| `thumbnail` | Crop to exact dimensions | Profile pictures, grid layouts |
| `bestFit` | Fit within dimensions, maintain aspect | Responsive images |
| `resize` | Stretch to exact dimensions | When exact size needed |
| `fitToWidth` | Scale to width, maintain aspect | Full-width banners |
| `fitToHeight` | Scale to height, maintain aspect | Sidebar images |

### Format Conversion

```php
// Convert to WebP for modern browsers
$webpUrl = $app->helper('asset')->image([
    'src' => '/path/to/image.jpg',
    'width' => 400,
    'mime' => 'webp',
    'quality' => 80
]);

// Convert to AVIF for maximum compression
$avifUrl = $app->helper('asset')->image([
    'src' => '/path/to/image.jpg',  
    'width' => 400,
    'mime' => 'avif',
    'quality' => 70
]);

// Progressive JPEG for faster loading
$progressiveUrl = $app->helper('asset')->image([
    'src' => '/path/to/image.jpg',
    'width' => 800,
    'quality' => 85,
    'filters' => ['progressive' => true]
]);
```

### Responsive Images

```php
// Generate multiple sizes
$sizes = [
    'small' => ['width' => 400, 'height' => 300],
    'medium' => ['width' => 800, 'height' => 600], 
    'large' => ['width' => 1200, 'height' => 900]
];

$srcset = [];
foreach ($sizes as $size => $dimensions) {
    $url = $app->helper('asset')->image(array_merge([
        'src' => $asset['path'],
        'quality' => 80,
        'mime' => 'webp'
    ], $dimensions));
    
    $srcset[] = "{$url} {$dimensions['width']}w";
}

// Output HTML
echo '<img src="' . $app->helper('asset')->image(['src' => $asset['path'], 'width' => 800]) . '" 
           srcset="' . implode(', ', $srcset) . '" 
           sizes="(max-width: 768px) 100vw, 50vw">';
```


## 📊 API Reference

### REST API

#### Upload Assets

```bash
# Upload single file
POST /api/assets/upload
Content-Type: multipart/form-data

files: (file data)

# Upload with metadata
POST /api/assets/upload
Content-Type: multipart/form-data

files: (file data)
meta[title]: "My Image"
meta[tags][]: "product"
meta[folder]: "gallery"
```

#### Get Assets

```bash
# Get all assets
GET /api/assets

# Get assets with filter
GET /api/assets?filter={"type":"image"}

# Get assets with pagination
GET /api/assets?limit=20&skip=40

# Get asset by ID
GET /api/assets/{id}
```

#### Image Processing API

```bash
# Get optimized image
GET /api/assets/image/{id}?w=300&h=200&m=thumbnail&q=80

# Get image with format conversion
GET /api/assets/image/{id}?w=400&f=webp&q=75

# Get original image
GET /api/assets/image/{id}?w=original&h=original
```

#### Asset Management

```bash
# Update asset metadata
POST /api/assets/update
Content-Type: application/json
Cockpit-Token: your-token

{
    "_id": "asset-id",
    "title": "Updated Title",
    "tags": ["new", "tags"]
}

# Delete asset
DELETE /api/assets/{id}
Cockpit-Token: your-token
```

### GraphQL API

#### Query Assets

```graphql
query GetAssets($filter: JSON, $limit: Int) {
  assets(filter: $filter, limit: $limit) {
    _id
    title
    path
    type
    mime
    width
    height
    size
    colors
    tags
    _created
  }
}
```

#### Asset by ID

```graphql
query GetAsset($id: String!) {
  asset(id: $id) {
    _id
    title
    path
    type
    width
    height
    thumbhash
    colors
    description
    tags
  }
}
```

### JavaScript/Frontend Usage

```javascript
// Upload assets via fetch API
const formData = new FormData();
formData.append('files', fileInput.files[0]);
formData.append('meta[title]', 'Uploaded Image');

const result = await fetch('/api/assets/upload', {
  method: 'POST',
  headers: {
    'Cockpit-Token': 'your-api-token'
  },
  body: formData
}).then(res => res.json());

console.log('Uploaded asset:', result.assets[0]);

// Get optimized image URL
const imageUrl = `/api/assets/image/${assetId}?w=400&h=300&m=thumbnail&q=80`;

// Responsive image with multiple formats
const getImageUrl = (assetId, width, format = 'webp') => 
  `/api/assets/image/${assetId}?w=${width}&f=${format}&q=80`;

// Generate srcset for responsive images
const generateSrcSet = (assetId, sizes, format = 'webp') => {
  return sizes.map(size => 
    `${getImageUrl(assetId, size, format)} ${size}w`
  ).join(', ');
};
```

## ⚙️ Configuration

### Upload Restrictions

```php
'assets' => [
    'allowed_uploads' => 'jpg,jpeg,png,gif,svg,pdf,mp4,mp3',  // Specific extensions
    'max_upload_size' => 10000000,     // 10MB limit
    'forbidden_extensions' => [         // Additional forbidden extensions
        'exe', 'bat', 'sh', 'php'
    ]
]
```

## 🖥️ CLI Commands

### Thumbnail Management

```bash
# Generate thumbhash for existing images
./tower assets:thumbhash

# Generate thumbhash for specific assets
./tower assets:thumbhash --filter='{"type":"image"}'

# Fix file visibility permissions
./tower assets:files:fixvisibility
```

### Bulk Operations

```bash
# Process all images for color extraction
./tower assets:process-images

# Generate thumbnails for all images
./tower assets:generate-thumbnails --sizes='400,800,1200'

# Optimize existing images
./tower assets:optimize --quality=80
```

## 🔧 Advanced Usage

### Custom Image Processing

```php
// Register custom image processor
$app->on('assets.asset.upload', function(&$asset, &$meta, &$opts, &$file) {
    
    if ($asset['type'] === 'image') {
        
        // Add custom watermark
        $watermarked = $this->addWatermark($file);
        
        // Custom thumbnail sizes
        $this->generateCustomThumbnails($file, $asset);
        
        // Add to CDN
        $this->uploadToCDN($file, $asset);
    }
});

// Custom thumbnail generation
function generateCustomThumbnails($file, &$asset) {
    $sizes = [
        'thumb' => [150, 150],
        'medium' => [400, 300], 
        'large' => [800, 600]
    ];
    
    foreach ($sizes as $name => $dimensions) {
        $thumbnail = $this->app->helper('asset')->image([
            'src' => $asset['path'],
            'width' => $dimensions[0],
            'height' => $dimensions[1],
            'mode' => 'thumbnail'
        ]);
        
        $asset["thumbnail_{$name}"] = $thumbnail;
    }
}
```

### Asset Validation

```php
// Custom upload validation
$app->on('assets.asset.upload', function(&$asset, &$meta, &$opts, &$file) {
    
    // Validate image dimensions
    if ($asset['type'] === 'image') {
        if ($asset['width'] < 800 || $asset['height'] < 600) {
            // throw error
        }
    }
    
    // Validate file size per type
    $maxSizes = [
        'image' => 5000000,  // 5MB
        'video' => 100000000, // 100MB
        'document' => 10000000 // 10MB
    ];
    
    if ($asset['size'] > $maxSizes[$asset['type']]) {
        // throw error
    }
});
```


## 🐛 Troubleshooting

### Common Issues

**❌ Large file uploads failing**
- Check `upload_max_filesize` and `post_max_size` in PHP
- Verify `max_upload_size` in Assets configuration
- Ensure sufficient disk space for temporary files

**❌ Image processing errors**
- Install required extensions: GD
- For better performance, install VIPS: `apt-get install libvips-tools`
- Check memory limits for large image processing

**❌ Video thumbnail generation failing**
- Install FFmpeg: `apt-get install ffmpeg`
- Verify FFmpeg path in configuration
- Check video codec compatibility

**❌ Thumbnails not generating**
- Verify write permissions to thumbnail storage directory
- Check VIPS/GD installation and configuration
- Ensure source files are accessible


## 📄 License

This is a core module of Cockpit CMS distributed under the MIT license.

---

**Ready to manage assets?** The Assets module provides everything you need for professional media management with automatic optimization and flexible delivery options!