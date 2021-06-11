<?php

namespace Settings\Controller;

use App\Controller\App;

class Settings extends App {

    public function index() {
        return $this->render('settings:views/index.php');
    }

    public function info() {

        if (!$this->isAllowed('app/system/info')) {
            $this->stop(401);
        }

        return $this->render('settings:views/info.php');
    }
}