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


$this->on('graphql.config', function($gql) {
    $app = $this;

    include(__DIR__.'/graphql/content.php');
    include(__DIR__.'/graphql/models.php');
});