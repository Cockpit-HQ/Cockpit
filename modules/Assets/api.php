<?php

/**
 * @OA\Get(
 *     path="/assets/thumbnail/{id}",
 *     @OA\Parameter(
 *         description="Asset ID",
 *         in="path",
 *         name="id",
 *         required=true,
 *         @OA\Schema(type="string")
 *     ),
 *     @OA\Response(response="200", description="Url to generated image or binary if parameter `o=1`"),
 *     @OA\Response(response="404", description="Asset not found")
 * )
 */


$this->on('restApi.config', function($restApi) {

    $restApi->addEndPoint('/assets/thumbnail/{id}', [
        'GET' => function($params, $app) {

            $mime = $app->param('mime', 'auto');

            if ($mime == 'auto') {

                $mime = null;

                if (strpos($app->app->request->headers['Accept'] ?? '', 'image/webp') !== false) {
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
                'quality' => intval($app->param('q', 80)),
                'rebuild' => intval($app->param('r', false)),
                'redirect' => intval($app->param('re', false)),
            ];

            $thumbUrl = $app->helper('asset')->thumbnail($options);

            return $options['redirect'] ? $app->reroute($thumbUrl) : $thumbUrl;
        }
    ]);
});