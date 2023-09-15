<?php

const APP_VERSION = '2.7.0';

if (!defined('APP_ADMIN')) define('APP_ADMIN', false);
if (!defined('APP_CLI')) define('APP_CLI', PHP_SAPI == 'cli');
if (!defined('APP_SPACES_DIR')) define('APP_SPACES_DIR', __DIR__.'/.spaces');

define('APP_DIR', str_replace(DIRECTORY_SEPARATOR, '/', __DIR__));

// Autoload vendor libs
require_once(__DIR__.'/lib/_autoload.php');

// load .env file if exists
DotEnv::load(APP_DIR);

class Cockpit {

    protected static array $instance = [];

    public static function instance(?string $envDir = null, array $config = []): Lime\App {

        if (!$envDir) {
            $envDir = APP_DIR;
        }

        if (!isset(static::$instance[$envDir])) {
            static::$instance[$envDir] = static::init($envDir, $config);
        }

        return static::$instance[$envDir];
    }

    protected static function init(?string $envDir = null, array $config = []): Lime\App {

        $appDir = APP_DIR;
        $app    = null;
        $cfg    = null;

        if (!$envDir) {
            $envDir = $appDir;
        }

        if ($appDir != $envDir) {
            DotEnv::load($envDir);
        }

        if (file_exists("{$envDir}/config/config.php")) {
            $cfg = include("{$envDir}/config/config.php");
        }

        $config = array_replace_recursive([

            'docs_root' => defined('APP_DOCUMENT_ROOT') ? APP_DOCUMENT_ROOT : null,
            'debug' => APP_CLI ? true : preg_match('/(localhost|::1|\.local)$/', $_SERVER['SERVER_NAME'] ?? ''),
            'app.name' => 'Cockpit',
            'app.version'  => APP_VERSION,
            'session.name' => md5($envDir),
            'sec-key' => 'c3b40c4c-db44-s5h7-a814-b5931a15e5e1', // change me in custom config
            'i18n' => 'en',

            'database' => [
                'server' => "mongolite://{$envDir}/storage/data",
                'options' => ['db' => 'app'],
                'driverOptions' => []
            ],
            'memory' => [
                'server' => "redislite://{$envDir}/storage/data/app.memory.sqlite",
                'options' => []
            ],
            'search' => [
                'server' => "indexlite://{$envDir}/storage/data",
                'options' => []
            ],

            'paths' => [
                '#app'     => __DIR__,
                '#root'    => $envDir,
                '#config'  => $envDir.'/config',
                '#modules' => $envDir.'/modules',
                '#addons'  => $envDir.'/addons',
                '#storage' => $envDir.'/storage',
                '#cache'   => $envDir.'/storage/cache',
                '#tmp'     => $envDir.'/storage/tmp',
                '#uploads' => $envDir.'/storage/uploads',
            ],

            'response' => [
                'cache' => [
                    'handler' => 'memory',
                    'duration' => 600,
                ]
            ]

        ], $cfg ?? [], $config);


        if ($config['debug']) {
            $config['app.version'] .= '-'.time();
        }

        $app = new Lime\App($config);

        // register paths
        foreach ($config['paths'] as $key => $path) {
            $app->path($key, $path);
        }

        // set app cache path
        $app->helper('cache')->setCachePath($app->path('#cache:') ?? sys_get_temp_dir());

        // file storage
        $app->service('fileStorage', function() use($config, $app) {

            $visibility = League\Flysystem\UnixVisibility\PortableVisibilityConverter::fromArray([
                'file' => [
                    'public' => 0644,
                    'private' => 0644,
                ],
                'dir' => [
                    'public' => 0755,
                    'private' => 0755,
                ],
            ]);

            $storages = array_replace_recursive([

                '#app' => [
                    'adapter' => 'League\Flysystem\Local\LocalFilesystemAdapter',
                    'args' => [$app->path('#app:')],
                    'mount' => true,
                    'url' => $app->pathToUrl('#app:', true)
                ],

                'root' => [
                    'adapter' => 'League\Flysystem\Local\LocalFilesystemAdapter',
                    'args' => [$app->path('#root:')],
                    'mount' => true,
                    'url' => $app->pathToUrl('#root:', true)
                ],

                'tmp' => [
                    'adapter' => 'League\Flysystem\Local\LocalFilesystemAdapter',
                    'args' => [$app->path('#tmp:'), $visibility],
                    'mount' => true,
                    'url' => $app->pathToUrl('#tmp:', true)
                ],

                'cache' => [
                    'adapter' => 'League\Flysystem\Local\LocalFilesystemAdapter',
                    'args' => [$app->path('#cache:'), $visibility],
                    'mount' => true,
                    'url' => $app->pathToUrl('#cache:', true)
                ],

                'uploads' => [
                    'adapter' => 'League\Flysystem\Local\LocalFilesystemAdapter',
                    'args' => [$app->path('#uploads:'), $visibility],
                    'mount' => true,
                    'url' => $app->pathToUrl('#uploads:', true)
                ],

                // local uploads folder
                '#uploads' => [
                    'adapter' => 'League\Flysystem\Local\LocalFilesystemAdapter',
                    'args' => [$app->path('#uploads:'), $visibility],
                    'mount' => true,
                    'url' => $app->pathToUrl('#uploads:', true)
                ],

            ], $config['fileStorage'] ?? []);

            $app->trigger('app.filestorage.init', [&$storages]);

            return new FileStorage($storages);
        });


        // nosql storage
        $app->service('dataStorage', function() use($config) {
            return new MongoHybrid\Client($config['database']['server'], $config['database']['options'], $config['database']['driverOptions']);
        });

        // key-value storage
        $app->service('memory', function() use($config) {

            return new MemoryStorage\Client($config['memory']['server'], array_merge([
                'key' => $config['sec-key']
            ],$config['memory']['options']));
        });

        // full-text search
        $app->service('search', function() use($config) {
            return new IndexHybrid\Manager($config['search']['server'], $config['search']['options']);
        });

        // mailer service
        $app->service('mailer', function() use($app, $config){

            $options = $config['mailer'] ?? [];

            if (is_string($options)) {
                parse_str($options, $options);
            }

            return new Mailer($options['transport'] ?? 'mail', $options);
        });

        $modulesPaths = [
            "{$appDir}/modules", # core
            "{$appDir}/addons"   # addons
        ];

        // if custom env dir
        if ($appDir != $envDir) {
            $modulesPaths[] = $config['paths']['#addons'];
        }

        // load modules
        self::loadModules($envDir, $app, $config, $modulesPaths);

        // handle exceptions
        if (!isset($GLOBALS['APP']) && (APP_CLI || APP_ADMIN)) {

            set_exception_handler(function($exception) use($app) {

                $error = [
                    'message' => $exception->getMessage(),
                    'file' => $exception->getFile(),
                    'line' => $exception->getLine(),
                    'trace' => array_slice($exception->getTrace(), 0, 4),
                ];

                $app->trigger('error', [$error, $exception]);
            });
        }

        // load config global bootstrap file
        if ($custombootfile = $app->path('#config:bootstrap.php')) {
            include($custombootfile);
        }

        $app->trigger('bootstrap');

        return $app;
    }

    protected static function loadModules($envDir, $app, $config, $modulesPaths) {

        if ($config['debug']) {
            $app->loadModules($modulesPaths);
        } else {

            $cacheFile = "{$config['paths']['#cache']}/modules.cache.php";

            if (!file_exists($cacheFile)) {

                $export  = ['version' => APP_VERSION, 'env' => $envDir, 'dirs' => [], 'autoload' => true];

                foreach ($modulesPaths as &$dir) {

                    if (!file_exists($dir)) continue;

                    $export['dirs'][$dir] = [];

                    foreach (new \DirectoryIterator($dir) as $module) {
                        if ($module->isFile() || $module->isDot()) continue;
                        $export['dirs'][$dir][] = $module->getRealPath();
                    }
                }

                $contents = $app->helper('utils')->var_export($export, true);
                file_put_contents($cacheFile, "<?php\n return {$contents};");
            }

            $cache = include($cacheFile);

            if (APP_VERSION !== $cache['version'] || $cache['env'] !== $envDir) {
                @unlink($cacheFile);
                $app->loadModules($modulesPaths);
            } else {

                foreach ($cache['dirs'] as $dir => $modules) {
                    foreach ($modules as $path) $app->loadModule($path, null);
                    $app['autoload']->append($dir);
                }
            }

        }
    }

}
