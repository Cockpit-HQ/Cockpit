<?php

namespace App\Helper;

class Csrf extends \Lime\Helper {

    protected string $sessionKey;

    protected function initialize() {

        $self = $this;
        $key = $this->app->helper('session')->read("app.csrf._key", null);

        if (!$key) {
            $key = bin2hex(random_bytes(32));
            $this->app->helper('session')->write("app.csrf._key", $key);
        }

        $this->sessionKey = $key;

        $this->app->on('app.auth.setuser', function($user, $permanent) use($self) {
            if ($permanent) $self->reset();
        });
    }

    /**
     * Reset the CSRF token.
     *
     * @return void
     */
    public function reset() {
        $key = bin2hex(random_bytes(32));
        $this->app->helper('session')->write("app.csrf._key", $key);
        $this->sessionKey = $key;
    }

    /**
     * Generate a CSRF token.
     *
     * @param string $key The key for the token.
     * @param int|null $expire The expiration time in seconds.
     * @return string The generated token.
     */
    public function generateToken(string $key, ?int $expire = null): string {

        $payload = ['csrf' => "{$key}.{$this->sessionKey}"];

        if ($expire && is_numeric($expire)) {
            $payload['exp'] = $expire;
        }

        $token = $this->app->helper('jwt')->create($payload);

        $this->app->helper('session')->write("app.csrf.token.{$key}", $token);

        return $token;
    }

    /**
     * Get the CSRF token.
     *
     * @param string $key The key for the token.
     * @param bool $generate Whether to generate a new token if it doesn't exist.
     * @param int|null $expire The expiration time in seconds.
     * @return string The CSRF token.
     */
    public function token(string $key, bool $generate = false, ?int $expire = null): string {

        $token = $this->app->helper('session')->read("app.csrf.token.{$key}", null);

        if (!$token || $generate) {
            $token = $this->generateToken($key, $expire);
        }

        return $token;
    }

    /**
     * Check if a CSRF token is valid.
     *
     * @param string $key The key for the token.
     * @param string|null $token The token to check.
     * @param bool $checkpayload Whether to check the payload.
     * @return bool True if the token is valid, false otherwise.
     */
    public function isValid(string $key, ?string $token, bool $checkpayload = false): bool {

        if (!$token) {
            return false;
        }

        if ($checkpayload) {

            try {

                $payload = $this->app->helper('jwt')->decode($token);

                return isset($payload->csrf) && $payload->csrf === "{$key}.{$this->sessionKey}";

            } catch(\Exception $e) {
                return false;
            }
        }

        $stoken = $this->app->helper('session')->read("app.csrf.token.{$key}", null);

        if ($token != $stoken) {
            return false;
        }

        try {
            $token = $this->app->helper('jwt')->decode($token);
        } catch(\Exception $e) {
            return false;
        }

        return true;
    }
}
