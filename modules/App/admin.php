<?php

// Register helpers
$this->helpers['admin'] = 'App\\Helper\\Admin';
$this->helpers['twfa']  = 'App\\Helper\\TWFA';
$this->helpers['menus'] = 'App\\Helper\\Menus';
$this->helpers['theme'] = 'App\\Helper\\Theme';

// Register routes
$this->bindClass('App\\Controller\\Auth', '/auth');
$this->bindClass('App\\Controller\\Utils', '/utils');

$this->bind('/', function() {

    return $this->invoke('App\\Controller\\Dashboard', 'index');
});


// check + validate session time
$this->on('app.admin.request', function(Lime\Request $request) {

    $user = $this->helper('auth')->getUser();

    if ($request->route == '/check-session') {

        $status = $user ? true : false;
        $start  = $this->helper('session')->read('app.session.start', 0);

        // check for inactivity: 45min by default
        if ($status && $start && ($start + $this->retrieve('session.lifetime', 2700) < time())) {
            $this->helper('auth')->logout();
            $status = false;
        }

        $this->bind('/check-session', function() use($status) {
            return compact('status');
        });

        return;
    }

    if (!$user) {
        return;
    }

    // update session time
    $this->helper('session')->write('app.session.start', time());
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
                $this->response->body = $this->render('app:views/errors/404.php');
            }

            $this->trigger('app.request.error', ['404']);
            break;
    }

     /**
     * send some debug information
     * back to client (visible in the network panel)
     */
    if ($this['debug'] && $this->response) {

        /**
        * some system info
        */

        $DURATION_TIME = microtime(true) - APP_START_TIME;
        $MEMORY_USAGE  = memory_get_peak_usage(false)/1024/1024;

        $this->response->headers["APP_DURATION_TIME"] = "{$DURATION_TIME}SEC";
        $this->response->headers["APP_MEMORY_USAGE"] = "{$MEMORY_USAGE}MB";
        $this->response->headers["APP_LOADED_FILES"] = count(get_included_files());
    }
});