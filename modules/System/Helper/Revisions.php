<?php

namespace System\Helper;

class Revisions extends \Lime\Helper {

    protected $storage;

    public function initialize(){
        $this->storage = $this->app->dataStorage;
    }

    /**
     * Count the number of revisions for a given ID.
     *
     * @param string $id The ID to count revisions for.
     * @return int The count of revisions.
     */
    public function count($id) {
        return $this->storage->count('system/revisions', ['_oid' => $id]);
    }

    /**
     * Get a list of revisions for a given ID.
     *
     * @param string $id The ID to get revisions for.
     * @param int $limit The maximum number of revisions to return.
     * @param int $skip The number of revisions to skip.
     * @return array The list of revisions.
     */
    public function getList(string $id, int $limit = 50, int $skip = 0) {

        $options = [
            'filter' => ['_oid' => $id],
            'sort'   => ['_created' => -1],
            'limit'  => $limit,
            'skip'   => $skip
        ];

        return $this->storage->find('system/revisions', $options)->toArray();
    }

    /**
     * Add a new revision.
     *
     * @param string $id The ID to add a revision for.
     * @param array $data The data to include in the revision.
     * @param array|null $meta Metadata for the revision.
     * @param string|null $by The user ID of the person making the change.
     * @param int|null $created The timestamp of when the change was made.
     * @param array|null $ref The reference data for the revision.
     * @return array|false Returns the created revision or false on failure.
     */
    public function add($id, $data, $meta = null, $by = null, $created = null, $ref = null) {

        if ($by === true) {

            $by = null;
            $user = $this->app->helper('auth')->getUser();

            if ($user) {
                $by = $user['_id'];
            }
        }

        $filtered = [];

        foreach($data as $key => $value) {

            if ($key[0] == '_') {
                continue;
            }

            $filtered[$key] = $value;
        }

        if (!count($filtered)) {
            return false;
        }

        if ($ref) {

            $isDifferent = false;

            foreach ($filtered as $key => $value) {

                if (json_encode($value) !== json_encode($ref[$key] ?? null)) {
                    $isDifferent = true;
                    break;
                }
            }

            if (!$isDifferent) {
                return false;
            }
        }

        $revision = [
            '_oid' => $id,
            'data' => $filtered,
            'meta' => $meta,
            '_by' => $by,
            '_created' => $created ?? time()
        ];

        $this->storage->insert('system/revisions', $revision);

        return $revision;
    }

    /**
     * Get a specific revision by its ID.
     *
     * @param string $id The ID of the revision to retrieve.
     * @return array|false Returns the revision data or false if not found.
     */
    public function get($id) {
        return $this->storage->findOne('system/revisions', ['_oid' => $id]);
    }

    /**
     * Get the latest revision for a given ID.
     *
     * @param string $id The ID to get the latest revision for.
     * @return array|false Returns the latest revision data or false if not found.
     */
    public function latest($id) {

        $options = [
            'filter' => ['_oid' => $id],
            'sort'   => ['_created' => -1],
            'limit'  => 1
        ];

        $revs = $this->storage->find('system/revisions', $options)->toArray();

        return $revs[0] ?? null;
    }

    /**
     * Remove a revision by its ID.
     *
     * @param string $rid The ID of the revision to remove.
     * @return boolean Returns true on success, false on failure.
     */
    public function remove($rid) {
        return $this->storage->remove('system/revisions', ['_id' => $rid]);
    }

    /**
     * Remove all revisions for a given ID.
     *
     * @param string $id The ID to remove all revisions for.
     * @return boolean Returns true on success, false on failure.
     */
    public function removeAll($id) {
        return $this->storage->remove('system/revisions', ['_oid' => $id]);
    }

}
