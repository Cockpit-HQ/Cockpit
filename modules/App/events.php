<?php


$this->on('app.user.disguise', function(array &$user) {
    unset($user['password'], $user['apiKey'], $user['_reset_token']);
});