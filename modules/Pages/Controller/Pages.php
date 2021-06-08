<?php

namespace Pages\Controller;

class Pages extends Controller {

    protected function before() {

        parent::before();

        $this->app->on('app.layout.assets', function(array &$assets) {
            $assets[] = 'pages:assets/css/pages.css';
        });
    }


    public function index() {
        return $this->render('pages:views/pages/index.php');
    }

}