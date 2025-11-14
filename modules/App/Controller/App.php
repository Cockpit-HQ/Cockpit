<?php

namespace App\Controller;

/**
 * Class Controller
 * @package App
 */
class App extends Authenticated {

    protected $layout = 'app:layouts/app.php';

    protected function render(string $view, array $params = []): mixed {

        $this->app->trigger('app.layout.render', [&$view, &$params]);

        return parent::render($view, $params);
    }
}
