<?php

namespace Assets\Command;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Helper\ProgressBar;

class GeneratePresets extends Command {

    protected static $defaultName = 'assets:presets:generate';
    protected $app = null;

    public function __construct(\Lime\App $app) {
        $this->app = $app;
        parent::__construct();
    }

    protected function configure(): void {
        $this
            ->setHelp('This command generates all preset variants for image-based assets (excludes SVGs)')
            ->addOption(
                'preset',
                'p',
                InputOption::VALUE_OPTIONAL,
                'Generate only specific preset (e.g., thumbnail, hero)'
            )
            ->addOption(
                'rebuild',
                'r',
                InputOption::VALUE_NONE,
                'Rebuild existing preset images'
            )
            ->addOption(
                'filter',
                'f',
                InputOption::VALUE_OPTIONAL,
                'Filter assets (JSON format, e.g., \'{"folder":"gallery"}\')'
            );
    }

    protected function execute(InputInterface $input, OutputInterface $output): int {

        if (function_exists('ini_set')) {
            ini_set('memory_limit', -1);
        }

        $presets = $this->app->module('assets')->presets();
        $specificPreset = $input->getOption('preset');
        $rebuild = $input->getOption('rebuild');
        $filterOption = $input->getOption('filter');

        // Validate specific preset if provided
        if ($specificPreset && !isset($presets[$specificPreset])) {
            $output->writeln("<error>[✗]</error> Preset '{$specificPreset}' not found");
            $output->writeln("<info>Available presets:</info> " . implode(', ', array_keys($presets)));
            return Command::FAILURE;
        }

        // Filter to specific preset or use all
        $presetsToGenerate = $specificPreset ? [$specificPreset => $presets[$specificPreset]] : $presets;

        $output->writeln("<info>Generating presets:</info> " . implode(', ', array_keys($presetsToGenerate)));

        // Build filter for assets
        $filter = ['type' => 'image', 'mime' => ['$ne' => 'image/svg+xml']];

        if ($filterOption) {
            $customFilter = json_decode($filterOption, true);
            if (json_last_error() !== JSON_ERROR_NONE) {
                $output->writeln("<error>[✗]</error> Invalid JSON filter");
                return Command::FAILURE;
            }
            $filter = array_merge($filter, $customFilter);
        }

        $totalAssets = $this->app->dataStorage->count('assets', $filter);
        $output->writeln("<info>Found {$totalAssets} image assets to process</info>");

        if ($totalAssets === 0) {
            $output->writeln("<comment>[!]</comment> No assets found matching filter");
            return Command::SUCCESS;
        }

        $progressBar = new ProgressBar($output, $totalAssets * count($presetsToGenerate));
        $progressBar->start();

        $cntGenerated = 0;
        $cntSkipped = 0;
        $cntErrors = 0;
        $run = 0;
        $limit = 10; // Process in batches

        while (true) {

            $assets = $this->app->dataStorage->find('assets', [
                'fields' => ['_id' => 1, 'path' => 1, 'mime' => 1, 'width' => 1, 'height' => 1],
                'filter' => $filter,
                'skip' => $run * $limit,
                'limit' => $limit
            ]);

            foreach ($assets as $asset) {

                foreach ($presetsToGenerate as $presetName => $presetConfig) {

                    $progressBar->advance();

                    try {

                        $options = array_merge($presetConfig, [
                            'src' => $asset['_id'],
                            'rebuild' => $rebuild
                        ]);

                        // Generate the preset image
                        $result = $this->app->helper('asset')->image($options, true);

                        if (!$result || (is_array($result) && isset($result['error']))) {
                            $cntErrors++;
                            continue;
                        }

                        if ($rebuild || !$this->app->fileStorage->fileExists($result)) {
                            $cntGenerated++;
                        } else {
                            $cntSkipped++;
                        }

                    } catch (\Throwable $e) {
                        $cntErrors++;
                        continue;
                    }
                }
            }

            if (!count($assets) || count($assets) < $limit) {
                break;
            }

            $run += 1;
        }

        $progressBar->finish();
        $output->writeln('');

        $output->writeln("<info>[✓]</info> Preset generation complete!");
        $output->writeln("  Generated: <info>{$cntGenerated}</info>");
        $output->writeln("  Skipped (cached): <comment>{$cntSkipped}</comment>");

        if ($cntErrors > 0) {
            $output->writeln("  Errors: <error>{$cntErrors}</error>");
        }

        // Show storage information
        $this->showStorageInfo($output);

        return Command::SUCCESS;
    }

    protected function showStorageInfo(OutputInterface $output): void {

        $thumbStorage = $this->app->retrieve('assets/storage', 'tmp://thumbs');

        if (str_starts_with($thumbStorage, 'tmp://')) {
            $path = $this->app->path($thumbStorage);

            if ($path && is_dir($path)) {
                $size = $this->getDirectorySize($path);
                $sizeFormatted = $this->app->helper('utils')->formatSize($size);
                $output->writeln("  Cache size: <info>{$sizeFormatted}</info>");
            }
        }
    }

    protected function getDirectorySize(string $path): int {
        $size = 0;

        foreach (new \RecursiveIteratorIterator(new \RecursiveDirectoryIterator($path, \RecursiveDirectoryIterator::SKIP_DOTS)) as $file) {
            if ($file->isFile()) {
                $size += $file->getSize();
            }
        }

        return $size;
    }
}
