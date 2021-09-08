<?php

// Register Helpers
$this->helpers['app']   = 'App\\Helper\\App';
$this->helpers['acl']   = 'App\\Helper\\Acl';
$this->helpers['async'] = 'App\\Helper\\Async';
$this->helpers['auth']  = 'App\\Helper\\Auth';
$this->helpers['csrf']  = 'App\\Helper\\Csrf';
$this->helpers['i18n']  = 'App\\Helper\\i18n';
$this->helpers['rspc']  = 'App\\Helper\\ResponseCache';


$this->module('app')->extend([

    'rescue' => function(callable $callback, $rescue = null, $report = true) {
        try {
            return $callback();
        } catch (Throwable $e) {
            if ($report) {
                $this->report($e);
            }

            return $rescue instanceof Closure ? $rescue($e) : $rescue;
        }
    },

    'report' => function() {
        // to be implemented
    }
]);


$this->on('app.admin.init', function() {
    include(__DIR__.'/admin.php');
}, 1000);

$this->on('app.api.request', function($request) {

    // simple response cache ?rspc=1
    if ($this->helper('rspc')->handle($request)) {
        return;
    }

    include(__DIR__.'/api.php');

}, 1000);

include(__DIR__.'/functions.php');

// events
$this->on('app.user.disguise', function(array &$user) {
    unset($user['password'], $user['apiKey'], $user['_reset_token']);
});