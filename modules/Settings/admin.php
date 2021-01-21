<?php

// Register routes
$this->bindClass('Settings\\Controller\\Locales', 'settings/locales');
$this->bindClass('Settings\\Controller\\Settings', 'settings');


$this->on('app.permissions.collect', function ($permissions) {

    $permissions['Locales'] = [
        'app.locales.manage' => 'Manage locales',
    ];

});