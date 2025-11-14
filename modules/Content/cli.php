<?php

if (!isset($cli, $app) || PHP_SAPI !== 'cli') {
    return;
}

$cli->add(new Content\Command\Field\Remove($app));
$cli->add(new Content\Command\Field\Rename($app));

$cli->add(new Content\Command\Index\Create($app));
$cli->add(new Content\Command\Index\Remove($app));
$cli->add(new Content\Command\Index\ListIndexes($app));
