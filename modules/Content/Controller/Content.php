<?php

namespace Content\Controller;

use App\Controller\App;
use ArrayObject;

class Content extends App {


    public function index() {
        return $this->render('content:views/index.php');
    }

}