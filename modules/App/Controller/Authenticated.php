<?php

namespace App\Controller;

/**
 * Class Controller
 * @package App
 */
class Authenticated extends Base {

    protected $user;

    protected function initialize() {

        $user = $this->app->helper('auth')->getUser();

        if (!$user) {

            $route = $this->app->request->route;
            $query = http_build_query($this->app->request->query);
            $url   = urlencode($route.($query ? "?{$query}" : ''));

            $this->app->reroute("/auth/login?to={$url}");
        }

        $this->user = $user;
        $this->app->set('user', $user);

        parent::initialize();
    }

    protected function isAllowed(string $permission): bool {
        return $this->helper('acl')->isAllowed($permission);
    }

    protected function hasValidCsrfToken(bool $stop = false) {

        $csrf = $this->app->param('xcsrftoken', $this->app->request->headers['X-Csrf-Token'] ?? '');
        $check = $this->helper('csrf')->isValid('app.csrf', $csrf, true);

        if (!$check && $stop) {
            return $this->stop(412);
        }

        return $check;
    }

    protected function checkAndLockResource($resourceId) {

        $meta = null;

        if (!$this->helper('admin')->isResourceEditableByCurrentUser($resourceId, $meta)) {
            return $this->stop($this->render('app:views/lockedResouce.php', compact('meta', 'resourceId')), 200);
        }

        $this->helper('admin')->lockResourceId($resourceId);
    }

    public function unlockResource($resourceId) {

        $meta = $this->helper('admin')->isResourceLocked($resourceId);
        $success = false;

        if ($meta) {

            $canUnlock = $this->isAllowed('app/resources/unlock');

            if (!$canUnlock) {
                $canUnlock = $meta['sid'] == md5(session_id());
            }

            if ($canUnlock) {
                $this->helper('admin')->unlockResourceId($resourceId);
                $success = true;
            }
        }

        return ['success' => $success];
    }
}
