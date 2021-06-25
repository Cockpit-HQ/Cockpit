<?php

namespace Layout\Controller;

use App\Controller\App;
use ArrayObject;

class Settings extends App {

    protected function before() {

        if (!$this->isAllowed('layout.components.manage')) {
            $this->stop(401);
        }
    }

    public function index() {
        return $this->render('layout:views/index.php');
    }

    public function component($id = null) {

        $component = [
            'name' => '',
            'meta' => [
                'icon'     => null,
                'label'    => '',
                'group'    => '',
                'fields'   => [],
                'preview'  => null,
                'children' => false,
                'opts'     => []
            ]
        ];

        if ($id) {

            $component = $this->app->dataStorage->findOne('layout/components', ['_id' => $id]);

            if (!$component) {
                return false;
            }

            $this->checkAndLockResource($id);
        }

        $component['meta'] = new ArrayObject($component['meta']);
        $component['meta']['opts'] = new ArrayObject($component['meta']['opts']);

        return $this->render('layout:views/component.php', compact('component'));
    }

    public function remove() {

        $component = $this->param('component');

        if (!$component || !isset($component['_id'], $component['name'])) {
            return $this->stop(['error' => 'component is missing'], 412);
        }

        $this->app->dataStorage->remove('layout/components', ['_id' => $component['_id']]);

        $this->app->trigger('layout.components.remove', [$component]);

        $this->cache();

        return ['success' => true];
    }

    public function save() {

        $component = $this->param('component');

        if (!$component) {
            return $this->stop(['error' => 'local data is missing'], 412);
        }

        $component['_modified'] = time();
        $isUpdate = isset($component['_id']);

        if (!$isUpdate) {
            $component['_created'] = $component['_modified'];
        }

        if (!isset($component['name']) || !trim($component['name'])) {
            return $this->stop(['error' => 'name required'], 412);
        }

        foreach (['name'] as $key) {
            $component[$key] = strip_tags(trim($component[$key]));
        }

        // unique check

        $_component = $this->app->dataStorage->findOne('layout/components', ['name' => $component['name']]);

        if ($_component && (!isset($component['_id']) || $component['_id'] != $_component['_id'])) {
            $this->app->stop(['error' => 'Component name is already used!'], 412);
        }

        $this->app->trigger('layout.components.save', [&$component, $isUpdate]);
        $this->app->dataStorage->save('layout/components', $component);

        $component = $this->app->dataStorage->findOne('layout/components', ['_id' => $component['_id']]);

        $component['meta'] = new ArrayObject(is_array($component['meta']) ? $component['meta'] : []);
        $component['meta']['opts'] = new ArrayObject(is_array($component['meta']['opts']) ? $component['meta']['opts'] : []);

        $this->cache();

        return $component;
    }

    public function load() {

        \session_write_close();

        $components = $this->app->dataStorage->find('layout/components', [
            'sort' => ['name' => 1]
        ])->toArray();

        return $components;
    }

    protected function cache() {
        $this->helper('layoutComponents')->cache();
    }
}