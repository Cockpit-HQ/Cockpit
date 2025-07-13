<?php

namespace Identi\Controller;

use App\Controller\Base;
use Jumbojett\OpenIDConnectClient;
use Jumbojett\OpenIDConnectClientException;
use Exception;

use function Lime\fetch_from_array;

function base64_decode_if_encoded($str) {

    if (preg_match('/[^a-zA-Z0-9\/\+=]/', $str)) {
        return $str; // Contains characters not part of Base64 alphabet or padding
    }

    // Check for misplaced padding characters (e.g., '=' in the middle of data).
    $length = strlen($str);
    $first_padding_char_pos = strpos($str, '=');

    if ($first_padding_char_pos !== false) {

        for ($i = $first_padding_char_pos + 1; $i < $length; $i++) {
            if ($str[$i] !== '=') {
                return $str; // Malformed padding (e.g., "YQ=B")
            }
        }

        if (($length - $first_padding_char_pos) > 2) {
            return $str; // More than two '=' characters
        }
    }

    $str_to_decode = $str;

    // Only add padding if no padding characters ('=') are currently present in the string.
    if ($first_padding_char_pos === false) {
        $remainder = $length % 4;
        if ($remainder === 2) {
            // Length mod 4 is 2, requires "==" padding
            $str_to_decode .= '==';
        } elseif ($remainder === 3) {
            // Length mod 4 is 3, requires "=" padding
            $str_to_decode .= '=';
        }
    }

    $decoded_data = base64_decode($str_to_decode, true);

    if ($decoded_data === false) {
        return $str;
    }

    return base64_encode($decoded_data) === $str_to_decode ? $decoded_data : $str;
}

class Identi extends Base {

    protected $layout = 'app:layouts/canvas.php';
    protected ?array $config = null;

    public function before() {

        if ($this->context['action'] !== 'logout' && $this->helper('auth')->getUser()) {
            $this->app->reroute('/');
        }

        $config = $this->module('identi')->config();

        if (!$this->module('identi')->isEnabled()) {

            $this->app->retrieve('debug')
                ? $this->stop($this->render('identi:views/error.php', ['error' => 'Missing configuration for Identi']), 412)
                : $this->stop(404);
        }

        $this->config = $config;
    }

    protected function getOIDCClient(): OpenIDConnectClient {
        return $this->app->module('identi')->getOIDCClient();
    }

    public function authenticate() {

        $oidc = $this->getOIDCClient();

        if ($this->config['pkce']) {
            $oidc->setCodeChallengeMethod(is_string($this->config['pkce']) ? $this->config['pkce'] : 'S256');
        }

        $oidc->setRedirectURL($this->app->getSiteUrl(true) . '/identi/callback');

        // Add scopes
        $scopes = explode(' ', trim($this->config['scopes']));
        $oidc->addScope($scopes);

        $this->app->helper('session')->write('identi_oidc_provider', $oidc);

        try {
            $oidc->authenticate();
        } catch (OpenIDConnectClientException $e) {
            return $this->render('identi:views/error.php', ['error' => 'Error during OIDC initialization or redirect: ' . $e->getMessage()]);
        }
    }

    public function logout() {

        if ($this->app->request->is('post')) {
            return $this->backchannelLogout();
        }

        $idTokenHint = $this->app->helper('session')->read('identi_id_token', null);

        $this->helper('auth')->logout(['identi' => true]);

        if ($idTokenHint) {
            try {
                $this->getOIDCClient()->signOut($idTokenHint, $this->app->getSiteUrl(true).'/auth/login');
            } catch (Exception $e) {
                return $this->render('identi:views/error.php', ['error' => 'Logout error: ' . $e->getMessage()]);
            }
        }

        $this->app->reroute('/auth/login?logout=1');
    }

    public function callback() {

        $oidc = $this->app->helper('session')->read('identi_oidc_provider', null);

        if (!$oidc) {
            return false;
        }

        try {

            $oidc->authenticate();

            $this->app->helper('session')->delete('identi_oidc_provider');

            $userInfo = json_decode(json_encode($oidc->requestUserInfo()), true);
            $data = [
                'role' => $this->config['default_role'] ?? null,
            ];

            $mappings = $this->config['mapping'];

            foreach (['user', 'email', 'role', 'name'] as $prop) {

                if (!isset($mappings[$prop])) {
                    continue;
                }

                $value = fetch_from_array($userInfo, $mappings[$prop], null);

                if (isset($value)) {
                    $data[$prop] = is_string($value) ? base64_decode_if_encoded($value) : $value;
                }
            }

            // user, email, role are required
            if (!isset($data['user'], $data['email'], $data['role'], $userInfo['sub'])) {
                return $this->render('identi:views/error.php', ['error' => 'Missing user information returned by the provider.']);
            }

            // use the first available role if an array is mapped
            if (is_array($data['role'])) {
                $data['role'] = $data['role'][0] ?? null;
            }

            $data['role'] = trim($data['role']);
            $data['user'] = trim($data['user']);

            // General data validation
            if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) return $this->render('identi:views/error.php', ['error' => 'Invalid email format provided by the provider.']);
            if (!$data['user']) return $this->render('identi:views/error.php', ['error' => 'Invalid username provided by the provider.']);
            if (!$data['role']) return $this->render('identi:views/error.php', ['error' => 'Invalid role provided by the provider.']);

            // Remove potentially dangerous characters from username
            if (preg_match('/[<>"\']/', $data['user']))  return $this->render('identi:views/error.php', ['error' => 'Username contains invalid characters.']);

            // Only allow alphanumeric characters, hyphens, and underscores in role
            if (!preg_match('/^[a-zA-Z0-9_-]+$/', $data['role'])) return $this->render('identi:views/error.php', ['error' => 'Role contains invalid characters.']);

            // Check if role is in allowed_roles list (if configured)
            if (is_array($this->config['allowed_roles']) && !in_array($data['role'], $this->config['allowed_roles'])) {
                return $this->render('identi:views/error.php', ['error' => 'Role not allowed by configuration.']);
            }

            // Validate and sanitize name if present
            if (isset($data['name'])) {

                $data['name'] = trim(preg_replace('/[<>"\']/', '', $data['name']));

                if (!$data['name']) {
                    $data['name'] = $data['user'];
                }
            }

            $roles = $this->helper('acl')->roles();
            $roleExists = false;

            foreach ($roles as $role) {
                if ($role['appid'] == $data['role']) {
                    $roleExists = true;
                    break;
                }
            }

            if (!$roleExists) {
                return $this->render('identi:views/error.php', ['error' => 'Role does not exist.']);
            }

            $data['_identi'] = $userInfo;
            $data['_modified'] = time();

            $user = $this->app->dataStorage->findOne('system/users', ['_identi.sub' => $userInfo['sub']]);

            if (!$user) {

                $data['active'] = true;
                $data['theme'] = 'auto';
                $data['i18n'] = $this->app->helper('i18n')->locale;

                $data['_meta'] = new \ArrayObject([]);
                $data['_created'] = $data['_modified'];
                $data['password'] = $this->app->hash(substr(strtr(base64_encode(random_bytes(32)), '+/', '-_'), 0, 32));

                if (!isset($data['name'])) {
                    $data['name'] = $data['user'];
                }

                $user = $data;

            } else {
                $user = array_merge($user, $data);
            }

            // Store session ID for back-channel logout support

            $idToken = $oidc->getIdToken();

            try {

                if ($idToken) {
                    $idTokenClaims = json_decode(base64_decode(str_replace(['-', '_'], ['+', '/'], explode('.', $idToken)[1])), true);
                    if (isset($idTokenClaims['sid'])) {
                        // Update user record with session ID for back-channel logout matching
                        $user['_identi']['sid'] = $idTokenClaims['sid'];
                    }
                }

            } catch (Exception $e) {
                // SID extraction fails
            }

            $this->app->dataStorage->save('system/users', $user);

            // remove secret settings from user session
            unset($user['twofa'], $user['password'], $user['_identi']['sid']);

            $this->app->trigger('app.user.disguise', [&$user]);
            $this->helper('auth')->setUser($user);
            $this->helper('session')->write('app.session.start', time());
            $this->app->trigger('app.user.login', [$user]);

            $this->app->helper('session')->write('identi_id_token', $idToken);
            $this->app->helper('session')->write('identi_access_token', $oidc->getAccessToken());

            $this->app->reroute('/');

        } catch (OpenIDConnectClientException $e) {
            $this->app->helper('session')->delete('identi_oidc_provider');
            return $this->render('identi:views/error.php', ['error' => 'Authentication failed: ' . $e->getMessage()]);
        } catch (Exception $e) {
            $this->app->helper('session')->delete('identi_oidc_provider');
            return $this->render('identi:views/error.php', ['error' => 'An unexpected error occurred: ' . $e->getMessage()]);
        }

    }

    /**
     * Back-channel logout endpoint
     * Handles OpenID Connect Back-Channel Logout (RFC 8471)
     */
    protected function backchannelLogout() {

        // Only accept POST requests
        if (!$this->app->request->is('post')) {
            return $this->stop('', 405); // Method Not Allowed
        }

        // Verify Content-Type header
        $contentType = $this->app->request->server['CONTENT_TYPE'] ?? ($this->app->request->headers['Content-Type'] ?? '');

        if (stripos($contentType, 'application/x-www-form-urlencoded') === false) {
            return $this->stop('', 400); // Bad Request
        }

        try {
            // Get the logout token from POST body
            $logoutToken = $this->app->request->request['logout_token'] ?? null;

            if (!$logoutToken) {
                return $this->stop('', 400); // Bad Request
            }

            // Validate the logout token
            $result = $this->module('identi')->validateLogoutToken($logoutToken);

            if (!$result['valid']) {
                return $this->stop('', 400); // Bad Request
            }

            // Terminate matching sessions
            $terminated = $this->module('identi')->terminateUserSessions($result['claims']);

            // Return 200 OK with empty body (RFC 8471 requirement)
            return $this->stop('', 200);

        } catch (Exception $e) {
            return $this->stop('Identi: Back-channel logout error: ' . $e->getMessage(), 400); // Bad Request
        }
    }
}
