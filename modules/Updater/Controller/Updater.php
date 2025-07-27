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

        $version = $this->param('version', 'master');
        $target = $this->helper('license')->isProprietary() ? 'pro' : 'core';

        if (!in_array($target, ['core', 'pro'])) {
            return $this->stop(400, 'Invalid target');
        }

        if (!in_array($version, ['master', 'develop'])) {
            return $this->stop(400, 'Invalid version');
        }

        $this->helper('updater')->update($version, $target);

        return ['message' => 'Update successful!'];
    }
}
