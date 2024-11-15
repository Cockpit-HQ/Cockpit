<kiss-container class="kiss-margin-small" size="medium">

    <ul class="kiss-breadcrumbs">
        <li><a href="<?=$this->route('/system')?>"><?=t('Settings')?></a></li>
    </ul>

    <div class="kiss-margin-large-bottom kiss-flex kiss-flex-middle">
        <div class="kiss-size-4 kiss-flex-1"><strong><?=t('System')?></strong></div>
    </div>

    <vue-view>
        <template>

            <kiss-card class="kiss-margin-large">

                <kiss-row class="kiss-flex-middle">
                    <div><kiss-svg src="<?=$this->baseUrl('app:assets/img/logo.svg')?>" width="60" height="60"></kiss-svg></div>
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

                <tab class="kiss-margin animated fadeIn" caption="<?=t('System')?>">

                    <div class="kiss-text-caption kiss-text-bold kiss-size-bold kiss-margin">
                        <?=('General')?>
                    </div>

                    <table class="kiss-table">
                        <tbody>
                            <tr>
                                <td width="30%" class="kiss-size-xsmall">Version</td>
                                <td class="kiss-size-small kiss-text-monospace kiss-color-muted"><?=APP_VERSION?></td>
                            </tr>
                            <tr>
                                <td width="30%" class="kiss-size-xsmall">Debug mode</td>
                                <td class="kiss-size-small kiss-color-muted"><span class="kiss-badge kiss-badge-outline kiss-color-<?=($this->retrieve('debug') ? 'success':'danger')?>"><?=($this->retrieve('debug') ? 'Enabled':'Disabled')?></span></td>
                            </tr>
                            <tr>
                                <td width="30%" class="kiss-size-xsmall">Assets url</td>
                                <td class="kiss-size-small kiss-text-monospace kiss-color-muted kiss-text-truncate">{{ $baseUrl('#uploads:') }}</td>
                            </tr>
                            <tr>
                                <td width="30%" class="kiss-size-xsmall">Datastorage</td>
                                <td class="kiss-size-small kiss-text-monospace kiss-color-muted"><?=$this->dataStorage->type?></td>
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
                        <?php foreach($addons as $name): $icon = $this->path("{$name}:icon.svg"); ?>
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

                    <kiss-row match="true">
                        <?php if ($license): ?>
                        <div class="kiss-width-1-1 kiss-width-1-2@m kiss-width-1-3@l">
                            <kiss-card class="kiss-position-relative kiss-padding-larger kiss-text-monospace" theme="contrast shadowed">
                                <div class="kiss-cover" style="background:linear-gradient(225deg, #9f9e9e17 25%, transparent 25%) -10px 0 / 20px 20px, linear-gradient(315deg, #9f9e9e36 25%, transparent 25%) 0px 0 / 20px 20px, linear-gradient(45deg, #9f9e9e0d 25%, transparent 25%) 0px 0 / 20px 20px,linear-gradient(transparent, var(--kiss-color-overlay)"></div>

                                <div class="kiss-flex kiss-flex-middle" gap="small">
                                    <div><icon class="kiss-size-1 kiss-color-warning" size="larger">developer_board</icon></div>
                                    <div class="kiss-flex-1">
                                        <span class="kiss-text-monospace kiss-text-bold kiss-text-upper">Cockpit <?=($license['model'] ?? 'pro')?></span>
                                        <div class="kiss-color-muted kiss-text-caption kiss-size-xsmall">License</div>
                                    </div>
                                    <div>
                                        <kiss-svg src="<?=$this->baseUrl('app:assets/img/ag.svg')?>" width="40"></kiss-svg>
                                    </div>
                                </div>

                                <div class="kiss-text-bold kiss-text-truncate kiss-margin-large"><?=($license['company'] ? $license['company'] : $license['name'])?></div>

                                <div class="kiss-flex kiss-position-relative" gap="large">

                                    <div class="kiss-width-1-2 kiss-width-1-3@m kiss-color-muted kiss-size-small kiss-margin-small-top">
                                        <div class="kiss-text-caption"><?=t('Licensed domain')?></div>
                                        <div class="kiss-margin-xsmall-top kiss-text-truncate kiss-size-xsmall" title="<?=$license['domain']?>"><?=$license['domain']?></div>
                                    </div>

                                    <div class="kiss-color-muted kiss-size-small kiss-margin-small-top">
                                        <div class="kiss-text-caption"><?=t('License key')?></div>
                                        <div class="kiss-margin-xsmall-top kiss-text-truncate kiss-size-xsmall" title="<?=$license['key']?>"><?=$license['key']?></div>
                                    </div>

                                </div>

                            </kiss-card>
                        </div>
                        <?php endif ?>

                        <kiss-card class="kiss-padding kiss-bgcolor-contrast kiss-flex-1" theme="shadowed">
                            <div class="kiss-text-monospace kiss-size-small kiss-color-muted" style="max-height:200px;overflow:auto;">
                                <?=($this->path('#app:LICENSE') ? nl2br($this->helper('fs')->read('#app:LICENSE')) : '!!! LICENSE IS MISSING !!!')?>
                            </div>
                        </kiss-card>
                    </kiss-row>

                </tab>

                <?php if ($this->helper('acl')->isSuperAdmin() && $this->helper('spaces')->isMaster()): ?>
                <tab class="kiss-margin animated fadeIn" caption="PHP">

                    <table class="kiss-table">
                        <tbody>
                            <tr><td width="30%">Version</td><td class="kiss-text-monospace kiss-color-muted"><?=phpversion()?></td></tr>
                            <tr><td>PHP SAPI</td><td class="kiss-text-monospace kiss-color-muted"><?=php_sapi_name()?></td></tr>
                            <tr><td>System</td><td class="kiss-text-monospace kiss-color-muted"><?=php_uname()?></td></tr>
                            <tr><td>Extensions</td><td class="kiss-text-monospace kiss-color-muted"><?=implode(', ', get_loaded_extensions())?></td></tr>
                            <tr><td>Supported image types</td><td class="kiss-text-monospace kiss-color-muted"><?=implode(', ', $supportedImageTypes)?></td></tr>
                            <tr><td>Max. execution time</td><td class="kiss-text-monospace kiss-color-muted"><?=ini_get('max_execution_time')?> sec.</td></tr>
                            <tr><td>Memory limit</td><td class="kiss-text-monospace kiss-color-muted"><?=ini_get("memory_limit")?></td></tr>
                            <tr><td>Upload file size limit</td><td class="kiss-text-monospace kiss-color-muted"><?=ini_get("upload_max_filesize")?></td></tr>
                            <tr><td>Realpath Cache</td><td class="kiss-text-monospace kiss-color-muted"><?=ini_get("realpath_cache_size")?> / <?=ini_get("realpath_cache_ttl")?> (ttl)</td></tr>
                            <tr><td>System temporary directory</td><td class="kiss-text-monospace kiss-color-muted"><?=sys_get_temp_dir()?></td></tr>
                            <tr>
                                <td>Opcache</td>
                                <td>
                                    <div class="kiss-flex kiss-flex-middle">
                                        <div class="kiss-flex-1"><span class="kiss-badge kiss-badge-outline kiss-color-<?=(ini_get("opcache.enable") ? 'success':'danger')?>"><?=(ini_get("opcache.enable") ? 'Enabled':'Disabled')?></span></div>
                                        <?php if(ini_get("opcache.enable")): ?>
                                        <a title="Reset Opcache" @click="resetOpcache"><icon size="larger">mop</icon></a>
                                        <?php endif ?>
                                    </div>
                                </td>
                            </tr>

                        </tbody>
                    </table>

                </tab>
                <?php endif ?>

                <?php if ($this->helper('acl')->isSuperAdmin() && $this->helper('spaces')->isMaster()): ?>
                <tab class="kiss-margin animated fadeIn" caption="<?=t('Env')?>">

                    <app-loader v-if="loadingEnv"></app-loader>

                    <div class="kiss-padding-large kiss-align-center" v-if="!env && !loadingEnv">
                        <button type="button" class="kiss-button" @click="getEnvVars()">{{ t('Load environment variables') }}</button>
                    </div>

                    <div v-if="env">

                        <input type="text" class="kiss-input kiss-width-1-1" :placeholder="t('Filter env vars...')" v-model="envfilter">

                        <div class="kiss-color-muted kiss-text-light kiss-align-center kiss-size-3 kiss-margin-large" v-if="!Object.keys(filteredEnvVars).length">
                            {{ t('No vars found') }}
                        </div>

                        <table class="kiss-table kiss-margin" style="word-break: break-all;" v-else>
                            <tbody>
                                <tr v-for="(val, key) in filteredEnvVars">
                                    <td width="30%" class="kiss-size-small"><div class="kiss-size-xsmall">{{ key }}</div></td>
                                    <td width="70%" class="kiss-text-monospace kiss-color-muted"><div class="kiss-size-xsmall">{{ val }}</div></td>
                                </tr>
                            </tbody>
                        </table>

                    </div>

                </tab>
                <?php endif ?>

            </kiss-tabs>

        </template>

        <script type="module">

            export default {

                data() {
                    return {
                        env: null,
                        envfilter: '',
                        loadingEnv: false
                    }
                },

                computed: {
                    filteredEnvVars() {

                        if (!this.envfilter) return this.env;

                        let env = {}, filter = this.envfilter.toLowerCase();

                        Object.keys(this.env).forEach(name => {
                            if (name.toLowerCase().includes(filter)) env[name] = this.env[name];
                        });

                        return env;
                    }
                },

                methods: {
                    clearCache() {

                        App.ui.confirm('Are you sure?', () => {

                            App.ui.block();

                            this.$request('/system/utils/flushCache', {}).then(res => {
                                App.ui.unblock();
                                App.ui.notify('Cache cleared!');
                            });
                        });
                    },

                    resetOpcache() {

                        App.ui.block();

                        this.$request('/system/utils/resetOpcache', {}).then(res => {
                            App.ui.unblock();
                            App.ui.notify('Opcache cleared!');
                        });
                    },

                    getEnvVars() {

                        App.ui.prompt('Action verification', '', (password) => {

                            if (!password) return

                            this.loadingEnv = true;

                            this.$request('/system/utils/env', {password}).then(res => {
                                this.env = res.env;
                            }).catch(res => {
                                App.ui.notify(res.error || 'Loading failed!', 'error');
                            }).finally(() => {
                                this.loadingEnv = false;
                            });

                        }, {
                            type: 'password',
                            info: 'Please enter your password to verify this action'
                        });
                    }
                }
            }
        </script>
    </vue-view>
</kiss-container>
