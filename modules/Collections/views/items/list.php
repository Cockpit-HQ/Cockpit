
<kiss-container class="kiss-margin">

    <ul class="kiss-breadcrumb">
        <li><a href="<?=$this->route('/collections')?>"><?=t('Collections')?></a></li>
    </ul>

    <div class="kiss-flex kiss-flex-middle">
        <div class="kiss-margin-right">
            <kiss-svg class="kiss-margin-auto" src="<?=$this->base('collections:icon.svg')?>" width="35" height="35" style="color:<?=($this->escape($collection['color'] ?? 'inherit'))?>"><canvas width="35" height="35"></canvas></kiss-svg>
        </div>
        <div class="kiss-margin-small-right">
            <div class="kiss-size-large kiss-text-bold"><?=$this->escape($collection['label'] ? $collection['label'] : $collection['name'])?></div>
        </div>
        <div>
            <a class="kiss-size-large" kiss-popoutmenu="#collection-menu-actions"><icon>more_horiz</icon></a>
        </div>
    </div>

    <app-actionbar>

        <kiss-container>
            <div class="kiss-flex kiss-flex-middle">
                <div class="kiss-flex-1"></div>
                <div class="kiss-button-group">
                    <a class="kiss-button" href="<?=$this->route("/collections")?>"><?=t('Close')?></a>
                    <a class="kiss-button kiss-button-primary" href="<?=$this->route("/collections/items/item/{$collection['name']}")?>"><?=t('Create item')?></a>
                </div>
            </div>
        </kiss-container>

    </app-actionbar>

</kiss-container>

<kiss-popoutmenu id="collection-menu-actions">
    <kiss-content>
        <kiss-navlist class="kiss-margin">
            <ul>
                <li class="kiss-nav-header"><?=t('Actions')?></li>
                <li><a href="<?=$this->route("/collections/edit/{$collection['name']}")?>"><?=t('Edit')?></a></li>
                <li><a href="<?=$this->route("/collections/items/item/{$collection['name']}")?>"><?=t('Create item')?></a></li>
            </ul>
        </kiss-navlist>
    </kiss-content>
</kiss-popoutmenu>
