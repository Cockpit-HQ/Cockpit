<?php

namespace Content\Controller;

use App\Controller\App;
use ArrayObject;

class Content extends App {

    public function index() {

        $this->helper('theme')->favicon('content:icon.svg');

        return $this->render('content:views/index.php');
    }

}