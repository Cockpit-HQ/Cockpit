<?php

namespace Collections\Controller;

use App\Controller\App;
use ArrayObject;

class Entries extends App {

    public function list($collection = null) {

        if (!$collection) {
            return false;
        }

        $collection = $this->module('collections')->collection($collection);

        if (!$collection) {
            return $this->stop(404);
        }

        return $this->render('collections:views/entries/list.php', compact('collection'));

    }

}