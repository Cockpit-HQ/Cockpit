<?php

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\ScalarType;

class NumericType extends ScalarType {
    public string $name = 'NumericType';
    public ?string $description = 'The `Numeric` scalar type represents numeric values.';

    public function __construct(string $name = null) {
        if ($name) {
            $this->name = $name;
        }
        parent::__construct();
    }

    public function parseValue($value) {
        if (!is_numeric($value)) {
            throw new \GraphQL\Error\Error('Value must be numeric');
        }
        return $value + 0; // Returns int if whole number, float if fractional
    }

    public function serialize($value) {

        if (!is_numeric($value)) {
            throw new \GraphQL\Error\Error('Value must be numeric');
        }

        return (float)$value;
    }

    public function parseLiteral($valueNode, array $variables = null) {

        if ($valueNode instanceof \GraphQL\Language\AST\IntValueNode) {
            return intval($valueNode->value);
        } elseif ($valueNode instanceof \GraphQL\Language\AST\FloatValueNode) {
            return floatval($valueNode->value);
        } else {
            throw new \GraphQL\Error\Error('Value must be a number');
        }
    }

    public static function instance() {
        static $instance;

        if (is_null($instance)) {
            $instance = new static();
        }

        return $instance;
    }
}
