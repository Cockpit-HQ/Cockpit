<?php

include(__DIR__.'/vendor/autoload.php');

include(__DIR__.'/Lime/App.php');
include(__DIR__.'/DotEnv.php');

/*
 * Autoload from lib folder (PSR-0)
 */
spl_autoload_register(function($class) {
    $class_path = __DIR__.'/'.str_replace('\\', '/', $class).'.php';
    if (file_exists($class_path)) include_once($class_path);
});
