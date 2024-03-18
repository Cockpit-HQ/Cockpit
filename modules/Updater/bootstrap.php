<?php

// Register Helpers
$this->helpers['updater'] = 'Updater\\Helper\\Updater';


// load admin related code
$this->on('app.admin.init', function() {

    include(__DIR__.'/admin.php');

}, -1000);

// load cli related code
$this->on('app.cli.init', function($cli) {
    $app = $this;
    include(__DIR__.'/cli.php');
});
