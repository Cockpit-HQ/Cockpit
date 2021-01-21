<?php

namespace Settings\Controller;

use App\Controller\App;

class Settings extends App {

    public function index() {
        return $this->render('settings:views/index.php');
    }
}