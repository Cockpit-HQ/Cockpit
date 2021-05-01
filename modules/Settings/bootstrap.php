<?php

// Register Helpers
$this->helpers['api']     = 'Settings\\Helper\\Api';
$this->helpers['locals'] = 'Settings\\Helper\\Locals';

$this->on('app.admin.init', function() {
    include(__DIR__.'/admin.php');
}, 500);