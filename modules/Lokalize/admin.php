<?php

// Register routes
$this->bindClass('Lokalize\\Controller\\Projects', '/lokalize/projects');

$this->helper('menus')->addLink('modules', [
    'label'  => 'Lokalize',
    'icon'   => 'lokalize:icon.svg',
    'route'  => '/lokalize/projects',
    'active' => false
]);