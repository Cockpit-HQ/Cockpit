<?php

namespace Finder\Controller;

use App\Controller\App;
use ArrayObject;

class Finder extends App {

    protected $root;

    protected function before() {

        if (!$this->isAllowed('app/finder')) {
            return $this->stop(401);
        }
    }

    public function index() {

        $this->helper('theme')->favicon('finder:icon.svg');
        return $this->render('finder:views/index.php');
    }


    public function api() {

        $this->helper('session')->close();

        $this->root = $this->app->path('#root:');
        $cmd = $this->param('cmd', false);

        if (file_exists($this->root) && in_array($cmd, get_class_methods($this))){

            $this->app->response->mime = 'json';
            return $this->{$cmd}();
        }

        return false;
    }

    protected function ls() {

        $data     = ['folders'=>[], 'files'=>[]];
        $toignore = [
            '.svn', '_svn', 'cvs', '_darcs', '.arch-params', '.monotone', '.bzr', '.git', '.hg',
            '.ds_store', '.thumb', '.idea'
        ];

        if ($path = $this->_getPathParameter()){

            $dir = $this->root.'/'.trim($path, '/');
            $data['path'] = $dir;
            $finfo = finfo_open(FILEINFO_MIME_TYPE);

            if (file_exists($dir)){

                foreach (new \DirectoryIterator($dir) as $file) {

                    if ($file->isDot()) continue;

                    $filename = $file->getFilename();

                    if ($filename[0]=='.' && in_array(strtolower($filename), $toignore)) continue;

                    $isDir = $file->isDir();

                    $data[$file->isDir() ? 'folders':'files'][] = [
                        'is_file' => !$isDir,
                        'is_dir' => $isDir,
                        'is_writable' => is_writable($file->getPathname()),
                        'name' => $filename,
                        'path' => trim($path.'/'.$file->getFilename(), '/'),
                        'url'  => $this->app->pathToUrl($file->getPathname()),
                        'size' => $isDir ? null : $this->app->helper('utils')->formatSize($file->getSize()),
                        'filesize' => $isDir ? null : $file->getSize(),
                        'mime' => $isDir ? null : finfo_file($finfo, $file->getPathname()),
                        'ext'  => $isDir ? null : strtolower($file->getExtension()),
                        'lastmodified' => $file->isDir() ? null : date('d.m.y H:i', $file->getMTime()),
                        'modified' => $file->isDir() ? null : $file->getMTime(),
                    ];
                }
            }
        }

        usort($data['folders'], fn($a, $b) => strcasecmp($a['name'], $b['name']));
        usort($data['files'], fn($a, $b) => strcasecmp($a['name'], $b['name']));

        return $data;
    }

    protected function upload() {

        $path       = $this->_getPathParameter();

        if (!$path) return false;

        $files      = $this->app->request->files['files'] ?? [];
        $targetpath = $this->root.'/'.trim($path, '/');
        $uploaded   = [];
        $failed     = [];

        // absolute paths for hook
        $_uploaded  = [];
        $_failed    = [];

        if (isset($files['name']) && $path && file_exists($targetpath)) {

            $count = count($files['name']);

            for ($i = 0; $i < $count; $i++) {

                // clean filename
                $clean = preg_replace('/[^a-zA-Z0-9-_\.]/','', str_replace(' ', '-', $files['name'][$i]));
                $_file = $targetpath.'/'.$clean;

                if (!$files['error'][$i] && $this->_isFileTypeAllowed($clean) && move_uploaded_file($files['tmp_name'][$i], $_file)) {
                    $uploaded[]  = $files['name'][$i];
                    $_uploaded[] = $_file;

                    if (\preg_match('/\.(svg|xml)$/i', $clean)) {
                        file_put_contents($_file, \SVGSanitizer::clean(\file_get_contents($_file)));
                    }

                } else {
                    $failed[]  = ['file' => $files['name'][$i], 'error' => $files['error'][$i]];
                    $_failed[] = $_file;
                }
            }
        }

        $this->app->trigger('finder.upload', [$_uploaded, $_failed]);

        return json_encode(['uploaded' => $uploaded, 'failed' => $failed]);
    }

    protected function createfolder() {

        $path = $this->_getPathParameter();

        if (!$path) return false;

        $name = $this->param('name', false);
        $ret  = false;

        if ($name && $path) {
            $ret = mkdir($this->root.'/'.trim($path, '/').'/'.$name);
        }

        return json_encode(['success' => $ret]);
    }

    protected function createfile() {

        $path = $this->_getPathParameter();

        if (!$path) return false;

        $name = $this->param('name', false);
        $ret  = false;

        if ($name && $this->_isFileTypeAllowed($name) && $path) {
            $ret = @file_put_contents($this->root.'/'.trim($path, '/').'/'.$name, '');
        }

        return json_encode(['success' => $ret]);
    }


    protected function removefiles() {

        $paths     = (array)$this->param('paths', []);
        $deletions = [];

        foreach ($paths as $path) {

            $delpath = $this->root.'/'.trim($path, '/');

            if (is_dir($delpath)) {
                $this->_rrmdir($delpath);
            }

            if (is_file($delpath)){
                unlink($delpath);
            }

            $deletions[] = $delpath;
        }

        $this->app->trigger('cockpit.media.removefiles', [$deletions]);

        return json_encode(['success' => true]);
    }

    protected function _rrmdir($dir) {

        if (is_dir($dir)) {
            $objects = scandir($dir);
            foreach ($objects as $object) {
                if ($object != "." && $object != "..") {
                    if (filetype($dir."/".$object) == "dir") $this->_rrmdir($dir."/".$object); else unlink($dir."/".$object);
                }
            }

            reset($objects);
            rmdir($dir);
        }
    }

    protected function rename() {

        $path = $this->_getPathParameter();

        if (!$path) return false;

        $name = $this->param('name', false);

        if ($path && $name && $this->_isFileTypeAllowed($name)) {
            $source = $this->root.'/'.trim($path, '/');
            $target = dirname($source).'/'.$name;

            rename($source, $target);
            $this->app->trigger('cockpit.media.rename', [$source, $target]);
        }

        return json_encode(['success' => true]);
    }

    protected function readfile() {

        $path = $this->_getPathParameter();
        $contents = null;

        if (!$path) return false;

        $file = $this->root.'/'.trim($path, '/');

        if ($path && file_exists($file)) {
            $contents = file_get_contents($file);
        }

        return compact('contents');
    }

    protected function writefile() {

        $path = $this->_getPathParameter();

        if (!$path) return false;

        $contents = $this->param('contents', false);
        $file     = $this->root.'/'.trim($path, '/');
        $ret      = false;

        if ($path && file_exists($file) && $contents!==false) {

            $isPHPfile = preg_match('/\.php$/', $file);

            if ($isPHPfile && !$this->helper('acl')->isSuperAdmin()) {
                return ['success' => false, 'error' => 'Access denied.'];
            }

            $ret = file_put_contents($file, $contents);

            if ($ret && $isPHPfile && function_exists('opcache_invalidate')) {
                opcache_invalidate($file, true);
            }
        }

        return json_encode(['success' => $ret]);
    }

    protected function unzip() {


        $path    = $this->_getPathParameter();

        if (!$path) return false;

        $return  = ['success' => false];
        $zip     = $this->param('zip', false);

        if ($path && $zip) {

            $path =  $this->root.'/'.trim($path, '/');
            $zip  =  $this->root.'/'.trim($zip, '/');

            $za = new \ZipArchive;

            if ($za->open($zip)) {

                if ($za->extractTo($path)) {
                    $return = ['success' => true];
                }

                $za->close();
            }
        }

        return json_encode($return);
    }

    protected function download() {

        $path = $this->_getPathParameter();

        if (!$path) return false;

        $file = $this->root.'/'.trim($path, '/');

        if (!$path && !file_exists($file)) {
            $this->app->stop();
        }

        if (is_dir($file)) {
            return $this->downloadfolder();
        }

        $pathinfo = $path_parts = pathinfo($file);

        header('Pragma: public');
        header('Expires: 0');
        header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
        header('Cache-Control: private', false);
        header('Content-Type: application/force-download');
        header('Content-Disposition: attachment; filename="'.$pathinfo["basename"].'";' );
        header('Content-Transfer-Encoding: binary');
        header('Content-Length: '.filesize($file));

        //readfile($file);

        $handle = fopen($file, 'rb');

        while (!feof($handle)) {
            echo fread($handle, 1000);
        }

        fclose($handle);

        $this->app->stop();
    }

    protected function downloadfolder() {


        $path   = $this->_getPathParameter();

        if (!$path) return false;

        $folder = $this->root.'/'.trim($path, '/');

        if (!$path && !file_exists($folder)) {
            $this->app->stop();
        }

        header('X-Accel-Buffering: no');

        $prefix = basename($path);
        $files  = new \RecursiveIteratorIterator(new \RecursiveDirectoryIterator($folder), \RecursiveIteratorIterator::LEAVES_ONLY);
        $zip    = new \ZipStream\ZipStream("{$prefix}.zip");

        foreach ($files as $name => $file) {

            if ($file->isDir()) continue;

            $filePath = $file->getRealPath();
            $relativePath = substr($filePath, strlen($folder) + 1);
            $zip->addFileFromPath("{$prefix}/{$relativePath}", $filePath);
        }

        $zip->finish();

        $this->app->stop();
    }

    protected function getfilelist() {


        $list = [];
        $toignore = [
            '\.svn', '_svn', 'cvs', '_darcs', '\.arch-params', '\.monotone', '\.bzr', '\.git', '\.hg', '\.ds_store', '\.thumb', '\/cache'
        ];

        $toignore = '/('.implode('|',$toignore).')/i';

        foreach (new \RecursiveIteratorIterator(new \RecursiveDirectoryIterator($this->root)) as $file) {

            if ($file->isDir()) continue;

            $filename = $file->getFilename();

            if ($filename[0]=='.' || preg_match($toignore, $file->getPathname())) continue;

            $path = trim(str_replace(['\\', $this->root], ['/',''], $file->getPathname()), '/');

            $list[] = [
                "is_file" => true,
                "is_dir" => false,
                "is_writable" => is_writable($file->getPathname()),
                "name" => $filename,
                "path" => $path,
                "dir" => dirname($path),
                "url"  => $this->app->pathToUrl($file->getPathname()),
            ];
        }

        return json_encode($list);
    }

    protected function _getPathParameter() {

        $path = $this->param('path', false);

        if ($path) {

            $path = trim($path);

            if (strpos($path, '../') !== false) {
                $path = false;
            }
        }

        return $path;
    }

    protected function _isFileTypeAllowed($file) {

        $allowed = trim($this->app->retrieve('finder.allowed_uploads', '*'));

        if (in_array(strtolower(pathinfo($file, PATHINFO_EXTENSION)), ['php', 'phar', 'phtml']) && !$this->helper('acl')->isSuperAdmin()) {
            return false;
        }

        if ($allowed == '*') {
            return true;
        }

        $allowed = str_replace([' ', ','], ['', '|'], preg_quote(is_array($allowed) ? implode(',', $allowed) : $allowed));

        return preg_match("/\.({$allowed})$/i", $file);
    }

}
