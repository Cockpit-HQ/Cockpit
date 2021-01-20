<?php

// Register Helpers
$this->helpers['acl']   = 'App\\Helper\\Acl';
$this->helpers['auth']  = 'App\\Helper\\Auth';
$this->helpers['csrf']  = 'App\\Helper\\Csrf';
$this->helpers['i18n']  = 'App\\Helper\\i18n';
$this->helpers['utils'] = 'App\\Helper\\Utils';

$this->on('app.admin.request', function() {
    include(__DIR__.'/admin.php');
});

include(__DIR__.'/functions.php');
include(__DIR__.'/events.php');