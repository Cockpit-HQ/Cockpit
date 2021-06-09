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
            '_meta' => new ArrayObject([]),
            '_state' => 0,
            '_r' => null,
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
            $default['_r_'.$locale['i18n']] = null;
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

    public function save() {

        $page = $this->param('page');

        if (!$page) {
            return $this->stop(['error' => 'Page paramater is missing'], 412);
        }

        $isUpdate = isset($page['_id']);

        $page['_modified'] = time();
        $page['_mby'] = $this->user['_id'];

        if (!$isUpdate) {
            $page['_created'] = $page['_modified'];
            $page['_cby'] = $this->user['_id'];
        } else {
            unset($page['_pid'], $page['_o']);
        }

        $page["_meta"] = new ArrayObject($page["_meta"]);

        $locales = $this->helper('locales')->locales();

        foreach ($locales as $locale) {

            $suffix = "_{$locale['i18n']}";

            if ($locale['i18n'] == 'default') {
                $suffix = '';
            }

            $page["data{$suffix}"] = new ArrayObject($page["data{$suffix}"]);

            $title = "title{$suffix}";
            $slug = "slug{$suffix}";
            $seo = "seo{$suffix}";

            if (!trim($page[$slug])) {

                $slugTitle = $page[$seo]['title'] ? $page[$seo]['title'] : $page[$title];

                if (trim($slugTitle)) {
                    $page[$slug] = $this->helper('utils')->sluggify(trim($slugTitle));
                }
            }

            if (trim($page[$slug])) {
                $page["_r{$suffix}"] = $locale['i18n'] == 'default' ? "/$page[$slug]" : "/{$locale['i18n']}/$page[$slug]";
            }
        }

        $this->app->dataStorage->save('pages', $page);

        return $page;

    }

    public function remove() {

        $page = $this->param('page');

        if (!$page) {
            return $this->stop(['error' => 'Page paramater is missing'], 412);
        }

        $this->helper('pages')->remove($page['_id']);

        return ['success' => true];
    }

}