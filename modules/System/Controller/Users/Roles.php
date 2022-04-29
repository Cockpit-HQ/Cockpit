<?php

namespace System\Controller\Users;

use App\Controller\App;
use ArrayObject;

class Roles extends App {

    protected function before() {

        if (!$this->isAllowed('app/roles/manage')) {
            $this->stop(401);
        }
    }

    public function index() {
        return $this->render('system:views/users/roles/index.php');
    }

    public function role($id = null) {

        if (!$id) {
            return $this->stop(['error' => 'Role id is missing'], 412);
        }

        $role = $this->app->dataStorage->findOne('system/roles', ['_id' => $id]);

        if (!$role) {
            return false;
        }

        $this->checkAndLockResource($id);

        $role['permissions'] = new ArrayObject($role['permissions']);

        return $this->render('system:views/users/roles/role.php', compact('role'));
    }

    public function create() {

        $role = [
            'appid' => '',
            'name'  => '',
            'info'  => '',
            'permissions' => new ArrayObject([])
        ];

        return $this->render('system:views/users/roles/role.php', compact('role'));
    }

    public function remove() {

        $role = $this->param('role');

        if (!$role || !isset($role['_id'], $role['appid'])) {
            return $this->stop(['error' => 'Role is missing'], 412);
        }

        $this->app->dataStorage->remove('system/roles', ['_id' => $role['_id']]);
        $this->app->dataStorage->update('system/users', ['role' => $role['appid']], ['role' => 'user']);

        $this->cache();

        return ['success' => true];
    }

    public function save() {

        $role = $this->param('role');

        if (!$role) {
            return $this->stop(['error' => 'Role data is missing'], 412);
        }

        $role['_modified'] = time();
        $isUpdate = isset($role['_id']);

        if (!$isUpdate) {
            $role['appid'] = \strtolower($role['appid']);
            $role['_created'] = $role['_modified'];
        }

        if (!isset($role['appid']) || !trim($role['appid'])) {
            return $this->stop(['error' => 'appid required'], 412);
        }

        foreach (['appid', 'name', 'info'] as $key) {
            $role[$key] = strip_tags(trim($role[$key]));
        }

        // unique check

        $_role = $this->app->dataStorage->findOne('system/roles', ['appid' => $role['appid']]);

        if ($_role && (!isset($role['_id']) || $role['_id'] != $_role['_id'])) {
            return $this->app->stop(['error' => 'appid is already used!'], 412);
        }

        // admin role is protected (superadmin)
        if ($role['appid'] == 'admin') {
            return $this->app->stop(['error' => 'appid is already used!'], 412);
        }

        // cleanup permissions
        if (isset($role['permissions']) && \is_array($role['permissions'])) {

            foreach ($role['permissions'] as $key => $value) {
                if (!$value) unset($role['permissions'][$key]);
            }
        } else {
            $role['permissions'] = [];
        }


        $this->app->trigger('app.roles.save', [&$role, $isUpdate]);
        $this->app->dataStorage->save('system/roles', $role);

        $role = $this->app->dataStorage->findOne('system/roles', ['_id' => $role['_id']]);

        $role['permissions'] = new ArrayObject( $role['permissions']);

        $this->cache();

        return $role;
    }


    public function load() {

        $this->helper('session')->close();

        $roles = $this->app->dataStorage->find('system/roles', [
            'sort' => ['name' => 1]
        ])->toArray();

        return $roles;
    }

    protected function cache() {
        $this->helper('acl')->cache();
    }

}