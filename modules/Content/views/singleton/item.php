<kiss-container class="kiss-margin">

    <ul class="kiss-breadcrumbs">
        <li><a href="<?=$this->route('/content')?>"><?=t('Content')?></a></li>
    </ul>

    <div class="kiss-flex kiss-flex-middle">
        <div class="kiss-margin-small-right">
            <kiss-svg class="kiss-margin-auto" src="<?=$this->base('content:assets/icons/singleton.svg')?>" width="35" height="35" style="color:<?=($this->escape($model['color'] ?? 'inherit'))?>"><canvas width="35" height="35"></canvas></kiss-svg>
        </div>
        <div class="kiss-margin-small-right">
            <div class="kiss-size-large kiss-text-bold"><?=$this->escape($model['label'] ? $model['label'] : $model['name'])?></div>
        </div>
        <div>
            <a class="kiss-size-large" kiss-popoutmenu="#model-item-menu-actions"><icon>more_horiz</icon></a>
        </div>
    </div>

</kiss-container>

<hr class="kiss-margin-large">

<kiss-container>

    <vue-view>

        <template>

            <kiss-card class="kiss-margin-large kiss-size-5 kiss-align-center kiss-color-muted kiss-text-bolder kiss-padding-large" theme="bordered" v-if="!fields.length">
                <?=t('No fields defined')?>
            </kiss-card>

            <kiss-row class="kiss-row-large kiss-margin-large" :class="{'kiss-disabled': saving}" v-if="fields.length">
                <div class="kiss-flex-1">
                    <div class="kiss-width-2-3@xl kiss-margin-auto">
                        <fields-renderer v-model="item" :fields="fields" :locales="visibleLocales"></fields-renderer>
                    </div>
                </div>
                <div class="kiss-width-1-4@m kiss-width-1-5@xl">

                    <div class="kiss-margin" v-if="item._id">

                        <div class="kiss-text-caption kiss-size-xsmall kiss-text-bold">{{ t('Document') }}</div>

                        <kiss-card class="kiss-margin-small kiss-bgcolor-contrast kiss-padding-small">

                            <div class="kiss-margin-xsmall">
                                <div class="kiss-flex kiss-flex-middle">
                                    <div class="kiss-size-4 kiss-margin-small-right kiss-flex kiss-color-muted" :title="t('Created at')"><icon>more_time</icon></div>
                                    <div class="kiss-text-truncate kiss-size-small kiss-text-monospace kiss-color-muted kiss-flex-1">{{ (new Date(item._created * 1000).toLocaleString()) }}</div>
                                    <div><icon>account_circle</icon></div>
                                </div>
                            </div>

                            <div class="kiss-margin-xsmall" v-if="item._created != item._modified">
                                <div class="kiss-flex kiss-flex-middle">
                                    <div class="kiss-size-4 kiss-margin-small-right kiss-flex kiss-color-muted" :title="t('Modified at')"><icon>history</icon></div>
                                    <div class="kiss-text-truncate kiss-size-small kiss-text-monospace kiss-color-muted kiss-flex-1">{{ (new Date(item._modified * 1000).toLocaleString()) }}</div>
                                    <div><icon>account_circle</icon></div>
                                </div>
                            </div>

                        </kiss-card>
                    </div>

                    <div class="kiss-margin">

                        <div class="kiss-text-caption kiss-size-xsmall kiss-text-bold">{{ t('State') }}</div>

                        <div class="kiss-margin-small">
                            <button type="button" class="kiss-button kiss-flex kiss-flex-middle kiss-width-expand kiss-align-left" :class="{'kiss-bgcolor-danger': !item._state, 'kiss-bgcolor-success': item._state == 1}" kiss-popoutmenu="#model-item-menu-state">
                                <span class="kiss-flex-1" v-if="item._state == 1">{{ t('Published') }}</span>
                                <span class="kiss-flex-1" v-if="!item._state">{{ t('Unpublished') }}</span>
                                <icon>expand_more</icon>
                            </button>
                        </div>

                    </div>

                    <div class="kiss-margin" v-if="hasLocales">

                        <div class="kiss-text-caption kiss-size-xsmall kiss-text-bold">{{ t('Translation') }}</div>

                        <kiss-card class="kiss-padding-small kiss-margin-small kiss-text-bolder kiss-text-muted kiss-size-small kiss-color-muted kiss-flex kiss-flex-middle" theme="bordered" v-if="!locales.length">
                            <span class="kiss-flex-1 kiss-margin-small-right">{{ t('No locales.') }}</span>
                            <a class="kiss-size-xsmall" href="<?=$this->route('/settings/locales')?>">{{ t('Manage') }}</a>
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

                    <div class="kiss-margin kiss-visible@m" v-if="model.preview && model.preview.length">

                        <div class="kiss-text-caption kiss-size-xsmall kiss-text-bold kiss-margin-small-bottom">{{ t('Content preview') }}</div>

                        <a class="kiss-button kiss-width-1-1" kiss-popoutmenu="#model-item-preview-links" v-if="model.preview.length > 1">{{ t('Open preview') }}</a>
                        <a class="kiss-button kiss-width-1-1" @click="showPreviewUri(model.preview[0].uri)" v-if="model.preview.length == 1">{{ t('Open preview') }}</a>
                    </div>

                </div>
            </kiss-row>

            <app-actionbar :class="{'kiss-disabled': saving}">

                <kiss-container>
                    <div class="kiss-flex kiss-flex-middle">
                        <div class="kiss-flex-1"></div>
                        <div class="kiss-button-group">
                            <a class="kiss-button" href="<?=$this->route("/content")?>">
                                <?=t('Close')?>
                            </a>
                            <a class="kiss-button kiss-button-primary" @click="save()">
                                <?=t('Save')?>
                            </a>
                        </div>
                    </div>
                </kiss-container>

            </app-actionbar>

            <kiss-popoutmenu id="model-item-menu-actions">
                <kiss-content>
                    <kiss-navlist class="kiss-margin">
                        <ul>
                            <li class="kiss-nav-header"><?=t('Model actions')?></li>
                            <li>
                                <a class="kiss-flex kiss-flex-middle" @click="showJSON()">
                                    <icon class="kiss-margin-small-right">manage_search</icon>
                                    <?=t('Json Object')?>
                                </a>
                            </li>
                            <li class="kiss-nav-divider"></li>
                            <li>
                                <a class="kiss-flex kiss-flex-middle" href="<?=$this->route("/content/models/edit/{$model['name']}")?>">
                                    <icon class="kiss-margin-small-right">create</icon>
                                    <?=t('Edit model')?>
                                </a>
                            </li>
                        </ul>
                    </kiss-navlist>
                </kiss-content>
            </kiss-popoutmenu>

            <kiss-popoutmenu id="model-item-menu-state">
                <kiss-content>
                    <kiss-navlist class="kiss-margin">
                        <ul>
                            <li class="kiss-nav-header"><?=t('Change state to')?></li>
                            <li v-show="item._state != 1">
                                <a class="kiss-flex kiss-flex-middle kiss-color-success kiss-text-bold" @click="item._state=1">
                                    <icon class="kiss-margin-small-right">bookmark</icon>
                                    <?=t('Published')?>
                                </a>
                            </li>
                            <li v-show="item._state">
                                <a class="kiss-flex kiss-flex-middle kiss-color-danger kiss-text-bold" @click="item._state=0">
                                    <icon class="kiss-margin-small-right">bookmark</icon>
                                    <?=t('Unpublished')?>
                                </a>
                            </li>
                        </ul>
                    </kiss-navlist>
                </kiss-content>
            </kiss-popoutmenu>

            <kiss-popoutmenu id="model-item-preview-links" v-if="model.preview && model.preview.length">
                <kiss-content>
                    <kiss-navlist class="kiss-margin">
                        <ul>
                            <li class="kiss-nav-header"><?=t('Open preview')?></li>
                            <li v-for="preview in model.preview">
                                <a class="kiss-flex kiss-flex-middle" @click="showPreviewUri(preview.uri)">
                                    <icon class="kiss-margin-small-right">travel_explore</icon>
                                    {{ preview.name }}
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
                        model: <?=json_encode($model)?>,
                        item: <?=json_encode($item)?>,
                        fields: <?=json_encode($fields)?>,
                        locales: <?=json_encode($locales)?>,
                        saving: false
                    }
                },

                components: {
                    'fields-renderer': 'settings:assets/vue-components/fields-renderer.js',
                },

                computed: {
                    hasLocales() {

                        for (let i=0;i<this.fields.length;i++) {
                            if (this.fields[i].i18n) return true;
                        }
                        return false;
                    },
                    visibleLocales() {
                        return this.locales.filter(l => l.visible);
                    }
                },

                mounted() {

                },

                methods: {

                    save() {

                        let model = this.model.name;

                        this.saving = true;

                        this.$request(`/content/models/saveItem/${model}`, {item: this.item}).then(item => {
                            this.item = Object.assign(this.item, item);
                            this.saving = false;
                            App.ui.notify('Data updated!');
                        }).catch(rsp => {
                            this.saving = false;
                            App.ui.notify(rsp.error || 'Saving failed!', 'error');
                        });
                    },

                    showJSON() {
                        App.utils.vueOffcanvas('settings:assets/dialogs/json-viewer.js', {data: this.item}, {}, {flip: true, size: 'large'})
                    },

                    showPreviewUri(uri) {

                        App.utils.vueOffcanvas('settings:assets/dialogs/content-preview.js', {
                            uri,
                            fields: this.model.fields,
                            item: this.item,
                            locales: this.hasLocales ? this.locales : [],
                            context: {
                                model: this.model.name
                            }
                        }, {
                            update: (item) => {
                                this.item = Object.assign(this.item, item);
                            }
                        }, {size: 'screen'})
                    }
                }
            }
        </script>

    </vue-view>

</kiss-container>