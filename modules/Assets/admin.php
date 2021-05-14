<?php

// Register routes
$this->bindClass('Assets\\Controller\\Assets', '/assets');

$this->helper('menus')->addLink('modules', [
    'label'  => 'Assets',
    'icon'   => 'assets:icon.svg',
    'route'  => '/assets',
    'active' => false
]);