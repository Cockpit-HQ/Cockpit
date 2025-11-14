<?php

namespace Content\Command\Index;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Output\OutputInterface;

class ListIndexes extends Command {

    protected static $defaultName = 'content:index:list';
    protected $app = null;

    public function __construct(\Lime\App $app) {
        $this->app = $app;
        parent::__construct();
    }

    protected function configure(): void {
        $this
            ->setHelp('This command lists indexes')
            ->addArgument('model', InputArgument::REQUIRED, 'Target model');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int {

        $model = $input->getArgument('model') ?? null;

        if (!$model) {
            $output->writeln("<error>[x] model or config is missing</error>");
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
        $indexes = $this->app->dataStorage->lstIndexes($collection);

        if (!count($indexes)) {
            $output->writeln("<info>No indexes found for model *{$model}*</info>");
        } else {

            foreach ($indexes as $index) {
                $output->writeln("<info>{$index['name']}</info>".($index['type'] ? " ({$index['type']})":''));
            }
        }

        return Command::SUCCESS;
    }
}
