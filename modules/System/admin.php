<?php

// Register Helpers
$this->helpers['settings'] = 'System\\Helper\\Settings';

// Register routes
$this->bindClass('System\\Controller\\Api', '/system/api');
$this->bindClass('System\\Controller\\Buckets', '/system/buckets');
$this->bindClass('System\\Controller\\Locales', '/system/locales');
$this->bindClass('System\\Controller\\Logs', '/system/logs');
$this->bindClass('System\\Controller\\Users\\Roles', '/system/users/roles');
$this->bindClass('System\\Controller\\Users', '/system/users');
$this->bindClass('System\\Controller\\Utils', '/system/utils');
$this->bindClass('System\\Controller\\Spaces', '/system/spaces');
$this->bindClass('System\\Controller\\Tower', '/system/tower');
$this->bindClass('System\\Controller\\Settings', '/system');

// events

$this->on('app.layout.init', function() {

    if (!$this->helper('acl')->isAllowed('app/api/manage')) {
        return;
    }

    $this->helper('menus')->addLink('modules', [
        'label'  => 'API & Security',
        'icon'   => 'system:assets/icons/api.svg',
        'route'  => '/system/api',
        'active' => false
    ]);
});

$this->on('app.layout.assets', function(&$assets, $context) {

    // include app license component
    if ($context === 'app:header') $assets[] = 'system:assets/components/app-license/app-license.css';
    if ($context === 'app:footer') $assets[] = ['src' => 'system:assets/components/app-license/app-license.js'];

});

$this->on('app.permissions.collect', function (ArrayObject $permissions) {

    $permissions['Locales'] = [
        'app/locales/manage' => 'Manage locales',
    ];

    $permissions['Api & Security'] = [
        'app/api/manage' => 'Manage Api access',
    ];

    $permissions['System'] = [
        'app/system/info' => 'View system information',
        'app/resources/unlock' => 'Unlock resources',
    ];

    $permissions['Logs'] = [
        'app/logs' => 'View app logs',
    ];

    $permissions['Spaces'] = [
        'app/spaces' => 'Manage spaces',
    ];

});

$this->on('app.user.login', function($user) {

    $config = $this->retrieve('log/login', true);

    if ($config === false) {
        return;
    }

    $log = [
        '_id' => $user['_id'],
        'user' => $user['user'],
        'name' => $user['name'],
        'email' => $user['email'],
        'ip' => $this->getClientIp()
    ];

    if (is_array($config)) {

        foreach (array_keys($log) as $prop) {

            if (!in_array($prop, ['_id', 'user']) && !in_array($prop, $config)) {
                unset($log[$prop]);
            }
        }
    }

    $this->module('system')->log("User Login: {$user['user']}", type: 'info', context: $log);
});


$this->on('app.search', function($search, $findings) {

    if ($this->helper('acl')->isAllowed('app/users/manage')) {

        $users = $this->dataStorage->find('system/users', [
            'filter' => [
                '$or' => [
                    ['name' => ['$regex' => $search, '$options' => 'i']],
                    ['label' => ['$regex' => $search, '$options' => 'i']],
                ]
            ],
            'limit' => 5
        ])->toArray();

        foreach ($users as $user) {

            $findings[] = [
                'title' => isset($user['name']) && $user['name'] ? "{$user['name']} ({$user['user']})" : $user['user'],
                'route' => $this->routeUrl("/system/users/user/{$user['_id']}"),
                'group' => 'Users',
                'icon' => 'system:assets/icons/users.svg'
            ];
        }
    }

    if ($this->helper('acl')->isAllowed('app/spaces') && $this->helper('spaces')->isMaster()) {

        foreach ($this->helper('spaces')->spaces() as $space) {

            if (str_contains($space['name'], $search)) {
                $findings[] = [
                    'title' => $space['name'],
                    'route' => $space['url'],
                    'group' => 'Spaces',
                    'icon' => 'system:assets/icons/spaces.svg'
                ];
            }
        }
    }

});
