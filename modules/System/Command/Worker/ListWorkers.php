<?php

namespace System\Command\Worker;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Helper\Table;

class ListWorkers extends Command {

    protected static $defaultName = 'app:worker:list';
    protected $app = null;

    public function __construct(\Lime\App $app) {
        $this->app = $app;
        parent::__construct();
    }

    protected function configure(): void {
        $this
            ->setDescription('List all active job queue workers')
            ->setHelp('This command lists all active job queue workers')
            ->addOption('all', 'a', InputOption::VALUE_NONE, 'Show all workers, including potentially inactive ones')
            ->addOption('mode', 'm', InputOption::VALUE_REQUIRED, 'Filter workers by mode (cli or web)');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int {

        $showAll = $input->getOption('all');
        $modeFilter = $input->getOption('mode');
        $workers = $this->app->helper('worker')->getWorkerPIDFileData()['workers'];

        if (!count($workers)) {
            $output->writeln('<info>No workers are currently running</info>');
            return Command::SUCCESS;
        }

        $activeWorkers = [];
        $inactiveWorkers = [];

        // Check each worker's status
        foreach ($workers as $worker) {
            // Apply mode filter if specified
            if ($modeFilter !== null && (!isset($worker['mode']) || $worker['mode'] !== $modeFilter)) {
                continue;
            }

            $isRunning = $this->app->helper('worker')->isProcessRunning($worker['pid']);

            // Format worker data for display
            $workerData = [
                'pid' => $worker['pid'],
                'mode' => $worker['mode'] ?? 'unknown',
                'started' => date('Y-m-d H:i:s', $worker['start']),
                'uptime' => $this->formatUptime(time() - $worker['start']),
                'status' => $isRunning ? 'running' : 'inactive'
            ];

            if ($isRunning) {
                $activeWorkers[] = $workerData;
            } else {
                $inactiveWorkers[] = $workerData;
            }
        }

        // Create and render the table
        $table = new Table($output);
        $table->setHeaders(['PID', 'Mode', 'Started', 'Uptime', 'Status']);

        // Always show active workers
        foreach ($activeWorkers as $worker) {
            $table->addRow([
                $worker['pid'],
                $worker['mode'],
                $worker['started'],
                $worker['uptime'],
                '<info>' . $worker['status'] . '</info>'
            ]);
        }

        // Show inactive workers if requested
        if ($showAll && count($inactiveWorkers) > 0) {
            foreach ($inactiveWorkers as $worker) {
                $table->addRow([
                    $worker['pid'],
                    $worker['mode'],
                    $worker['started'],
                    $worker['uptime'],
                    '<error>' . $worker['status'] . '</error>'
                ]);
            }
        }

        // Display the table
        $output->writeln('');

        if (count($activeWorkers) === 0 && (!$showAll || count($inactiveWorkers) === 0)) {
            $output->writeln('<info>No matching workers found</info>');
            return Command::SUCCESS;
        }

        $table->render();

        // Display summary
        $output->writeln('');
        $output->writeln(sprintf('<info>%d active worker(s)</info>', count($activeWorkers)));

        if (count($inactiveWorkers) > 0) {
            if ($showAll) {
                $output->writeln(sprintf('<comment>%d inactive worker(s)</comment>', count($inactiveWorkers)));
            } else {
                $output->writeln(sprintf(
                    '<comment>%d inactive worker(s) not shown. Use --all to see them.</comment>',
                    count($inactiveWorkers)
                ));
            }
        }

        // Clean up inactive workers from the PID file
        if (count($inactiveWorkers) > 0) {
            // @todo
        }

        return Command::SUCCESS;
    }

    protected function formatUptime($seconds) {
        $days = floor($seconds / 86400);
        $hours = floor(($seconds % 86400) / 3600);
        $minutes = floor(($seconds % 3600) / 60);
        $secs = $seconds % 60;

        $uptime = '';

        if ($days > 0) {
            $uptime .= $days . 'd ';
        }

        if ($hours > 0 || $days > 0) {
            $uptime .= $hours . 'h ';
        }

        if ($minutes > 0 || $hours > 0 || $days > 0) {
            $uptime .= $minutes . 'm ';
        }

        $uptime .= $secs . 's';

        return $uptime;
    }

}
