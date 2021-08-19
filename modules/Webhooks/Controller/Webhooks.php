<?php

namespace Webhooks\Controller;

use App\Controller\App;
use ArrayObject;

class Webhooks extends App {

    protected function before() {

        if (!$this->isAllowed('webhooks/manage')) {
            $this->stop(401);
        }
    }


    public function index() {

        $this->helper('theme')->favicon('webhooks:icon.svg');

        return $this->render('webhooks:views/index.php');
    }
}