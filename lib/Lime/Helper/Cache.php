<?php

namespace Lime\Helper;

class Cache extends \Lime\Helper {

    public ?string $prefix = null;
    protected ?string $cachePath = null;

    protected function initialize() {
        $this->cachePath = \rtrim(\sys_get_temp_dir(),"/\\").'/';
        $this->prefix    = $this->app['app.name'];
    }

    public function setCachePath(string $path): void {
        if ($path) {
            $this->cachePath = rtrim($this->app->path($path), "/\\").'/';
        }
    }

    public function getCachePath() {
        return $this->cachePath;
    }

    public function write(string $key, mixed $value, int $duration = -1, bool $encrypt = false): void {

        $expire = ($duration==-1) ? -1:(\time() + (\is_string($duration) ? \strtotime($duration):$duration));

        $safe_var = [
            'expire' => $expire,
            'value' => \serialize($value)
        ];

        if ($encrypt) {
            $safe_var['value'] = $this->app->encode($safe_var['value'], $this->app->retrieve('sec-key'));
        }

        \file_put_contents($this->cachePath.\md5($this->prefix.'-'.$key).".cache" , \serialize($safe_var));
    }

    public function read(string $key, mixed $default = null, $decrypt = false): mixed {

        $var = @\file_get_contents($this->cachePath.\md5($this->prefix.'-'.$key).".cache");

        if (!$var) {
            return \is_callable($default) ? \call_user_func($default):$default;
        } else {

            $time = \time();
            $var  = \unserialize($var);

            if (!isset($var['expire'])) {
                return \is_callable($default) ? \call_user_func($default):$default;
            }

            if (($var['expire'] < $time) && $var['expire']!=-1) {
                $this->delete($key);
                return \is_callable($default) ? \call_user_func($default):$default;
            }

            if ($decrypt) {
                $var['value'] = $this->app->decode($var['value'], $this->app->retrieve('sec-key'));
            }

            return \unserialize($var['value']);
        }
    }

    public function delete(string $key): void {

        $file = $this->cachePath.\md5($this->prefix.'-'.$key).".cache";

        if (\file_exists($file)) {
            @unlink($file);
        }
    }

    public function clear(): void {

        $iterator = new \RecursiveDirectoryIterator($this->cachePath);

        foreach ($iterator as $file) {
            if ($file->isFile() && \substr($file, -6)==".cache") {
                @\unlink($this->cachePath.$file->getFilename());
            }
        }
    }
}
