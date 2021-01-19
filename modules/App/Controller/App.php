<?php

namespace App\Controller;

/**
 * Class Controller
 * @package App
 */
class App extends Authenticated {

    protected $layout = 'app:layouts/app.php';

    protected function render($view, $params = []) {

        $this->app->trigger('app.layout.render');

        return parent::render($view, $params);
    }
}