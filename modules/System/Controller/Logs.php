<?php

namespace System\Controller;

use App\Controller\App;

class Logs extends App {

    protected function before() {

        if (!$this->isAllowed('app/logs')) {
            $this->stop(401);
        }
    }

    public function index() {

        return $this->render('system:views/logs/index.php');
    }

}