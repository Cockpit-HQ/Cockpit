<?php

// Register Helpers
$this->helpers['layoutComponents'] = 'Layout\\Helper\\Components';

// Register routes
$this->bindClass('Layout\\Controller\\Settings', '/layout-components');

$this->bind('/layout/components', function() {

    $this->response->mime = 'js';

    $components = new ArrayObject($this->helper('layoutComponents')->components());

    $this->trigger('layout.components.collect', [$components]);

    return 'export default '.json_encode($components);
});

// events
$this->on('app.layout.header', function(array &$assets) {
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