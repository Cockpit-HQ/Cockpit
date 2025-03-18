<?php

if (!isset($cli, $app) || PHP_SAPI !== 'cli') {
    return;
}

$cli->add(new System\Command\Cache\Flush($app));
$cli->add(new System\Command\Spaces\Create($app));
$cli->add(new System\Command\i18n\CreateTranslation($app));

$cli->add(new System\Command\Worker\ListWorkers($app));
$cli->add(new System\Command\Worker\Start($app));
$cli->add(new System\Command\Worker\Stop($app));
