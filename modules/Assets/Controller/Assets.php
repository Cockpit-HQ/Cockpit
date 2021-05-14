<?php

namespace Assets\Controller;

use App\Controller\App;
use ArrayObject;

class Assets extends App {


    public function index() {
        return $this->render('assets:views/index.php');
    }

}