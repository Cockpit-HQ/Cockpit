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

    public function __construct(string $name, $app) {

        $this->name = $name;
        $this->app = $app;
    }

    protected function addRecord(string $message, $type = 'info', ?array $context = null): void {

        $time = time();

        $record = [
            'message' => $message,
            'type' => $type,
            'channel' => $this->name,
            'context' => $context,
            'timestamp' => $time,
            'datetime' => date('Y-m-d G:i:s T', $time)
        ];

        try {
            $this->app->dataStorage->save('system/log', $record);
        } catch(\Throwable $e) {}
    }

    public function info(string $message, ?array $context = null): void {
        $this->addRecord($message, 'info', $context);
    }

    public function debug(string $message, ?array $context = null): void {
        $this->addRecord($message, 'debug', $context);
    }

    public function notice(string $message, ?array $context = null): void {
        $this->addRecord($message, 'notice', $context);
    }

    public function warning(string $message, ?array $context = null): void {
        $this->addRecord($message, 'warning', $context);
    }

    public function alert(string $message, ?array $context = null): void {
        $this->addRecord($message, 'alert', $context);
    }

    public function error(string $message, ?array $context = null): void {
        $this->addRecord($message, 'error', $context);
    }

}
