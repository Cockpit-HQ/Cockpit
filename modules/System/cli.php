<?php

if (!isset($cli, $app) || PHP_SAPI !== 'cli') {
    return;
}

$cli->add(new System\Command\App\Update($app));
$cli->add(new System\Command\Cache\Flush($app));
$cli->add(new System\Command\Spaces\Create($app));
$cli->add(new System\Command\i18n\CreateTranslation($app));
