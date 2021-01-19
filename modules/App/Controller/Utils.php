<?php

namespace App\Controller;

class Utils extends App {

    public function generateToken($length = 20) {
        return ['token' => bin2hex(random_bytes($length))];
    }
}