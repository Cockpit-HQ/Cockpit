<?php

// Register routes
$this->bindClass('Webhooks\\Controller\\Webhooks', '/webhooks');
$this->bindClass('Webhooks\\Controller\\Utils', '/webhooks/utils');


$this->on('app.permissions.collect', function($permissions) {

    $permissions['Webhooks'] = [
        'webhooks/manage' => 'Manage webhooks',
    ];
});

$this->on('app.settings.collect', function($settings) {

    $settings['Addons'][] = [
        'icon' => 'webhooks:icon.svg',
        'route' => '/webhooks',
        'label' => 'Webhooks',
        'permission' => 'webhooks/manage'
    ];
});