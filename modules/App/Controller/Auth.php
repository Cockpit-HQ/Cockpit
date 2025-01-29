<?php

namespace App\Controller;

/**
 * Class Controller
 * @package App
 */
class Auth extends Base {

    protected $layout = 'app:layouts/canvas.php';

    protected function before() {
        $this->helper('theme')->pageClass('auth-page');
    }

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

    public function magiclink() {

        if ($this->helper('auth')->getUser()) {
            $this->app->reroute('/');
        }

        if (!$this->app->retrieve('auth.login.magiclink', true) || $this->app->mailer->getTransport() === 'mail') {
            return false;
        }

        if ($this->param('email')) {

            if (!$this->helper('csrf')->isValid('app.magiclink', $this->param('csrf'), true)) {
                return $this->stop(['error' => 'APP_MAGICLINK_SESSION_INVALID'], 412);
            }

            $email = $this->param('email');

            if (!$this->helper('utils')->isEmail($email)) {
                $this->stop(['error' => 'APP_LOGIN_EMAIL_INVALID'], 412);
            }

            $user = $this->app->dataStorage->findOne('system/users', ['email' => $email, 'active' => true]);

            if (!$user) {
                sleep(1);
                return ['success' => true];
            }

            $check = "{$user['_id']}.{$user['password']}.{$user['_modified']}";

            $token = $this->helper('jwt')->create([
                'email' => $email,
                'check' => $this->app->hash($check),
                'iat' => time(),
                'exp' => strtotime('+15 minutes'),
            ]);

            // send link with magic link
            $this->app->mailer->mail(
                $email,
                'Login: '.$this->app->retrieve('app.name'),
                $this->app->render('app:emails/magiclink.php with app:layouts/email.php', compact('token', 'email', 'user'))
            );

            return ['success' => true];
        }

        if ($this->param('token')) {

            try {

                $payload = (array) $this->app->helper('jwt')->decode($this->param('token'));

                if (!isset($payload['email'], $payload['check'])) {
                    return false;
                }

                $user = $this->app->dataStorage->findOne('system/users', ['email' => $payload['email'], 'active' => true]);
                $check = "{$user['_id']}.{$user['password']}.{$user['_modified']}";

                if (!$user || !password_verify($check, $payload['check'])) {
                    return false;
                }

                if (isset($user['twofa']['enabled']) && $user['twofa']['enabled']) {

                    $user = [
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
                    ];

                    return $this->render('app:views/auth/magiclink.twofa.php', ['user' => $user]);
                }

                $this->setSessionUser($user);

                $this->app->reroute('/');

            } catch(\Exception $e) {
                return false;
            }
        }

        if ($this->app->mailer->getTransport() === 'mail') {
            $this->app->reroute('/auth/login');
        }

        $csrfToken = $this->helper('csrf')->token('app.magiclink');

        return $this->render('app:views/auth/magiclink.php', compact('csrfToken'));
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

            $user = $this->setSessionUser($user);

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

            $user = $this->setSessionUser($user);

            return ['success' => true, 'user' => $user, 'csrf' => $this->helper('csrf')->token('app.csrf')];
        }

        return $this->stop(412);

    }

    public function reset() {

        if ($this->helper('auth')->getUser()) {
            $this->app->reroute('/');
        }

        if ($this->app->mailer->getTransport() === 'mail') {
            return false;
        }

        $view = 'reset-password';
        $token = $token = $this->param('token', null);
        $user = null;

        if ($this->param('email') || $this->param('password')) {
            if (!$this->helper('csrf')->isValid('app.passwordreset', $this->param('csrf'), true)) {
                return $this->stop(['error' => 'APP_PASSWORDRESET_SESSION_INVALID'], 412);
            }
        }

        if ($token) {
            try {

                $payload = (array) $this->app->helper('jwt')->decode($token);

                if (!isset($payload['email'], $payload['check'])) {
                    return false;
                }

                $user = $this->app->dataStorage->findOne('system/users', ['email' => $payload['email'], 'active' => true]);
                $check = "{$user['_id']}.{$user['password']}.{$user['_modified']}";

                if (!$user || !password_verify($check, $payload['check'])) {
                    return false;
                }

            } catch(\Exception $e) {
                return false;
            }
        }

        if ($this->param('email')) {

            $email = $this->param('email');

            if (!$this->helper('utils')->isEmail($email)) {
                $this->stop(['error' => 'APP_LOGIN_EMAIL_INVALID'], 412);
            }

            $user = $this->app->dataStorage->findOne('system/users', ['email' => $email, 'active' => true]);

            if (!$user) {
                sleep(1);
                return ['success' => true];
            }

            $check = "{$user['_id']}.{$user['password']}.{$user['_modified']}";

            $token = $this->helper('jwt')->create([
                'email' => $email,
                'check' => $this->app->hash($check),
                'iat' => time(),
                'exp' => strtotime('+15 minutes'),
            ]);

            // send link to reset password
            $this->app->mailer->mail(
                $email,
                'Reset Password: '.$this->app->retrieve('app.name'),
                $this->app->render('app:emails/reset-password.php with app:layouts/email.php', compact('token', 'email', 'user'))
            );

            return ['success' => true];
        }

        if ($token) {

            if ($this->param('password')) {

                $password = $this->param('password', '');

                if (!is_string($password)) return $this->stop(412);
                if (!trim($password)) return $this->stop(412);

                $password = $this->app->hash($password);

                $data = [
                    '_id' => $user['_id'],
                    'password' => $password,
                    '_modified' => time()
                ];

                $this->app->dataStorage->save('system/users', $data);

                return ['success' => true];

            } else {
                $view = 'set-password';
            }
        }

        $csrfToken = $this->helper('csrf')->token('app.passwordreset');

        return $this->render("app:views/auth/{$view}.php", compact('csrfToken', 'token'));
    }

    private function setSessionUser($user) {

        // remove 2FA settings from user session
        unset($user['twofa'], $user['password']);

        $this->app->trigger('app.user.disguise', [&$user]);

        $this->helper('auth')->setUser($user);
        $this->helper('session')->write('app.session.start', time());

        $this->app->trigger('app.user.login', [$user]);

        return $user;
    }
}
