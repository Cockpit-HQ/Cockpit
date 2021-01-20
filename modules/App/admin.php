<?php

// Register helpers
$this->helpers['twfa'] = 'App\\Helper\\TWFA';

// Register routes
$this->bindClass('App\\Controller\\Auth', 'auth');
$this->bindClass('App\\Controller\\Roles', 'users/roles');
$this->bindClass('App\\Controller\\Users', 'users');
$this->bindClass('App\\Controller\\Settings', 'settings');
$this->bindClass('App\\Controller\\Utils', 'utils');

$this->bind('/', function() {

    return $this->invoke('App\\Controller\\Dashboard', 'index');
});


/**
 * handle after request
 */
$this->on('after', function() {

    // handle error pages
    switch ($this->response->status) {

        case 401:

            if ($this->request->is('ajax')) {
                $this->response->body = '{"error": "401", "message":"Unauthorized request"}';
            } else {
                $this->response->body = $this->render('app:views/errors/401.php');
            }

            $this->trigger('app.request.error', ['401']);
            break;

        case 404:

            if ($this->request->is('ajax')) {
                $this->response->body = '{"error": "404", "message":"Requested resource is not available"}';
            } else {

                if (!$this->helper('auth')->getUser()) {
                    $this->reroute('/auth/login?to='.$this->request->route);
                }

                $this->response->body = $this->render('app:views/errors/404.php');
            }

            $this->trigger('app.request.error', ['404']);
            break;
    }

     /**
     * send some debug information
     * back to client (visible in the network panel)
     */
    if ($this['debug'] && !headers_sent()) {

        /**
        * some system info
        */

        $DURATION_TIME = microtime(true) - APP_START_TIME;
        $MEMORY_USAGE  = memory_get_peak_usage(false)/1024/1024;

        header("APP_DURATION_TIME: {$DURATION_TIME}SEC");
        header("APP_MEMORY_USAGE: {$MEMORY_USAGE}MB");
        header("APP_LOADED_FILES: ".count(get_included_files()));
    }
});