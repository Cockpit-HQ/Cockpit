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
            $rootUrl = $this->app->pathToUrl(APP_DIR);

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
}
