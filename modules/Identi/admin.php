<?php

$this->bindClass('Identi\\Controller\\Identi', '/identi');

$this->on('app.login.dialog.footer', function() {

    if (!$this->module('identi')->isEnabled()) {
        return;
    }

    echo $this->render('identi:views/login-dialog-footer.php');
});


$this->on('app.user.logout.after', function($user, $params, $data) {

    if (($params['identi'] ?? false) === true) {
        return;
    }

    $idTokenHint = $data['identi_id_token'] ?? null;

    if ($idTokenHint) {
        try {
            $this->module('identi')->getOIDCClient()->signOut($idTokenHint, $this->getSiteUrl(true).'/auth/login');
        } catch (Exception $e) {}
    }
});
