<?php

// Register helpers
$this->helpers['admin'] = 'App\\Helper\\Admin';
$this->helpers['eventStream'] = 'App\\Helper\\EventStream';
$this->helpers['menus'] = 'App\\Helper\\Menus';
$this->helpers['theme'] = 'App\\Helper\\Theme';
$this->helpers['twfa']  = 'App\\Helper\\TWFA';

// Register routes
$this->bindClass('App\\Controller\\Auth', '/auth');
$this->bindClass('App\\Controller\\Utils', '/utils');

$this->bind('/', function() {

    return $this->invoke('App\\Controller\\Dashboard', 'index');
});

// global event stream for long polling
$this->bind('/app-event-stream', function() {

    $now = time();
    $lastCheck = $this->helper('session')->read('app.eventstream.lastcheck', $now);

    $user = $this->helper('auth')->getUser();

    if (!$user) {
        return $this->stop(404);
    }

    $sessionId = md5(session_id());

    $this->helper('session')->write('app.eventstream.lastcheck', $now);
    $this->helper('session')->close();

    // auto-cleanup unrelevant events
    $this->helper('eventStream')->cleanup();

    if (strtotime('-5 minutes') > $lastCheck) {
        return [];
    }

    // get all events since last check
    $events = $this->helper('eventStream')->getEvents($lastCheck);

    // filter events
    $events = array_filter($events, function($event) use($user, $sessionId) {

        if (isset($event['options']['to'])) {

            if (is_array($event['options']['to']) && !in_array($user['_id'], $event['options']['to'])) {
                return false;
            } elseif ($event['options']['to'] != $user['_id']) {
                return false;
            }
        }

        if (isset($event['options']['sessionId'])) {

            if (is_array($event['options']['sessionId']) && !in_array($sessionId, $event['options']['sessionId'])) {
                return false;
            } elseif ($event['options']['sessionId'] != $sessionId) {
                return false;
            }
        }

        return true;
    });

    return $events;
});


// check + validate session time
$this->on('app.admin.request', function(Lime\Request $request) {

    $user = $this->helper('auth')->getUser();

    if (in_array($request->route, ['/check-session', '/app-event-stream'])) {

        $status = $user ? true : false;
        $start  = $this->helper('session')->read('app.session.start', 0);

        // check for inactivity: 90min by default
        if ($status && $start && ($start + $this->retrieve('session.lifetime', 5400) < time())) {
            $this->helper('auth')->logout();
            $status = false;
        }

        $this->bind('/check-session', function() use($status) {

            $csrf = $status ? $this->helper('csrf')->token('app.csrf') : null;

            return compact('status', 'csrf');

        }, $request->route == '/check-session');

        return;
    }

    // load i18n translation
    $i18n = $this->helper('i18n');
    $i18n->locale = $this->retrieve('i18n', 'en');

    $locale = $user && isset($user['i18n']) && $user['i18n'] ? $user['i18n'] : $i18n->locale;

    if ($locale !== 'en') {

        $i18n->locale = $locale;

        foreach ($this->retrieve('modules')->getArrayCopy() as $m) {

            $name = basename($m->_dir);
            $i18nPath = $this->path("#config:i18n/{$locale}/{$name}.php");

            if (!$i18nPath) $i18nPath = $this->path("{$name}:i18n/{$locale}.php");
            if (!$i18nPath) continue;

            $i18n->load($i18nPath, $locale);
        }
    }

    $this->trigger('app.admin.i18n.load', [$locale, $i18n]);

    $this->bind('/app.i18n.data.js', function() use($locale) {

        $this->helper('session')->close();
        $this->response->mime = 'js';

        $data = json_encode(new ArrayObject($this->helper('i18n')->data($locale)));

        return <<<SCRIPT
            if (window.i18n) {
                window.i18n.register($data);
            }
        SCRIPT;
    });

    if (!$user) {
        return;
    }

    // update session time
    $this->helper('session')->write('app.session.start', time());
}, 1000);


/**
 * handle after request
 */
$this->on('after', function() {

    // prevent possible clickjacking via iframe layer
    if ($this->response->mime === 'html') {
        $this->response->headers['X-Frame-Options'] = 'SAMEORIGIN';
    }

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

});
