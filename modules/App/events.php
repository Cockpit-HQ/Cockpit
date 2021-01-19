<?php


$this->on('app.user.disguise', function(&$user) {
    unset($user['password'], $user['apiKey'], $user['_reset_token']);
});