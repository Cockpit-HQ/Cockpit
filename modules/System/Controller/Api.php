<?php

namespace System\Controller;

use App\Controller\App;
use ArrayObject;

class Api extends App {

    protected function before() {

        if (!$this->isAllowed('app/api/manage')) {
            return $this->stop(401);
        }
    }

    public function index() {
        return $this->render('system:views/api/index.php');
    }

    public function public() {

        $key = $this->app->dataStorage->findOne('system/api_keys', ['key' => 'public']);

        if (!$key) {

            $key = [
                'key'  => 'public',
                'name'  => 'public',
                'role'  => null,
                'meta' => new ArrayObject([])
            ];
        }

        $this->checkAndLockResource('api.settings.public');

        return $this->render('system:views/api/key.php', compact('key'));
    }

    public function key($id = null) {

        if (!$id) {
            return $this->stop(['error' => 'key id is missing'], 412);
        }

        $key = $this->app->dataStorage->findOne('system/api_keys', ['_id' => $id]);

        if (!$key) {
            return false;
        }

        $this->checkAndLockResource($id);

        $key['meta'] = new ArrayObject( $key['meta']);

        return $this->render('system:views/api/key.php', compact('key'));
    }

    public function create() {

        $key = [
            'key'  => '',
            'name'  => '',
            'role'  => null,
            'meta' => new ArrayObject([])
        ];

        return $this->render('system:views/api/key.php', compact('key'));
    }

    public function remove() {

        $this->hasValidCsrfToken(true);

        $key = $this->param('key');

        if (!$key || !isset($key['_id'], $key['key'])) {
            return $this->stop(['error' => 'key is missing'], 412);
        }

        $this->app->dataStorage->remove('system/api_keys', ['_id' => $key['_id']]);

        $this->app->trigger('app.keys.remove', [$key]);

        $this->cache();

        return ['success' => true];
    }

    public function save() {

        $key = $this->param('key');

        if (!$key) {
            return $this->stop(['error' => 'Key data is missing'], 412);
        }

        $key['_modified'] = time();
        $isUpdate = isset($key['_id']);

        if (!$isUpdate) {
            $key['_created'] = $key['_modified'];
        }

        if (!isset($key['key']) || !trim($key['key'])) {
            return $this->stop(['error' => 'Key required'], 412);
        }

        foreach (['key', 'name'] as $k) {
            $key[$k] = strip_tags(trim($key[$k]));
        }

        // unique check

        $_key = $this->app->dataStorage->findOne('system/api_keys', ['key' => $key['key']]);

        if ($_key && (!isset($key['_id']) || $key['_id'] != $_key['_id'])) {
            $this->app->stop(['error' => 'Key is already used!'], 412);
        }

        $this->app->trigger('app.api.keys.save', [&$key, $isUpdate]);
        $this->app->dataStorage->save('system/api_keys', $key);

        $key = $this->app->dataStorage->findOne('system/api_keys', ['_id' => $key['_id']]);

        $key['meta'] = new ArrayObject(is_array($key['meta']) ? $key['meta'] : []);

        $this->cache();

        return $key;
    }

    public function load() {

        $this->helper('session')->close();

        $keys = $this->app->dataStorage->find('system/api_keys', [
            'filter' => ['key' => ['$ne' => 'public']],
            'sort' => ['name' => 1]
        ])->toArray();

        return $keys;
    }

    public function openapi() {

        $this->helper('session')->close();

        $paths = [(new \Symfony\Component\Finder\Finder())->files()->in(APP_DIR.'/modules')->notPath('#vendor#')];

        if (\file_exists(APP_DIR.'/addons')) {
            $paths[] = (new \Symfony\Component\Finder\Finder())->files()->in(APP_DIR.'/addons')->notPath('#vendor#');
        }

        if ($this->app->path('#root:addons') && $this->app->path('#root:addons') !== APP_DIR.'/addons') {
            $paths[] = (new \Symfony\Component\Finder\Finder())->files()->in($this->app->path('#root:addons'))->notPath('#vendor#');
        }

        if ($this->app->path('#root:config/api')) {
            $paths[] = (new \Symfony\Component\Finder\Finder())->files()->in($this->app->path('#root:config/api'))->notPath('#vendor#');
        }

        $yaml = \OpenApi\Generator::scan($paths, ['analyser' => new \OpenApi\Analysers\TokenAnalyser()])->toYaml();

        // replace placeholders
        $yaml = \str_replace([
            APP_DIR,
            '{{ app.name }}',
            '{{ app.version }}',
        ], [
            $this->app->module('system')->spaceUrl('/api'),
            $this->app->retrieve('app.name'),
            $this->app->retrieve('app.version'),
        ], $yaml);

        $this->app->response->mime = 'text';

        return $yaml;
    }

    public function restApiViewer() {

        $this->helper('session')->close();

        $apiKey = $this->param('apiKey');
        $bgColor = $this->param('bgColor');
        $primaryColor = $this->param('primaryColor');
        $textColor = $this->param('textColor');

        $this->layout = 'app:layouts/raw.php';

        $openApiUrl = $this->param('specUrl', $this->app->routeUrl('/system/api/openapi'));

        return $this->render('system:views/api/rest-api-viewer.php', compact('openApiUrl', 'apiKey', 'bgColor', 'primaryColor', 'textColor'));
    }

    public function graphqlViewer() {

        $this->helper('session')->close();

        $apiKey = $this->param('apiKey');
        $bgColor = $this->param('bgColor');
        $primaryColor = $this->param('primaryColor');
        $textColor = $this->param('textColor');

        $this->layout = 'app:layouts/raw.php';

        return $this->render('system:views/api/graphql-viewer.php', compact('apiKey', 'bgColor', 'primaryColor', 'textColor'));
    }

    protected function cache() {
        $this->helper('api')->cache();
    }
}
