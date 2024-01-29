<kiss-container class="kiss-margin-large">

    <div class="kiss-flex kiss-flex-middle">
        <div class="kiss-margin-small-right">
            <app-avatar size="40" name="<?=$this['user/name']?>">
                <canvas width="40" height="40"></canvas>
            </app-avatar>
        </div>
        <div>
            <div class="kiss-text-bold"><?=$this['user/name']?></div>
            <div class="kiss-color-muted kiss-size-small"><?=$this['user/email']?></div>
        </div>
    </div>

    <div class="kiss-height-50vh kiss-flex kiss-flex-middle kiss-flex-center kiss-align-center">
        <div class="animated fadeInUp">
            <div class="kiss-size-xlarge kiss-margin-small"><?=t('Hello.')?></div>
            <div class="kiss-color-muted kiss-size-1 kiss-text-light animated fadeIn delay-1s"><?=t("Excited for your creations today!")?></div>
        </div>
    </div>

</kiss-container>
