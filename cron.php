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

// is web based cron execution?
if (!APP_CLI) {

    $startTime = time();

    if (session_status() === \PHP_SESSION_ACTIVE) {
        session_write_close();
    }

    ignore_user_abort(true);

    header('Content-Type: application/json');
    header('Cache-Control: no-cache, must-revalidate');

    $maxExecutionTime = intval(_ini_get('max_execution_time', 30));

    if ($maxExecutionTime <= 0) {
        $maxExecutionTime = 3600; // If unlimited, use a reasonable max
    }

    // Use 80% of max time as a safety buffer
    $maxExecutionTime = floor($maxExecutionTime * 0.8);
    $workers = $master->helper('worker')->getWorkerPIDFileData()['workers'];
    $webworker = array_find($workers, fn($worker) => $worker['mode'] === 'web');

    if ($webworker) {

        if (time() - $webworker['start'] < $maxExecutionTime) {
            die('{"info": "Webcron already running"}');
        }

        $master->helper('worker')->removeWorkerPID($webworker['pid']);
    }

    $pid = getmypid();

    $master->helper('worker')->addWorkerPID($pid, 'web');

    echo('{"info": "Webcron started"}');
    flush();
    ob_clean();

    register_shutdown_function(function() use ($master, $pid) {
        $master->helper('worker')->removeWorkerPID($pid);
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
                die('{"info": "Webcron timeout"}');
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

        //echo $master->helper('utils')->formatSize(memory_get_usage())."\n";
    }

} catch (Throwable $e) {

    echo APP_CLI ? "Error: " . $e->getMessage() : json_encode(['error' => $e->getMessage()]);

} finally {

    if (!APP_CLI && isset($pid)) {
        $master->helper('worker')->removeWorkerPID($pid);
    }
}
