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

    $this->helper('theme')->vars('ffmpeg', $this->retrieve('assets/ffmpeg') ? true : false);
});

$this->on('app.layout.assets', function(array &$assets, $context) {
    if ($context === 'app:footer') $assets[] = ['src' => 'assets:assets/js/assets.js', 'type' => 'module'];
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

$this->on('spaces.config.create', function($config) {

    $cfg = $this['assets'];

    if (isset($cfg['vips']) || isset($cfg['ffmpeg'])) {

        $config['assets'] = [];

        if ($cfg['vips'] ?? false) $config['assets']['vips'] = $cfg['vips'];
        if ($cfg['ffmpeg'] ?? false) $config['assets']['ffmpeg'] = $cfg['ffmpeg'];
    }

});

$this->on('app.dashboard.widgets', function($widgets) {

    if (!$this->dataStorage->count('assets')) {
        return;
    }

    $widgets[] = [
        'name' => 'dashboard-assets-widget',
        'area' => 'tertiary',
        'component' => 'assets:assets/vue-components/dashboard-widget.js'
    ];

});
