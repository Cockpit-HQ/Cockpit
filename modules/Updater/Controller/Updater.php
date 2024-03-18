<?php

namespace Updater\Controller;

use App\Controller\App;
use ArrayObject;

class Updater extends App {

    protected function before() {

        if (!$this->helper('acl')->isSuperAdmin()) {
            return $this->stop(401);
        }

        $this->helper('session')->close();
    }

    public function index() {

        $meta = $this->helper('updater')->getLatestReleaseInfo();

        return $this->render('updater:views/index.php', compact('meta'));
    }

    public function update() {

        $version = 'master';
        $target = $this->helper('license')->isProprietary() ? 'pro' : 'core';

        $this->helper('updater')->update($version, $target);

        return ['message' => 'Update successful!'];
    }
}
