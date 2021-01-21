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
                <a class="kiss-display-block" href="<?=$this->route('/')?>"><img class="app-logo kiss-margin-auto" src="<?=$this->base('/logo.svg')?>" width="30" alt="Logo"></a>
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
                                <li class="kiss-nav-header"><?=_t('System')?></li>
                                <li><a class="kiss-flex kiss-flex-middle" href="<?=$this->route('/users/user')?>"><icon class="kiss-margin-small-right">account_circle</icon> <?=_t('Account')?></a></li>
                                <li class="kiss-nav-divider"></li>
                                <li><a class="kiss-flex kiss-flex-middle kiss-color-danger" href="<?=$this->route('/auth/logout')?>"><icon class="kiss-margin-small-right">power_settings_new</icon> <?=_t('Logout')?></a></li>
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
            <div>Header</div>
            <div class="kiss-flex-1 app-offcanvas-content">
                <div class="kiss-padding">
                    <nav-list>
                        <ul>
                            <li><a href="<?=$this->route('/')?>"><?=_t('Dashboard')?></a></li>
                            <li class="kiss-nav-divider"></li>
                            <li class="kiss-nav-header"><?=_t('System')?></li>
                            <?php if (_allowed('app.users.manage')): ?>
                            <li><a class="kiss-flex kiss-flex-middle" href="<?=$this->route('/users')?>"><icon class="kiss-margin-small-right">people_alt</icon> <?=_t('Users')?></a></li>
                            <?php endif ?>
                            <li><a class="kiss-flex kiss-flex-middle" href="<?=$this->route('/settings')?>"><icon class="kiss-margin-small-right">settings</icon> <?=_t('Settings')?></a></li>
                        </ul>
                    </nav-list>
                </div>
            </div>
            <div>Footer</div>
        </kiss-content>
    </kiss-offcanvas>


    <?php $this->block('app.layout.footer') ?>

</body>
</html>