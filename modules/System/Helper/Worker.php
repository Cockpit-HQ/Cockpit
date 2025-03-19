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

    public function cleanup(string $status, int $olderThan = 86400) {
        return $this->queue->cleanup();
    }


    // Helper methods to update con.jobs.pid file

    public function getWorkerPIDFile() {
        $storagePath = $this->app->path('#storage:data');
        return "{$storagePath}/app.workers.pid";
    }

    public function getWorkerPIDFileData() {

        $pidFile = $this->getWorkerPIDFile();

        $data = [
            'workers' => []
        ];

        if (file_exists($pidFile)) {
            $contents = json_decode(file_get_contents($pidFile), true);
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

        file_put_contents($this->getWorkerPIDFile(), json_encode($data, JSON_PRETTY_PRINT));
    }

    public function removeWorkerPID($pid) {

        $data = $this->getWorkerPIDFileData();

        if (is_array($pid)) {
            $workers = array_filter($data['workers'], fn($worker) => !in_array($worker['pid'], $pid));
        } else {
            $workers = array_filter($data['workers'], fn($worker) => $worker['pid'] !== $pid);
        }

        $data['workers'] = array_values($workers);

        file_put_contents($this->getWorkerPIDFile(), json_encode($data, JSON_PRETTY_PRINT));
    }

}
