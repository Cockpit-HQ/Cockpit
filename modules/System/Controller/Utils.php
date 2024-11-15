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

        $this->hasValidCsrfToken(true);

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

    public function verifyUser() {

        $password = $this->param('password');

        if (!$password) {
            return $this->stop(['error' => 'Password for verification is missing'], 412);
        }

        return ['success' => $this->app->module('system')->verifyUser($password)];
    }

    public function icons() {

        $icons = new \ArrayObject([]);
        $dirs  = [
            'system:assets/icon-sets',
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

    public function resetOpcache() {

        if (!$this->helper('acl')->isSuperAdmin() || !$this->helper('spaces')->isMaster()) {
            return $this->stop(401);
        }

        if (function_exists('opcache_reset')) {
            opcache_reset();
        }

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

    public function env() {

        $this->hasValidCsrfToken(true);

        $password = $this->param('password');

        // verify current logged in user
        if (!$password || !$this->app->module('system')->verifyUser($password)) {
            return $this->stop(['error' => 'User verification failed'], 412);
        }

        if (!$this->app->helper('acl')->isSuperAdmin() || !$this->app->helper('spaces')->isMaster()) {
            return $this->stop(['error' => 'Permission denied'], 401);
        }

        $env = getenv();

        ksort($env);

        return compact('env');
    }

}
