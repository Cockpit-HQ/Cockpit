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

            $errors = [];

            // check datastorage connection
            try {
                $app->dataStorage->getCollection('system/users')->count();
            } catch(Throwable $e) {
                $errors[] = ['resource' => 'datastorage', 'message' => $e->getMessage()];
            }

            // check filetorage connection
            try {
                $app->fileStorage->listContents('uploads://');
            } catch(Throwable $e) {
                $errors[] = ['resource' => 'filestorage', 'message' => $e->getMessage()];
            }

            if (count($errors)) {
                $app->response->status = 500;
                return ['status' => 'error', 'errors' => $errors];
            }

            return ['status' => 'ok'];
        }
    ]);
});
