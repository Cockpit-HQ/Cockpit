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

    // check memory connection
    try {
        @$this->memory->get('test');
    } catch(Throwable $e) {
        $errors[] = ['resource' => 'memory', 'message' => $e->getMessage()];
    }

    // check filetorage connection
    try {
        $this->fileStorage->listContents('uploads://');
    } catch(Throwable $e) {
        $errors[] = ['resource' => 'filestorage', 'message' => $e->getMessage()];
    }

    // check redis config
    if (ini_get('session.save_handler') == 'redis') {
        try {
            $connection = @(new MemoryStorage\Client(ini_get('session.save_path')))->get('test');
        } catch(Throwable $e) {
            $errors[] = ['resource' => 'session', 'message' => $e->getMessage()];
        }
    }

    if (count($errors)) {

        $this->response->status = 500;

        if ($this->retrieve('debug')) {
            return ['status' => 'error', 'errors' => $errors];
        }

        return ['status' => 'error'];
    }

    return ['status' => 'ok'];
});
