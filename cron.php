<?php

if (!class_exists('Cockpit')) {
    include(__DIR__.'/bootstrap.php');
}

function _ini_get($name, $default) {

    if (!function_exists('ini_get')) {
        return $default;
    }

    return ini_get($name);
}

$master = Cockpit::instance();
$debug  = $master->retrieve('debug',false);

// is web based cron execution?
if (!APP_CLI) {

    $startTime = time();
    $pid = getmypid();
    $maxExecutionTime = 30;

    header('Content-Type: application/json');
    header('Cache-Control: no-cache, must-revalidate');

    if (!$master->retrieve('worker/web/enabled',false)) {
        die('{"info": "Webworker disabled"}');
    }

    $webToken = $master->retrieve('worker/web/token');

    if ($webToken && ($_GET['token'] ?? '') !== $webToken) {
        die('{"info": "Not authorized"}');
    }

    if (session_status() === \PHP_SESSION_ACTIVE) {
        session_write_close();
    }

    ignore_user_abort(true);

    //    $maxExecutionTime = intval(_ini_get('max_execution_time', 30));
    //
    //    if ($maxExecutionTime <= 0) {
    //        $maxExecutionTime = 3600; // If unlimited, use a reasonable max
    //    }

    // Use 80% of max time as a safety buffer
    $maxExecutionTime = floor($maxExecutionTime * 0.8);
    $activeWebworker = array_find($master->helper('worker')->getWorkerPIDFileData()['workers'], fn($worker) => $worker['mode'] === 'web');

    if ($activeWebworker) {

        if (time() - $activeWebworker['start'] < $maxExecutionTime) {
            die('{"info": "Webworker already running"}');
        }

        $master->helper('worker')->removeWorkerPID($activeWebworker['pid']);
    }

    $master->helper('worker')->addWorkerPID($pid, 'web');

    echo('{"info": "Webworker started"}');
    flush();
    ob_clean();

    register_shutdown_function(function() use ($master, $pid, $webToken) {

        $master->helper('worker')->removeWorkerPID($pid);

        /**
         * auto-restart webworker
         */

        // Check if this was a clean shutdown (not a fatal error)
        if (error_get_last() === null && $master->retrieve('worker/web/restart',false)) {

            $restartCount = intval($_GET['restart'] ?? 0);

            // Wait a short moment to allow resources to be released
            usleep(500000); // 500ms delay

            // Get the current URL
            $url = $master->retrieve('site_url');
            $url .= ($_SERVER['REQUEST_URI'] ?? '/cron.php');
            $url .= '?restart='.($restartCount+1);

            if ($webToken) {
                $url .= "&token={$webToken}";
            }

            // Make an asynchronous request to restart
            $ch = curl_init($url);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_TIMEOUT, 1); // Very short timeout
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
            curl_exec($ch);
            curl_close($ch);
        }
    });

    if (function_exists('fastcgi_finish_request')) {
        fastcgi_finish_request();
    }
}

try {

    $spaces = [];

    $master->trigger('app.cron.init', []);
    $cycles = 0;

    while (true) {

        if (!APP_CLI) {

            $runtime = time() - $startTime;

            if (($runtime) > $maxExecutionTime) {
                die('{"info": "Webworker timeout"}');
            }
        }

        // load spaces
        if ($cycles == 0 || (APP_CLI && $cycles % 10 == 0)) {

            $_spaces = $master->helper('spaces')->spaces();

            foreach ($_spaces as $space) {
                if (isset($spaces[$space['name']])) continue;
                $instance = $master->helper('spaces')->space($space['name']);
                $spaces[$space['name']] = $instance;
                $instance->trigger('app.cron.init', []);
            }
        }

        $master->helper('worker')->process();

        foreach ($spaces as $name => $space) {
            $space->helper('worker')->process();
        }

        $cycles++;

        if (function_exists('gc_collect_cycles')) {
            gc_collect_cycles();
        }

        // avoid CPU hogging
        usleep(100000); // 100ms

        if (APP_CLI && $debug) {
            echo $master->helper('utils')->formatSize(memory_get_usage())."\n";
        }
    }

} catch (Throwable $e) {

    echo APP_CLI ? "Error: " . $e->getMessage() : json_encode(['error' => $e->getMessage()]);

} finally {

    if (!APP_CLI && isset($pid)) {
        $master->helper('worker')->removeWorkerPID($pid);
    }
}
