<?php

use GraphQL\Type\Definition\Type;
use App\GraphQL\Types\JsonType;

$gql->queries['fields']['lokalize'] = [

    'type' => JsonType::instance(),

    'args' => [
        'project'  => Type::nonNull(Type::string()),
        'nested'  => Type::int(),
        'locale'  => Type::string(),
    ],

    'resolve' => function ($root, $args) use($app) {

        $name = $args['project'];

        $project = $app->dataStorage->findOne('lokalize/projects', ['name' => $name]);

        if (!$project) {
            return null;
        }

        $values = new \ArrayObject(isset($project['values']) ? $project['values'] : []);

        foreach ($project['locales'] as $locale) {

            if (!isset($values[$locale['i18n']]))  {
                $values[$locale['i18n']] = new \ArrayObject([]);
            }

            foreach ($project['keys'] as $key) {
                if (!isset($values[$locale['i18n']][$key['name']])) {
                    $values[$locale['i18n']][$key['name']] = null;
                } else {
                    $values[$locale['i18n']][$key['name']] = $values[$locale['i18n']][$key['name']]['value'];
                }
            }
        }

        if (isset($args['nested']) && $args['nested']) {

            $resolveNested = function($obj) {

                foreach (array_keys((array)$obj) as $key) {
                    if (\strpos($key, '.') !== false) {
                        $val = $obj[$key];
                        $parts = explode('.', $key);

                        if (!isset($obj[$parts[0]]) || !\is_array($obj[$parts[0]])) {
                            $obj[$parts[0]] = [];
                        }

                        $obj[$parts[0]][$parts[1]] = $val;
                        unset($obj[$key]);
                    }
                }

                return $obj;
            };

            foreach (array_keys((array)$values) as $key) {
                $values[$key] = $resolveNested($values[$key]);
            }
        }

        $locale = $args['locale'] ?? null;

        return $locale ? ($values[$locale] ?? null): $values;
    }
];
