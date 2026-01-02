<?php

namespace System\Command\i18n;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputOption;
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
            ->addArgument('module', InputArgument::OPTIONAL, 'Create a language file for a module')
            ->addOption('translate', 't', InputOption::VALUE_NONE, 'Auto translate strings');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int {

        $locale = $input->getArgument('locale');
        $targetModule = $input->getArgument('module');

        if ($targetModule && $targetModule == 'System') {
            $targetModule = 'App';
        }

        // Validate target module if specific one requested
        if ($targetModule && $targetModule != 'App' && !$this->app->path("#modules:{$targetModule}") && !$this->app->path("#addons:{$targetModule}")) {
            $output->writeln("<error>[x] Module <<{$targetModule}>> does not exist!</error>");
            return Command::FAILURE;
        }

        $translator = ($input->getOption('translate') && $this->app->module('lokalize')) ? $this->app->module('lokalize') : null;
        $modules = $this->app['modules']->getArrayCopy();
        
        // 1. Collect all strings from all modules
        $globalStrings = []; // string => [module1 => true, module2 => true]
        
        foreach ($modules as $m) {

            $name = basename($m->_dir);
            
            // Normalize System -> App
            if ($name == 'System') $name = 'App';
            
            $strings = $this->extractStringsFromModule($m->_dir);
            
            foreach ($strings as $string) {
                $globalStrings[$string][$name] = true;
            }
        }

        // 2. Distribute strings to buckets
        $moduleBuckets = [];

        foreach ($globalStrings as $string => $locations) {
            
            $modulesFound = array_keys($locations);
            $target = $modulesFound[0];

            // Strategy: overlapping strings or strings already in App go to App
            if (count($modulesFound) > 1 || in_array('App', $modulesFound)) {
                $target = 'App';
            }

            $moduleBuckets[$target][$string] = $string;
        }

        // 3. Determine which modules to write
        $modulesToWrite = [];

        if ($targetModule) {
            // If specific module requested, write it AND App (to capture moved globals)
            $modulesToWrite[] = $targetModule;
            if ($targetModule !== 'App') {
                $modulesToWrite[] = 'App';
            }
            $modulesToWrite = array_unique($modulesToWrite);
        } else {
            // Write all modules that have strings
            $modulesToWrite = array_keys($moduleBuckets);
        }

        // 4. Process and Write
        foreach ($modulesToWrite as $name) {
            
            if (empty($moduleBuckets[$name]) && $name != 'App') continue;

            $strings = $moduleBuckets[$name] ?? [];
            $output->writeln("<info>-></info> {$name}");

            if (count($strings)) {

                // Auto-translate
                if ($translator) {
                    $strings = $this->translateStrings($translator, $strings, $locale);
                }

                // Merge with existing
                $strings = array_merge($name == 'App' ? [
                    '@meta' => ['language' => \App\Helper\i18n::$locales[$locale] ?? strtoupper($locale)]
                ] : [], $strings);

                if ($this->app->path("#config:i18n/{$locale}/{$name}.php")) {
                    $langfile = include($this->app->path("#config:i18n/{$locale}/{$name}.php"));
                    $strings  = array_merge($strings, $langfile);
                }

                ksort($strings);

                $this->app->helper('fs')->write("#config:i18n/{$locale}/{$name}.php", '<?php return '.$this->app->helper('utils')->var_export($strings, true).';');
                $output->writeln("<info>  [✓]</info> Updated #config:i18n/{$locale}/{$name}.php");
            }
        }

        return Command::SUCCESS;
    }

    protected function extractStringsFromModule($dir): array {

        $strings = [];
        $extensions = ['php', 'js'];
        $iterator = new \RecursiveIteratorIterator(new \RecursiveDirectoryIterator($dir), \RecursiveIteratorIterator::SELF_FIRST);

        foreach ($iterator as $file) {

            // Skip vendor and node_modules folders
            if (strpos($file->getPathname(), '/vendor/') !== false || strpos($file->getPathname(), '/node_modules/') !== false || strpos($file->getPathname(), '/assets/vendor/') !== false) {
                continue;
            }

            if (!$file->isFile() || !in_array($file->getExtension(), $extensions)) continue;

            $contents = file_get_contents($file->getRealPath());

            preg_match_all('/(?:{{\s*t|\<\?=\s*t|App\.i18n\.get|App\.ui\.notify)\((["\'])((?:[^\1]|\\.)*?)\1(,\s*(["\'])((?:[^\4]|\\.)*?)\4)?\s*\)/', $contents, $matches);

            if (!isset($matches[2])) continue;

            foreach ($matches[2] as $string) {
                $strings[$string] = $string;
            }
        }

        return $strings;
    }

    protected function translateStrings($translator, $strings, $locale): array {
        
        $keys = array_keys($strings);
        $values = array_values($strings);

        $ret = $translator->translate(implode("\n@\n", $values), $locale);

        if ($ret && !isset($ret['error'])) {

            $values = explode("\n@\n", $ret);

            foreach ($keys as $idx => $key) {
                if (!isset($values[$idx])) continue;
                $strings[$key] = $values[$idx];
            }
        }

        return $strings;
    }
}
