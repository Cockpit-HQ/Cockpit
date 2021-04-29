<?php

// Register Helpers
$this->helpers['collections'] = 'Collections\\Helper\\Collections';

// load admin related code
$this->on('app.admin.init', function() {
    include(__DIR__.'/admin.php');
});

// collections api
$this->module('collections')->extend([

    'createCollection' => function(string $name, array $data = []): mixed {

        if (!trim($name)) {
            return false;
        }

        $storagepath = $this->app->path('#storage:').'/collections';

        if (!$this->app->path('#storage:collections')) {

            if (!$this->app->helper('fs')->mkdir($storagepath)) {
                return false;
            }
        }

        if ($this->exists($name)) {
            return false;
        }

        $time = time();

        $collection = array_replace_recursive([
            'name'      => $name,
            'label'     => $name,
            'info'      => '',
            'fields'    => [],
            'group'     => null,
            'sortable'  => false,
            '_created'  => $time,
            '_modified' => $time
        ], $data);

        $export = $this->app->helper('utils')->var_export($collection, true);

        if (!$this->app->helper('fs')->write("#storage:collections/{$name}.collection.php", "<?php\n return {$export};")) {
            return false;
        }

        $this->app->trigger('collections.collection.create', [$collection]);

        return $collection;
    },

    'updateCollection' => function(string $name, array $data): mixed {

        if (!$this->exists($name)) {
            return false;
        }

        $metapath = $this->app->path("#storage:collections/{$name}.collection.php");

        if (!$metapath) {
            return false;
        }

        $data['_modified'] = time();

        $collection  = include($metapath);
        $collection  = array_merge($collection, $data);
        $export      = $this->app->helper('utils')->var_export($collection, true);

        if (!$this->app->helper('fs')->write($metapath, "<?php\n return {$export};")) {
            return false;
        }

        $this->app->trigger('collections.update.collection', [$collection]);
        $this->app->trigger("collections.update.collection.{$name}", [$collection]);

        if (function_exists('opcache_reset')) opcache_reset();

        return $collection;
    },

    'saveCollection' => function(string $name, array $data): mixed {

        if (!trim($name)) {
            return false;
        }

        return $this->exists($name) ? $this->updateCollection($name, $data) : $this->createCollection($name, $data);
    },

    'removeCollection' => function(string $name): bool {

        if (!$this->exists($name)) {
            return false;
        }

        $this->app->helper('fs')->delete("#storage:collections/{$name}.collection.php");
        $this->app->dataStorage->dropCollection("collections/{$name}");

        $this->app->trigger('collections.remove.collection', [$name]);
        $this->app->trigger("collections.remove.collection.{$name}", [$name]);

        return true;
    },

    'collections' => function(bool $extended = false): array {

        $stores = [];

        foreach ($this->app->helper('fs')->ls('*.collection.php', '#storage:collections') as $path) {

            $store = include($path->getPathName());

            if ($extended) {
                $store['_entriesCount'] = $this->count($store['name']);
            }

            $stores[$store['name']] = $store;
        }

        ksort($stores);

        return $stores;
    },

    'exists' => function(string $name): ?string {
        return $this->app->path("#storage:collections/{$name}.collection.php");
    },

    'collection' => function(string $name): mixed {

        static $collections; // cache

        if (is_null($collections)) {
            $collections = [];
        }

        if (!isset($collections[$name])) {

            $collections[$name] = false;

            if ($path = $this->exists($name)) {
                $collections[$name] = include($path);
            }
        }

        return $collections[$name];
    },

    'getDefaultItem' => function(string $collection): ArrayObject {

        $item = [];
        $collection = $this->collection($collection);

        if (!$collection) {
            return $item;
        }

        $fields = $collection['fields'];

        foreach ($fields as $field) {
            $item[$field['name']] =  $field['opts']['default'] ?? null;
        }

        return new ArrayObject($item);
    }

]);