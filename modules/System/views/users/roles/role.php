<?php

$permissions = new ArrayObject([
    'Users' => [
        'app/users/manage' => 'Manage users',
        'app/roles/manage' => 'Manage roles',
    ]
]);

$components = [];

$this->trigger('app.permissions.collect', [$permissions]);

foreach ($permissions as $key => $meta) {

    if (isset($meta['component'])) {
        $components[$meta['component']] = $meta['src'];
    }
}

?>
<kiss-container class="kiss-margin-small" size="small">

    <ul class="kiss-breadcrumbs">
        <li><a href="<?= $this->route('/system') ?>"><?= t('Settings') ?></a></li>
        <li><a href="<?= $this->route('/system/users') ?>"><?= t('Users') ?></a></li>
        <li><a href="<?= $this->route('/system/users/roles') ?>"><?= t('Roles') ?></a></li>
    </ul>

    <vue-view>
        <template>

            <div class="kiss-margin-large-bottom kiss-size-4">
                <strong v-if="!role._id"><?= t('Create role') ?></strong>
                <strong v-if="role._id"><?= t('Edit role') ?></strong>
            </div>

            <form :class="{'kiss-disabled':saving}" @submit.prevent="save">

                <div class="kiss-margin" :class="{'kiss-disabled': role._id}">
                    <label><?= t('APPID') ?></label>
                    <input class="kiss-input" type="text" pattern="[a-zA-Z0-9_]+" v-model="role.appid" :disabled="role._id" required>
                </div>

                <div class="kiss-margin">
                    <label><?= t('Name') ?></label>
                    <input class="kiss-input" type="text" v-model="role.name" required>
                </div>

                <div class="kiss-margin">
                    <label><?= t('Info') ?></label>
                    <textarea class="kiss-input kiss-textarea" style="height:150px;" v-model="role.info"></textarea>
                </div>

                <div class="kiss-margin kiss-margin-large-top kiss-size-4"><strong><?= t('Permissions') ?></strong></div>

                <input class="kiss-input kiss-width-1-1" type="text" :placeholder="t('Filter groups...')" v-model="filter">

                <div class="kiss-button-group kiss-margin">
                    <button type="button" class="kiss-button kiss-button-small" @click="Object.keys(permissions).forEach(group => visible[group] = true)">{{ t('Open all') }}</button>
                    <button type="button" class="kiss-button kiss-button-small" @click="Object.keys(permissions).forEach(group => visible[group] = false)">{{ t('Collapse all') }}</button>
                </div>

                <kiss-card class="kiss-margin kiss-padding" theme="bordered contrast" hover="shadow" v-for="(meta, group) in groups">

                    <div class="kiss-flex kiss-flex-middle" :class="{'kiss-color-muted': !visible[group]}" @click="visible[group]=!visible[group]">
                        <icon class="kiss-margin-small-right">workspaces</icon>
                        <a class="kiss-link-muted kiss-text-caption kiss-text-bold kiss-flex-1">{{ group }}</a>
                        <a :class="visible[group] ? 'kiss-color-primary' : 'kiss-color-muted'">
                            <icon>unfold_more</icon>
                        </a>
                    </div>

                    <div class="kiss-margin" :class="{'kiss-hidden': !visible[group]}">

                        <component :is="meta.component" v-model="role.permissions" v-bind="meta.props || {}" v-if="meta.component"></component>

                        <div v-if="!meta.component">
                            <div class="kiss-margin-small kiss-size-small" v-for="(label, permission) in meta">
                                <field-boolean v-model="role.permissions[permission]" :label="label"></field-boolean>
                            </div>
                        </div>

                    </div>

                </kiss-card>

                <app-actionbar>

                    <kiss-container size="small">
                        <div class="kiss-flex kiss-flex-middle kiss-flex-right">
                            <div class="kiss-button-group">
                                <a class="kiss-button" href="<?= $this->route('/system/users/roles') ?>">
                                    <span v-if="!role._id"><?= t('Cancel') ?></span>
                                    <span v-if="role._id"><?= t('Close') ?></span>
                                </a>
                                <button type="submit" class="kiss-button kiss-button-primary">
                                    <span v-if="!role._id"><?= t('Create role') ?></span>
                                    <span v-if="role._id"><?= t('Update role') ?></span>
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
                        role: <?= json_encode($role) ?>,
                        permissions: <?= json_encode($permissions) ?>,
                        visible: {},
                        filter: ''
                    };
                },

                components: <?= json_encode(new ArrayObject($components)) ?>,

                computed: {

                    groups() {

                        let permissions = {},
                            filter = this.filter.toLowerCase();

                        Object.keys(this.permissions).sort().forEach(group => {

                            if (filter && group.toLowerCase().indexOf(filter) === -1) return;
                            permissions[group] = this.permissions[group];
                        });

                        return permissions;
                    },

                },

                methods: {

                    save() {

                        let isUpdate = this.role._id;

                        this.saving = true;

                        this.$request('/system/users/roles/save', {
                            role: this.role
                        }).then(role => {

                            this.role = role;
                            this.saving = false;

                            if (isUpdate) {
                                App.ui.notify('Role updated!');
                            } else {
                                App.ui.notify('Role created!');
                            }
                        }).catch(res => {
                            this.saving = false;
                            App.ui.notify(res.error || 'Saving failed!', 'error');
                        })

                    }
                }
            }
        </script>

    </vue-view>

</kiss-container>
