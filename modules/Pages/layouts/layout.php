<div class="kiss-bgcolor-contrast">
    <kiss-container>

        <kiss-row class="kiss-margin-top kiss-margin-bottom">
            <div class="kiss-position-relative kiss-flex kiss-flex-middle <?=($this->request->route === '/pages' || strpos($this->request->route, '/pages/page') === 0) ? 'kiss-text-bold':'kiss-color-muted'?>">
                <div><kiss-svg src="<?=$this->base('pages:icon.svg')?>" width="40" height="40"><canvas width="40" height="40"></canvas></kiss-svg></div>
                <div class="kiss-margin-small-left"><?=t('Pages')?></div>
                <a class="kiss-cover" href="<?=$this->route('/pages')?>"></a>
            </div>
            <div class="kiss-position-relative kiss-flex kiss-flex-middle <?=(strpos($this->request->route, '/pages/menus') === 0) ? 'kiss-text-bold':'kiss-color-muted'?>">
                <div><kiss-svg src="<?=$this->base('pages:assets/icons/nav.svg')?>" width="40" height="40"><canvas width="40" height="40"></canvas></kiss-svg></div>
                <div class="kiss-margin-small-left"><?=t('Menus')?></div>
                <a class="kiss-cover" href="<?=$this->base('/pages/menus')?>"></a>
            </div>
            <div class="kiss-flex-1"></div>
            <div class="kiss-position-relative kiss-flex kiss-flex-middle <?=(strpos($this->request->route, '/pages/settings') === 0) ? 'kiss-text-bold':'kiss-color-muted'?>">
                <div><kiss-svg src="<?=$this->base('settings:assets/icons/settings.svg')?>" width="40" height="40"><canvas width="40" height="40"></canvas></kiss-svg></div>
                <div class="kiss-margin-small-left"><?=t('Settings')?></div>
                <a class="kiss-cover" href="<?=$this->base('/pages/settings')?>"></a>
            </div>
        </kiss-row>


    </kiss-container>
</div>


<?=$contents?>