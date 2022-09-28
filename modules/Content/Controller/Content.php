<?php

namespace Content\Controller;

use App\Controller\App;
use ArrayObject;

class Content extends App {

    public function index() {

        $this->helper('theme')->favicon('content:icon.svg');

        return $this->render('content:views/index.php');
    }

    public function populate() {

        $this->helper('session')->close();

        $locale = $this->param('locale', 'default');
        $lvl = $this->param('lvl', 10);
        $data = $this->param('data', []);

        $data = $this->app->helper('locales')->applyLocales($data, $locale);

        return $this->module('content')->populate($data, $lvl, 0, ['locale' => $locale]);
    }
}
