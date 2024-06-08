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

    public function write(string $key, mixed $value): void {
        $this->session[$key] = $value;
    }

    public function read(string $key, mixed $default = null) {
        return fetch_from_array($this->session, $key, $default);
    }

    public function delete(string $key): void {
        unset($this->session[$key]);
    }

    public function destroy(): void {
        session_destroy();
    }

    public function close(): void {
        session_write_close();
    }

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
