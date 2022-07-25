<?php

// Register Helpers
$this->helpers['settings'] = 'System\\Helper\\Settings';

// Register routes
$this->bindClass('System\\Controller\\Api', '/system/api');
$this->bindClass('System\\Controller\\Locales', '/system/locales');
$this->bindClass('System\\Controller\\Logs', '/system/logs');
$this->bindClass('System\\Controller\\Users\\Roles', '/system/users/roles');
$this->bindClass('System\\Controller\\Users', '/system/users');
$this->bindClass('System\\Controller\\Utils', '/system/utils');
$this->bindClass('System\\Controller\\Settings', '/system');

$this->helper('menus')->addLink('modules', [
    'label'  => 'Api',
    'icon'   => 'system:assets/icons/api.svg',
    'route'  => '/system/api',
    'active' => false
]);

// events

$this->on('app.permissions.collect', function (ArrayObject $permissions) {

    $permissions['Locales'] = [
        'app/locales/manage' => 'Manage locales',
    ];

    $permissions['Api & Security'] = [
        'app/api/manage' => 'Manage Api access',
    ];

    $permissions['Logs'] = [
        'app/logs' => 'View app logs',
    ];

});

$this->on('app.user.login', function($user) {

    $this->module('system')->log("User Login: {$user['user']}", type: 'info', context: [
        '_id' => $user['_id'],
        'user' => $user['user'],
        'name' => $user['name'],
        'email' => $user['email'],
        'ip' => $this->getClientIp()
    ]);
});


$this->on('app.search', function($search, $findings) {

    if (!$this->helper('acl')->isAllowed('app/users/manage')) {
        return;
    }

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

});
