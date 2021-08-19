<?php

// load admin related code
$this->on('app.admin.init', function() {
    include(__DIR__.'/admin.php');
});