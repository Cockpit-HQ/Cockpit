<?php

namespace Assets\Command;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Helper\ProgressBar;

class FixVisibilityPermissions extends Command {

    protected static $defaultName = 'assets:files:fixvisibility';
    protected $app = null;

    public function __construct(\Lime\App $app) {
        $this->app = $app;
        parent::__construct();
    }

    protected function configure(): void {
        $this->setHelp('This command sets the correct permissions for all assets files');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int {

        if (function_exists('ini_set')) {
            ini_set('memory_limit', -1);
        }

        $cntProcessed = 0;
        $run = 0;
        $limit = 30;

        $progressBar = new ProgressBar($output, $this->app->dataStorage->count('assets', ['type' => 'image']));

        while (true) {

            $assets = $this->app->dataStorage->find('assets', [
                'fields' => ['_id' => 1, 'mime' => 1, 'path' => 1],
                'filter' => ['type' => 'image'],
                'skip' => $run * $limit,
                'limit' => $limit
            ]);

            foreach ($assets as &$asset) {

                $progressBar->advance();

                $path = 'uploads://'.trim($asset['path'], '/');

                if ($this->app->fileStorage->fileExists($path)) {
                    $this->app->fileStorage->setVisibility($path, 'public');
                }

                $cntProcessed++;
            }

            if (!count($assets) || count($assets) < $limit) {
                break;
            }

            $run += 1;
        }

        $progressBar->finish();

        $output->writeln("<info>[✓]</info> {$cntProcessed} assets updated!");

        return Command::SUCCESS;
    }
}
