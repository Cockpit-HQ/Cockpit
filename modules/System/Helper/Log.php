<?php

namespace System\Helper;

use ArrayObject;

class Log extends \Lime\Helper {

    protected array $channels = [];

    public function channel(string $name): LogChannel {

        if (!isset($this->channels[$name])) {
            $this->channels[$name] = new LogChannel($name, $this->app);
        }

        return $this->channels[$name];
    }
}

class LogChannel {

    protected $app;
    protected $name;

    public function __construct($name, $app) {

        $this->name = $name;
        $this->app = $app;
    }

    protected function addRecord($message, $type = 'info', $context = []) {

        $time = time();

        $record = [
            'message' => $message,
            'type' => $type,
            'channel' => $this->name,
            'context' => $context,
            'timestamp' => $time,
            'datetime' => date('Y-m-d G:i:s T', $time)
        ];

        $this->app->dataStorage->save('system/log', $record);

    }

    public function info($message, $context = []) {
        $this->addRecord($message, 'info', $context);
    }

    public function debug($message, $context = []) {
        $this->addRecord($message, 'debug', $context);
    }

    public function notice($message, $context = []) {
        $this->addRecord($message, 'notice', $context);
    }

    public function warning($message, $context = []) {
        $this->addRecord($message, 'warning', $context);
    }

    public function alert($message, $context = []) {
        $this->addRecord($message, 'alert', $context);
    }

    public function error($message, $context = []) {
        $this->addRecord($message, 'error', $context);
    }

}