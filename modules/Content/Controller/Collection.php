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

        $fields = $model['fields'];

        $locales = $this->helper('locales')->locales();

        if (count($locales) == 1) {
            $locales = [];
        } else {
            $locales[0]['visible'] = true;
        }

        $this->helper('theme')->favicon('content:assets/icons/collection.svg', $model['color'] ?? '#000');

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

        $item = $this->module('content')->getDefaultModelItem($model['name']);

        if ($id) {

            $item = $this->module('content')->item($model['name'], ['_id' => $id]);

            if (!$id) {
                return false;
            }
        }

        $fields = $model['fields'];

        $locales = $this->helper('locales')->locales();

        if (count($locales) == 1) {
            $locales = [];
        } else {
            $locales[0]['visible'] = true;
        }

        $this->helper('theme')->favicon('content:assets/icons/collection.svg', $model['color'] ?? '#000');

        return $this->render('content:views/collection/item.php', compact('model', 'fields', 'locales', 'item'));
    }

    public function find($model = null) {

        \session_write_close();

        if (!$model) {
            return false;
        }

        $model = $this->module('content')->model($model);

        if (!$model || $model['type'] != 'collection') {
            return $this->stop(404);
        }

        $options = $this->app->param('options');

        if (isset($options['filter']) && is_string($options['filter'])) {

            $filter = null;

            if (\preg_match('/^\{(.*)\}$/', $options['filter'])) {

                try {
                    $filter = json5_decode($options['filter'], true);
                } catch (\Exception $e) {}
            }

            if (!$filter) {
                //$filter = $this->_filter($options['filter'], $collection, $options['lang'] ?? null);
            }

            $options['filter'] = $filter;
        }

        $items = $this->app->module('content')->items($model['name'], $options);

        $count = $this->app->module('content')->count($model['name'], isset($options['filter']) ? $options['filter'] : []);
        $pages = isset($options['limit']) ? ceil($count / $options['limit']) : 1;
        $page  = 1;

        if ($pages > 1 && isset($options['skip'])) {
            $page = ceil($options['skip'] / $options['limit']) + 1;
        }

        return compact('items', 'count', 'pages', 'page');
    }

    public function remove($model = null) {

        \session_write_close();

        $model = $this->module('content')->model($model);
        $ids = $this->param('ids');

        if (!$model || $model['type'] != 'collection' || !is_array($ids)) {
            return $this->stop(404);
        }

        $this->app->module('content')->remove($model['name'], ['_id' => ['$in' => $ids]]);

        return ['success' => true];
    }

}