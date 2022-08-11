<?php

namespace System\Command\Cache;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class Flush extends Command {

    protected static $defaultName = 'app:cache:flush';
    protected $app = null;

    public function __construct(\Lime\App $app) {
        $this->app = $app;
        parent::__construct();
    }

    protected function configure(): void {
        $this->setHelp('This command empties the /storage/tmp folder');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int {

        $this->app->helper('system')->flushCache();

        $output->writeln('<info>[✓]</info> Tmp folder was flushed!');
        return Command::SUCCESS;
    }
}
