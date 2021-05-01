<?php

namespace Settings\Controller;

use App\Controller\App;
use ArrayObject;

class Locals extends App {

    protected function before() {

        if (!$this->isAllowed('app.locals.manage')) {
            $this->stop(401);
        }
    }

    public function index() {
        return $this->render('settings:views/locals/index.php');
    }

    public function local($id = null) {

        if (!$id) {
            return $this->stop(['error' => 'local id is missing'], 412);
        }

        $local = $this->app->dataStorage->findOne('system/locals', ['_id' => $id]);

        if (!$local) {
            return false;
        }

        $local['meta'] = new ArrayObject( $local['meta']);

        return $this->render('settings:views/locals/local.php', compact('local'));
    }

    public function create() {

        $local = [
            'i18n' => '',
            'name'  => '',
            'meta' => new ArrayObject([])
        ];

        return $this->render('settings:views/locals/local.php', compact('local'));
    }

    public function remove() {

        $local = $this->param('local');

        if (!$local || !isset($local['_id'], $local['i18n'])) {
            return $this->stop(['error' => 'local is missing'], 412);
        }

        $this->app->dataStorage->remove('system/locals', ['_id' => $local['_id']]);

        $this->app->trigger('app.locals.remove', [$local]);

        $this->cache();

        return ['success' => true];
    }

    public function save() {

        $local = $this->param('local');

        if (!$local) {
            return $this->stop(['error' => 'local data is missing'], 412);
        }

        $local['_modified'] = time();
        $isUpdate = isset($local['_id']);

        if (!$isUpdate) {
            $local['_created'] = $local['_modified'];
        }

        if (!isset($local['i18n']) || !trim($local['i18n'])) {
            return $this->stop(['error' => 'i18n required'], 412);
        }

        foreach (['i18n', 'name'] as $key) {
            $local[$key] = strip_tags(trim($local[$key]));
        }

        // unique check

        $_local = $this->app->dataStorage->findOne('system/locals', ['i18n' => $local['i18n']]);

        if ($_local && (!isset($local['_id']) || $local['_id'] != $_local['_id'])) {
            $this->app->stop(['error' => 'Local is already used!'], 412);
        }

        $this->app->trigger('app.locals.save', [&$local, $isUpdate]);
        $this->app->dataStorage->save('system/locals', $local);

        $local = $this->app->dataStorage->findOne('system/locals', ['_id' => $local['_id']]);

        $local['meta'] = new ArrayObject(is_array($local['meta']) ? $local['meta'] : []);

        $this->cache();

        return $local;
    }

    public function load() {

        \session_write_close();

        $locals = $this->app->dataStorage->find('system/locals', [
            'sort' => ['name' => 1]
        ])->toArray();

        return $locals;
    }

    protected function cache() {
        $this->helper('locals')->cache();
    }
}