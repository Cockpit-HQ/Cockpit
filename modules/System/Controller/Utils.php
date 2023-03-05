<?php

namespace System\Controller;

use App\Controller\App;

class Utils extends App {

    protected function before() {
        $this->helper('session')->close();
    }

    public function user($id) {

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

    public function icons() {

        $icons = new \ArrayObject([]);
        $dirs  = [
            '#config:icons',
        ];

        foreach ($dirs as $p) {

            $path = $this->app->path($p);

            if (!$path) continue;

            $dir = new \RecursiveDirectoryIterator($path);
            $iterator = new \RecursiveIteratorIterator($dir);


            foreach ($iterator as $f) {

                if ($f->isDir()) continue;
                if ($f->getExtension() != 'svg') continue;

                $icons[] = [
                    'name' => $f->getBasename('.svg'),
                    'path' => $p.str_replace($path, '', $f->getRealPath()),
                ];
            }

        }

        $this->app->trigger('system.icons.collect', [$icons]);

        return $icons->getArrayCopy();
    }

    public function flushCache() {

        if (!$this->helper('acl')->isSuperAdmin()) {
            return $this->stop(401);
        }

        $this->app->helper('system')->flushCache();

        return ['success' => true];
    }

    public function license() {

        $helper = $this->helper('license');

        return [
            'model' => $helper->license('model'),
            'isTrial' => $helper->isTrial(),
            'isValidDomain' => $helper->isValidDomain(),
        ];
    }

}
