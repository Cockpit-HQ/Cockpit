<kiss-container class="kiss-margin-large">

    <vue-view>

        <template>

            <kiss-row class="kiss-row-large kiss-margin-large" :class="{'kiss-disabled': saving}">
                <div class="kiss-flex-1">
                    <div class="kiss-width-3-4@m kiss-margin-auto">

                        <app-fieldcontainer class="kiss-margin-large">

                            <label class="kiss-size-5 kiss-flex kiss-flex-middle">
                                <icon class="kiss-size-4 kiss-margin-small-right">saved_search</icon>
                                <span><?=t('SEO')?></span>
                                <icon class="kiss-margin-xsmall-left">language</icon>
                            </label>

                            <div class="kiss-margin" v-for="locale in visibleLocales">

                                <span class="kiss-badge kiss-badge-outline kiss-color-primary" v-if="locales.length > 1">{{ locale.i18n }}</span>

                                <div class="kiss-margin-small">
                                    <div class="kiss-size-xsmall kiss-color-muted kiss-margin-small-bottom"><?=t('Default Title')?></div>
                                    <field-text v-model="settings['seo'+(locale.i18n!='default' ? '_'+locale.i18n:'')].title" :show-count="true"></field-text>
                                </div>

                                <div class="kiss-margin-small">
                                    <div class="kiss-size-xsmall kiss-color-muted kiss-margin-small-bottom"><?=t('Default Keywords')?></div>
                                    <field-text v-model="settings['seo'+(locale.i18n!='default' ? '_'+locale.i18n:'')].keywords" :show-count="true"></field-text>
                                </div>

                                <div class="kiss-margin-small">
                                    <div class="kiss-size-xsmall kiss-color-muted kiss-margin-small-bottom"><?=t('Default Description')?></div>
                                    <field-text v-model="settings['seo'+(locale.i18n!='default' ? '_'+locale.i18n:'')].description" :multiline="true" :show-count="true"></field-text>
                                </div>
                            </div>

                        </app-fieldcontainer>

                        <app-tabs class="kiss-margin-large">

                            <tab :caption="t('Images')">
                                <app-fieldcontainer class="kiss-margin-large">

                                    <label class="kiss-size-5 kiss-flex kiss-flex-middle">
                                        <icon class="kiss-size-4 kiss-margin-small-right">photo_library</icon>
                                        <?=t('Images')?>
                                    </label>

                                    <kiss-row class="kiss-child-width-1-3@m kiss-margin-small-top">
                                        <div>
                                            <div class="kiss-size-xsmall kiss-color-muted kiss-margin-small-bottom"><?=t('Logo')?></div>
                                            <field-asset v-model="settings.images.logo"></field-asset>
                                        </div>
                                        <div>
                                            <div class="kiss-size-xsmall kiss-color-muted kiss-margin-small-bottom"><?=t('Small logo')?></div>
                                            <field-asset v-model="settings.images.small"></field-asset>
                                        </div>
                                        <div>
                                            <div class="kiss-size-xsmall kiss-color-muted kiss-margin-small-bottom"><?=t('Favicon')?></div>
                                            <field-asset v-model="settings.images.favicon"></field-asset>
                                        </div>
                                    </kiss-row>

                                </app-fieldcontainer>
                            </tab>

                            <tab :caption="t('Scripts')">
                                <app-fieldcontainer class="kiss-margin-large">

                                    <label class="kiss-size-5 kiss-flex kiss-flex-middle">
                                        <icon class="kiss-size-4 kiss-margin-small-right">code</icon>
                                        <?=t('Scripts')?>
                                    </label>

                                    <div class="kiss-margin-small">
                                        <div class="kiss-size-xsmall kiss-color-muted kiss-margin-small-bottom"><?=t('Header')?></div>
                                        <field-code v-model="settings.scripts.header" mode="html"></field-code>
                                    </div>
                                    <div class="kiss-margin-small">
                                        <div class="kiss-size-xsmall kiss-color-muted kiss-margin-small-bottom"><?=t('Footer')?></div>
                                        <field-code v-model="settings.scripts.footer" mode="html"></field-code>
                                    </div>

                                </app-fieldcontainer>
                            </tab>

                            <tab :caption="t('Meta')">
                                <app-fieldcontainer class="kiss-margin-large">

                                    <label class="kiss-size-5 kiss-flex kiss-flex-middle">
                                        <icon class="kiss-size-4 kiss-margin-small-right">scatter_plot</icon>
                                        <?=t('Meta')?>
                                    </label>

                                    <div class="kiss-margin-small">
                                        <field-object v-model="settings.meta"></field-object>
                                    </div>

                                </app-fieldcontainer>
                            </tab>
                        </app-tabs>
                    </div>
                </div>
                <div class="kiss-width-1-4@m">

                    <div class="kiss-margin">

                        <div class="kiss-text-caption kiss-size-xsmall kiss-text-bold">{{ t('Translation') }}</div>

                        <kiss-card class="kiss-padding-small kiss-margin-small kiss-text-muted kiss-size-small kiss-color-muted kiss-flex kiss-flex-middle" theme="bordered" v-if="locales.length == 1">
                            <span class="kiss-flex-1 kiss-margin-small-right">{{ t('No locales.') }}</span>
                            <a class="kiss-size-xsmall kiss-text-bolder" href="<?=$this->route('/settings/locales')?>">{{ t('Manage') }}</a>
                        </kiss-card>

                        <div class="kiss-margin-small" v-if="locales.length > 1">

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


            <app-actionbar>

                <kiss-container>
                    <div class="kiss-flex kiss-flex-middle kiss-flex-right">

                        <button class="kiss-button kiss-button-primary" @click="save">
                            <?=t('Save settings')?>
                        </button>
                    </div>
                </kiss-container>

            </app-actionbar>

        </template>

        <script type="module">

            export default {

                data() {
                    return {
                        settings: <?=json_encode($settings)?>,
                        locales: <?=json_encode($locales)?>,
                        saving: false
                    }
                },

                computed: {
                    visibleLocales() {
                        return this.locales.filter(l => l.visible);
                    }
                },

                methods: {

                    save() {

                        this.saving = true;

                        this.$request('/pages/settings/save', {settings: this.settings}).then(settings => {

                            this.saving = false;
                            App.ui.notify('Settings updated!');

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