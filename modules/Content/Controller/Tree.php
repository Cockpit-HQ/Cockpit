<?php

namespace Content\Controller;

use App\Controller\App;
use ArrayObject;

class Tree extends App {

    public function items($model = null) {

        if (!$model) {
            return false;
        }

        $model = $this->module('content')->model($model);

        if (!$model || $model['type'] != 'tree') {
            return $this->stop(404);
        }

        if (!$this->isAllowed("content/{$model['name']}/read")) {
            return $this->stop(401);
        }

        $allowMoving = $this->isAllowed("content/{$model['name']}/updateorder");
        $fields = $model['fields'];
        $locales = $this->helper('locales')->locales();

        if (count($locales) == 1) {
            $locales = [];
        } else {
            $locales[0]['visible'] = true;
        }

        $this->helper('theme')->favicon(isset($model['icon']) && $model['icon'] ? $model['icon'] : 'content:assets/icons/tree.svg', $model['color'] ?? '#000');

        return $this->render('content:views/tree/items.php', compact('model', 'fields', 'locales', 'allowMoving'));
    }

    public function item($model = null, $id = null) {

        if (!$model) {
            return false;
        }

        $model = $this->module('content')->model($model);

        if (!$model || $model['type'] != 'tree') {
            return $this->stop(404);
        }

        if (!$this->isAllowed("content/{$model['name']}/read")) {
            return $this->stop(401);
        }

        $item = $this->module('content')->getDefaultModelItem($model['name']);

        if ($id) {

            $item = $this->module('content')->item($model['name'], ['_id' => $id]);

            if (!$item) {
                return false;
            }

            unset($item['_pid'], $item['_o']);

            $this->checkAndLockResource($id);

        } else {

            $item['_pid'] = null;

            if ($this->param('pid') && $this->app->dataStorage->findOne("content/collections/{$model['name']}", ['_id' => $this->param('pid')], ['_id' => 1])) {
                $item['_pid'] = $this->param('pid');
            }

            $item['_o'] = $this->app->dataStorage->count("content/collections/{$model['name']}", ['_pid' => $item['_pid']]);
        }

        $fields = $model['fields'];
        $locales = $this->helper('locales')->locales();

        if (count($locales) == 1) {
            $locales = [];
        } else {
            $locales[0]['visible'] = true;
        }

        $this->helper('theme')->favicon(isset($model['icon']) && $model['icon'] ? $model['icon'] : 'content:assets/icons/tree.svg', $model['color'] ?? '#000');

        return $this->render('content:views/tree/item.php', compact('model', 'fields', 'locales', 'item'));
    }

    public function remove($model = null) {

        $this->helper('session')->close();

        $model = $this->module('content')->model($model);
        $item = $this->param('item');

        if (!isset($item['_id']) || !$model || $model['type'] != 'tree') {
            return $this->stop(404);
        }

        if (!$this->isAllowed("content/{$model['name']}/delete")) {
            return $this->stop(401);
        }

        $this->_remove($model['name'], $item['_id']);

        return ['success' => true];
    }

    protected function _remove($model, $id) {

        $items = $this->app->dataStorage->find("content/collections/{$model}", [
            'filter' => ['_pid' => $id, '_state' => ['$gt' => -1]]
        ])->toArray();

        foreach ($items as $item) {
            $this->_remove($model, $item['_id']);
        }

        $this->app->module('content')->remove($model, ['_id' => $id]);

        return true;
    }

    public function load($model = null) {

        $this->helper('session')->close();

        $model = $this->module('content')->model($model);

        if (!$model || $model['type'] != 'tree') {
            return $this->stop(404);
        }

        if (!$this->isAllowed("content/{$model['name']}/read")) {
            return $this->stop(401);
        }

        $pId = $this->param('_pid', null);

        if (!$pId) {
            $pId = null;
        }

        $items = $this->app->dataStorage->find("content/collections/{$model['name']}", [
            'filter' => ['_pid' => $pId],
            'sort' => ['_o' => 1]
        ])->toArray();

        foreach ($items as &$item) {
            $item['children'] = [];
            $item['_children'] = $this->app->dataStorage->count("content/collections/{$model['name']}", ['_pid' => $item['_id']]);
        }

        if (count($items) && $this->param('locale')) {
            $items = $this->helper('locales')->applyLocales($items, $this->param('locale'));
        }

        return $items;
    }

    public function updateOrder($model = null) {

        $this->helper('session')->close();

        $model = $this->module('content')->model($model);

        if (!$model || $model['type'] != 'tree') {
            return $this->stop(404);
        }

        if (!$this->isAllowed("content/{$model['name']}/updateorder")) {
            return $this->stop(401);
        }

        $items = $this->param('items', null);

        if (!is_array($items)) {
            return false;
        }

        foreach ($items as $item) {

            if (!isset($item['_id'], $item['_o'])) continue;

            $itm = [
                '_id' => $item['_id'],
                '_o' => $item['_o']
            ];

            if (\array_key_exists('_pid', $item)) {
                $itm['_pid'] = $item['_pid'];
            }

            $this->app->dataStorage->save("content/collections/{$model['name']}", $itm);
        }

        return ['success' => true];
    }

}
