<?php

// Register routes
$this->bindClass('Assets\\Controller\\Assets', '/assets');

$this->helper('menus')->addLink('modules', [
    'label'  => 'Assets',
    'icon'   => 'assets:icon.svg',
    'route'  => '/assets',
    'active' => false
]);


// events
$this->on('app.layout.header', function(array &$assets) {
    $assets[] = ['src' => 'assets:assets/js/assets.js', 'type' => 'module'];
?>
<script> window.ASSETS_BASE_URL = '<?=rtrim($this->fileStorage->getURL('uploads://'), '/') ?>'; </script>
<?php
});