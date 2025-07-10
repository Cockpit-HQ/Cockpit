<?php

namespace App\Helper;

class Auth extends \Lime\Helper {

    public string $sessionKey = 'app.auth.user';

    public function authenticate(array $data): mixed {

        $data = array_merge([
            'user'     => '',
            'email'    => '',
            'password' => ''
        ], $data);

        if (!$data['password']) return false;

        $filter = ['active' => true];

        if ($data['email']) {
            $filter['email'] = $data['email'];
        } else {
            $filter['user'] = $data['user'];
        }

        $user = $this->app->dataStorage->findOne('system/users', $filter);

        if ($user && (password_verify($data['password'], $user['password']))){

            $user = array_merge($data, (array)$user);

            unset($user['password']);

            $this->app->trigger('app.user.authenticate', [&$user]);

            return $user;
        }

        return false;
    }

    public function getUser(?string $prop = null, mixed $default = null): mixed {

        $user = $this->app->retrieve($this->sessionKey);

        if (is_null($user)) {
            $user = $this->app->helper('session')->read($this->sessionKey, null);
        }

        if (!is_null($prop)) {
            return $user && isset($user[$prop]) ? $user[$prop] : $default;
        }

        return $user;
    }

    public function setUser(array $user, bool $permanent = true): void {

        if (isset($user['name'])) {
            $user['name_short'] = explode(' ', $user['name'])[0];
        }

        if ($permanent) {
            // prevent session fixation attacks
            $this->app->helper('session')->regenerateId(true);
            $this->app->helper('session')->write($this->sessionKey, $user);
        }

        $this->app->trigger('app.auth.setuser', [&$user, $permanent]);
        $this->app->set($this->sessionKey, $user);
    }

    public function logout(array $params = []): void {

        $user = $this->getUser();
        $data =  $this->app->helper('session')->getSession();

        $this->app->trigger('app.user.logout', [$user, $params, $data]);
        $this->app->helper('session')->delete($this->sessionKey);
        $this->app->set($this->sessionKey, null);

        // prevent session fixation attacks
        $this->app->helper('session')->regenerateId(true);
        $this->app->trigger('app.user.logout.after', [$user, $params, $data]);
    }
}
