<?php
/*
 * Lime.
 *
 * Copyright (c) 2014 Artur Heinze
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is furnished
 * to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

namespace Lime;

use ArrayObject;

include(__DIR__.'/Request.php');
include(__DIR__.'/Response.php');


class App implements \ArrayAccess {

    protected static $apps = [];

    protected array $registry = [];
    protected array $routes   = [];
    protected array $paths    = [];
    protected array $events   = [];
    protected array $blocks   = [];

    /** @var Response|null  */
    public ?Response $response = null;

    /** @var Request|null  */
    public ?Request $request = null;

    public ArrayObject $helpers;
    public mixed $layout = false;

    /**
    * Constructor
    * @param Array $settings initial registry settings
    */
    public function __construct (array $settings = []) {

        $self = $this;
        $base_url = implode('/', array_slice(explode('/', $_SERVER['SCRIPT_NAME']), 0, -1));

        $this->registry = \array_merge([
            'debug'        => true,
            'app.name'     => 'LimeApp',
            'session.name' => 'limeappsession',
            'autoload'     => new ArrayObject([]),
            'sec-key'      => 'xxxxx-SiteSecKeyPleaseChangeMe-xxxxx',
            'route'        => $_SERVER['PATH_INFO'] ?? '/',
            'charset'      => 'UTF-8',
            'helpers'      => [],
            'base_url'     => $base_url,
            'base_route'   => $base_url,
            'base_host'    => $_SERVER['SERVER_NAME'] ?? \php_uname('n'),
            'base_port'    => $_SERVER['SERVER_PORT'] ?? 80,
            'docs_root'    => null,
            'site_url'     => null
        ], $settings);

        // app modules container
        $this->registry['modules'] = new ArrayObject([]);

        // try to guess site url
        if (!isset($this->registry['site_url']) && \PHP_SAPI !== 'cli') {

            $url = ((!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https':'http').'://';

            if (!\in_array($this->registry['base_port'], ['80', '443'])) {
                $url .= $this->registry['base_host'].':'.$this->registry['base_port'];
            } else {
                $url .= $this->registry['base_host'];
            }

            $this->registry['site_url'] = rtrim($url, '/');

        } elseif (\is_string($this->registry['site_url'])) {
            $this->registry['site_url'] = rtrim($this->registry['site_url'], '/');
        }

        if (!isset($this->registry['docs_root'])) {
            $this->registry['docs_root'] = str_replace(DIRECTORY_SEPARATOR, '/', isset($_SERVER['DOCUMENT_ROOT']) ? \realpath($_SERVER['DOCUMENT_ROOT']) : \dirname($_SERVER['SCRIPT_FILENAME']));
        }

        // make sure base + route url doesn't end with a slash;
        $this->registry['base_url']   = rtrim($this->registry['base_url'], '/');
        $this->registry['base_route'] = rtrim($this->registry['base_route'], '/');

        self::$apps[$this->registry['app.name']] = $this;

        // default helpers
        $this->helpers = new ArrayObject(\array_merge([
            'cache' => 'Lime\\Helper\\Cache',
            'fs' => 'Lime\\Helper\\Filesystem',
            'session' => 'Lime\\Helper\\Session',
            'utils' => 'Lime\\Helper\\Utils'
        ], $this->registry['helpers']));

        // register simple autoloader
        spl_autoload_register(function ($class) use($self) {

            foreach ($self->registry['autoload'] as $dir) {

                $class_file = $dir.'/'.str_replace('\\', '/', $class).'.php';

                if (file_exists($class_file)) {
                    include_once($class_file);
                    return;
                }
            }
        });
    }

    /**
     * Object behavior on clone
     *
     * @return void
     */
    public function __clone() {

        // update app instance on appaware objects

        $this->helpers = clone $this->helpers;

        foreach ($this->helpers as $name => $helper) {
            if (is_string($helper)) continue;
            $helper = clone $helper;
            $helper->app = $this;
            $this->helpers[$name] = $helper;
        }

        $this->registry['modules'] = clone $this->registry['modules'];

        foreach ($this->registry['modules'] as $name => $module) {
            $module = clone $module;
            $module->bindApp($this);
            $this->registry['modules'][$name] = $module;
        }

        foreach ($this->events as $name => &$list) {
            foreach ($list as &$meta) {
                if ($meta['fn'] instanceof \Closure) {
                    $meta['fn'] = $meta['fn']->bindTo($this, $this);
                }
            }
        }
    }

    /**
    * Get App instance
    * @param  string $name Lime app name
    * @return Object       Lime app object
    */
    public static function instance(string $name, bool $clone = false): self {
        return $clone ? clone self::$apps[$name] : self::$apps[$name];
    }

    /**
    * Returns a closure that stores the result of the given closure
    * @param  string  $name
    * @param  \Closure $callable
    * @return Object
    */
    public function service(string $name, mixed $callable): object {

        $this->registry[$name] = function($c) use($callable) {
            static $object;

            if (null === $object) {
                $object = $callable($c);
            }

            return $object;
        };

        return $this;
    }

    /**
    * stop application (exit)
    */
    public function stop(mixed $data = null, ?int $status = null): void {

        register_shutdown_function(function () {

            if (isset($this->response) && !function_exists('fastcgi_finish_request')) {
                $this->trigger('app:request:after');
            }

            $this->trigger('shutdown', [true]);
        });

        if (!isset($this->response)) {

            if (\is_array($data) || is_object($data)) {
                $data = json_encode($data);
            }

            if ($data) {
                echo $data;
            }

            $this->trigger('after', [true]);
            exit;
        }

        if ($status) {
            $this->response->status = $status;
        }

        if ($data) {
            $this->response->body = $data;
        }

        if (\is_numeric($data) && isset(Response::$statusCodes[$data])) {

            $this->response->status = $data;

            if ($this->response->mime == 'json') {
                $this->response->body = json_encode(['error' => Response::$statusCodes[$data]]);
            } else {
                $this->response->body = Response::$statusCodes[$data];
            }
        }

        $this->request->stopped = true;

        $this->trigger('after', [true]);
        $this->trigger('app:request:stop');

        if (session_status() === \PHP_SESSION_ACTIVE) {
            session_write_close();
        }

        if (function_exists('fastcgi_finish_request')) {
            fastcgi_finish_request();
            $this->trigger('app:request:after');
        }

        exit;
    }

    /**
    * Returns link based on the base url of the app
    * @param  string $path e.g. /js/myscript.js
    * @return string       Link
    */
    public function baseUrl(string $path): string {

        $url = '';

        if (!str_contains($path, ':')) {

            /*
            if ($this->registry['base_port'] != '80') {
                $url .= $this->registry['site_url'];
            }
            */

            $url .= $this->registry['base_url'].'/'.\ltrim($path, '/');

        } else {
            $url = $this->pathToUrl($path);
        }

        return $url;
    }

    public function base(string $path): void {

        $args = func_get_args();

        echo (count($args)==1) ? $this->baseUrl($args[0]) : $this->baseUrl(\call_user_func_array('sprintf', $args));
    }

    /**
    * Returns link based on the route url of the app
    * @param  string $path e.g. /pages/home
    * @return string       Link
    */
    public function routeUrl(string $path): string {

        $url = '';

        /*
        if ($this->registry['base_port'] != '80') {
            $url .= $this->registry['site_url'];
        }
        */

        $url .= $this->registry['base_route'];

        return $url.'/'.\ltrim($path, '/');
    }

    public function route(): void {

        $args = func_get_args();

        echo (count($args)==1) ? $this->routeUrl($args[0]) : $this->routeUrl(\call_user_func_array('sprintf', $args));

    }

    /**
    * Redirect to path.
    * @param  string $path Path redirect to.
    * @return void
    */
    public function reroute(string $path): void {

        if (!str_contains($path,'://')) {
            if (\substr($path,0,1)!='/') {
                $path = '/'.$path;
            }
            $path = $this->routeUrl($path);
        }

        $this->response->status = 307;
        $this->response->headers['Location'] = $path;

        $this->stop();
    }

    /**
    * Put a value in the Lime registry
    * @param String $key  Key name
    * @param Mixed $value  Value
    */
    public function set(string $key,mixed $value): self {

        $keys = explode('/',$key);

        if (count($keys)>5) return false;

        switch (count($keys)) {

          case 1:
            $this->registry[$keys[0]] = $value;
            break;

          case 2:
            $this->registry[$keys[0]][$keys[1]] = $value;
            break;

          case 3:
            $this->registry[$keys[0]][$keys[1]][$keys[2]] = $value;
            break;

          case 4:
            $this->registry[$keys[0]][$keys[1]][$keys[2]][$keys[3]] = $value;
            break;

          case 5:
            $this->registry[$keys[0]][$keys[1]][$keys[2]][$keys[3]][$keys[4]] = $value;
            break;
        }

        return $this;
    }

    /**
    * Get a value from the Lime registry
    * @param  string $key
    * @param  mixed $default
    * @return Mixed
    */
    public function retrieve(string $key, mixed $default = null): mixed {
        return fetch_from_array($this->registry, $key, $default);
    }


    /**
    * Path helper method
    * @return Mixed
    */
    public function path(): mixed {

        $args = func_get_args();

        switch (count($args)) {

            case 1:

                $file  = $args[0];

                if ($this->isAbsolutePath($file) && file_exists($file)) {
                    return $file;
                }

                $parts = explode(':', $file, 2);

                if (count($parts)==2) {
                    if (!isset($this->paths[$parts[0]])) return null;

                    foreach ($this->paths[$parts[0]] as $path) {
                        if (file_exists($path.$parts[1])) {
                            return $path.$parts[1];
                        }
                    }
                }

                return null;

            case 2:

                if (!isset($this->paths[$args[0]])) {
                    $this->paths[$args[0]] = [];
                }
                \array_unshift($this->paths[$args[0]], rtrim(str_replace(DIRECTORY_SEPARATOR, '/', $args[1]), '/').'/');

                return $this;
        }

        return null;
    }

    /**
     * @param $namespace
     * @return array
     */
    public function paths(?string $namespace = null): array {

        if (!$namespace) {
            return $this->paths;
        }

        return $this->paths[$namespace] ?? [];
    }

    /**
     * @param $path
     * @return bool|string
     */
    public function pathToUrl(string $path, bool $full = false): mixed {

        $url = false;

        if ($file = $this->path($path)) {

            $file = str_replace(DIRECTORY_SEPARATOR, '/', $file);
            $root = str_replace(DIRECTORY_SEPARATOR, '/', $this->registry['docs_root']);

            $url = '/'.\ltrim(str_replace($root, '', $file), '/');
            $url = \implode('/', \array_map('rawurlencode', explode('/', $url)));

            if ($full) {
                $site_url = str_replace(parse_url($this->registry['site_url'] ?? '', \PHP_URL_PATH) ?? '', '', $this->registry['site_url'] ?? '');
                $url = rtrim($site_url, '/').$url;
            }
        }

        return $url;
    }

    /**
    * Cache helper method
    * @return Mixed
    */
    public function cache(): mixed{

        $args = func_get_args();

        return match (count($args)) {
            1 => $this->helper('cache')->read($args[0]),
            2 => $this->helper('cache')->write($args[0], $args[1]),
            default => null,
        };

    }

    /**
    * Bind an event to closure
    * @param  string  $event
    * @param  \Closure $callback
    * @param  Integer $priority
    * @return App
    */
    public function on(string|array $event, mixed $callback, int $priority = 0): self {

        if (\is_array($event)) {

            foreach ($event as $evt) {
                $this->on($evt, $callback, $priority);
            }
            return $this;
        }

        if (!isset($this->events[$event])) $this->events[$event] = [];

        // make $this available in closures
        if ($callback instanceof \Closure) {
            $callback = $callback->bindTo($this, $this);
        }

        $this->events[$event][] = ['fn' => $callback, 'prio' => $priority];

        return $this;
    }

    /**
    * Trigger event.
    * @param  string $event
    * @param  array  $params
    * @return Boolean
    */
    public function trigger(string $event, array $params=[]): self {

        if ($event !== '*' && isset($this->events['*']) && count($this->events['*'])) {
            $this->trigger('*', [$event, $params]);
        }

        if (!isset($this->events[$event])) {
            return $this;
        }

        if (!count($this->events[$event])) {
            return $this;
        }

        $queue = new \SplPriorityQueue();

        foreach ($this->events[$event] as $index => $action) {
            $queue->insert($index, $action['prio']);
        }

        $queue->top();

        while ($queue->valid()) {
            $index = $queue->current();
            if (\is_callable($this->events[$event][$index]['fn'])) {
                if (\call_user_func_array($this->events[$event][$index]['fn'], $params) === false) {
                    break; // stop Propagation
                }
            }
            $queue->next();
        }

        return $this;
    }

    /**
    * Render view.
    * @param  string $view Path to view
    * @param  array  $slots   Passed variables
    * @return string Rendered view
    */
    public function render(string $view, array $slots = [], bool $print = false): string {

        $layout = $this->layout;

        $this->trigger('app.render.view', [&$view, &$slots]);

        if (str_contains($view, ' with ')) {
            list($view, $layout) = explode(' with ', $view, 2);
        }

        if (\is_string($view) && $view) {
            $this->trigger("app.render.view/{$view}", [&$view, &$slots]);
        }

        if (str_contains($view, ':') && $file = $this->path($view)) {
            $view = $file;
        }

        $setViewLayout = function($from) use(&$layout) {
            $layout = $from;
        };

        $render = function($__view, $viewSlots) {
            \extract((array)$viewSlots);
            \ob_start();
            include $__view;
            return \ob_get_clean();
        };

        $contents = $render($view, array_merge($slots, ['setViewLayout' => $setViewLayout]));

        if ($layout) {

            if (str_contains($layout, ':') && $file = $this->path($layout)) {
                $layout = $file;
            }

            $contents = $render($layout, array_merge($slots, ['content_for_layout' => $contents]));
        }

        if ($print) {
            echo $contents;
        }

        return $contents;
    }

    /**
    * Start block
    * @param  string $name
    * @param  boolean $reset
    * @return null
    */
    public function start(string $name, bool $reset = false): void {

        if (!isset($this->blocks[$name]) || $reset) {
            $this->blocks[$name] = [];
        }

        \ob_start();
    }

    /**
    * End block
    * @param  string $name
    * @return null
    */
    public function end(string $name): void {

        $out = \ob_get_clean();

        if (isset($this->blocks[$name])) {
            $this->blocks[$name][] = $out;
        }
    }

    /**
    * Get block content
    * @param  string $name
    * @param  array  $options
    * @return string
    */
    public function block(string $name, array $options=[]): ?string {

        if (!isset($this->blocks[$name])) return null;

        $options = \array_merge([
            'print' => true
        ], $options);

        $block = \implode("\n", $this->blocks[$name]);

        if ($options['print']) {
            echo $block;
        }

        return $block;
    }

    /**
    * Escape string.
    * @param  string $string
    * @param  string $charset
    * @return string
    */
    public function escape(?string $string, ?string $charset = null): string {

        if (\is_null($charset)) {
            $charset = $this->registry['charset'];
        }

        return \htmlspecialchars($string ?? '', \ENT_QUOTES, $charset);
    }

    /**
    * Get style inc. markup
    * @param  mixed $href
    * @return string
    */
    public function style(mixed $href, ?string $version = null): string {

        $type = 'text/css';
        $rel  = 'stylesheet';
        $src = $href;

        if (\is_array($href)) {
            extract($href, \EXTR_OVERWRITE);
        }

        $ispath = str_contains($src, ':') && !preg_match('#^(|http\:|https\:)//#', $src);
        $output = '<link href="'.($ispath ? $this->pathToUrl($src):$src).($version ? "?ver={$version}":"").'" type="'.$type.'" rel="'.$rel.'">';

        return $output;
    }

    /**
    * Get script inc. markup
    * @param  mixed $src
    * @return string
    */
    public function script(mixed $src, ?string $version = null): string {

        $type = 'text/javascript';
        $load = '';

        if (\is_array($src)) {
            extract($src, \EXTR_OVERWRITE);
        }

        $ispath = str_contains($src, ':') && !preg_match('#^(/|http\:|https\:)//#', $src);
        $output = '<script src="'.($ispath ? $this->pathToUrl($src):$src).($version ? "?ver={$version}":"").'" type="'.$type.'" '.$load.'></script>';

        return $output;
    }

    /**
    * Get assets inc. markup
    * @param  array|string $src
    * @param  mixed $version
    * @return string
    */
    public function assets(mixed $src, ?string $version = null): string {

        $list = [];

        foreach ((array)$src as $asset) {

            $src = $asset;

            if (\is_array($asset)) {
                extract($asset, \EXTR_OVERWRITE);
            }

            if (@\substr($src, -3) == '.js') {
                $list[] = $this->script($asset, $version);
            }

            if (@\substr($src, -4) == '.css') {
                $list[] = $this->style($asset, $version);
            }
        }

        return \implode("\n", $list);
    }

    /**
    * Bind GET request to route
    * @param  string  $path
    * @param  \Closure  $callback
    * @param  boolean $condition
    * @return void
    */
    public function get(string $path, mixed $callback, bool $condition = true): void {
        if ($this->request && $this->request->is('get')) {
            $this->bind($path, $callback, $condition);
        }
    }

    /**
    * Bind POST request to route
    * @param  string  $path
    * @param  \Closure  $callback
    * @param  boolean $condition
    * @return void
    */
    public function post(string $path, mixed $callback, bool $condition = true): void {
        if ($this->request && $this->request->is('post')) {
            $this->bind($path, $callback, $condition);
        }
    }

    /**
    * Bind Class to routes
    * @param  string $class
    * @return void
    */
    public function bindClass(string $class, ?string $alias = null): void {

        $self  = $this;
        $clean = ltrim($alias ? $alias : trim(strtolower(str_replace("\\", "/", $class)), "\\"), '/');

        $this->bind("/{$clean}/*", function() use($self, $class, $clean) {

            $parts  = explode('/', trim(preg_replace("#$clean#", "", $self->request->route,1),'/'));
            $action = $parts[0] ?? "index";
            $params = count($parts) > 1 ? array_slice($parts, 1):[];

            return $self->invoke($class, $action, $params);
        });

        $this->bind("/{$clean}", function() use($self, $class) {
            return $self->invoke($class, 'index', []);
        });
    }

    /**
     * Bind namespace to routes
     * @param String $namespace
     * @param string|null $alias
     * @return void
     */
    public function bindNamespace(string $namespace, ?string $alias = null): void {

        $self  = $this;
        $clean = $alias ?: trim(strtolower(str_replace("\\", "/", $namespace)), "\\");

        $this->bind('/'.$clean.'/*', function() use($self, $namespace, $clean) {

            $parts      = explode('/', trim(preg_replace("#$clean#","",$self["route"],1),'/'));
            $class      = $namespace.'\\'.$parts[0];
            $action     = $parts[1] ?? "index";
            $params     = count($parts)>2 ? array_slice($parts, 2):[];

            return $self->invoke($class,$action, $params);
        });

        $this->bind('/'.strtolower($namespace), function() use($self, $namespace) {

            $class = $namespace."\\".\array_pop(explode('\\', $namespace));

            return $self->invoke($class, 'index', []);
        });
    }

    /**
    * Bind request to route
    * @param  string  $path
    * @param  \Closure  $callback
    * @param  boolean $condition
    * @return void
    */
    public function bind(string $path, mixed $callback, bool $condition = true): void {

        if (!$condition) return;

        if (!isset($this->routes[$path])) {
            $this->routes[$path] = [];
        }

        // make $this available in closures
        if ($callback instanceof \Closure) {
            $callback = $callback->bindTo($this, $this);
        }

        // auto-register for /route/* also /route
        if (str_ends_with($path, '/*') && !isset($this->routes[\substr($path, 0, -2)])) {
            $this->bind(\substr($path, 0, -2), $callback, $condition);
        }

        $this->routes[$path] = $callback;
    }

    /**
    * Run Application request
    * @param  string $route Route to parse
    * @return void
    */
    public function run(?string $route = null, ?Request $request = null, bool $flush = true): Response {

        $this->request = $request ?? $this->getRequestfromGlobals();

        if ($route) {
            $this->request->route = $route;
        }

        $this->response = new Response();
        $this->trigger('before');

        if ($flush) {

            $this->on('app:request:stop', function() {

                if ($this->response->status === 307 && isset($this->response->headers['Location'])) {
                    header("Location: {$this->response->headers['Location']}");
                    exit;
                }

                $this->response->flush();
            });
        }

        if (!$this->request->stopped) {

            $contents = $this->dispatch($route);

            if (!$this->request->stopped) {
                $this->response->body = $contents;
            }
        }

        if ($this->response->status == 200 && $this->response->body === false) {
            $this->response->status = 404;
        }

        $this->trigger('after');

        if ($flush) {

            if ($this->response->status === 307 && isset($this->response->headers['Location'])) {
                header("Location: {$this->response->headers['Location']}");
                exit;
            }

            $this->response->flush();

            if (session_status() === \PHP_SESSION_ACTIVE) {
                session_write_close();
            }

            if (function_exists('fastcgi_finish_request')) {
                fastcgi_finish_request();
                $this->trigger('app:request:after');
            }

            register_shutdown_function(function () {

                if (!function_exists('fastcgi_finish_request')) {
                    $this->trigger('app:request:after');
                }

                $this->trigger('shutdown', [false]);
            });
        }

        return $this->response;
    }

    /**
    * Dispatch route
    * @param  string $path
    * @return Mixed
    */
    public function dispatch(string $path): mixed {

            $found  = false;
            $params = [];

            if (isset($this->routes[$path])) {

                $found = $this->render_route($path, $params);

            } else {

                foreach ($this->routes as $route => $callback) {

                    $params = [];

                    /* e.g. #\.html$#  */
                    if (str_starts_with($route, '#') && str_ends_with($route, '#')) {

                        if (preg_match($route, $path, $matches)) {
                            $params[':captures'] = array_slice($matches, 1);
                            $found = $this->render_route($route, $params);
                            break;
                        }
                    }

                    /* e.g. /admin/*  */
                    if (str_contains($route, '*')) {

                        $pattern = '#^'.str_replace('\*', '(.*)', \preg_quote($route, '#')).'#';

                        if (preg_match($pattern, $path, $matches)) {

                            $params[':splat'] = array_slice($matches, 1);
                            $found = $this->render_route($route, $params);
                            break;
                        }
                    }

                    /* e.g. /admin/:id  */
                    if (str_contains($route, ':')) {

                        $parts_p = explode('/', $path);
                        $parts_r = explode('/', $route);

                        if (count($parts_p) == count($parts_r)) {

                            $matched = true;

                            foreach ($parts_r as $index => $part) {
                                if (str_starts_with($part, ':')) {
                                    $params[\substr($part,1)] = $parts_p[$index];
                                    continue;
                                }

                                if ($parts_p[$index] != $part) {
                                    $matched = false;
                                    break;
                                }
                            }

                            if ($matched) {
                                $found = $this->render_route($route, $params);
                                break;
                            }
                        }
                    }
                }
            }

            return $found;
    }

    /**
     * Render dispatched route
     * @param string $route
     * @param array $params
     * @return string
     */
    protected function render_route(string $route, array $params = []): mixed {

        if (isset($this->routes[$route])) {

            $ret = null;

            if (\is_callable($this->routes[$route])) {
                $ret = \call_user_func($this->routes[$route], $params);
            }

            if (!is_null($ret)) {
                return $ret;
            }
        }

        return false;
    }


    /**
     * Invoke Class as controller
     * @param String $class
     * @param String $action
     * @param array $params
     * @return Mixed
     */
    public function invoke(string $class, string $action='index', array $params=[]): mixed {

        $context = compact('action', 'params');
        $controller = new $class($this, $context);

        if (!\method_exists($controller, $action)) {

            if (\method_exists($controller, '__catchall')) {

                array_unshift($params, $action);
                $action = '__catchall';

            } else {
                return false;
            }
        }

        return \is_callable([$controller, $action])
                ? \call_user_func_array([$controller,$action], $params)
                : false;
    }

    /**
    * Get request variables
    * @param  string $index
    * @param  mixed $default
    * @param  array $source
    * @return Mixed
    */
    public function param(?string $index = null, mixed $default = null, mixed $source = null): mixed {
        return isset($this->request) ? $this->request->param($index, $default, $source) : $default;
    }

    /**
    * Request helper function
    * @param  string $type
    * @return Boolean
    */
    public function req_is(string $type): bool {
        return isset($this->request) && $this->request->is($type);
    }

    /**
    * Get client ip.
    * @return string
    */
    public function getClientIp(): string{
        return isset($this->request) ? $this->request->getClientIp() : '';
    }

    /**
    * Get client language
    * @return string
    */
    public function getClientLang(string $default="en"): string {
        return isset($this->request) ? $this->request->getClientLang($default) : $default;
    }

    /**
    * Get site url
    * @return string
    */
    public function getSiteUrl(bool $withpath = false): string {
        return isset($this->request) ? $this->request->getSiteUrl($withpath) : '';
    }

    /**
    * Create Hash
    * @return string
    */
    public function hash(string $text, mixed $algo = PASSWORD_BCRYPT): string {
        return \password_hash($text, $algo);
    }

    /**
     * RC4 encryption
     * @param  string  $data
     * @param  string  $pwd
     * @param  boolean $base64encoded
     * @return string
     */
    public function encode(string $data, string $pwd, bool $base64encoded = false): string {

        $key = [''];
        $box = [''];
        $cipher = '';

        $pwd_length = \strlen($pwd);
        $data_length = \strlen($data);

        for ($i = 0; $i < 256; $i++) {
            $key[$i] = \ord($pwd[$i % $pwd_length]);
            $box[$i] = $i;
        }
        for ($j = $i = 0; $i < 256; $i++) {
            $j = ($j + $box[$i] + $key[$i]) % 256;
            $tmp = $box[$i];
            $box[$i] = $box[$j];
            $box[$j] = $tmp;
        }
        for ($a = $j = $i = 0; $i < $data_length; $i++) {
            $a = ($a + 1) % 256;
            $j = ($j + $box[$a]) % 256;
            $tmp = $box[$a];
            $box[$a] = $box[$j];
            $box[$j] = $tmp;
            $k = $box[(($box[$a] + $box[$j]) % 256)];
            $cipher .= \chr(\ord($data[$i]) ^ $k);
        }
        return $base64encoded ? \base64_encode($cipher):$cipher;
    }

    /**
     * Decode RC4 encrypted text
     * @param  string $data
     * @param  string $pwd
     * @return string
     */
    public function decode(string $data, string $pwd): string {
        return $this->encode($data, $pwd);
    }

    public function helper(string $helper): Helper {

        if (isset($this->helpers[$helper]) && !is_object($this->helpers[$helper])) {
            $this->helpers[$helper] = new $this->helpers[$helper]($this);
        }

        return $this->helpers[$helper];
    }

    public function isAbsolutePath(string $path): bool {
        return '/' == $path[0] || '\\' == $path[0] || (3 < \strlen($path) && \ctype_alpha($path[0]) && $path[1] == ':' && ('\\' == $path[2] || '/' == $path[2]));
    }

    public function module(string $name): mixed {
        return $this->registry['modules'][$name] ?? null;
    }

    public function registerModule(string $name, string $dir): Module {

        $name = strtolower($name);

        if (!isset($this->registry['modules'][$name])) {

            $module = new Module($this);

            $module->_dir = $dir;
            $module->_bootfile = "{$dir}/bootstrap.php";

            $this->path($name, $dir);
            $this->registry['modules'][$name] = $module;
            $this->bootModule($module);
        }

        return $this->registry['modules'][$name];
    }

    public function loadModule($path, $prefix = null): bool {

        if (is_array($path)) {
            foreach ($path as $p) $this->loadModule($p);
            return true;
        }

        $disabled = $this->registry['modules.disabled'] ?? null;
        $basename = basename($path);
        $pfx = is_bool($prefix) && $prefix ? strtolower(basename($path)) : $prefix;
        $name = $prefix ? "{$pfx}-{$basename}" : $basename;

        if ($disabled && \in_array($name, $disabled)) return false;

        $this->registerModule($name, $path);

        return true;
    }

    public function loadModules(mixed $dirs, bool $autoload = true, mixed $prefix = null): array {

        $modules  = [];
        $dirs     = (array)$dirs;

        foreach ($dirs as &$dir) {

            if (file_exists($dir)) {

                // load modules
                foreach (new \DirectoryIterator($dir) as $module) {

                    if ($module->isFile() || $module->isDot()) continue;

                    if ($this->loadModule($module->getRealPath(), $prefix)) {
                        $modules[] = strtolower($module->getBasename());
                    }
                }

                if ($autoload) $this->registry['autoload']->append($dir);
            }
        }

        return $modules;
    }

    protected function bootModule(Module $module): void {

        if (is_file($module->_bootfile)) {
            $app = $this;
            require($module->_bootfile);
        }
    }

    // accces to services
    public function __get($name): mixed {
        return $this[$name];
    }

    // Array Access implementation

    public function offsetSet(mixed $key, mixed $value): void {
        $this->registry[$key] = $value;
    }

    public function offsetGet($key): mixed {

        $value = $this->retrieve($key, null);

        if (!is_null($value)) {
            return ($value instanceof \Closure) ? $value($this) : $value;
        }

        return null;
    }

    public function offsetExists($key): bool {
        return isset($this->registry[$key]);
    }

    public function offsetUnset(mixed $key): void {
        unset($this->registry[$key]);
    }

    // Invoke call
    public function __invoke($helper): Helper {

        return $this->helper($helper);
    }

    protected function getRequestfromGlobals(): Request {

        return Request::fromGlobalRequest([
            'site_url'   => $this->registry['site_url'],
            'base_url'   => $this->registry['base_url'],
            'base_route' => $this->registry['base_route']
        ]);
    }

} // End App

// Helpers

class AppAware {

    public App $app;
    public mixed $context;

    public function __construct(App $app, mixed $context = null) {
        $this->app = $app;
        $this->context = $context;

        $this->initialize();
    }

    protected function initialize() {}

    public function __call($name, $arguments) {

        if (\is_callable([$this->app, $name])) {
            return \call_user_func_array([$this->app, $name], $arguments);
        }
        return $this;
    }

    public function __invoke($helper) {

        return $this->app->helper($helper);
    }

    // acccess to services
    public function __get($name) {
        return $this->app[$name];
    }

}

class Module extends AppAware {

    protected array $methods = [];
    public array $props = [];

    public ?string $_dir = null;
    public ?string $_bootfile = null;

    public function extend(array $api) {

        foreach ($api as $name => $value) {

            if ($value instanceof \Closure) {
                $value = $value->bindTo($this, $this);
                $this->methods[$name] = $value;
            } else {
                $this->props[$name] = $value;
            }
        }
    }

    public function bindApp(App $app): void {

        $this->app = $app;

        foreach ($this->methods as $name => $value) {

            if ($value instanceof \Closure) {
                $value = $value->bindTo($this, $this);
            }

            $this->methods[$name] = $value;
        }
    }

    public function __set($name , $value) {
        $this->extend([$name => $value]);
    }
    public function __get($name) {
        return $this->props[$name] ?? null;
    }
    public function __isset($name) {
        return isset($this->props[$name]);
    }
    public function __unset($name) {
        unset($this->props[$name]);
    }
    public function __call($name, $arguments) {

        if (isset($this->methods[$name]) && \is_callable($this->methods[$name])) {
            return \call_user_func_array($this->methods[$name], $arguments);
        }

        if (isset($this->methods['__call']) && \is_callable($this->methods['__call'])) {
            return \call_user_func_array($this->methods['__call'], [$name, $arguments]);
        }

        return null;
    }
}


class Helper extends AppAware { }


include(__DIR__.'/Helper/Session.php');
include(__DIR__.'/Helper/Cache.php');

// helper functions

function fetch_from_array(array $array, ?string $index = null, mixed $default = null) {

    if (is_null($index)) {

        return $array;

    } elseif (isset($array[$index])) {

        return $array[$index];

    } elseif (str_contains($index, '/')) {

        $keys = explode('/', $index);

        switch (count($keys)) {

            case 1:
                if (isset($array[$keys[0]])) {
                    return $array[$keys[0]];
                }
                break;

            case 2:
                if (isset($array[$keys[0]][$keys[1]])) {
                    return $array[$keys[0]][$keys[1]];
                }
                break;

            case 3:
                if (isset($array[$keys[0]][$keys[1]][$keys[2]])) {
                    return $array[$keys[0]][$keys[1]][$keys[2]];
                }
                break;

            case 4:
                if (isset($array[$keys[0]][$keys[1]][$keys[2]][$keys[3]])) {
                    return $array[$keys[0]][$keys[1]][$keys[2]][$keys[3]];
                }
                break;
        }
    }

    return \is_callable($default) ? \call_user_func($default) : $default;
}
