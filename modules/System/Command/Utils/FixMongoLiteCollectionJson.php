<?php

namespace System\Command\Utils;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Output\OutputInterface;
use PDO;

class FixMongoLiteCollectionJson extends Command {

    protected static $defaultName = 'system:fix-mongolite-collection-json';
    protected $app = null;

    public function __construct(\Lime\App $app) {
        $this->app = $app;
        parent::__construct();
    }

    protected function configure(): void {
        $this->setHelp('This command detects and fixes malformed JSON entries in a MongoLite collection');
        $this->addArgument('db', InputArgument::OPTIONAL, 'Database to check (default: system)');
        $this->addArgument('collection', InputArgument::OPTIONAL, 'Collection to check (default: log)');
        $this->addOption('fix', null, InputOption::VALUE_NONE, 'Fix malformed entries (delete them)');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int {

        $fix = $input->getOption('fix');
        $db = $input->getArgument('db') ?: 'system';
        $collection = $input->getArgument('collection') ?: 'log';
        
        // ensure .sqlite extension
        if (!str_ends_with($db, '.sqlite')) {
            $db .= '.sqlite';
        }

        $dbPath = $this->app->path("#storage:data/{$db}");

        if (!$dbPath || !file_exists($dbPath)) {
            $output->writeln("<error>Database '{$db}' not found!</error>");
            return Command::FAILURE;
        }

        try {
            $pdo = new PDO("sqlite:$dbPath");
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (\PDOException $e) {
            $output->writeln('<error>Connection failed: ' . $e->getMessage() . '</error>');
            return Command::FAILURE;
        }

        $output->writeln("Scanning '{$collection}' collection in {$db}...");

        // We select rowid and document. We refrain from using any JSON functions in SQL 
        // to avoid triggering the "malformed JSON" error during fetch.
        $stmt = $pdo->query("SELECT rowid as id, document FROM {$collection}");

        $badRows = [];
        $count = 0;

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $count++;
            $doc = $row['document'];
            $id = $row['id'];
            
            // Check if valid JSON
            json_decode($doc);
            
            if (json_last_error() !== JSON_ERROR_NONE) {
                $output->writeln("<comment>[!] FOUND MALFORMED JSON at rowid: {$id}</comment>");
                $output->writeln("    Error: " . json_last_error_msg());
                $output->writeln("    Content (first 100 chars): " . substr($doc, 0, 100));
                $badRows[] = $id;
            }
        }

        $output->writeln("\nScanned $count rows.");

        if (empty($badRows)) {
            $output->writeln('<info>No malformed JSON found.</info>');
            return Command::SUCCESS;
        }

        $output->writeln("Found " . count($badRows) . " bad row(s).");

        if ($fix) {
            $output->writeln("\nFixing...");
            foreach ($badRows as $id) {
                $pdo->exec("DELETE FROM {$collection} WHERE rowid = $id");
                $output->writeln("Deleted rowid $id");
            }
            $output->writeln('<info>Fix complete.</info>');
        } else {
            $output->writeln("\nTo delete these rows, run:");
            $output->writeln("php cockpit system:fix-mongolite-collection --fix");
        }

        return Command::SUCCESS;
    }
}
