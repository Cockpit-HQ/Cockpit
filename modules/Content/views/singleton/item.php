<kiss-container class="kiss-margin-small">

    <ul class="kiss-breadcrumbs">
        <li><a href="<?=$this->route('/content')?>"><?=t('Content')?></a></li>
    </ul>

    <div class="kiss-flex kiss-flex-middle">
        <div class="kiss-margin-small-right">
            <kiss-svg class="kiss-margin-auto" src="<?=$this->base(isset($model['icon']) && $model['icon'] ? $model['icon'] : 'content:assets/icons/singleton.svg')?>" width="30" height="30" style="color:<?=($this->escape($model['color'] ?? 'inherit'))?>"><canvas width="35" height="35"></canvas></kiss-svg>
        </div>
        <a class="kiss-color-muted kiss-margin-small-right" onclick="VueView.ui.offcanvas('content:assets/dialogs/switch-model-view.js')">
            <icon>expand_circle_down</icon>
        </a>
        <div class="kiss-margin-small-right">
            <div class="kiss-size-5 kiss-text-bold"><?=$this->escape($model['label'] ? $model['label'] : $model['name'])?></div>
        </div>
        <div>
            <a class="kiss-size-large" href kiss-popout="#model-item-menu-actions"><icon>more_horiz</icon></a>
        </div>
    </div>

</kiss-container>


<kiss-container class="kiss-margin-large-top">

    <vue-view>

        <template>

            <div class="kiss-height-50vh kiss-flex kiss-flex-middle kiss-flex-center kiss-align-center" v-if="!fields.length">
                <div class="animated fadeInUp kiss-color-muted">
                    <kiss-svg class="kiss-margin-auto" src="<?= $this->base('content:assets/icons/singleton.svg') ?>" width="40" height="40"><canvas width="40" height="40"></canvas></kiss-svg>
                    <div class="kiss-size-large kiss-margin-small-top"><?=t('No fields defined')?></div>
                </div>
            </div>

            <kiss-row class="kiss-margin-large" gap="large" :class="{'kiss-disabled': saving}" v-if="fields.length">
                <div class="kiss-visible@m kiss-width-1-5@m kiss-width-1-8@xl kiss-width-max-small">
                    <kiss-sticky id="content-fields-outline" data-offset="20"></kiss-sticky>
                </div>
                <div class="kiss-flex-1">
                    <fields-renderer v-model="item" :fields="fields" :locales="locales" outline="#content-fields-outline"></fields-renderer>
                </div>
                <div class="kiss-width-1-4@m kiss-width-1-5@xl">

                    <div class="kiss-margin" v-if="item._id">

                        <div class="kiss-text-caption kiss-size-xsmall kiss-text-bold">{{ t('Document') }}</div>

                        <kiss-card class="kiss-margin-small kiss-bgcolor-contrast kiss-padding-small">

                            <div class="kiss-margin-xsmall">
                                <div class="kiss-flex kiss-flex-middle">
                                    <div class="kiss-size-4 kiss-margin-small-right kiss-flex kiss-color-muted" :title="t('Created at')"><icon>more_time</icon></div>
                                    <div class="kiss-text-truncate kiss-size-small kiss-text-monospace kiss-color-muted kiss-flex-1"><app-datetime :datetime="item._created" /></div>
                                    <user-info :user-id="item._cby"></user-info>
                                </div>
                            </div>

                            <div class="kiss-margin-xsmall" v-if="item._created != item._modified">
                                <div class="kiss-flex kiss-flex-middle">
                                    <div class="kiss-size-4 kiss-margin-small-right kiss-flex kiss-color-muted" :title="t('Modified at')"><icon>history</icon></div>
                                    <div class="kiss-text-truncate kiss-size-small kiss-text-monospace kiss-color-muted kiss-flex-1"><app-datetime :datetime="item._modified" /></div>
                                    <user-info :user-id="item._mby"></user-info>
                                </div>
                            </div>

                        </kiss-card>
                    </div>

                    <?php if ($this->helper('acl')->isAllowed("content/{$model['name']}/publish")): ?>
                    <div class="kiss-margin">

                        <div class="kiss-text-caption kiss-size-xsmall kiss-text-bold">{{ t('State') }}</div>

                        <div class="kiss-margin-small">
                            <button type="button" class="kiss-button kiss-flex kiss-flex-middle kiss-width-expand kiss-align-left" :class="{'kiss-bgcolor-danger': !item._state, 'kiss-bgcolor-success': item._state == 1}" kiss-popout="#model-item-menu-state">
                                <span class="kiss-flex-1" v-if="item._state == 1">{{ t('Published') }}</span>
                                <span class="kiss-flex-1" v-if="!item._state">{{ t('Unpublished') }}</span>
                                <icon>expand_more</icon>
                            </button>
                        </div>

                    </div>
                    <?php endif ?>

                    <div class="kiss-margin" v-if="hasLocales">

                        <div class="kiss-text-caption kiss-size-xsmall kiss-text-bold">{{ t('Translation') }}</div>

                        <kiss-card class="kiss-padding-small kiss-margin-small kiss-text-muted kiss-size-small kiss-color-muted kiss-flex kiss-flex-middle" theme="bordered" v-if="!locales.length">
                            <span class="kiss-flex-1 kiss-margin-small-right">{{ t('No locales.') }}</span>
                            <a class="kiss-size-xsmall kiss-text-bolder" href="<?=$this->route('/system/locales')?>">{{ t('Manage') }}</a>
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

                        <a class="kiss-button kiss-width-1-1" kiss-popout="#model-item-preview-links" v-if="model.preview.length > 1">{{ t('Open preview') }}</a>
                        <a class="kiss-button kiss-width-1-1" @click="showPreviewUri(model.preview[0].uri)" v-if="model.preview.length == 1">{{ t('Open preview') }}</a>
                    </div>

                    <kiss-card class="kiss-margin kiss-padding kiss-visible@m" theme="contrast bordered" hover="shadow" v-if="model.revisions && item._id">

                        <div class="kiss-text-caption kiss-size-xsmall kiss-text-bold kiss-margin-small-bottom">{{ t('Revisions') }}</div>
                        <revisions-widget :oid="item._id" :current="item"></revisions-widget>

                    </kiss-card>

                    <?php $this->trigger('content.singleton.item.aside', [$model]) ?>

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
                            <a class="kiss-button kiss-button-primary" :class="{'kiss-disabled': item._id && !isModified}" @click="save()">
                                <?=t('Save')?>
                            </a>
                        </div>
                    </div>
                </kiss-container>

            </app-actionbar>

            <kiss-popout id="model-item-menu-actions">
                <kiss-content>
                    <kiss-navlist class="kiss-margin">
                        <ul>
                            <li class="kiss-nav-header"><?=t('Model actions')?></li>
                            <li>
                                <a class="kiss-flex kiss-flex-middle" href @click.prevent="showJSON()">
                                    <icon class="kiss-margin-small-right">manage_search</icon>
                                    <?=t('JSON Object')?>
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
            </kiss-popout>

            <?php if ($this->helper('acl')->isAllowed("content/{$model['name']}/publish")): ?>
            <kiss-popout id="model-item-menu-state">
                <kiss-content>
                    <kiss-navlist class="kiss-margin-small">

                        <strong class="kiss-text-bold kiss-text-caption"><?=t('State')?></strong>

                        <ul class="app-list-items kiss-margin-small-top">
                            <li>
                                <a class="kiss-flex kiss-flex-middle" :class="{'kiss-color-muted': item._state != 1, 'kiss-text-bold': item._state == 1}" @click="item._state=1">
                                    <icon class="kiss-margin-small-right">{{ item._state != 1 ? 'radio_button_unchecked' : 'radio_button_checked'}}</icon>
                                    <?=t('Published')?>
                                </a>
                            </li>
                            <li>
                                <a class="kiss-flex kiss-flex-middle" :class="{'kiss-color-muted': item._state != 0, 'kiss-text-bold': item._state == 0}" @click="item._state=0">
                                    <icon class="kiss-margin-small-right">{{ item._state != 0 ? 'radio_button_unchecked' : 'radio_button_checked'}}</icon>
                                    <?=t('Unpublished')?>
                                </a>
                            </li>
                        </ul>
                    </kiss-navlist>
                </kiss-content>
            </kiss-popout>
            <?php endif ?>

            <kiss-popout id="model-item-preview-links" v-if="model.preview && model.preview.length">
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
            </kiss-popout>

        </template>

        <script type="module">

            export default {
                data() {
                    return {
                        model: <?=json_encode($model)?>,
                        item: <?=json_encode($item)?>,
                        fields: <?=json_encode($fields)?>,
                        locales: <?=json_encode($locales)?>,
                        saving: false,
                        savedItemState: null
                    }
                },

                computed: {

                    isModified() {
                        return JSON.stringify(this.item) != this.savedItemState;
                    },

                    hasLocales() {

                        for (let i=0;i<this.fields.length;i++) {
                            if (this.fields[i].i18n) return true;
                        }
                        return false;
                    }
                },

                mounted() {

                    setTimeout(() => {

                        this.savedItemState = JSON.stringify(this.item);

                        window.onbeforeunload = e => {

                            if (this.isModified) {
                                e.preventDefault();
                                e.returnValue = this.t('You have unsaved data! Are you sure you want to leave?');
                            }
                        };

                    }, 1500);

                },

                methods: {

                    save() {

                        let validate = {root: this.$el.parentNode};

                        App.trigger('fields-renderer-validate', validate);

                        if (validate.errors) {
                            return;
                        }

                        let model = this.model.name;

                        this.saving = true;

                        this.$request(`/content/models/saveItem/${model}`, {item: this.item}).then(item => {

                            this.item = Object.assign(this.item, item);

                            setTimeout(() => this.savedItemState = JSON.stringify(this.item), 20);

                            this.saving = false;
                            App.ui.notify('Data updated!');

                        }).catch(rsp => {
                            this.saving = false;
                            App.ui.notify(rsp.error || 'Saving failed!', 'error');
                        });
                    },

                    showJSON() {
                        VueView.ui.offcanvas('system:assets/dialogs/json-viewer.js', {data: this.item}, {})
                    },

                    showPreviewUri(uri) {

                        VueView.ui.offcanvas('system:assets/dialogs/content-preview.js', {
                            uri,
                            fields: this.model.fields,
                            item: this.item,
                            locales: this.hasLocales ? this.locales : [],
                            context: {
                                model: this.model.name
                            },
                            resolver: KISS.utils.debounce((data, update) => {

                                this.$request(`/content/populate`, {data: data.data, locale: data.locale}).then(resolvedData => {
                                    update(Object.assign(data, {data: resolvedData}));
                                }).catch(error => {

                                });

                            }, 350)
                        }, {
                            update: (item) => {
                                this.item = Object.assign(this.item, item);
                            }
                        });
                    }
                }
            }
        </script>

    </vue-view>

</kiss-container>
