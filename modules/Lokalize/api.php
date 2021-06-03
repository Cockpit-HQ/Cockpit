<?php

/**
 * @OA\Get(
 *     path="/lokalize/project/{name}",
 *     @OA\Parameter(
 *         description="Project name",
 *         in="path",
 *         name="name",
 *         required=true,
 *         @OA\Schema(type="string")
 *     ),
 *    @OA\Parameter(
 *         description="Return only specified locale",
 *         in="query",
 *         name="locale",
 *         required=false,
 *         @OA\Schema(type="String")
 *     ),
 *     @OA\Parameter(
 *         description="Resolve dotted keys",
 *         in="query",
 *         name="nested",
 *         required=false,
 *         @OA\Schema(type="Integer")
 *     ),
 *     @OA\Response(response="200", description="Language strings as JSON"),
 *     @OA\Response(response="404", description="Project not found")
 * )
 */


$this->on('restApi.config', function($restApi) {

    $restApi->addEndPoint('/lokalize/project/{name}', [
        'GET' => function($params, $app) {

            $name = $params['name'];

            $project = $app->dataStorage->findOne('lokalize/projects', ['name' => $name]);

            if (!$project) {
                return false;
            }

            $values = new \ArrayObject(isset($project['values']) ? $project['values'] : []);

            foreach ($project['locales'] as $locale) {

                if (!isset($values[$locale['i18n']]))  {
                    $values[$locale['i18n']] = new \ArrayObject([]);
                }

                foreach ($project['keys'] as $key) {
                    if (!isset($values[$locale['i18n']][$key['name']])) {
                        $values[$locale['i18n']][$key['name']] = null;
                    } else {
                        $values[$locale['i18n']][$key['name']] = $values[$locale['i18n']][$key['name']]['value'];
                    }
                }
            }

            if ($app->param('nested')) {

                $resolveNested = function($obj) {

                    foreach (array_keys((array)$obj) as $key) {
                        if (\strpos($key, '.') !== false) {
                            $val = $obj[$key];
                            $parts = explode('.', $key);

                            if (!isset($obj[$parts[0]]) || !\is_array($obj[$parts[0]])) {
                                $obj[$parts[0]] = [];
                            }

                            $obj[$parts[0]][$parts[1]] = $val;
                            unset($obj[$key]);
                        }
                    }

                    return $obj;
                };

                foreach (array_keys((array)$values) as $key) {
                    $values[$key] = $resolveNested($values[$key]);
                }
            }

            $locale = $app->param('locale');

            return $locale ? ($values[$locale] ?? false): $values;
        }
    ]);
});