<?php
namespace Aws\Sts\RegionalEndpoints;

use Aws\AbstractConfigurationProvider;
use Aws\CacheInterface;
use Aws\ConfigurationProviderInterface;
use Aws\Sts\RegionalEndpoints\Exception\ConfigurationException;
use GuzzleHttp\Promise;
use GuzzleHttp\Promise\PromiseInterface;

/**
 * A configuration provider is a function that returns a promise that is
 * fulfilled with a {@see \Aws\Sts\RegionalEndpoints\ConfigurationInterface}
 * or rejected with an {@see \Aws\Sts\RegionalEndpoints\Exception\ConfigurationException}.
 *
 * <code>
 * use Aws\Sts\RegionalEndpoints\ConfigurationProvider;
 * $provider = ConfigurationProvider::defaultProvider();
 * // Returns a ConfigurationInterface or throws.
 * $config = $provider()->wait();
 * </code>
 *
 * Configuration providers can be composed to create configuration using
 * conditional logic that can create different configurations in different
 * environments. You can compose multiple providers into a single provider using
 * {@see \Aws\Sts\RegionalEndpoints\ConfigurationProvider::chain}. This function
 * accepts providers as variadic arguments and returns a new function that will
 * invoke each provider until a successful configuration is returned.
 *
 * <code>
 * // First try an INI file at this location.
 * $a = ConfigurationProvider::ini(null, '/path/to/file.ini');
 * // Then try an INI file at this location.
 * $b = ConfigurationProvider::ini(null, '/path/to/other-file.ini');
 * // Then try loading from environment variables.
 * $c = ConfigurationProvider::env();
 * // Combine the three providers together.
 * $composed = ConfigurationProvider::chain($a, $b, $c);
 * // Returns a promise that is fulfilled with a configuration or throws.
 * $promise = $composed();
 * // Wait on the configuration to resolve.
 * $config = $promise->wait();
 * </code>
 */
class ConfigurationProvider extends AbstractConfigurationProvider
    implements ConfigurationProviderInterface
{
    const DEFAULT_ENDPOINTS_TYPE = 'regional';
    const ENV_ENDPOINTS_TYPE = 'AWS_STS_REGIONAL_ENDPOINTS';
    const ENV_PROFILE = 'AWS_PROFILE';
    const INI_ENDPOINTS_TYPE = 'sts_regional_endpoints';

    public static $cacheKey = 'aws_sts_regional_endpoints_config';

    protected static $interfaceClass = ConfigurationInterface::class;
    protected static $exceptionClass = ConfigurationException::class;

    /**
     * Create a default config provider that first checks for environment
     * variables, then checks for a specified profile in the environment-defined
     * config file location (env variable is 'AWS_CONFIG_FILE', file location
     * defaults to ~/.aws/config), then checks for the "default" profile in the
     * environment-defined config file location, and failing those uses a default
     * fallback set of configuration options.
     *
     * This provider is automatically wrapped in a memoize function that caches
     * previously provided config options.
     *
     * @param array $config
     *
     * @return callable
     */
    public static function defaultProvider(array $config = [])
    {
        $configProviders = [self::env()];
        if (
            !isset($config['use_aws_shared_config_files'])
            || $config['use_aws_shared_config_files'] != false
        ) {
            $configProviders[] = self::ini();
        }
        $configProviders[] = self::fallback();

        $memo = self::memoize(
            call_user_func_array([ConfigurationProvider::class, 'chain'], $configProviders)
        );

        if (isset($config['sts_regional_endpoints'])
            && $config['sts_regional_endpoints'] instanceof CacheInterface
        ) {
            return self::cache($memo, $config['sts_regional_endpoints'], self::$cacheKey);
        }

        return $memo;
    }

    /**
     * Provider that creates config from environment variables.
     *
     * @return callable
     */
    public static function env()
    {
        return function () {
            // Use config from environment variables, if available
            $endpointsType = getenv(self::ENV_ENDPOINTS_TYPE);
            if (!empty($endpointsType)) {
                return Promise\Create::promiseFor(
                    new Configuration($endpointsType)
                );
            }

            return self::reject('Could not find environment variable config'
                . ' in ' . self::ENV_ENDPOINTS_TYPE);
        };
    }

    /**
     * Fallback config options when other sources are not set.
     *
     * @return callable
     */
    public static function fallback()
    {
        return function () {
            return Promise\Create::promiseFor(
                new Configuration(self::DEFAULT_ENDPOINTS_TYPE, true)
            );
        };
    }

    /**
     * Config provider that creates config using a config file whose location
     * is specified by an environment variable 'AWS_CONFIG_FILE', defaulting to
     * ~/.aws/config if not specified
     *
     * @param string|null $profile  Profile to use. If not specified will use
     *                              the "default" profile.
     * @param string|null $filename If provided, uses a custom filename rather
     *                              than looking in the default directory.
     *
     * @return callable
     */
    public static function ini(
        $profile = null,
        $filename = null
    ) {
        $filename = $filename ?: (self::getDefaultConfigFilename());
        $profile = $profile ?: (getenv(self::ENV_PROFILE) ?: 'default');

        return function () use ($profile, $filename) {
            if (!@is_readable($filename)) {
                return self::reject("Cannot read configuration from $filename");
            }
            $data = \Aws\parse_ini_file($filename, true);
            if ($data === false) {
                return self::reject("Invalid config file: $filename");
            }
            if (!isset($data[$profile])) {
                return self::reject("'$profile' not found in config file");
            }
            if (!isset($data[$profile][self::INI_ENDPOINTS_TYPE])) {
                return self::reject("Required STS regional endpoints config values
                    not present in INI profile '{$profile}' ({$filename})");
            }

            return Promise\Create::promiseFor(
                new Configuration($data[$profile][self::INI_ENDPOINTS_TYPE])
            );
        };
    }

    /**
     * Unwraps a configuration object in whatever valid form it is in,
     * always returning a ConfigurationInterface object.
     *
     * @param  mixed $config
     * @return ConfigurationInterface
     * @throws \InvalidArgumentException
     */
    public static function unwrap($config)
    {
        if (is_callable($config)) {
            $config = $config();
        }
        if ($config instanceof PromiseInterface) {
            $config = $config->wait();
        }
        if ($config instanceof ConfigurationInterface) {
            return $config;
        }
        if (is_string($config)) {
            return new Configuration($config);
        }
        if (is_array($config) && isset($config['endpoints_type'])) {
            return new Configuration($config['endpoints_type']);
        }

        throw new \InvalidArgumentException('Not a valid STS regional endpoints '
            . 'configuration argument.');
    }
}
