<?php

namespace System\Command\Spaces;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Output\OutputInterface;

class Create extends Command {

    protected static $defaultName = 'app:spaces:create';
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
        $fs = $this->app->helper('fs');

        if ($this->app->path("#app:.spaces/{$name}")) {
            $output->writeln("<error>[error]</error> A space with the name <info>{$name}</info> already exists!");
            return Command::FAILURE;
        }

        // create env folders
        $fs->mkdir("#root:.spaces/{$name}/config");
        $fs->mkdir("#root:.spaces/{$name}/storage/cache");
        $fs->mkdir("#root:.spaces/{$name}/storage/data");
        $fs->mkdir("#root:.spaces/{$name}/storage/tmp");
        $fs->mkdir("#root:.spaces/{$name}/storage/uploads");

        $path = $this->app->path("#app:.spaces/{$name}");
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

        $output->writeln("<info>[✓]</info> Space <info>{$name}</info> created!");
        return Command::SUCCESS;
    }
}
