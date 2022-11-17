<?php

namespace Content\Controller;

use App\Controller\App;
use ArrayObject;

class Models extends App {

    public function create() {

        if (!$this->isAllowed('content/models/manage')) {
            return $this->stop(401);
        }

        $type = $this->param('type', 'collection');

        if (!\in_array($type, ['collection', 'tree', 'singleton'])) {
            $type = 'collection';
        }

        $model = [
            'name' => '',
            'label' => '',
            'type' => $type,
            'group' => '',
            'color' => null,
            'revisions' => false,
            'fields' => [],
            'preview' => [],
            'meta' => null
        ];

        $isUpdate = false;
        $groups = $this->getGroups();

        $this->helper('theme')->favicon('content:icon.svg');

        return $this->render('content:views/models/model.php', compact('model', 'isUpdate', 'groups'));
    }

    public function edit($name = null) {

        if (!$name) {
            return $this->stop(412);
        }

        $model = $this->module('content')->model($name);

        if (!$model) {
            return $this->stop(404);
        }

        if (!$this->isAllowed("content/models/manage") && !$this->isAllowed("content/{$model['name']}/manage")) {
            return $this->stop(401);
        }

        // legacy model update
        $model = array_merge([
            'preview' => []
        ], $model);

        $isUpdate = true;
        $groups = $this->getGroups();

        $this->helper('theme')->favicon('content:icon.svg');

        return $this->render('content:views/models/model.php', compact('model', 'isUpdate', 'groups'));
    }

    public function remove($name = null) {

        if (!$name) {
            return $this->stop(412);
        }

        $model = $this->module('content')->model($name);

        if (!$model) {
            return $this->stop(404);
        }

        if (!$this->isAllowed("content/models/manage")) {
            return $this->stop(401);
        }

        $this->module('content')->removeModel($name);

        return ['success' => true];
    }

    public function save() {

        $model = $this->param('model');
        $isUpdate = $this->param('isUpdate', false);

        if (!$model) {
            return $this->stop(['error' => 'Model data is missing'], 412);
        }

        if (!$this->isAllowed("content/models/manage") && !$this->isAllowed("content/{$model}/manage")) {
            return $this->stop(401);
        }

        if (!$isUpdate && $this->module('content')->exists($model['name'])) {
            return $this->stop(['error' => "Model {$model['name']} already exists."], 412);
        }

        $model = $this->module('content')->saveModel($model['name'], $model);

        return $model;
    }

    public function load() {

        $models = $this->module('content')->models();

        if (!$this->helper('acl')->isSuperAdmin()) {

            $acl = $this->helper('acl');

            $models = array_filter($models, function($model) use($acl) {

                if ($acl->isAllowed('content/models/manage')) {
                    return true;
                }

                return $acl->isAllowed("content/{$model['name']}/read");
            });
        }

        return array_values($models);
    }

    public function saveItem($model = null) {

        $item = $this->param('item');

        if (!$model || !$this->module('content')->exists($model)) {
            return $this->stop(['error' => 'Model unknown'], 404);
        }

        $state    = $item['_state'] ?? null;
        $model    = $this->module('content')->model($model);
        $isUpdate = isset($item['_id']) && $item['_id'];

        if ($isUpdate && !$this->isAllowed("content/{$model['name']}/update")) {
            return $this->stop(401);
        }

        if (!$isUpdate && !$this->isAllowed("content/{$model['name']}/create")) {
            return $this->stop(401);
        }

        if (!$item) {
            return $this->stop(['error' => 'Item is missing'], 412);
        }

        if (isset($item['_state']) && !$this->isAllowed("content/{$model['name']}/publish")) {
            unset($item['_state']);
        }

        if ($isUpdate && $state === 1 && ($model['revisions'] ?? false)) {

            $current = null;

            if (in_array($model['type'], ['collection', 'tree'])) {
                $current = $this->module('content')->item($model['name'], ['_id' => $item['_id']]);
            } else {
                $current = $this->module('content')->item($model['name']);
            }

            if ($current) {

                $this->app->helper('revisions')->add(
                    id: $item['_id'],
                    data: $current,
                    meta: "content/{$model['name']}",
                    by: $this->user['_id'],
                    created: $current['_modified'],
                    ref: $item
                );
            }
        }

        $item = $this->module('content')->saveItem($model['name'], $item, ['user' => $this->user]);

        return $item;
    }

    public function clone($model = null) {

        $name = str_replace(' ', '', trim($this->param('name', '')));

        if (!$name) {
            return $this->stop(['error' => 'Model name is missing'], 412);
        }

        if ($this->module('content')->exists($name)) {
            return $this->stop(['error' => "Model named <{$name}> already exists"], 412);
        }

        if (!$model || !$this->module('content')->exists($model)) {
            return $this->stop(['error' => 'Model unknown'], 404);
        }

        if (!$this->isAllowed("content/models/manage")) {
            return $this->stop(401);
        }

        $model = $this->module('content')->model($model);
        $time = time();

        $model['name'] = $name;
        $model['label'] = $model['label'] ? $model['label'].' Copy' : '';
        $model['_created'] = $time;
        $model['_modified'] = $time;

        $this->module('content')->saveModel($name, $model);

        return $model;
    }

    protected function getGroups() {

        $groups = [];

        foreach ($this->module('content')->models() as $name => $meta) {

            if ($meta['group'] && !\in_array($meta['group'], $groups)) {
                $groups[] = $meta['group'];
            }
        }

        sort($groups);

        return $groups;
    }
}
