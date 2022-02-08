<?php

namespace App\Command;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class FlushTmp extends Command {

    protected static $defaultName = 'app:flush:tmp';
    protected $app = null;

    public function __construct(\Lime\App $app) {
        $this->app = $app;
        parent::__construct();
    }

    protected function configure(): void {
        $this->setHelp('This command empties the /storage/tmp folder');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int {

        $dirs = ['#cache:','#tmp:'];

        foreach ($dirs as $dir) {

            $path = $this->app->path($dir);
            $files = new \RecursiveIteratorIterator(new \RecursiveDirectoryIterator($path), \RecursiveIteratorIterator::SELF_FIRST);

            foreach ($files as $file) {

                if (!$file->isFile()) continue;
                if (preg_match('/(\.gitkeep|\.gitignore|index\.html)$/', $file)) continue;

                @unlink($file->getRealPath());
            }

            $this->app->helper('fs')->removeEmptySubFolders($path);
        }

        if (function_exists('opcache_reset')) {
            opcache_reset();
        }

        $output->writeln('<info>[✓]</info> Tmp folder was flushed!');
        return Command::SUCCESS;
    }
}