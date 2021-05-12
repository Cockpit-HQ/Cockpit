<?php

// Register routes
$this->bindClass('Content\\Controller\\Collection', '/content/collection');
$this->bindClass('Content\\Controller\\Singleton', '/content/singleton');
$this->bindClass('Content\\Controller\\Models', '/content/models');
$this->bindClass('Content\\Controller\\Content', '/content');

$this->helper('menus')->addLink('modules', [
    'label'  => 'Content',
    'icon'   => 'content:icon.svg',
    'route'  => '/content',
    'active' => false
]);


// events
$this->on('app.layout.header', function(array &$assets) {
    $assets[] = ['src' => 'content:assets/js/content.js', 'type' => 'module'];
});

$this->on('app.permissions.collect', function($permissions) {

    $permissions['Content'] = [
        'component' => 'ContentModelSettings',
        'src' => 'content:assets/vue-components/content-model-permissions.js',
        'props' => [
            'models' => $this->module('content')->models()
        ]
    ];
});