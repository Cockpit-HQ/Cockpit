<?php

    $this->trigger('app.layout.init');

    $sidePanelContents = $this->block('app-side-panel', ['print' => false]);

?><!DOCTYPE html>
<html lang="en" class="<?=$this->helper('theme')->pageClass()?>" data-base="<?=rtrim($this->baseUrl('/'), '/')?>" data-route="<?=rtrim($this->routeUrl('/'), '/')?>" data-version="<?=$this->retrieve('app.version')?>" data-theme="<?=$this->helper('theme')->theme()?>">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="noindex,nofollow">
    <title><?=$this->helper('theme')->title()?></title>

    <link rel="icon" href="<?=$this->helper('theme')->favicon()?>">

    <?=$this->helper('theme')->assets([['src' => 'app:assets/js/admin.js', 'type' => 'module']], 'app')?>

    <script src="<?=$this->route('/app.i18n.data.js')?>" type="module"></script>

    <?php $this->trigger('app.layout.header') ?>
    <?php $this->block('app.layout.header') ?>

    <?php if ($this->helper('theme')->theme() == 'auto'): ?>
    <script>
        // set client preferred color scheme
        document.documentElement.setAttribute('data-theme', getComputedStyle(document.documentElement).getPropertyValue('--app-auto-theme').trim());
    </script>
    <?php endif ?>

</head>
<body class="<?=($sidePanelContents ? 'has-side-panel' : '')?>">

    <div class="app-container">
        <aside class="app-container-aside">

            <div class="app-container-aside-menu">

                <div class="kiss-flex-1 kiss-overflow-y-auto">
                    <kiss-navlist>
                        <ul>
                            <li class="<?=($this->request->route == '/') ? 'active':''?>">
                                <a href="<?=$this->route('/')?>" aria-label="<?=t('Dashboard')?>" kiss-tooltip="right">
                                    <kiss-svg src="<?=$this->base('app:icon.svg')?>" width="25" height="25"><canvas width="25" height="25"></canvas></kiss-svg>
                                </a>
                            </li>
                            <?php foreach ($this->helper('menus')->menu('modules', true) as $group => $links): ?>

                                <li class="kiss-nav-divider"></li>

                                <?php foreach ($links as $link): ?>
                                    <li class="<?=(strpos($this->request->route, $link['route']) === 0) ? 'active':''?>">
                                        <a href="<?=$this->route($link['route'])?>" aria-label="<?=t($link['label'])?>" kiss-tooltip="right">
                                            <kiss-svg src="<?=$this->base($link['icon'])?>" width="25" height="25"><canvas width="25" height="25"></canvas></kiss-svg>
                                        </a>
                                    </li>
                                <?php endforeach ?>

                            <?php endforeach ?>
                            <li class="kiss-nav-divider"></li>
                            <li>
                                <a class="kiss-flex kiss-flex-center" aria-label="<?=t('Search')?>" kiss-tooltip="right" app-search>
                                    <kiss-svg src="<?=$this->base('system:assets/icons/search.svg')?>" width="25"><canvas width="25" height="25"></canvas></kiss-svg>
                                </a>
                            </li>
                        </ul>
                    </kiss-navlist>
                </div>

                <kiss-navlist space="small">
                    <ul>
                        <li>
                            <a class="kiss-flex kiss-flex-center" href="<?=$this->route('/system/users/user')?>" aria-label="<?=t('Account')?>" kiss-tooltip="right">
                                <icon>account_circle</icon>
                            </a>
                        </li>
                        <li>
                            <a class="kiss-flex kiss-flex-center" href="<?=$this->route('/system')?>" aria-label="<?=t('Settings')?>" kiss-tooltip="right">
                                <icon>tune</icon>
                            </a>
                        </li>
                        <?php if ($this->helper('acl')->isAllowed('app.users.manage')): ?>
                        <li>
                            <a class="kiss-flex kiss-flex-center" href="<?=$this->route('/system/users')?>" aria-label="<?=t('Users')?>" kiss-tooltip="right">
                                <icon>supervisor_account</icon>
                            </a></li>
                        <?php endif ?>
                    </ul>
                </kiss-navlist>

            </div>

            <?php if ($sidePanelContents): ?>
            <div class="app-container-aside-panel">
                <?=$sidePanelContents?>
            </div>
            <?php endif ?>

        </aside>
        <main class="kiss-flex-1">

            <app-header>
                <kiss-container class="kiss-flex kiss-flex-middle">
                    <a class="kiss-display-block kiss-margin-small-right kiss-visible@m" href="<?=$this->route('/')?>">
                        <img class="app-logo kiss-margin-auto" src="<?=$this->helper('theme')->logo()?>" alt="Logo" style="height:30px;width:auto;">
                    </a>
                    <div>
                        <a href="<?=$this->route('/')?>" class="kiss-link-muted kiss-flex kiss-flex-middle">
                            <span class="kiss-text-bold"><?=$this['app.name']?></span>
                        </a>
                    </div>
                    <a class="kiss-link-muted kiss-margin-small-left kiss-hidden@m" href="#app-offcanvas" kiss-offcanvas>
                        <icon>more_horiz</icon>
                    </a>
                    <?php if ($this->retrieve('app_space')): ?>
                    <div class="kiss-margin-small-left"><span class="kiss-badge kiss-color-primary kiss-badge-outline kiss-text-upper"><?=str_replace(['-', '_'], ' ', $this->retrieve('app_space'))?></span></div>
                    <?php endif ?>
                    <div class="kiss-flex-1 kiss-margin-left">

                    </div>

                    <app-license></app-license>

                    <div class="kiss-margin-left">
                        <a kiss-popout="#app-account-menu">
                            <app-avatar size="30" name="<?=$this['user/name']?>"></app-avatar>
                        </a>
                    </div>
                </kiss-container>
            </app-header>

            <?=$content_for_layout?>
        </main>
    </div>

    <kiss-popout id="app-account-menu">
        <kiss-content>

            <kiss-navlist>
                <ul>
                    <li class="kiss-nav-header"><?=t('System')?></li>
                    <li><a class="kiss-flex kiss-flex-middle" href="<?=$this->route('/system/users/user')?>"><icon class="kiss-margin-small-right">account_circle</icon> <?=t('Account')?></a></li>
                    <li class="kiss-nav-divider"></li>
                    <li><a class="kiss-flex kiss-flex-middle kiss-color-danger" href="<?=$this->route('/auth/logout')?>"><icon class="kiss-margin-small-right">power_settings_new</icon> <?=t('Logout')?></a></li>
                </ul>
            </kiss-navlist>
        </kiss-content>
    </kiss-popout>

    <kiss-offcanvas id="app-offcanvas">
        <kiss-content class="kiss-flex kiss-flex-column">
            <div class="kiss-padding kiss-flex kiss-bgcolor-contrast kiss-flex kiss-flex-middle">
                <div><app-avatar size="30" name="<?=$this['user/name']?>"></app-avatar></div>
                <div class="kiss-margin-small-left kiss-flex-1 kiss-size-xsmall">
                    <div class="kiss-text-bold kiss-text-truncate"><?=$this->escape($this['user/name'])?></div>
                    <div class="kiss-color-muted kiss-text-truncate"><?=$this->escape($this['user/email'])?></div>
                </div>
            </div>
            <?php $this->trigger('app.layout.offcanvas.header') ?>
            <div class="kiss-flex-1 app-offcanvas-content">
                <?php if ($sidePanelContents): ?>
                <div class="kiss-padding">
                    <?=$sidePanelContents?>
                </div>
                <?php endif ?>
                <div class="kiss-padding">
                    <kiss-navlist>
                        <ul>
                            <li class="<?=($this->request->route == '/') ? 'active':''?>">
                                <a href="<?=$this->route('/')?>">
                                    <kiss-svg class="kiss-margin-small-right" src="<?=$this->base('app:icon.svg')?>" width="25" height="25"></kiss-svg>
                                    <?=t('Dashboard')?>
                                </a>
                            </li>
                            <?php foreach ($this->helper('menus')->menu('modules', true) as $group => $links): ?>

                                <li class="kiss-nav-divider"></li>

                                <?php if ($group && count($links) > 1): ?>
                                <li class="kiss-nav-header"><?=t($group)?></li>
                                <?php else: ?>

                                <?php endif ?>

                                <?php foreach ($links as $link): ?>
                                    <li class="<?=(strpos($this->request->route, $link['route']) === 0) ? 'active':''?>">
                                        <a href="<?=$this->route($link['route'])?>">
                                            <kiss-svg class="kiss-margin-small-right" src="<?=$this->base($link['icon'])?>" width="25" height="25"></kiss-svg>
                                            <?=t($link['label'])?>
                                        </a>
                                    </li>
                                <?php endforeach ?>

                            <?php endforeach ?>
                        </ul>
                    </kiss-navlist>
                </div>

                <?php $this->trigger('app.layout.offcanvas.content') ?>
            </div>
            <div class="kiss-padding">
                <kiss-navlist space="small">
                    <ul>
                        <li class="kiss-nav-header kiss-flex kiss-flex-middle"><?=t('System')?></li>
                        <li>
                            <a class="kiss-flex kiss-flex-middle" href="<?=$this->route('/system/users/user')?>">
                                <icon class="kiss-margin-small-right">account_circle</icon> <?=t('Account')?>
                            </a>
                        </li>
                        <li>
                            <a class="kiss-flex kiss-flex-middle" href="<?=$this->route('/system')?>">
                                <icon class="kiss-margin-small-right">tune</icon> <?=t('Settings')?>
                            </a>
                        </li>
                        <?php if ($this->helper('acl')->isAllowed('app.users.manage')): ?>
                        <li>
                            <a class="kiss-flex kiss-flex-middle" href="<?=$this->route('/system/users')?>">
                                <icon class="kiss-margin-small-right">supervisor_account</icon> <?=t('Users')?>
                            </a></li>
                        <?php endif ?>
                    </ul>
                </kiss-navlist>
            </div>
            <?php $this->trigger('app.layout.offcanvas.footer') ?>
        </kiss-content>
    </kiss-offcanvas>

    <?php $this->trigger('app.layout.footer') ?>

    <script type="module">

        <?php

            $paths = [
                '#config' => $this->baseUrl("#config:"),
                '#uploads' => $this->fileStorage->getURL('uploads://'),
            ];

            foreach ($this['modules'] as $name => $module) {
                $paths[$name] = $this->baseUrl("{$name}:");
            }

            $locales = [];

            foreach ($this->helper('locales')->locales(true) as $i18n => $loc) {
                $locales[$i18n] = $loc['name'] ? $loc['name']  : $i18n;
            }

        ?>

        Object.assign(App, {
            _paths   : Object.freeze(<?=json_encode($paths)?>),
            _locales : <?=json_encode($locales)?>,
            _vars    : Object.freeze(<?=json_encode($this->helper('theme')->vars())?>),
            user     : Object.freeze(<?=json_encode($this->retrieve('user'))?>),
        });

    </script>

    <?php $this->trigger('app.layout.footer') ?>
    <?php $this->block('app.layout.footer') ?>

</body>
</html>
