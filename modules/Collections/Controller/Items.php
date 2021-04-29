<?php

namespace Collections\Controller;

use App\Controller\App;
use ArrayObject;

class Items extends App {

    public function list($collection = null) {

        if (!$collection) {
            return false;
        }

        $collection = $this->module('collections')->collection($collection);

        if (!$collection) {
            return $this->stop(404);
        }

        return $this->render('collections:views/items/list.php', compact('collection'));

    }

    public function item($collection = null, $id = null) {

        if (!$collection) {
            return false;
        }

        $collection = $this->module('collections')->collection($collection);

        if (!$collection) {
            return $this->stop(404);
        }

        $item = $this->module('collections')->getDefaultItem($collection['name']);

        if ($id) {

        }

        $fields = $collection['fields'];

        return $this->render('collections:views/items/item.php', compact('collection', 'fields', 'item'));
    }

}