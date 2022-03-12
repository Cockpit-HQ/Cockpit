<?php

if (!isset($cli, $app) || PHP_SAPI !== 'cli') {
    return;
}

$cli->add(new App\Command\Cache\Flush($app));
$cli->add(new App\Command\Spaces\Create($app));
$cli->add(new App\Command\i18n\CreateTranslation($app));