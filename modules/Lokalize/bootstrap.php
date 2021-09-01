<?php

// load admin related code
$this->on('app.admin.init', function() {
    include(__DIR__.'/admin.php');
});

// load api request related code
$this->on('app.api.request', function() {
    include(__DIR__.'/api.php');
});


// lokalize api
$this->module('lokalize')->extend([

    'projects' => function(array $options = []) {

        $options = array_merge([
            'sort' => ['name' => 1]
        ], $options);

        $projects = $this->app->dataStorage->find('lokalize/projects', $options)->toArray();

        return $projects;
    },

    'project' => function(string $name) {

        $project = $this->app->dataStorage->findOne('lokalize/projects', ['name' => $name]);

        return $project;
    },

    'saveProject' => function(array $project) {

        $this->app->trigger('lokalize.save.project', [&$project]);

        if (!isset($project['_id']) && isset($project['locales']) && count($project['locales'])) {

            foreach ($project['locales'] as $locale) {
                $project['status'][$locale['i18n']] = 0;
            }
        }

        $this->app->dataStorage->save('lokalize/projects', $project);

        return $project;
    },

    'value' => function(string $projectName, string $key, ?string $locale = null) {

        static $projects;

        if (is_null($projects)) {
            $projects = [];
        }

        // chack for cached project
        if (!isset($projects[$projectName])) {

            $project = $this->project($projectName);

            if (!$project) {
                $projects[$projectName] = false;
                return null;
            }

            $values = new \ArrayObject(isset($project['values']) ? $project['values'] : []);

            foreach ($project['locales'] as $_locale) {

                if (!isset($values[$_locale['i18n']]))  {
                    $values[$_locale['i18n']] = new \ArrayObject([]);
                }
            }

            $project['values'] = $values;

            // cache project for further calls
            $projects[$projectName] = $project;
        }

        $project = $projects[$projectName];

        if (!$project) {
            return null;
        }

        if ($locale && !isset($project['values'][$locale])) {
            return null;
        }

        if ($locale) {
            return $project['values'][$locale][$key]['value'] ?? null;
        }

        $values = [];

        foreach ($project['locales'] as $_locale) {
            $values[$_locale['i18n']] = $project['values'][$_locale['i18n']][$key]['value'] ?? null;
        }

        return $values;
    }

]);
