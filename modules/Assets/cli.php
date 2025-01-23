<?php

if (!isset($cli, $app) || PHP_SAPI !== 'cli') {
    return;
}

$cli->add(new Assets\Command\FixVisibilityPermissions($app));
$cli->add(new Assets\Command\Thumbhash($app));
