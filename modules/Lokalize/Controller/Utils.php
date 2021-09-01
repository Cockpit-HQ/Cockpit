<?php

namespace Lokalize\Controller;

use App\Controller\App;

class Utils extends App {

    /**
     * Get text translations via deepl
     */
    public function translate() {

        \session_write_close();

        $text = $this->param('text');
        $to = $this->param('to');

        if (!$text || !$to) {
            return false;
        }

        $translation = $this->module('lokalize')->translate($text, $to);

        if (!$translation) {
            $translation = '';
        }

        return compact('translation');

    }
}