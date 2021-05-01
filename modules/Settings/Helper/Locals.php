<?php

namespace Settings\Helper;


class Locals extends \Lime\Helper {

    protected array $locals = [];

    protected function initialize() {

        $this->locals = $this->app->helper('cache')->read('app.locals', function() {
            return $this->cache();
        });
    }

    public function locals(): array {

        $locals = [];

        foreach ($this->locals as $locale) {

            $locals[] = [
                'i18n' => $locale['i18n'],
                'name' => $locale['name'],
            ];
        }

        return $locals;
    }

    public function cache(): array {

        $cache = [
            'default' => 'Default'
        ];

        $locals = $this->app->dataStorage->find('system/locals', [
            'sort' => ['name' => 1]
        ])->toArray();

        foreach ($locals as $locale) {
            $cache[$locale['i18n']] = $locale;
        }

        $this->app->helper('cache')->write('app.locals', $cache);

        return $cache;
    }
}