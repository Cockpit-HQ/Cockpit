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

        \session_write_close();

        $pId = $this->param('_pid', null);

        if (!$pId) {
            $pId = null;
        }

        $pages = $this->app->dataStorage->find('pages', [
            'filter' => ['_pid' => $pId],
            'sort' => ['_o' => 1]
        ])->toArray();

        foreach ($pages as &$page) {
            $page['children'] = [];
            $page['_children'] = $this->app->dataStorage->count('pages', ['_pid' => $page['_id']]);
        }

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

            foreach ($locales as $locale) {

                $suffix = "_{$locale['i18n']}";

                if ($locale['i18n'] == 'default') {
                    $suffix = '';
                }

                if (isset($page["data{$suffix}"])) {
                    $page["data{$suffix}"] = new ArrayObject($page["data{$suffix}"]);
                }
            }

        } else {

            if ($this->param('parent') && $this->app->dataStorage->findOne('pages', ['_id' => $this->param('parent')], ['_id' => 1])) {
                $default['_pid'] = $this->param('parent');
            }

            $page = $default;
        }

        if (\is_array($page['_meta'])) {
            $page['_meta'] = new ArrayObject($page['_meta']);
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
            $page['_o'] = 0;

            if ($page['_pid']) {
                $page['_o'] = $this->app->dataStorage->count('pages', ['_pid' => $page['_pid']]);
            }

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
        }

        $this->app->dataStorage->save('pages', $page);

        $this->app->helper('pages')->updateRoutes($page['_id']);

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