<?php

// Register Helpers
$this->helpers['api']       = 'System\\Helper\\Api';
$this->helpers['locales']   = 'System\\Helper\\Locales';
$this->helpers['license']   = 'System\\Helper\\License';
$this->helpers['log']       = 'System\\Helper\\Log';
$this->helpers['revisions'] = 'System\\Helper\\Revisions';
$this->helpers['system']    = 'System\\Helper\\System';
$this->helpers['spaces']    = 'System\\Helper\\Spaces';
$this->helpers['worker']    = 'System\\Helper\\Worker';

// events

$this->on('app.admin.init', function() {
    include(__DIR__.'/admin.php');
}, 500);

$this->on('app.api.request', function($request) {
    include(__DIR__.'/api.php');
}, 1000);

// load cli related code
$this->on('app.cli.init', function($cli) {
    $app = $this;
    include(__DIR__.'/cli.php');
});

$this->on('error', function($error, $exception = null) {

    try {

        if ($exception && $exception instanceof \App\Exception\AppNotification) {
            return;
        }

        $this->module('system')->log("System error: {$error['message']}", type: 'error', context: $error);

    } catch(Throwable $e) {}
});

// system api
$this->module('system')->extend([

    'spaceUrl' => function(?string $path = null): string {

        $url = $this->app->getSiteUrl(true);
        $space = $this->app->retrieve('app_space');

        if ($space) {
            $url .= "/:{$space}";
        }

        if ($path) {
            $url .= $path;
        }

        return $url;
    },

    'log' => function(string $message, string $channel = 'system', string $type = 'info', ?array $context = null) {

        $logger = $this->app->helper('log')->channel($channel);

        call_user_func_array([$logger, $type], [$message, $context]);
    },

    'verifyUser' => function(string $password) {

        $user = $this->app->helper('auth')->getUser();

        if (!$user) {
            return false;
        }

        $data = $this->app->dataStorage->findOne('system/users', ['_id' => $user['_id']], ['_id' => 1, 'password' => 1]);

        if (!$data || !password_verify($password, $data['password'])) {
            return false;
        }

        return true;
    }
]);
