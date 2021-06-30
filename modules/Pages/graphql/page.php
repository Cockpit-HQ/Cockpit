<?php

use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ObjectType;
use App\GraphQL\Types\JsonType;

$gql->queries['fields']['page'] = [

    'type' => JsonType::instance(),

    'args' => [
        'route'  => Type::nonNull(Type::string()),
        'locale'  => Type::string(),
        'populate'   => ['type' => Type::int(), 'defaultValue' => 0],
    ],

    'resolve' => function ($root, $args) use($app) {

        $locale = $args['locale'] ?? 'default';

        $page = $app->module('pages')->pageByRoute($args['route'], $locale);

        if ($page && $page['_state'] != 1) {
            $page = null;
        }

        if ($page && $args['populate'] && $app->module('content')) {
            $page = $app->module('content')->populate($page, $args['populate']);
        }

        return $page;
    }
];