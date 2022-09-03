<?php

namespace Content\Controller;

use App\Controller\App;
use ArrayObject;

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

        $this->helper('theme')->favicon(isset($model['icon']) && $model['icon'] ? $model['icon'] : 'content:assets/icons/collection.svg', $model['color'] ?? '#000');

        return $this->render('content:views/collection/items.php', compact('model', 'fields', 'locales'));

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

    public function find($model = null) {

        $this->helper('session')->close();

        if (!$model) {
            return false;
        }

        $model = $this->module('content')->model($model);

        if (!$model || !in_array($model['type'], ['collection', 'tree'])) {
            return $this->stop(404);
        }

        $options = $this->app->param('options');
        $process = $this->app->param('process', []);

        if (isset($options['filter']) && is_string($options['filter'])) {

            $filter = null;

            if (\preg_match('/^\{(.*)\}$/', $options['filter'])) {

                try {
                    $filter = json5_decode($options['filter'], true);
                } catch (\Exception $e) {}
            }

            if (!$filter) {

                $filter = null;
                $fields = $model['fields'];

                if (count($fields)) {

                    $terms  = str_getcsv(trim($options['filter']), ' ');
                    $filter = ['$or' => []];

                    foreach ($fields as $field) {

                        if (!\in_array($field['type'], ['code', 'color', 'text', 'wysiwyg'])) continue;

                        foreach ($terms as $term) {
                            $f = [];
                            $f[$field['name']] = ['$regex' => $term, '$options' => 'i'];
                            $filter['$or'][] = $f;
                        }
                    }
                }
            }

            $options['filter'] = $filter;
        }

        $items = $this->app->module('content')->items($model['name'], $options, $process);
        $count = $this->app->module('content')->count($model['name'], $options['filter'] ?? []);
        $pages = isset($options['limit']) ? ceil($count / $options['limit']) : 1;
        $page  = 1;

        if ($pages > 1 && isset($options['skip'])) {
            $page = ceil($options['skip'] / $options['limit']) + 1;
        }

        return compact('items', 'count', 'pages', 'page');
    }

    public function remove($model = null) {

        $this->helper('session')->close();

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

}
