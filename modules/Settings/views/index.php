<kiss-container class="kiss-margin-large" size="small">

    <?php foreach ($this->helper('settings')->groups(true) as $group => $items):?>

    <div class="kiss-text-bold kiss-text-caption"><?=$this->escape(_t($group))?></div>

    <kiss-row class="kiss-margin kiss-child-width-1-4@m">

        <?php foreach ($items as $item):?>
        <div>
            <kiss-card class="kiss-position-relative" theme="bordered" hover="shadow">

                <div class="kiss-position-relative">
                    <div class="kiss-position-absolute kiss-size-xlarge" center="true"><icon>blur_on</icon></div>
                    <canvas width="800" height="500"></canvas>
                </div>

                <div class="kiss-padding kiss-size-small kiss-align-center kiss-text-caption">
                    <?=$this->escape(_t($item['label'] ?? 'n/a'))?>
                </div>
                <a class="kiss-cover" href="<?=$this->route($item['route'])?>"></a>
            </kiss-card>
        </div>
        <?php endforeach ?>

    </kiss-row>
    <?php endforeach ?>

</kiss-container>