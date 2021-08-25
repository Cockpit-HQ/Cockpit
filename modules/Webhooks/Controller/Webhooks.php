<?php

namespace Webhooks\Controller;

use App\Controller\App;
use ArrayObject;

class Webhooks extends App {

    protected function before() {

        if (!$this->isAllowed('webhooks/manage')) {
            $this->stop(401);
        }
    }

    public function index() {

        $this->helper('theme')->favicon('webhooks:icon.svg');

        return $this->render('webhooks:views/index.php');
    }

    public function load() {

        \session_write_close();

        $options = [
            'sort' => ['name' => 1]
        ];

        $webhooks = $this->app->dataStorage->find('webhooks', $options)->toArray();

        return $webhooks;
    }

    public function webhook($id = null) {

        $webhook = [
            'enabled' => false,
            'name' => '',
            'info' => '',
            'url' => '',
            'headers' => [],
            'body' => [
                'payload' => false,
                'custom' => false,
                'contents' => null
            ]
        ];

        if ($id) {

            $hook = $this->app->dataStorage->findOne('webhooks', ['_id' => $id]);

            if (!$id) {
                return false;
            }

            $webhook = \array_merge($webhook, $hook);
        }


        return $this->render('webhooks:views/webhook.php', compact('webhook'));
    }

    public function save() {

        $webhook = $this->param('webhook');

        if (!$webhook) {
            return false;
        }

        $webhook['_modified'] = time();
        $webhook['_mby'] = $this->user['_id'];

        if (!isset($webhook['_id'])) {
            $webhook['_created'] = $webhook['_modified'];
            $webhook['_cby'] = $this->user['_id'];
        }

        $this->app->dataStorage->save('webhooks', $webhook);

        return $webhook;
    }

    public function remove() {

        $webhook = $this->param('webhook');

        if (!$webhook) {
            return $this->stop(['error' => 'Webhook paramater is missing'], 412);
        }

        $this->app->dataStorage->remove('webhooks', ['_id' => $webhook['_id']]);

        return ['success' => true];
    }


}