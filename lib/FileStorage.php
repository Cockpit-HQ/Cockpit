<?php

use League\Flysystem\Filesystem;
use League\Flysystem\MountManager;

class FileStorage {

    protected array $config = [];
    protected array $storages = [];
    protected MountManager $manager;

    public function __construct(array $config = []) {

        $this->manager = new MountManager();

        foreach ($config as $name => $_config) {
            $this->addStorage($name, $_config);
        }
    }

    public function addStorage(string $name, array $config): self {

        if (isset($config['url'])) {
            $config['url'] = rtrim($config['url'], '/');
        }

        $this->config[$name] = $config;

        if (isset($config['mount']) && $config['mount']) {
            $this->initStorage($name);
        }

        return $this;
    }

    public function use(string $name): ?Filesystem {

        if (!isset($this->storages[$name]) && isset($this->config[$name])) {
            $this->initStorage($name);
        }

        return $this->storages[$name] ?? null;
    }

    public function getURL(string $file, bool $checkExist = true): ?string {

        $url = null;

        list($prefix, $path) = explode('://', $file, 2);

        if (isset($this->config[$prefix]['url'])) {

            if (!$path) {
                $url = $this->config[$prefix]['url'];
            } elseif (!$checkExist || ($checkExist && $this->manager->fileExists($file))) {
                $url = $this->config[$prefix]['url'].'/'.ltrim($path, '/');
            }
        }

        return $url;
    }

    protected function initStorage(string $name): Filesystem  {

        static $mountMethod;

        if (!$mountMethod) {
            $mountMethod = new \ReflectionMethod('League\Flysystem\MountManager', 'mountFilesystem');
            $mountMethod->setAccessible(true);
        }

        $config = $this->config[$name];
        $adapter = new \ReflectionClass($config['adapter']);
        $this->storages[$name] = new Filesystem(
            $adapter->newInstanceArgs($config['args'] ?: []),
            ['visibility' => $config['visibility'] ?? 'public']
        );

        if (isset($config['mount']) && $config['mount']) {
            $mountMethod->invokeArgs($this->manager, [$name, $this->storages[$name]]);
        }

        return $this->storages[$name];
    }

    public function __call($name, $args) {

        return call_user_func_array([$this->manager, $name], $args);
    }
}
