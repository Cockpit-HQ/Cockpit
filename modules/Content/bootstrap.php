<?php

// Register Helpers
$this->helpers['content'] = 'Content\\Helper\\Content';
$this->helpers['content.model'] = 'Content\\Helper\\Model';
$this->helpers['content.linkedfilter'] = 'Content\\Helper\\LinkedContentFilter';

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
    '_refs' => [],

    'createModel' => function(string $name, array $data = []): mixed {
        return $this->app->helper('content.model')->create($name, $data);
    },

    'updateModel' => function(string $name, array $data): mixed {
        return $this->app->helper('content.model')->update($name, $data);
    },

    'saveModel' => function(string $name, array $data): mixed {
        return $this->app->helper('content.model')->save($name, $data);
    },

    'removeModel' => function(string $name): bool {
        return $this->app->helper('content.model')->remove($name);
    },

    'models' => function(bool $extended = false): array {
        return $this->app->helper('content.model')->models();
    },

    'exists' => function(string $name): mixed {
        return $this->app->helper('content.model')->exists($name);
    },

    'model' => function(string $name): mixed {
        return $this->app->helper('content.model')->model($name);
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

            // check unique configured fields
            $uniqueCheckInfo = [];

            if (
                isset($model['meta']['unique']) &&
                $model['meta']['unique'] &&
                !$this->app->helper('content')->isContentUnique($model, $item, $model['meta']['unique'], $uniqueCheckInfo)
            ) {
                throw new \App\Exception\AppNotification("::{$uniqueCheckInfo['field']}:: must be unique");
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

        if ($this->app->module('assets')) {
            $item = $this->app->helper('asset')->updateRefs($item);
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

        $postPopulateProjection = [];

        if (isset($fields)) {

            $this->app->helper('content')->resolveLocalesInProjectionOptions($fields);

            foreach ($fields as $f => $v) {

                if (!str_starts_with($f, '..')) continue;

                $postPopulateProjection[substr($f, 2)] = $v;

                if ($v === 1 || (is_array($v) && \MongoLite\Projection::hasInclusion($v))) {
                    $fields[explode('.', substr($f, 2))[0]] = 1;
                }

                unset($fields[$f]);
            }

        }

        if ($model['type'] == 'singleton') {

            $item = $this->app->dataStorage->findOne('content/singletons', ['_model' => $modelName], $fields);

            if (!$item) {
                $item = $this->getDefaultModelItem($modelName);
            }

            $item['_model'] = $modelName;

        } elseif (in_array($model['type'], ['collection', 'tree'])) {

            $this->app->helper('content')->replaceLocaleInArrayKeys($filter, $process['locale'] ?? '');
            
            // Process linked field filters
            if (!empty($filter)) {
                $this->app->helper('content.linkedfilter')->process($filter, $model);
            }

            $collection = "content/collections/{$modelName}";
            $item = $this->app->dataStorage->findOne($collection, $filter, $fields);
        }

        if ($item && isset($process['locale'])) {
            $item = $this->app->helper('locales')->applyLocales($item, $process['locale']);
        }

        if ($item && isset($process['populate']) && $process['populate']) {

            $item = $this->populate($item, $process['populate'], 0, $process);

            if (count($postPopulateProjection)) {
                $item = \MongoLite\Projection::onDocument($item, $postPopulateProjection);
            }
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

        $postPopulateProjection = [];

        if (isset($options['fields'])) {

            $this->app->helper('content')->resolveLocalesInProjectionOptions($options['fields']);

            foreach ($options['fields'] as $f => $v) {

                if (!str_starts_with($f, '..')) continue;

                $postPopulateProjection[substr($f, 2)] = $v;

                if ($v === 1 || (is_array($v) && \MongoLite\Projection::hasInclusion($v))) {
                    $options['fields'][explode('.', substr($f, 2))[0]] = 1;
                }

                unset($options['fields'][$f]);
            }

        }

        if (isset($options['filter'])) {
            // replace {field}:locale keys with locale defined in $process
            $this->app->helper('content')->replaceLocaleInArrayKeys($options['filter'], $process['locale'] ?? '');
            // resolve linked fields conditions via @fieldname.{prop} => {mongoquery}
            $this->app->helper('content.linkedfilter')->process($options['filter'], $model);

        }

        if (isset($options['sort'])) {
            $this->app->helper('content')->replaceLocaleInArrayKeys($options['sort'], $process['locale'] ?? '');
        }

        $items = (array) $this->app->dataStorage->find($collection, $options);

        if ($process['locale'] ?? false) {
            $items = $this->app->helper('locales')->applyLocales($items, $process['locale']);
        }

        if ($process['populate'] ?? false) {

            $items = $this->populate($items, $process['populate'], 0, $process);

            if (count($postPopulateProjection)) {
                $items = \MongoLite\Projection::onDocuments($items, array_merge($options['fields'], $postPopulateProjection));
            }
        }

        return $items;
    },

    'aggregate' => function(string $modelName, array $pipeline = [], $process = []) {

        $model = $this->model($modelName);

        if (!$model) {
            throw new Exception('Try to access unknown model "' . $modelName . '"');
        }

        if (!in_array($model['type'], ['collection', 'tree'])) {
            return [];
        }

        $this->app->helper('content')->replaceLocaleInArrayKeys($pipeline, $process['locale'] ?? '');

        $collection = "content/collections/{$modelName}";

        $items = $this->app->dataStorage->aggregate($collection, $pipeline)->toArray();

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

        if (!empty($filter)) {
            $this->app->helper('content.linkedfilter')->process($filter, $model);
        }

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

        if (!empty($filter)) {
            $this->app->helper('content.linkedfilter')->process($filter, $model);
        }

        return $this->app->dataStorage->count($collection, $filter);
    },

    'tree' => function(string $modelName, $parentId = null, ?array $filter = null, ?array $fields = null, $process = []) {

        $model = $this->model($modelName);
        
        if (!$model) {
            throw new Exception('Try to access unknown model "'.$modelName.'"');
        }

        $filter = is_array($filter) ? $filter : [];
        $filter['_pid'] = $parentId;
        
        // Process linked field filters
        if (!empty($filter)) {
            $this->app->helper('content.linkedfilter')->process($filter, $model);
        }

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

                if (
                    isset($process['user']['role']) &&
                    !in_array($v['_model'], $this->app->helper('content')->allowedModels($process['user']['role']))
                ) {
                    $array[$k] = null;
                    continue;
                }

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
                if (isset($v['_id']) && $v['_id'] == $refId) {

                    $data = ($value && isset($v['_data'])) ? $v['_data'] : null;
                    $items[$k] = $value;

                    if ($data) {
                        $items[$k]['_data'] = $data;
                    }
                }
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

            if (!in_array($meta['type'], ['collection', 'tree'])) continue;

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
