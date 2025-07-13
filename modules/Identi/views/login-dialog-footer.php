<kiss-card class="kiss-margin-large kiss-flex kiss-flex-middle kiss-position-relative" theme="bordered contrast" hover="shadow bordered-primary" v-if="view=='form'">
    <div class="kiss-padding kiss-width-1-5 kiss-align-center" style="background: var(--kiss-base-background-color);">
        <icon size="large">fingerprint</icon>
    </div>
    <div class="kiss-padding kiss-flex-1 kiss-align-center kiss-text-caption kiss-text-bolder">
        <?=$this->module('identi')->config('loginText', 'Sign in via OAuth')?>
    </div>
    <div class="kiss-padding kiss-width-1-5 kiss-align-center kiss-color-muted">
        <icon size="large">arrow_forward</icon>
    </div>
    <a class="kiss-cover" href="<?=$this->routeUrl('/identi/authenticate')?>" onclick="App.ui.block()"></a>
</kiss-card>
