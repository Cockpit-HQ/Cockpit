<?php

// Register Helpers
$this->helpers['layoutComponents'] = 'Layout\\Helper\\Components';

// Register routes
$this->bindClass('Layout\\Controller\\Settings', '/layout-components');

$this->bind('/layout/components', function() {

    session_write_close();

    $components = new ArrayObject($this->helper('layoutComponents')->components());

    $this->trigger('layout.components.collect', [$components]);
    $this->response->mime = 'js';

    return 'export default '.json_encode($components);
});

// events
$this->on('app.layout.assets', function(array &$assets) {
    $assets[] = ['src' => 'layout:assets/js/layout.js', 'type' => 'module'];
});

$this->on('app.settings.collect', function($settings) {

    $settings['System'][] = [
        'icon' => null,
        'route' => '/layout-components',
        'label' => 'Layout Components',
        'permission' => 'layout.components.manage'
    ];
});

$this->on('app.permissions.collect', function($permissions) {

    $permissions['Layout'] = [
        'layouts/components/manage' => 'Manage components',
    ];
});