<?php

namespace System\Command\App;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Output\OutputInterface;

class Update extends Command {

    protected static $defaultName = 'app:update';
    protected $app = null;

    public function __construct(\Lime\App $app) {
        $this->app = $app;
        parent::__construct();
    }

    protected function configure(): void {
        $this
            ->setHelp('This command updates Cockpit to the latest version')
            ->addArgument('target', InputArgument::OPTIONAL, 'What is the target release (e.g. core or pro')
            ->addArgument('version', InputArgument::OPTIONAL, 'Cockpit version');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int {

        $version = $input->getArgument('version') ?? 'master';
        $target = $input->getArgument('target') ?? 'core';

        if (!in_array($target, ['core', 'pro'])) {
            $target = 'core';
        }

        if (!is_writable(APP_DIR)) {
            $output->writeln("<error>[x] app root is not writable!</error>");
            return Command::FAILURE;
        }

        $zipUrl = "https://files.getcockpit.com/releases/{$version}/cockpit-{$target}.zip";

        $output->writeln("Download Cockpit release from {$zipUrl}...");

        try {
            $this->update($zipUrl, "cockpit-{$target}");
        } catch (\Exception $e) {
            $output->writeln("<error>[x] {$e->getMessage()}</error>");
            return Command::FAILURE;
        }

        $output->writeln('<info>[✓]</info> Cockpit updated!');
        return Command::SUCCESS;
    }

    protected function update(string $zipUrl, string $zipRoot = '/'): bool {

        $targetPath = APP_DIR;

        $fs = $this->app->helper('fs');
        $tmppath = $this->app->path('#tmp:');
        $zipname = null;
        $zipRoot = trim($zipRoot, '/');

        // download

        $zipname = basename($zipUrl);

        if (!file_put_contents("{$tmppath}/{$zipname}", $handle = @fopen($zipUrl, 'r'))) {
            throw new \Exception("Couldn't download {$zipUrl}!");
        }

        @fclose($handle);

        // extract zip contents

        @mkdir("{$tmppath}/update-{$zipname}", 0777);
        $zip = new \ZipArchive;

        if ($zip->open("{$tmppath}/{$zipname}") === true) {

            if (!$zip->extractTo("{$tmppath}/update-{$zipname}")) {
                throw new \Exception('Extracting zip file failed!');
            }

            $zip->close();

        } else {
            throw new \Exception('Open zip file failed!');
        }


        $fs->delete("{$tmppath}/update-{$zipname}/{$zipRoot}/config");
        $fs->delete("{$tmppath}/update-{$zipname}/{$zipRoot}/storage");

        // copy

        $fs->copy("{$tmppath}/update-{$zipname}/{$zipRoot}", $targetPath);

        // cleanup
        $fs->delete("{$tmppath}/{$zipname}");
        $fs->delete("{$tmppath}/update-{$zipname}");

        if (function_exists('opcache_reset')) {
            \opcache_reset();
        }

        return true;
    }
}
