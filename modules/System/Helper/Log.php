<?php

namespace System\Helper;

use ArrayObject;

class Log extends \Lime\Helper {

    protected array $channels = [];

    /**
     * Get a log channel by name.
     *
     * @param string $name The name of the channel.
     * @return LogChannel The log channel.
     */
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

    /**
     * Add a log record.
     *
     * @param string $message The log message.
     * @param string $type The log type (e.g. info, error).
     * @param array|null $context Additional context for the log entry.
     * @return void
     */
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

    /**
     * Log an informational message.
     *
     * @param string $message The log message.
     * @param array|null $context Additional context for the log entry.
     * @return void
     */
    public function info(string $message, ?array $context = null): void {
        $this->addRecord($message, 'info', $context);
    }

    /**
     * Log a debug message.
     *
     * @param string $message The log message.
     * @param array|null $context Additional context for the log entry.
     * @return void
     */
    public function debug(string $message, ?array $context = null): void {
        $this->addRecord($message, 'debug', $context);
    }

    /**
     * Log a notice message.
     *
     * @param string $message The log message.
     * @param array|null $context Additional context for the log entry.
     * @return void
     */
    public function notice(string $message, ?array $context = null): void {
        $this->addRecord($message, 'notice', $context);
    }

    /**
     * Log a warning message.
     *
     * @param string $message The log message.
     * @param array|null $context Additional context for the log entry.
     * @return void
     */
    public function warning(string $message, ?array $context = null): void {
        $this->addRecord($message, 'warning', $context);
    }

    /**
     * Log an alert message.
     *
     * @param string $message The log message.
     * @param array|null $context Additional context for the log entry.
     * @return void
     */
    public function alert(string $message, ?array $context = null): void {
        $this->addRecord($message, 'alert', $context);
    }

    /**
     * Log an error message.
     *
     * @param string $message The log message.
     * @param array|null $context Additional context for the log entry.
     * @return void
     */
    public function error(string $message, ?array $context = null): void {
        $this->addRecord($message, 'error', $context);
    }

}
