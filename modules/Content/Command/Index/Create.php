<?php

namespace Content\Command\Index;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Output\OutputInterface;

class Create extends Command {

    protected static $defaultName = 'content:index:create';
    protected $app = null;

    public function __construct(\Lime\App $app) {
        $this->app = $app;
        parent::__construct();
    }

    protected function configure(): void {
        $this
            ->setHelp('This command create a new index')
            ->addArgument('model', InputArgument::REQUIRED, 'Target model')
            ->addArgument('config', InputArgument::REQUIRED, 'Index config')
            ->addArgument('options', InputArgument::OPTIONAL, 'Additional index options');

    }

    protected function execute(InputInterface $input, OutputInterface $output): int {

        $model = $input->getArgument('model') ?? null;
        $config = $input->getArgument('config') ?? null;
        $options = $input->getArgument('options') ?? [];

        if (!$model || !$config) {
            $output->writeln("<error>[x] model or config is missing</error>");
            return Command::FAILURE;
        }

        if (is_string($config)) {

            try {
                $config = json5_decode($config, true);
            } catch(\Throwable $e) {
                $output->writeln("<error>[x] config paramater is not valid json</error>");
                return Command::FAILURE;
            }
        }

        if (is_string($options)) {

            try {
                $options = json5_decode($options, true);
            } catch(\Throwable $e) {
                $output->writeln("<error>[x] options parameter is not valid json</error>");
                return Command::FAILURE;
            }
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
        $indexName = $this->app->dataStorage->createIndex($collection, $config, $options);

        $output->writeln("<info>[✓]</info> Index {$indexName} created successfully!");
        return Command::SUCCESS;
    }
}
