<?php

use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ObjectType;
use App\GraphQL\Types\JsonType;

$gql->queries['fields']['pagesMenu'] = [

    'type' => JsonType::instance(),

    'args' => [
        'name'  => Type::nonNull(Type::string()),
        'locale'  => Type::string(),
    ],

    'resolve' => function ($root, $args) use($app) {

        $locale = $args['locale'] ?? 'default';

        $menus = $app->module('pages')->menus([
            'filter'=> ['name' => $args['name']],
            'limit' => 1
        ]);

        return isset($menus[0]) ? $app->helper('locales')->applyLocales($menus[0], $locale) : null;
    }
];