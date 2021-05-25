<?php

namespace App\GraphQL;

use ArrayObject;
use GraphQL\GraphQL;
use GraphQL\Type\Schema;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class Query extends \Lime\AppAware {

    protected $initialized = false;
    public $queries;
    public $mutations;
    public $types;
    public $directives;

    public function init() {

        if ($this->initialized) return;

        $this->queries = new \ArrayObject(['name' => 'Query', 'fields' => []]);
        $this->mutations = new \ArrayObject(['name' => 'Mutation', 'fields' => []]);
        $this->types = new \ArrayObject([]);
        $this->directives = new \ArrayObject(GraphQL::getStandardDirectives());
        $this->app->trigger('graphql.config', [$this]);
        $this->initialized = true;
    }

    public function process($query = '{}', $variables = null) {

        if (!$this->initialized) {
            $this->init();
        }

        $queryType = new ObjectType($this->queries->getArrayCopy());
        $mutationType = new ObjectType($this->mutations->getArrayCopy());

        $schema = new Schema([
            'query' => $queryType,
            'mutation' => $mutationType,
            'types' => $this->types->getArrayCopy(),
            'directives' => $this->directives->getArrayCopy(),
        ]);

        $rootValue = [];
        $context = new ArrayObject([]);
        $result = GraphQL::executeQuery($schema, $query, $rootValue, null, $variables)->toArray();

        if (isset($result['data'])) {

            foreach ($result['data'] as $key => $value) {

                if ($value && is_string($value)) {

                    $start = substr($value,0,1);
                    $end   = substr($value,-1,1);

                    if (($start == '[' && $end == ']') || ($start == '{' && $end == '}')) {
                        $result['data'][$key] = json_decode($value);
                    } elseif ($value == 'null') {
                        $result['data'][$key] = null;
                    }
                }
            }
        }

        return $result;
    }
}