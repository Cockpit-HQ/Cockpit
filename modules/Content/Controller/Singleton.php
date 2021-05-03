<?php

namespace Content\Controller;

use App\Controller\App;
use ArrayObject;

class Singleton extends App {


    public function item($model = null, $id = null) {

        if (!$model) {
            return false;
        }

        $model = $this->module('content')->model($model);

        if (!$model || $model['type'] != 'singleton') {
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

        return $this->render('content:views/singleton/item.php', compact('model', 'fields', 'locales', 'item'));
    }

}