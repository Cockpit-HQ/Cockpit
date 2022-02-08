<?php

namespace App\Command\Env;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Output\OutputInterface;

class Create extends Command {

    protected static $defaultName = 'app:env:create';
    protected $app = null;

    public function __construct(\Lime\App $app) {
        $this->app = $app;
        parent::__construct();
    }

    protected function configure(): void {
        $this
            ->setHelp('This command creates a new app environment /.envs folder')
            ->addArgument('name', InputArgument::REQUIRED, 'What is the name of the new environment?');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int {

        $name = $input->getArgument('name');
        $fs = $this->app->helper('fs');

        if ($this->app->path("#root:.envs/{$name}")) {
            $output->writeln("<error>[error]</error> An environment with the name <info>{$name}</info> already exists!");
            return Command::FAILURE;
        }

        // create env folders
        $fs->mkdir("#root:.envs/{$name}/config");
        $fs->mkdir("#root:.envs/{$name}/storage/cache");
        $fs->mkdir("#root:.envs/{$name}/storage/data");
        $fs->mkdir("#root:.envs/{$name}/storage/tmp");
        $fs->mkdir("#root:.envs/{$name}/storage/uploads");

        $path = $this->app->path("#root:.envs/{$name}");
        $created = time();
        $instance = \Cockpit::instance($path);

        $user = [
            'active' => true,
            'user' => 'admin',
            'name' => 'Admin',
            'email' => 'admin@admin.com',
            'password' => $instance->hash('admin'),
            'i18n' => 'en',
            'role' => 'admin',
            'theme' => 'auto',
            '_modified' => $created,
            '_created' => $created
        ];

        $instance->dataStorage->save('system/users', $user);

        $output->writeln("<info>[✓]</info> Environment <info>{$name}</info> created!");
        return Command::SUCCESS;
    }
}