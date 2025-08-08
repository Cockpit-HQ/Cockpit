<?php

namespace App\Helper;

class Admin extends \Lime\Helper {

    /**
     * Check if a resource is locked.
     *
     * @param string $resourceId The resource ID.
     * @param int|null $ttl The time-to-live for the lock.
     * @return array|false The lock metadata or false if not locked.
     */
    public function isResourceLocked($resourceId, $ttl = null) {

        $ttl  = $ttl ?? 300;
        $key  = "locked:{$resourceId}";
        $meta = $this->app->dataStorage->getKey('app/options', $key, false);

        if ($meta && ($meta['time'] + $ttl) < time()) {
            $this->app->dataStorage->removeKey('app/options', $key);
            $meta = false;
        }

        if ($meta) {
            return $meta;
        }

        return false;
    }

    /**
     * Check if a resource is editable by the current user.
     *
     * @param string $resourceId The resource ID.
     * @param array|null $meta The lock metadata.
     * @return bool True if the resource is editable, false otherwise.
     */
    public function isResourceEditableByCurrentUser($resourceId, &$meta = null) {

        $meta = $this->isResourceLocked($resourceId);

        if (!$meta) {
            return true;
        }

        $user = $this->app->helper('auth')->getUser();

        if ($meta['user']['_id'] == $user['_id'] && $meta['sid'] == md5(session_id())) {
            return true;
        }

        return false;
    }

    /**
     * Lock a resource for editing.
     *
     * @param string $resourceId The resource ID.
     * @param array|null $user The user information.
     * @return bool True if the resource was locked, false otherwise.
     */
    public function lockResourceId($resourceId, $user = null) {

        if (!$resourceId) {
            return false;
        }

        $key  = "locked:{$resourceId}";
        $user = $user ?? $this->app->helper('auth')->getUser();

        if (!$user) {
            return false;
        }

        $now = time();

        $meta = [
            'rid'  => $resourceId,
            'user' => ['_id' => $user['_id'], 'name' => $user['name'] ?? '', 'user' => $user['user'], 'email' => $user['email']],
            'sid'  => md5(session_id()),
            'time' => $now,
            '_created' => $now,
            '_updated' => $now,
        ];

        $this->app->dataStorage->setKey('app/options', $key, $meta);

        return true;
    }

    /**
     * Update the lock metadata for a resource.
     *
     * @param string $resourceId The resource ID.
     * @return bool True if the lock metadata was updated, false otherwise.
     */
    public function updateLockedResourceId($resourceId) {

        $meta = null;

        if (!$this->isResourceEditableByCurrentUser($resourceId)) {
            return false;
        }

        $now = time();
        $key  = "locked:{$resourceId}";

        $meta['time'] = $now;
        $meta['_updated'] = $now;

        $this->app->dataStorage->setKey('app/options', $key, $meta);

        return true;
    }

    /**
     * Unlock a resource for editing.
     *
     * @param string $resourceId The resource ID.
     * @return bool True if the resource was unlocked, false otherwise.
     */
    public function unlockResourceId($resourceId) {

        $meta = $this->isResourceLocked($resourceId);

        $key = "locked:{$resourceId}";
        $this->app->dataStorage->removeKey('app/options', $key);

        if ($meta) {

            $user = $this->app->helper('auth')->getUser();

            // $this->app->helper('eventStream')->add('notify', [
            //     'message' => \_t("Resource \"%s\" unlocked by %s", [$resourceId, $user['name']]),
            //     'user' => $user ? ['_id' => $user['_id'], 'name' => $user['name'], 'user' => $user['user'], 'email' => $user['email']] : null,
            // ], [
            //     'sessionId' => $meta['sid']
            // ]);
        }

        return true;
    }

}
