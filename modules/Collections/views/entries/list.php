
<kiss-container class="kiss-margin-large">

    <div class="kiss-flex kiss-flex-middle">
        <div class="kiss-margin-right">
            <kiss-svg class="kiss-margin-auto" src="<?=$this->base('collections:icon.svg')?>" width="35" height="35"></kiss-svg>
        </div>
        <div class="kiss-margin-small-right">
            <div class="kiss-size-large kiss-text-bold"><?=$this->escape($collection['label'] ? $collection['label'] : $collection['name'])?></div>
        </div>
        <div>

            <kiss-dropdown>
                <a class="kiss-size-large"><icon>more_horiz</icon></a>

                <kiss-dropdownbox class="kiss-align-left" pos="center">
                    <kiss-navlist>
                        <ul>
                            <li class="kiss-nav-header"><?=t('Actions')?></li>
                            <li><a href="<?=$this->route("/collections/edit/{$collection['name']}")?>"><?=t('Edit')?></a></li>
                        </ul>
                    </navlist>
                </kiss-dropdownbox>

            </kiss-dropdown>
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
