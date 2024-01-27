<?php

namespace System\Controller;

use App\Controller\App;
use ArrayObject;

class Buckets extends App {

    protected $root;

    public function api(?string $bucket = null) {

        $this->helper('session')->close();
        $this->hasValidCsrfToken(true);

        $cmd = $this->param('cmd', false);

        if (!$bucket) {
            return false;
        }

        $bucket = preg_replace('/[^a-zA-Z0-9-_\.]/','', str_replace(' ', '-', $bucket));

        $this->root = "uploads://buckets/{$bucket}";

        if (!$this->app->fileStorage->has($this->root)) {
            $this->app->fileStorage->createDirectory($this->root);
        }

        if ($this->app->fileStorage->has($this->root) && in_array($cmd, get_class_methods($this))){

            $this->app->response->mime = 'json';
            return $this->{$cmd}();
        }

        return false;
    }

    protected function ls() {

        $path     = $this->_getPathParameter();
        $data     = ['folders'=>[], 'files'=>[]];
        $toignore = [
            '.svn', '_svn', 'cvs', '_darcs', '.arch-params', '.monotone', '.bzr', '.git', '.hg',
            '.ds_store', '.thumb', '.idea'
        ];

        if ($path === false) {
            return $data;
        }

        $dir = $this->root.'/'.$path;
        $data['path'] = $dir;

        if ($this->app->fileStorage->has($dir)){

            foreach ($this->app->fileStorage->listContents($dir, false) as $file) {

                $path = $file->path();
                $pathInfo = pathinfo($path);
                $isFile = $file->isFile();
                $isDir = $file->isDir();

                $filename = $pathInfo['basename'];

                if ($filename[0]=='.' && in_array(strtolower($filename), $toignore)) continue;

                try {
                    $mime = $isDir ? null : $this->app->fileStorage->mimeType($path);
                } catch (\Exception $e) {
                    $mime = null;
                }

                $type = match(1) {
                    preg_match('/\.(jpg|jpeg|png|gif|svg|webp)$/i', $filename) => 'image',
                    preg_match('/\.(mp4|mov|ogv|webv|wmv|flv|avi)$/i', $filename) => 'video',
                    preg_match('/\.(mp3|weba|ogg|wav|flac)$/i', $filename) => 'audio',
                    preg_match('/\.(zip|rar|7zip|gz|tar)$/i', $filename) => 'archive',
                    preg_match('/\.(txt|htm|html|pdf|md)$/i', $filename) => 'document',
                    preg_match('/\.(htm|html|php|css|less|js|json|md|markdown|yaml|xml|htaccess)$/i', $filename) => 'code',
                    default => 'unknown'
                };

                $data[$file->isDir() ? 'folders':'files'][] = [
                    'is_file' => $isFile,
                    'is_dir' => $isDir,
                    'name' => $filename,
                    'path' => trim(str_replace($this->root, '', $path), '/'),
                    'url'  => $this->app->fileStorage->getURL($path),
                    'type' => $type,
                    'size' => $isDir ? null : $this->app->helper('utils')->formatSize($file->fileSize()),
                    'filesize' => $isDir ? null : $file->fileSize(),
                    'mime' => $mime,
                    'ext'  => $isDir ? null : strtolower($pathInfo['extension']),
                    'lastmodified' => $isDir ? null : date('d.m.y H:i', $file->lastModified()),
                    'modified' => $isDir ? null : $file->lastModified(),
                ];
            }
        }

        usort($data['folders'], fn($a, $b) => strcasecmp($a['name'], $b['name']));
        usort($data['files'], fn($a, $b) => strcasecmp($a['name'], $b['name']));

        return $data;
    }

    protected function createfolder() {

        $path = $this->_getPathParameter();

        if ($path === false) return false;

        $name = $this->param('name', false);
        $ret  = false;

        if ($name) {
            $ret = $this->app->fileStorage->createDirectory($this->root.'/'.$path.'/'.$name);
        }

        return json_encode(['success' => $ret]);
    }

    protected function rename() {

        $path = $this->_getPathParameter();

        if ($path === false) return false;

        $name = $this->param('name', false);

        if ($name && $this->_isFileTypeAllowed($name)) {

            $source = $this->root.'/'.$path;
            $target = $this->root.'/'.$name;

            $this->app->fileStorage->move($source, $target);
        }

        return json_encode(['success' => true]);
    }

    protected function removefiles() {

        $paths     = (array)$this->param('paths', []);
        $deletions = [];

        foreach ($paths as $path) {

            $delpath = $this->root.'/'.trim($path, '/');

            if ($this->app->fileStorage->directoryExists($delpath)) {
                $this->app->fileStorage->deleteDirectory($delpath);
            } elseif($this->app->fileStorage->has($delpath)) {
                $this->app->fileStorage->delete($delpath);
            }

            $deletions[] = $delpath;
        }

        return json_encode(['success' => true]);
    }

    protected function upload() {

        $path = $this->_getPathParameter();

        if ($path === false) return false;

        $files      = $_FILES['files'] ?? [];
        $targetpath = trim($this->root.'/'.$path, '/');
        $uploaded   = [];
        $failed     = [];

        // absolute paths for hook
        $_uploaded  = [];
        $_failed    = [];

        $finfo = finfo_open(FILEINFO_MIME_TYPE);

        if (isset($files['name']) && $this->app->fileStorage->has($targetpath)) {

            $count = count($files['name']);

            for ($i = 0; $i < $count; $i++) {

                // clean filename
                $clean = preg_replace('/[^a-zA-Z0-9-_\.]/','', str_replace(' ', '-', $files['name'][$i]));
                $_file  = $this->app->path('#tmp:').'/'.$files['name'][$i];

                if (!$files['error'][$i] && $this->_isFileTypeAllowed($clean) && move_uploaded_file($files['tmp_name'][$i], $_file)) {

                    $uploaded[]  = $files['name'][$i];
                    $_uploaded[] = $_file;

                    if (\preg_match('/\.(svg|xml)$/i', $clean)) {
                        file_put_contents($_file, \SVGSanitizer::clean(\file_get_contents($_file)));
                    }

                    try {

                        $opts  = [
                            'mimetype' => finfo_file($finfo, $_file)
                        ];

                        $stream = fopen($_file, 'r+');
                        $this->app->fileStorage->writeStream($targetpath.'/'.$clean, $stream, $opts);

                        if (is_resource($stream)) {
                            fclose($stream);
                        }

                        unlink($_file);

                    } catch (\Throwable $exception) {
                        continue;
                    }

                } else {
                    $failed[]  = ['file' => $files['name'][$i], 'error' => $files['error'][$i]];
                    $_failed[] = $_file;
                }
            }
        }

        return json_encode(['uploaded' => $uploaded, 'failed' => $failed]);
    }

    protected function _getPathParameter() {

        $path = $this->param('path', false);

        if ($path) {

            $path = trim(trim($path, '/'));

            if (str_contains($path, '../')) {
                $path = false;
            }
        }

        return $path;
    }

    protected function _isFileTypeAllowed($file) {

        $allowed = trim($this->app->retrieve('finder.allowed_uploads', '*'));

        if (strtolower(pathinfo($file, PATHINFO_EXTENSION)) == 'php') {
            return false;
        }

        if ($allowed == '*') {
            return true;
        }

        $allowed = str_replace([' ', ','], ['', '|'], preg_quote(is_array($allowed) ? implode(',', $allowed) : $allowed));

        return preg_match("/\.({$allowed})$/i", $file);
    }

}
