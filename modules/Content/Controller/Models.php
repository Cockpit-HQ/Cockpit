<?php

namespace Content\Controller;

use App\Controller\App;
use ArrayObject;

class Models extends App {

    public function create() {

        $model = [
            'name' => '',
            'label' => '',
            'type' => 'collection',
            'group' => '',
            'color' => null,
            'fields' => []
        ];

        $isUpdate = false;

        return $this->render('content:views/models/model.php', compact('model', 'isUpdate'));
    }

    public function edit($name = null) {

        if (!$name) {
            return $this->stop(412);
        }

        $model = $this->module('content')->model($name);

        if (!$model) {
            return $this->stop(404);
        }

        $isUpdate = true;

        return $this->render('content:views/models/model.php', compact('model', 'isUpdate'));
    }

    public function remove($name = null) {

        if (!$name) {
            return $this->stop(412);
        }

        $model = $this->module('content')->model($name);

        if (!$model) {
            return $this->stop(404);
        }

        $this->module('content')->removeModel($name);

        return ['success' => true];
    }

    public function save() {

        $model = $this->param('model');

        if (!$model) {
            return $this->stop(['error' => 'model data is missing'], 412);
        }

        $model = $this->module('content')->saveModel($model['name'], $model);

        return $model;
    }

    public function load() {

        $models = array_values($this->module('content')->models());

        return $models;
    }
}