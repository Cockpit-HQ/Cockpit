<?php

namespace App\Helper;

use RobThree\Auth\TwoFactorAuth;
use RobThree\Auth\Providers\Qr\BaconQrCodeProvider;
use RobThree\Auth\Algorithm;

class TWFA extends \Lime\Helper {

    protected TwoFactorAuth $tfa;

    protected function initialize() {
        $this->tfa = new TwoFactorAuth(new BaconQrCodeProvider(borderWidth: 0, format: 'svg'), $this->app['app.name'], 6, 30, Algorithm::Sha1);
    }

    /**
     * Create a new secret.
     *
     * @param int $length The length of the secret.
     * @return string The generated secret.
     */
    public function createSecret(int $length = 160) {
        return $this->tfa->createSecret($length);
    }

    /**
     * Get the QR code image as a data URI.
     *
     * @param string $secret The secret key.
     * @param int $size The size of the QR code image.
     * @return string The data URI of the QR code image.
     */
    public function getQRCodeImageAsDataUri(string $secret, int $size = 150): string {
        return $this->tfa->getQRCodeImageAsDataUri($this->app['app.name'], $secret, $size);
    }

    /**
     * Get the QR code image as a binary string.
     *
     * @param string $secret The secret key.
     * @param int $size The size of the QR code image.
     * @return mixed The binary string of the QR code image.
     */
    public function getQRCodeImage(string $secret, int $size = 150): mixed {
        $uri = $this->tfa->getQRCodeImageAsDataUri($this->app['app.name'], $secret, $size);
        $binary = file_get_contents($uri);
        return $binary;
    }

    /**
     * Verify the provided code against the secret.
     *
     * @param string $secret The secret key.
     * @param string $code The code to verify.
     * @return bool True if the code is valid, false otherwise.
     */
    public function verifyCode(string $secret, string $code): bool {
        return $this->tfa->verifyCode($secret, $code);
    }
}
