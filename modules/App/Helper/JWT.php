<?php

namespace App\Helper;

use Firebase\JWT\JWT as JWTLIB;
use Firebase\JWT\Key;

class JWT extends \Lime\Helper {

    public function create (array $payload, ?string $key = null) {
        return JWTLIB::encode($payload, $key ?? $this->app->retrieve('sec-key'), 'HS256');
    }

    public function decode(string $token, ?string $key = null) {
        return JWTLIB::decode($token, new Key($key ?? $this->app->retrieve('sec-key'), 'HS256'));
    }
}