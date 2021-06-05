<?php

namespace Settings\Helper;
class Locales extends \Lime\Helper {

    protected array $locales = [];

    protected function initialize() {

        $this->locales = $this->app['debug'] ? $this->cache() : $this->app->helper('cache')->read('app.locales', function() {
            return $this->cache();
        });
    }

    public function locales(): array {

        $locales = [];

        foreach ($this->locales as $locale) {

            $locales[] = [
                'i18n' => $locale['i18n'],
                'name' => $locale['name'],
            ];
        }

        return $locales;
    }

    public function cache(): array {

        $cache = [
            'default' => [
                'i18n' => 'default',
                'name' => 'Default'
            ]
        ];

        $locales = $this->app->dataStorage->find('system/locales', [
            'sort' => ['name' => 1]
        ])->toArray();

        foreach ($locales as $locale) {
            $cache[$locale['i18n']] = $locale;
        }

        $this->app->helper('cache')->write('app.locales', $cache);

        return $cache;
    }
}