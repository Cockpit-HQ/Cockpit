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
     *         @OA\Schema(type="int")
     *     ),
     *     @OA\Parameter(
     *         description="Height",
     *         in="query",
     *         name="h",
     *         required=false,
     *         @OA\Schema(type="int")
     *     ),
     *     @OA\Parameter(
     *         description="Quality",
     *         in="query",
     *         name="q",
     *         required=false,
     *         @OA\Schema(type="int")
     *     ),
     *     @OA\Parameter(
     *         description="Mime type: ['auto','gif','jpeg','png','webp','bmp']",
     *         in="query",
     *         name="mime",
     *         required=false,
     *         @OA\Schema(type="int")
     *     ),
     *     @OA\Parameter(
     *         description="Auto redirect to generated thumbnail",
     *         in="query",
     *         name="re",
     *         required=false,
     *         @OA\Schema(type="int")
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
     *         @OA\Schema(type="int")
     *     ),
     *     @OA\Response(response="200", description="Url to generated image or binary if parameter `o=1`"),
     *     @OA\Response(response="404", description="Asset not found")
     * )
     */

    $restApi->addEndPoint('/assets/image/{id}', [

        'GET' => function($params, $app) {

            $mime = $app->param('mime', 'auto');

            if ($mime == 'auto') {

                $mime = null;

                if (strpos($app->request->headers['Accept'] ?? '', 'image/webp') !== false) {
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
                'width' => intval($app->param('w', null)),
                'height' => intval($app->param('h', null)),
                'quality' => intval($app->param('q:int', 80)),
                'rebuild' => intval($app->param('r:int', false)),
                'base64' => intval($app->param('b64:int', false)),
                'redirect' => intval($app->param('re:int', false)),
                'output' => intval($app->param('o:int', false)),
                'timestamp' => $this->param('t', null),
            ];

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
                $app->response->mime = strtolower(pathinfo($imgPath, PATHINFO_EXTENSION));
                $app->response->headers['Content-Length'] = $app->fileStorage->fileSize($imgPath);
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
     *     @OA\Response(response="200", description="Assets data"),
     *     @OA\Response(response="404", description="Asset not found")
     * )
     */

    $restApi->addEndPoint('/assets/{id}', [

        'GET' => function($params, $app) {

            return  $app->dataStorage->findOne('assets', ['_id' => $params['id']]) ?? false;
        }
    ]);
});
