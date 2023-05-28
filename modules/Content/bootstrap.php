<?php

// Register Helpers
$this->helpers['content'] = 'Content\\Helper\\Content';

// load admin related code
$this->on('app.admin.init', function() {
    include(__DIR__.'/admin.php');
});

// load cli related code
$this->on('app.cli.init', function($cli) {
    $app = $this;
    include(__DIR__.'/cli.php');
});

// load api request related code
$this->on('app.api.request', function() {
    include(__DIR__.'/api.php');
});

// content api
$this->module('content')->extend([

    // memoize data
    '_models' => [],
    '_refs' => [],

    'createModel' => function(string $name, array $data = []): mixed {

        if (!trim($name)) {
            return false;
        }

        $storagepath = $this->app->path('#storage:').'/content';

        if (!$this->app->path('#storage:content')) {

            if (!$this->app->helper('fs')->mkdir($storagepath)) {
                return false;
            }
        }

        if ($this->exists($name)) {
            return false;
        }

        $time = time();

        $model = array_replace_recursive([
            'name'      => $name,
            'label'     => $name,
            'info'      => '',
            'type'      => 'collection',
            'fields'    => [],
            'preview'   => [],
            'group'     => null,
            'meta'      => null,
            '_created'  => $time,
            '_modified' => $time
        ], $data);

        $export = $this->app->helper('utils')->var_export($model, true);

        if (!$this->app->helper('fs')->write("#storage:content/{$name}.model.php", "<?php\n return {$export};")) {
            return false;
        }

        $this->app->trigger('content.model.create', [$model]);

        return $model;
    },

    'updateModel' => function(string $name, array $data): mixed {

        if (!$this->exists($name)) {
            return false;
        }

        $metapath = $this->app->path("#storage:content/{$name}.model.php");

        if (!$metapath) {
            return false;
        }

        $data['_modified'] = time();

        $model  = include($metapath);
        $model  = array_merge($model, $data);
        $export = $this->app->helper('utils')->var_export($model, true);

        if (!$this->app->helper('fs')->write($metapath, "<?php\n return {$export};")) {
            return false;
        }

        $this->app->trigger('content.update.model', [$model]);
        $this->app->trigger("content.update.model.{$name}", [$model]);

        if (function_exists('opcache_invalidate')) opcache_invalidate($metapath, true);

        return $model;
    },

    'saveModel' => function(string $name, array $data): mixed {

        if (!trim($name)) {
            return false;
        }

        return $this->exists($name) ? $this->updateModel($name, $data) : $this->createModel($name, $data);
    },

    'removeModel' => function(string $name): bool {

        $model = $this->model($name);

        if (!$model) {
            return false;
        }

        $this->app->helper('fs')->delete("#storage:content/{$name}.model.php");

        if ($model['type'] == 'singleton') {
            $this->app->dataStorage->remove('content/singletons', ['_model' => $name]);
        } elseif (in_array($model['type'], ['collection', 'tree'])) {
            $this->app->dataStorage->dropCollection("content/collections/{$name}");
        }

        $this->app->trigger('content.remove.model', [$name, $model]);

        return true;
    },

    'models' => function(bool $extended = false): array {

        $models = [];

        foreach ($this->app->helper('fs')->ls('*.model.php', '#storage:content') as $path) {

            $store = include($path->getPathName());

            if ($extended) {
                $store['_entriesCount'] = $this->count($store['name']);
            }

            $models[$store['name']] = $store;
        }

        ksort($models);

        return $models;
    },

    'exists' => function(string $name): ?string {
        return $this->app->path("#storage:content/{$name}.model.php");
    },

    'model' => function(string $name): mixed {

        if (!isset($this->props['_models'][$name])) {

            $this->props['_models'][$name] = false;

            if ($path = $this->exists($name)) {
                $this->props['_models'][$name] = include($path);
            }
        }

        return $this->props['_models'][$name];
    },

    'getDefaultModelItem' => function(string $model): array {

        $item = [];
        $model = $this->model($model);

        if (!$model) {
            return $item;
        }

        $fields = $model['fields'];
        $locales = $this->app->helper('locales')->locales();

        foreach ($fields as $field) {

            $name = $field['name'];
            $default = $field['opts']['default'] ?? null;
            $multiple = $field['multiple'] ?? false;
            $i18n = $field['i18n'] ?? false;

            $item[$name] = $multiple ? ($default ?? []) : ($default ?? null);

            if ($i18n) {

                foreach ($locales as $locale) {
                    if ($locale['i18n'] == 'default') continue;
                    $localeName = "{$name}_{$locale['i18n']}";
                    $locDefault = $field['opts']["default_{$locale['i18n']}"] ?? null;
                    $item[$localeName] = $multiple ? ($locDefault ?? []) : ($locDefault ?? null);
                }
            }
        }

        return $item;
    },

    'saveItem' => function(string $modelName, array $item, array $context = []): ?array {

        $model = $this->model($modelName);
        $context = array_merge([
            'user' => null
        ], $context);

        if (!$model) {
            throw new Exception('Try to access unknown model "'.$modelName.'"');
        }

        $time = time();
        $default = $this->getDefaultModelItem($modelName);
        $keys = array_keys($default);
        $isUpdate = false;

        $collection = null;

        if (isset($item['_state']) && !is_numeric($item['_state'])) {
            unset($item['_state']);
        }

        if ($model['type'] == 'singleton') {

            $collection = 'content/singletons';
            $current = $this->app->dataStorage->findOne('content/singletons', ['_model' => $modelName]);

            if (!$current) {
                $current = $default;
                $current['_model'] = $modelName;
            } else {
                $isUpdate = true;
            }

            $item = array_merge($current, $item);

        } elseif (in_array($model['type'], ['collection', 'tree'])) {

            $collection = "content/collections/{$modelName}";

            if (isset($item['_id'])) {
                $isUpdate = true;
            } else {
                $item = array_merge($default, $item);
            }
        }

        $item['_modified'] = $time;
        $item['_mby'] = $context['user']['_id'] ?? null;

        if (!$isUpdate) {
            $item['_created'] = $time;
            $item['_state'] = $item['_state'] ?? 0;
            $item['_cby'] = $context['user']['_id'] ?? null;
        }

        if (!$collection) {
            return null;
        }

        $this->app->trigger('content.item.save.before', [$modelName, &$item, $isUpdate, $collection]);
        $this->app->trigger("content.item.save.before.{$modelName}", [&$item, $isUpdate, $collection]);

        $this->app->dataStorage->save($collection, $item);

        $this->app->trigger('content.item.save', [$modelName, $item, $isUpdate, $collection]);
        $this->app->trigger("content.item.save.{$modelName}", [$item, $isUpdate, $collection]);

        return $item;
    },

    'item' => function(string $modelName, array $filter = [], ?array $fields = null, $process = []) {

        $model = $this->model($modelName);

        if (!$model) {
            throw new Exception('Try to access unknown model "'.$modelName.'"');
        }

        if ($model['type'] == 'singleton') {

            $item = $this->app->dataStorage->findOne('content/singletons', ['_model' => $modelName], $fields);

            if (!$item) {
                $item = $this->getDefaultModelItem($modelName);
            }

            $item['_model'] = $modelName;

        } elseif (in_array($model['type'], ['collection', 'tree'])) {

            $collection = "content/collections/{$modelName}";
            $item = $this->app->dataStorage->findOne($collection, $filter, $fields);
        }

        if (isset($process['locale'])) {
            $item = $this->app->helper('locales')->applyLocales($item, $process['locale']);
        }

        if (isset($process['populate']) && $process['populate']) {
            $item = $this->populate($item, $process['populate'], 0, $process);
        }

        return $item;
    },

    'items' => function(string $modelName, array $options = [], $process = []): array {

        $model = $this->model($modelName);

        if (!$model) {
            throw new Exception('Try to access unknown model "'.$modelName.'"');
        }

        if (!in_array($model['type'], ['collection', 'tree'])) {
            return [];
        }

        $collection = "content/collections/{$modelName}";

        $items = (array) $this->app->dataStorage->find($collection, $options);

        if ($process['locale'] ?? false) {
            $items = $this->app->helper('locales')->applyLocales($items, $process['locale']);
        }

        if ($process['populate'] ?? false) {
            $items = $this->populate($items, $process['populate'], 0, $process);
        }

        return $items;
    },

    'remove' => function(string $modelName, mixed $filter = []) {

        $model = $this->model($modelName);

        if (!$model) {
            throw new Exception('Try to access unknown model "'.$modelName.'"');
        }

        if ($model['type'] == 'singleton') {
            return false;
        }

        $collection = "content/collections/{$modelName}";

        $this->app->trigger('content.remove.before', [$modelName, &$filter, $collection]);

        $result = $this->app->dataStorage->remove($collection, $filter);

        return $result;
    },

    'count' => function(string $modelName, mixed $filter = []): int {

        $model = $this->model($modelName);

        if (!$model) {
            throw new Exception('Try to access unknown model "'.$modelName.'"');
        }

        if ($model['type'] == 'singleton') {
            return 1;
        }

        if (!in_array($model['type'], ['collection', 'tree'])) {
            return 1;
        }

        $collection = "content/collections/{$modelName}";

        return $this->app->dataStorage->count($collection, $filter);

    },

    'tree' => function(string $modelName, $parentId = null, ?array $filter = null, ?array $fields = null, $process = []) {

        $filter = is_array($filter) ? $filter : [];
        $filter['_pid'] = $parentId;

        $items = $this->app->dataStorage->find("content/collections/{$modelName}", [
            'filter' => $filter,
            'fields' => $fields,
            'sort' => ['_o' => 1]
        ])->toArray();

        foreach ($items as &$item) {
            $item['_children'] = $this->tree($modelName, $item['_id'], $filter, $fields);
        }

        if (isset($process['locale'])) {
            $items = $this->app->helper('locales')->applyLocales($items, $process['locale']);
        }

        if (isset($process['populate']) && $process['populate']) {
            $items = $this->populate($items, $process['populate'], 0, $process);
        }

        return $items;
    },

    'populate' => function(array $array, $maxlevel = -1, $level = 0, $process = []) {

        if (!is_array($array)) {
            return $array;
        }

        if (is_numeric($maxlevel) && $maxlevel > -1 && $level > ($maxlevel+1)) {
            return $array;
        }

        foreach ($array as $k => $v) {

            if (!is_array($v)) {
                continue;
            }

            if (is_array($array[$k])) {
                $array[$k] = $this->populate($array[$k], $maxlevel, ($level + 1), $process);
            }

            if (isset($v['_id'], $v['_model'])) {

                $model = $v['_model'];
                $array[$k] = $this->_resolveContentRef($v['_model'], (string)$v['_id'], $process);

                if ($array[$k]) {
                    $array[$k] = $this->populate($array[$k], $maxlevel, ($level + 1), $process);
                    $array[$k]['_model'] = $model;
                }
            }
        }

        return $array;
    },

    '_resolveContentRef' => function ($model, $_id, $process = []) {

        if (!isset($this->props['_refs'][$model])) {
            $this->props['_refs'][$model] = [];
        }

        if (!isset($this->props['_refs'][$model][$_id])) {

            // prevent infinite loop (a -> b -> a -> b -> ...) + respect initial maxlevel
            if (isset($process['populate']) && $process['populate'] > 0) {
                $process['populate'] -= 1;
            }

            $this->props['_refs'][$model][$_id] = $this->item($model, ['_id' => $_id], null, $process);

            if (is_null($this->props['_refs'][$model][$_id])) {
                $this->props['_refs'][$model][$_id] = false;
            }
        }

        return $this->props['_refs'][$model][$_id] ?? null;
    },

    'updateRefs' => function(string $refId, mixed $value = null) {

        $update = function(&$items) use($value, $refId, &$update) {

            if (!is_array($items)) return $items;

            foreach ($items as $k => &$v) {
                if (!is_array($v)) continue;
                if (is_array($items[$k])) $items[$k] = $update($items[$k]);
                if (isset($v['_id']) && $v['_id'] == $refId) $items[$k] = $value;
            }
            return $items;
        };

        // update singletons
        $items = $this->app->dataStorage->findTerm('content/singletons', $refId)->toArray();
        $items = count($items) ? $update($items) : [];

        foreach ($items as $item) $this->app->dataStorage->save('content/singletons', $item);

        // update collections
        $models = $this->models();

        foreach ($models as $name => $meta) {

            if ($meta['type'] !== 'collection') continue;

            $collection = "content/collections/{$name}";
            $items = $this->app->dataStorage->findTerm($collection, $refId)->toArray();

            if (!count($items)) continue;
            $items = $update($items);
            foreach ($items as $item) $this->app->dataStorage->save($collection, $item);
        }
    }

]);

// update assets references on asset remove
$this->on('assets.asset.remove', function(array $asset) {

    if ($this->helper('async')->possible()) {
        $this->helper('async')->exec('Cockpit()->module("content")->updateRefs($asset["_id"], null);', compact('asset'));
    } else {
        $this->module('content')->updateRefs($asset['_id'], null);
    }
});

// update assets references on asset update
$this->on('assets.asset.update', function(array $asset) {

    if ($this->helper('async')->possible()) {
        $this->helper('async')->exec('Cockpit()->module("content")->updateRefs($asset["_id"], $asset);', compact('asset'));
    } else {
        $this->module('content')->updateRefs($asset['_id'], $asset);
    }
});
