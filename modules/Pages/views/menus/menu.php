<kiss-container class="kiss-margin">

    <ul class="kiss-breadcrumbs">
        <li><a href="<?=$this->route('/pages/menus')?>"><?=t('Menus')?></a></li>
    </ul>

    <vue-view>
        <template>

            <div class="kiss-size-4 kiss-margin-large-bottom">
                <span v-if="!menu._id"><?=t('Create menu')?></span>
                <span v-if="menu._id"><?=t('Edit menu')?></span>
            </div>

            <kiss-row class="kiss-row-large kiss-margin-large">
                <div class="kiss-flex-1">
                    <div class="kiss-width-2-3@xl kiss-margin-auto">

                        <form :class="{'kiss-disabled':saving}" @submit.prevent="save">

                            <kiss-row class="kiss-margin kiss-child-width-1-2@m">
                                <div :class="{'kiss-disabled': isUpdate}">
                                    <label><?=t('Name')?></label>
                                    <input class="kiss-input" type="text" pattern="[a-zA-Z0-9_]+" v-model="menu.name" :disabled="isUpdate" required>
                                </div>
                                <div>
                                    <label><?=t('Display name')?></label>
                                    <input class="kiss-input" type="text" v-model="menu.label">
                                </div>
                            </kiss-row>

                            <div class="kiss-margin">
                                <label><?=t('Group')?></label>
                                <input class="kiss-input" type="text" list="menu-groups" v-model="menu.group">
                            </div>

                            <div class="kiss-margin">
                                <label><?=t('Info')?></label>
                                <textarea class="kiss-input kiss-textarea" style="height:100px;" v-model="menu.info"></textarea>
                            </div>

                            <div class="kiss-margin">
                                <label><?=t('Color')?></label>
                                <field-color v-model="menu.color"></field-color>
                            </div>

                            <div class="kiss-margin">
                                <fields-renderer v-model="menu" :fields="[{name:'links', type:'nav', label: t('Links'), i18n: true}]" :locales="locales"></fields-renderer>
                            </div>

                            <app-actionbar>

                                <kiss-container>
                                    <div class="kiss-flex kiss-flex-middle kiss-flex-right">

                                        <div class="kiss-button-group">
                                            <a class="kiss-button" href="<?=$this->route('/pages/menus')?>">
                                                <span v-if="!menu._id"><?=t('Cancel')?></span>
                                                <span v-if="menu._id"><?=t('Close')?></span>
                                            </a>
                                            <button type="submit" class="kiss-button kiss-button-primary">
                                                <span v-if="!menu._id"><?=t('Create menu')?></span>
                                                <span v-if="menu._id"><?=t('Update menu')?></span>
                                            </button>
                                        </div>
                                    </div>
                                </kiss-container>

                            </app-actionbar>

                        </form>

                    </div>
                </div>
                <div class="kiss-width-1-4@m kiss-width-1-5@xl">
                    <div class="kiss-margin" v-if="menu._id">

                        <div class="kiss-text-caption kiss-size-xsmall kiss-text-bold">{{ t('Meta') }}</div>

                        <kiss-card class="kiss-margin-small kiss-bgcolor-contrast kiss-padding-small">

                            <div class="kiss-margin-xsmall">
                                <div class="kiss-flex kiss-flex-middle">
                                    <div class="kiss-size-4 kiss-margin-small-right kiss-flex kiss-color-muted" :title="t('Created at')"><icon>more_time</icon></div>
                                    <div class="kiss-text-truncate kiss-size-small kiss-text-monospace kiss-color-muted kiss-flex-1">{{ (new Date(menu._created * 1000).toLocaleString()) }}</div>
                                    <div><icon>account_circle</icon></div>
                                </div>
                            </div>

                            <div class="kiss-margin-xsmall" v-if="menu._created != menu._modified">
                                <div class="kiss-flex kiss-flex-middle">
                                    <div class="kiss-size-4 kiss-margin-small-right kiss-flex kiss-color-muted" :title="t('Modified at')"><icon>history</icon></div>
                                    <div class="kiss-text-truncate kiss-size-small kiss-text-monospace kiss-color-muted kiss-flex-1">{{ (new Date(menu._modified * 1000).toLocaleString()) }}</div>
                                    <div><icon>account_circle</icon></div>
                                </div>
                            </div>

                        </kiss-card>
                    </div>

                    <div class="kiss-margin" v-if="locales.length">

                        <div class="kiss-text-caption kiss-size-xsmall kiss-text-bold">{{ t('Translation') }}</div>

                        <kiss-card class="kiss-padding-small kiss-margin-small kiss-text-muted kiss-size-small kiss-color-muted kiss-flex kiss-flex-middle" theme="bordered" v-if="!locales.length">
                            <span class="kiss-flex-1 kiss-margin-small-right">{{ t('No locales.') }}</span>
                            <a class="kiss-size-xsmall  kiss-text-bolder" href="<?=$this->route('/settings/locales')?>">{{ t('Manage') }}</a>
                        </kiss-card>

                        <div class="kiss-margin-small" v-if="locales.length">

                            <kiss-card class="kiss-position-relative kiss-padding-small kiss-margin-small kiss-text-bolder kiss-flex kiss-flex-middle" :class="{'kiss-color-muted': !loc.visible}" :theme="!loc.visible ? 'bordered':'bordered contrast'" v-for="loc in locales">
                                <icon class="kiss-margin-small-right" :class="{'kiss-color-primary': loc.visible}">{{ loc.visible ? 'visibility' : 'visibility_off' }}</icon>
                                <span class="kiss-size-small kiss-flex-1">{{ loc.name }}</span>
                                <span class="kiss-color-muted kiss-size-xsmall" v-if="loc.i18n == 'default'">{{ t('Default') }}</span>
                                <a class="kiss-cover" @click="loc.visible = !loc.visible"></a>
                            </kiss-card>
                        </div>

                    </div>
                </div>
            </kiss-row>

            <datalist id="menu-groups" v-if="groups.length">
                <option v-for="group in groups">{{ group }}</option>
            </datalist>


        </template>
        <script type="module">
            export default {

                data() {
                    return {
                        menu: <?=json_encode($menu)?>,
                        groups: <?=json_encode($groups)?>,
                        locales: <?=json_encode($locales)?>,
                        saving: false,
                        isModified: false
                    }
                },

                components: {
                    'fields-renderer': 'settings:assets/vue-components/fields-renderer.js',
                },

                created() {

                    window.onbeforeunload = e => {

                        if (this.isModified) {
                            e.preventDefault();
                            e.returnValue = this.t('You have unsaved data! Are you sure you want to leave?');
                        }
                    };
                },

                watch: {
                    menu: {
                        handler() {
                            this.isModified = true;
                        },
                        deep: true
                    }
                },


                methods: {
                    save() {

                        let isUpdate = this.menu._id;

                        this.saving = true;

                        this.$request('/pages/menus/save', {menu: this.menu}).then(menu => {

                            this.menu = menu;
                            this.saving = false;

                            if (isUpdate) {
                                App.ui.notify('Menu updated!');
                            } else {
                                App.ui.notify('Menu created!');
                                this.isUpdate = true;
                            }

                            this.$nextTick(() => this.isModified = false);

                        }).catch(res => {
                            this.saving = false;
                            App.ui.notify(res.error || 'Saving failed!', 'error');
                        });
                    }
                }

            }
        </script>
    </vue-view>

</kiss-container>