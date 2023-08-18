<?php

namespace Content\Command\Field;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Output\OutputInterface;

class Remove extends Command {

    protected static $defaultName = 'content:field:remove';
    protected $app = null;

    public function __construct(\Lime\App $app) {
        $this->app = $app;
        parent::__construct();
    }

    protected function configure(): void {
        $this
            ->setHelp('This command removes a field from data items')
            ->addArgument('model', InputArgument::REQUIRED, 'Target model')
            ->addArgument('field', InputArgument::REQUIRED, 'Field name to remove');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int {

        $model = $input->getArgument('model') ?? null;
        $field = $input->getArgument('field') ?? null;

        if (!$model || !$field) {
            $output->writeln("<error>[x] model or field name is missing</error>");
            return Command::FAILURE;
        }

        $meta = $this->app->module('content')->model($model);

        if (!$meta) {
            $output->writeln("<error>[x] Model *{$model}* not found</error>");
            return Command::FAILURE;
        }

        switch ($meta['type']) {

            case 'collection':
            case 'tree':

                $collection = "content/collections/{$model}";
                $this->app->dataStorage->removeField($collection, $field);
                break;

            case 'singleton':

                $collection = 'content/singletons';
                $this->app->dataStorage->removeField($collection, $field, ['_model' => $model]);
                break;

            default:
                $output->writeln("<error>[x] Model *{$model}* is not a collection or singleton</error>");
                return Command::FAILURE;
        }

        $output->writeln("<info>[✓]</info> Field {$field} removed in {$model} items!");
        return Command::SUCCESS;
    }
}
