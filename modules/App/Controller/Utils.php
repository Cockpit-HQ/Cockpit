<?php

namespace App\Controller;

class Utils extends App {

    protected function before() {
        $this->helper('session')->close();
    }

    public function generateToken($length = 20) {

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
        $this->hasValidCsrfToken(true);

        $findings = new \ArrayObject([]);
        $search = $this->param('search');

        if ($search) {
            $this->app->trigger('app.search', [$search, $findings]);
        }

        return $findings->getArrayCopy();
    }

}
