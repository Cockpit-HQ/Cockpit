<?php

namespace Pages\Controller;

use App\Controller\App;
use ArrayObject;

class Utils extends App {

    public function updateOrder() {

        \session_write_close();

        $pages = $this->param('pages', null);

        if (!is_array($pages)) {
            return false;
        }

        $updatePageRoute = null;

        foreach ($pages as $page) {

            if (!isset($page['_id'], $page['_o'])) continue;

            $item = [
                '_id' => $page['_id'],
                '_o' => $page['_o']
            ];

            if (\array_key_exists('_pid', $page)) {
                $item['_pid'] = $page['_pid'];
                $updatePageRoute = $item['_id'];
            }

            $this->app->dataStorage->save('pages', $item);
        }

        if ($updatePageRoute) {
            $this->helper('pages')->updateRoutes($updatePageRoute);
        }

        return ['success' => true];
    }
}