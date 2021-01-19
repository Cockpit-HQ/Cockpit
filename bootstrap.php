<?php

define('APP_DIR', str_replace(DIRECTORY_SEPARATOR, '/', __DIR__));

if (!defined('APP_CLI')) define('APP_CLI', PHP_SAPI == 'cli');
if (!defined('APP_ADMIN')) define('APP_ADMIN', false);

// check for custom defines
if (file_exists(__DIR__.'/config/defines.php')) {
    include(__DIR__.'/config/defines.php');
}

if (!defined('APP_ENV_DIR')) define('APP_ENV_DIR', APP_DIR);

// Autoload vendor libs
include(__DIR__.'/lib/vendor/autoload.php');

/*
 * Autoload from lib folder (PSR-0)
 */
spl_autoload_register(function($class) {
    $class_path = __DIR__.'/lib/'.str_replace('\\', '/', $class).'.php';
    if (file_exists($class_path)) include_once($class_path);
});

// load .env file if exists
DotEnv::load(__DIR__);

class APP {

    protected static $instance = null;

    public static function instance() {
        return static::$instance ?? static::init();
    }

    protected static function init() {

        $app = null;
        $config = null;

        if (file_exists(APP_ENV_DIR.'/config/config.php')) {
            $config = include(APP_ENV_DIR.'/config/config.php');
        }

        $config = array_replace_recursive([
            
            'docs_root' => defined('APP_DOCUMENT_ROOT') ? APP_DOCUMENT_ROOT : null,
            'debug' => APP_CLI ? true : preg_match('/(localhost|::1|\.local)$/', @$_SERVER['SERVER_NAME']),
            'app.name' => 'Cockpit',
            'app.version'  => '1.0',
            'session.name' => md5(APP_ENV_DIR),
            'sec-key' => 'c3b40c4c-db44-s5h7-a814-b5931a15e5e1',
            'i18n' => 'en',

            'database' => ['server' => 'mongolite://'.(APP_ENV_DIR.'/storage/data'), 'options' => ['db' => 'app'], 'driverOptions' => [] ],

            'paths' => [
                '#root'    => APP_ENV_DIR,
                '#config'  => APP_ENV_DIR.'/config',
                '#modules' => APP_ENV_DIR.'/modules',
                '#addons'  => APP_ENV_DIR.'/addons',
                '#storage' => APP_ENV_DIR.'/storage',
                '#uploads' => APP_ENV_DIR.'/storage/uploads',
            ]
        ], $config ?? []);

        define('APP_VERSION', $config['debug'] ? time():$config['app.version']);

        $app = new Lime\App($config);

        // register paths
        foreach ($config['paths'] as $key => $path) {
            $app->path($key, $path);
        }

        // nosql storage
        $app->service('data', function() use($config) {
            $client = new MongoHybrid\Client($config['database']['server'], $config['database']['options'], $config['database']['driverOptions']);
            return $client;
        });

        // mailer service
        $app->service('mailer', function() use($app, $config){
            
            $options = isset($config['mailer']) ? $config['mailer']:[];

            if (is_string($options)) {
                parse_str($options, $options);
            }

            $mailer = new \Mailer($options['transport'] ?? 'mail', $options);

            return $mailer;
        });

        $modulesPaths = [
            APP_DIR.'/modules',  # core
            APP_DIR.'/addons' # addons
        ];

        // if custon env dir
        if (APP_ENV_DIR != APP_ENV_DIR) {
            $modulesPaths[] = $config['paths']['#modules'];
            $modulesPaths[] = $config['paths']['#addons'];
        }

        // load modules
        $app->loadModules($modulesPaths);

        // load config global bootstrap file
        if ($custombootfile = $app->path('#config:bootstrap.php')) {
            include($custombootfile);
        }

        static::$instance = $app;

        return static::$instance;
    }

}