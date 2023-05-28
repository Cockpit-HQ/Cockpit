<?php

namespace App\Helper;

class EventStream extends \Lime\Helper {

    public function cleanup() {
        $this->app->dataStorage->remove('app/events/stream', ['_created' => ['$lt' => strtotime('-5 minutes')]]);
    }

    public function getEvents(int $sinceTime) {

        $events = $this->dataStorage->find('app/events/stream', [
            'filter' => ['_created' => ['$gte' => $sinceTime]],
            'sort' => ['_created' => -1]
        ])->toArray();

        return $events;
    }

    public function add(string $event, $data = [], array $options = []) {

        $evt = [
            'type' => $event,
            'data' => $data,
            'options' => $options,
            '_created' => time()
        ];

        $this->dataStorage->save('app/events/stream', $evt);

        return $evt;
    }
}
