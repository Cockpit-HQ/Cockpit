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

        if (substr($redirectTo, 0, 1) !== '/') {
            $redirectTo = '/';
        }

        $redirectTo = htmlspecialchars($this->app->routeUrl($redirectTo), ENT_QUOTES, 'UTF-8');
        $csrfToken = $this->helper('csrf')->token('app.login');

        $this->helper('theme')->pageClass('login-page');

        return $this->render('app:views/auth/login.php', compact('redirectTo', 'csrfToken'));
    }

    public function dialog() {

        $this->layout = 'app:layouts/raw.php';

        $this->app->response->mime = 'js';

        $csrfToken = $this->helper('csrf')->token('app.login');

        return $this->render('app:views/auth/dialog.php', compact('csrfToken'));
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

        if ($this->helper('auth')->getUser()) {
            return false;
        }

        $auth = $this->param('auth');

        if (!$auth || !isset($auth['user'], $auth['password']) || !is_string($auth['user']) || !\is_string($auth['password'])) {
            return $this->stop(412);
        }

        if (!$this->helper('csrf')->isValid('app.login', $this->param('csrf'), true)) {
            return $this->stop(['error' => 'APP_LOGIN_SESSION_INVALID'], 412);
        }

        $auth = [
            'user' => $auth['user'],
            'password' => $auth['password'],
        ];

        if (isset($auth['user']) && $this->helper('utils')->isEmail($auth['user'])) {
            $auth['email'] = $auth['user'];
            $auth['user']  = '';
        }

        $user = $this->helper('auth')->authenticate($auth);

        if ($user && $user['role'] === 'public') {
            return $this->stop(401);
        }

        if ($user) {

            if (isset($user['twofa']['enabled']) && $user['twofa']['enabled']) {

                return [
                    'success' => true,
                    'user' => [
                        'name' => $user['name'],
                        'user' => $user['user'],
                        'email' => $user['email'],
                        'twofa' => $this->helper('jwt')->create([
                            '_id'   => $user['_id'],
                            'user'  => $user['user'],
                            'name'  => $user['name'],
                            'email' => $user['email'],
                            'role'  => $user['role'],
                        ])
                    ]
                ];
            }

            // remove 2FA settings from user session
            unset($user['twofa']);

            $this->app->trigger('app.user.disguise', [&$user]);

            $this->helper('auth')->setUser($user);
            $this->helper('session')->write('app.session.start', time());

            $this->app->trigger('app.user.login', [$user]);

            return ['success' => true, 'user' => $user, 'csrf' => $this->helper('csrf')->token('app.csrf')];
        }

        return ['success' => false];
    }

    public function validate2FA() {

        $code = $this->param('code', null);
        $token = $this->param('token', null);

        if (!$code || !$token) {
            return $this->stop(412);
        }

        try {
            $user = (array) $this->app->helper('jwt')->decode($token);
        } catch(\Exception $e) {
            return $this->stop(412);
        }

        if (!$code || !isset($user['_id'])) {
            return $this->stop(412);
        }

        $user = $this->app->dataStorage->findOne('system/users', ['_id' => $user['_id']]);

        if ($user && $this->helper('twfa')->verifyCode($user['twofa']['secret'], $code)) {

            unset($user['twofa']);

            $this->app->trigger('app.user.disguise', [&$user]);

            $this->helper('auth')->setUser($user);
            $this->helper('session')->write('app.session.start', time());

            $this->app->trigger('app.user.login', [&$user]);

            return ['success' => true, 'user' => $user, 'csrf' => $this->helper('csrf')->token('app.csrf')];
        }

        return $this->stop(412);

    }
}
