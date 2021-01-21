<?php


$this->on('app.admin.request', function() {
    include(__DIR__.'/admin.php');
});