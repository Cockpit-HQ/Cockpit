<?php

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class FieldTypes {

    protected static $types = [];
    protected static $names = [];

    private static function getName($name) {

        if (!isset(self::$names[$name])) {
            self::$names[$name] = 0;
        } else {
            self::$names[$name]++;
            $name .= self::$names[$name];
        }

        return $name;
    }

    public static function buildFieldsDefinitions($meta) {

        $fields = [];

        foreach ($meta['fields'] as $field) {

            $def = self::getType($field);
            $name = $field['name'];

            if (is_numeric($name)) {
                $name = "_{$name}_";
            }

            if ($def) {

                if (isset($def['type'], $field['required']) && $field['required']) {
                    $def['type'] = Type::nonNull($def['type']);
                }

                if ($field['multiple']) {
                    $fields[$name] = Type::listOf($def['type']);
                } else {
                    $fields[$name] = $def;
                }
            }
        }

        return $fields;
    }

    protected static function getType($field) {

        $def = [];

        switch ($field['type']) {
            case 'text':
            case 'code':
            case 'color':
            case 'date':
            case 'datetime':
            case 'wysiwyg':
            case 'time':
            case 'select':
                $def['type'] = Type::string();
                break;
            case 'boolean':
                $def['type'] = Type::boolean();
                break;
            case 'number':
                $def['type'] = Type::int();
                break;
            case 'layout':
                $def['type'] = JsonType::instance();
                break;
            case 'set':
                $def['type'] = new ObjectType([
                    'name' => self::getName('Set'.ucfirst($field['name'])),
                    'fields' => self::buildFieldsDefinitions($field['opts'])
                ]);
                break;

            default:
                $def['type'] = JsonType::instance();
        }

        return count($def) ? $def : null;
    }


    public static function instance($field) {
        self::getType($field);
    }
}
