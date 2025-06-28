<?php

namespace System\Helper;

use ArrayObject;

class Settings extends \Lime\Helper {

    public function groups(bool $filter = false): ArrayObject {

        $items = [];

        $items[] = [
            'icon' => 'system:assets/icons/account.svg',
            'route' => '/system/users/user',
            'label' => 'Account',
            'permission' => null
        ];

        $items[] = [
            'icon' => 'system:assets/icons/users.svg',
            'route' => '/system/users',
            'label' => 'Users',
            'permission' => 'app/users/manage'
        ];

        $items[] = [
            'icon' => 'system:assets/icons/lock.svg',
            'route' => '/system/users/roles',
            'label' => 'Roles & Permissions',
            'permission' => 'app/roles/manage'
        ];

        $items[] = [
            'icon' => 'system:assets/icons/api.svg',
            'route' => '/system/api',
            'label' => 'Api & Security',
            'permission' => 'app/api/manage'
        ];

        $items[] = [
            'icon' => 'system:assets/icons/locales.svg',
            'route' => '/system/locales',
            'label' => 'Locales',
            'permission' => 'app/locales/manage'
        ];

        if ($this->app->helper('spaces')->isMaster()) {

            $items[] = [
                'icon' => 'system:assets/icons/spaces.svg',
                'route' => '/system/spaces',
                'label' => 'Spaces',
                'permission' => 'app/spaces'
            ];

            if (!$this->app->retrieve('tower.disabled')) {

                $items[] = [
                    'icon' => 'system:assets/icons/console.svg',
                    'route' => '/system/tower',
                    'label' => 'Tower',
                    'permission' => 'system/tower'
                ];
            }

        }

        $items[] = [
            'icon' => 'system:assets/icons/queue.svg',
            'route' => '/system/worker',
            'label' => 'Worker',
            'permission' => 'system/workers'
        ];

        $items[] = [
            'icon' => 'system:assets/icons/logging.svg',
            'route' => '/system/logs',
            'label' => 'Logs',
            'permission' => 'app/logs'
        ];

        $items[] = [
            'icon' => 'system:assets/icons/info.svg',
            'route' => '/system/info',
            'label' => 'System info',
            'permission' => 'app/system/info'
        ];

        $settings = new ArrayObject([
            'System' => $items
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
