<?php

namespace App\Helper;

use Firebase\JWT\JWT as JWTLIB;
use Firebase\JWT\Key;

class JWT extends \Lime\Helper {

    /**
     * Create a JWT token with the given payload and key.
     *
     * @param array $payload The payload to encode in the JWT.
     * @param string|null $key The key to sign the JWT. If null, uses the app's secret key.
     * @return string The encoded JWT token.
     */
    public function create(array $payload, ?string $key = null) {
        return JWTLIB::encode($payload, $key ?? $this->app->retrieve('sec-key'), 'HS256');
    }

    /**
     * Encode the payload into a JWT token.
     *
     * @param array $payload The payload to encode.
     * @param string|null $key The key to sign the JWT. If null, uses the app's secret key.
     * @return string The encoded JWT token.
     */
    public function encode(array $payload, ?string $key = null) {
        return $this->create($payload, $key);
    }

    /**
     * Decode a JWT token.
     *
     * @param string $token The token to decode.
     * @param string|null $key The key to verify the JWT. If null, uses the app's secret key.
     * @return object|null The decoded payload or null if invalid.
     */
    public function decode(string $token, ?string $key = null) {
        return JWTLIB::decode($token, new Key($key ?? $this->app->retrieve('sec-key'), 'HS256'));
    }
}
