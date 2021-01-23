<?php

// Register Helpers
$this->helpers['api']      = 'Settings\\Helper\\Api';
$this->helpers['locales'] = 'Settings\\Helper\\Locales';

$this->on('app.admin.request', function() {
    include(__DIR__.'/admin.php');
});