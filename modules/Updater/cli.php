<?php

if (!isset($cli, $app) || PHP_SAPI !== 'cli') {
    return;
}

$cli->add(new Updater\Command\App\Update($app));
