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
    },

    'translate' => function(string $text, string $to) {

        $apiKey = $this->app->retrieve('lokalize/translation/apiKey');

        if (!$apiKey) {
            return ['error' => 'Translation api key is missing'];
        }

        if (!$text || !$to) {
            return false;
        }

        $ch = curl_init();

        $data = [
            'auth_key' => $apiKey,
            'text' => $text,
            'target_lang' => $to
        ];

        curl_setopt($ch, CURLOPT_URL, 'https://api-free.deepl.com/v2/translate');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));

        $error = null;
        $headers = [];
        $headers[] = 'Content-Type: application/x-www-form-urlencoded';

        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

        $result = curl_exec($ch);

        if (curl_errno($ch)) {
            $error = ['error' => curl_error($ch)];
        }

        curl_close($ch);

        if ($error) {
            return $error;
        }

        $json = \json_decode($result, true);
        $translation = '';

        if (isset($json['translations'][0]['text'])) {
            $translation = $json['translations'][0]['text'];
        }

        return $translation;
    }

]);
