<?php

namespace Pages\Controller;

use ArrayObject;

class Settings extends Controller {

    public function index() {
        return $this->render('pages:views/settings/index.php');
    }
}