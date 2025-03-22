<?php

namespace System\Command\Worker;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;

class Stop extends Command {

    protected static $defaultName = 'app:worker:stop';
    protected $app = null;

    public function __construct(\Lime\App $app) {
        $this->app = $app;
        parent::__construct();
    }

    protected function configure(): void {
        $this
            ->setHelp('This command stops job queue workers')
            ->addArgument('pid', InputArgument::OPTIONAL, 'Specific worker PID to stop')
            ->addOption('force', 'f', InputOption::VALUE_NONE, 'Force kill the workers');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int {

        $workers = $this->app->helper('worker')->getWorkerPIDFileData()['workers'];
        $specificPid = $input->getArgument('pid');
        $forceKill = $input->getOption('force');
        $signal = $forceKill ? 9 : 15; // SIGKILL (9) or SIGTERM (15)

        if (!count($workers)) {
            $output->writeln('<error>No workers are currently running</error>');
            return Command::FAILURE;
        }

        $stoppedCount = 0;
        $failedCount = 0;
        $stopped = [];

        foreach ($workers as $worker) {
            // Skip if not the requested PID (when specified)
            if ($specificPid !== null && $worker['pid'] != $specificPid) {
                continue;
            }

            $pid = $worker['pid'];
            $startTime = date('Y-m-d H:i:s', $worker['start']);

            $output->writeln(sprintf(
                '<info>Stopping worker with PID %d (started: %s)</info>',
                $pid,
                $startTime
            ));

            $success = $this->stopProcess($pid, $signal);

            if ($success) {
                $output->writeln(sprintf('<info>Worker %d stopped successfully</info>', $pid));
                $stopped[] = $pid;
                $stoppedCount++;
            } else {
                $output->writeln(sprintf('<error>Failed to stop worker %d</error>', $pid));
                $failedCount++;
            }
        }

        if (count($stopped)) {
            $this->app->helper('worker')->removeWorkerPID($stopped);
        }

        // Summary
        if ($specificPid !== null) {
            if ($stoppedCount === 0) {
                $output->writeln(sprintf('<error>No worker with PID %d found or could be stopped</error>', $specificPid));
                return Command::FAILURE;
            }
        } else {
            $output->writeln(sprintf(
                '<info>Summary: %d worker(s) stopped, %d failed</info>',
                $stoppedCount,
                $failedCount
            ));
        }

        return $stoppedCount > 0 ? Command::SUCCESS : Command::FAILURE;
    }

    protected function stopProcess($pid, $signal = 15) {
        return $this->app->helper('worker')->stopProcess($pid, $signal);
    }

}
