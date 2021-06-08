<?php

namespace Pages\Controller;

use ArrayObject;

class Settings extends Controller {

    public function index() {

        $settings = $this->module('pages')->settings();

        $locales = $this->helper('locales')->locales();

        $locales[0]['visible'] = true;

        return $this->render('pages:views/settings/index.php', compact('settings', 'locales'));
    }

    public function save() {

        $settings = $this->param('settings', []);

        $this->trigger('pages.ssettings.save', [&$settings]);

        $this->app->dataStorage->setKey('pages/options', 'settings', $settings);

        return $settings;
    }
}