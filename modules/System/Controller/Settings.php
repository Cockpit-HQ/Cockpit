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

        $addons = array_filter(array_keys($this->app['modules']->getArrayCopy()), fn($name) => !in_array($name, ['app', 'assets', 'content','system']));
        $license = $this->app->helper('license')->license();

        return $this->render('system:views/info.php', compact('addons', 'license'));
    }
}
