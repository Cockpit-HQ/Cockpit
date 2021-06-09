<?php

namespace Pages\Controller;

use ArrayObject;

class Pages extends Controller {

    protected function before() {

        parent::before();

        $this->app->on('app.layout.assets', function(array &$assets) {
            $assets[] = 'pages:assets/css/pages.css';
        });
    }

    public function index() {
        return $this->render('pages:views/pages/index.php');
    }

    public function load() {

        $pId = $this->param('_pid', null);

        $pages = $this->app->dataStorage->find('pages', [
            'filter' => ['_pid' => $pId],
            'sort' => ['_o' => 1]
        ])->toArray();

        return $pages;
    }


    public function page($id = null) {

        $default = [
            'type' => 'layout',
            'title' => '',
            'slug' => '',
            'seo' => [
                'title' => null,
                'keywords' => null,
                'decription' => null,
            ],
            'data' => new ArrayObject([]),
            'meta' => new ArrayObject([]),
            '_state' => 0,
            '_pid' => null,
            '_o' => 0
        ];

        $locales = $this->helper('locales')->locales();
        $locales[0]['visible'] = true;

        foreach ($locales as $locale) {

            if ($locale['i18n'] == 'default') continue;

            $default['title_'.$locale['i18n']] = null;
            $default['slug_'.$locale['i18n']] = null;
            $default['seo_'.$locale['i18n']] = $default['seo'];
            $default['data_'.$locale['i18n']] = new ArrayObject([]);
        }

        if ($id) {

            $page = $this->app->dataStorage->findOne('pages', ['_id' => $id]);

            if (!$page) {
                return false;
            }

            $page = array_replace_recursive($default, $page);

        } else {
            $page = $default;
        }


        return $this->render('pages:views/pages/page.php', compact('page', 'locales'));
    }

}