<?php

namespace System\Controller;

use App\Controller\App;

class Utils extends App {


    public function user($id) {

        \session_write_close();

        $user = $this->app->dataStorage->findOne('system/users', ['_id' => $id]);

        return $user ? ['_id' => $id, 'user' => $user['user']]: false;
    }

    public function revisions($oid) {

        $users = [];
        $limit = $this->param('limit:int', 50);
        $revisions = $this->app->helper('revisions')->getList($oid, $limit);

        foreach ($revisions as &$rev) {

            if ($rev['_by']) {

                if (!isset($users[$rev['_by']])) {

                    $user = $this->app->dataStorage->findOne('system/users', ['_id' => $rev['_by']]);

                    if ($user) {
                        $users[$rev['_by']] = ['_id' => $user['_id'], 'user' => $user['user']];
                    } else {
                        $users[$rev['_by']] = false;
                    }
                }

                $rev['_by'] = $users[$rev['_by']];
            }

        }

        return $revisions;

    }

}