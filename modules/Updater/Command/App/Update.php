<?php

namespace Updater\Command\App;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Output\OutputInterface;

class Update extends Command {

    protected static $defaultName = 'app:update';
    protected $app = null;

    public function __construct(\Lime\App $app) {
        $this->app = $app;
        parent::__construct();
    }

    protected function configure(): void {
        $this
            ->setHelp('This command updates Cockpit to the latest version')
            ->addArgument('target', InputArgument::OPTIONAL, 'What is the target release (e.g. core or pro')
            ->addArgument('version', InputArgument::OPTIONAL, 'Cockpit version');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int {

        $version = $input->getArgument('version') ?? 'master';
        $target = $input->getArgument('target') ?? 'core';

        if (!in_array($target, ['core', 'pro'])) {
            $target = 'core';
        }

        $output->writeln("Try to update to {$version} [{$target}]...");

        try {
            $this->app->helper('updater')->update($version, $target);
        } catch (\Exception $e) {
            $output->writeln("<error>[x] {$e->getMessage()}</error>");
            return Command::FAILURE;
        }

        $output->writeln('<info>[✓]</info> Cockpit updated!');
        return Command::SUCCESS;
    }
}
