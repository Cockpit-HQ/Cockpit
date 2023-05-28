<?php

/**
 *
 * @OA\Tag(
 *   name="system",
 *   description="System module",
 * )
 */

$this->on('restApi.config', function($restApi) {


    /**
     * @OA\Get(
     *     path="/system/healthcheck",
     *     tags={"system"},
     *     @OA\Response(response="200", description="Get system status")
     * )
     */
    $restApi->addEndPoint('/system/healthcheck', [
        'GET' => function($params, $app) {

            return ['status' => 'ok'];
        }
    ]);
});
