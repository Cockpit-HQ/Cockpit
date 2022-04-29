<?php

namespace App\Controller;

class Dashboard extends App {

    public function index() {

        $this->helper('theme')->pageClass('dashboard-page');

        return $this->render('app:views/dashboard/index.php');
    }
}