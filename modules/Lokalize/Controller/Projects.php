<?php

namespace Lokalize\Controller;

use App\Controller\App;
use ArrayObject;

class Projects extends App {

    protected function before() {

        if (!$this->isAllowed('lokalize/projects/manage')) {
            $this->stop(401);
        }
    }

    public function index() {

        $this->helper('theme')->favicon('lokalize:icon.svg');

        return $this->render('lokalize:views/projects/index.php');
    }

    public function load() {

        \session_write_close();

        return $this->module('lokalize')->projects([
            'fields' => ['values' => 0]
        ]);
    }

    public function project($name) {

        if (!$name) {
            return false;
        }

        $project = $this->app->dataStorage->findOne('lokalize/projects', ['name' => $name]);

        if (!$project) {
            return false;
        }

        $this->checkAndLockResource($project['_id']);

        $project['values'] = new ArrayObject($project['values'] ?? []);

        // fill values if needed
        foreach ($project['locales'] as $locale) {

            if (!isset($project['values'][$locale['i18n']])) {
                $project['values'][$locale['i18n']] = new ArrayObject([]);
            }

            foreach ($project['keys'] as $key) {
                if (!isset($project['values'][$locale['i18n']][$key['name']])) {
                    $project['values'][$locale['i18n']][$key['name']] = ['value' => null];
                }
            }
        }

        $this->helper('theme')->favicon('lokalize:icon.svg', $project['color'] ?? '#000');

        return $this->render('lokalize:views/projects/project.php', compact('project'));
    }

    public function create() {

        $project = [
            'name' => '',
            'locales' => $this->helper('locales')->locales(),
            'keys'=> [],
            'values' => new \ArrayObject([]),
            'group' => '',
            'color' => '',
            'label' => '',
            'info' => '',
            'status' => ['_overall' => 0],
        ];

        $groups = $this->getGroups();

        $this->helper('theme')->favicon('lokalize:icon.svg');

        return $this->render('lokalize:views/projects/edit.php', compact('project', 'groups'));
    }

    public function edit($name = null) {

        if (!$name) {
            return $this->stop(['error' => 'project name is missing'], 412);
        }

        $project = $this->app->dataStorage->findOne('lokalize/projects', ['name' => $name], ['keys' => 0, 'values' => 0]);

        if (!$project) {
            return false;
        }

        $groups = $this->getGroups();

        $this->helper('theme')->favicon('lokalize:icon.svg');

        return $this->render('lokalize:views/projects/edit.php', compact('project', 'groups'));
    }

    public function remove() {

        $project = $this->param('project');

        if (!$project || !isset($project['_id'], $project['name'])) {
            return $this->stop(['error' => 'project is missing'], 412);
        }

        $this->app->dataStorage->remove('lokalize/projects', ['_id' => $project['_id']]);

        $this->app->trigger('lokalize.projects.remove', [$project]);

        return ['success' => true];
    }

    public function save() {

        $project = $this->param('project');

        if (!$project) {
            return false;
        }

        $project['_modified'] = time();
        $project['_mby'] = $this->user['_id'];

        if (isset($project['_id'])) {
            if (isset($project['keys'])) unset($project['keys']);
            if (isset($project['values'])) unset($project['values']);
            if (isset($project['status'])) unset($project['status']);
        } else {
            $project['_created'] = $project['_modified'];
            $project['_cby'] = $this->user['_id'];
        }

        // unique check
        $_project = $this->app->dataStorage->findOne('lokalize/projects', ['name' => $project['name']], ['_id' => 1]);

        if ($_project && (!isset($project['_id']) || $project['_id'] != $_project['_id'])) {
            $this->app->stop(['error' => 'Project name is already used!'], 412);
        }

        $project = $this->module('lokalize')->saveProject($project);

        if (isset($project['keys'])) unset($project['keys']);
        if (isset($project['values'])) unset($project['values']);
        if (isset($project['status'])) unset($project['status']);

        return $project;
    }

    public function update($name = null) {

        if (!$name) {
            return $this->stop(['error' => 'project name is missing'], 412);
        }

        $project = $this->app->dataStorage->findOne('lokalize/projects', ['name' => $name]);

        if (!$project) {
            return false;
        }

        $keys = $this->param('keys');
        $values = $this->param('values');

        if (!isset($keys, $values)) {
            return $this->stop(['error' => 'keys or values is missing'], 412);
        }

        $status = ['_overall' => 0];

        foreach ($project['locales'] as $locale) {

            $status[$locale['i18n']] = 0;

            foreach ($keys as $key) {
                if (isset($values[$locale['i18n']][$key['name']]['value']) && $values[$locale['i18n']][$key['name']]['value']) {
                    $status[$locale['i18n']] += 1;
                }

            }

            $status[$locale['i18n']] = round((count($keys) ? $status[$locale['i18n']]/count($keys) : 0) * 100);
            $status['_overall'] += $status[$locale['i18n']];
        }

        $status['_overall'] = round($status['_overall']/count($project['locales']));

        $update = [
            '_id' => $project['_id'],
            'keys' => $keys,
            'values' => $values,
            'status' => $status,
            '_modified' => time(),
            '_mby' => $this->user['_id']
        ];

        $this->app->dataStorage->save('lokalize/projects', $update);

        $update['values'] = new ArrayObject($update['values'] ?? []);

        return $update;
    }

    protected function getGroups() {

        $groups = [];

        foreach ($this->module('lokalize')->projects() as $project) {

            if (isset($project['group']) && $project['group'] && !\in_array($project['group'], $groups)) {
                $groups[] = $project['group'];
            }
        }

        sort($groups);

        return $groups;
    }
}