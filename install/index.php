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
    'Php version >= 7.4.0'                              => (version_compare(PHP_VERSION, '7.4.0') >= 0),
    'Missing PDO extension with Sqlite support'         => hasSQLiteSupport(),
    'GD extension not available'                        => extension_loaded('gd'),
    'MBString extension not available'                  => extension_loaded('mbstring'),
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

if (!count($failed)) {

    if (!class_exists('App')) {
        include (__DIR__.'/../bootstrap.php');
    }

    $app = APP::instance();

    // check whether cockpit is already installed
    try {

        if ($app->data->getCollection('system/users')->count()) {

            header('Location: ../');
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
        '_modified' => $created,
        '_created' => $created
    ];

    $app->data->save('system/users', $user);
}

?><!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>System installation</title>
    <link rel="icon" type="image/png" href="../favicon.png">
    <style>

        html {
            font-family: Inter, -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";;
            background: #121212;
            color: #fff;
            box-sizing: border-box;
            min-height: 100vh;
        }

        body {
            display: flex;
            justify-content: center;
            padding: 20px;
            text-align: center;
            box-sizing: border-box;
        }

        container {
            display: block;
            max-width: 100%;
            padding: 40px;
            border-radius: 4px;
        }

        ul {
            list-style: none;
            padding: 0;
        }

        ul li {
            padding: 5px 0;
            color: #636363;

            font-size: .85em;
            line-height: inherit;
            letter-spacing: .015em;
            text-decoration: none;
            text-transform: uppercase;
        }

        a {
            margin-top: 40px;
            border: none;
            overflow: visible;
            font: inherit;
            font-weight: bold;
            color: inherit;
            text-transform: none;
            display: inline-block;
            box-sizing: border-box;
            padding: 0 2em;
            vertical-align: middle;
            font-size: .65em;
            line-height: 4em;
            letter-spacing: .1em;
            text-align: center;
            text-decoration: none;
            text-transform: uppercase;
            color: #fff;
            background-color: #0e8fff;
            width: 100%;
        }

        .credentials {
            border: 1px #636363 solid;
            padding: 20px;
            border-radius: 4px;
            font-family: monospace;
        }

    </style>
</head>
<body>


    <container>

        <div>

            <img src="../logo.svg" width="40" height="40" alt="logo">

            <?php if (count($failed)): ?>

                <h1>Installation failed</h1>

                <ul>

                    <?php foreach ($failed as &$info): ?>
                    <li>
                        🔥  &nbsp; <?php echo @$info;?> &nbsp; 🔥 
                    </li>
                    <?php endforeach; ?>

                </ul>

                <div>
                    <a href="?<?php echo time();?>">Retry installation</a>
                </div>


            <?php else: ?>

                <h1>Installation completed</h1>

                <div>
                    <p class="credentials">admin / admin</p>
                </div>

                <div class="uk-margin-top">
                    <a href="../" class="uk-button uk-button-large uk-button-primary uk-button-outline uk-width-1-1">Login now</a>
                </div>

            <?php endif; ?>

        </div>

    </container>

</body>
</html>
