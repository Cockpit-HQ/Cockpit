<?php

// Register Helpers
$this->helpers['api']     = 'System\\Helper\\Api';
$this->helpers['locales'] = 'System\\Helper\\Locales';
$this->helpers['system']  = 'System\\Helper\\System';

$this->on('app.admin.init', function() {
    include(__DIR__.'/admin.php');
}, 500);