<?php

    $roles = $this->helper('acl')->roles();
?>
<kiss-container class="kiss-margin-small" size="small">

    <ul class="kiss-breadcrumbs">
        <li><a href="<?=$this->route('/system')?>"><?=t('Settings')?></a></li>
        <li><a href="<?=$this->route('/system/api')?>"><?=t('API & Security')?></a></li>
    </ul>

    <vue-view>
        <template>

            <div class="kiss-margin-large-bottom kiss-size-4" v-if="key.key != 'public'">
                <strong v-if="!key._id"><?=t('Create key')?></strong>
                <strong v-if="key._id"><?=t('Edit key')?></strong>
            </div>

            <h1 class="kiss-margin-remove" v-if="key.key == 'public'">
                <?=t('Public API')?>
            </h1>

            <div class="kiss-color-muted kiss-size-small kiss-margin-small-top kiss-margin-large-bottom" v-if="key.key == 'public'">
                <?=t('Configure public API access permissions for unauthenticated requests.')?>
            </div>

            <form :class="{'kiss-disabled':saving}" @submit.prevent="save">

                <div class="kiss-margin" v-if="key.key != 'public'">
                    <label><?=t('Name')?></label>
                    <input class="kiss-input" type="text" v-model="key.name" required>
                </div>

                <kiss-card class="kiss-margin kiss-padding kiss-position-relative" theme="bordered contrast">

                    <div class="kiss-margin">

                        <label><?=t('Role')?></label>

                        <div class="kiss-flex kiss-flex-middle">
                            <div class="kiss-overlay-input">
                                <div class="kiss-text-capitalize kiss-text-bold" :class="{'kiss-color-muted': !key.role}">{{ key.role || t('No role set') }}</div>
                                <select class="kiss-input kiss-select" v-model="key.role">
                                    <option value="">No role</option>
                                    <hr />
                                    <option v-for="role in roles" :value="role.appid">{{ role.name }}</option>
                                </select>
                            </div>
                            <div class="kiss-margin-left kiss-flex-1 kiss-align-right"><a href="<?=$this->route('/system/users/roles')?>"><icon class="kiss-size-large">tune</icon></a></div>
                        </div>

                    </div>

                    <hr v-if="key.key != 'public'">

                    <div class="kiss-margin" v-if="key.key != 'public'">

                        <label><icon>vpn_key</icon> <?=t('API Key')?></label>
                        <div class="kiss-flex kiss-flex-middle">
                            <div class="kiss-flex-1 kiss-margin-small-right kiss-text-truncate kiss-disabled">
                                <span class="kiss-text-caption" v-if="!key.key"><?=t('No api key created yet')?></span>
                                <span class="kiss-text-monospace kiss-text-bold" v-if="key.key">{{ key.key }}</span>
                            </div>
                            <a @click="generateToken"><icon class="kiss-size-large">refresh</icon></a>
                            <a class="kiss-margin-small-left" v-if="key.key" @click="copyToken"><icon class="kiss-size-large">content_copy</icon></a>
                        </div>

                    </div>

                </kiss-card>

                <app-actionbar>

                    <kiss-container size="small">
                        <div class="kiss-flex kiss-flex-middle kiss-flex-right">
                            <div class="kiss-button-group">
                                <a class="kiss-button" href="<?=$this->route('/system/api')?>">
                                    <span v-if="!key._id"><?=t('Cancel')?></span>
                                    <span v-if="key._id"><?=t('Close')?></span>
                                </a>
                                <button type="submit" class="kiss-button kiss-button-primary" v-if="key.key == 'public'">
                                    <?=t('Save')?>
                                </button>
                                <button type="submit" class="kiss-button kiss-button-primary" v-if="key.key != 'public'">
                                    <span v-if="!key._id"><?=t('Create key')?></span>
                                    <span v-if="key._id"><?=t('Update key')?></span>
                                </button>
                            </div>
                        </div>
                    </kiss-container>

                </app-actionbar>

            </form>

        </template>

        <script type="module">

            export default {
                data() {

                    return {
                        saving: false,
                        key: <?=json_encode($key)?>,
                        roles: <?=json_encode($roles)?>
                    };
                },

                methods: {

                    save() {

                        let isUpdate = this.key._id;

                        this.saving = true;

                        this.$request('/system/api/save', {key: this.key}).then(key => {

                            this.key = key;
                            this.saving = false;

                            if (isUpdate) {
                                App.ui.notify('Api key updated!');
                            } else {
                                App.ui.notify('Api key created!');
                            }
                        }).catch(res => {
                            this.saving = false;
                            App.ui.notify(res.error || 'Saving failed!', 'error');
                        })

                    },

                    generateToken() {

                        this.$request('/utils/generateToken').then(res => {
                            this.key.key = `API-${res.token}`;
                        });
                    },
                    copyToken() {
                        App.utils.copyText(this.key.key, () => {
                            App.ui.notify('Api key copied!');
                        });
                    },
                }
            }
        </script>

    </vue-view>

</kiss-container>
