<?php

namespace System\Controller;

use App\Controller\App;

class Settings extends App {

    public function index() {
        return $this->render('system:views/settings.php');
    }

    public function info() {

        if (!$this->isAllowed('app/system/info')) {
            return $this->stop(401);
        }

        return $this->render('system:views/info.php');
    }
}