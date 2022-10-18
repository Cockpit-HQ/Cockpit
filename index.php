<?php

// set default timezone
date_default_timezone_set('UTC');

define('APP_START_TIME', microtime(true));
define('APP_ADMIN', true);

// bootstrap app
require(__DIR__.'/bootstrap.php');

/*
 * Collect needed paths
 */
$APP_SPACE_DIR = __DIR__;
$APP_DIR = str_replace(DIRECTORY_SEPARATOR, '/', __DIR__);
$APP_DOCUMENT_ROOT = str_replace(DIRECTORY_SEPARATOR, '/', isset($_SERVER['DOCUMENT_ROOT']) ? realpath($_SERVER['DOCUMENT_ROOT']) : __DIR__);

# make sure that $_SERVER['DOCUMENT_ROOT'] is set correctly
if (strpos($APP_DIR, $APP_DOCUMENT_ROOT)!==0 && isset($_SERVER['SCRIPT_NAME'])) {
    $APP_DOCUMENT_ROOT = str_replace(dirname(str_replace(DIRECTORY_SEPARATOR, '/', $_SERVER['SCRIPT_NAME'])), '', $APP_DIR);
}

// Support php debug webserver: e.g. php -S localhost:8080 index.php
if (PHP_SAPI == 'cli-server') {

    $file  = $_SERVER['SCRIPT_FILENAME'];
    $path  = pathinfo($file);
    $index = realpath($path['dirname'].'/index.php');

    /* "dot" routes (see: https://bugs.php.net/bug.php?id=61286) */
    $_SERVER['PATH_INFO'] = explode('?', $_SERVER['REQUEST_URI'] ?? '')[0];

    /* static files (eg. assets/app/css/style.css) */
    if (is_file($file) && $path['extension'] != 'php') {
        return false;
    }

    /* index files (eg. install/index.php) */
    if (is_file($index) && $index != __FILE__) {
        include($index);
        return;
    }

    $APP_BASE = "";
    $APP_BASE_URL = "";
    $APP_BASE_ROUTE  = $APP_BASE_URL;
    $APP_ROUTE = $_SERVER['PATH_INFO'];

} else {

    $APP_BASE        = trim(str_replace($APP_DOCUMENT_ROOT, '', $APP_DIR), "/");
    $APP_BASE_URL    = strlen($APP_BASE) ? "/{$APP_BASE}": $APP_BASE;
    $APP_BASE_ROUTE  = $APP_BASE_URL;
    $APP_ROUTE       = preg_replace('#'.preg_quote($APP_BASE_URL, '#').'#', '', parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), 1);
}

$APP_SPACE = null;

// support /:space/* to load custom cockpit instance from /.spaces/*
if ($APP_ROUTE && substr($APP_ROUTE, 0, 2) == '/:') {

    $parts    = explode('/', $APP_ROUTE);
    $space    = substr($parts[1], 1);
    $spaceDir = APP_SPACES_DIR."/{$space}";

    if (file_exists($spaceDir)) {
        $APP_ROUTE = '/'.trim(implode('/', array_slice($parts, 2)), '/');
        $APP_BASE_URL .= str_replace(__DIR__, '', APP_SPACES_DIR)."/{$space}";
        $APP_BASE_ROUTE .= "/:{$space}";
        $APP_SPACE_DIR = $spaceDir;
        $APP_SPACE = $space;
    }
}

define('APP_SPACE', $APP_SPACE ?? false);

if ($APP_ROUTE == '') {
    $APP_ROUTE = '/';
}

define('APP_DOCUMENT_ROOT', $APP_DOCUMENT_ROOT);
define('APP_BASE_URL', $APP_BASE_URL);
define('APP_API_REQUEST', strpos($APP_ROUTE, '/api/') === 0 ? 1:0);

$app = Cockpit::instance($APP_SPACE_DIR, [
    'app_space' => $APP_SPACE,
    'base_route' => $APP_BASE_ROUTE,
    'base_url' => $APP_BASE_URL
]);

// handle exceptions
$app->on('error', function($error) {

    if (!isset($this->request)) {
        return;
    }

    if ($this['debug']) {
        $body = $this->request->is('ajax') || APP_API_REQUEST ? json_encode(['error' => $error['message'], 'file' => $error['file'], 'line' => $error['line']]) : $this->render('app:views/errors/500-debug.php', ['error' => $error]);
    } else {
        $body = $this->request->is('ajax') || APP_API_REQUEST ? '{"error": "500", "message": "system error"}' : $this->render('app:views/errors/500.php');
    }

    header('HTTP/1.0 500 Internal Server Error');
    echo $body;
});

// create request object
$request = Lime\Request::fromGlobalRequest([
    'route'      => $APP_ROUTE,
    'site_url'   => $app->retrieve('site_url'),
    'base_url'   => $APP_BASE_URL,
    'base_route' => $APP_BASE_ROUTE
]);

// CORS handling
if (APP_API_REQUEST) {

    $CORS_DEFAULTS = [
        'Access-Control-Allow-Origin' => '*',
        'Access-Control-Allow-Credentials' => 'true',
        'Access-Control-Max-Age' => '1000',
        'Access-Control-Allow-Headers' => 'X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding, API-KEY',
        'Access-Control-Allow-Methods' => 'PUT, POST, GET, OPTIONS, DELETE',
        'Access-Control-Expose-Headers' => ($app->retrieve('debug') ? '*' : 'false'),
    ];

    $CORS_CONFIG = $app->retrieve('cors', []);

    $app->on('before', function() use($CORS_DEFAULTS, $CORS_CONFIG) {

        foreach ($CORS_DEFAULTS as $key => $default) {
            $this->response->headers[$key] = $CORS_CONFIG[$key] ?? $default;
        }
    });

    if ($request->is('preflight')) {

        header('HTTP/1.1 200 OK CORS');
        header('Content-Type: application/json; charset=UTF-8');

        foreach ($CORS_DEFAULTS as $key => $default) {
            header("{$key}: ".($CORS_CONFIG[$key] ?? $default));
        }
        exit(0);
    }
}

// init
if (!APP_API_REQUEST) {
    $app->helper('session')->init();
    $app->trigger('app.admin.init');
} else {
    $app->trigger('app.api.init');
}

// run app
$app->trigger(APP_API_REQUEST ? 'app.api.request':'app.admin.request', [$request])->run($request->route, $request);
