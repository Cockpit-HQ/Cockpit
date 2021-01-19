<?php

namespace App\Controller;

class Settings extends App {

    public function index() {

        return $this->render('app:views/settings/index.php');
    }
}