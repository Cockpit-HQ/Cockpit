<?php

namespace Pages\Helper;

class Pages extends \Lime\Helper {

    public function remove($id) {

        $pages = $this->app->dataStorage->find('pages', [
            'filter' => ['_pid' => $id]
        ])->toArray();

        foreach ($pages as $page) {
            $this->remove($page['_id']);
        }

        $this->app->dataStorage->remove('pages', ['_id' => $id]);

        return true;
    }
}