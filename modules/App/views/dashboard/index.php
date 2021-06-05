<kiss-container class="kiss-margin-large">

    <div class="kiss-flex kiss-flex-middle">
        <div class="kiss-margin-small-right">
            <app-avatar size="50" name="<?=$this['user/name']?>">
                <canvas width="50" height="80"></canvas>
            </app-avatar>
        </div>
        <div>
            <div class="kiss-text-bold"><?=$this['user/name']?></div>
            <div class="kiss-color-muted kiss-size-small"><?=$this['user/email']?></div>
        </div>
    </div>

</kiss-container>
