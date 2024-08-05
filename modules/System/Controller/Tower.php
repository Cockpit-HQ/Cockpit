<?php

namespace System\Controller;

use App\Controller\App;
use Symfony\Component\Process\PhpExecutableFinder;
use Symfony\Component\Process\Process;

class Tower extends App {

    protected function before() {

        if (!$this->helper('acl')->isSuperAdmin()) {
            return $this->stop(401);
        }

        if (!$this->helper('spaces')->isMaster()) {
            return $this->stop(403);
        }

        $this->helper('session')->close();
    }

    public function index() {

        $isAvailable = function_exists('proc_open') && (new PhpExecutableFinder())->find();

        return $this->render('system:views/tower.php', compact('isAvailable'));
    }


    public function exec() {

        $this->hasValidCsrfToken(true);

        $command = trim($this->param('command', ''));

        if (!$command) {
            return $this->stop(['error' => 'Command is missing'], 412);
        }

        if (str_starts_with($command, 'tower ')) {
            $command = substr($command, 6);
        }

        $command = "tower {$command}";
        $phpBinaryPath = (new PhpExecutableFinder())->find();

        $process = Process::fromShellCommandline("$phpBinaryPath {$command} -n");
        $process->setPty(true);
        $process->run();

        $output = $process->getOutput();

        if (is_array($output)) {
            $output = implode("\n\r", $output);
        }

        return ['success' => true, 'output' => trim($output)];
    }

}
