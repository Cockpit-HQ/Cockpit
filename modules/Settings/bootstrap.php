<?php

// Register Helpers
$this->helpers['locales']   = 'Settings\\Helper\\Locales';

$this->on('app.admin.request', function() {
    include(__DIR__.'/admin.php');
});