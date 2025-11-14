<?php

namespace System\Command\Worker;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Output\OutputInterface;

class Start extends Command {

    protected static $defaultName = 'app:worker:start';
    protected $app = null;
    protected $pid = null;

    public function __construct(\Lime\App $app) {
        $this->app = $app;
        parent::__construct();
    }

    protected function configure(): void {
        $this->setHelp('This command starts a job queue worker');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int {

        $this->pid = getmypid();

        $output->writeln('<info>Starting job queue worker...</info>');

        try {

            $this->app->helper('worker')->addWorkerPID($this->pid, 'cli');

            register_shutdown_function(fn() => $this->removePIDStatus());

            // Set up signal handling if available
            if (function_exists('pcntl_signal')) {
                pcntl_signal(SIGTERM, function() use ($output) {
                    $output->writeln('<comment>Received termination signal. Cleaning up...</comment>');
                    $this->removePIDStatus();
                    exit;
                });
                pcntl_signal(SIGINT, function() use ($output) {
                    $output->writeln('<comment>Received interrupt signal. Cleaning up...</comment>');
                    $this->removePIDStatus();
                    exit;
                });

                // Make sure we dispatch signals
                if (function_exists('pcntl_async_signals')) {
                    pcntl_async_signals(true);
                }
            }

            include(APP_DIR.'/cron.php');

        } catch (\Throwable $e) {
            $output->writeln(sprintf('<error>Error: %s</error>', $e->getMessage()));
            return Command::FAILURE;
        }

        return Command::SUCCESS;
    }

    protected function removePIDStatus() {
        $this->app->helper('worker')->removeWorkerPID($this->pid);
    }
}
