<?php

namespace Settings\Helper;

use ArrayObject;

class Settings extends \Lime\Helper {

    public function groups($filter = false) {

        $settings = new ArrayObject([
            'System' => [
                [
                    'icon' => null,
                    'route' => '/users/user',
                    'label' => 'Account',
                    'permission' => null
                ],
                [
                    'icon' => null,
                    'route' => '/users',
                    'label' => 'Users',
                    'permission' => null
                ],
                [
                    'icon' => null,
                    'route' => '/settings/api',
                    'label' => 'Api & Security',
                    'permission' => null
                ],
                [
                    'icon' => null,
                    'route' => '/settings/locales',
                    'label' => 'Locals',
                    'permission' => null
                ],
            ]
        ]);

        $this->app->trigger('app.settings.collect', [$config]);

        if ($filter) {

            $acl = $this->app->helper('acl');

            $filtered = [];

            foreach ($settings as $group => $items) {

                $items = \array_filter($items, function($item) use($acl) {
                    return isset($item['permission']) && $item['permission'] ? $acl->isAllowed($item['permission']) : true;
                });

                if (count($items)) {
                    $filtered[$group] = $items;
                }
            }

            $settings = new ArrayObject($filtered);
        }

        return $settings;
    }
}