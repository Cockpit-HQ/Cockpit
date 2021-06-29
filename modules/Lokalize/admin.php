<?php

// Register routes
$this->bindClass('Lokalize\\Controller\\Projects', '/lokalize/projects');
$this->bindClass('Lokalize\\Controller\\Utils', '/lokalize/utils');

$this->helper('menus')->addLink('modules', [
    'label'  => 'Lokalize',
    'icon'   => 'lokalize:icon.svg',
    'route'  => '/lokalize/projects',
    'active' => false,
    'group'  => 'Content'
]);

$this->on('app.permissions.collect', function($permissions) {

    $permissions['Lokalize'] = [
        'lokalize/projects/manage' => 'Manage projects',
    ];
});