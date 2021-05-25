<?php

/**
 * @OA\Get(
 *     path="/content/item/{model}",
 *     @OA\Parameter(
 *         description="Model name",
 *         in="path",
 *         name="model",
 *         required=true,
 *         @OA\Schema(type="string")
 *     ),
 *     @OA\Response(response="200", description="Get model item"),
 *     @OA\Response(response="404", description="Model not found")
 * )
 */

/**
 * @OA\Get(
 *     path="/content/items/{model}",
 *     @OA\Parameter(
 *         description="Model name",
 *         in="path",
 *         name="model",
 *         required=true,
 *         @OA\Schema(type="string")
 *     ),
 *     @OA\Response(response="200", description="Get list of model items"),
 *     @OA\Response(response="404", description="Model not found")
 * )
 */

$this->on('restApi.config', function($restApi) {

    $restApi->addEndPoint('/content/item/{model}', [

        'GET' => function($params, $app) {

            $model = $params['model'];

            if (!$app->module('content')->model($model)) {
                return ["error" => "Model <{$model}> not found"];
            }

            return $app->module('content')->item($model);
        }
    ]);

    $restApi->addEndPoint('/content/items/{model}', [

        'GET' => function($params, $app) {

            $model = $params['model'];

            if (!$app->module('content')->model($model)) {
                return ["error" => "Model <{$model}> not found"];
            }

            return $app->module('content')->items($model);
        }
    ]);
});

$this->on('graphql.config', function($gql) {
    $app = $this;
    include(__DIR__.'/graphql/content.php');
    include(__DIR__.'/graphql/models.php');
});