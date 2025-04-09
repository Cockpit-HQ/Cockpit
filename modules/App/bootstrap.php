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

    // check allowed origins
    $allowedOrigins = $this->retrieve('api.security.origins');

    if ($allowedOrigins) {

        $origin = $request->server['HTTP_REFERER'] ?? ($request->server['HTTP_ORIGIN'] ?? '');

        if ($origin) {

            $host = parse_url($origin, \PHP_URL_HOST);

            if ($host && !in_array($host, $allowedOrigins)) {

                $response = new \Lime\Response();
                $response->status = 412;
                $response->mime = 'json';
                $response->body = json_encode(['error' => 'Not allowed']);
                $response->flush();
                exit;
            }
        }
    }

    // simple response cache ?rspc=1
    if ($this->helper('rspc')->handle($request)) {
        return false;
    }

    // api rate limiter
    if ($this->retrieve('api.security.ratelimit')) {
        $this->helpers['apiRateLimiter'] = 'App\\Helper\\ApiRateLimiter';
        $this->helper('apiRateLimiter')->handle($request);
    }

    include(__DIR__.'/api.php');

}, 1000);

$this->on('app.user.disguise', function(array &$user) {
    unset($user['password'], $user['apiKey'], $user['_reset_token']);
});
