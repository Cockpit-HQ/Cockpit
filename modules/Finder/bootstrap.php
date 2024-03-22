<?php

// load admin related code
$this->on('app.admin.init', function() {

    if ($this->retrieve('finder.disabled') === true) {
        return;
    }

    include(__DIR__.'/admin.php');

}, -1000);
