<?php

/**
 *
 * @OA\Tag(
 *   name="pages",
 *   description="Pages module",
 * )
 */

$this->on('restApi.config', function($restApi) {

    /**
     * @OA\Get(
     *     path="/pages/settings",
     *     tags={"pages"},
     *     @OA\Parameter(
     *         description="Return settings for specified locale",
     *         in="query",
     *         name="locale",
     *         required=false,
     *         @OA\Schema(type="String")
     *     ),
     *     @OA\Response(response="200", description="General pages settings as JSON")
     * )
     */

    $restApi->addEndPoint('/pages/settings', [
        'GET' => function($params, $app) {
            return $app->module('pages')->settings();
        }
    ]);

    /**
     * @OA\Get(
     *     path="/pages/menus",
     *     tags={"pages"},
     *     @OA\Response(response="200", description="List of all menus")
     * )
    */

    $restApi->addEndPoint('/pages/menus', [
        'GET' => function($params, $app) {
            return $app->module('pages')->menus();
        }
    ]);

    /**
     * @OA\Get(
     *     path="/pages/menus/{name}",
     *     tags={"pages"},
     *     @OA\Parameter(
     *         description="Menu name",
     *         in="path",
     *         name="name",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *    @OA\Parameter(
     *         description="Return links for specified locale",
     *         in="query",
     *         name="locale",
     *         required=false,
     *         @OA\Schema(type="String")
     *     ),
     *     @OA\Response(response="200", description="Menu object"),
     *     @OA\Response(response="404", description="Menu not found")
     * )
    */

    $restApi->addEndPoint('/pages/menus/{name}', [

        'GET' => function($params, $app) {

            $menus = $app->module('pages')->menus([
                'filter'=> ['name' => $params['name']],
                'limit' => 1
            ]);

            return $menus[0] ?? false;
        }
    ]);

});


$this->on('graphql.config', function($gql) {
    $app = $this;
    include(__DIR__.'/graphql/pagesSettings.php');
});