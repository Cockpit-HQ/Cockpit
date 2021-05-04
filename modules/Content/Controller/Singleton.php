<?php

namespace Content\Controller;

use App\Controller\App;
use ArrayObject;

class Singleton extends App {


    public function item($model = null) {

        if (!$model) {
            return false;
        }

        $model = $this->module('content')->model($model);

        if (!$model || $model['type'] != 'singleton') {
            return $this->stop(404);
        }

        $item = $this->module('content')->item($model['name']);

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