<?php

namespace Lokalize\Controller;

use App\Controller\App;
use ArrayObject;

class Projects extends App {

    public function index() {

        $this->helper('theme')->favicon('lokalize:icon.svg');

        return $this->render('lokalize:views/projects/index.php');
    }

    public function load() {

        \session_write_close();

        return $this->module('lokalize')->projects([
            'fields' => ['keys' => 0, 'values' => 0]
        ]);
    }

    public function create() {

        $project = [
            'name' => '',
            'locales' => [],
            'keys'=> [],
            'values' => new \ArrayObject([]),
            'color' => '',
            'label' => '',
            'info' => '',
            'status' => ['_overall' => 0],
        ];

        $groups = $this->getGroups();

        $this->helper('theme')->favicon('lokalize:icon.svg');

        return $this->render('lokalize:views/projects/edit.php', compact('project', 'groups'));
    }

    public function edit($project = null) {

        if (!$project) {
            return false;
        }

        $project = $this->app->dataStorage->findOne('lokalize/projects', ['name' => $project], ['keys' => 0, 'values' => 0]);

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
            $this->app->stop(['error' => 'Project is already used!'], 412);
        }

        $project = $this->module('lokalize')->saveProject($project);

        if (isset($project['keys'])) unset($project['keys']);
        if (isset($project['values'])) unset($project['values']);
        if (isset($project['status'])) unset($project['status']);

        return $project;
    }


    protected function getGroups() {

        $groups = [];

        foreach ($this->module('lokalize')->projects() as $project) {

            if ($project['group'] && !\in_array($project['group'], $groups)) {
                $groups[] = $project['group'];
            }
        }

        sort($groups);

        return $groups;
    }
}