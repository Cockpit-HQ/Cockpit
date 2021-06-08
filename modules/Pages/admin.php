<?php

// Register routes
$this->bindClass('Pages\\Controller\\Menus', '/pages/menus');
$this->bindClass('Pages\\Controller\\Settings', '/pages/settings');
$this->bindClass('Pages\\Controller\\Utils', '/pages/utils');
$this->bindClass('Pages\\Controller\\Pages', '/pages');

$this->helper('menus')->addLink('modules', [
    'label'  => 'Pages',
    'icon'   => 'pages:icon.svg',
    'route'  => '/pages',
    'active' => false,
    'group'  => 'Content',
    'prio'   => 1
]);