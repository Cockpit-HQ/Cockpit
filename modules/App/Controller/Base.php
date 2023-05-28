<?php

namespace App\Controller;

/**
 * Class Controller
 * @package App
 */
class Base extends \Lime\AppAware {

    protected $layout = false;

    /**
     * @param $app
     */
    protected function initialize() {

        $controller = \strtolower(\str_replace('\\', '.', \get_class($this)));

        $this->app->trigger("app.{$controller}.init", [$this]);

        $this->before();
    }

    /**
     * @return string
     */
    public function index() {
        return 'Please implement the index action';
    }

    /**
     *
     */
    protected function before() { }

    /**
     * @param $view
     * @param array $params
     * @return mixed
     */
    protected function render(string $view, array $params = []): mixed {

        $view .= $this->layout ? " with {$this->layout}" : '';

        return $this->app->render($view, $params);
    }

    /**
     * @param $path
     * @return mixed
     */
    protected function path(string $path): mixed {
        return $this->app->path($path);
    }

    /**
     * @param $key
     * @param null $default
     * @return Mixed
     */
    protected function param(string $key, mixed $default = null) {
        return $this->app->request->param($key, $default);
    }

    /**
     * @param $module
     * @return mixed
     */
    protected function module(string $module): mixed {
        return $this->app->module($module);
    }

    /**
     * @param $name
     * @return mixed
     */
    protected function helper(string $name): mixed {
        return $this->app->helper($name);
    }

    /**
     *
     */
    protected function stop(mixed $data = null, mixed $status = null) {
        return $this->app->stop($data, $status);
    }
}
