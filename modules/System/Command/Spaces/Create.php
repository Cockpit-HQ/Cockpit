<?php

namespace System\Command\Spaces;

use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Output\OutputInterface;

#[AsCommand(name: 'app:spaces:create')]
class Create extends Command {

    protected $app = null;

    public function __construct(\Lime\App $app) {
        $this->app = $app;
        parent::__construct();
    }

    protected function configure(): void {
        $this
            ->setHelp('This command creates a new app space /.spaces folder')
            ->addArgument('name', InputArgument::REQUIRED, 'What is the name of the new space?');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int {

        $name = $input->getArgument('name');

        if ($this->app->path("#app:.spaces/{$name}")) {
            $output->writeln("<error>[error]</error> A space with the name <info>{$name}</info> already exists!");
            return Command::FAILURE;
        }

        $this->app->helper('spaces')->create($name);

        $output->writeln("<info>[✓]</info> Space <info>{$name}</info> created!");
        return Command::SUCCESS;
    }
}
