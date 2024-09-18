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

    public function createSecret(int $length = 160) {
        return $this->tfa->createSecret($length);
    }

    public function getQRCodeImageAsDataUri(string $secret, int $size = 150): string {
        return $this->tfa->getQRCodeImageAsDataUri($this->app['app.name'], $secret, $size);
    }

    public function getQRCodeImage(string $secret, int $size = 150): mixed {
        $uri = $this->tfa->getQRCodeImageAsDataUri($this->app['app.name'], $secret, $size);
        $binary = file_get_contents($uri);
        return $binary;
    }

    public function verifyCode(string $secret, string $code): bool {
        return $this->tfa->verifyCode($secret, $code);
    }
}
