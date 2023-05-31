<?php

namespace Content\Helper;


class Content extends \Lime\Helper {

    protected array $allowedModels = [];

    public function allowedModels(?string $role = null): array {

        $role = $role ?? $this->app->helper('auth')->getUser('role');

        if (!$role) {
            return [];
        }

        if (isset($this->allowedModels[$role])) {
            return $this->allowedModels[$role];
        }

        $this->allowedModels[$role] = [];

        $models = $this->app->module('content')->models();
        $acl = $this->app->helper('acl');
        $allowed = [];

        foreach ($models as $name => $model) {

            if ($acl->isAllowed("content/{$name}/read", $role)) {
                $allowed[] = $name;
            }
        }

        $this->allowedModels[$role] = $allowed;

        return $this->allowedModels[$role];
    }
}
