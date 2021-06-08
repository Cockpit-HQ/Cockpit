<?php

// load admin related code
$this->on('app.admin.init', function() {
    include(__DIR__.'/admin.php');
});

// load api request related code
$this->on('app.api.request', function() {
    include(__DIR__.'/api.php');
});


// pages api
$this->module('pages')->extend([

    'menus' => function(array $options = []) {

        $options = array_merge([
            'sort' => ['name' => 1]
        ], $options);

        $menus = $this->app->dataStorage->find('pages/menus', $options)->toArray();

        return $menus;
    }
]);