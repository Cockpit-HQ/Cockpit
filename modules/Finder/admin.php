<?php

// Register routes
$this->bindClass('Finder\\Controller\\Buckets', '/finder/buckets');

// load only on master instance + only for super admins
if ($this->helper('acl')->isSuperAdmin() && $this->helper('spaces')->isMaster()) {

    $this->bindClass('Finder\\Controller\\Finder', '/finder');

    $this->on('app.settings.collect', function($settings) {

        $settings['System'][] = [
            'icon' => 'finder:icon.svg',
            'route' => '/finder',
            'label' => 'Finder',
            'permission' => 'app/finder'
        ];
    });
}


$this->on('app.layout.init', function() {
    $this->helper('theme')->vars('bucketsUrl', rtrim($this->fileStorage->getURL('uploads://'), '/').'/buckets');
});
