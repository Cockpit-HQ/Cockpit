<?php

namespace System\Controller;

use App\Controller\App;

class Spaces extends App {

    protected function before() {

        if (!$this->isAllowed('app/spaces')) {
            return $this->stop(401);
        }

        if (!$this->helper('spaces')->isMaster()) {
            return $this->stop(403);
        }

        $this->helper('session')->close();
    }

    public function index() {

        return $this->render('system:views/spaces/index.php');
    }

    public function create() {

        $space = $this->param('space');

        if ($space) {

            $this->hasValidCsrfToken(true);

            if (!isset($space['name'])) {
                return $this->stop(404);
            }

            if ($this->app->path("#app:.spaces/{$space['name']}")) {
                return $this->stop(['error' => "{$space['name']} already exists"], 403);
            }

            $options = $space['options'] ?? [];

            // check mongodb connection before creating space
            if (
                isset($options['database']['type']) &&
                $options['database']['type'] === 'mongodb' &&
                !$this->isDatabaseConnectionValid($options['database'])
            ) {
                return $this->stop(['error' => 'Database connection failed'], 412);
            }

            $space = $this->helper('spaces')->create($space['name'], $options);

            return ['success' => true, 'space' => $space];
        }

        $groups = [];

        foreach ($this->helper('spaces')->spaces() as $space) {
            if (!isset($space['group']) || !$space['group'] || in_array($space['group'], $groups)) continue;
            $groups[] = $space['group'];
        }

        sort($groups);

        return $this->render('system:views/spaces/create.php', compact('groups'));
    }

    public function load() {

        return $this->helper('spaces')->spaces();
    }

    public function remove() {

        $this->hasValidCsrfToken(true);

        $password = $this->param('password');
        $space = $this->param('space');

        // verify current logged in user
        if (!$password || !$this->app->module('system')->verifyUser($password)) {
            return $this->stop(['error' => 'User verification failed'], 412);
        }

        if (!$space || !isset($space['name'])) {
            return $this->stop(['error' => 'Space is missing'], 412);
        }

        if (str_contains($space['name'], '.') || str_contains($space['name'], '/')) {
            return false;
        }

        return ['success' => $this->helper('spaces')->remove($space['name'])];
    }

    public function checkDatabaseConnection() {

        $this->hasValidCsrfToken(true);

        $options = $this->param('options');

        if (
            !$options ||
            !isset($options['type']) ||
            $options['type'] !== 'mongodb'
        ) {
            return $this->stop(['error' => 'Invalid options'], 412);
        }

        if (!$this->isDatabaseConnectionValid($options)) {
            return $this->stop(['error' => 'Database connection failed'], 412);
        }

        return ['success' => true];
    }

    protected function isDatabaseConnectionValid(array $options) {

        \DotEnv::resolveEnvsInArray($options);

        try {

            $client = new \MongoHybrid\Client($options['server'], [
                'db' => $options['database']
            ]);

            $client->lstCollections();

        } catch (\Throwable $e) {
            return false;
        }

        return true;
    }
}
