<?php

// Register Helpers
$this->helpers['app']   = 'App\\Helper\\App';
$this->helpers['acl']   = 'App\\Helper\\Acl';
$this->helpers['async'] = 'App\\Helper\\Async';
$this->helpers['auth']  = 'App\\Helper\\Auth';
$this->helpers['csrf']  = 'App\\Helper\\Csrf';
$this->helpers['i18n']  = 'App\\Helper\\i18n';
$this->helpers['rspc']  = 'App\\Helper\\ResponseCache';
$this->helpers['jwt']   = 'App\\Helper\\JWT';

include_once(__DIR__.'/functions.php');

// events

$this->on('app.admin.init', function() {
    include(__DIR__.'/admin.php');
}, 1000);

$this->on('app.api.request', function($request) {

    // simple response cache ?rspc=1
    if ($this->helper('rspc')->handle($request)) {
        return false;
    }

    include(__DIR__.'/api.php');

}, 1000);

$this->on('app.user.disguise', function(array &$user) {
    unset($user['password'], $user['apiKey'], $user['_reset_token']);
});
