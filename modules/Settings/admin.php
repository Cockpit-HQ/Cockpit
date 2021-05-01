<?php

// Register Helpers
$this->helpers['settings'] = 'Settings\\Helper\\Settings';

// Register routes
$this->bindClass('Settings\\Controller\\Api', 'settings/api');
$this->bindClass('Settings\\Controller\\Locals', 'settings/locals');
$this->bindClass('Settings\\Controller\\Settings', 'settings');


$this->on('app.permissions.collect', function (ArrayObject $permissions) {

    $permissions['Locals'] = [
        'app.locals.manage' => 'Manage locals',
    ];

    $permissions['Api & Security'] = [
        'app.api.manage' => 'Manage Api access',
    ];

});