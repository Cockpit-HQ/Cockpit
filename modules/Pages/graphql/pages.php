<?php

use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ObjectType;
use App\GraphQL\Types\JsonType;

$gql->queries['fields']['pages'] = [

    'type' => Type::listOf(JsonType::instance()),

    'args' => [
        'locale'  => Type::string(),
    ],

    'resolve' => function ($root, $args) use($app) {

        $locale = $args['locale'] ?? 'default';

        $pages = $app->dataStorage->find('pages', [
            'filter' => ['_state' => 1],
            'sort' => ['_o' => 1]
        ])->toArray();

        return $app->helper('locales')->applyLocales($pages, $locale);
    }
];