<?php

namespace Content\Command\Field;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Output\OutputInterface;

class Rename extends Command {

    protected static $defaultName = 'content:field:rename';
    protected $app = null;

    public function __construct(\Lime\App $app) {
        $this->app = $app;
        parent::__construct();
    }

    protected function configure(): void {
        $this
            ->setHelp('This command renames a field in data items')
            ->addArgument('model', InputArgument::REQUIRED, 'Target model')
            ->addArgument('currentname', InputArgument::REQUIRED, 'Current field name')
            ->addArgument('newname', InputArgument::REQUIRED, 'New field name');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int {

        $model = $input->getArgument('model') ?? null;
        $currentName = $input->getArgument('currentname') ?? null;
        $newName = $input->getArgument('newname') ?? null;

        if (!$model || !$currentName || !$newName) {
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
                $this->app->dataStorage->renameField($collection, $currentName, $newName);
                break;

            case 'singleton':

                $collection = 'content/singletons';
                $this->app->dataStorage->renameField($collection, $currentName, $newName, ['_model' => $model]);
                break;

            default:
                $output->writeln("<error>[x] Model *{$model}* is not a collection or singleton</error>");
                return Command::FAILURE;
        }

        $output->writeln("<info>[✓]</info> Field *{$currentName}* renamed to *{$newName}* in {$model} items!");
        return Command::SUCCESS;
    }
}
