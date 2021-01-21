<?php

namespace App\Helper;

use BaconQrCode\Renderer\ImageRenderer;
use BaconQrCode\Renderer\Image\SvgImageBackEnd;
use BaconQrCode\Renderer\RendererStyle\RendererStyle;
use BaconQrCode\Writer;

class TWFA extends \Lime\Helper {
    
    protected $tfa;

    protected function initialize() {
        $this->tfa = new \RobThree\Auth\TwoFactorAuth($this->app['app.name'], 6, 30, 'sha1', new TWFAQRCodeRenderer());
    }

    public function createSecret($length = 160) {
        return $this->tfa->createSecret($length);
    }

    public function getQRCodeImageAsDataUri($secret, $size = 150) {
        return $this->tfa->getQRCodeImageAsDataUri($this->app['app.name'], $secret, $size);
    }
}

class TWFAQRCodeRenderer implements \RobThree\Auth\Providers\Qr\IQRCodeProvider {

    public function getMimeType() {
        return 'image/svg+xml';
    }

    public function getQRCodeImage($qrtext, $size = 200, $margin = 0) {

        $renderer = new ImageRenderer(
            new RendererStyle($size, $margin),
            new SvgImageBackEnd()
        );

        $writer = new Writer($renderer);

        return $writer->writeString($qrtext); // Return image
    }
}