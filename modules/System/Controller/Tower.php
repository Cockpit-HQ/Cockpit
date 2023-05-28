<?php

namespace System\Controller;

use App\Controller\App;
use Symfony\Component\Process\PhpExecutableFinder;
use Symfony\Component\Process\Process;

class Tower extends App {

    protected function before() {

        if (!$this->isAllowed('system/tower')) {
            return $this->stop(401);
        }

        if (!$this->helper('spaces')->isMaster()) {
            return $this->stop(403);
        }

        $this->helper('session')->close();
    }

    public function index() {

        return $this->render('system:views/tower.php');
    }


    public function exec() {

        $command = trim($this->param('command', ''));

        if (!$command) {
            return $this->stop(['error' => 'Command is missing'], 412);
        }

        if (strpos($command, 'tower ') === 0) {
            $command = substr($command, 6);
        }

        $command = escapeshellcmd("tower {$command}");
        $phpBinaryPath = (new PhpExecutableFinder())->find();

        $process = Process::fromShellCommandline("$phpBinaryPath {$command} -n");
        $process->setPty(true);
        $process->run();

        $output = $process->getOutput();

        //exec("$phpBinaryPath tower $command  2>&1", $output, $retval);

        if (is_array($output)) {
            $output = implode("\n\r", $output);
        }

        return ['success' => true, 'output' => trim($output)];
    }

}
