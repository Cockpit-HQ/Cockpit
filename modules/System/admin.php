<?php

// Register Helpers
$this->helpers['settings'] = 'System\\Helper\\Settings';

// Register routes
$this->bindClass('System\\Controller\\Api', '/system/api');
$this->bindClass('System\\Controller\\Locales', '/system/locales');
$this->bindClass('System\\Controller\\Logs', '/system/logs');
$this->bindClass('System\\Controller\\Users\\Roles', '/system/users/roles');
$this->bindClass('System\\Controller\\Users', '/system/users');
$this->bindClass('System\\Controller\\Settings', '/system');

$this->helper('menus')->addLink('modules', [
    'label'  => 'Api',
    'icon'   => 'system:assets/icons/api.svg',
    'route'  => '/system/api',
    'active' => false
]);


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