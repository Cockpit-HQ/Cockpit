
<kiss-container class="kiss-margin-large">

    <div class="kiss-flex kiss-flex-middle">
        <div class="kiss-margin-right">
            <kiss-svg class="kiss-margin-auto" src="<?=$this->base('collections:icon.svg')?>" width="35" height="35"><canvas width="35" height="35"></canvas></kiss-svg>
        </div>
        <div class="kiss-margin-small-right">
            <div class="kiss-size-large kiss-text-bold"><?=$this->escape($collection['label'] ? $collection['label'] : $collection['name'])?></div>
        </div>
        <div>
            <a class="kiss-size-large" kiss-popoutmenu="#menu" kiss-popoutmenu-pos="left"><icon>more_horiz</icon></a>
        </div>
    </div>

    <app-actionbar>

        <kiss-container>
            <div class="kiss-flex kiss-flex-middle">
                <div class="kiss-flex-1"></div>
                <a class="kiss-button kiss-button-primary" href="<?=$this->route("/collections/entries/item/{$collection['name']}")?>"><?=t('Add entry')?></a>
            </div>
        </kiss-container>

    </app-actionbar>

</kiss-container>

<kiss-popoutmenu id="menu">
    <kiss-content>

        <strong class="kiss-size-small kiss-text-upper"><?=t('Actions')?></strong>

        <kiss-navlist class="kiss-margin">
            <ul>
                <li><a href="<?=$this->route("/collections/edit/{$collection['name']}")?>"><?=t('Edit')?></a></li>
            </ul>
        </kiss-navlist>
    </kiss-content>
</kiss-popoutmenu>
