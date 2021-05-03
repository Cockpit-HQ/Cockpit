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

        if (!$model) {
            return $this->stop(404);
        }

        $fields = $model['fields'];

        $locales = $this->helper('locales')->locales();

        if (count($locales) == 1) {
            $locales = [];
        } else {
            $locales[0]['visible'] = true;
        }

        return $this->render('content:views/collection/items.php', compact('model', 'fields', 'locales'));

    }

    public function item($model = null, $id = null) {

        if (!$model) {
            return false;
        }

        $model = $this->module('content')->model($model);

        if (!$model) {
            return $this->stop(404);
        }

        if ($id) {

        }

        $item = $this->module('content')->getDefaultModelItem($model['name']);

        $fields = $model['fields'];

        $locales = $this->helper('locales')->locales();

        if (count($locales) == 1) {
            $locales = [];
        } else {
            $locales[0]['visible'] = true;
        }

        return $this->render('content:views/collection/item.php', compact('model', 'fields', 'locales', 'item'));
    }

}