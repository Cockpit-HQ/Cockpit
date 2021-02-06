<?php

namespace App\Controller;

/**
 * Class Controller
 * @package App
 */
class Auth extends Base {

    protected $layout = 'app:layouts/canvas.php';

    public function login() {

        if ($this->helper('auth')->getUser()) {
            $this->app->reroute('/');
        }

        $this->app->response->nocache = true;

        $redirectTo = $this->param('to', '/');

        if (\substr($redirectTo, 0, 1) !== '/') {
            $redirectTo = '/';
        }

        $redirectTo = htmlspecialchars($this->baseUrl($redirectTo), ENT_QUOTES, 'UTF-8');

        return $this->render('app:views/auth/login.php', \compact('redirectTo'));
    }

    public function logout() {

        $this->helper('auth')->logout();

        if ($this->app->request->is('ajax')) {
            return ['logout' => true];
        } else {
            $this->app->reroute('/auth/login?logout=1');
        }
    }

    public function check() {

        $auth = $this->param('auth');

        if (!$auth || !isset($auth['user'], $auth['password']) || !\is_string($auth['user']) || !\is_string($auth['password'])) {
            return $this->stop(412);
        }

        if (!$this->helper('csrf')->isValid('login', $this->param('csrf'), true)) {
            return $this->stop(412);
        }

        if (isset($auth['user']) && $this->helper('utils')->isEmail($auth['user'])) {
            $auth['email'] = $auth['user'];
            $auth['user']  = '';
        }

        $user = $this->helper('auth')->authenticate($auth);

        $this->app->trigger('app.user.disguise', [&$user]);

        if ($user) {
            $this->helper('auth')->setUser($user);
            $this->helper('session')->write('app.session.start', time());

            return ['success' => true, 'user' => $user];
        }

        return ['success' => false];
    }
}