<?php

namespace Assets\Helper;

use SimpleImageLib as SimpleImage;

class Asset extends \Lime\Helper {

    public function image(array $options = [], bool $asPath = false) {

        $options = array_merge([
            'cachefolder' => 'tmp://thumbs',
            'src' => '',
            'mode' => 'thumbnail',
            'mime' => null,
            'fp' => null,
            'filters' => [],
            'width' => false,
            'height' => false,
            'quality' => 100,
            'rebuild' => false,
            'base64' => false,
            'timestamp' => null
        ], $options);

        extract($options);

        if (!$width && !$height) {
            return ['error' => 'Target width or height parameter is missing'];
        }

        if (!$src) {
            return ['error' => 'Missing src parameter'];
        }

        $hash = $mime ? md5(json_encode($options))."_{$quality}_{$mode}.{$mime}" : null;

        if (!$rebuild && $mime) {

            $thumbpath = $cachefolder."/{$hash}";

            if ($this->app->fileStorage->fileExists($thumbpath)) {

                if ($base64) {
                    return "data:image/{$mime};base64,".base64_encode($this->app->fileStorage->read($thumbpath));
                }

                return $asPath ? $thumbpath : $this->app->fileStorage->getURL($thumbpath);
            }
        }

        $src = rawurldecode($src);

        // normalize path
        if (strpos($src, '../') !== false) {
            $src = implode('/', array_filter(explode('/', $src), fn ($s) => trim($s, '.')));
        }

        $options['src'] = $src;

        if (\strpos($src, 'uploads://') === 0) {

            $options['src'] = \str_replace('uploads://', '', $src);

            return $this->imageByPath($options, $asPath, $hash);
        }

        return $this->imageByAsset($options, $asPath, $hash);

    }

    protected function imageByAsset(array $options = [], bool $asPath = false, ?string $hash = null) {

        extract($options);

        $asset = null;

        if (\strpos($src, 'assets://') === 0) {
            $asset = ['path' => \str_replace('assets://', '', $src)];
        } elseif (!preg_match('/\.(png|jpg|jpeg|gif|svg|webp)$/i', $src)) {
            $asset = $this->app->dataStorage->findOne('assets', ['_id' => $src]);
        } else {
            $asset = $this->app->dataStorage->findOne('assets', ['path' => $src]);
        }

        if (!$asset) {
            return ['error' => 'Asset not found'];
        }

        $options['src'] = $asset['path'];

        if (!$fp && isset($asset['fp']['x'], $asset['fp']['y'])) {
            $options['fp'] = "{$asset['fp']['x']} {$asset['fp']['y']}";
        }

        return $this->imageByPath($options, $asPath, $hash);
    }

    protected function imageByPath(array $options = [], bool $asPath = false, ?string $hash = null) {

        extract($options);

        $path = trim($src, '/');
        $srcUrl = $this->app->fileStorage->getURL("uploads://{$path}");
        $src = $this->app->path("#uploads:{$path}");

        if (!$src && $this->app->fileStorage->fileExists("uploads://{$path}")) {

            $stream = $this->app->fileStorage->readStream("uploads://{$path}");

            if ($stream) {
                $this->app->fileStorage->writeStream("#uploads://{$path}", $stream);
                $src = $this->app->path("#uploads:{$path}");
            }
        }

        if (!$src) {
            return false;
        }

        $ext = strtolower(pathinfo($src, PATHINFO_EXTENSION));

        // handle svg files
        if ($ext == 'svg') {

            if ($base64) {
                return 'data:image/svg+xml;base64,'.base64_encode(file_get_contents($src));
            }

            return $asPath ? "uploads://{$path}" : $srcUrl;
        }

        // check if image
        if (!in_array($ext, ['avif', 'png', 'jpg', 'jpeg', 'gif', 'webp'])) {
            return $srcUrl;
        }

        if (!$width || !$height || $width == 'original' || $height == 'original') {

            list($w, $h, $type, $attr)  = getimagesize($src);

            if ($width == 'original') $width = $w;
            if ($height == 'original') $height = $h;

            if (!$width) $width = ceil($w * ($height / $h));
            if (!$height) $height = ceil($h * ($width / $w));
        }

        if (is_null($width) && is_null($height)) {
            return $srcUrl;
        }

        if (!in_array($mode, ['thumbnail', 'bestFit', 'resize', 'fitToWidth', 'fitToHeight'])) {
            $mode = 'thumbnail';
        }

        if ($mime && in_array($mime, ['avif', 'gif', 'jpeg', 'png', 'webp', 'bmp'])) {
            $ext = $mime;
            $mime = "image/{$ext}";
        } else {
            $mime = null;
        }

        if (!$fp) {
            $fp = 'center';
        }

        $method = $mode;

        $hash = $hash ?? md5(json_encode($options))."_{$quality}_{$mode}.{$ext}";
        $thumbpath = $cachefolder."/{$hash}";

        if ($rebuild || !$this->app->fileStorage->fileExists($thumbpath)) {

            if ($rebuild && $this->app->fileStorage->fileExists($thumbpath)) {
                $this->app->fileStorage->delete($thumbpath);
            }

            $img = new Img($src);
            $img->{$method}($width, $height, $fp);

            // Apply image filters
            foreach ($filters as $filter => $opts) {
                // Handle non-associative array
                if (is_int($filter)) {
                    $filter = $opts;
                    $opts = [];
                }

                if (in_array($filter, [
                    'blur', 'brighten',
                    'colorize', 'contrast',
                    'darken', 'desaturate',
                    'edgeDetect', 'emboss',
                    'flip', 'invert', 'opacity', 'pixelate', 'sepia', 'sharpen', 'sketch'
                ])) {
                    call_user_func_array([$img, $filter], (array) $opts);
                }
            }

            $this->app->fileStorage->write($thumbpath, $img->toString($mime, $quality));

            unset($img);
        }

        if ($base64) {
            return "data:image/{$ext};base64,".base64_encode($this->app->fileStorage->read($thumbpath));
        }

        return $asPath ? $thumbpath : $this->app->fileStorage->getURL($thumbpath);
    }
}

class Img {

    protected $image;

    public function __construct($img) {

        $this->image = new SimpleImage($img);
    }

    public function negative() {
        $this->image->invert();
        return $this;
    }

    public function grayscale() {
        $this->image->desaturate();
        return $this;
    }

    public function base64data($format = null, $quality = 100) {
        return $this->image->toDataUri($format, $quality);
    }

    public function show($format = null, $quality = 100) {
        $this->image->toScreen($format, $quality);
    }

    public function blur($passes = 1, $type = 'gaussian') {
        return $this->image->blur($type, $passes);
    }

    public function thumbnail($width, $height, $anchor = 'center') {


        if (\preg_match('/\d \d/', $anchor)) {

            // Determine aspect ratios
            $currentRatio = $this->image->getHeight() / $this->image->getWidth();
            $targetRatio = $height / $width;

            // Fit to height/width
            if ($targetRatio > $currentRatio) {
                $this->image->resize(null, $height);
            } else {
                $this->image->resize($width, null);
            }

            $anchor = \explode(' ', $anchor);

            $x1 = \floor(($this->image->getWidth() * $anchor[0]) - ($width * $anchor[0]));
            $x2 = $width + $x1;
            $y1 = \floor(($this->image->getHeight() * $anchor[1]) - ($height * $anchor[1]));
            $y2 = $height + $y1;

            return $this->image->crop($x1, $y1, $x2, $y2);
        }

        return $this->image->thumbnail($width, $height, $anchor);
    }

    public function __call($method, $args) {

        $ret = \call_user_func_array([$this->image, $method], $args);

        if ($ret !== $this->image) {
            return $ret;
        }

        return $this;
    }
}
