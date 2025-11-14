<?php

namespace Content\Command\Index;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Output\OutputInterface;

class Remove extends Command {

    protected static $defaultName = 'content:index:remove';
    protected $app = null;

    public function __construct(\Lime\App $app) {
        $this->app = $app;
        parent::__construct();
    }

    protected function configure(): void {
        $this
            ->setHelp('This command removes an index from a model')
            ->addArgument('model', InputArgument::REQUIRED, 'Target model')
            ->addArgument('index', InputArgument::REQUIRED, 'Index name to remove');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int {

        $model = $input->getArgument('model') ?? null;
        $index = $input->getArgument('index') ?? null;

        if (!$model || !$index) {
            $output->writeln("<error>[x] model or index name is missing</error>");
            return Command::FAILURE;
        }

        $meta = $this->app->module('content')->model($model);

        if (!$meta) {
            $output->writeln("<error>[x] Model *{$model}* not found</error>");
            return Command::FAILURE;
        }

        if (!in_array($meta['type'], ['collection', 'tree'])) {
            $output->writeln("<error>[x] Model *{$model}* is not a collection or tree model</error>");
            return Command::FAILURE;
        }

        $collection = "content/collections/{$model}";
        $this->app->dataStorage->dropIndex($collection, $index);

        $output->writeln("<info>[✓]</info> Index {$index} removed!");
        return Command::SUCCESS;
    }
}
