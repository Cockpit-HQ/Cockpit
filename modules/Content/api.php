<?php


/**
 * @OA\Get(
 *     path="/api/content/item/{model}",
 *     @OA\Response(response="200", description="Get model item")
 * )
 */

/**
 * @OA\Get(
 *     path="/api/content/items/{model}",
 *     @OA\Response(response="200", description="Get list of model items"),
 *     @OA\Response(response="404", description="Model not found")
 * )
 */


$this->on('graphql.config', function($gql) {
    $app = $this;
    $gql->queries['fields']['content'] = include(__DIR__.'/graphql/content.php');
});