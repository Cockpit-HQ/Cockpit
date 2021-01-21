<?php

namespace Settings\Helper;


class Locales extends \Lime\Helper {

    protected $locales;

    protected function initialize() {

        $this->locales = $this->app->helper('cache')->read('app.locales', function() {
            return $this->cache();
        });
    }

    public function locales() {

        $locales = [];

        foreach ($this->locales as $locale) {
            
            $locales[] = [
                'i18n' => $locale['i18n'],
                'name' => $locale['name'],
            ];
        }

        return $locales;
    }

    public function cache() {

        $cache = [
            'default' => 'Default'
        ];

        $locales = $this->app->data->find('system/locales', [
            'sort' => ['name' => 1]
        ])->toArray();

        foreach ($locales as $locale) {
            $cache[$locale['i18n']] = $locale;
        }

        $this->app->helper('cache')->write('app.locales', $cache);

        return $cache;
    }
}