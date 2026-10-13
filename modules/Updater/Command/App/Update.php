<?php

namespace Updater\Command\App;

use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;

#[AsCommand(name: 'app:update')]
class Update extends Command {

    protected $app = null;

    public function __construct(\Lime\App $app) {
        $this->app = $app;
        parent::__construct();
    }

    protected function configure(): void {
        $this
            ->setHelp('This command updates Cockpit to the latest version')
            ->addArgument('target', InputArgument::OPTIONAL, 'What is the target release (e.g. core or pro)')
            ->addArgument('version', InputArgument::OPTIONAL, 'Cockpit version')
            ->addOption('dry-run', null, InputOption::VALUE_NONE, 'Simulate the update without making changes');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int {

        $version = $input->getArgument('version') ?? 'master';
        $target = $input->getArgument('target') ?? 'core';
        $dryRun = $input->getOption('dry-run');

        if (!in_array($target, ['core', 'pro'])) {
            $target = 'core';
        }

        if ($dryRun) {
            return $this->executeDryRun($output, $version, $target);
        }

        $output->writeln("Try to update to {$version} [{$target}]...");

        $this->app->module('system')->log(
            "Update initiated via CLI to {$version} [{$target}]",
            'updater',
            'info',
            [
                'source' => 'cli',
                'version' => $version,
                'target' => $target,
                'from_version' => APP_VERSION,
            ]
        );

        try {
            $this->app->helper('updater')->update($version, $target);
        } catch (\Exception $e) {
            $output->writeln("<error>[x] {$e->getMessage()}</error>");
            return Command::FAILURE;
        }

        $output->writeln('<info>[✓]</info> Cockpit updated!');
        return Command::SUCCESS;
    }

    protected function executeDryRun(OutputInterface $output, string $version, string $target): int {

        $output->writeln('<comment>[Dry Run]</comment> Simulating update process...');
        $output->writeln('');

        $errors = [];
        $warnings = [];

        // Check 1: Current version
        $output->writeln("<info>Current version:</info> " . APP_VERSION);
        $output->writeln("<info>Target version:</info> {$version} [{$target}]");
        $output->writeln('');

        // Check 2: Latest release info
        $output->writeln('<comment>Checking latest release info...</comment>');
        $latestInfo = $this->app->helper('updater')->getLatestReleaseInfo();

        if ($latestInfo) {
            $output->writeln("<info>Latest available:</info> {$latestInfo['version']} ({$latestInfo['date']})");

            if (!$latestInfo['isNewVersionAvailable'] && $version === 'master') {
                $warnings[] = 'You are already on the latest version';
            }

            if (!empty($latestInfo['notices'])) {
                foreach ($latestInfo['notices'] as $notice) {
                    $warnings[] = $notice;
                }
            }
        }
        $output->writeln('');

        // Check 3: PHP version compatibility
        $output->writeln('<comment>Checking PHP compatibility...</comment>');
        $output->writeln("<info>Current PHP:</info> " . PHP_VERSION);

        if (isset($latestInfo['php']['min'])) {
            $requiredPhp = $latestInfo['php']['min'];
            $output->writeln("<info>Required PHP:</info> >= {$requiredPhp}");

            if (\version_compare(PHP_VERSION, $requiredPhp, '<')) {
                $errors[] = "PHP version {$requiredPhp} or higher is required";
            }
        }
        $output->writeln('');

        // Check 4: Write permissions
        $output->writeln('<comment>Checking write permissions...</comment>');
        $output->writeln("<info>App directory:</info> " . APP_DIR);

        if (!\is_writable(APP_DIR)) {
            $errors[] = 'App directory is not writable';
        } else {
            $output->writeln('<info>Status:</info> Writable');
        }
        $output->writeln('');

        // Check 5: Temp directory
        $output->writeln('<comment>Checking temp directory...</comment>');
        $tempPath = $this->app->path('#tmp:');
        $output->writeln("<info>Temp directory:</info> {$tempPath}");

        if (!\is_writable($tempPath)) {
            $errors[] = 'Temp directory is not writable';
        } else {
            $output->writeln('<info>Status:</info> Writable');
        }
        $output->writeln('');

        // Check 6: Download URL
        $releasesUrl = \rtrim($this->app->retrieve('updater/releasesUrl', 'https://files.getcockpit.com/releases'), '/');
        $zipUrl = "{$releasesUrl}/{$version}/cockpit-{$target}.zip";
        $output->writeln('<comment>Update source:</comment>');
        $output->writeln("<info>URL:</info> {$zipUrl}");
        $output->writeln('');

        // Summary
        $output->writeln('<comment>--- Summary ---</comment>');

        if (!empty($warnings)) {
            foreach ($warnings as $warning) {
                $output->writeln("<comment>[!] Warning:</comment> {$warning}");
            }
        }

        if (!empty($errors)) {
            foreach ($errors as $error) {
                $output->writeln("<error>[x] Error:</error> {$error}");
            }
            $output->writeln('');
            $output->writeln('<error>Dry run completed with errors. Update would fail.</error>');
            return Command::FAILURE;
        }

        $output->writeln('');
        $output->writeln('<info>[✓] Dry run completed successfully. Update should work.</info>');
        return Command::SUCCESS;
    }
}
