<?php

namespace Collections\Controller;

use App\Controller\App;
use ArrayObject;

class Collections extends App {

    public function index() {
        return $this->render('collections:views/collections/index.php');
    }

    public function create() {

        $collection = [
            'name' => '',
            'label' => '',
            'group' => '',
            'color' => null,
            'fields' => []
        ];

        $isUpdate = false;

        return $this->render('collections:views/collections/collection.php', compact('collection', 'isUpdate'));
    }

    public function edit($name = null) {

        if (!$name) {
            return $this->stop(412);
        }

        $collection = $this->module('collections')->collection($name);

        if (!$collection) {
            return $this->stop(404);
        }

        $isUpdate = true;

        return $this->render('collections:views/collections/collection.php', compact('collection', 'isUpdate'));
    }

    public function remove($name = null) {

        if (!$name) {
            return $this->stop(412);
        }

        $collection = $this->module('collections')->collection($name);

        if (!$collection) {
            return $this->stop(404);
        }

        $this->module('collections')->removeCollection($name);

        return ['success' => true];
    }

    public function save() {

        $collection = $this->param('collection');

        if (!$collection) {
            return $this->stop(['error' => 'Collection data is missing'], 412);
        }

        $collection = $this->module('collections')->saveCollection($collection['name'], $collection);

        return $collection;
    }

    public function load() {

        $collections = array_values($this->module('collections')->collections());

        return $collections;
    }

}