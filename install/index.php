<?php

function hasSQLiteSupport() {
    try {

        if (extension_loaded('pdo')) {
            $test = new PDO('sqlite::memory:');
            return true;
        }

    } catch (Exception $e) {}

    return false;
}

function ensureWritableStorageFolder($path) {
    try {
        $dir = __DIR__.'/../storage'.$path;
        if (!file_exists($dir)) {
            mkdir($dir, 0700, true);
            if ($path === '/data') {
                if (file_put_contents($dir.'/.htaccess', 'deny from all') === false) {
                    return false;
                }
            }
        }
        return is_writable($dir);
    } catch (Exception $e) {
        error_log($e);
        return false;
    }
}

// misc checks
$checks = array(
    'Php version >= 8.0.0'                              => (version_compare(PHP_VERSION, '8.0.0') >= 0),
    'Missing PDO extension with Sqlite support'         => hasSQLiteSupport(),
    'Curl extension not available'                      => extension_loaded('curl'),
    'Fileinfo extension not available'                  => extension_loaded('fileinfo'),
    'GD extension not available'                        => extension_loaded('gd'),
    'OpenSSL extension not available'                   => extension_loaded('openssl'),
    'Data folder is not writable: /storage/data'        => ensureWritableStorageFolder('/data'),
    'Cache folder is not writable: /storage/cache'      => ensureWritableStorageFolder('/cache'),
    'Temp folder is not writable: /storage/tmp'         => ensureWritableStorageFolder('/tmp'),
    'Thumbs folder is not writable: /storage/thumbs'    => ensureWritableStorageFolder('/thumbs'),
    'Uploads folder is not writable: /storage/uploads'  => ensureWritableStorageFolder('/uploads'),
);

$failed = [];

foreach ($checks as $info => $check) {
    if (!$check) $failed[] = $info;
}

$APP_SPACE_DIR = dirname(__DIR__);
$APP_SPACE = null;

// support ?space=myenv to install custom cockpit instance from /.spaces/*
if (isset($_GET['space']) && $_GET['space']) {

    $APP_SPACE = $_GET['space'];
    $spaceDir  = $APP_SPACE_DIR."/.spaces/{$APP_SPACE}";

    if (!file_exists($spaceDir)) {
        $failed[] = "Space :{$APP_SPACE}: does not exist!";
    } else {
        $APP_SPACE_DIR = $spaceDir;
    }
}

if (!count($failed)) {

    if (!class_exists('Cockpit')) {
        include (__DIR__.'/../bootstrap.php');
    }

    $app = Cockpit::instance($APP_SPACE_DIR, [
        'app_space' => $APP_SPACE
    ]);

    // check whether cockpit is already installed
    try {

        if ($app->dataStorage->getCollection('system/users')->count()) {

            header('Location: ../'.($APP_SPACE ? ":{$APP_SPACE}" : ""));
            exit;
        }

    } catch(Throwable $e) { }

    $created = time();

    $user = [
        'active' => true,
        'user' => 'admin',
        'name' => 'Admin',
        'email' => 'admin@admin.com',
        'password' => $app->hash('admin'),
        'i18n' => 'en',
        'role' => 'admin',
        'theme' => 'auto',
        '_modified' => $created,
        '_created' => $created
    ];

    $app->dataStorage->save('system/users', $user);

}

?><!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>System installation</title>
    <link rel="icon" type="image/png" href="../favicon.png">
    <link href="../modules/App/assets/css/app.css" type="text/css" rel="stylesheet">
    <script src="../modules/App/assets/vendor/kiss/lib.js" type="module"></script>
    <script>
        document.documentElement.setAttribute('data-theme', getComputedStyle(document.documentElement).getPropertyValue("--app-auto-theme").trim());
    </script>
</head>
<body class="kiss-flex kiss-flex-center kiss-flex-middle">


    <kiss-container size-small>

        <kiss-card class="kiss-padding-large kiss-align-center" theme="bordered contrast">

            <img class="kiss-margin-auto kiss-margin-large" src="../modules/App/assets/logo.svg" width="40" height="40" alt="logo">

            <?php if (count($failed)): ?>

                <h1>Installation failed</h1>

                <?php foreach ($failed as &$info): ?>
                <div class="kiss-margin-small">
                    🔥  &nbsp; <?php echo @$info;?> &nbsp; 🔥
                </div>
                <?php endforeach; ?>

                <div class="kiss-margin-large">
                    <a class="kiss-button kiss-width-1-1" href="?<?=implode('&', [time(), ($APP_SPACE ? "space={$APP_SPACE}" : "")])?>">Retry installation</a>
                </div>

            <?php else: ?>

                <h1>Installation completed</h1>

                <div class="kiss-text-monospace">
                    admin / admin
                </div>

                <div class="kiss-margin-large">
                    <a class="kiss-button kiss-button-primary kiss-width-1-1" href="../<?=($APP_SPACE ? ":{$APP_SPACE}" : "")?>" class="uk-button uk-button-large uk-button-primary uk-button-outline uk-width-1-1">Login now</a>
                </div>

            <?php endif; ?>

        </kiss-card>

    </kiss-container>

</body>
</html>
