<?php

include (__DIR__.'/../bootstrap.php');

$app = APP::instance();

if ($app->data->count('system/users')) {
    echo 0;
    return;
}

$created = time();

$user = [
    'active' => true,
    'user' => 'admin',
    'name' => 'Admin',
    'email' => 'admin@admin.com',
    'password' => $app->hash('admin'),
    'i18n' => 'en',
    'group' => 'admin',
    '_modified' => $created,
    '_created' => $created
];

$app->data->save('system/users', $user);

echo 1;