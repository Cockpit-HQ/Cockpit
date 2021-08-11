<?php

use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ObjectType;
use App\GraphQL\Types\JsonType;

$gql->queries['fields']['content'] = [

    'type' => Type::listOf(JsonType::instance()),

    'args' => [
        'model'  => Type::nonNull(Type::string()),
        'limit' => Type::int(),
        'skip'  => Type::int(),
        'sort'  => JsonType::instance(),
        'locale'  => ['type' => Type::string(), 'defaultValue' => 'default'],
        'populate'   => ['type' => Type::int(), 'defaultValue' => 0],
        'projection' => ['type' => Type::string(), 'defaultValue' => ''],
        'filter'   => ['type' => JsonType::instance(), 'defaultValue' => []]
    ],

    'resolve' => function ($root, $args) use($app) {

        $model = $args['model'];

        if (!$app->module('content')->exists($model)) {
            return [];
        }

        if (!$app->helper('acl')->isAllowed("content/{$model}/read", $app->helper('auth')->getUser('role'))) {
            $app->response->status = 412;
            return [];
        }

        $meta = $app->module('content')->model($model);

        if ($meta['type'] == 'singleton') {
            return [$app->module('content')->item($model)];
        }

        $process  = ['locale' => $args['locale']];
        $options  = [];

        if ($args['populate']) {
            $process['populate'] = $args['populate'];
        }

        if (isset($args['limit'])) $options['limit'] = $args['limit'];
        if (isset($args['skip'])) $options['skip'] = $args['skip'];

        if (isset($args['sort'])) {
            $options['sort'] = $args['sort'];
        }

        if ($args['filter']) {
            $options['filter'] = $args['filter'];
        }

        if (!isset($options['filter']) || !is_array($options['filter'])) {
            $options['filter'] = [];
        }

        $options['filter']['_state'] = 1;

        return $app->module('content')->items($model, $options, $process);

    }
];
