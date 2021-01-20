<?php

namespace App\Controller;

/**
 * Class Controller
 * @package App
 */
class Authenticated extends Base {

    protected $user;

    protected function initialize() {

        $user = $this->app->helper('auth')->getUser();

        if (!$user) {
            $this->app->reroute('/auth/login?to='.$app->retrieve('route'));
            $this->app->stop();
        }
        
        $this->user = $user;
        $this->app->set('user', $user);
        
        parent::initialize();
    }

    public function isAllowed($permission) {
        return $this->helper('acl')->isAllowed($permission);
    }
}