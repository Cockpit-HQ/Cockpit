<?php

use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ObjectType;
use App\GraphQL\Types\JsonType;

$gql->queries['fields']['pagesMenus'] = [

    'type' => Type::listOf(JsonType::instance()),

    'args' => [
        'locale'  => Type::string(),
    ],

    'resolve' => function ($root, $args) use($app) {

        $locale = $args['locale'] ?? 'default';

        return $app->helper('locales')->applyLocales($app->module('pages')->menus(), $locale);
    }
];