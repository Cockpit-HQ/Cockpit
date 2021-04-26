<?php

// Register routes
$this->bindClass('Collections\\Controller\\Items', 'collections/items');
$this->bindClass('Collections\\Controller\\Collections', 'collections');

$this->helper('menus')->addLink('modules', [
    'label'  => 'Collections',
    'icon'   => 'collections:icon.svg',
    'route'  => '/collections',
    'active' => true
]);
