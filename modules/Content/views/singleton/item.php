<kiss-container class="kiss-margin">

    <ul class="kiss-breadcrumb">
        <li><a href="<?=$this->route('/content')?>"><?=t('Content')?></a></li>
    </ul>

    <vue-view>

        <template>

            <div class="kiss-flex kiss-flex-middle">
                <div class="kiss-margin-right">
                    <kiss-svg class="kiss-margin-auto" src="<?=$this->base('content:icon.svg')?>" width="35" height="35" style="color:<?=($this->escape($model['color'] ?? 'inherit'))?>"><canvas width="35" height="35"></canvas></kiss-svg>
                </div>
                <div class="kiss-margin-small-right">
                    <div class="kiss-size-large kiss-text-bold"><?=$this->escape($model['label'] ? $model['label'] : $model['name'])?></div>
                </div>
                <div>
                    <a class="kiss-size-large" kiss-popoutmenu="#model-item-menu-actions"><icon>more_horiz</icon></a>
                </div>
            </div>

            <div class="kiss-margin-large kiss-size-5 kiss-align-center kiss-text-bolder" v-if="!fields.length">
                <?=t('No fields defined')?>
            </div>

            <kiss-row class="kiss-row-large kiss-margin-large" v-if="fields.length">
                <div class="kiss-flex-1">
                    <div class="kiss-width-2-3@xl">
                        <fields-renderer v-model="item" :fields="fields" :locales="visibleLocales"></fields-renderer>
                    </div>
                </div>
                <div class="kiss-width-1-4@m kiss-width-1-5@xl">

                    <div class="kiss-margin" v-if="hasLocales">

                        <div class="kiss-text-bold kiss-size-xsmall kiss-text-upper">{{ t('Localeizations') }}</div>

                        <kiss-card class="kiss-padding-small kiss-margin kiss-text-bolder kiss-text-muted kiss-size-small kiss-color-muted kiss-flex kiss-flex-middle" theme="bordered" v-if="!locales.length">
                            <span class="kiss-flex-1 kiss-margin-small-right">{{ t('No locales.') }}</span>
                            <a class="kiss-size-xsmall" href="<?=$this->route('/settings/locales')?>">{{ t('Manage') }}</a>
                        </kiss-card>

                        <div class="kiss-margin" v-if="locales.length">

                            <kiss-card class="kiss-position-relative kiss-padding-small kiss-margin-small kiss-text-bolder kiss-flex kiss-flex-middle" :class="{'kiss-color-muted': !loc.visible}" theme="bordered" v-for="loc in locales">
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
                    <div class="kiss-flex kiss-flex-middle">
                        <div class="kiss-flex-1"></div>
                        <div class="kiss-button-group">
                            <a class="kiss-button" href="<?=$this->route("/content")?>">
                                <?=t('Close')?>
                            </a>
                            <a class="kiss-button kiss-button-primary">
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
                            <li class="kiss-nav-header"><?=t('Actions')?></li>
                            <li>
                                <a class="kiss-flex kiss-flex-middle" href="#models-item-json" kiss-offcanvas>
                                    <icon class="kiss-margin-small-right">code</icon>
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

            <kiss-offcanvas id="models-item-json" flip="true">
                <kiss-content class="kiss-width-1-3">
                    <div class="kiss-padding">
                        <strong class="kiss-size-small kiss-text-upper">{{ t('JSON Viewer') }}</strong>
                    </div>
                    <json-viewer class="kiss-padding kiss-size-small kiss-bgcolor-contrast" :object="item"></json-viewer>
                </kiss-content>
            </kiss-offcanvas>

        </template>

        <script type="module">

            export default {
                data() {
                    return {
                        item: <?=json_encode($item)?>,
                        fields: <?=json_encode($fields)?>,
                        locales: <?=json_encode($locales)?>,
                        saving: false
                    }
                },

                components: {
                    'fields-renderer': 'settings:assets/vue-components/fields-renderer.js',
                    'json-viewer': 'settings:assets/vue-components/json-viewer.js',
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

                }

            }
        </script>

    </vue-view>

</kiss-container>