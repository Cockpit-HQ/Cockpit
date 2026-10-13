<?php

// Register Helpers
$this->helpers['asset'] = 'Assets\\Helper\\Asset';

// load admin related code
$this->on('app.admin.init', function() {
    include(__DIR__.'/admin.php');
});

// load api request related code
$this->on('app.api.request', function() {
    include(__DIR__.'/api.php');
});

// load cli related code
$this->on('app.cli.init', function ($cli) {
    $app = $this;
    include(__DIR__ . '/cli.php');
});


// assets api
$this->module('assets')->extend([

    'presets' => function() {
        return $this->app->retrieve('assets/presets', [
            'thumbnail' => ['width' => 150, 'height' => 150, 'mode' => 'thumbnail', 'quality' => 80, 'mime' => 'webp'],
            'small' => ['width' => 400, 'height' => 300, 'mode' => 'bestFit', 'quality' => 85, 'mime' => 'webp'],
            'medium' => ['width' => 800, 'height' => 600, 'mode' => 'bestFit', 'quality' => 85, 'mime' => 'webp'],
            'large' => ['width' => 1200, 'height' => 900, 'mode' => 'bestFit', 'quality' => 85, 'mime' => 'webp'],
            'hero' => ['width' => 1920, 'height' => 1080, 'mode' => 'bestFit', 'quality' => 90, 'mime' => 'webp'],
        ]);
    },

    'assets' => function(array $options = []) {
        $assets = $this->app->dataStorage->find('assets', $options)->toArray();
        return $assets;
    },

    'update' => function($assets) {

        $assets = isset($assets[0]) ? $assets : [$assets];
        $by = $this->app->helper('auth')->getUser('_id', null);

        foreach ($assets as &$asset) {

            $_asset = $this->app->dataStorage->findOne('assets', ['_id' => $asset['_id']]);

            if (!$_asset) continue;

            if (isset($asset['title'])) {
                $title = \is_string($asset['title']) ? $asset['title'] : '';
                $asset['title'] = \trim(\str_replace(['<', '>', '"'], '', \strip_tags($title)));
            }

            $asset['_modified'] = time();
            $asset['_mby'] = $by;

            $this->app->trigger('assets.asset.update', [&$asset]);

            $this->app->dataStorage->save('assets', $asset);

        }

        return $assets;
    },

    'folders' => function(array $options = []) {
        return $this->app->dataStorage->find('assets/folders', $options)->toArray();
    },

    'upload' => function(string|array $param = 'files', array $meta = [], bool $isUpload = true) {

        $files = [];

        if (is_string($param) && isset($this->app->request->files[$param])) {
            $files = $this->app->request->files[$param];
        } elseif (is_array($param) && isset($param['name'], $param['error'], $param['tmp_name'])) {
            $files = $param;
        }

        $finfo      = finfo_open(FILEINFO_MIME_TYPE);
        $uploaded  = [];
        $failed    = [];
        $_files     = [];
        $assets    = [];

        $allowed   = $this->app->retrieve('assets/allowed_uploads', '*');
        $allowed   = $allowed == '*' ? true : str_replace([' ', ','], ['', '|'], preg_quote(is_array($allowed) ? implode(',', $allowed) : $allowed));
        $max_size  = $this->app->retrieve('assets/max_upload_size', 0);

        $forbiddenExtension = ['bat', 'exe', 'sh', 'php', 'phar', 'phtml', 'phps', 'htm', 'html', 'xhtml', 'htaccess'];
        $forbiddenMime = [
            'application/x-httpd-php', 'application/x-php', 'text/x-php',
            'text/html', 'application/xhtml+xml'
        ];

        if (isset($files['name']) && is_array($files['name'])) {

            $cnt = count($files['name']);

            for ($i = 0; $i < $cnt; $i++) {

                $_clientName = basename(str_replace('\\', '/', $files['name'][$i]));
                $_filename = pathinfo($_clientName, PATHINFO_FILENAME);
                $extension = pathinfo($_clientName, PATHINFO_EXTENSION);
                $extension = preg_match('/^[a-z0-9]+$/i', $extension) ? strtolower($extension) : '';
                $_filename = $this->app->helper('utils')->slugify($_filename, '-', false);
                $_filename = $_filename ?: 'upload';
                $_file  = $this->app->path('#tmp:').'/'.$_filename.($extension ? ".{$extension}" : '');
                $_mime = $finfo->file($files['tmp_name'][$i]);
                $_isAllowed = $extension && ($allowed === true ? true : preg_match("/\.({$allowed})$/i", $_file));
                $_sizeAllowed = $max_size ? filesize($files['tmp_name'][$i]) < $max_size : true;

                // prevent uploading php / html files
                if ($_isAllowed && (
                    in_array($extension, $forbiddenExtension) ||
                    in_array(strtolower($_mime), $forbiddenMime)
                )) {
                    $_isAllowed = false;
                }

                if (!$files['error'][$i] && $_isAllowed && $_sizeAllowed && ($isUpload ? move_uploaded_file($files['tmp_name'][$i], $_file) : rename($files['tmp_name'][$i], $_file))) {

                    if (\preg_match('/\.svg$/i', $_file) && !\SVGSanitizer::sanitizeFile($_file)) {
                        @unlink($_file);
                        $failed[] = $files['name'][$i];
                        continue;
                    }

                    $_files[]   = $_file;
                    $uploaded[] = $files['name'][$i];

                } else {
                    $failed[] = $files['name'][$i];
                }
            }
        }

        if (count($_files)) {

            $assets = $this->add($_files, $meta, isset($meta['_id']));

            foreach ($_files as $file) {
                unlink($file);
            }
        }

        return ['uploaded' => $uploaded, 'failed' => $failed, 'assets' => $assets];
    },

    'add' => function(array $files, array $meta = [], bool $update = false) {

        $files     = isset($files[0]) ? $files : [$files];
        $finfo     = finfo_open(FILEINFO_MIME_TYPE);
        $assets    = [];
        $created   = time();
        $by        = $this->app->helper('auth')->getUser('_id', null);

        foreach ($files as $idx => &$file) {

            // clean filename
            $name = basename($file);

            // clean filename
            $filename = pathinfo($file, PATHINFO_FILENAME);
            $ext = pathinfo($file, PATHINFO_EXTENSION);
            $cleanFilename = $this->app->helper('utils')->slugify($filename);
            $clean = $cleanFilename.uniqid("_uid_").'.'.$ext;
            $path  = '/'.date('Y/m/d').'/'.$clean;

            $asset = [
                'path' => $path,
                'title' => ucfirst(str_replace(['_', '-'], ' ', basename($name, ".{$ext}"))),
                'mime' => finfo_file($finfo, $file),
                'type' => 'unknown',
                'description' => '',
                'tags' => [],
                'size' => filesize($file),
                'colors' => null,
                'width' => null,
                'height' => null,
                '_hash' => hash_file('md5', $file),
                '_created' => $created,
                '_modified' => $created,
                '_cby' => $by
            ];

            if (!$asset['mime']) {
                $asset['mime'] = 'unknown';
            }

            if ($asset['mime'] == 'image/svg') {
                $asset['mime'] = 'image/svg+xml';
            }

            $asset['type'] = match(1) {
                preg_match('/\.(jpg|jpeg|png|gif|svg|webp)$/i', $file) => 'image',
                preg_match('/\.(mp4|mov|ogv|webv|wmv|flv|avi)$/i', $file) => 'video',
                preg_match('/\.(mp3|weba|ogg|wav|flac)$/i', $file) => 'audio',
                preg_match('/\.(zip|rar|7zip|gz|tar)$/i', $file) => 'archive',
                preg_match('/\.(txt|htm|html|pdf|md)$/i', $file) => 'document',
                preg_match('/\.(htm|html|php|css|less|js|json|md|markdown|yaml|xml|htaccess)$/i', $file) => 'code',
                default => 'unknown'
            };

            if ($asset['type'] == 'video') {

                $videoMeta = $this->app->helper('asset')->getVideoMeta($file);

                if (isset($videoMeta['duration'])) $asset['duration'] = $videoMeta['duration'];
                if (isset($videoMeta['codec'])) $asset['codec'] = $videoMeta['codec'];

                if (isset($videoMeta['width'], $videoMeta['height'])) {
                    $asset['width'] = $videoMeta['width'];
                    $asset['height'] = $videoMeta['height'];
                }
            }

            if ($asset['type'] == 'image') {

                $asset['altText'] = $name;

                if (preg_match('/\.svg$/i', $file)) {

                    if (function_exists('simplexml_load_string')) {

                        $svgContent = file_get_contents($file);

                        libxml_use_internal_errors(true);
                        $xml = simplexml_load_string($svgContent);
                        libxml_use_internal_errors(false);

                        if ($xml && isset($xml['width']) && isset($xml['height'])) {

                            $asset['width'] = (string)$xml['width'];
                            $asset['height'] = (string)$xml['height'];

                            if (is_numeric($asset['width'])) $asset['width'] = $asset['width'] + 0;
                            if (is_numeric($asset['height'])) $asset['height'] = $asset['height'] + 0;

                            $colors = [];

                            foreach([
                                '/#([a-fA-F0-9]{3,8})\b/',
                                '/rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(,\s*[\d.]+\s*)?\)/',
                                '/hsla?\(\s*\d+\s*,\s*[\d.%]+\s*,\s*[\d.%]+\s*(,\s*[\d.]+\s*)?\)/',
                            ] as $regex) {
                                preg_match_all($regex, $svgContent, $matches);
                                if (isset($matches[0])) $colors = array_merge($colors, $matches[0]);
                            }

                            $asset['colors'] = count($colors) ? array_merge([], array_unique($colors)) : null;
                        }
                    }

                } else {

                    $info = getimagesize($file);
                    $asset['width']  = $info[0];
                    $asset['height'] = $info[1];

                    if ($asset['width'] && $asset['height']) {

                        $tmppath = $this->app->path('#tmp:').$clean;

                        try {

                            if (function_exists('ini_set')) {
                                ini_set('memory_limit', -1);
                            }

                            $img = new SimpleImageLib($file);
                            $img->bestFit(100, 100)->toFile($tmppath);

                            // RGB quantization keeps palettes consistent with assets processed by color-thief v2
                            $colorThief = new \ColorThief\ColorThief(colorSpace: \ColorThief\ColorSpace::Rgb);

                            $asset['colors'] = $colorThief->getPalette($tmppath, 5)->toHex('#');
                            $asset['thumbhash'] = implode('-', Thumbhash::fromFile($tmppath));

                            unlink($tmppath);

                        } catch (\Exception $e) {
                            $asset['colors'] = [];
                            $asset['thumbhash'] = null;
                        }
                    }
                }
            }

            $opts  = ['mimetype' => $asset['mime']];
            $_meta = isset($meta[$idx]) && is_array($meta[$idx]) ? $meta[$idx] : $meta;

            $this->app->trigger('assets.asset.upload', [&$asset, &$_meta, &$opts, &$file, &$path]);

            if (!$asset) {
                continue;
            }

            // move file
            try {

                $stream = fopen($file, 'r+');
                $this->app->fileStorage->writeStream("uploads://{$path}", $stream, $opts);

                if (is_resource($stream)) {
                    fclose($stream);
                }

            } catch (Throwable $exception) {
                continue;
            }

            foreach ($_meta as $key => $val) {
                $asset[$key] = $val;
            }

            $this->app->trigger('assets.asset', [&$asset]);

            $assets[] = $asset;
        }

        if (count($assets)) {

            if ($update) {
                foreach ($assets as $asset) {
                    $this->app->trigger('assets.asset.update', [&$asset]);
                    $this->app->dataStorage->save('assets', $asset);
                }
            } else {
                $this->app->trigger('assets.add', [&$assets]);
                $this->app->dataStorage->insert('assets', $assets);
            }
        }

        $this->app->trigger('assets.uploaded', [$assets]);

        return $assets;
    },

    'remove' => function(mixed $assets) {

        $assets = isset($assets[0]) ? $assets : [$assets];

        $this->app->trigger('assets.before.remove', [&$assets]);

        foreach ($assets as &$asset) {

            if (is_string($asset)) {
                $asset = $this->app->dataStorage->findOne('assets', ['_id' => $asset]);
            }

            if (!isset($asset['_id'])) continue;

            if (!isset($asset['path'])) {
                $asset = $this->app->dataStorage->findOne('assets', ['_id' => $asset['_id']]);
            }

            if (!$asset) continue;

            $this->app->dataStorage->remove('assets', ['_id' => $asset['_id']]);

            if ($this->app->fileStorage->fileExists('uploads://'.trim($asset['path'], '/'))) {
                $this->app->fileStorage->delete('uploads://'.trim($asset['path'], '/'));
            }

            $this->app->trigger('assets.asset.remove', [$asset]);
        }

        $this->app->trigger('assets.remove', [$assets]);

        return $assets;
    },

    'thumbnail' => function(array $options = []) {
        return $this->app->helper('asset')->thumbnail($options);
    }
]);
