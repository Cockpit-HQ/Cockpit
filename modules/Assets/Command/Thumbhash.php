<?php

namespace Assets\Command;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Helper\ProgressBar;

class Thumbhash extends Command {

    protected static $defaultName = 'assets:thumbhash:generate';
    protected $app = null;

    public function __construct(\Lime\App $app) {
        $this->app = $app;
        parent::__construct();
    }

    protected function configure(): void {
        $this->setHelp('This command generates thumb hashes for all image based assets');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int {

        if (function_exists('ini_set')) {
            ini_set('memory_limit', -1);
        }

        $cntGenerated = 0;
        $run = 0;
        $limit = 20;

        $progressBar = new ProgressBar($output, $this->app->dataStorage->count('assets', ['type' => 'image']));

        while (true) {

            $assets = $this->app->dataStorage->find('assets', [
                'fields' => ['_id' => 1, 'mime' => 1, 'thumbhash' => 1],
                'filter' => ['type' => 'image'],
                'skip' => $run * $limit,
                'limit' => $limit
            ]);

            foreach ($assets as &$asset) {

                $progressBar->advance();

                if ($asset['mime'] == 'image/svg+xml' || isset($asset['thumbhash'])) continue;

                $thumbpath = $this->app->helper('asset')->image([
                    'src' => $asset['_id'],
                    'width' => 100,
                    'height' => 100,
                    'mode' => 'bestFit'
                ], true);

                if (!$this->app->path("#{$thumbpath}")) continue;

                $thumbhash = implode('-', \Thumbhash::fromFile($this->app->path("#{$thumbpath}")));

                $data = ['_id' => $asset['_id'], 'thumbhash' => $thumbhash];

                $this->app->dataStorage->save('assets', $data);
                $this->app->fileStorage->delete($thumbpath);

                $cntGenerated++;
            }

            if (!count($assets) || count($assets) < $limit) {
                break;
            }

            $run += 1;
        }

        $progressBar->finish();

        $output->writeln("<info>[✓]</info> {$cntGenerated} thumb-hashes generated!");

        return Command::SUCCESS;
    }
}
