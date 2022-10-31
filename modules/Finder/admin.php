<?php

// Register routes
$this->bindClass('Finder\\Controller\\Finder', '/finder');


$this->on('app.settings.collect', function($settings) {

    $settings['System'][] = [
        'icon' => 'finder:icon.svg',
        'route' => '/finder',
        'label' => 'Finder',
        'permission' => 'app/finder'
    ];
});
