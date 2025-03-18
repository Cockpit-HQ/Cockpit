<?php

namespace QueueLite;

class Worker {

    protected Queue $queue;
    protected int $maxExecutionTime = 25;
    protected int $processedCount = 0;

    public function __construct(Queue $queue, array $options = []) {
        $this->queue = $queue;

        if (isset($options['maxExecutionTime'])) {
            $this->maxExecutionTime = intval($options['maxExecutionTime']);
        }
    }

    public function process(callable $callback, $limit = 10) {

        $startTime = time();

        $this->processedCount = 0;
        $this->queue->release();

        // Process messages until we hit the limit or run out of time
        while ($this->processedCount < $limit) {
            // Check if we're approaching the max execution time
            if ((time() - $startTime) > $this->maxExecutionTime) {
                break;
            }

            // Get a message from the queue
            $message = $this->queue->reserve();

            if (!$message) {
                // No messages available
                break;
            }

            try {

                $startTime = microtime(true);

                // Process the message
                $result = call_user_func($callback, $message);

                // Mark the message as completed if the callback returned true
                if ($result === true) {

                    $this->queue->complete($message['_id'], [
                        'pTime' => microtime(true) - $startTime
                    ]);
                } else {
                    // Otherwise mark it as failed
                    $this->queue->fail($message['_id']);
                }

                $this->processedCount++;

            } catch (\Exception $e) {
                // If an exception was thrown, mark the message as failed
                $this->queue->fail($message['_id']);
            }
        }

        return $this->processedCount;

    }

}
