<?php

namespace App\Controller;

class Utils extends App {

    public function generateToken($length = 20) {

        $this->helper('session')->close();

        return ['token' => bin2hex(random_bytes($length))];
    }

    public function csrf($name = null, $generate = false, $expire = null) {

        if (!$name) {
            return false;
        }

        return ['token' => $this->helper('csrf')->token($name, $generate, $expire)];
    }

    public function search() {

        $this->helper('session')->close();

        $findings = new \ArrayObject([]);
        $search = $this->param('search');

        if ($search) {
            $this->app->trigger('app.search', [$search, $findings]);
        }

        return $findings->getArrayCopy();
    }

}
