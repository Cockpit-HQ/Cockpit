<?php

namespace Pages\Helper;

class Pages extends \Lime\Helper {

    protected $locales;

    public function initialize() {
        $this->locales = $this->app->helper('locales')->locales();
    }

    public function remove($id) {

        $pages = $this->app->dataStorage->find('pages', [
            'filter' => ['_pid' => $id, '_state' => ['$gt' => -1]]
        ])->toArray();

        foreach ($pages as $page) {
            $this->remove($page['_id']);
        }

        $this->app->dataStorage->remove('pages', ['_id' => $id]);

        return true;
    }

    public function updateRoutes($pageId) {

        $page = $this->app->dataStorage->findOne('pages', ['_id' => $pageId]);

        if (!$page) {
            return;
        }

        if ($page['_pid']) {
            $parent = $this->app->dataStorage->findOne('pages', ['_id' => $page['_pid']]);

            if ($parent) {
                $r = $parent['_r'].'/'.$page['slug'];
            }

        } else {
            $r = '/'.$page['slug'];
        }

        $data = ['_id' => $page['_id'], '_r' => $r];

        foreach ($this->locales as $locale) {
            if ($locale['i18n'] == 'default') continue;

            $slug = $page["slug_{$locale['i18n']}"] ? $page["slug_{$locale['i18n']}"] : $page["slug"];

            if ($page['_pid']) {
                $_r = ($parent["_r_{$locale['i18n']}"] ? $parent["_r_{$locale['i18n']}"] : $parent["_r"]).'/'.$slug;
            } else {
                $_r = '/'.$slug;
            }

            $data["_r_{$locale['i18n']}"] = $_r;
        }

        $this->app->dataStorage->save('pages', $data);

        $children = $this->app->dataStorage->find('pages', [
            'filter' => ['_pid' => $page['_id']]
        ])->toArray();

        if (!count($children)) {
            return;
        }

        foreach ($children as $child) {

            if (!$child['slug']) continue;

            $data = ['_id' => $page['_id'], '_r' => $r.'/'.$child['slug']];

            $this->app->dataStorage->save('pages', $data);

            $this->updateRoutes($child['_id']);
        }
    }
}