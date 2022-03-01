<kiss-container class="kiss-margin-large" size="small">

    <?php foreach ($this->helper('settings')->groups(true) as $group => $items):?>

    <?php

        $items = array_filter($items, function($item) {
            return isset($item['permission']) && $this->helper('acl')->isAllowed($item['permission']);
        });

        if (!count($items)) continue;
    ?>

    <div class="kiss-text-bold kiss-text-caption"><?=$this->escape(t($group))?></div>

    <kiss-grid cols="2@s 4@m" class="kiss-margin">

        <?php foreach ($items as $item): ?>

        <kiss-card class="kiss-position-relative" theme="contrast" hover="shadow">

            <div class="kiss-position-relative">
                <div class="kiss-position-absolute kiss-size-xlarge" center="true">
                    <kiss-svg src="<?=$this->base((isset($item['icon']) && $item['icon']) ? $item['icon'] : 'system:assets/icons/settings.svg')?>" width="50" height="50"><canvas width="50" height="50"></canvas></kiss-svg>
                </div>
                <canvas width="800" height="500"></canvas>
            </div>

            <div class="kiss-padding kiss-size-small kiss-align-center kiss-text-caption">
                <?=$this->escape(t($item['label'] ?? 'n/a'))?>
            </div>
            <a class="kiss-cover" href="<?=$this->route($item['route'])?>"></a>
        </kiss-card>

        <?php endforeach ?>

    </kiss-grid>
    <?php endforeach ?>

</kiss-container>