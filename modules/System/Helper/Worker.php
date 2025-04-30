<?php

namespace System\Helper;

use QueueLite\Queue;
use QueueLite\Worker as QueueWorker;
use ArrayObject;

class Worker extends \Lime\Helper {

    protected ?Queue $queue = null;
    protected ?ArrayObject $handlers = null;
    protected ?QueueWorker $worker = null;

    protected function initialize() {

        $config = $this->app->retrieve('jobs', []);

        if (!is_array($config)) {
            $config = [];
        }

        $this->queue = new Queue($this->app->dataStorage, $config['queueName'] ?? 'app', $config);
        $this->worker = $this->queue->worker();

    }

    public function queue() {
        return $this->queue;
    }

    public function stats() {
        return $this->queue->count();
    }

    public function jobs(array $options = []) {
        return $this->queue->messages($options);
    }

    public function process(int $limit = 10) {

        if (!$this->handlers) {

            $this->handlers = new ArrayObject([]);
            $this->app->trigger('worker.handlers.collect', [$this->handlers]);

            foreach ($this->handlers as $name => $handler) {
                $this->handlers[$name] = \Closure::bind($handler, $this->app, $this->app);
            }
        }

        $this->worker->process(function($msg, $context) {

            $job = $msg['data']['job'] ?? null;
            $data = $msg['data']['data'] ?? [];
            $handle = $this->handlers[$job] ?? null;

            if (!$job || !$handle) {
                return false;
            }

            return call_user_func($handle, $data, $context);

        }, $limit);
    }

    public function push($job, $data = [], array $options = []) {

        $opts = array_merge([
            'delay' => 0,
            'priority' => 0,
            'maxAttempts' => 1,
            'uid' => null
        ], $options);

        $body = [
            'job' => $job,
            'data' => $data,
        ];

        return $this->queue->push($body, $opts);
    }

    public function cleanup(string $status, int $olderThan = 86400): void {
        $this->queue->cleanup($status, $olderThan);
    }

    public function stopProcess($pid, $signal = 15): bool {

        $data = $this->getWorkerPIDFileData();
        $exists = array_find($data['workers'], fn($worker) => $worker['pid'] === $pid);

        if (!$exists) {
            return false;
        }

        if (function_exists('posix_kill')) {
            // Unix/Linux
            $ret = posix_kill($pid, $signal);

            if ($ret) {
                $this->removeWorkerPID($pid);
            }

            return $ret;
        }

        // Windows
        if (PHP_OS_FAMILY === 'Windows') {
            $cmd = $signal == 9 ? "taskkill /F /PID $pid" : "taskkill /PID $pid";
            exec($cmd, $output, $result);

            if ($result === 0) {
                $this->removeWorkerPID($pid);
            }

            return $result === 0;
        }

        // Unix-like without posix extension
        exec("kill -$signal $pid", $output, $result);

        if ($result === 0) {
            $this->removeWorkerPID($pid);
        }

        return $result === 0;
    }

    public function isProcessRunning($pid): ?bool {

        if (!function_exists('posix_kill') && !function_exists('exec')) {
            return null;
        }

        if (function_exists('posix_kill')) {
            // Unix/Linux
            return posix_kill($pid, 0);
        }

        // Windows
        if (PHP_OS_FAMILY === 'Windows') {
            exec("tasklist /FI \"PID eq $pid\" /NH", $output);
            return count($output) > 0 && strpos($output[0], 'No tasks') === false;
        }

        // Unix-like without posix extension
        exec("ps -p $pid -o pid=", $output);
        return count($output) > 0;
    }


    // Helper methods to update con.jobs.pid file

    public function getWorkerPIDFile() {
        $storagePath = $this->app->helper('spaces')->master()->path('#storage:data');
        return "{$storagePath}/app.workers.pid";
    }

    public function getWorkerPIDFileData() {

        $data = [
            'workers' => []
        ];

        $contents = $this->readPIDFile();

        if (is_array($contents)) {
            $data = array_merge($data, $contents);
        }

        return $data;
    }

    public function addWorkerPID($pid, $mode = 'cli') {

        $data = $this->getWorkerPIDFileData();
        $data['workers'][] = [
            'pid' => $pid,
            'start' => time(),
            'mode' => $mode
        ];

        $this->writePIDFile($data);
    }

    public function removeWorkerPID($pid) {

        $data = $this->getWorkerPIDFileData();

        if (is_array($pid)) {
            $workers = array_filter($data['workers'], fn($worker) => !in_array($worker['pid'], $pid));
        } else {
            $workers = array_filter($data['workers'], fn($worker) => $worker['pid'] !== $pid);
        }

        $data['workers'] = array_values($workers);

        $this->writePIDFile($data);
    }

    protected function writePIDFile(array $data) {

        $pidFile = $this->getWorkerPIDFile();
        $fp = fopen($pidFile, 'w');

        if (!$fp) {
            return false;
        }

        $success = false;

        try {
            if (flock($fp, LOCK_EX)) { // Exclusive lock for writing
                $encoded = json_encode($data, JSON_PRETTY_PRINT);
                $success = (fwrite($fp, $encoded) !== false);
                flock($fp, LOCK_UN); // Release the lock
            }
        } finally {
            fclose($fp);
        }

        return $success;
    }

    protected function readPIDFile() {

        $pidFile = $this->getWorkerPIDFile();

        if (!file_exists($pidFile)) {
            return [];
        }

        $fp = fopen($pidFile, 'r');

        if (!$fp) {
            return [];
        }

        $data = [];

        try {
            if (flock($fp, LOCK_SH)) { // Shared lock for reading
                $contents = fread($fp, filesize($pidFile) ?: 0);
                if ($contents) {
                    $decoded = json_decode($contents, true);
                    if (is_array($decoded)) {
                        $data = $decoded;
                    }
                }
                flock($fp, LOCK_UN); // Release the lock
            }
        } finally {
            fclose($fp);
        }

        return $data;
    }

}
