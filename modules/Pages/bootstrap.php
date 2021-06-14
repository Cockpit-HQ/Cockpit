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

    'pageByRoute' => function(string $route, $locale = 'default') {

        $filter = [
            '_state' => 1
        ];

        $routeKey = '_r';

        if ($locale && $locale != 'default') {

            $locales = $this->app->helper('locales')->locales(true);

            if (isset($locales[$locale])) {
                $routeKey = "_r_{$locale}";
            }
        }

        $filter[$routeKey] = $route;

        if ($route == '/') {
            $filter = ['_pid' => null, '_o' => 0];
        }

        $page = $this->app->dataStorage->findOne('pages', $filter);

        return $page ? $this->app->helper('locales')->applyLocales($page, $locale) : null;
    },

    'updateRefs' => function(string $refId, mixed $value = null) {

        $update = function(&$items) use($value, $refId, &$update) {

            if (!is_array($items)) return $items;

            foreach ($items as $k => &$v) {
                if (!is_array($v)) continue;
                if (is_array($items[$k])) $items[$k] = $update($items[$k]);
                if (isset($v['_id']) && $v['_id'] == $refId) $items[$k] = $value;
            }
            return $items;
        };

        // update options
        $items = $this->app->dataStorage->findTerm('pages/options', $refId)->toArray();
        $items = count($items) ? $update($items) : [];

        foreach ($items as $item) $this->app->dataStorage->save('pages/options', $item);

        // update pages
        $items = $this->app->dataStorage->findTerm('pages/pages', $refId)->toArray();
        $items = count($items) ? $update($items) : [];

        foreach ($items as $item) $this->app->dataStorage->save('pages/pages', $item);
    }

]);

// update assets references on asset remove
$this->on('assets.asset.remove', function(array $asset) {

    if ($this->helper('async')->possible()) {
        $this->helper('async')->exec('APP::instance()->module("pages")->updateRefs($asset["_id"], null);', compact('asset'));
    } else {
        $this->module('pages')->updateRefs($asset['_id'], null);
    }
});

// update assets references on asset update
$this->on('assets.asset.update', function(array $asset) {

    if ($this->helper('async')->possible()) {
        $this->helper('async')->exec('APP::instance()->module("pages")->updateRefs($asset["_id"], $asset);', compact('asset'));
    } else {
        $this->module('pages')->updateRefs($asset['_id'], $asset);
    }
});