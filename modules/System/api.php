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
            @(new MemoryStorage\Client(ini_get('session.save_path')))->get('test');
        } catch(Throwable $e) {
            $errors[] = ['resource' => 'session', 'message' => $e->getMessage()];
        }
    }

    // check smtp connection
    if ($this->mailer->getTransport() == 'smtp') {

        try {

            $mailer = $this->mailer->createMailer();

            $mailer->smtpConnect();

        } catch (Exception $e) {
            $errors[] = ['resource' => 'mailer', 'message' => $e->getMessage()];
        }
    }

    // allow addons to do custom health checks
    $this->trigger('system.api.healthcheck', [&$errors]);

    if (count($errors)) {

        $this->response->status = 500;

        if ($this->retrieve('debug')) {
            return ['status' => 'error', 'errors' => $errors];
        }

        return ['status' => 'error', 'message' => 'Enable debug mode to see detailed error messages'];
    }

    return ['status' => 'ok'];
});
