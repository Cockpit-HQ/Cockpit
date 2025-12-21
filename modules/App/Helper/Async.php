<?php

namespace App\Helper;

use Symfony\Component\Process\PhpExecutableFinder;

/**
 * Async Helper class.
 * Use only if you know what you're doing!!!
 *
 * Usage:
 *
 * Cockpit::instance()->helper('async')->exec('
 *    sleep(10);
 *    file_put_contents(COCKPIT_DIR."/debug.txt", $test);
 * ', ['test' => 222]);
 */

class Async extends \Lime\Helper {

    public $phpPath = null;

    protected function initialize() {

        $this->phpPath = $this->app->retrieve('aysnc/php', 'php');

        if ($this->phpPath === 'php') {
            $this->phpPath = (new PhpExecutableFinder())->find();
        }
    }

    /**
     * Execute a script asynchronously.
     *
     * @param string $script The script to execute.
     * @param array $params The parameters to pass to the script.
     * @param int $maxTime The maximum execution time in seconds.
     * @return string The process ID.
     */
    public function exec($script, $params = [], $maxTime = 60) {

        $processId = uniqid('worker').'-'.(time() + $maxTime);
        $fs = $this->app->helper('fs');

        if ($path = $this->app->path($script)) {
            $script = file_get_contents($path);
        }

        $script = trim($script);

        if (substr($script, 0, 4) !== '<?php') {
            $script = "<?php ".$script;
        }

$appDir = APP_DIR;
$envDir = rtrim($this->app->path('#root:'), '/');

$envAppVars = [
    'app_space' => $this->app->retrieve('app_space'),
    'base_route' => $this->app->retrieve('base_route'),
    'base_url' => $this->app->retrieve('base_url')
];

$script = "<?php

if (isset(\$_GET['async'])) {
    \session_write_close();
}

// include cockpit
include('{$appDir}/bootstrap.php');

function Cockpit() {

    static \$instance;

    if (!isset(\$instance)) {
        \$instance = Cockpit::instance('{$envDir}', ".var_export($envAppVars, true).");
        \$GLOBALS['APP'] = \$instance;
    }

    return \$instance;
}

register_shutdown_function(function() {
    \$error = error_get_last();

    if (\$error && \$error['type'] === E_ERROR) {
        // Log fatal error
        Cockpit()->trigger('error', [\$error]);
    }

    // Delete worker script after execution
    if (file_exists(__FILE__))  unlink(__FILE__);
});

extract(".var_export($params, true).");

?>".$script;

        $file = "#storage:tmp/async/{$processId}.php";
        $fs->write($file, $script);
        $scriptfile = $this->app->path($file);

        $this->execInBackground($scriptfile);

        return $processId;
    }

    /**
     * Check if an asynchronous process has finished.
     *
     * @param string $processId The process ID.
     * @param mixed $error The error information (if any).
     * @return bool True if the process has finished, false otherwise.
     */
    public function finished($processId, &$error = null) {

        $processId = str_replace('..', '', $processId);
        $file = $this->app->path("#storage:tmp/async/{$processId}.php");

        if ($file) {
            $exit = explode('-', basename($file, '.php'))[1];

            if (time() > $exit) {

                // do something
                unlink($file);
                $error = 'timeout';
                return true;
            }

            return false;
        }

        return true;
    }

    /**
     * Execute a script in the background.
     *
     * @param string $scriptfile The script file to execute.
     * @return void
     */
    protected function execInBackground($scriptfile) {

        if (!$this->isExecAvailable()) {

            // fire and forget calling script
            $url   = $this->app->pathToUrl($scriptfile, true).'?async=true';
            $parts = parse_url($url);
            $fp    = fsockopen($parts['host'], isset($parts['port']) ? $parts['port']:80, $errno, $errstr, 30);
            $out   = '';

            if ($fp) {
                $out = "POST ".$parts['path']." HTTP/1.1\r\n";
                $out.= "Host: ".$parts['host']."\r\n";
                $out.= "Content-Type: application/x-www-form-urlencoded\r\n";
                $out.= "Content-Length: ".\strlen($parts['query'])."\r\n";
                $out.= "Connection: Close\r\n\r\n";
                if (isset($parts['query'])) $out.= $parts['query'];
            }

            fwrite($fp, $out);
            fclose($fp);
            return;
        }

        $cmd = $this->phpPath." -f $scriptfile";

        if (substr(php_uname(), 0, 7) == 'Windows') {
            pclose(popen("start /B ". $cmd, "r"));
        } else {
            exec($cmd . " > /dev/null &");
        }
    }

    /**
     * Check if the exec function is available.
     *
     * @return bool True if exec is available, false otherwise.
     */
    protected function isExecAvailable() {

        if (!$this->phpPath || in_array(strtolower(ini_get('safe_mode')), ['on', '1'], true) || (!function_exists('exec'))) {
            return false;
        }

        $disabled_functions = explode(',', ini_get('disable_functions'));

        return !in_array('exec', $disabled_functions) && strlen(trim(exec($this->phpPath.' -v')));
    }

    /**
     * Check if parallel extension is available.
     *
     * @return bool True if parallel is available, false otherwise.
     */
    public function hasParallel() {
        return extension_loaded('parallel');
    }

    /**
     * Check if an asynchronous process is possible.
     *
     * @return bool True if an asynchronous process is possible, false otherwise.
     */
    public function possible() {
        return $this->isExecAvailable() || function_exists('fsockopen');
    }

    /**
     * Execute one or multiple callables in parallel.
     *
     * @param callable|array $tasks The task(s) to execute.
     * @return array The results of the tasks.
     */
    public function batch($tasks) {

        if (!is_array($tasks)) {
            $tasks = [$tasks];
        }

        $results = [];

        if ($this->hasParallel()) {

            $runtimes = [];
            $futures = [];

            // Initialize runtimes
            // We use a simple pool strategy: create as many runtimes as tasks, up to a sane limit (e.g. 8)
            $limit = 8;
            $runtimeCount = min(count($tasks), $limit);

            for ($i = 0; $i < $runtimeCount; $i++) {
                $runtimes[] = new \parallel\Runtime(APP_DIR.'/bootstrap.php');
            }

            // Prepare environment info
            $appDir = APP_DIR;
            $envDir = rtrim($this->app->path('#root:'), '/');
            $envAppVars = [
                'app_space' => $this->app->retrieve('app_space'),
                'base_route' => $this->app->retrieve('base_route'),
                'base_url' => $this->app->retrieve('base_url')
            ];

            $globals = [
                'APP_SPACES_DIR' => defined('APP_SPACES_DIR') ? APP_SPACES_DIR : null,
                'APP_DOCUMENT_ROOT' => defined('APP_DOCUMENT_ROOT') ? APP_DOCUMENT_ROOT : null,
            ];

            $i = 0;
            foreach ($tasks as $key => $task) {

                $runtime = $runtimes[$i % count($runtimes)];
                $i++;

                $future = $runtime->run(function($task, $appDir, $envDir, $envAppVars, $globals) {

                    // Define globals
                    foreach ($globals as $k => $v) {
                        if ($v !== null && !defined($k)) {
                            define($k, $v);
                        }
                    }

                    // Bootstrap inside thread
                    if (!class_exists('Cockpit')) {
                        include($appDir.'/bootstrap.php');
                    }

                    $app = \Cockpit::instance($envDir, $envAppVars);

                    // Bind task to app instance if it's a closure
                    if ($task instanceof \Closure) {
                        $task = \Closure::bind($task, $app, $app);
                    }

                    return call_user_func($task, $app);

                }, [$task, $appDir, $envDir, $envAppVars, $globals]);

                $futures[$key] = $future;
            }

            // Collect results
            foreach ($futures as $key => $future) {
                try {
                    $results[$key] = $future->value();
                } catch (\Throwable $e) {
                    $results[$key] = $e;
                }
            }

        } else {

            // Sequential fallback
            foreach ($tasks as $key => $task) {
                try {
                    $results[$key] = call_user_func($task, $this->app);
                } catch (\Throwable $e) {
                    $results[$key] = $e;
                }
            }
        }

        return $results;
    }

}
