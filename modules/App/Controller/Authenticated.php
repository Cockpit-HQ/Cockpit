<?php

namespace App\Controller;

/**
 * Class Controller
 * @package App
 */
class Authenticated extends Base {

    protected $user;

    public function __construct($app) {

        $user = $app->helper('auth')->getUser();

        if (!$user) {
            $app->reroute('/auth/login?to='.$app->retrieve('route'));
            $app->stop();
        }

        parent::__construct($app);

        $this->user = $user;
        $app->set('user', $user);

        $controller = \strtolower(\str_replace('\\', '.', \get_class($this)));

        $app->trigger("app.{$controller}.init", [$this]);
    }
}