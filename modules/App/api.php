<?php

/**
 * @OA\Server(url=APP_DIR)
 */

/**
 * @OA\Info(title="{{ app.name }}", version="{{ app.version }}")
 */


$app = $this;

// GraphQl service
$this->service('gql', function() use($app) {
    $gql = new App\GraphQL\Query($app);
    return $gql;
});

$this->bind('/api/graphql', function() {

    $query = $this->param('query', '{}');
    $variables = $this->param('variables', null);
    $contentType = $this->request->server['CONTENT_TYPE'] ?? $this->request->server['HTTP_CONTENT_TYPE'];


    if (stripos($contentType, 'multipart/form-data') !== false) {

        /**
         * Query with upload
         * https://github.com/jaydenseric/graphql-multipart-request-spec
         */

        $map = $this->param('map', '{}');
        $operations = $this->param('operations');

        $result = json_decode($operations, true);
        $map = json_decode($map, true);

        if (isset($result['operationName'])) {
            $result['operation'] = $result['operationName'];
            unset($result['operationName']);
        }

        $query = $result['query'] ?? '';
        $variables = $result['variables'] ?? [];

        foreach ($map as $fileKey => $locations) {

            foreach ($locations as $location) {

                $parts = explode('.', $location);

                if ($parts[0] == 'variables') array_shift($parts);

                $v = &$variables;

                foreach ($parts as $key) {
                    if (!isset($v[$key]) || !is_array($v[$key])) $v[$key] = [];
                    $v = &$v[$key];
                }
                $v = $_FILES[$fileKey];
            }
        }
    }

    return $this->gql->query($query, $variables);
});