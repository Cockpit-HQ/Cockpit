<?php

namespace App\Helper;


class Acl extends \Lime\Helper {

    protected array $roles = [];

    protected function initialize() {

        $this->roles = $this->app->memory->get('app.roles.permissions', function() {
            return $this->cache();
        });
    }

    /**
     * Get the list of roles with their permissions.
     *
     * @return array The list of roles.
     */
    public function roles(): array {

        $roles = [
            ['appid' => 'admin', 'name' => 'Admin']
        ];

        foreach ($this->roles as $role) {

            $roles[] = [
                'appid' => $role['appid'],
                'name' => $role['name'],
            ];
        }

        return $roles;
    }

    /**
     * Check if a user has a specific permission.
     *
     * @param string $permission The permission to check.
     * @param string|null $role The role to check against.
     * @return bool True if the user has the permission, false otherwise.
     */
    public function isAllowed(string $permission, ?string $role = null): bool {

        $role = $role ?? $this->app->helper('auth')->getUser('role');

        if ($this->isSuperAdmin($role)) {
            return true;
        }

        return isset($this->roles[$role]['permissions'][$permission]) && $this->roles[$role]['permissions'][$permission];
    }

    /**
     * Check if a user is a super admin.
     *
     * @param string|null $role The role to check.
     * @return bool True if the user is a super admin, false otherwise.
     */
    public function isSuperAdmin($role = null) {

        $role = $role ?? $this->app->helper('auth')->getUser('role');

        if ($role == 'admin') {
            return true;
        }

        return false;
    }

    /**
     * Cache the roles and their permissions.
     *
     * @return array The cached roles.
     */
    public function cache(): array {

        $cache = [];

        $roles = $this->app->dataStorage->find('system/roles', [
            'sort' => ['name' => 1]
        ])->toArray();

        foreach ($roles as $role) {
            $cache[$role['appid']] = $role;
        }

        $this->app->memory->set('app.roles.permissions', $cache);

        return $cache;
    }
}
