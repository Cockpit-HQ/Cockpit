<?php

/**
 *
 * @OA\Tag(
 *   name="content",
 *   description="Content module",
 * )
 */

$this->on('restApi.config', function($restApi) {

    $restApi->addEndPoint('/content/item/{model}', [

        /**
         * @OA\Get(
         *     path="/content/item/{model}",
         *     tags={"content"},
         *     @OA\Parameter(
         *         description="Model name",
         *         in="path",
         *         name="model",
         *         required=true,
         *         @OA\Schema(type="string")
         *     ),
         *    @OA\Parameter(
         *         description="Return content for specified locale",
         *         in="query",
         *         name="locale",
         *         required=false,
         *         @OA\Schema(type="string")
         *     ),
         *     @OA\Parameter(
         *         description="Url encoded filter json",
         *         in="query",
         *         name="filter",
         *         required=false,
         *         @OA\Schema(type="string")
         *     ),
         *     @OA\Parameter(
         *         description="Url encoded fields projection as json",
         *         in="query",
         *         name="fields",
         *         required=false,
         *         @OA\Schema(type="string")
         *     ),
         *     @OA\Parameter(
         *         description="Populate item with linked content items.",
         *         in="query",
         *         name="populate",
         *         required=false,
         *         @OA\Schema(type="integer")
         *     ),
         *     @OA\OpenApi(
         *         security={
         *             {"api_key": {}}
         *         }
         *     ),
         *     @OA\Response(response="200", description="Get model item", @OA\JsonContent()),
         *     @OA\Response(response="404", description="Model not found"),
         *     @OA\Response(response="401", description="Unauthorized")
         * )
         */

        'GET' => function($params, $app) {

            $model = $params['model'];

            if (!$app->module('content')->model($model)) {
                $app->response->status = 404;
                return ['error' => "Model <{$model}> not found"];
            }

            if (!$app->helper('acl')->isAllowed("content/{$model}/read", $app->helper('auth')->getUser('role'))) {
                $app->response->status = 403;
                return ['error' => 'Permission denied'];
            }

            $process = [
                'locale' => $app->param('locale:string', 'default')
            ];

            $filter = $app->param('filter:string');
            $fields = $app->param('fields:string', null);
            $populate = $app->param('populate:int', null);

            if ($filter) {
                try {
                    $filter = json5_decode($filter, true);
                } catch(\Throwable $e) {
                    $app->response->status = 400;
                    return ['error' => "<filter> is not valid json"];
                }
            }

            if ($fields) {
                try {
                    $fields = json5_decode($fields, true);
                } catch(\Throwable $e) {
                    $app->response->status = 400;
                    return ['error' => "<fields> is not valid json"];
                }
            }

            if (!isset($filter) || !is_array($filter)) {
                $filter = [];
            }

            // only published items
            $filter['_state'] = 1;

            if ($populate) {
                $process['populate'] = $populate;
                $process['user'] = $app->helper('auth')->getUser();
            }

            $item = $app->module('content')->item($model, $filter, $fields, $process);

            if ($item) {
                $app->trigger('content.api.item', [&$item, $model]);
            }

            return $item ?? false;
        },

        /**
         * @OA\Post(
         *     path="/content/item/{model}",
         *     tags={"content"},
         *     @OA\Parameter(
         *         description="Model name",
         *         in="path",
         *         name="model",
         *         required=true,
         *         @OA\Schema(type="string")
         *     ),
         *     @OA\RequestBody(
         *         description="Content item data",
         *         required=true,
         *         @OA\JsonContent(
         *             type="object",
         *             @OA\Property(property="data", type="object")
         *         )
         *     ),
         *     @OA\OpenApi(
         *         security={
         *             {"api_key": {}}
         *         }
         *     ),
         *     @OA\Response(response="200", description="Saved model item", @OA\JsonContent()),
         *     @OA\Response(response="404", description="Model not found"),
         *     @OA\Response(response="401", description="Unauthorized"),
         *     @OA\Response(response="412", description="Item data is missing")
         * )
         */

        'POST' => function($params, $app) {

            $model = $app->module('content')->model($params['model']);
            $data  = $app->param('data');

            if (!$model) {
                $app->response->status = 404;
                return ['error' => "Model <{$params['model']}> not found"];
            }

            if (!$data || !is_array($data)) {
                $app->response->status = 412;
                return ['error' => 'Item data is missing'];
            }

            $default = array_merge($app->module('content')->getDefaultModelItem($model['name']), ['_state' => 1]);

            // create
            if (!isset($data['_id'])) {

                if (!$app->helper('acl')->isAllowed("content/{$model['name']}/create", $app->helper('auth')->getUser('role'))) {
                    $app->response->status = 403;
                    return ['error' => 'Permission denied'];
                }

                $data = array_merge($default, $data);

            // update
            } else {

                if (!$app->helper('acl')->isAllowed("content/{$model['name']}/update", $app->helper('auth')->getUser('role'))) {
                    $app->response->status = 403;
                    return ['error' => 'Permission denied'];
                }

                if (isset($data['_state']) && !$app->helper('acl')->isAllowed("content/{$model['name']}/publish", $app->helper('auth')->getUser('role'))) {
                    unset($item['_state']);
                }
            }

            // remove properties not available in the field list
            $allowedKeys = array_merge(['_id'], array_keys($default));

            foreach (array_keys($data) as $key) {
                if (!in_array($key, $allowedKeys)) unset($data[$key]);
            }

            $item = $app->module('content')->saveItem($model['name'], $data, ['user' => $app->helper('auth')->getUser()]);

            return $item;
        }
    ]);

    $restApi->addEndPoint('/content/item/{model}/{id}', [

        /**
         * @OA\Get(
         *     path="/content/item/{model}/{id}",
         *     tags={"content"},
         *     @OA\Parameter(
         *         description="Model name",
         *         in="path",
         *         name="model",
         *         required=true,
         *         @OA\Schema(type="string")
         *     ),
         *     @OA\Parameter(
         *         description="Conten item id",
         *         in="path",
         *         name="id",
         *         required=true,
         *         @OA\Schema(type="string")
         *     ),
         *    @OA\Parameter(
         *         description="Return content for specified locale",
         *         in="query",
         *         name="locale",
         *         required=false,
         *         @OA\Schema(type="string")
         *     ),
         *     @OA\Parameter(
         *         description="Url encoded fields projection as json",
         *         in="query",
         *         name="fields",
         *         required=false,
         *         @OA\Schema(type="string")
         *     ),
         *     @OA\Parameter(
         *         description="Populate item with linked content items.",
         *         in="query",
         *         name="populate",
         *         required=false,
         *         @OA\Schema(type="integer")
         *     ),
         *     @OA\OpenApi(
         *         security={
         *             {"api_key": {}}
         *         }
         *     ),
         *     @OA\Response(response="200", description="Get content item", @OA\JsonContent()),
         *     @OA\Response(response="404", description="Model not found"),
         *     @OA\Response(response="401", description="Unauthorized")
         * )
         */

        'GET' => function($params, $app) {

            $model = $params['model'];

            if (!$app->module('content')->model($model)) {
                $app->response->status = 404;
                return ['error' => "Model <{$model}> not found"];
            }

            if (!$app->helper('acl')->isAllowed("content/{$model}/read", $app->helper('auth')->getUser('role'))) {
                $app->response->status = 403;
                return ['error' => 'Permission denied'];
            }

            $process = [
                'locale' => $app->param('locale:string', 'default')
            ];

            $filter = ['_id' => $params['id'], '_state' => 1];
            $fields = $app->param('fields:string', null);
            $populate = $app->param('populate:int', null);

            if ($fields) {
                try {
                    $fields = json5_decode($fields, true);
                } catch(\Throwable $e) {
                    $app->response->status = 400;
                    return ['error' => "<fields> is not valid json"];
                }
            }

            if ($populate) {
                $process['populate'] = $populate;
                $process['user'] = $app->helper('auth')->getUser();
            }

            $item = $app->module('content')->item($model, $filter, $fields, $process);

            if ($item) {
                $app->trigger('content.api.item', [&$item, $model]);
            }

            return $item ?? false;
        },

        /**
         * @OA\Delete(
         *     path="/content/item/{model}/{id}",
         *     tags={"content"},
         *     @OA\Parameter(
         *         description="Model name",
         *         in="path",
         *         name="model",
         *         required=true,
         *         @OA\Schema(type="string")
         *     ),
         *     @OA\Parameter(
         *         description="Content item id",
         *         in="path",
         *         name="id",
         *         required=true,
         *         @OA\Schema(type="string")
         *     ),
         *     @OA\OpenApi(
         *         security={
         *             {"api_key": {}}
         *         }
         *     ),
         *     @OA\Response(response="200", description="Content item removed", @OA\JsonContent()),
         *     @OA\Response(response="404", description="Model not found"),
         *     @OA\Response(response="401", description="Unauthorized")
         * )
         */

        'DELETE' => function($params, $app) {

            $model = $app->module('content')->model($params['model']);

            if (!$model) {
                $app->response->status = 404;
                return ['error' => "Model <{$params['model']}> not found"];
            }

            if (!in_array($model['type'], ['collection', 'tree'])) {
                $app->response->status = 412;
                return ['error' => "DELETE method not allowed for <{$model['name']}>"];
            }

            if (!$app->helper('acl')->isAllowed("content/{$model['name']}/delete", $app->helper('auth')->getUser('role'))) {
                $app->response->status = 403;
                return ['error' => 'Permission denied'];
            }

            $app->module('content')->remove($model['name'], ['_id' => $params['id']]);

            return ['success' => true];
        }
    ]);

    /**
     * @OA\Get(
     *     path="/content/items/{model}",
     *     tags={"content"},
     *     @OA\Parameter(
     *         description="Model name",
     *         in="path",
     *         name="model",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *    @OA\Parameter(
     *         description="Return content for specified locale",
     *         in="query",
     *         name="locale",
     *         required=false,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Parameter(
     *         description="Url encoded filter json",
     *         in="query",
     *         name="filter",
     *         required=false,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Parameter(
     *         description="Url encoded sort json",
     *         in="query",
     *         name="sort",
     *         required=false,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Parameter(
     *         description="Url encoded fields projection as json",
     *         in="query",
     *         name="fields",
     *         required=false,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Parameter(
     *         description="Max amount of items to return",
     *         in="query",
     *         name="limit",
     *         required=false,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Parameter(
     *         description="Amount of items to skip",
     *         in="query",
     *         name="skip",
     *         required=false,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Parameter(
     *         description="Populate items with linked content items.",
     *         in="query",
     *         name="populate",
     *         required=false,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\OpenApi(
     *         security={
     *             {"api_key": {}}
     *         }
     *     ),
     *     @OA\Response(
     *         response="200",
     *         description="Get list of published model items",
     *         @OA\JsonContent(
     *             oneOf={
     *                 @OA\Schema(type="array", @OA\Items(type="object", additionalProperties=true)),
     *                 @OA\Schema(
     *                     type="object",
     *                     @OA\Property(property="data", type="array", @OA\Items(type="object", additionalProperties=true)),
     *                     @OA\Property(
     *                         property="meta",
     *                         type="object",
     *                         @OA\Property(property="total", type="integer")
     *                     )
     *                 )
     *             }
     *         )
     *     ),
     *     @OA\Response(response="401", description="Unauthorized"),
     *     @OA\Response(response="404", description="Model not found")
     * )
     */

    $restApi->addEndPoint('/content/items/{model}', [

        'GET' => function($params, $app) {

            $model = $params['model'];

            if (!$app->module('content')->model($model)) {
                $app->response->status = 404;
                return ['error' => "Model <{$model}> not found"];
            }

            if (!$app->helper('acl')->isAllowed("content/{$model}/read", $app->helper('auth')->getUser('role'))) {
                $app->response->status = 403;
                return ['error' => 'Permission denied'];
            }

            $options = [];
            $process = ['locale' => $app->param('locale', 'default')];

            $limit = $app->param('limit:int', null);
            $skip = $app->param('skip:int', null);
            $populate = $app->param('populate:int', null);
            $filter = $app->param('filter:string', null);
            $sort = $app->param('sort:string', null);
            $fields = $app->param('fields:string', null);

            if (!is_null($filter)) $options['filter'] = $filter;
            if (!is_null($sort)) $options['sort'] = $sort;
            if (!is_null($fields)) $options['fields'] = $fields;
            if (!is_null($limit)) $options['limit'] = $limit;
            if (!is_null($skip)) $options['skip'] = $skip;

            foreach (['filter', 'fields', 'sort'] as $prop) {
                if (isset($options[$prop])) {
                    try {
                        $options[$prop] = json5_decode($options[$prop], true);
                    } catch(\Throwable $e) {
                        $app->response->status = 400;
                        return ['error' => "<{$prop}> is not valid json"];
                    }
                }
            }

            if ($populate) {
                $process['populate'] = $populate;
                $process['user'] = $app->helper('auth')->getUser();
            }

            if (!isset($options['filter']) || !is_array($options['filter'])) {
                $options['filter'] = [];
            }

            $options['filter']['_state'] = 1;

            $items = $app->module('content')->items($model, $options, $process);

            if (count($items)) {
                $app->trigger('content.api.items', [&$items, $model]);
            }

            if (isset($options['skip'], $options['limit'])) {
                return [
                    'data' => $items,
                    'meta' => [
                        'total' => $app->module('content')->count($model, $options['filter'] ?? [])
                    ]
                ];
            }

            return $items;
        }
    ]);

    /**
     * @OA\Get(
     *     path="/content/items",
     *     tags={"content"},
     *    @OA\Parameter(
     *         description="Models query as json {model1:{filter:{...}}, model2:{...}}",
     *         in="query",
     *         name="models",
     *         required=false,
     *         @OA\Schema(type="string")
     *     ),
     *    @OA\Parameter(
     *         description="Return content for specified locale",
     *         in="query",
     *         name="locale",
     *         required=false,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Parameter(
     *         description="Populate items with linked content items.",
     *         in="query",
     *         name="populate",
     *         required=false,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\OpenApi(
     *         security={
     *             {"api_key": {}}
     *         }
     *     ),
     *     @OA\Response(
     *         response="200",
     *         description="Get list of published model items",
     *         @OA\JsonContent(
     *             oneOf={
     *                 @OA\Schema(type="array", @OA\Items(type="object", additionalProperties=true)),
     *                 @OA\Schema(
     *                     type="object",
     *                     @OA\Property(property="data", type="array", @OA\Items(type="object", additionalProperties=true)),
     *                     @OA\Property(
     *                         property="meta",
     *                         type="object",
     *                         @OA\Property(property="total", type="integer")
     *                     )
     *                 )
     *             }
     *         )
     *     ),
     *     @OA\Response(response="401", description="Unauthorized"),
     * )
     */
    $restApi->addEndPoint('/content/items', [

        'GET' => function($params, $app) {

            $models = $app->param('models:string', null);

            if (!$models) {
                $app->response->status = 412;
                return ['error' => '<models> parameter is missing'];
            }

            try {
                $models = json5_decode($models, true);
            } catch(\Throwable $e) {
                $app->response->status = 412;
                return ['error' => '<models> is not valid json'];
            }

            $content = $app->module('content');
            $acl = $app->helper('acl');
            $auth = $app->helper('auth');

            $user = $auth->getUser();
            $locale = $app->param('locale', 'default');
            $populate = $app->param('populate:int', null);

            $return = [];

            foreach ($models as $model => $opts) {

                $m = $opts['model'] ?? $model;
                $meta = $content->model($m);

                if (!$meta || !$acl->isAllowed("content/{$m}/read", $user['role'] ?? null)) {
                    continue;
                }

                $options = [];
                $process = ['locale' => $opts['locale'] ?? $locale];

                if (isset($opts['filter'])) $options['filter'] = $opts['filter'];
                if (isset($opts['sort'])) $options['sort'] = $opts['sort'];
                if (isset($opts['fields'])) $options['fields'] = $opts['fields'];
                if (isset($opts['limit'])) $options['limit'] = $opts['limit'];
                if (isset($opts['skip'])) $options['skip'] = $opts['skip'];

                if ($populate || isset($opts['populate'])) {
                    $process['populate'] = intval($opts['populate'] ?? $populate);
                    $process['user'] = $user;
                }

                if (!isset($options['filter']) || !is_array($options['filter'])) {
                    $options['filter'] = [];
                }

                // only published items
                $options['filter']['_state'] = 1;

                // is model singleton?
                if ($meta['type'] == 'singleton') {

                    $item = $app->module('content')->item($m, $options['filter'], $options['fields'] ?? null, $process);

                    if ($item) {
                        $app->trigger('content.api.item', [&$item, $m]);
                    }

                    $return[$model] = $item;

                    continue;
                }

                $items = $content->items($m, $options, $process);

                if (count($items)) {
                    $app->trigger('content.api.items', [&$items, $m]);
                }

                if (isset($options['skip'], $options['limit'])) {
                    $return[$model] = [
                        'data' => $items,
                        'meta' => [
                            'total' => $content->count($m, $options['filter'] ?? [])
                        ]
                    ];
                } else {
                    $return[$model] = $items;
                }
            }

            return $return;
        }
    ]);

    /**
     * @OA\Get(
     *     path="/content/aggregate/{model}",
     *     tags={"content"},
     *     @OA\Parameter(
     *         description="Model name",
     *         in="path",
     *         name="model",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Parameter(
     *         description="Url encoded pipeline json",
     *         in="query",
     *         name="pipeline",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *    @OA\Parameter(
     *         description="Return content for specified locale",
     *         in="query",
     *         name="locale",
     *         required=false,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Parameter(
     *         description="Populate items with linked content items.",
     *         in="query",
     *         name="populate",
     *         required=false,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\OpenApi(
     *         security={
     *             {"api_key": {}}
     *         }
     *     ),
     *     @OA\Response(response="200", description="Get list of aggregated and published model items", @OA\JsonContent(type="array", @OA\Items(type="object", additionalProperties=true))),
     *     @OA\Response(response="401", description="Unauthorized"),
     *     @OA\Response(response="404", description="Model not found")
     * )
     */

    $restApi->addEndPoint('/content/aggregate/{model}', [

        'GET' => function ($params, $app) {

            $model = $app->module('content')->model($params['model']);
            $pipeline = $app->param('pipeline:string', null);

            if (!$model) {
                $app->response->status = 404;
                return ['error' => "Model <{$params['model']}> not found"];
            }

            if (!$app->helper('acl')->isAllowed("content/{$params['model']}/read", $app->helper('auth')->getUser('role'))) {
                $app->response->status = 403;
                return ['error' => 'Permission denied'];
            }

            if (!in_array($model['type'], ['collection', 'tree'])) {
                $app->response->status = 412;
                return ['error' => "Aggregate method not allowed for <{$model['name']}>"];
            }

            try {
                $pipeline = json5_decode($pipeline, true);
            } catch (\Throwable $e) {
                $app->response->status = 400;
                return ['error' => "Pipeline is not valid json"];
            }

            if (!is_array($pipeline) || !array_is_list($pipeline)) {
                $app->response->status = 400;
                return ['error' => "Pipeline is not valid list format"];
            }

            $pipeline = array_merge([['$match' => ['_state' => 1]]], $pipeline);

            $process = ['locale' => $app->param('locale', 'default')];
            $populate = $app->param('populate:int', null);

            if ($populate) {
                $process['populate'] = $populate;
                $process['user'] = $app->helper('auth')->getUser();
            }

            $items = $app->module('content')->aggregate($model['name'], $pipeline, $process);

            return $items;
        }
    ]);


    /**
     * @OA\Get(
     *     path="/content/tree/{model}",
     *     tags={"content"},
     *     @OA\Parameter(
     *         description="Model name",
     *         in="path",
     *         name="model",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *    @OA\Parameter(
     *         description="Return content for specified locale",
     *         in="query",
     *         name="locale",
     *         required=false,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Parameter(
     *         description="Url encoded fields projection as json",
     *         in="query",
     *         name="fields",
     *         required=false,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Parameter(
     *         description="Populate items with linked content items.",
     *         in="query",
     *         name="populate",
     *         required=false,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\OpenApi(
     *         security={
     *             {"api_key": {}}
     *         }
     *     ),
     *     @OA\Response(response="200", description="Get items tree", @OA\JsonContent(type="array", @OA\Items(type="object", additionalProperties=true))),
     *     @OA\Response(response="401", description="Unauthorized"),
     *     @OA\Response(response="404", description="Model not found")
     * )
     */

    $restApi->addEndPoint('/content/tree/{model}', [

        'GET' => function($params, $app) {

            $model = $params['model'];

            if (!$app->module('content')->model($model)) {
                $app->response->status = 404;
                return ['error' => "Model <{$model}> not found"];
            }

            if (!$app->helper('acl')->isAllowed("content/{$model}/read", $app->helper('auth')->getUser('role'))) {
                $app->response->status = 403;
                return ['error' => 'Permission denied'];
            }

            $_model = $app->module('content')->model($model);

            if ($_model['type'] !== 'tree') {
                $app->response->status = 400;
                return ['error' => 'Permission denied'];
            }

            $process = ['locale' => $app->param('locale', 'default')];
            $parentId = $app->param('parent:string', null);
            $populate = $app->param('populate:int', null);
            $fields = $app->param('fields:string', null);

            if ($fields) {

                try {
                    $fields = json5_decode($fields, true);
                } catch(\Throwable $e) {
                    $app->response->status = 400;
                    return ['error' => "<{fields}> is not valid json"];
                }
            }

            if ($populate) {
                $process['populate'] = $populate;
                $process['user'] = $app->helper('auth')->getUser();
            }

            return $app->module('content')->tree($model, $parentId, ['_state' => 1], $fields, $process);
        }
    ]);
});

$this->on('graphql.config', function($gql) {
    $app = $this;
    include(__DIR__.'/graphql/content.php');
    include(__DIR__.'/graphql/models.php');
});
