<?php

namespace System\Helper;

use ArrayObject, DirectoryIterator;

class Spaces extends \Lime\Helper {

    protected $spacesFolder = '#app:.spaces';

    public function isMaster() {
        return $this->app->path('#app:') === $this->app->path('#root:');
    }

    public function spaces() {

        $folder = $this->app->path($this->spacesFolder);
        $spaces = [];

        if ($folder) {

            $dir = new DirectoryIterator($folder);
            $rootUrl = rtrim($this->app->routeUrl('/'), '/');

            foreach ($dir as $f) {

                if (!$f->isDir() || $f->isDot()) continue;

                $name = $f->getFilename();

                $spaces[] = [
                    'name' => $name,
                    'url' => "{$rootUrl}/:{$name}"
                ];
            }
        }

        return $spaces;
    }

    public function create(string $name, array $options = []) {

        $options = array_merge([
            'user' => 'admin',
            'password' => 'admin',
            'email' => 'admin@admin.com',
        ], $options);

        $fs = $this->app->helper('fs');
        $name = $this->app->helper('utils')->sluggify(trim($name));

        if ($this->app->path("#app:.spaces/{$name}")) {
            return false;
        }

        // create env folders
        $fs->mkdir("#app:.spaces/{$name}/config");
        $fs->mkdir("#app:.spaces/{$name}/storage/cache");
        $fs->mkdir("#app:.spaces/{$name}/storage/data");
        $fs->mkdir("#app:.spaces/{$name}/storage/tmp");
        $fs->mkdir("#app:.spaces/{$name}/storage/uploads");

        $path = $this->app->path("#app:.spaces/{$name}");
        $created = time();
        $instance = \Cockpit::instance($path);

        $user = [
            'active' => true,
            'user' => $options['user'],
            'name' => 'Admin',
            'email' => $options['email'],
            'password' => $instance->hash($options['password']),
            'i18n' => 'en',
            'role' => $options['user'],
            'theme' => 'auto',
            '_modified' => $created,
            '_created' => $created
        ];

        $instance->dataStorage->save('system/users', $user);

        return [
            'name' => $name,
            'url' => rtrim($this->app->routeUrl('/'), '/')."/:{$name}"
        ];
    }
}
