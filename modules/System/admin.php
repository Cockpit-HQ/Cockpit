<?php

// Register Helpers
$this->helpers['settings'] = 'System\\Helper\\Settings';

// Register routes
$this->bindClass('System\\Controller\\Api', '/system/api');
$this->bindClass('System\\Controller\\Locales', '/system/locales');
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
});