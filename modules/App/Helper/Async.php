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

    protected function isExecAvailable() {

        if (!$this->phpPath || in_array(strtolower(ini_get('safe_mode')), ['on', '1'], true) || (!function_exists('exec'))) {
            return false;
        }

        $disabled_functions = explode(',', ini_get('disable_functions'));

        return !in_array('exec', $disabled_functions) && strlen(trim(exec($this->phpPath.' -v')));
    }

    public function possible() {
        return $this->isExecAvailable() || function_exists('fsockopen');
    }

}
