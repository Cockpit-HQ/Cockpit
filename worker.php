<?php
/**
 * FrankenPHP Worker Script for Cockpit
 * 
 * This script allows Cockpit to run in FrankenPHP's worker mode for improved performance.
 * It bootstraps the application once and then handles requests in a loop.
 */

// Basic check to ensure we are running in FrankenPHP
if (!function_exists('frankenphp_handle_request')) {
    die("This script can only be run within FrankenPHP worker mode.\n");
}

define('APP_ADMIN', true);
define('APP_START_TIME', microtime(true));

// Load bootstrap (this loads autoloader, config, etc.)
require __DIR__.'/bootstrap.php';

// Initialize the Master App Instance
$masterApp = Cockpit::instance(__DIR__, ['app.run_mode' => 'worker']);

// Prevent the master app from accumulating junk if any
if (gc_enabled()) {
    gc_collect_cycles();
}

echo "Cockpit (FrankenPHP Worker) started.\n";

$APP_DIR           = __DIR__;
$APP_DOCUMENT_ROOT = realpath($_SERVER['DOCUMENT_ROOT'] ?? __DIR__);
$APP_BASE          = trim(str_replace($APP_DOCUMENT_ROOT, '', $APP_DIR), DIRECTORY_SEPARATOR);
$APP_BASE_URL      = strlen($APP_BASE) ? "/{$APP_BASE}": $APP_BASE;
$APP_BASE_URL      = str_replace(DIRECTORY_SEPARATOR, '/', $APP_BASE_URL);

// FrankenPHP's handle_request loop
$handler = function () use ($masterApp, $APP_BASE_URL, $APP_DOCUMENT_ROOT) {
    
    try {

        $requestUri = $_SERVER['REQUEST_URI'] ?? '/';
        $pathInfo = explode('?', $requestUri)[0];
        
        $APP_ROUTE = '/'.ltrim(substr($pathInfo, strlen($APP_BASE_URL)), '/');
        
        if ($APP_ROUTE == '') {
            $APP_ROUTE = '/';
        }

        // Logic to handle Cockpit Spaces (/:space)
        $currentApp = $masterApp;
        $currentBaseUrl = $APP_BASE_URL;
        $currentBaseRoute = $APP_BASE_URL;
        
        if ($APP_ROUTE && str_starts_with($APP_ROUTE, '/:')) {

            $parts    = explode('/', $APP_ROUTE);
            $space    = substr($parts[1], 1);
            $spaceDir = APP_SPACES_DIR."/{$space}";

            if (file_exists($spaceDir)) {
                $APP_ROUTE = '/'.trim(implode('/', array_slice($parts, 2)), '/');
                $currentBaseUrl .= str_replace($APP_DIR, '', APP_SPACES_DIR)."/{$space}";
                $currentBaseRoute .= "/:{$space}";
                
                // Get or create the master app instance for this space
                // Cockpit::instance handles singleton logic per envPath
                $currentApp = Cockpit::instance($spaceDir, [
                    'app.run_mode' => 'worker',
                    'app_space' => $space
                ]);
            }
        }

        // Determine if it's an API request
        $isApiRequest = str_starts_with($APP_ROUTE, '/api/') ? 1 : 0;
        
        // Clone the correct app (Default or Space)
        $app = clone $currentApp;

        // Update App Config/Registry for this request
        $app['route'] = $APP_ROUTE;
        $app['base_url'] = $currentBaseUrl;
        $app['base_route'] = $currentBaseRoute;
        $app['docs_root'] = $APP_DOCUMENT_ROOT;
        
        // Create Request Object
        $request = Lime\Request::fromGlobalRequest([
            'route'      => $APP_ROUTE,
            'site_url'   => $app->retrieve('site_url'), // Use whatever was in config or guessed
            'base_url'   => $currentBaseUrl,
            'base_route' => $currentBaseRoute
        ]);
        
        // Update app request
        $app->request = $request;

        // Trigger init events (from index.php)
        if (!$isApiRequest) {
            $app->helper('session')->init();
            $app->trigger('app.admin.init');
        } else {
            $app->trigger('app.api.init');
        }

        $response = $app->run($APP_ROUTE, $request, false);

        if (isset($response->headers)) {

            foreach ($response->headers as $key => $value) {
                header("$key: $value");
            }
        }
        
        // Status Code
        if (isset($response->status)) {
            http_response_code($response->status);
        }
        
        // Body
        if ($response->body !== false) {
            echo $response->body;
        }
        
        $app->trigger('app:request:after');
        $app->trigger('shutdown', [false]);

        // Cleanup
        unset($app);
        unset($request);
        unset($response);
        
    } catch (\Throwable $e) {
        // Handle unexpected errors gracefully
        error_log("Worker Error: " . $e->getMessage() . " in " . $e->getFile() . ":" . $e->getLine());
        http_response_code(500);
        echo "Internal Server Error";
        
        if (isset($app)) unset($app);
    }
};


// Run the loop
// MAX_REQUESTS can be set to restart the worker occasionally to prevent leaks
$maxRequests = (int)($_SERVER['MAX_REQUESTS'] ?? 500);

for ($i = 0; $i < $maxRequests; ++$i) {
    $running = frankenphp_handle_request($handler);
    
    // Verify if we should keep running
    if (!$running) {
        break;
    }
    
    // Garbage collection every N requests?
    if ($i % 50 === 0) {
        gc_collect_cycles();
    }
}
