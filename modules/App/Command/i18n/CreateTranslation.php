<?php

namespace App\Command\i18n;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Output\OutputInterface;

class CreateTranslation extends Command {

    protected static $defaultName = 'app:i18n:create';
    protected $app = null;

    public function __construct(\Lime\App $app) {
        $this->app = $app;
        parent::__construct();
    }

    protected function configure(): void {
        $this
            ->setHelp('This command creates a language file')
            ->addArgument('locale', InputArgument::REQUIRED, 'What is the target language (e.g. de or fr?')
            ->addArgument('module', InputArgument::OPTIONAL, 'Create a language file for a module');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int {

        $locale = $input->getArgument('locale');
        $module = $input->getArgument('module');

        $extensions = ['php', 'js'];

        if ($module && $module == 'System') {
            $module = 'App';
        }

        if ($module && !($this->app->path("#addons:{$module}") || $this->app->path("#addons:{$module}"))) {
            $output->writeln("<error>[x] Module <<{$module}>> does not exists!</error>");
            return Command::FAILURE;
        }

        $modules = array_filter($this->app['modules']->getArrayCopy(), function($m) use($module) {

            $name = basename($m->_dir);

            if ($module && $module == 'App' && $name == 'System') {
                return true;
            }

            return !$module || $name == $module;
        });

        foreach ($modules as $m) {

            $dir= $m->_dir;
            $name = basename($m->_dir);

            $strings = ['@meta' => ['language' => \App\Helper\i18n::$locales[$locale] ?? strtoupper($locale)]];
            $iterator = new \RecursiveIteratorIterator(new \RecursiveDirectoryIterator($dir), \RecursiveIteratorIterator::SELF_FIRST);

            foreach ($iterator as $file) {

                if (!$file->isFile() || !in_array($file->getExtension(), $extensions)) continue;

                $contents = file_get_contents($file->getRealPath());

                preg_match_all('/(?:{{ t|\<\?=t|App\.i18n\.get|App\.ui\.notify)\((["\'])((?:[^\1]|\\.)*?)\1(,\s*(["\'])((?:[^\4]|\\.)*?)\4)?\)/', $contents, $matches);

                if (!isset($matches[2])) continue;

                foreach ($matches[2] as &$string) {
                    $strings[$string] = $string;
                }
            }

            if (count($strings)) {

                if ($name == 'System') {
                    $name = 'App';
                }

                if ($this->app->path("#config:i18n/{$name}/{$locale}.php")) {
                    $langfile = include($this->app->path("#config:i18n/{$name}/{$locale}.php"));
                    $strings  = array_merge($strings, $langfile);
                }

                ksort($strings);

                $this->app->helper('fs')->write("#config:i18n/{$name}/{$locale}.php", '<?php return '.$this->app->helper('utils')->var_export($strings, true).';');
            }

        }

        $output->writeln('<info>[✓]</info> Lang file(s) created!');
        return Command::SUCCESS;
    }
}
