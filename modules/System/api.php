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
 *    @OA\Parameter(
 *         description="Comma seperated list of checks to perform. Default: db, memory, fs, redis, smtp, custom",
 *         in="query",
 *         name="checks",
 *         required=false,
 *         @OA\Schema(type="string")
 *     ),
 *     @OA\Response(response="200", description="Get system status", @OA\JsonContent())
 * )
 */
$this->bind('/api/system/healthcheck', function() {

    $checks = array_map(
        'trim',
        explode(',', $this->param('checks:string', 'db, memory, fs, redis, smtp, custom'))
    );

    $errors = [];

    // check datastore connection
    try {
        if (in_array('db', $checks)) $this->dataStorage->getCollection('system/users')->count();
    } catch(Throwable $e) {
        $errors[] = ['resource' => 'datastorage', 'message' => $e->getMessage()];
    }

    // check memory connection
    try {
        if (in_array('memory', $checks)) @$this->memory->get('test');
    } catch(Throwable $e) {
        $errors[] = ['resource' => 'memory', 'message' => $e->getMessage()];
    }

    // check file storage connection
    try {
        if (in_array('fs', $checks)) $this->fileStorage->listContents('uploads://');
    } catch(Throwable $e) {
        $errors[] = ['resource' => 'filestorage', 'message' => $e->getMessage()];
    }

    // check redis config
    if (in_array('redis', $checks) && ini_get('session.save_handler') == 'redis') {
        try {
            @(new MemoryStorage\Client(ini_get('session.save_path')))->get('test');
        } catch(Throwable $e) {
            $errors[] = ['resource' => 'session', 'message' => $e->getMessage()];
        }
    }

    // check smtp connection
    if (in_array('smtp', $checks) && $this->mailer->getTransport() == 'smtp') {

        try {

            $mailer = $this->mailer->createMailer();
            $mailer->smtpConnect();

        } catch (Exception $e) {
            $errors[] = ['resource' => 'mailer', 'message' => $e->getMessage()];
        }
    }

    // allow addons to do custom health checks
    if (in_array('custom', $checks)) $this->trigger('system.api.healthcheck', [&$errors, $checks]);

    if (count($errors)) {

        $this->response->status = 500;

        if ($this->retrieve('debug')) {
            return ['status' => 'error', 'errors' => $errors];
        }

        return ['status' => 'error', 'message' => 'Enable debug mode to see detailed error messages'];
    }

    return ['status' => 'ok'];
});
