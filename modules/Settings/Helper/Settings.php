<?php

namespace Settings\Helper;

use ArrayObject;

class Settings extends \Lime\Helper {

    public function groups() {

        $config = new ArrayObject([
            'System' => [
                [
                    'icon' => null,
                    'route' => '/users',
                    'label' => 'Users',
                    'permissions' => null
                ],
                [
                    'icon' => null,
                    'route' => '/settings/api',
                    'label' => 'Api & Security',
                    'permissions' => null
                ],
                [
                    'icon' => null,
                    'route' => '/settings/locales',
                    'label' => 'Locals',
                    'permissions' => null
                ],
            ]
        ]);

        $this->app->trigger('app.settings.collect', [$config]);

        return $config;
    }
}