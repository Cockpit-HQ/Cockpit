<kiss-container class="kiss-margin-large">

    <div class="kiss-flex kiss-flex-middle">
        <div class="kiss-margin-right">
            <app-avatar size="80" name="<?=$this['user/name']?>"><canvas width="80" height="80"></canvas></app-avatar>
        </div>
        <div>
            <div class="kiss-text-bold"><?=$this['user/name']?></div>
            <div class="kiss-color-muted kiss-size-small"><?=$this['user/email']?></div>
            <div class="kiss-margin-small-top"><span class="kiss-badge kiss-text-upper"><?=$this['user/role']?></span></div>
        </div>
    </div>

</kiss-container>
<hr>