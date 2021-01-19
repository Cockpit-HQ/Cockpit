<?php

namespace App\Controller;

class Dashboard extends App {

    public function index() {

        return $this->render('app:views/dashboard/index.php');
    }
}