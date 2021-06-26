<?php

// Register global functions
function t(string $key, ?string $alternative = null, ?string $lang = null): ?string {
    static $i18n;
    if (!$i18n) $i18n = APP::instance()->helper('i18n');
    return $i18n->get($key, $alternative, $lang);
}

function _t(string $key, array $params = [], ?string $alternative = null, ?string $lang = null) {
    static $i18n;
    if (!$i18n) $i18n = APP::instance()->helper('i18n');

    return $i18n->getstr($key, $params, $alternative, $lang);
}

function _allowed(string $permission, ?string $role = null): bool {
    static $acl;
    if (!$acl) $acl = APP::instance()->helper('acl');
    return $acl->isAllowed($permission, $role);
}