<?php

namespace Pages\Controller;

use App\Controller\App;
use ArrayObject;

class Utils extends App {

    public function updateOrder() {

        $pages = $this->param('pages', null);

        if (!is_array($pages)) {
            return false;
        }

        foreach ($pages as $page) {

            if (!isset($page['_id'], $page['_o'])) continue;

            $item = [
                '_id' => $page['_id'],
                '_o' => $page['_o']
            ];

            if (\array_key_exists('_pid', $page)) {
                $item['_pid'] = $page['_pid'];
            }

            $this->app->dataStorage->save('pages', $item);
        }

        return ['success' => true];
    }
}