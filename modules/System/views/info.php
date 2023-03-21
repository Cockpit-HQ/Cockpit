<kiss-container class="kiss-margin" size="medium">

    <ul class="kiss-breadcrumbs">
        <li><a href="<?=$this->route('/system')?>"><?=t('Settings')?></a></li>
    </ul>

    <div class="kiss-margin-large-bottom kiss-flex kiss-flex-middle">
        <div class="kiss-size-4 kiss-flex-1"><strong><?=t('System')?></strong></div>
    </div>

    <vue-view>
        <template>

            <kiss-card class="kiss-padding kiss-margin-large" theme="bordered contrast shadowed">

                <kiss-row class="kiss-flex-middle">
                    <div><kiss-svg src="<?=$this->baseUrl('app:assets/logo.svg')?>" width="60" height="60"></kiss-svg></div>
                    <div class="kiss-flex-1">
                        <div class="kiss-size-4 kiss-text-bold">Cockpit</div>
                        <div class="kiss-text-caption kiss-margin-small kiss-color-muted">
                            A product by
                            <strong><a class="kiss-link-muted" href="https://agentejo.com/" target="_blank" rel="noopener">Agentejo</a></strong>
                        </div>
                    </div>
                </kiss-row>

            </kiss-card>

            <kiss-tabs>

                <tab class="kiss-margin animated fadeIn" caption="<?=t('App')?>">

                    <div class="kiss-text-caption kiss-text-bold kiss-size-bold kiss-margin">
                        <?=('General')?>
                    </div>

                    <table class="kiss-table">
                        <tbody>
                            <tr>
                                <td width="30%" class="kiss-size-xsmall">Version</td>
                                <td class="kiss-size-small kiss-color-muted"><?=APP_VERSION?></td>
                            </tr>
                            <tr>
                                <td width="30%" class="kiss-size-xsmall">Debug mode</td>
                                <td class="kiss-size-small kiss-color-muted"><span class="kiss-badge kiss-badge-outline kiss-color-<?=($this->retrieve('debug') ? 'success':'danger')?>"><?=($this->retrieve('debug') ? 'Enabled':'Disabled')?></span></td>
                            </tr>
                        </tbody>
                    </table>

                    <?php if ($this->helper('acl')->isSuperAdmin()): ?>
                    <div class="kiss-text-caption kiss-text-bold kiss-size-bold kiss-margin">
                        <?=('Cache')?>
                    </div>

                    <div>
                        <button type="button" class="kiss-button" @click="clearCache()"><?=t('Clear cache')?></button>
                    </div>
                    <?php endif ?>

                    <?php if (count($addons)): asort($addons); ?>
                    <div class="kiss-text-caption kiss-text-bold kiss-size-bold kiss-margin kiss-margin-large-top">
                        <?=('Loaded Addons')?>
                    </div>

                    <kiss-grid cols="4@m 6@xl" gap="small">
                        <?php

                        foreach($addons as $name): $icon = $this->path("{$name}:icon.svg"); ?>
                        <kiss-card class="kiss-padding kiss-size-small kiss-text-capitalize kiss-flex kiss-flex-middle" theme="shadowed contrast">
                            <div class="kiss-margin-small-right"><kiss-svg src="<?=$this->base($icon ? "{$name}:icon.svg" : 'system:assets/icons/module.svg')?>" width="30" height="30"></kiss-svg></div>
                            <div><?=$name?></div>
                        </kiss-card>
                        <?php endforeach ?>
                    </kiss-grid>
                    <?php endif ?>

                    <div class="kiss-text-caption kiss-text-bold kiss-size-bold kiss-margin">
                        <?=('License')?>
                    </div>

                    <?php if ($license): ?>
                    <kiss-card class="kiss-padding kiss-margin kiss-text-monospace" theme="contrast shadowed">

                        <div class="kiss-text-bold"><?=($license['company'] ? $license['company'] : $license['name'])?></div>

                        <div class="kiss-color-muted kiss-size-small kiss-margin-small-top">
                            <div class="kiss-text-caption"><?=t('Licensed domain')?></div>
                            <div><?=$license['domain']?></div>
                        </div>

                    </kiss-card>
                    <?php endif ?>

                    <kiss-card class="kiss-padding kiss-bgcolor-contrast">
                        <div class="kiss-text-monospace kiss-size-small kiss-color-muted" style="max-height:200px;overflow:auto;">
                            <?=($this->path('#app:LICENSE') ? nl2br($this->helper('fs')->read('#app:LICENSE')) : '!!! LICENSE IS MISSING !!!')?>
                        </div>
                    </kiss-card>

                </tab>

                <tab class="kiss-margin animated fadeIn" caption="PHP">

                    <table class="kiss-table">
                        <tbody>
                            <tr><td width="30%">Version</td><td class="kiss-color-muted"><?=phpversion()?></td></tr>
                            <tr><td>PHP SAPI</td><td class="kiss-color-muted"><?=php_sapi_name()?></td></tr>
                            <tr><td>System</td><td class="kiss-color-muted"><?=php_uname()?></td></tr>
                            <tr><td>Extensions</td><td class="kiss-color-muted"><?=implode(', ', get_loaded_extensions())?></td></tr>
                            <tr><td>Supported image types</td><td class="kiss-color-muted"><?=implode(', ', $supportedImageTypes)?></td></tr>
                            <tr><td>Max. execution time</td><td class="kiss-color-muted"><?=ini_get('max_execution_time')?> sec.</td></tr>
                            <tr><td>Memory limit</td><td class="kiss-color-muted"><?=ini_get("memory_limit")?></td></tr>
                            <tr><td>Upload file size limit</td><td class="kiss-color-muted"><?=ini_get("upload_max_filesize")?></td></tr>
                            <tr><td>Realpath Cache</td><td class="kiss-color-muted"><?=ini_get("realpath_cache_size")?> / <?=ini_get("realpath_cache_ttl")?> (ttl)</td></tr>
                            <tr><td>System temporary directory</td><td class="kiss-color-muted"><?=sys_get_temp_dir()?></td></tr>
                            <tr>
                                <td>OPCache</td>
                                <td><span class="kiss-badge kiss-badge-outline kiss-color-<?=(ini_get("opcache.enable") ? 'success':'danger')?>"><?=(ini_get("opcache.enable") ? 'Enabled':'Disabled')?></span></td>
                            </tr>

                        </tbody>
                    </table>

                </tab>

                <?php if ($this->helper('acl')->isSuperAdmin()): ?>
                <tab class="kiss-margin animated fadeIn" caption="<?=t('Env')?>">

                    <table class="kiss-table" style="word-break: break-all;">
                        <tbody>
                            <?php foreach(getenv() as $key => $value): ?>
                            <tr>
                                <td width="30%" class="kiss-size-small"><div class="kiss-size-xsmall"><?=$key?></div></td>
                                <td width="70%" class="kiss-color-muted"><div class="kiss-size-xsmall"><?=$value?></div></td>
                            </tr>
                            <?php endforeach ?>
                        </tbody>
                    </table>

                </tab>
                <?php endif ?>

            </kiss-tabs>

        </template>

        <script type="module">

            export default {

                methods: {
                    clearCache() {

                        App.ui.confirm('Are you sure?', () => {

                            App.ui.block();

                            this.$request('/system/utils/flushCache', {}).then(res => {
                                App.ui.unblock();
                                App.ui.notify('Cache cleared!');
                            });
                        });
                    }
                }
            }
        </script>
    </vue-view>
</kiss-container>
