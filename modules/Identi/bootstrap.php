<?php

use function Lime\fetch_from_array;

// load admin related code
$this->on('app.admin.init', function() {
    include(__DIR__.'/admin.php');
});


$this->module('identi')->extend([

    'config' => function(?string $key = null, $default = null) {

        $config = array_replace_recursive([
            'provider_url' => null,
            'client_id' => null,
            'client_secret' => '',
            'issuer' => null,
            'pkce' => true,
            'scopes' => 'openid profile email',
            'mapping' => [
                'email' => 'email',
                'user' => null,
                'name' => 'name',
                'role' => null
            ],
            'allowed_roles' => null, // Array of role appids that are allowed, null = all roles allowed
            'default_role' => null   // Default role appid to assign if none provided or not allowed

        ], $this->app->retrieve('identi', []) ?? []);

        return $key ? fetch_from_array($config, $key, $default) : $config;
    },

    'isEnabled' => function() {

        $config = $this->config();

        return !(!$config || !isset($config['provider_url'], $config['client_id']));
    },

    'getOIDCClient' => function () {

        $config = $this->config();

        $oidc = new Jumbojett\OpenIDConnectClient(
            $config['provider_url'],
            $config['client_id'],
            $config['client_secret'],
            $config['issuer']
        );

        return $oidc;
    },

    /**
     * Validate logout token according to OpenID Connect Back-Channel Logout spec
     *
     * @param string $logoutToken The JWT logout token
     * @return array Array with 'valid' boolean and 'claims' or 'error'
     */
    'validateLogoutToken' => function(string $logoutToken) {

        try {
            $oidc = $this->getOIDCClient();

            // Verify the logout token
            $isValid = $oidc->verifyLogoutToken($logoutToken);

            if (!$isValid) {
                return ['valid' => false, 'error' => 'Token verification failed'];
            }

            // Get claims from the token
            $claims = $oidc->verifyLogoutTokenClaims($logoutToken);

            if (!$claims) {
                return ['valid' => false, 'error' => 'Invalid token claims'];
            }

            // Verify required claims according to RFC 8471
            if (!isset($claims['iss']) || !isset($claims['aud']) || !isset($claims['iat'])) {
                return ['valid' => false, 'error' => 'Missing required claims'];
            }

            // Verify the events claim contains the back-channel logout event
            $events = $claims['events'] ?? null;

            if (!$events || !isset($events['http://schemas.openid.net/event/backchannel-logout'])) {
                return ['valid' => false, 'error' => 'Invalid or missing events claim'];
            }

            // Verify either 'sub' or 'sid' is present (RFC 8471 requirement)
            if (!isset($claims['sub']) && !isset($claims['sid'])) {
                return ['valid' => false, 'error' => 'Missing sub or sid claim'];
            }

            // Verify 'nonce' claim is NOT present (RFC 8471 requirement)
            if (isset($claims['nonce'])) {
                return ['valid' => false, 'error' => 'Nonce claim must not be present in logout token'];
            }

            return ['valid' => true, 'claims' => $claims];

        } catch (Exception $e) {
            return ['valid' => false, 'error' => 'Token validation exception: ' . $e->getMessage()];
        }
    },

    /**
     * Terminate user sessions based on logout token claims
     *
     * @param array $claims The validated logout token claims
     * @return int Number of sessions terminated
     */
    'terminateUserSessions' => function(array $claims) {

        $terminatedSessions = 0;

        try {
            // Get subject and session ID from claims
            $sub = $claims['sub'] ?? null;
            $sid = $claims['sid'] ?? null;

            // Find users to logout based on the claims
            $usersToLogout = [];

            if ($sub) {
                // Find user by subject ID
                $user = $this->app->dataStorage->findOne('system/users', ['_identi.sub' => $sub]);
                if ($user) {
                    $usersToLogout[] = $user;
                }
            }

            if ($sid && !count($usersToLogout)) {
                // If no user found by subject, try to find by session ID
                // Note: This requires storing session IDs during login
                $user = $this->app->dataStorage->findOne('system/users', ['_identi.sid' => $sid]);

                if ($user) {
                    $usersToLogout[] = $user;
                }
            }

            // Collect user IDs for batch event notification
            $userIds = [];

            // Terminate sessions for found users
            foreach ($usersToLogout as $user) {

                $data = [
                    '_id' => $user['_id'],
                    '_identi' => array_merge($user['_identi'] ?? [], [
                        'logged_out_at' => time(),
                        'logout_token_sub' => $sub,
                        'logout_token_sid' => $sid
                    ])
                ];

                // Clear any stored OIDC tokens
                $this->app->dataStorage->save('system/users', $data);

                $userIds[] = $user['_id'];
                $terminatedSessions++;
            }

            // Queue single logout event for all affected users
            if (count($userIds)) {
                $this->app->helper('eventStream')->add('logout', [
                    'message' => 'You have been logged out from another application.'
                ], [
                    'to' => $userIds
                ]);
            }

        } catch (Exception $e) {

        }

        return $terminatedSessions;
    },

]);
