<?php

namespace Assets\Helper;

use Assets\Utils\Img;
use Assets\Utils\Vips;
use Assets\Utils\Ffmpeg;

class Asset extends \Lime\Helper {

    protected ?Vips $vips = null;
    protected ?Ffmpeg $ffmpeg = null;
    protected ?string $storage = null;

    protected function initialize() {

        $this->storage = $this->app->retrieve('assets/storage', 'tmp://thumbs');

        $useVips = $this->app->retrieve('assets/vips');

        if ($useVips) {
            $this->vips = new Vips(is_string($useVips) ? $useVips : null);
        }

        $useFfmpeg = $this->app->retrieve('assets/ffmpeg');

        if ($useFfmpeg) {
            $this->ffmpeg = new Ffmpeg(is_string($useFfmpeg) ? $useFfmpeg : null);
        }
    }

    public function image(array $options = [], bool $asPath = false) {

        $options = array_merge([
            'storage' => $this->storage,
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

            $thumbpath = $storage."/{$hash}";

            if ($this->app->fileStorage->fileExists($thumbpath)) {

                if ($base64) {
                    return "data:image/{$mime};base64,".base64_encode($this->app->fileStorage->read($thumbpath));
                }

                return $asPath ? $thumbpath : $this->app->fileStorage->getURL($thumbpath);
            }
        }

        $src = rawurldecode($src);

        // normalize path
        if (str_contains($src, '../')) {
            $src = implode('/', array_filter(explode('/', $src), fn ($s) => trim($s, '.')));
        }

        $options['src'] = $src;

        if (\str_starts_with($src, 'uploads://')) {

            $options['src'] = \str_replace('uploads://', '', $src);

            return $this->imageByPath($options, $asPath, $hash);
        }

        return $this->imageByAsset($options, $asPath, $hash);

    }

    protected function imageByAsset(array $options = [], bool $asPath = false, ?string $hash = null) {

        extract($options);

        $asset = null;

        if (\str_starts_with($src, 'assets://')) {
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

        // check if video
        if (in_array($ext, ['mp4', 'avi', 'mov', 'webm', 'mkv', 'flv', 'wmv', 'mpeg', 'mpg', 'm4v']) && $this->ffmpeg) {

            $tmp = $this->app->path('#tmp:').basename($src, '.'.$ext).".jpg";

            if (!file_exists($tmp)) {

                // cache base video image source
                $this->ffmpeg->thumbnail($tmp, [
                    'src' => $src,
                ]);

                if (!file_exists($tmp)) {
                    return false;
                }
            }

            $src = $tmp;
            $ext = 'jpg';
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

        if ($mime && substr($mime, 0, 6) == 'image/') $mime = substr($mime, 6);
        if ($mime === 'jpg') $mime = 'jpeg';

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
        $thumbpath = $storage."/{$hash}";

        if ($rebuild || !$this->app->fileStorage->fileExists($thumbpath)) {

            if ($rebuild && $this->app->fileStorage->fileExists($thumbpath)) {
                $this->app->fileStorage->delete($thumbpath);
            }

            if ($this->vips) {

                $tmp = $this->app->path('#tmp:').uniqid().".{$ext}";

                $this->vips->thumbnail($tmp, [
                    'src' => $src,
                    'size' => "{$width}x{$height}",
                    'quality' => $quality
                ]);

                if (file_exists($tmp)) {

                    if (is_array($filters) && !empty($filters)) {

                        $img = new Img($tmp);

                        // Apply image filters
                        $this->applyFilters($img, $filters);

                        $this->app->fileStorage->write($thumbpath, $img->toString($mime, $quality));
                        unset($img);
                    } else {
                        $this->app->fileStorage->write($thumbpath, file_get_contents($tmp));
                    }

                    unlink($tmp);
                } else {
                    return false;
                }

            } else {

                $img = new Img($src);
                $img->{$method}($width, $height, $fp);

                // Apply image filters
                $this->applyFilters($img, $filters);

                $this->app->fileStorage->write($thumbpath, $img->toString($mime, $quality));

                unset($img);
            }
        }

        if ($base64) {
            return "data:image/{$ext};base64,".base64_encode($this->app->fileStorage->read($thumbpath));
        }

        return $asPath ? $thumbpath : $this->app->fileStorage->getURL($thumbpath);
    }

    protected function applyFilters(Img $img, array $filters): Img {

        if (empty($filters)) return $img;

        // Apply image filters
        foreach ($filters as $filter => $opts) {
            // Handle non-associative array
            if (is_int($filter)) {
                $filter = $opts;
                $opts = [];
            }

            $opts = (array) $opts;

            foreach ($opts as $key => $value) {
                if (is_numeric($value)) $opts[$key] = $value + 0;
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

        return $img;
    }

    public function updateRefs(array $array): array {

        static $refs;

        if (is_null($refs)) $refs = [];

        if (!is_array($array)) {
            return $array;
        }

        foreach ($array as $k => $v) {

            if (is_array($array[$k])) {
                $array[$k] = $this->updateRefs($array[$k]);
            }

            // check if is asset
            if (isset($v['_id'], $v['path'], $v['mime'], $v['type'])) {

                if (!isset($refs[$v['_id']])) {
                    $refs[$v['_id']] = $this->app->dataStorage->findOne('assets', ['_id' => $v['_id']]);;
                }

                // update with latest asset data
                $array[$k] = $refs[$v['_id']];
            }
        }

        return $array;
    }
}
