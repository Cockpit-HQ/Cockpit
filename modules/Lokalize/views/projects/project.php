<kiss-container class="kiss-margin">

    <ul class="kiss-breadcrumbs">
        <li><a href="<?=$this->route('/lokalize/projects')?>"><?=t('Lokalize')?></a></li>
        <li><span><?=$this->escape($project['label'] ? $project['label'] : $project['name'])?></span></li>
    </ul>


    <vue-view>
        <template>

            <div class="animated fadeIn kiss-height-30vh kiss-flex kiss-flex-middle kiss-flex-center kiss-align-center kiss-color-muted kiss-margin-large-top"  v-if="!project.keys.length">
                <div>
                    <kiss-svg src="<?=$this->base('lokalize:icon.svg')?>" width="40" height="40"></kiss-svg>
                    <p class="kiss-size-large kiss-margin-top"><?=t('No keys defined')?></p>
                </div>
            </div>

            <kiss-row class="kiss-row-large" v-if="project.keys.length">
                <div class="kiss-flex-1">

                    <kiss-card class="kiss-padding-small kiss-margin" theme="bordered" hover="shadow" v-for="key in project.keys">
                        <kiss-row>
                            <div class="kiss-width-1-4@m">
                                <div class="kiss-flex kiss-flex-middle kiss-text-bold">
                                    <icon class="larger kiss-margin-xsmall-right">label</icon>
                                    {{ key.name }}
                                    <a class="kiss-margin-xsmall-left" @click="toggleKeyActions(key)"><icon>more_horiz</icon></a>
                                </div>
                                <div class="kiss-size-xsmall kiss-color-muted kiss-margin-small-top">{{ key.info }}</div>
                            </div>
                            <div class="kiss-flex-1">

                                <div class="kiss-margin-xsmall kiss-flex" v-for="loc in locales">
                                    <div class="kiss-width-1-4 kiss-width-1-5@xl kiss-size-xsmall kiss-flex kiss-flex-middle kiss-padding-small kiss-bgcolor-contrast kiss-text-upper">
                                        <icon class="kiss-margin-xsmall-right">language</icon> {{ loc.name || loc.i18n}}
                                    </div>
                                    <div class="kiss-flex-1 kiss-padding-small">
                                        <input class="kiss-input" type="text" v-model="project.values[loc.i18n][key.name].value">
                                    </div>
                                </div>

                            </div>
                        </kiss-row>
                    </kiss-card>

                </div>
                <div class="kiss-width-1-4@m kiss-width-1-5@xl">

                    <div class="kiss-margin">

                        <div class="kiss-text-caption kiss-size-xsmall kiss-text-bold">{{ t('Locales') }}</div>

                        <kiss-card class="kiss-padding-small kiss-margin-small kiss-text-bolder kiss-text-muted kiss-size-small kiss-color-muted kiss-flex kiss-flex-middle" theme="bordered" v-if="!project.locales.length">
                            <span class="kiss-flex-1 kiss-margin-small-right">{{ t('No locales.') }}</span>
                            <a class="kiss-size-xsmall" href="<?=$this->route('/settings/locales')?>">{{ t('Manage') }}</a>
                        </kiss-card>

                        <div class="kiss-margin-small" v-if="project.locales.length">

                            <kiss-card class="kiss-position-relative kiss-padding-small kiss-margin-small kiss-text-bolder kiss-flex kiss-flex-middle" :class="{'kiss-color-muted': loc.visible === false}" theme="bordered" v-for="(loc, idx) in project.locales">
                                <icon class="kiss-margin-small-right" :class="{'kiss-color-primary': loc.visible !== false}">{{ loc.visible !== false ? 'visibility' : 'visibility_off' }}</icon>
                                <span class="kiss-size-small kiss-flex-1">{{ loc.name || loc.i18n }}</span>
                                <a class="kiss-cover" @click="loc.visible = (loc.visible === false ? true : false)"></a>
                            </kiss-card>
                        </div>

                    </div>

                </div>
            </kiss-row>

            <app-actionbar>

                <kiss-container>
                    <div class="kiss-flex kiss-flex-middle">

                        <div class="kiss-flex kiss-flex-middle kiss-margin-large-right">
                            <div>
                                <div class="kiss-size-xsmall kiss-text-caption"><?=t('Keys')?></div>
                                <div class="kiss-size-bold">{{ project.keys.length }}</div>
                            </div>
                        </div>

                        <div class="kiss-flex-1 kiss-margin-right">
                            <a class="kiss-button" @click="addKey()"><?=t('Add key')?></a>
                        </div>

                        <div>
                            <div class="kiss-button-group">
                                <a class="kiss-button" href="<?=$this->route('/lokalize/projects')?>"><?=t('Close')?></a>
                                <a class="kiss-button kiss-button-primary" @click="save()"><?=t('Save project')?></a>
                            </div>
                        </div>
                    </div>
                </kiss-container>

            </app-actionbar>

            <kiss-popoutmenu :open="actionKey && 'true'" @popoutmenuclose="toggleKeyActions(null)">
                <kiss-content>
                        <kiss-navlist v-if="actionKey">
                            <ul>
                                <li class="kiss-nav-header">{{ t('Key actions') }}</li>
                                <li class="kiss-color-muted kiss-margin-small-bottom"><span>{{ actionKey.name }}</span></li>
                                <li>
                                    <a class="kiss-flex kiss-flex-middle" @click="editKey(actionKey)">
                                        <icon class="kiss-margin-small-right">create</icon>
                                        <?=t('Edit')?>
                                    </a>
                                </li>
                                <li class="kiss-nav-divider"></li>
                                <li>
                                    <a class="kiss-color-danger kiss-flex kiss-flex-middle" @click="removeKey(actionKey)">
                                        <icon class="kiss-margin-small-right">delete</icon>
                                        <?=t('Delete')?>
                                    </a>
                                </li>
                            </ul>
                        </kiss-navlist>
                </kiss-content>
            </kiss-popoutmenu>
        </template>

        <script type="module">

            export default {
                data() {

                    return {
                        project: <?=json_encode($project)?>,
                        saving: false,
                        actionKey: null
                    }
                },

                computed: {
                    locales() {
                        return this.project.locales.filter(l => l.visible !== false);
                    }
                },

                methods: {

                    addKey() {

                        let key = {
                            name: '',
                            info: '',
                            tags: [],
                        };

                        App.utils.vueModal('lokalize:assets/dialog/key.js', {lkey: key}, {
                            save: (key) => {
                                this.project.keys.push(key);

                                this.project.locales.forEach(locale => {
                                    this.project.values[locale.i18n][key.name] = {value: null};
                                });
                            }
                        }, {size:'large'})
                    },

                    editKey(key) {

                        App.utils.vueModal('lokalize:assets/dialog/key.js', {lkey: key}, {
                            save: (eKey) => {

                                // did keyname change?
                                if (key.name != eKey.name) {

                                    this.project.locales.forEach(locale => {
                                        this.project.values[locale.i18n][eKey.name] = this.project.values[locale.i18n][key.name];
                                        delete this.project.values[locale.i18n][key.name]
                                    });
                                }

                                Object.assign(key, eKey);
                            }
                        }, {size:'large'})
                    },

                    removeKey(key) {

                        this.project.keys.splice(this.project.keys.indexOf(key), 1);

                        this.project.locales.forEach(locale => {
                            delete this.project.values[locale.i18n][key.name];
                        });
                    },

                    save() {

                        this.$request(`/lokalize/projects/update/${this.project.name}`, {keys: this.project.keys, values: this.project.values}).then(project => {

                            this.project = Object.assign(this.project, project);
                            this.saving = false;

                            App.ui.notify('Project updated!');
                        }).catch(res => {
                            this.saving = false;
                            App.ui.notify(res.error || 'Saving failed!', 'error');
                        });

                    },

                    toggleKeyActions(key) {

                        if (!key) {
                            setTimeout(() => this.actionKey = null, 300);
                            return;
                        }

                        this.actionKey = key;
                    }
                }
            }

        </script>

    </vue-view>

</kiss-container>