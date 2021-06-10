<?php

use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ObjectType;
use App\GraphQL\Types\JsonType;

$gql->queries['fields']['page'] = [

    'type' => JsonType::instance(),

    'args' => [
        'route'  => Type::nonNull(Type::string()),
        'locale'  => Type::string(),
    ],

    'resolve' => function ($root, $args) use($app) {

        $locale = $args['locale'] ?? 'default';

        $page = $app->module('pages')->pageByRoute($args['route'], $locale);

        return $page;
    }
];