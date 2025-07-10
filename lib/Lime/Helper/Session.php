<?php

namespace Lime\Helper;

use Lime\Request;
use function \Lime\fetch_from_array;

class Session extends \Lime\Helper {

    protected bool $initialized = false;
    public string $name;
    protected array $session;

    public function init(?string $name = null): void {

        if ($this->initialized) return;

        if (session_status() != PHP_SESSION_ACTIVE) {

            $this->name = $name ?: $this->app->retrieve('session.name');

            session_name($this->name);
            session_start();
        } else {
            $this->name = session_name();
        }

        $this->initialized = true;
        $this->session = &$_SESSION;
    }

    /**
     * Retrieves the session data.
     *
     * @return array The session data.
     */
    public function getSession(): array {
        return $this->session;
    }

    /**
     * Writes a value to the session data using the given key.
     *
     * @param string $key The key to associate with the value in the session.
     * @param mixed $value The value to store in the session.
     * @return void
     */
    public function write(string $key, mixed $value): void {
        $this->session[$key] = $value;
    }

    /**
     * Reads a value from the session array using the specified key. If the key does not exist, a default value can be returned.
     *
     * @param string $key The key to retrieve the value from the session array.
     * @param mixed $default The default value to return if the key does not exist in the session array.
     * @return mixed The value associated with the specified key, or the default value if the key does not exist.
     */
    public function read(string $key, mixed $default = null) {
        return fetch_from_array($this->session, $key, $default);
    }

    /**
     * Deletes a value from the session array using the specified key.
     *
     * @param string $key The key of the value to be removed from the session array.
     * @return void
     */
    public function delete(string $key): void {
        unset($this->session[$key]);
    }

    /**
     * Destroys the current session and removes all session data.
     *
     * @return void
     */
    public function destroy(): void {
        session_destroy();
    }

    /**
     * Closes the current session and writes session data if necessary.
     *
     * @return void
     */
    public function close(): void {
        session_write_close();
    }

    /**
     * Regenerates the session ID and optionally deletes the old session data.
     *
     * @param bool $delete_old_session Whether to delete the old session data. Defaults to false.
     * @return bool Returns true on success or false on failure.
     */
    public function regenerateId(bool $delete_old_session = false): bool {

        if (session_status() != PHP_SESSION_ACTIVE) {
            return false;
        }

        if ($delete_old_session) {

            foreach ($this->session as $key => $value) {
                unset($this->session[$key]);
            }
        }

        return session_regenerate_id($delete_old_session);
    }
}
