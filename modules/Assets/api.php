<?php

/**
 *
 * @OA\Tag(
 *   name="assets",
 *   description="Assets module",
 * )
 */

$this->on('restApi.config', function($restApi) {

    /**
     * @OA\Get(
     *     path="/assets/image/{id}",
     *     tags={"assets"},
     *     @OA\Parameter(
     *         description="Asset ID",
     *         in="path",
     *         name="id",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Parameter(
     *         description="Resize mode: ['thumbnail', 'bestFit', 'resize','fitToWidth','fitToHeight']",
     *         in="query",
     *         name="m",
     *         required=false,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Parameter(
     *         description="Width",
     *         in="query",
     *         name="w",
     *         required=false,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Parameter(
     *         description="Height",
     *         in="query",
     *         name="h",
     *         required=false,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Parameter(
     *         description="Quality",
     *         in="query",
     *         name="q",
     *         required=false,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Parameter(
     *         description="Mime type: ['auto','gif','jpeg','png','webp','bmp']",
     *         in="query",
     *         name="mime",
     *         required=false,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Parameter(
     *         description="Auto redirect to generated thumbnail",
     *         in="query",
     *         name="re",
     *         required=false,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Parameter(
     *         description="Time string for cache invalidation - usable for cache invalidation",
     *         in="query",
     *         name="t",
     *         required=false,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Parameter(
     *         description="Get binary of generated thumbnail",
     *         in="query",
     *         name="o",
     *         required=false,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *          response="200",
     *          description="Url to generated image or binary if parameter `o=1`",
     *          @OA\MediaType(
     *              mediaType="application/json",
     *              @OA\Schema(
     *                  type="string"
     *              )
     *          ),
     *          @OA\MediaType(
     *              mediaType="application/octet-stream",
     *              @OA\Schema(
     *                  type="string",
     *                  format="binary"
     *              )
     *          )
     *     ),
     *     @OA\Response(response="404", description="Asset not found")
     * )
     */

    $restApi->addEndPoint('/assets/image/{id}', [

        'GET' => function($params, $app) {

            $mime = $app->param('mime', 'auto');

            if ($mime == 'auto') {

                $mime = null;

                if (str_contains($app->request->headers['Accept'] ?? '', 'image/webp')) {
                    $gdinfo = \gd_info();
                    $mime = isset($gdinfo['WebP Support']) && $gdinfo['WebP Support'] ? 'webp' : null;
                }
            }

            $options = [
                'src' => $params['id'],
                'fp' => $app->param('fp', null),
                'mode' => $app->param('m', 'thumbnail'),
                'mime' => $mime,
                'filters' => (array) $app->param('f', []),
                'width' => $app->param('w', null),
                'height' => $app->param('h', null),
                'quality' => intval($app->param('q:int', 80)),
                'rebuild' => intval($app->param('r:int', false)),
                'base64' => intval($app->param('b64:int', false)),
                'redirect' => intval($app->param('re:int', false)),
                'output' => intval($app->param('o:int', false)),
                'timestamp' => $this->param('t', null),
                'smartcrop' => $app->param('smartcrop', null),
            ];

            if ($options['width'] !== 'original') {
                $options['width'] = intval($options['width']);
            }

            if ($options['height'] !== 'original') {
                $options['height'] = intval($options['height']);
            }

            $imgPath = $app->helper('asset')->image($options, true);

            if (!$imgPath) {
                return false;
            }

            if (isset($imgPath['error'])) {
                $app->response->status = 400;
                return ['error' => $imgPath['error']];
            }

            if ($options['base64']) {
                return $imgPath;
            }

            if ($options['output']) {

                $fileModificationTime = $app->fileStorage->lastModified($imgPath);
                $etag = md5("{$imgPath}-{$fileModificationTime}");
                $maxAge = $app->retrieve('assets/output.maxAge', 2592000); // 30 days

                if (isset($app->request->headers['If-None-Match']) && trim($app->request->headers['If-None-Match'], '"') == $etag) {
                    $app->response->status = 304; // Not Modified
                    return '';
                }

                // Caching-Header
                $headers = [
                    'Content-Length' => $app->fileStorage->fileSize($imgPath),
                    'Cache-Control' => "public, max-age={$maxAge}, immutable",
                    'ETag' => "\"{$etag}\"",
                    'Expires' => gmdate('D, d M Y H:i:s', time() + $maxAge) . ' GMT'
                ];

                if ($fileModificationTime) {
                    $headers['Last-Modified'] = gmdate('D, d M Y H:i:s', $fileModificationTime) . ' GMT';
                }

                foreach ($headers as $name => $value) {
                    $app->response->headers[$name] = $value;
                }

                $app->response->mime = strtolower(pathinfo($imgPath, PATHINFO_EXTENSION));

                return $app->fileStorage->readStream($imgPath);
            }

            if ($options['redirect']) {
                $app->reroute($app->fileStorage->getURL($imgPath));
            }

            return $app->fileStorage->getURL($imgPath);
        }
    ]);

    /**
     * @OA\Get(
     *     path="/assets/{id}",
     *     tags={"assets"},
     *     @OA\Parameter(
     *         description="Asset ID",
     *         in="path",
     *         name="id",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(response="200", description="Assets data", @OA\JsonContent()),
     *     @OA\Response(response="404", description="Asset not found")
     * )
     */

    $restApi->addEndPoint('/assets/{id}', [

        'GET' => function($params, $app) {

            return  $app->dataStorage->findOne('assets', ['_id' => $params['id']]) ?? false;
        }
    ]);

    /**
     * @OA\Get(
     *     path="/assets/image/{id}/{preset}",
     *     tags={"assets"},
     *     @OA\Parameter(
     *         description="Asset ID",
     *         in="path",
     *         name="id",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Parameter(
     *         description="Preset name (thumbnail, small, medium, large, hero, or custom preset)",
     *         in="path",
     *         name="preset",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Parameter(
     *         description="Auto redirect to generated thumbnail",
     *         in="query",
     *         name="re",
     *         required=false,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Parameter(
     *         description="Get binary of generated thumbnail",
     *         in="query",
     *         name="o",
     *         required=false,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *          response="200",
     *          description="Url to generated image or binary",
     *          @OA\MediaType(
     *              mediaType="application/json",
     *              @OA\Schema(type="string")
     *          ),
     *          @OA\MediaType(
     *              mediaType="application/octet-stream",
     *              @OA\Schema(type="string", format="binary")
     *          )
     *     ),
     *     @OA\Response(response="404", description="Asset or preset not found")
     * )
     */

    $restApi->addEndPoint('/assets/image/{id}/{preset}', [

        'GET' => function($params, $app) {

            $presets = $app->module('assets')->presets();

            if (!isset($presets[$params['preset']])) {
                $app->response->status = 404;
                return ['error' => 'Preset not found'];
            }

            $preset = $presets[$params['preset']];
            $mime = $preset['mime'] ?? 'auto';

            if ($mime == 'auto') {

                $mime = null;

                if (str_contains($app->request->headers['Accept'] ?? '', 'image/webp')) {
                    $gdinfo = \gd_info();
                    $mime = isset($gdinfo['WebP Support']) && $gdinfo['WebP Support'] ? 'webp' : null;
                }
            }

            $options = array_merge([
                'src' => $params['id'],
                'fp' => null,
                'mode' => 'thumbnail',
                'mime' => $mime,
                'filters' => [],
                'width' => null,
                'height' => null,
                'quality' => 80,
                'rebuild' => false,
                'base64' => false,
                'redirect' => intval($app->param('re:int', false)),
                'output' => intval($app->param('o:int', false)),
                'timestamp' => null,
                'smartcrop' => null,
            ], $preset);

            if (isset($options['width']) && $options['width'] !== 'original') {
                $options['width'] = intval($options['width']);
            }

            if (isset($options['height']) && $options['height'] !== 'original') {
                $options['height'] = intval($options['height']);
            }

            $imgPath = $app->helper('asset')->image($options, true);

            if (!$imgPath) {
                return false;
            }

            if (isset($imgPath['error'])) {
                $app->response->status = 400;
                return ['error' => $imgPath['error']];
            }

            if ($options['base64']) {
                return $imgPath;
            }

            if ($options['output']) {

                $fileModificationTime = $app->fileStorage->lastModified($imgPath);
                $etag = md5("{$imgPath}-{$fileModificationTime}");
                $maxAge = $app->retrieve('assets/output.maxAge', 2592000); // 30 days

                if (isset($app->request->headers['If-None-Match']) && trim($app->request->headers['If-None-Match'], '"') == $etag) {
                    $app->response->status = 304; // Not Modified
                    return '';
                }

                $headers = [
                    'Content-Length' => $app->fileStorage->fileSize($imgPath),
                    'Cache-Control' => "public, max-age={$maxAge}, immutable",
                    'ETag' => "\"{$etag}\"",
                    'Expires' => gmdate('D, d M Y H:i:s', time() + $maxAge) . ' GMT'
                ];

                if ($fileModificationTime) {
                    $headers['Last-Modified'] = gmdate('D, d M Y H:i:s', $fileModificationTime) . ' GMT';
                }

                foreach ($headers as $name => $value) {
                    $app->response->headers[$name] = $value;
                }

                $app->response->mime = strtolower(pathinfo($imgPath, PATHINFO_EXTENSION));

                return $app->fileStorage->readStream($imgPath);
            }

            if ($options['redirect']) {
                $app->reroute($app->fileStorage->getURL($imgPath));
            }

            return $app->fileStorage->getURL($imgPath);
        }
    ]);

    /**
     * @OA\Get(
     *     path="/assets/presets",
     *     tags={"assets"},
     *     @OA\Response(response="200", description="Available image presets", @OA\JsonContent())
     * )
     */

    $restApi->addEndPoint('/assets/presets', [

        'GET' => function($_, $app) {
            return $app->module('assets')->presets();
        }
    ]);
});
