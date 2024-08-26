<?php

namespace Content\Controller;

use App\Controller\App;
use ArrayObject;
use MongoHybrid\SQLToMongoQuery;

class Collection extends App {


    public function items($model = null) {

        if (!$model) {
            return false;
        }

        $model = $this->module('content')->model($model);

        if (!$model || $model['type'] != 'collection') {
            return $this->stop(404);
        }

        if (!$this->isAllowed("content/{$model['name']}/read")) {
            return $this->stop(401);
        }

        $fields = $model['fields'];

        $locales = $this->helper('locales')->locales();

        if (count($locales) == 1) {
            $locales = [];
        } else {
            $locales[0]['visible'] = true;
        }

        // get all model views
        $_views = $this->app->dataStorage->find('content/views', [
            'filter' => [
                'model' => $model['name'],
                '$or' => [
                    ['_cby' => $this->user['_id']],
                    ['private' => false]
                ]
            ],
            'sort' => ['name' => 1]
        ]);

        $views = new ArrayObject([]);

        // index by _id
        foreach ($_views as $view) {
            $views[$view['_id']] = $view;
        }

        $this->helper('theme')->favicon(isset($model['icon']) && $model['icon'] ? $model['icon'] : 'content:assets/icons/collection.svg', $model['color'] ?? '#000');

        return $this->render('content:views/collection/items.php', compact('model', 'fields', 'locales', 'views'));

    }

    public function item($model = null, $id = null) {

        if (!$model) {
            return false;
        }

        $model = $this->module('content')->model($model);

        if (!$model || $model['type'] != 'collection') {
            return $this->stop(404);
        }

        if (!$this->isAllowed("content/{$model['name']}/read")) {
            return $this->stop(401);
        }

        $item = $this->module('content')->getDefaultModelItem($model['name']);

        if ($id) {

            $current = $this->module('content')->item($model['name'], ['_id' => $id]);

            if (!$current) {
                return false;
            }

            $item = array_merge($item, $current);

            $this->checkAndLockResource($id);
        }

        $fields = $model['fields'];
        $locales = $this->helper('locales')->locales();

        if (count($locales) == 1) {
            $locales = [];
        } else {
            $locales[0]['visible'] = true;
        }

        $this->helper('theme')->favicon(isset($model['icon']) && $model['icon'] ? $model['icon'] : 'content:assets/icons/collection.svg', $model['color'] ?? '#000');

        return $this->render('content:views/collection/item.php', compact('model', 'fields', 'locales', 'item'));
    }

    public function clone($model = null, $id = null) {

        if (!$model || !$id) {
            return false;
        }

        $model = $this->module('content')->model($model);

        if (!$model || $model['type'] != 'collection') {
            return $this->stop(404);
        }

        if (!$this->isAllowed("content/{$model['name']}/create")) {
            return $this->stop(401);
        }

        $item = $this->module('content')->item($model['name'], ['_id' => $id]);

        if (!$item) {
            return false;
        }

        // clean meta data
        unset($item['_id'], $item['_created'], $item['_modified'], $item['_cby'], $item['_mby']);

        $item['_state'] = 0;

        $fields = $model['fields'];
        $locales = $this->helper('locales')->locales();

        if (count($locales) == 1) {
            $locales = [];
        } else {
            $locales[0]['visible'] = true;
        }

        return $this->render('content:views/collection/item.php', compact('model', 'fields', 'locales', 'item'));
    }

    public function find($model = null) {

        $this->helper('session')->close();
        $this->hasValidCsrfToken(true);

        if (!$model) {
            return false;
        }

        $model = $this->module('content')->model($model);

        if (!$model || !in_array($model['type'], ['collection', 'tree'])) {
            return $this->stop(404);
        }

        if (!$this->isAllowed("content/{$model['name']}/read")) {
            return $this->stop(401);
        }

        $options = $this->app->param('options');
        $process = $this->app->param('process', []);
        $state = $this->app->param('state', null);

        $process['user'] = $this->user;

        if (isset($options['filter'])) {

            if (is_string($options['filter']) || !isset($options['filter'][0])) {
                $options['filter'] = [$options['filter']];
            }

            $filter = [];

            foreach ($options['filter'] as $f) {

                $_filter = null;

                if (is_string($f)) {

                    if ($f && $f[0] === ':') {
                        $_filter = SQLToMongoQuery::translate(substr($f, 1));
                    } elseif (\preg_match('/^\{(.*)\}$/', $f)) {

                        try {
                            $_filter = json5_decode($f, true);
                        } catch (\Exception $e) {}
                    }

                    if (!$_filter) {

                        $_filter = null;
                        $fields = $model['fields'];

                        if (count($fields)) {

                            $terms  = str_getcsv(trim($f), ' ');
                            $_filter = ['$or' => []];

                            foreach ($fields as $field) {

                                if (!\in_array($field['type'], ['code', 'color', 'text', 'wysiwyg', 'select'])) continue;

                                if ($field['type'] == 'select' && ($field['opts']['multiple'] ?? false)) {
                                    continue;
                                }

                                foreach ($terms as $term) {
                                    $_f = [];
                                    $_f[$field['name']] = ['$regex' => $term, '$options' => 'i'];
                                    $_filter['$or'][] = $_f;
                                }
                            }
                        }
                    }

                } else {
                    $_filter = $f;
                }

                if ($_filter) $filter[] = $_filter;
            }

            $options['filter'] = count($filter) ? ['$and' => $filter] : null;
        }

        if (!is_null($state)) {
            if (!isset($options['filter'])) $options['filter'] = [];
            $options['filter']['_state'] = intval($state);
        }

        try {
            $items = $this->app->module('content')->items($model['name'], $options, $process);
            $count = $this->app->module('content')->count($model['name'], $options['filter'] ?? []);
            $pages = isset($options['limit']) ? ceil($count / $options['limit']) : 1;
            $page  = 1;

            if ($pages > 1 && isset($options['skip'])) {
                $page = ceil($options['skip'] / $options['limit']) + 1;
            }
        } catch (\Exception $e) {
            $items = [];
            $count = 0;
            $pages = 1;
            $page  = 1;
        }

        return compact('items', 'count', 'pages', 'page');
    }

    public function remove($model = null) {

        $this->helper('session')->close();
        $this->hasValidCsrfToken(true);

        $model = $this->module('content')->model($model);
        $ids = $this->param('ids');

        if (!$model || $model['type'] != 'collection' || !is_array($ids)) {
            return $this->stop(404);
        }

        if (!$ids) {
            return $this->stop(['error' => 'Item ids to delete are missing'], 412);
        }

        if (!$this->isAllowed("content/{$model['name']}/delete")) {
            return $this->stop(401);
        }

        $this->app->module('content')->remove($model['name'], ['_id' => ['$in' => $ids]]);

        return ['success' => true];
    }

    public function updateState($model = null) {

        $this->helper('session')->close();
        $this->hasValidCsrfToken(true);

        $model = $this->module('content')->model($model);
        $ids = $this->param('ids');
        $state = $this->param('state', null);

        if (!$model || $model['type'] != 'collection' || !is_array($ids) || is_null($state)) {
            return $this->stop(404);
        }

        if (!$ids) {
            return $this->stop(['error' => 'Item ids are missing'], 412);
        }

        if (!$this->isAllowed("content/{$model['name']}/publish")) {
            return $this->stop(401);
        }

        $data = [
            '_state' => intval($state),
            '_mby' => $this->user['_id'],
            '_modified' => time(),
        ];

        $this->app->dataStorage->update("content/collections/{$model['name']}", ['_id' => ['$in' => $ids]], $data);

        return ['success' => true];
    }

    public function batchUpdate($model = null) {

        $this->helper('session')->close();
        $this->hasValidCsrfToken(true);

        $model = $this->module('content')->model($model);
        $data = $this->param('data');
        $filter = $this->param('filter');

        if (!$model || $model['type'] != 'collection' || !$data) {
            return $this->stop(404);
        }

        if (!$this->isAllowed("content/{$model['name']}/update")) {
            return $this->stop(401);
        }

        $keys = array_keys($data);

        foreach ($keys as $key) {
            if ($key[0] === '_') unset($data[$key]);
        }

        $data['_mby'] = $this->user['_id'];
        $data['_modified'] = time();

        $this->app->dataStorage->update("content/collections/{$model['name']}", $filter, $data);

        return ['success' => true];
    }

    public function saveView() {

        $this->helper('session')->close();
        $this->hasValidCsrfToken(true);

        $view = $this->param('view');

        if (!$view || !isset($view['model']) || !isset($view['name'])) {
            return $this->stop(404);
        }

        $model = $this->module('content')->model($view['model']);

        if (!$model || $model['type'] !== 'collection') {
            return $this->stop(404);
        }

        if (!$this->isAllowed("content/{$model['name']}/read")) {
            return $this->stop(401);
        }

        $view['_mby'] = $this->user['_id'];

        if (!isset($view['_id'])) {
            $view['_cby'] = $view['_mby'];
        }

        $this->app->dataStorage->save('content/views', $view);

        return ['success' => true, 'view' => $view];
    }

    public function removeView() {

        $this->helper('session')->close();
        $this->hasValidCsrfToken(true);

        $view = $this->param('view');

        if (!$view || !isset($view['_id'])) {
            return $this->stop(404);
        }

        $view = $this->app->dataStorage->findOne('content/views', ['_id' => $view['_id']]);

        if (!$view) {
            return $this->stop(404);
        }

        if (!$this->helper('acl')->isSuperAdmin() && $view['_cby'] != $this->user['_id']) {
            return $this->stop(401);
        }

        $this->app->dataStorage->remove('content/views', ['_id' => $view['_id']]);

        return ['success' => true];
    }

}
