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
            'fields' => []
        ];

        $isUpdate = false;

        return $this->render('collections:views/collections/collection.php', compact('collection', 'isUpdate'));
    }


    public function save() {

        $collection = $this->param('collection');

        if (!$collection) {
            return $this->stop(['error' => 'Collection data is missing'], 412);
        }

        $collection = $this->module('collections')->saveCollection($collection['name'], $collection);

        return $collection;
    }

    public function find() {

    }

}