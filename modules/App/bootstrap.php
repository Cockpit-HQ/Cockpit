<?php

// Register Helpers
$this->helpers['acl'] = 'App\\Helper\\Acl';
$this->helpers['auth'] = 'App\\Helper\\Auth';
$this->helpers['csrf'] = 'App\\Helper\\Csrf';
$this->helpers['i18n'] = 'App\\Helper\\i18n';
$this->helpers['utils'] = 'App\\Helper\\Utils';


// Register global functions

function _t($key, $alternative=null, $lang=null) {
    static $i18n;
    if (!$i18n) $i18n = APP::instance()->helper('i18n');
    return $i18n->get($key, $alternative, $lang);
}

$this->on('app.admin.request', function() {
    include(__DIR__.'/admin.php');
});

include(__DIR__.'/events.php');