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
     *    @OA\Parameter(
     *         description="Return links for specified locale",
     *         in="query",
     *         name="locale",
     *         required=false,
     *         @OA\Schema(type="String")
     *     ),
     *     @OA\Response(response="200", description="List of all menus")
     * )
    */

    $restApi->addEndPoint('/pages/menus', [
        'GET' => function($params, $app) {

            $locale = $app->param('locale:string', 'default');

            return $app->helper('locales')->applyLocales($app->module('pages')->menus(), $locale);
        }
    ]);

    /**
     * @OA\Get(
     *     path="/pages/menu/{name}",
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

    $restApi->addEndPoint('/pages/menu/{name}', [

        'GET' => function($params, $app) {

            $locale = $app->param('locale:string', 'default');

            $menus = $app->module('pages')->menus([
                'filter'=> ['name' => $params['name']],
                'limit' => 1
            ]);

            return isset($menus[0]) ? $app->helper('locales')->applyLocales($menus[0], $locale) : false;
        }
    ]);

    /**
     * @OA\Get(
     *     path="/pages/pages",
     *     tags={"pages"},
     *    @OA\Parameter(
     *         description="Return pages for specified locale",
     *         in="query",
     *         name="locale",
     *         required=false,
     *         @OA\Schema(type="String")
     *     ),
     *     @OA\Response(response="200", description="List of all published pages")
     * )
    */

    $restApi->addEndPoint('/pages/pages', [
        'GET' => function($params, $app) {

            $locale = $app->param('locale:string', 'default');

            $pages = $app->dataStorage->find('pages', [
                'filter' => ['_state' => 1],
                'sort' => ['_o' => 1]
            ])->toArray();

            return $app->helper('locales')->applyLocales($pages, $locale);
        }
    ]);

    /**
     * @OA\Get(
     *     path="/pages/page",
     *     tags={"pages"},
     *     @OA\Parameter(
     *         description="Page route",
     *         in="query",
     *         name="route",
     *         required=true,
     *         @OA\Schema(type="String")
     *     ),
     *     @OA\Parameter(
     *         description="Return pages for specified locale",
     *         in="query",
     *         name="locale",
     *         required=false,
     *         @OA\Schema(type="String")
     *     ),
     *     @OA\Response(response="200", description="Page object"),
     *     @OA\Response(response="404", description="Page not found")
     * )
    */
    $restApi->addEndPoint('/pages/page', [
        'GET' => function($params, $app) {

            $locale = $app->param('locale:string', 'default');
            $route = $app->param('route');

            if (!$route) {
                $app->response->status = 404;
                return ["error" => "Parameter <route> is missing"];
            }

            $page = $app->module('pages')->pageByRoute($route, $locale);

            if (!$page || $page['_state'] != 1) {
                $app->response->status = 404;
                return ["error" => "Page not found!"];
            }

            return $page;
        }
    ]);

});


$this->on('graphql.config', function($gql) {
    $app = $this;
    include(__DIR__.'/graphql/pagesSettings.php');
    include(__DIR__.'/graphql/menu.php');
    include(__DIR__.'/graphql/menus.php');
    include(__DIR__.'/graphql/page.php');
    include(__DIR__.'/graphql/pages.php');
});