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
    'Php version >= 8.1.0'                              => (version_compare(PHP_VERSION, '8.1.0') >= 0),
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

    } catch(Throwable $e) {

        $failed[] = $e->getMessage();

    }

}

?><!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>System installation</title>
    <link rel="icon" type="image/png" href="../favicon.png">
    <link href="../modules/App/assets/css/app.css" type="text/css" rel="stylesheet">
    <script src="../modules/App/assets/vendor/kiss/lib.js" type="module"></script>
    <style>

        .install-card {
            box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034), 0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06), 0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086), 0 100px 80px rgba(0, 0, 0, 0.12);
            border-radius: 4px;
            overflow: hidden;
            width: 450px;
        }
    </style>
    <script>
        document.documentElement.setAttribute('data-theme', getComputedStyle(document.documentElement).getPropertyValue("--app-auto-theme").trim());
    </script>
</head>
<body class="kiss-flex kiss-flex-center kiss-flex-middle">


    <kiss-container class="install-container">

        <kiss-card class="install-card kiss-padding-large animated <?=(count($failed) ? 'bounceInDown':'pulse')?>" theme="shadowed contrast">

            <div>
                <div class="kiss-flex kiss-margin">
                    <div class="kiss-margin-right">
                        <img src="../modules/App/assets/logo.svg" width="30" height="30"alt="logo">
                    </div>
                    <div class="kiss-flex-1 kiss-size-xsmall">
                        <strong>Cockpit</strong>
                        <div class="kiss-color-muted">Content Platform</div>
                    </div>
                </div>

                <hr class="kiss-margin-large-bottom">

                <?php if (count($failed)): ?>

                    <h1 class="kiss-size-3">
                        <icon class="kiss-color-danger kiss-margin-small-right" size="larger">block</icon>
                        Installation failed
                    </h1>

                    <kiss-card class="kiss-padding kiss-bgcolor-contrast kiss-flex kiss-flex-column kiss-margin">

                        <div class="kiss-text-caption kiss-text-bold kiss-color-muted kiss-margin-small">Reasons:</div>

                        <?php foreach ($failed as $info): ?>
                        <div class="kiss-text-monospace kiss-margin-small kiss-flex">
                            <span>🔥</span><div class="kiss-flex-1 kiss-size-small kiss-margin-small-left"><?=$info?></div>
                        </div>
                        <?php endforeach; ?>

                    </kiss-card>

                    <div class="kiss-margin-large-bottom kiss-color-muted">
                        Please try to fix the errors and retry the installation.
                    </div>

                    <div class="kiss-margin-large">
                        <a class="kiss-button kiss-width-1-1" href="?<?=implode('&', [time(), ($APP_SPACE ? "space={$APP_SPACE}" : "")])?>">Retry installation</a>
                    </div>

                <?php else: ?>

                    <h1 class="kiss-size-3">
                        <icon class="kiss-color-success kiss-margin-small-right" size="larger">verified</icon>
                        Installation completed
                    </h1>

                    <div class="kiss-text-caption kiss-text-bold kiss-color-muted kiss-margin">Next step:</div>

                    <div class="kiss-margin">Please login into Cockpit using the following credentials:</div>

                    <kiss-card class="kiss-text-monospace kiss-padding kiss-bgcolor-contrast kiss-flex kiss-flex-column kiss-margin">
                        <div><icon class="kiss-color-muted kiss-margin-right" size="larger">person</icon>admin</div>
                        <div><icon class="kiss-color-muted kiss-margin-right" size="larger">key</icon>admin</div>
                    </kiss-card>

                    <div class="kiss-margin-large-bottom kiss-color-muted">
                        Don't forget to change the credentials after your initial login to prevent bad things from bad people.
                    </div>

                    <div class="kiss-margin-large">
                        <a class="kiss-button kiss-button-primary kiss-width-1-1" href="../<?=($APP_SPACE ? ":{$APP_SPACE}" : "")?>" class="uk-button uk-button-large uk-button-primary uk-button-outline uk-width-1-1">Login now</a>
                    </div>

                <?php endif; ?>

            </div>

        </kiss-card>

    </kiss-container>

</body>
</html>
