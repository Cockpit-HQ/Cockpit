<?php


// load only on master instance + only for super admins
if ($this->helper('acl')->isSuperAdmin() && $this->helper('spaces')->isMaster()) {

    $this->bindClass('Updater\\Controller\\Updater', '/updater');

    $this->on('app.settings.collect', function($settings) {

        $settings['System'][] = [
            'icon' => 'updater:icon.svg',
            'route' => '/updater',
            'label' => 'Updater',
            'permission' => 'app/updater'
        ];
    });
}
