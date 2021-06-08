<?php

namespace Pages\Controller;

use ArrayObject;

class Menus extends Controller {

    public function index() {
        $this->helper('theme')->favicon('pages:assets/icons/nav.svg');
        return $this->render('pages:views/menus/index.php');
    }

    public function load() {

        \session_write_close();

        return $this->module('pages')->menus();
    }

    public function menu($name = null) {

        $menu = [
            'name' => '',
            'label' => '',
            'info' => '',
            'group' => '',
            'color' => '',
            'links' => []
        ];

        if ($name) {
            $menu = $this->app->dataStorage->findOne('pages/menus', ['name' => $name]);
        }

        if (!$menu) {
            return false;
        }

        $groups = $this->getGroups();

        $this->helper('theme')->favicon('pages:assets/icons/nav.svg', $menu['color'] ?? '#000');

        return $this->render('pages:views/menus/menu.php', compact('menu', 'groups'));
    }

    public function save() {

        $menu = $this->param('menu');

        if (!$menu) {
            return $this->stop(['error' => 'Menu paramater is missing'], 412);
        }

        if (!isset($menu['name']) || !$menu['name']) {
            return $this->stop(['error' => 'Menu name is missing'], 412);
        }

        $menu['_modified'] = time();
        $menu['_mby'] = $this->user['_id'];

        if (!isset($menu['_id'])) {
            $menu['_created'] = $menu['_modified'];
            $project['_cby'] = $this->user['_id'];
        }

        // unique check
        $_menu = $this->app->dataStorage->findOne('pages/menus', ['name' => $menu['name']], ['_id' => 1]);

        if ($_menu && (!isset($menu['_id']) || $menu['_id'] != $_menu['_id'])) {
            $this->app->stop(['error' => 'Menu name is already used!'], 412);
        }

        $this->app->dataStorage->save('pages/menus', $menu);

        return $menu;
    }

    public function remove() {

        $menu = $this->param('menu');

        if (!$menu || !isset($menu['_id'], $menu['name'])) {
            return $this->stop(['error' => 'Menu parameter is missing'], 412);
        }

        $this->app->dataStorage->remove('pages/menus', ['_id' => $menu['_id']]);

        $this->app->trigger('pages.menus.remove', [$menu]);

        return ['success' => true];
    }


    protected function getGroups() {

        $groups = [];

        foreach ($this->module('pages')->menus() as $menu) {

            if (isset($menu['group']) && $menu['group'] && !\in_array($menu['group'], $groups)) {
                $groups[] = $menu['group'];
            }
        }

        sort($groups);

        return $groups;
    }
}