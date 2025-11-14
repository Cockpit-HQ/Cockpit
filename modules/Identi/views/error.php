<kiss-container class="kiss-flex kiss-flex-column kiss-flex-center" size="small" style="min-height: 50vh;">

    <h1>OAuth Error</h1>
    <kiss-card class="kiss-padding-large kiss-text-monospace" theme="contrast bordered">
        <?=($error ?? 'Something went wrong!')?>
    </kiss-card>
    <div class="kiss-flex kiss-flex-middle kiss-disabled kiss-margin" gap>
        <div><img class="app-logo" src="<?= $this->helper('theme')->logo() ?>" style="height:40px;width:auto;" alt="Logo"></div>
        <div>
            <strong class="kiss-size-small"><?= $this['app.name'] ?></strong>
            <div class="kiss-color-muted kiss-size-xsmall">Identi OAuth Client</div>
        </div>
    </div>

</kiss-container>
