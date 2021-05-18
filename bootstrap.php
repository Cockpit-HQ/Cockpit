<?php

define('APP_DIR', str_replace(DIRECTORY_SEPARATOR, '/', __DIR__));

if (!defined('APP_CLI')) define('APP_CLI', PHP_SAPI == 'cli');
if (!defined('APP_ADMIN')) define('APP_ADMIN', false);

if (!defined('APP_ENV_DIR')) define('APP_ENV_DIR', APP_DIR);

// check for custom defines
if (file_exists(APP_ENV_DIR.'/config/defines.php')) {
    include(APP_ENV_DIR.'/config/defines.php');
}

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
DotEnv::load(APP_ENV_DIR);

if (APP_ENV_DIR != APP_DIR) {
    DotEnv::load(APP_ENV_DIR);
}


class APP {

    protected static $instance = null;
    protected static $app = null;

    public static function instance(bool $clone = false): Lime\App {

        if (!static::$instance) {
            static::init();
            static::$app = clone static::$instance;
        }

        return !$clone ? static::$app : clone static::$instance;
    }

    protected static function init(): Lime\App {

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
            'memory'       => ['server' => 'redislite://'.(APP_ENV_DIR.'/storage/data/app.memory.sqlite'), 'options' => [] ],

            'paths' => [
                '#root'    => APP_ENV_DIR,
                '#config'  => APP_ENV_DIR.'/config',
                '#modules' => APP_ENV_DIR.'/modules',
                '#addons'  => APP_ENV_DIR.'/addons',
                '#storage' => APP_ENV_DIR.'/storage',
                '#tmp'     => APP_ENV_DIR.'/storage/tmp',
                '#uploads' => APP_ENV_DIR.'/storage/uploads',
            ]
        ], $config ?? []);

        define('APP_VERSION', $config['debug'] ? time():$config['app.version']);

        $app = new Lime\App($config);

        // register paths
        foreach ($config['paths'] as $key => $path) {
            $app->path($key, $path);
        }

        // file storage
        $app->service('fileStorage', function() use($config, $app) {

            $storages = array_replace_recursive([

                'root' => [
                    'adapter' => 'League\Flysystem\Local\LocalFilesystemAdapter',
                    'args' => [$app->path('#root:')],
                    'mount' => true,
                    'url' => $app->pathToUrl('#root:', true)
                ],

                'tmp' => [
                    'adapter' => 'League\Flysystem\Local\LocalFilesystemAdapter',
                    'args' => [$app->path('#tmp:')],
                    'mount' => true,
                    'url' => $app->pathToUrl('#tmp:', true)
                ],

                'uploads' => [
                    'adapter' => 'League\Flysystem\Local\LocalFilesystemAdapter',
                    'args' => [$app->path('#uploads:')],
                    'mount' => true,
                    'url' => $app->pathToUrl('#uploads:', true)
                ],

            ], $config['fileStorage'] ?? []);

            $app->trigger('app.filestorage.init', [&$storages]);

            $filestorage = new FileStorage($storages);

            return $filestorage;
        });


        // nosql storage
        $app->service('dataStorage', function() use($config) {
            $client = new MongoHybrid\Client($config['database']['server'], $config['database']['options'], $config['database']['driverOptions']);
            return $client;
        });

        // key-value storage
        $app->service('memory', function() use($config) {
            $client = new MemoryStorage\Client($config['memory']['server'], $config['memory']['options']);
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

        $app->trigger('bootstrap');

        static::$instance = $app;

        return static::$instance;
    }

}