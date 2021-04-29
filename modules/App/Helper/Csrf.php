<?php

namespace App\Helper;

use Firebase\JWT\JWT;

class Csrf extends \Lime\Helper {

    public function generateToken(string $key, ?int $expire = null): string {

        $payload = ['csrf' => $key];

        if ($expire && is_numeric($expire)) {
            $payload['exp'] = $expire;
        }

        $token = JWT::encode($payload, $this->app['sec-key']);

        $this->app->helper('session')->write("app.csrf.token.{$key}", $token);

        return $token;
    }

    public function token(string $key, bool $generate = false, ?int $expire = null): string {

        $token = $this->app->helper('session')->read("app.csrf.token.{$key}", null);

        if (!$token || $generate) {
            $token = $this->generateToken($key, $expire);
        }

        return $token;
    }

    public function isValid(string $key, string $token, bool $checkpayload = false): bool {

        if (!$token) {
            return false;
        }

        if ($checkpayload) {
            try {
                $payload = JWT::decode($token, $this->app['sec-key'], ['HS256']);
                return isset($payload->csrf) && $payload->csrf == $key;
            } catch(\Exception $e) {
                return false;
            }
        }

        $stoken = $this->app->helper('session')->read("app.csrf.token.{$key}", null);

        if ($token != $stoken) {
            return false;
        }

        try {
            $token = JWT::decode($token, $this->app['sec-key'], ['HS256']);
        } catch(\Exception $e) {
            return false;
        }

        return true;
    }
}