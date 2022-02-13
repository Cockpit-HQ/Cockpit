<?php

namespace System\Helper;

use ArrayObject;

class Settings extends \Lime\Helper {

    public function groups(bool $filter = false): ArrayObject {

        $settings = new ArrayObject([
            'System' => [
                [
                    'icon' => null,
                    'route' => '/system/users/user',
                    'label' => 'Account',
                    'permission' => null
                ],
                [
                    'icon' => 'system:assets/icons/users.svg',
                    'route' => '/system/users',
                    'label' => 'Users',
                    'permission' => 'app/users/manage'
                ],
                [
                    'icon' => 'system:assets/icons/lock.svg',
                    'route' => '/system/users/roles',
                    'label' => 'Roles & Permissions',
                    'permission' => 'app/roles/manage'
                ],
                [
                    'icon' => null,
                    'route' => '/system/api',
                    'label' => 'Api & Security',
                    'permission' => 'app/api/manage'
                ],
                [
                    'icon' => 'system:assets/icons/locales.svg',
                    'route' => '/system/locales',
                    'label' => 'Locales',
                    'permission' => 'app/locales/manage'
                ],
                [
                    'icon' => 'system:assets/icons/logging.svg',
                    'route' => '/system/logs',
                    'label' => 'Logs',
                    'permission' => 'app/logs'
                ],
                [
                    'icon' => 'system:assets/icons/info.svg',
                    'route' => '/system/info',
                    'label' => 'System info',
                    'permission' => 'app/system/info'
                ],
            ]
        ]);

        $this->app->trigger('app.settings.collect', [$settings]);

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