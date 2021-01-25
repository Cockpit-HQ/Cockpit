<!DOCTYPE html>
<html lang="en" data-base="<?=$this->base('/')?>" data-route="<?=$this->route('/')?>" data-version="<?=APP_VERSION?>">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?=$this['app.name']?></title>

    <link rel="icon" type="image/png"  href="<?=$this->base('/favicon.png')?>">
    <?=$this->assets([
        'app:assets/css/app.css',
        'app:assets/vendor/JSON5.js',
        'app:assets/vendor/noty/noty.min.js',
        ['src' => 'app:assets/js/app.js', 'type' => 'module']
    ], APP_VERSION)?>

    <?php $this->block('app.layout.header') ?>

</head>
<body>

    <app-header>
        <kiss-container class="kiss-flex kiss-flex-middle">
            <div>
                <a class="kiss-display-inline-block" href="<?=$this->route('/')?>"><img class="app-logo" src="<?=$this->base('/logo.svg')?>" width="30" alt="Logo"></a>
            </div>
            <div class="kiss-margin-left">
                <a href="#app-offcanvas" class="kiss-link-muted kiss-flex kiss-flex-middle" kiss-offcanvas>
                    <strong><?=$this['app.name']?></strong>
                    <icon class="kiss-margin-small-left">menu</icon>
                </a>
            </div>
            <div class="kiss-flex-1 kiss-margin-left">

            </div>
            <div class="kiss-margin-left">
                <kiss-dropdown>
                    <a>
                        <app-avatar size="30" name="<?=$this['user/name']?>"></app-avatar>
                    </a>
                    <kiss-dropdownbox>
                        <nav-list>
                            <ul>
                                <li class="kiss-nav-header"><?=t('System')?></li>
                                <li><a class="kiss-flex kiss-flex-middle" href="<?=$this->route('/users/user')?>"><icon class="kiss-margin-small-right">account_circle</icon> <?=t('Account')?></a></li>
                                <li class="kiss-nav-divider"></li>
                                <li><a class="kiss-flex kiss-flex-middle kiss-color-danger" href="<?=$this->route('/auth/logout')?>"><icon class="kiss-margin-small-right">power_settings_new</icon> <?=t('Logout')?></a></li>
                            </ul>
                        </nav-list>
                    </kiss-dropdownbox>
                </kiss-dropdown>
            </div>
        </kiss-container>
    </app-header>

    <?=$content_for_layout?>

    <kiss-offcanvas id="app-offcanvas">
        <kiss-content class="kiss-flex kiss-flex-column">
            <div class="kiss-padding kiss-flex">
                <div><app-avatar size="40" name="<?=$this['user/name']?>"></app-avatar></div>
                <div class="kiss-margin-left kiss-flex-1 kiss-size-small">
                    <div class="kiss-text-bold kiss-text-truncate"><?=$this->escape($this['user/name'])?></div>
                    <div class="kiss-color-muted kiss-text-truncate"><?=$this->escape($this['user/email'])?></div>
                </div>

            </div>
            <div><hr></div>
            <?php $this->trigger('app.layout.offcanvas.header') ?>
            <div class="kiss-flex-1 app-offcanvas-content">
                <div class="kiss-padding">
                    <nav-list>
                        <ul>
                            <li class="<?=($this->request->route == '/') ? 'active':''?>"><a href="<?=$this->route('/')?>"><?=t('Dashboard')?></a></li>
                            <li class="kiss-nav-spacer"></li>
                            <?php foreach ($this->helper('menus')->menu('modules') as $link): ?>
                                <li class="<?=(strpos($this->request->route, $link['route']) === 0) ? 'active':''?>">
                                    <a href="<?=$this->route($link['route'])?>">
                                        <kiss-svg src="<?=$this->base($link['icon'])?>" width="20" height="20"></kiss-svg>
                                        <?=t($link['label'])?>
                                    </a>
                                </li>
                            <?php endforeach ?>
                        </ul>
                    </nav-list>
                </div>

                <?php $this->trigger('app.layout.offcanvas.content') ?>
            </div>
            <div class="kiss-padding kiss-bgcolor-contrast">
                <nav-list>
                    <ul>
                        <li class="kiss-nav-header kiss-flex kiss-flex-middle"><?=t('System')?></li>
                        <li class="<?=(strpos($this->request->route, '/settings') === 0) ? 'active':''?>">
                            <a class="kiss-flex kiss-flex-middle" href="<?=$this->route('/settings')?>">
                                <icon>settings</icon> <?=t('Settings')?>
                            </a>
                        </li>
                        <?php if (_allowed('app.users.manage')): ?>
                        <li class="<?=(strpos($this->request->route, '/users') === 0) ? 'active':''?>">
                            <a class="kiss-flex kiss-flex-middle" href="<?=$this->route('/users')?>">
                                <icon>supervisor_account</icon> <?=t('Users')?>
                            </a></li>
                        <?php endif ?>
                    </ul>
                </nav-list>
            </div>
            <?php $this->trigger('app.layout.offcanvas.footer') ?>
        </kiss-content>
    </kiss-offcanvas>


    <?php $this->trigger('app.layout.footer') ?>

    <script type="module">

        let paths = {};

        <?php foreach($this['modules'] as $name => $module): ?>
            paths['<?=$name?>'] = '<?=$this->base("{$name}:")?>';
        <?php endforeach ?>

        App._paths = paths;
    </script>

    <?php $this->block('app.layout.footer') ?>

</body>
</html>