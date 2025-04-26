<?php

namespace QueueLite;

use \MongoHybrid\Client as MongoHybridClient;


class Queue {

    protected $storage;
    protected $queueName;
    protected $options;

    protected $lockTimeout = 300;
    protected $collectionName = 'queuelite/queue';

    public function __construct(MongoHybridClient $storage, string $queueName, $options = []) {

        $this->storage = $storage;
        $this->queueName = $queueName;
        $this->options = $options;

        if (isset($options['lockTimeout'])) {
            $this->lockTimeout = $options['lockTimeout'];
        }

        if (isset($options['collectionName'])) {
            $this->collectionName = $options['collectionName'];
        }
    }

    public function push(array $data, array $options = []) {

        $options = array_merge([
            'delay' => 0,
            'priority' => 0,
            'maxAttempts' => 1,
            'uid' => null,
            'repeat' => null,
        ], $options);

        extract($options);

        if ($uid) {

            $this->storage->remove($this->collectionName, [
                'queue' => $this->queueName,
                'status' => 'pending',
                'uid' => $uid,
            ]);
        }

        $timestamp = time();
        $availableAt = $timestamp + $delay;

        if (isset($options['repeat'])) {

            if (is_string($repeat)) {
                $repeat = [
                    'interval' => $repeat,
                    'count' => null,
                    'until' => null
                ];
            }

            if (is_array($repeat)) {

                $repeat = array_merge([
                    'count' => null,
                    'interval' => null,
                    'until' => null
                ], $repeat);

                if (is_string($repeat['until'])) {
                    $repeat['until'] = strtotime($repeat['until'], $availableAt);
                }

                if (isset($repeat['interval'])) {
                    $availableAt = $this->calculateNextRepeatableInterval($repeat['interval'], $timestamp);
                }

            } else {
                unset($options['repeat']);
            }
        }


        $message = [
            'queue' => $this->queueName,
            'data' => $data,
            'available_at' => $availableAt,
            'created_at' => $timestamp,
            'priority' => $priority,
            'status' => 'pending',
            'attempts' => 0,
            'max_attempts' => abs($maxAttempts),
            'uid' => $uid,
        ];

        if (isset($options['repeat'])) {
            $message['repeat'] = $repeat;
        }

        $this->storage->save($this->collectionName, $message);

        return $message;
    }

    protected function scheduleNextRepeatableMessage(array $message) {

        if (!isset($message['repeat'])) {
            return;
        }

        $repeat = $message['repeat'];
        $currentTimestamp = time();

        if (!empty($repeat['until']) && $repeat['until'] < $currentTimestamp) {
            return;
        }

        if (isset($repeat['count'])) {
            $repeat['count'] -= 1;
            if ($repeat['count'] <= 0) {
                return;
            }
        }

        $this->push($message['data'], [
            'priority' => $message['priority'],
            'maxAttempts' => $message['max_attempts'],
            'uid' => $message['uid'],
            'repeat' => $repeat,
        ]);
    }

    protected function calculateNextRepeatableInterval(string $interval, int $currentTimestamp) {

        $interval = trim($interval);

        // Check if the interval is a time of day (contains am/pm or is in 24h format like 15:00)
        if (
            preg_match('/^(1[0-2]|0?[1-9])(?::([0-5][0-9]))?([ap]m)$/i', $interval) ||
            preg_match('/^([01]?[0-9]|2[0-3]):([0-5][0-9])$/', $interval)
        ) {
            // It's a time of day - calculate the next occurrence
            $dt = new \DateTime('@' . $currentTimestamp);
            $dt->setTimezone(new \DateTimeZone(date_default_timezone_get()));
            $today = $dt->format('Y-m-d');

            // Try to parse the time for today
            $todayWithTime = strtotime($today . ' ' . $interval);

            if ($todayWithTime > $currentTimestamp) {
                // If today's occurrence is in the future, use it
                return $todayWithTime;
            } else {
                // Otherwise, use tomorrow's occurrence
                $tomorrow = strtotime('+1 day', strtotime($today));
                $tomorrowFormatted = date('Y-m-d', $tomorrow);
                return strtotime($tomorrowFormatted . ' ' . $interval);
            }
        }

        // Support friendly names
        $mappings = [
            'hourly' => '1 hour',
            'daily' => '1 day',
            'weekly' => '1 week',
            'monthly' => '1 month',
            'yearly' => '1 year'
        ];

        $interval = $mappings[$interval] ?? $interval;

        // Use PHP's strtotime for calculation
        $nextTime = strtotime("+{$interval}", $currentTimestamp);

        return $nextTime !== false ? $nextTime : $currentTimestamp + 86400; // Default to 1 day if parsing fails
    }

    public function reserve() {

        $message = $this->storage->find($this->collectionName, [
            'limit' => 1,
            'sort' => ['priority' => -1, 'available_at' => 1],
            'filter' => [
                'queue' => $this->queueName,
                'status' => 'pending',
                'available_at' => ['$lte' => time()],
            ]
        ])[0] ?? null;

        if (!$message) {
            return null;
        }

        $message['attempts'] = ($message['attempts'] ?? 0) + 1;
        $message['status'] = 'reserved';
        $message['reserved_at'] = time();

        $this->storage->save($this->collectionName, $message);

        return $message;
    }

    public function complete(string $messageId, $data = []) {

        $message = $this->storage->findOne($this->collectionName, ['_id' => $messageId, 'status' => 'reserved']);

        if (!$message) {
            return false;
        }

        $message = array_merge($message, $data);

        $message['status'] = 'completed';
        $message['completed_at'] = time();

        $this->storage->save($this->collectionName, $message);

        if (isset($message['repeat'])) {
            $this->scheduleNextRepeatableMessage($message);
        }
    }

    public function fail(string $messageId, $data = []) {

        $message = $this->storage->findOne($this->collectionName, ['_id' => $messageId, 'status' => 'reserved']);

        if (!$message) {
            return false;
        }

        $message = array_merge($message, $data);

        $message['status'] = (($message['attempts'] + 1) > $message['max_attempts']) ? 'failed' : 'pending';
        $message['reserved_at'] = null;

        $this->storage->save($this->collectionName, $message);

        if (isset($message['repeat'])) {

            $willBeRetried = (($message['attempts'] + 1) <= $message['max_attempts']);

            if (!$willBeRetried) {
                $this->scheduleNextRepeatableMessage($message);
            }
        }

    }

    public function release() {

        $timestamp = time();
        $lockExpiry = $timestamp - $this->lockTimeout;

        $this->storage->update($this->collectionName,[
            'queue' => $this->queueName,
            'status' => 'reserved',
            'reserved_at' => ['$lte' => $lockExpiry]
        ], [
            'status' => 'pending',
            'reserved_at' => null,
        ]);
    }

    public function delete($ids) {

        if (is_string($ids)) {
            $ids = [$ids];
        }

        if (!is_array($ids)) {
            return false;
        }

        $this->storage->remove($this->collectionName, [
            'queue' => $this->queueName,
            '_id' => ['$in' => $ids]
        ]);
    }

    public function messages(array $options = []) {

        $options = array_merge([
            'status' => $options['status'] ?? null,
            'limit' => 10,
            'skip' => 0,
            'sort' => ['created_at' => -1]
        ], $options);

        $filter = [
            'queue' => $this->queueName,
        ];

        if ($options['status']) {
            $filter['status'] = $options['status'];
        }

        if (isset($options['filter']) && is_array($options['filter'])) {
            $filter = array_merge($options['filter'], $filter);
        }

        return $this->storage->find($this->collectionName, [
            'filter' => $filter,
            'limit' => $options['limit'],
            'skip' => $options['skip'],
            'sort' => $options['sort'],
        ])->toArray();
    }

    public function count(?string $status = null) {

        $filter = [
            'queue' => $this->queueName,
            'status' => $status,
        ];

        if (!$status) {

            $ret = [];

            foreach (['pending', 'reserved', 'completed', 'failed'] as $status) {
                $filter['status'] = $status;
                $ret[$status] = $this->storage->count($this->collectionName, $filter);
            }

            return $ret;
        }

        return $this->storage->count($this->collectionName, $filter);
    }

    public function cleanup(string $status, int $olderThan = 86400): void {

        $timestamp = time();
        $cutoff = $timestamp - abs($olderThan);

        $filter = [
            'queue' => $this->queueName,
            'status' => $status,
            'created_at' => ['$lte' => $cutoff]
        ];

        $this->storage->remove($this->collectionName, $filter);
    }

    public function purge(): void {

        $this->storage->remove($this->collectionName, [
            'queue' => $this->queueName,
        ]);
    }

    public function worker(array $options = []): Worker {

        $worker = new Worker($this, $options);

        return $worker;
    }
}
