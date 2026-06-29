<?php

namespace App\Helper;


class Acl extends \Lime\Helper {

    protected array $roles = [];
    protected ?string $denialMessage = null;

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
     * When $context is provided and the role has an expression for this
     * permission, the expression is evaluated via ScriptLite. The boolean
     * permission must be granted first; the expression further restricts it.
     *
     * Expressions are stored as {expr: "...", msg: "..."} objects on the role.
     *
     * @param string $permission The permission to check.
     * @param string|null $role The role to check against.
     * @param array $context Optional item-level context for expression evaluation.
     * @return bool True if the user has the permission, false otherwise.
     */
    public function isAllowed(string $permission, ?string $role = null, array $context = []): bool {

        $this->denialMessage = null;

        $role = $role ?? $this->app->helper('auth')->getUser('role');

        if ($this->isSuperAdmin($role)) {
            return true;
        }
        else if ($this->app['maintenance'] && !preg_match('/\/read$/', $permission)) {
            return false;
        }

        if (!isset($this->roles[$role]['permissions'][$permission]) || !$this->roles[$role]['permissions'][$permission]) {
            return false;
        }

        if (empty($context)) {
            return true;
        }

        $entry = $this->roles[$role]['expressions'][$permission] ?? null;

        if (!$entry) {
            return true;
        }

        // normalize: accept string (legacy) or {expr, msg} object
        if (\is_string($entry)) {
            $expr = $entry;
            $msg = null;
        } elseif (\is_array($entry)) {
            $expr = (string)($entry['expr'] ?? '');
            $msg = isset($entry['msg']) ? (string)$entry['msg'] : null;
        } else {
            return true;
        }

        if (!\trim($expr)) {
            return true;
        }

        $result = $this->evaluateExpression($expr, $context, $role);

        if (!$result && $msg) {
            $this->denialMessage = $msg;
        }

        return $result;
    }

    /**
     * Get the denial message from the last failed expression check.
     *
     * @return string|null The message, or null if none was set.
     */
    public function getDenialMessage(): ?string {
        return $this->denialMessage;
    }

    /**
     * Evaluate a permission expression with the given context.
     *
     * @param string $expression JS expression to evaluate.
     * @param array $context Variables available in the expression scope.
     * @param string $role The role being evaluated (for error reporting).
     * @return bool Result of the expression. Returns false on error (fail-closed).
     */
    protected function evaluateExpression(string $expression, array $context, string $role): bool {

        $globals = $context;

        if (!isset($globals['user'])) {
            $user = $this->app->helper('auth')->getUser();

            if ($user) {
                unset($user['password'], $user['api_key'], $user['_reset_token']);
                $globals['user'] = $user;
            }
        }

        try {
            return $this->app->helper('script')->test($expression, $globals);
        } catch (\Throwable $e) {
            $this->app->trigger('acl.expression.error', [$expression, $e, $role]);
            return false;
        }
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
