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

        $fields = $collection['fields'];

        $locales = $this->helper('locales')->locales();

        if (count($locales) == 1) {
            $locales = [];
        } else {
            $locales[0]['visible'] = true;
        }

        return $this->render('collections:views/items/list.php', compact('collection', 'fields', 'locales'));

    }

    public function item($collection = null, $id = null) {

        if (!$collection) {
            return false;
        }

        $collection = $this->module('collections')->collection($collection);

        if (!$collection) {
            return $this->stop(404);
        }

        if ($id) {

        }

        $item = $this->module('collections')->getDefaultItem($collection['name']);

        $fields = $collection['fields'];

        $locales = $this->helper('locales')->locales();

        if (count($locales) == 1) {
            $locales = [];
        } else {
            $locales[0]['visible'] = true;
        }

        return $this->render('collections:views/items/item.php', compact('collection', 'fields', 'locales', 'item'));
    }

}