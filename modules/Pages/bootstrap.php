<?php

// Register Helpers
$this->helpers['pages'] = 'Pages\\Helper\\Pages';

// load admin related code
$this->on('app.admin.init', function() {
    include(__DIR__.'/admin.php');
});

// load api request related code
$this->on('app.api.request', function() {
    include(__DIR__.'/api.php');
});


// pages api
$this->module('pages')->extend([

    'menus' => function(array $options = []) {

        $options = array_merge([
            'sort' => ['name' => 1],
            'fields' => ['data' => 0, '_meta' => 0]
        ], $options);

        $menus = $this->app->dataStorage->find('pages/menus', $options)->toArray();

        return $menus;
    },

    'settings' => function() {

        $settings = [
            'meta' => [],
            'preview' => [],
            'images' => [
                'logo' => null,
                'small' => null,
                'favicon' => null,
            ],
            'scripts' => [
                'header' => null,
                'footer' => null,
            ],
            'seo' => [
                'title' => null,
                'keywords' => null,
                'decription' => null,
            ],
        ];

        $locales = $this->app->helper('locales')->locales();

        foreach ($locales as $locale) {

            if ($locale['i18n'] == 'default') continue;

            $settings['seo_'.$locale['i18n']] = $settings['seo'];
        }

        $opts = $this->app->dataStorage->getKey('pages/options', 'settings', []);

        $settings = array_replace_recursive($settings, $opts);

        if (isset($settings['meta']) && is_array($settings['meta'])) {
            $settings['meta'] = new ArrayObject($settings['meta']);
        }

        return $settings;

    },

]);