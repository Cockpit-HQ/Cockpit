<?php

/**
 *
 * @OA\Tag(
 *   name="system",
 *   description="System module",
 * )
 */

$this->on('restApi.config', function($restApi) {


    $restApi->addEndPoint('/system/healthcheck', [
    /**
     * @OA\Get(
     *     path="/system/healthcheck",
     *     tags={"system"},
     *     @OA\Response(response="200", description="Get system status")
     * )
     */
        'GET' => function($params, $app) {

            return ['status' => 'ok'];
        }
    ]);
});
