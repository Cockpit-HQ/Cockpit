<?php

include_once(__DIR__.'/lib/vendor/autoload.php');
include_once(__DIR__.'/lib/SVGSanitizer.php');

// load admin related code
$this->on('app.admin.init', function() {
    include(__DIR__.'/admin.php');
});

// content api
$this->module('assets')->extend([

    'assets' => function(array $options = []) {
        $assets = $this->app->dataStorage->find('assets', $options)->toArray();
        return $assets;
    },

    'folders' => function(array $options = []) {
        return $this->app->dataStorage->find('assets_folders', $options)->toArray();
    },

    'uploadAssets' => function(string $param = 'files', array $meta = []) {

        $files = [];

        if (is_string($param) && isset($_FILES[$param])) {
            $files = $_FILES[$param];
        } elseif (is_array($param) && isset($param['name'], $param['error'], $param['tmp_name'])) {
            $files = $param;
        }

        $uploaded  = [];
        $failed    = [];
        $_files    = [];
        $assets    = [];

        $allowed   = $this->app->retrieve('assets/allowed_uploads', '*');
        $allowed   = $allowed == '*' ? true : str_replace([' ', ','], ['', '|'], preg_quote(is_array($allowed) ? implode(',', $allowed) : $allowed));
        $max_size  = $this->app->retrieve('assets/max_upload_size', 0);

        if (isset($files['name']) && is_array($files['name'])) {

            for ($i = 0; $i < count($files['name']); $i++) {

                $_file  = $this->app->path('#tmp:').'/'.$files['name'][$i];
                $_isAllowed = $allowed === true ? true : preg_match("/\.({$allowed})$/i", $_file);
                $_sizeAllowed = $max_size ? filesize($files['tmp_name'][$i]) < $max_size : true;

                if (!$files['error'][$i] && $_isAllowed && $_sizeAllowed && move_uploaded_file($files['tmp_name'][$i], $_file)) {

                    $_files[]   = $_file;
                    $uploaded[] = $files['name'][$i];

                    if (\preg_match('/\.(svg|xml)$/i', $_file)) {
                        file_put_contents($_file, \SVGSanitizer::clean(\file_get_contents($_file)));
                    }

                } else {
                    $failed[] = $files['name'][$i];
                }
            }
        }

        if (count($_files)) {

            $assets = $this->saveAssets($_files, $meta);

            foreach ($_files as $file) {
                unlink($file);
            }
        }

        return ['uploaded' => $uploaded, 'failed' => $failed, 'assets' => $assets];
    },

    'saveAssets' => function(array $files, array $meta = [], bool $update = false) {

        $files     = isset($files[0]) ? $files : [$files];
        $finfo     = finfo_open(FILEINFO_MIME_TYPE);
        $assets    = [];
        $created   = time();

        foreach ($files as $idx => &$file) {

            // clean filename
            $name = basename($file);

            // clean filename
            $filename = pathinfo($file, PATHINFO_FILENAME);
            $ext = pathinfo($file, PATHINFO_EXTENSION);
            $cleanFilename = preg_replace('/[^a-zA-Z0-9-_\.]/','', str_replace(' ', '-', $filename));
            $clean = $cleanFilename.uniqid("_uid_").'.'.$ext;
            $path  = '/'.date('Y/m/d').'/'.$clean;

            $asset = [
                'path' => $path,
                'title' => $name,
                'mime' => finfo_file($finfo, $file),
                'description' => '',
                'tags' => [],
                'size' => filesize($file),
                'image' => preg_match('/\.(jpg|jpeg|png|gif|svg|webp)$/i', $file) ? true:false,
                'video' => preg_match('/\.(mp4|mov|ogv|webv|wmv|flv|avi)$/i', $file) ? true:false,
                'audio' => preg_match('/\.(mp3|weba|ogg|wav|flac)$/i', $file) ? true:false,
                'archive' => preg_match('/\.(zip|rar|7zip|gz|tar)$/i', $file) ? true:false,
                'document' => preg_match('/\.(txt|htm|html|pdf|md)$/i', $file) ? true:false,
                'code' => preg_match('/\.(htm|html|php|css|less|js|json|md|markdown|yaml|xml|htaccess)$/i', $file) ? true:false,
                'colors' => null,
                'width' => null,
                'height' => null,
                'created' => $created,
                'modified' => $created,
                '_by' => $this->app->helper('auth')->getUser('_id')
            ];

            if (!$asset['mime']) {
                $asset['mime'] = 'unknown';
            }

            if ($asset['mime'] == 'image/svg') {
                $asset['mime'] = 'image/svg+xml';
            }

            if ($asset['image'] && !preg_match('/\.svg$/i', $file)) {

                $info = getimagesize($file);
                $asset['width']  = $info[0];
                $asset['height'] = $info[1];
                $asset['colors'] = [];

                if ($asset['width'] && $asset['height']) {

                    try {
                        $asset['colors'] = \ColorThief\ColorThief::getPalette($file, 5, ceil(($asset['width'] * $asset['height']) / 10000));
                    } catch (\Exception $e) {
                        $asset['colors'] = [];
                    }

                    foreach ($asset['colors'] as &$color) {
                        $color = sprintf("#%02x%02x%02x", $color[0], $color[1], $color[2]);
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
            $stream = fopen($file, 'r+');
            $this->app->fileStorage->writeStream("uploads://{$path}", $stream, $opts);

            if (is_resource($stream)) {
                fclose($stream);
            }

            foreach ($_meta as $key => $val) {
                $asset[$key] = $val;
            }

            $this->app->trigger('assets.asset', [&$asset]);

            $assets[] = $asset;
        }

        if (count($assets)) {

            $this->app->trigger('assets.save', [&$assets]);

            if ($update) {
                foreach ($assets as $asset) {
                    $this->app->dataStorage->save('assets', $asset);
                }
            } else {
                $this->app->dataStorage->insert('assets', $assets);
            }
        }

        return $assets;
    },
]);