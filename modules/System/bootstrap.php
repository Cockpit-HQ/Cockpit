<?php

// Register Helpers
$this->helpers['api']     = 'System\\Helper\\Api';
$this->helpers['locales'] = 'System\\Helper\\Locales';
$this->helpers['log']     = 'System\\Helper\\Log';
$this->helpers['revisions'] = 'System\\Helper\\Revisions';
$this->helpers['system']  = 'System\\Helper\\System';

$this->on('app.admin.init', function() {
    include(__DIR__.'/admin.php');
}, 500);

$app->on('error', function($error, $exception) {

    try {
        $this->module('system')->log("System error: {$error['message']}", type: 'error', context: $error);
    } catch(Throwable $e) {}
});

// system api
$this->module('system')->extend([

    'log' => function(string $message, string $channel = 'system', string $type = 'info', ?array $context = null) {

        $logger = $this->app->helper('log')->channel($channel);

        call_user_func_array([$logger, $type], [$message, $context]);
    }
]);