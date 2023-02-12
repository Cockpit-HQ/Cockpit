<?php

// Register routes

$this->bind('/assets/link/:id', function($params) {

    $this->helper('session')->close();

    if (!$params['id']) {
        return false;
    }

    $asset = $this->dataStorage->findOne('assets', ['_id' => $params['id']]);
    $path = trim($asset['path'] ?? '', '/');

    if (!$asset || !$this->fileStorage->fileExists("uploads://{$path}")) {
        return false;
    }

    $url = $this->fileStorage->getURL("uploads://{$path}");
    $this->reroute($url);
});

$this->bindClass('Assets\\Controller\\Assets', '/assets');


// events

$this->on('app.layout.init', function() {

    $this->helper('menus')->addLink('modules', [
        'label'  => 'Assets',
        'icon'   => 'assets:icon.svg',
        'route'  => '/assets',
        'active' => false,
        'prio'   => 1
    ]);
});

$this->on('app.layout.assets', function(array &$assets) {
    $assets[] = ['src' => 'assets:assets/js/assets.js', 'type' => 'module'];
    $assets[] = ['src' => 'assets:assets/components/display-image.js', 'type' => 'module'];
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
