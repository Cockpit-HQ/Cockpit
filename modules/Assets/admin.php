<?php

// Register routes
$this->bindClass('Assets\\Controller\\Assets', '/assets');

$this->helper('menus')->addLink('modules', [
    'label'  => 'Assets',
    'icon'   => 'assets:icon.svg',
    'route'  => '/assets',
    'active' => false,
    'prio'   => 1
]);

// events
$this->on('app.layout.assets', function(array &$assets) {
    $assets[] = ['src' => 'assets:assets/js/assets.js', 'type' => 'module'];
});

$this->on('app.permissions.collect', function($permissions) {

    $permissions['Assets'] = [
        'assets/upload' => 'Upload assets',
        'assets/edit' => 'Edit assets',
        'assets/delete' => 'Delete assets',
        'assets/folders/create' => 'Create folders',
        'assets/folders/edit' => 'Edit folders',
        'assets/folders/delete' => 'Delete folders',
    ];
});