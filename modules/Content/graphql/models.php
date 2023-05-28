<?php

use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ObjectType;
use App\GraphQL\Types\JsonType;
use App\GraphQL\Types\FieldTypes;

$models      = $app->module('content')->models();
$collections = array_filter($models, fn($m) => in_array($m['type'], ['collection', 'tree']));
$singletons  = array_filter($models, fn($m) => $m['type'] == 'singleton');

// register collections
foreach ($collections as $name => &$meta) {

    $_name = $name.'Model';

    $gql->queries['fields'][$_name] = [

        'type' => Type::listOf(new ObjectType([
            'name'   => $_name,
            'fields' => function() use($meta, $app, $_name) {

                $fields = array_merge([
                    '_id'       => Type::nonNull(Type::string()),
                    '_created'  => Type::nonNull(Type::int()),
                    '_modified' => Type::nonNull(Type::int())
                ], FieldTypes::buildFieldsDefinitions($meta));

                return $fields;
            }
        ])),

        'args' => [
            '_id'   => Type::string(),
            'limit' => Type::int(),
            'skip'  => Type::int(),
            'sort'  => JsonType::instance(),
            'locale'  => ['type' => Type::string(), 'defaultValue' => 'default'],
            'populate'   => ['type' => Type::int(), 'defaultValue' => 0],
            'projection' => ['type' => Type::string(), 'defaultValue' => ''],
            'filter'   => ['type' => JsonType::instance(), 'defaultValue' => '']
        ],

        'resolve' => function ($root, $args) use($app, $name) {

            if (!$app->helper('acl')->isAllowed("content/{$name}/read", $app->helper('auth')->getUser('role'))) {
                $app->response->status = 412;
                return [];
            }

            $process  = ['locale' => $args['locale']];
            $options  = [];
            $populate = $args['populate'];

            if ($args['populate']) {
                $process['populate'] = $populate;
            }

            if (isset($args['limit'])) $options['limit'] = $args['limit'];
            if (isset($args['skip'])) $options['skip'] = $args['skip'];

            if (isset($args['sort'])) {
                $options['sort'] = $args['sort'];
            }

            if (isset($args['_id']) && $args['_id']) {
                $options['filter'] = ['_id' => $args['_id']];
            } else if (isset($args['filter']) && $args['filter']) {
                $options['filter'] = $args['filter'];
            }

            if (!isset($options['filter']) || !is_array($options['filter'])) {
                $options['filter'] = [];
            }

            $options['filter']['_state'] = 1;

            $items = $app->module('content')->items($name, $options, $process);

            if (count($items)) {
                $app->trigger('content.api.items', [&$items, $name]);
            }

            return $items;
        }
    ];
}

// register singletons
foreach ($singletons as $name => &$meta) {

    $_name = $name.'Model';

    $gql->queries['fields'][$_name] = [

        'type' => new ObjectType([
            'name'   => $_name,
            'fields' => function() use($meta, $app, $_name) {

                $fields = array_merge([
                    '_id' => Type::string(),
                    '_created' => Type::int(),
                    '_modified' =>Type::int()
                ], FieldTypes::buildFieldsDefinitions($meta));

                return $fields;
            }
        ]),

        'args' => [
            'locale'  => ['type' => Type::string(), 'defaultValue' => 'default'],
            'populate' => ['type' => Type::int(), 'defaultValue' => 0],
        ],

        'resolve' => function ($root, $args) use($app, $name) {

            if (!$app->helper('acl')->isAllowed("content/{$name}/read", $app->helper('auth')->getUser('role'))) {
                $app->response->status = 412;
                return null;
            }

            $process  = ['locale' => $args['locale']];
            $options  = [];

            if (isset($args['populate']) && $args['populate']) {
                $process['populate'] = $args['populate'];
            }

            $item = $app->module('content')->item($name, $options, null, $process);

            if (!isset($item['_state']) || $item['_state'] != 1) {
                return null;
            }

            $app->trigger('content.api.item', [&$item, $name]);

            return $item;
        }
    ];
}
