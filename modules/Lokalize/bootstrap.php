<?php


// load admin related code
$this->on('app.admin.init', function() {
    include(__DIR__.'/admin.php');
});

// load api request related code
$this->on('app.api.request', function() {
    include(__DIR__.'/api.php');
});


// content api
$this->module('lokalize')->extend([

    'projects' => function(array $options = []) {

        $options = array_merge([
            'sort' => ['name' => -1]
        ], $options);

        $projects = $this->app->dataStorage->find('lokalize/projects', $options)->toArray();

        return $projects;
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
    }

]);
