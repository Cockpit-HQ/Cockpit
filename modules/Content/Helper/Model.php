<?php

namespace Content\Helper;

class Model extends \Lime\Helper {

    protected array $models;
    protected ?string $storage;

    protected function initialize() {

        $this->storage = $this->app->retrieve('content/models/storage');

        $this->models = $this->app['debug'] ? $this->cache(false) : $this->app->memory->get('content.models', function() {
            return $this->cache();
        });
    }

    public function create(string $name, array $data = []) {

        if (!trim($name)) {
            return false;
        }

        $name = preg_replace('/[^A-Za-z0-9]/', '', $name);

        if ($this->exists($name)) {
            return false;
        }

        $time = time();

        $data['name'] = $name;

        $model = array_replace_recursive([
            'name'      => $name,
            'label'     => $name,
            'info'      => '',
            'type'      => 'collection',
            'fields'     => [],
            'preview'   => [],
            'group'     => null,
            'meta'      => null,
            '_created'  => $time,
            '_modified'  => $time
        ], $data);

        if ($this->storage === 'database') {

            if (isset($model['_id'])) unset($model['_id']);

            $this->app->dataStorage->save('content/models', $model);

        } else {

            $storagepath = $this->app->path('#storage:').'/content';

            if (!$this->app->path('#storage:content')) {

                if (!$this->app->helper('fs')->mkdir($storagepath)) {
                    return false;
                }
            }

            $export = $this->app->helper('utils')->var_export($model, true);

            if (!$this->app->helper('fs')->write("#storage:content/{$name}.model.php", "<?php\n return {$export};")) {
                return false;
            }
        }

        $this->app->trigger('content.model.create', [$model]);

        $this->cache();

        return $model;
    }

    public function update(string $name, array $data) {

        if (!$this->exists($name)) {
            return false;
        }

        $data['_modified'] = time();

        if ($this->storage === 'database') {

            if (isset($data['_id'])) unset($data['_id']);

            $model  = $this->app->dataStorage->findOne('content/models', ['name' => $name]);
            $model  = array_merge($model, $data);

            $this->app->dataStorage->save('content/models', $model);

        } else {

            $metapath = $this->app->path("#storage:content/{$name}.model.php");

            if (!$metapath) {
                return false;
            }

            $model  = include($metapath);
            $model  = array_merge($model, $data);
            $export = $this->app->helper('utils')->var_export($model, true);

            if (!$this->app->helper('fs')->write($metapath, "<?php\n return {$export};")) {
                return false;
            }

            if (function_exists('opcache_invalidate')) opcache_invalidate($metapath, true);
        }

        $this->app->trigger('content.update.model', [$model]);
        $this->app->trigger("content.update.model.{$name}", [$model]);

        $this->cache();

        return $model;
    }

    public function save(string $name, array $data) {

        if (!trim($name)) {
            return false;
        }

        return $this->exists($name) ? $this->update($name, $data) : $this->create($name, $data);
    }

    public function remove(string $name) {

        $model = $this->model($name);

        if (!$model) {
            return false;
        }

        if ($this->storage === 'database') {
            $this->app->dataStorage->remove('content/models', ['name' => $name]);
        } else {
            $this->app->helper('fs')->delete("#storage:content/{$name}.model.php");
        }

        if ($model['type'] == 'singleton') {
            $this->app->dataStorage->remove('content/singletons', ['_model' => $name]);
        } elseif (in_array($model['type'], ['collection', 'tree'])) {

            $this->app->dataStorage->dropCollection("content/collections/{$name}");

            if ($model['type'] == 'collection') {
                $this->app->dataStorage->remove('content/views', ['model' => $name]);
            }
        }

        $this->app->trigger('content.remove.model', [$name, $model]);
        $this->cache();

        return true;
    }

    public function exists(string $name) {

        if ($this->storage === 'database') {
            return $this->app->dataStorage->findOne('content/models', ['name' => $name]) ?? false;
        }

        return $this->app->path("#storage:content/{$name}.model.php");
    }

    public function model(string $name) {
        return $this->models[$name] ?? null;
    }

    public function models(): array {
        return $this->models;
    }

    public function cache(bool $persistent = true): array {

        $models = [];

        if ($this->storage === 'database') {

            foreach ($this->app->dataStorage->find('content/models') as $m) {
                $models[$m['name']] = $m;
            }

        } else {

            foreach ($this->app->helper('fs')->ls('*.model.php', '#storage:content') as $path) {

                $store = include($path->getPathName());
                $models[$store['name']] = $store;
            }
        }

        ksort($models);

        if ($persistent) {
            $this->app->memory->set('content.models', $models);
        }

        $this->models = $models;

        return $models;
    }
}
