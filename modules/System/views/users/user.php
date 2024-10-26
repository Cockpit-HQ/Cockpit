<?php

if (!isset($user['twofa'])) {

    $user['twofa'] = [
        'enabled' => false,
        'secret' => $this->helper('twfa')->createSecret(160)
    ];
}

?>
<kiss-container class="kiss-margin-small" size="small">

    <ul class="kiss-breadcrumbs">
        <li><a href="<?= $this->route('/system') ?>"><?= t('Settings') ?></a></li>
        <?php if (!$isAccountView) : ?>
            <li><a href="<?= $this->route('/system/users') ?>"><?= t('Users') ?></a></li>
        <?php endif ?>
    </ul>

    <vue-view>
        <template>

            <?php if (!$isAccountView) : ?>
                <div class="kiss-margin-large-bottom kiss-size-4">
                    <strong v-if="!user._id"><?= t('Create user') ?></strong>
                    <strong v-if="user._id"><?= t('Edit user') ?></strong>
                </div>
            <?php endif ?>

            <div class="kiss-flex kiss-flex-middle kiss-has-transition kiss-margin-large-bottom" v-if="user._id" :class="{'kiss-inactive': !user.active}">
                <div>
                    <app-avatar size="50" :name="user.name"></app-avatar>
                </div>
                <div class="kiss-margin-left kiss-flex-1">
                    <div class="kiss-text-bold">{{user.name}}</div>
                    <div class="kiss-color-muted kiss-size-small"><span class="kiss-color-primary">{{user.user}}</span> &bullet; {{user.email}}</div>
                </div>
            </div>


            <form :class="{'kiss-disabled':saving}" @submit.prevent="save">

                <?php if (!isset($user['_id']) || $user['_id'] != $this['user/_id']) : ?>
                    <div class="kiss-margin">
                        <label><?= t('Active') ?></label>
                        <field-boolean class="kiss-size-3" v-model="user.active"></field-boolean>
                    </div>
                <?php endif ?>

                <div class="kiss-margin">
                    <label><?= t('Name') ?></label>
                    <input class="kiss-input" type="text" v-model="user.name" autocomplete="off" autofocus required>
                </div>

                <div class="kiss-margin">
                    <label><?= t('User') ?> <icon class="kiss-size-5 kiss-color-danger kiss-margin-xsmall-left" title="Required">trip_origin</icon></label>
                    <input class="kiss-input" type="text" v-model="user.user" autocomplete="off" required>
                </div>

                <div class="kiss-margin">
                    <label><?= t('Email') ?> <icon class="kiss-size-5 kiss-color-danger kiss-margin-xsmall-left" title="Required">trip_origin</icon></label>
                    <input class="kiss-input" type="email" v-model="user.email" autocomplete="off" required>
                </div>

                <div class="kiss-margin">
                    <label><?= t('Password') ?> <icon class="kiss-size-5 kiss-color-danger kiss-margin-xsmall-left" title="Required" v-if="!user._id">trip_origin</icon></label>
                    <input class="kiss-input" type="password" v-model="user.password" :placeholder="user._id ? '<?= t('Keep current password') ?>':''" :required="!user._id" autocomplete="off">
                </div>

                <?php if (!isset($user['_id']) || $user['_id'] != $this['user/_id']) : ?>
                    <div class="kiss-margin-large">
                        <label><?= t('Role') ?></label>
                        <select class="kiss-select kiss-input" v-model="user.role" required>
                            <option value=""></option>
                            <option :value="role.appid" v-for="role in roles">{{ role.name }}</option>
                        </select>
                    </div>
                <?php endif ?>

                <div class="kiss-margin" v-if="languages.length > 1">
                    <label><?= t('Admin UI language') ?></label>
                    <select class="kiss-input" type="password" v-model="user.i18n">
                        <?php foreach ($languages as $lang) : ?>
                            <option value="<?= $lang['i18n'] ?>"><?= $lang['language'] ?></option>
                        <?php endforeach ?>
                    </select>
                </div>

                <kiss-card class="kiss-margin kiss-margin-large-top kiss-padding" :theme="user.apiKey ? 'bordered contrast':'bordered'">
                    <label><?= t('API Key') ?></label>
                    <div class="kiss-flex kiss-flex-middle">
                        <div class="kiss-flex-1 kiss-margin-small-right kiss-text-truncate kiss-disabled">
                            <span class="kiss-text-caption" v-if="!user.apiKey"><?= t('No api key created yet') ?></span>
                            <span class="kiss-text-monospace kiss-text-bold" v-if="user.apiKey">{{ user.apiKey }}</span>
                        </div>
                        <a @click="generateToken">
                            <icon>refresh</icon>
                        </a>
                        <a class="kiss-margin-small-left" v-if="user.apiKey" @click="copyToken">
                            <icon>content_copy</icon>
                        </a>
                    </div>
                </kiss-card>

                <kiss-card class="kiss-margin kiss-padding" :theme="user.twofa.enabled ? 'bordered contrast':'bordered'">
                    <label><?= t('Two-factor authentication (2FA)') ?></label>
                    <div class="kiss-margin-small-top">
                        <field-boolean class="kiss-size-3" v-model="user.twofa.enabled"></field-boolean>
                    </div>
                    <kiss-row class="kiss-margin animated fadeIn" v-if="user.twofa.enabled">
                        <div><img src="<?= $this->route("/system/users/getSecretQRCode/{$user['twofa']['secret']}/150") ?>" width="150" height="150" loading="lazy" style="background:#fff;border:10px #fff solid;"></div>
                        <div class="kiss-flex-1">

                            <p class="kiss-text-caption">
                                Scan the QR code with your 2FA mobile app<br>
                                or enter your secret manually:
                            </p>

                            <div class="kiss-margin kiss-text-monospace kiss-text-bold kiss-color-primary">
                                <?= $user['twofa']['secret'] ?>
                            </div>
                        </div>
                    </kiss-row>

                </kiss-card>

                <div class="kiss-margin-large">
                    <label><?= t('Color theme') ?></label>

                    <kiss-grid cols="3@m" gap="small">

                        <kiss-card class="kiss-padding kiss-position-relative" :theme="user.theme == 'auto' ? 'bordered contrast': 'bordered'" :class="{'kiss-color-muted': user.theme != 'auto'}" :style="{borderColor: user.theme == 'auto' ? 'var(--kiss-color-primary)':null}">
                            <strong class="kiss-size-small"><?= t('Auto') ?></strong>
                            <div class="kiss-color-muted kiss-size-xsmall kiss-margin-xsmall-top"><?= t('Use system preference') ?></div>
                            <a class="kiss-cover" @click="user.theme = 'auto'"></a>
                        </kiss-card>

                        <kiss-card class="kiss-padding kiss-position-relative" :theme="user.theme == 'dark' ? 'bordered contrast': 'bordered'" :class="{'kiss-color-muted': user.theme != 'dark'}" :style="{borderColor: user.theme == 'dark' ? 'var(--kiss-color-primary)':null}">
                            <strong class="kiss-size-small"><?= t('Dark') ?></strong>
                            <div class="kiss-color-muted kiss-size-xsmall kiss-margin-xsmall-top"><?= t('Dark mode') ?></div>
                            <a class="kiss-cover" @click="user.theme = 'dark'"></a>
                        </kiss-card>

                        <kiss-card class="kiss-padding kiss-position-relative" :theme="user.theme == 'light' ? 'bordered contrast': 'bordered'" :class="{'kiss-color-muted': user.theme != 'light'}" :style="{borderColor: user.theme == 'light' ? 'var(--kiss-color-primary)':null}">
                            <strong class="kiss-size-small"><?= t('Light') ?></strong>
                            <div class="kiss-color-muted kiss-size-xsmall kiss-margin-xsmall-top"><?= t('Light mode') ?></div>
                            <a class="kiss-cover" @click="user.theme = 'light'"></a>
                        </kiss-card>

                    </kiss-grid>

                </div>

                <app-actionbar>

                    <kiss-container size="small">
                        <div class="kiss-flex kiss-flex-middle kiss-flex-right">
                            <div class="kiss-button-group">
                                <?php if (!$isAccountView && $this->helper('acl')->isAllowed('app.users.manage')) : ?>
                                    <a class="kiss-button" href="<?= $this->route('/system/users') ?>">
                                        <span v-if="!user._id"><?= t('Cancel') ?></span>
                                        <span v-if="user._id"><?= t('Close') ?></span>
                                    </a>
                                <?php endif ?>
                                <button type="submit" class="kiss-button kiss-button-primary">
                                    <span v-if="!user._id"><?= t('Create') ?></span>
                                    <span v-if="user._id"><?= t('Update') ?></span>
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
                        user: <?= json_encode($user) ?>,
                        roles: <?= json_encode($this->helper('acl')->roles()) ?>,
                        languages: <?= json_encode($languages) ?>,
                    };
                },

                watch: {
                    'user.theme': {
                        handler(val) {
                            document.documentElement.setAttribute('data-theme', val);
                        }
                    }
                },

                methods: {

                    generateToken() {

                        this.$request('/utils/generateToken').then(res => {
                            this.user.apiKey = `USR-${res.token}`;
                        });
                    },

                    copyToken() {
                        App.utils.copyText(this.user.apiKey, () => {
                            App.ui.notify('Token copied!');
                        });
                    },

                    save() {

                        let isUpdate = this.user._id;

                        const sendRequest = (pwdVerification = null) => {

                            this.saving = true;

                            this.$request('/system/users/save', {
                                user: this.user,
                                password: pwdVerification,
                            }).then(user => {

                                this.user = user;

                                if (isUpdate) {
                                    App.ui.notify('User updated!');
                                } else {
                                    App.ui.notify('User created!');
                                }

                                // reload to get the new csrf token
                                if (App.user._id === user._id) {
                                    setTimeout(() => location.reload(), 600);
                                }

                            }).catch(res => {
                                App.ui.notify(res.error || 'Saving failed!', 'error');
                            }).finally(() => {
                                this.saving = false;
                            });
                        };

                        if (!isUpdate) {
                            sendRequest();
                            return;
                        }

                        App.ui.prompt('Action verification', '', (pwd) => {
                            sendRequest(pwd);
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
