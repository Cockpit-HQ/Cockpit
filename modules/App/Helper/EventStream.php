<?php

namespace App\Helper;

class EventStream extends \Lime\Helper {

    /**
     * Cleanup old events.
     *
     * @return void
     */
    public function cleanup() {
        $this->app->dataStorage->remove('app/events/stream', ['_created' => ['$lt' => \strtotime('-5 minutes')]]);
    }

    /**
     * Get events since a specific time.
     *
     * @param int $sinceTime The timestamp to get events since.
     * @return array The list of events.
     */
    public function getEvents(int $sinceTime) {

        $events = $this->dataStorage->find('app/events/stream', [
            'filter' => ['_created' => ['$gte' => $sinceTime]],
            'sort' => ['_created' => -1]
        ])->toArray();

        return $events;
    }

    /**
     * Add a new event.
     *
     * @param string $event The event type.
     * @param mixed $data The event data.
     * @param array $options Additional options for the event.
     * @return array The created event.
     */
    public function add(string $event, $data = [], array $options = []) {

        $evt = [
            'type' => $event,
            'data' => $data,
            'options' => $options,
            '_created' => \time()
        ];

        $this->dataStorage->save('app/events/stream', $evt);

        return $evt;
    }
}
