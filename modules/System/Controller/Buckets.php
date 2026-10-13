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

        if (!\preg_match('/^[a-zA-Z0-9_-]+$/', $bucket)) {
            return $this->stop(['error' => 'Invalid bucket name'], 412);
        }

        $this->root = "uploads://buckets/{$bucket}";

        if (!$this->app->fileStorage->has($this->root)) {
            $this->app->fileStorage->createDirectory($this->root);
        }

        if ($this->app->fileStorage->has($this->root) && \in_array($cmd, \get_class_methods($this))){

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

        $dir = $this->_bucketPath($path);
        $data['path'] = $dir;

        if ($this->app->fileStorage->has($dir)){

            foreach ($this->app->fileStorage->listContents($dir, false) as $file) {

                $path = $file->path();
                $pathInfo = \pathinfo($path);
                $isFile = $file->isFile();
                $isDir = $file->isDir();

                $filename = $pathInfo['basename'];

                if ($filename[0]=='.' && \in_array(\strtolower($filename), $toignore)) continue;

                try {
                    $mime = $isDir ? null : $this->app->fileStorage->mimeType($path);
                } catch (\Exception $e) {
                    $mime = null;
                }

                $type = match(1) {
                    \preg_match('/\.(jpg|jpeg|png|gif|svg|webp)$/i', $filename) => 'image',
                    \preg_match('/\.(mp4|mov|ogv|webv|wmv|flv|avi)$/i', $filename) => 'video',
                    \preg_match('/\.(mp3|weba|ogg|wav|flac)$/i', $filename) => 'audio',
                    \preg_match('/\.(zip|rar|7zip|gz|tar)$/i', $filename) => 'archive',
                    \preg_match('/\.(txt|htm|html|pdf|md)$/i', $filename) => 'document',
                    \preg_match('/\.(htm|html|php|css|less|js|json|md|markdown|yaml|xml|htaccess)$/i', $filename) => 'code',
                    default => 'unknown'
                };

                $data[$file->isDir() ? 'folders':'files'][] = [
                    'is_file' => $isFile,
                    'is_dir' => $isDir,
                    'name' => $filename,
                    'path' => \trim(\str_replace($this->root, '', $path), '/'),
                    'url'  => $this->app->fileStorage->getURL($path),
                    'type' => $type,
                    'size' => $isDir ? null : $this->app->helper('utils')->formatSize($file->fileSize()),
                    'filesize' => $isDir ? null : $file->fileSize(),
                    'mime' => $mime,
                    'ext'  => $isDir ? null : \strtolower($pathInfo['extension']),
                    'lastmodified' => $isDir ? null : \date('d.m.y H:i', $file->lastModified()),
                    'modified' => $isDir ? null : $file->lastModified(),
                ];
            }
        }

        \usort($data['folders'], fn($a, $b) => \strcasecmp($a['name'], $b['name']));
        \usort($data['files'], fn($a, $b) => \strcasecmp($a['name'], $b['name']));

        return $data;
    }

    protected function createfolder() {

        $path = $this->_getPathParameter();

        if ($path === false) return false;

        $name = $this->param('name', false);
        $ret  = false;

        if ($name && $this->_isValidItemName($name)) {
            $target = $this->_bucketPath(\trim($path ? "{$path}/{$name}" : $name, '/'));

            try {
                $this->app->fileStorage->createDirectory($target);
                $ret = $this->app->fileStorage->directoryExists($target);
            } catch (\Throwable $e) {
            }
        }

        return \json_encode(['success' => $ret]);
    }

    protected function rename() {

        $path = $this->_getPathParameter();

        if ($path === false) return false;
        if ($path === '') return \json_encode(['success' => false]);

        $name = $this->param('name', false);
        $success = false;

        if (!$this->_isValidItemName($name)) {
            return $this->stop(['error' => 'Invalid file name'], 412);
        }

        $source = $this->_bucketPath($path);

        if (
            !$this->app->fileStorage->fileExists($source) &&
            !$this->app->fileStorage->directoryExists($source)
        ) {
            return \json_encode(['success' => false]);
        }

        if ($this->app->fileStorage->fileExists($source) && !$this->_isFileTypeAllowed($name)) {
            return \json_encode(['success' => false]);
        }

        $dirname = \dirname($path);
        $targetPath = $dirname === '.' ? $name : "{$dirname}/{$name}";
        $target = $this->_bucketPath($targetPath);

        try {
            $this->app->fileStorage->move($source, $target);
            $success = true;
        } catch (\Throwable $e) {
        }

        return \json_encode(['success' => $success]);
    }

    protected function removefiles() {

        $paths     = (array)$this->param('paths', []);
        $deletions = [];

        foreach ($paths as $path) {

            $path = $this->_normalizeRelativePath($path);

            if ($path === false || $path === '') {
                continue;
            }

            $delpath = $this->_bucketPath($path);

            if ($this->app->fileStorage->directoryExists($delpath)) {
                $this->app->fileStorage->deleteDirectory($delpath);
            } elseif($this->app->fileStorage->has($delpath)) {
                $this->app->fileStorage->delete($delpath);
            }

            $deletions[] = $delpath;
        }

        return \json_encode(['success' => true]);
    }

    protected function upload() {

        $path = $this->_getPathParameter();

        if ($path === false) return false;

        $files      = $_FILES['files'] ?? [];
        $targetpath = $this->_bucketPath($path);
        $uploaded   = [];
        $failed     = [];

        // absolute paths for hook
        $_uploaded  = [];
        $_failed    = [];

        $finfo = \finfo_open(FILEINFO_MIME_TYPE);

        if (isset($files['name']) && $this->app->fileStorage->has($targetpath)) {

            $count = \count($files['name']);

            for ($i = 0; $i < $count; $i++) {

                // clean filename
                $clean = \preg_replace('/[^a-zA-Z0-9-_\.]/','', \str_replace(' ', '-', $files['name'][$i]));
                $_file = $this->app->path('#tmp:').'/'.$files['name'][$i];
                $_mime = null;

                if (!$files['error'][$i] && $finfo) {
                    $_mime = \finfo_file($finfo, $files['tmp_name'][$i]);
                    $_mime = $_mime ?: null;
                }

                if (!$files['error'][$i] && $this->_isFileTypeAllowed($clean, $_mime) && \move_uploaded_file($files['tmp_name'][$i], $_file)) {

                    if (\preg_match('/\.svg$/i', $clean) && !\SVGSanitizer::sanitizeFile($_file)) {
                        @unlink($_file);
                        $failed[]  = ['file' => $files['name'][$i], 'error' => 'SVG sanitization failed'];
                        $_failed[] = $_file;
                        continue;
                    }

                    $uploaded[]  = $files['name'][$i];
                    $_uploaded[] = $_file;

                    try {

                        $opts  = [
                            'mimetype' => $_mime ?: ($finfo ? \finfo_file($finfo, $_file) : null)
                        ];

                        $stream = \fopen($_file, 'r+');
                        $this->app->fileStorage->writeStream($targetpath.'/'.$clean, $stream, $opts);

                        if (\is_resource($stream)) {
                            \fclose($stream);
                        }

                        \unlink($_file);

                    } catch (\Throwable $exception) {
                        continue;
                    }

                } else {
                    $failed[]  = ['file' => $files['name'][$i], 'error' => $files['error'][$i] ?: 'File type not allowed'];
                    $_failed[] = $_file;
                }
            }
        }

        return \json_encode(['uploaded' => $uploaded, 'failed' => $failed]);
    }

    protected function _getPathParameter() {

        return $this->_normalizeRelativePath($this->param('path', false));
    }

    protected function _normalizeRelativePath(mixed $path): string|false {

        if ($path === false || $path === null) {
            return false;
        }

        $path = \trim((string)$path);

        if ($path === '' || $path === '.' || $path === '/') {
            return '';
        }

        $path = \str_replace('\\', '/', \trim($path, '/'));

        if (\str_contains($path, "\0")) {
            return false;
        }

        $parts = [];

        foreach (\explode('/', $path) as $part) {

            if ($part === '' || $part === '.') {
                continue;
            }

            if ($part === '..') {
                return false;
            }

            $parts[] = $part;
        }

        return \implode('/', $parts);
    }

    protected function _bucketPath(string $path = ''): string {
        return $path !== '' ? "{$this->root}/{$path}" : $this->root;
    }

    protected function _isValidItemName(mixed $name): bool {

        if (!\is_string($name)) {
            return false;
        }

        $name = \trim($name);

        if ($name === '' || $name === '.' || $name === '..') {
            return false;
        }

        if (\str_contains($name, "\0")) {
            return false;
        }

        return !\preg_match('/[\/\\\\:*?"<>|]/', $name);
    }

    protected function _isFileTypeAllowed($file, ?string $mime = null): bool {

        $allowed = $this->app->retrieve('finder.allowed_uploads', '*');
        $extension = \strtolower(\pathinfo((string)$file, PATHINFO_EXTENSION));
        $forbiddenExtensions = [
            'bat', 'exe', 'sh',
            'php', 'php3', 'php4', 'php5', 'php7', 'php8',
            'phar', 'phtml', 'phps', 'pht', 'shtml',
            'htm', 'html', 'xhtml', 'htaccess',
        ];

        if (\in_array($extension, $forbiddenExtensions, true)) {
            return false;
        }

        if (!$this->_isMimeTypeAllowed($mime)) {
            return false;
        }

        $allowed = \is_array($allowed) ? $allowed : \trim($allowed);

        if ($allowed == '*') {
            return true;
        }

        $allowed = \str_replace([' ', ','], ['', '|'], \preg_quote(\is_array($allowed) ? \implode(',', $allowed) : $allowed));

        return \preg_match("/\.({$allowed})$/i", $file);
    }

    protected function _isMimeTypeAllowed(?string $mime): bool {

        if (!$mime) {
            return true;
        }

        $forbiddenMimes = [
            'application/x-httpd-php',
            'application/x-php',
            'text/x-php',
            'text/html',
            'application/xhtml+xml',
        ];

        return !\in_array(\strtolower($mime), $forbiddenMimes, true);
    }

}
