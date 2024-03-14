<?php

// Register Helpers
$this->helpers['updater'] = 'Updater\\Helper\\Updater';

// load cli related code
$this->on('app.cli.init', function($cli) {
    $app = $this;
    include(__DIR__.'/cli.php');
});
