<?php

/**
 *
 * @OA\Tag(
 *   name="system",
 *   description="System module",
 * )
 */


/**
 * @OA\Get(
 *     path="/system/healthcheck",
 *     tags={"system"},
 *     @OA\Response(response="200", description="Get system status")
 * )
 */
$this->bind('/api/system/healthcheck', function() {

    $errors = [];

    // check datastorage connection
    try {
        $this->dataStorage->getCollection('system/users')->count();
    } catch(Throwable $e) {
        $errors[] = ['resource' => 'datastorage', 'message' => $e->getMessage()];
    }

    // check filetorage connection
    try {
        $this->fileStorage->listContents('uploads://');
    } catch(Throwable $e) {
        $errors[] = ['resource' => 'filestorage', 'message' => $e->getMessage()];
    }

    if (count($errors)) {
        $this->response->status = 500;
        return ['status' => 'error', 'errors' => $errors];
    }

    return ['status' => 'ok'];
});
