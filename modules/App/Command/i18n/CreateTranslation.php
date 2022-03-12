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
            ->addArgument('lang', InputArgument::REQUIRED, 'What is the target language (e.g. de or fr?')
            ->addArgument('module', InputArgument::OPTIONAL, 'Create a language file for a module');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int {

        $lang = $input->getArgument('lang');
        $module = $input->getArgument('module');

        $extensions = ['php', 'js'];
        $strings    = [];

        if ($module) {

            $path = $this->app->path("#addons:{$module}");

            if (!$path) {
                $output->writeln("<error>[x] Module <<{$module}>> does not exists!</error>");
                return Command::FAILURE;
            }

            $dirs = [$path];

        } else {
            $dirs = [$this->app->path('#modules:')];
        }

        foreach ($dirs as $dir) {

            $iterator = new \RecursiveIteratorIterator(new \RecursiveDirectoryIterator($dir), \RecursiveIteratorIterator::SELF_FIRST);

            foreach ($iterator as $file) {

                if (in_array($file->getExtension(), $extensions)) {

                    $contents = file_get_contents($file->getRealPath());

                    preg_match_all('/(?:{{ t|\<\?=t|App\.i18n\.get|App\.ui\.notify)\((["\'])((?:[^\1]|\\.)*?)\1(,\s*(["\'])((?:[^\4]|\\.)*?)\4)?\)/', $contents, $matches);

                    if (!isset($matches[2])) continue;

                    foreach ($matches[2] as &$string) {
                        $strings[$string] = $string;
                    }

                }
            }
        }

        if (count($strings)) {

            if ($this->app->path("#config:app/i18n/{$lang}.php")) {
                $langfile = include($this->app->path("#config:cockpit/i18n/{$lang}.php"));
                $strings  = array_merge($strings, $langfile);
            }

            ksort($strings);

            if ($module) {
                $this->app->helper('fs')->write("#config:app/i18n/{$module}/{$lang}.php", '<?php return '.$this->app->helper('utils')->var_export($strings, true).';');
            } else {
                $this->app->helper('fs')->write("#config:app/i18n/{$lang}.php", '<?php return '.$this->app->helper('utils')->var_export($strings, true).';');
            }
        }

        $output->writeln('<info>[✓]</info> Lang file created!');
        return Command::SUCCESS;
    }
}