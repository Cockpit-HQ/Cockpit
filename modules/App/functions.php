<?php

// Register global functions

function _t($key, $alternative=null, $lang=null) {
    static $i18n;
    if (!$i18n) $i18n = APP::instance()->helper('i18n');
    return $i18n->get($key, $alternative, $lang);
}

function _allowed($permission, $role=null) {
    static $acl;
    if (!$acl) $acl = APP::instance()->helper('acl');
    return $acl->isAllowed($permission, $role);
}