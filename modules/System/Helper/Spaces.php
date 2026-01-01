<?php

namespace System\Helper;

use ArrayObject, DirectoryIterator;

class Spaces extends \Lime\Helper {

    protected array $instances = [];
    protected bool $isMaster;
    protected $master = null;

    protected function initialize() {
        $this->isMaster = $this->app->path('#app:') === $this->app->path('#root:');
    }

    /**
     * Check if the current space is the master space.
     *
     * @return boolean
     */
    public function isMaster() {
        return $this->isMaster;
    }

    /* * Check if the current space is a regular space (not the master).
     *
     * @return boolean
     */
    public function isSpace() {
        return !$this->isMaster;
    }

    /**
     * Get a list of all spaces.
     *
     * @return array
     */
    public function spaces() {

        $folder = APP_SPACES_DIR;
        $spaces = [];

        if ($folder && \file_exists($folder)) {

            $dir = new DirectoryIterator($folder);
            $rootUrl = \rtrim($this->app->routeUrl('/'), '/');

            foreach ($dir as $f) {

                if (!$f->isDir() || $f->isDot()) continue;

                $name = $f->getFilename();
                $group = null;

                if (\file_exists($folder."/{$name}/config/config.php")) {
                    $cfg = include($folder."/{$name}/config/config.php");
                    $group = $cfg['@space']['group'] ?? null;
                }

                $spaces[] = [
                    'name' => $name,
                    'url' => "{$rootUrl}/:{$name}",
                    'group' => $group
                ];
            }
        }

        return $spaces;
    }

    /**
     * Get the master space instance.
     *
     * @return \Lime\App|null
     */
    public function master() {

        if ($this->isMaster) {
            return $this->app;
        }

        if (!$this->master) {
            $this->master = \Cockpit::instance();
        }

        return $this->master;
    }

    /**
     * Get a specific space instance by name.
     *
     * @param string $name The name of the space.
     * @return \Lime\App|null Returns the space instance or null if it does not exist.
     */
    public function space(string $name) {

        if (isset($this->instances[$name])) {
            return $this->instances[$name];
        }

        $dir = APP_SPACES_DIR."/{$name}";

        if (!\file_exists($dir)) {
            return null;
        }

        $this->instances[$name] = \Cockpit::instance($dir, [
            'app_space' => $name,
        ]);

        return $this->instances[$name];
    }

    /**
     * Get the site URL for a specific space.
     *
     * @param string|null $name The name of the space.
     * @return string The site URL for the space.
     */
    public function getSiteUrl(?string $name = null) {

        if ($name) {
            return $this->app->getSiteUrl(true) . "/:{$name}";
        }

        if (!$this->isMaster) {
            $space = \basename(\trim($this->app->path('#root:'), '/'));
            return $this->app->getSiteUrl(true) . "/:{$space}";
        }

        return $this->app->getSiteUrl(true);
    }

    /**
     * Create a new space.
     *
     * @param string $name The name of the space.
     * @param array $options The options for the space.
     * @return array|false Returns the created space information or false on failure.
     */
    public function create(string $name, array $options = []) {

        $options = \array_merge([
            'group' => null,
            'user' => 'admin',
            'password' => 'admin',
            'email' => 'admin@admin.com',
            'datastorage' => [
                'type' => 'mongolite',
                'server' => '',
                'database' => ''
            ]
        ], $options);

        $fs = $this->app->helper('fs');
        $name = $this->app->helper('utils')->sluggify(\trim($name));
        $path = APP_SPACES_DIR."/{$name}";

        // Space
        $spaceConfig = new ArrayObject([
            '@space' => [
                'group' => $options['group'],
            ]
        ]);

        if (\file_exists($path)) {
            return false;
        }

        if ($options['datastorage']['type'] == 'mongodb') {

            if (
                !isset($options['datastorage']['server']) ||
                !isset($options['datastorage']['database']) ||
                !$options['datastorage']['server'] ||
                !$options['datastorage']['database']
            ) {
                return false;
            }

            $spaceConfig['database'] = [
                'server' => $options['datastorage']['server'],
                'options' => ['db' => $options['datastorage']['database']],
                'driverOptions' => []
            ];
        }

        // create env folders
        $fs->mkdir("{$path}/config");
        $fs->mkdir("{$path}/storage/cache");
        $fs->mkdir("{$path}/storage/data");
        $fs->mkdir("{$path}/storage/tmp");
        $fs->mkdir("{$path}/storage/uploads");

        $this->app->trigger('spaces.config.create', [$spaceConfig]);

        $export = $this->app->helper('utils')->var_export($spaceConfig->getArrayCopy(), true);

        // space config file
        $fs->write("{$path}/config/config.php", "<?php\n\nreturn {$export};");

        $created = \time();
        $instance = \Cockpit::instance($path);

        $user = [
            'active' => true,
            'user' => $options['user'],
            'name' => 'Admin',
            'email' => $options['email'],
            'password' => $instance->hash($options['password']),
            'i18n' => 'en',
            'role' => 'admin',
            'theme' => 'auto',
            '_modified' => $created,
            '_created' => $created
        ];

        $instance->dataStorage->save('system/users', $user);
        $instance->trigger('app.system.install');

        $this->app->trigger('spaces.spaces.created', [$name, $spaceConfig]);

        return [
            'name' => $name,
            'url' => rtrim($this->app->routeUrl('/'), '/')."/:{$name}"
        ];
    }

    /**
     * Remove a space.
     *
     * @param string $name The name of the space.
     * @return boolean Returns true on success, false on failure.
     */
    public function remove(string $name) {

            $path = APP_SPACES_DIR."/{$name}";

            if (!file_exists($path)) {
                return false;
            }

            $folder = $this->app->path($path);

            if ($folder) {

                $this->app->trigger('spaces.remove', [$name]);
                $this->app->helper('fs')->delete($folder);

                return true;
            }

            return false;
    }
}
