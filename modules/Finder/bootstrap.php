<?php

// load admin related code
$this->on('app.admin.init', function() {

    // load only on master instance + only for super admins
    if (!$this->helper('acl')->isSuperAdmin() || !$this->helper('spaces')->isMaster()) {
        return;
    }

    include(__DIR__.'/admin.php');

}, -1000);
