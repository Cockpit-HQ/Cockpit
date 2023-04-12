<?php

if (!isset($cli, $app) || PHP_SAPI !== 'cli') {
    return;
}

$cli->add(new Content\Command\Field\Remove($app));
$cli->add(new Content\Command\Field\Rename($app));
