<kiss-container class="kiss-margin-large">

    <vue-view>

        <template>

            <kiss-row>

                <div class="kiss-flex-1">

                    <div class="kiss-width-3-4@m kiss-margin-auto">

                        <app-tabs static="true">
                            <ul class="app-tabs-nav">
                                <li :active="group === null">
                                    <a class="app-tabs-nav-link" @click="group = null">{{t('All')}}</a>
                                </li>
                                <li :active="group == 'content'">
                                    <a class="app-tabs-nav-link" @click="group = 'content'">{{ t('Content') }}</a>
                                </li>
                                <li :active="group == 'meta'">
                                    <a class="app-tabs-nav-link" @click="group = 'meta'">{{ t('Meta') }}</a>
                                </li>
                            </ul>
                        </app-tabs>


                        <app-fieldcontainer class="kiss-margin" v-if="!group">

                            <label><?=t('Title')?></label>

                            <div class="kiss-margin-small" v-for="locale in visibleLocales">
                                <span class="kiss-badge kiss-badge-outline kiss-color-primary kiss-margin-small-bottom" v-if="locales.length > 1">{{ locale.i18n }}</span>
                                <field-text v-model="page['title'+(locale.i18n!='default' ? '_'+locale.i18n:'')]"></field-text>

                                <div class="kiss-size-xsmall kiss-color-muted kiss-margin-small"><?=t('Slug')?></div>
                                <input type="text" class="kiss-input kiss-input-small" v-model="page['slug'+(locale.i18n!='default' ? '_'+locale.i18n:'')]">
                            </div>

                        </app-fieldcontainer>

                        <app-fieldcontainer class="kiss-margin-large" v-if="!group">

                            <label class="kiss-flex kiss-flex-middle">
                                <div><?=t('SEO')?></div>
                                <a class="kiss-margin-small-left kiss-link-muted kiss-size-4">
                                    <icon class="kiss-display-block" @click="showSEO = !showSEO">{{ showSEO ? 'remove_circle': 'add_circle' }}</icon>
                                </a>
                            </label>
                            <div class="kiss-margin-small animated fadeIn" v-if="showSEO">
                                <div class="kiss-margin-small" v-for="locale in visibleLocales">

                                    <span class="kiss-badge kiss-badge-outline kiss-color-primary" v-if="locales.length > 1">{{ locale.i18n }}</span>

                                    <div class="kiss-margin-small">
                                        <div class="kiss-size-xsmall kiss-color-muted kiss-margin-small-bottom"><?=t('Title')?></div>
                                        <field-text v-model="page['seo'+(locale.i18n!='default' ? '_'+locale.i18n:'')].title" :show-count="true"></field-text>
                                    </div>

                                    <div class="kiss-margin-small">
                                        <div class="kiss-size-xsmall kiss-color-muted kiss-margin-small-bottom"><?=t('Keywords')?></div>
                                        <field-text v-model="page['seo'+(locale.i18n!='default' ? '_'+locale.i18n:'')].keywords" :show-count="true"></field-text>
                                    </div>

                                    <div class="kiss-margin-small">
                                        <div class="kiss-size-xsmall kiss-color-muted kiss-margin-small-bottom"><?=t('Description')?></div>
                                        <field-text v-model="page['seo'+(locale.i18n!='default' ? '_'+locale.i18n:'')].description" :multiline="true" :show-count="true"></field-text>
                                    </div>
                                </div>
                            </div>
                        </app-fieldcontainer>

                        <div class="kiss-margin-large" v-if="!group || group == 'content'">

                            <div class="kiss-flex kiss-flex-middle">
                                <div class="kiss-size-xsmall kiss-text-bold kiss-text-upper kiss-color-muted kiss-margin-small-right"><?=t('Page content')?></div>
                                <hr class="kiss-flex-1 kiss-margin-remove">
                            </div>

                            <app-fieldcontainer class="kiss-margin" v-for="locale in visibleLocales">
                                <span class="kiss-badge kiss-badge-outline kiss-color-primary kiss-margin-small-bottom" v-if="locales.length > 1">{{ locale.i18n }}</span>
                                <fields-renderer v-model="page['data'+(locale.i18n!='default' ? '_'+locale.i18n:'')]" :fields="fields"></fields-renderer>
                            </app-fieldcontainer>
                        </div>

                        <app-fieldcontainer class="kiss-margin-large" v-if="group == 'meta'">

                            <label><?=t('Meta')?></label>

                            <div class="kiss-margin-small" v-for="locale in visibleLocales">
                                <field-object v-model="page._meta"></field-object>
                            </div>

                        </app-fieldcontainer>

                    </div>

                </div>
                <div class="kiss-width-1-4@m kiss-width-1-5@l">

                    <div class="kiss-margin" v-if="page._id">

                        <div class="kiss-text-caption kiss-size-xsmall kiss-text-bold">{{ t('Page') }}</div>

                        <kiss-card class="kiss-margin-small kiss-bgcolor-contrast kiss-padding-small">

                            <div class="kiss-margin-xsmall">
                                <div class="kiss-flex kiss-flex-middle">
                                    <div class="kiss-size-4 kiss-margin-small-right kiss-flex" title="ID"><icon>adjust</icon></div>
                                    <div class="kiss-text-truncate kiss-text-bold kiss-text-monospace kiss-size-small kiss-flex-1">{{ page._id }}</div>
                                    <a :title="t('Copy')" @click="copyID()"><icon>copy</icon></a>
                                </div>
                            </div>

                            <div class="kiss-margin-xsmall">
                                <div class="kiss-flex kiss-flex-middle">
                                    <div class="kiss-size-4 kiss-margin-small-right kiss-flex kiss-color-muted" :title="t('Created at')"><icon>more_time</icon></div>
                                    <div class="kiss-text-truncate kiss-size-small kiss-text-monospace kiss-color-muted kiss-flex-1">{{ (new Date(page._created * 1000).toLocaleString()) }}</div>
                                    <div><icon>account_circle</icon></div>
                                </div>
                            </div>

                            <div class="kiss-margin-xsmall" v-if="page._created != page._modified">
                                <div class="kiss-flex kiss-flex-middle">
                                    <div class="kiss-size-4 kiss-margin-small-right kiss-flex kiss-color-muted" :title="t('Modified at')"><icon>history</icon></div>
                                    <div class="kiss-text-truncate kiss-size-small kiss-text-monospace kiss-color-muted kiss-flex-1">{{ (new Date(page._modified * 1000).toLocaleString()) }}</div>
                                    <div><icon>account_circle</icon></div>
                                </div>
                            </div>

                        </kiss-card>
                    </div>

                    <div class="kiss-margin">

                        <div class="kiss-text-caption kiss-size-xsmall kiss-text-bold">{{ t('State') }}</div>

                        <div class="kiss-margin-small">
                            <button type="button" class="kiss-button kiss-flex kiss-flex-middle kiss-width-expand kiss-align-left" :class="{'kiss-bgcolor-danger': !page._state, 'kiss-bgcolor-success': page._state == 1}" kiss-popoutmenu="#page-menu-state">
                                <span class="kiss-flex-1" v-if="page._state == 1">{{ t('Published') }}</span>
                                <span class="kiss-flex-1" v-if="!page._state">{{ t('Unpublished') }}</span>
                                <span class="kiss-flex-1" v-if="page._state == -1">{{ t('Archive') }}</span>
                                <icon>expand_more</icon>
                            </button>
                        </div>

                    </div>

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

            <kiss-popoutmenu id="page-menu-state">
                <kiss-content>
                    <kiss-navlist class="kiss-margin">
                        <ul>
                            <li class="kiss-nav-header"><?=t('Change state to')?></li>
                            <li v-show="page._state != 1">
                                <a class="kiss-flex kiss-flex-middle kiss-color-success kiss-text-bold" @click="page._state=1">
                                    <icon class="kiss-margin-small-right">bookmark</icon>
                                    <?=t('Published')?>
                                </a>
                            </li>
                            <li v-show="page._state">
                                <a class="kiss-flex kiss-flex-middle kiss-color-danger kiss-text-bold" @click="page._state=0">
                                    <icon class="kiss-margin-small-right">bookmark</icon>
                                    <?=t('Unpublished')?>
                                </a>
                            </li>
                            <li v-show="page._state != -1">
                                <a class="kiss-flex kiss-flex-middle kiss-color-muted kiss-text-bold" @click="page._state=-1">
                                    <icon class="kiss-margin-small-right">bookmark</icon>
                                    <?=t('Archive')?>
                                </a>
                            </li>
                        </ul>
                    </kiss-navlist>
                </kiss-content>
            </kiss-popoutmenu>


            <app-actionbar>

                <kiss-container>
                    <div class="kiss-flex kiss-flex-middle">
                        <div class="kiss-button-group" v-if="page._id">
                            <a class="kiss-button" href="<?=$this->route("/pages/page")?>">
                                <?=t('Create new page')?>
                            </a>
                        </div>
                        <div class="kiss-flex-1"></div>
                        <div class="kiss-button-group">
                            <a class="kiss-button" href="<?=$this->route("/pages")?>">
                                <span v-if="!page._id"><?=t('Cancel')?></span>
                                <span v-if="page._id"><?=t('Close')?></span>
                            </a>
                            <a class="kiss-button kiss-button-primary" @click="save()">
                                <span v-if="!page._id"><?=t('Create page')?></span>
                                <span v-if="page._id"><?=t('Update page')?></span>
                            </a>
                        </div>
                    </div>
                </kiss-container>

            </app-actionbar>


        </template>

        <script type="module">

            export default {

                data() {
                    return {
                        page: <?=json_encode($page)?>,
                        locales: <?=json_encode($locales)?>,
                        group: null,
                        showSEO: false,
                        fields: [
                            {name: 'layout', type: 'layout'}
                        ]
                    }
                },

                components: {
                    'fields-renderer': 'settings:assets/vue-components/fields-renderer.js',
                },

                computed: {
                    visibleLocales() {
                        return this.locales.filter(l => l.visible);
                    }
                },

                methods: {

                    copyID() {
                        App.utils.copyText(this.page._id, () =>  App.ui.notify('ID copied!'));
                    },

                    save() {

                        if (!this.page.title.trim()) {
                            App.ui.notify('Default page title is missing!', 'error');
                            return;
                        }

                        let isUpdate = this.page._id;

                        this.$request('/pages/save', {page: this.page}).then(page => {

                            Object.assign(this.page, page);

                            if (isUpdate) {
                                App.ui.notify('Page updated!');
                            } else {
                                App.ui.notify('Page created!');
                                this.isUpdate = true;
                            }

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