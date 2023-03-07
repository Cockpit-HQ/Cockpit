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
         *         @OA\Schema(type="String")
         *     ),
         *     @OA\Parameter(
         *         description="Url encoded filter json",
         *         in="query",
         *         name="filter",
         *         required=false,
         *         @OA\Schema(type="json")
         *     ),
         *     @OA\Parameter(
         *         description="Url encoded fields projection as json",
         *         in="query",
         *         name="fields",
         *         required=false,
         *         @OA\Schema(type="json")
         *     ),
         *     @OA\Parameter(
         *         description="Populate item with linked content items.",
         *         in="query",
         *         name="populate",
         *         required=false,
         *         @OA\Schema(type="int")
         *     ),
         *     @OA\OpenApi(
         *         security={
         *             {"api_key": {}}
         *         }
         *     ),
         *     @OA\Response(response="200", description="Get model item"),
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

            if ($populate) {
                $process['populate'] = $populate;
            }

            $item = $app->module('content')->item($model, $filter ? $filter : [], $fields, $process);

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
         *     @OA\Response(response="200", description="Saved model item"),
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
         *         @OA\Schema(type="String")
         *     ),
         *     @OA\Parameter(
         *         description="Url encoded fields projection as json",
         *         in="query",
         *         name="fields",
         *         required=false,
         *         @OA\Schema(type="json")
         *     ),
         *     @OA\Parameter(
         *         description="Populate item with linked content items.",
         *         in="query",
         *         name="populate",
         *         required=false,
         *         @OA\Schema(type="int")
         *     ),
         *     @OA\OpenApi(
         *         security={
         *             {"api_key": {}}
         *         }
         *     ),
         *     @OA\Response(response="200", description="Get content item"),
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

            $filter = ['_id' => $params['id']];
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
            }

            $item = $app->module('content')->item($model, $filter ? $filter : [], $fields, $process);

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
         *     @OA\Response(response="200", description="Content item removed"),
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
     *         @OA\Schema(type="String")
     *     ),
     *     @OA\Parameter(
     *         description="Url encoded filter json",
     *         in="query",
     *         name="filter",
     *         required=false,
     *         @OA\Schema(type="json")
     *     ),
     *     @OA\Parameter(
     *         description="Url encoded sort json",
     *         in="query",
     *         name="sort",
     *         required=false,
     *         @OA\Schema(type="json")
     *     ),
     *     @OA\Parameter(
     *         description="Url encoded fields projection as json",
     *         in="query",
     *         name="fields",
     *         required=false,
     *         @OA\Schema(type="json")
     *     ),
     *     @OA\Parameter(
     *         description="Max amount of items to return",
     *         in="query",
     *         name="limit",
     *         required=false,
     *         @OA\Schema(type="int")
     *     ),
     *     @OA\Parameter(
     *         description="Amount of items to skip",
     *         in="query",
     *         name="skip",
     *         required=false,
     *         @OA\Schema(type="int")
     *     ),
     *     @OA\Parameter(
     *         description="Populate items with linked content items.",
     *         in="query",
     *         name="populate",
     *         required=false,
     *         @OA\Schema(type="int")
     *     ),
     *     @OA\OpenApi(
     *         security={
     *             {"api_key": {}}
     *         }
     *     ),
     *     @OA\Response(response="200", description="Get list of published model items"),
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
            }

            if (!isset($options['filter']) || !is_array($options['filter'])) {
                $options['filter'] = [];
            }

            $options['filter']['_state'] = 1;

            $items = $app->module('content')->items($model, $options, $process);

            if (isset($options['skip'], $options['limit'])) {
                return [
                    'data' => $items,
                    'meta' => [
                        'total' => $app->module('content')->count($model, $options['filter'] ?? [])
                    ]
                ];
            }

            if (count($items)) {
                $app->trigger('content.api.items', [&$items, $model]);
            }

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
     *         @OA\Schema(type="String")
     *     ),
     *     @OA\Parameter(
     *         description="Url encoded fields projection as json",
     *         in="query",
     *         name="fields",
     *         required=false,
     *         @OA\Schema(type="json")
     *     ),
     *     @OA\Parameter(
     *         description="Populate items with linked content items.",
     *         in="query",
     *         name="populate",
     *         required=false,
     *         @OA\Schema(type="int")
     *     ),
     *     @OA\OpenApi(
     *         security={
     *             {"api_key": {}}
     *         }
     *     ),
     *     @OA\Response(response="200", description="Get items tree"),
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
