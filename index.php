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
$APP_DIR = __DIR__;
$APP_DOCUMENT_ROOT = realpath($_SERVER['DOCUMENT_ROOT'] ?? __DIR__);

# make sure that $_SERVER['DOCUMENT_ROOT'] is set correctly
if (!str_starts_with($APP_DIR, $APP_DOCUMENT_ROOT) && isset($_SERVER['SCRIPT_NAME'])) {
    $APP_DOCUMENT_ROOT = str_replace(dirname($_SERVER['SCRIPT_NAME']), '', $APP_DIR);
}

// Support php cli-server: e.g. php -S localhost:8080 index.php
if (PHP_SAPI == 'cli-server') {

    $file  = $_SERVER['SCRIPT_FILENAME'];
    $path  = pathinfo($file);
    $index = realpath($path['dirname'].'/index.php');

    /* "dot" routes (see: https://bugs.php.net/bug.php?id=61286) */
    $_SERVER['PATH_INFO'] = explode('?', $_SERVER['REQUEST_URI'] ?? '')[0];

    /* static files (e.g. assets/app/css/style.css) */
    if (is_file($file) && $path['extension'] != 'php') {
        return false;
    }

    /* index files (eg. install/index.php) */
    if ($index !== __FILE__ && is_file($index)) {
        include($index);
        return;
    }

    // handle static space storage files
    if (str_starts_with($_SERVER['PATH_INFO'], '/:') && str_contains($_SERVER['PATH_INFO'], '/storage/')) {

        $spaceFilePath = APP_SPACES_DIR.'/'.trim(substr($_SERVER['PATH_INFO'], 2), '/');
        $path  = pathinfo($spaceFilePath);

        if (is_file($spaceFilePath)) {

            if ($path['extension'] === 'php') {
                include($spaceFilePath);
            } else {

                $mimeType = (new finfo(FILEINFO_MIME_TYPE))->file($spaceFilePath);

                header('Content-Description: File Transfer');
                header("Content-Type: {mimeType}"); // Change the MIME type as needed
                header('Expires: 0');
                header('Cache-Control: must-revalidate');
                header('Pragma: public');
                header('Content-Length: ' . filesize($spaceFilePath));

                $fp = fopen($spaceFilePath, 'rb');
                fpassthru($fp);
                fclose($fp);
            }

            exit;
        }
    }

    $APP_BASE = '';
    $APP_BASE_URL = '';
    $APP_BASE_ROUTE  = $APP_BASE_URL;
    $APP_ROUTE = $_SERVER['PATH_INFO'];

} else {

    $APP_BASE        = trim(str_replace($APP_DOCUMENT_ROOT, '', $APP_DIR), DIRECTORY_SEPARATOR);
    $APP_BASE_URL    = strlen($APP_BASE) ? "/{$APP_BASE}": $APP_BASE;
    $APP_BASE_ROUTE  = $APP_BASE_URL;
    $APP_ROUTE       = preg_replace('#'.preg_quote($APP_BASE_URL, '#').'#', '', parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), 1);
}

$APP_SPACE = null;

// support /:space/* to load custom cockpit instance from /.spaces/*
if ($APP_ROUTE && str_starts_with($APP_ROUTE, '/:')) {

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
define('APP_API_REQUEST', str_starts_with($APP_ROUTE, '/api/') ? 1 : 0);

$appOptions = [
    'app_space' => $APP_SPACE,
    'base_route' => $APP_BASE_ROUTE,
    'base_url' => $APP_BASE_URL
];

if ($APP_SPACE) {

    $masterConfig = [];

    if (file_exists("{$APP_DIR}/config/config.php")) {
        $masterConfig = include("{$APP_DIR}/config/config.php");
    }

    if (isset($masterConfig['site_url']) && $masterConfig['site_url']) {
        $appOptions['site_url'] = $masterConfig['site_url'];
    }

    if (isset($masterConfig['app.name']) && $masterConfig['app.name']) {
        $appOptions['app.name'] = $masterConfig['app.name'];
    }
}

$app = Cockpit::instance($APP_SPACE_DIR, $appOptions);

$GLOBALS['APP'] = $app;

// handle exceptions
$app->on('error', function($error) {

    if (!isset($this->request)) {
        return;
    }

    //clean output buffer
    while (ob_get_level()) ob_end_clean();

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

$app->on('after', function () {

    /**
     * send some debug information in debug mode
     */

    if (!$this->retrieve('debug') || !$this->response) {
        return;
    }

    $DURATION_TIME = microtime(true) - APP_START_TIME;
    $MEMORY_USAGE  = memory_get_peak_usage(false) / 1024 / 1024;

    $this->response->headers['APP_DURATION_TIME'] = "{$DURATION_TIME}SEC";
    $this->response->headers['APP_MEMORY_USAGE'] = "{$MEMORY_USAGE}MB";
    $this->response->headers['APP_LOADED_FILES'] = count(get_included_files());

});

// run app
$app->trigger(APP_API_REQUEST ? 'app.api.request':'app.admin.request', [$request])->run($request->route, $request);
