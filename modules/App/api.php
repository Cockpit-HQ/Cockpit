<?php

/**
 * @OA\Server(url=APP_DIR)
 *
 * @OA\Info(title="{{ app.name }}", version="{{ app.version }}")
 *
 * @OA\SecurityScheme(
 *     type="apiKey",
 *     in="header",
 *     securityScheme="api_key",
 *     name="api-key"
 * )
 */

$app = $this;

// GraphQl service
$this->service('gql', function() use($app) {
    $gql = new App\GraphQL\Query($app);
    return $gql;
});

// Rest Api service
$this->service('restApi', function() use($app) {
    $restApi = new App\RestApi\Query($app);
    return $restApi;
});

$this->bind('/api/*', function($params) {

    $token = $this->param('api_key', $this->request->server['HTTP_API_KEY'] ?? $this->request->getBearerToken());

    if (!$token) {
        $token = 'public';
    }

    $apiUser = [
        'user' => 'anonymous',
        'role' => null
    ];

    if (preg_match('/^USR-/', $token)) {

        $user = $this->dataStorage->findOne('system/users', ['apiKey' => $token]);

        if (!$user) {
            $this->response->status = 412;
            return ['error' => 'Authentication failed'];
        }

        $apiUser['user'] = $user['user'];
        $apiUser['role'] = $user['role'];

    // is jwt token?
    } elseif ($token != 'public' && preg_match('/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/', $token)) {

        // todo

    } else {

        $key = $this->helper('api')->getKey($token);

        if (!$key) {
            $this->response->status = 412;
            return ['error' => 'Authentication failed'];
        }

        $apiUser['role'] = $key['role'] ?? null;
    }

    // set api user
    $this->helper('auth')->setUser($apiUser, false);

    //graphql query
    if ($params[':splat'][0] == 'gql') {

        $query = $this->param('query', '{}');
        $variables = $this->param('variables', null);
        $contentType = $this->request->server['CONTENT_TYPE'] ?? ($this->request->server['HTTP_CONTENT_TYPE'] ?? '');

        if (stripos($contentType, 'multipart/form-data') !== false) {

            /**
             * GQL query with upload: https://github.com/jaydenseric/graphql-multipart-request-spec
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

        return $this->gql->process($query, $variables);
    }

    // rest api query
    $path = '/'.$params[':splat'][0];

    return $this->restApi->process($path, $this->request->method);
});
