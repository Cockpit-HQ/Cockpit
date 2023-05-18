<kiss-container class="kiss-margin-large">

    <ul class="kiss-breadcrumbs">
        <li><a href="<?=$this->route('/content')?>"><?=t('Content')?></a></li>
    </ul>

    <vue-view>
        <template>

            <app-loader class="kiss-margin-large" v-if="loading"></app-loader>

            <div class="animated fadeIn kiss-height-30vh kiss-flex kiss-flex-middle kiss-flex-center kiss-align-center kiss-color-muted kiss-margin-large" v-if="!loading && !models.length">
                <div>
                    <kiss-svg src="<?=$this->base('content:icon.svg')?>" width="40" height="40"></kiss-svg>
                    <p class="kiss-size-large kiss-margin-top"><?=t('No models')?></p>
                </div>
            </div>

            <div class="kiss-margin-large" v-if="!loading && models.length">

                <div class="kiss-margin">
                    <input type="text" class="kiss-input" :placeholder="t('Filter models...')" v-model="filter">
                </div>

                <div class="kiss-button-group kiss-margin-large-bottom">
                    <button class="kiss-button kiss-button-small" :class="{'kiss-button-primary': !filterModelType}" @click="filterModelType=null"><?=t('All')?></button>
                    <button class="kiss-button kiss-button-small" :class="{'kiss-button-primary': filterModelType=='singletons'}" @click="filterModelType='singletons'"><?=t('Singletons')?></button>
                    <button class="kiss-button kiss-button-small" :class="{'kiss-button-primary': filterModelType=='lists'}" @click="filterModelType='lists'"><?=t('Lists')?></button>
                </div>


                <div class="animated fadeIn kiss-height-30vh kiss-flex kiss-flex-middle kiss-flex-center kiss-align-center kiss-color-muted kiss-margin-large" v-if="!singletons.length && !lists.length">
                    <div>
                        <kiss-svg src="<?=$this->base('content:icon.svg')?>" width="40" height="40"></kiss-svg>
                        <p class="kiss-size-large kiss-margin-top"><?=t('No models found')?></p>
                    </div>
                </div>

                <div class="kiss-text-caption kiss-text-bold kiss-margin" v-if="group">
                    &mdash; {{group}}
                </div>

                <kiss-grid cols="2@m 4@xl" class="kiss-margin" gap="small" v-if="singletons.length">

                    <kiss-card class="animated fadeIn kiss-flex" theme="shadowed contrast" hover="shadow" v-for="model in singletons">
                        <div class="kiss-position-relative kiss-padding-small kiss-bgcolor-contrast">
                            <canvas width="40" height="40"></canvas>
                            <div class="kiss-cover kiss-flex kiss-padding-small kiss-flex-middle kiss-flex-center">
                                <div :style="{color: model.color || 'inherit' }"><kiss-svg :src="$base(model.icon || 'content:assets/icons/singleton.svg')" width="30" height="30"></kiss-svg></div>
                            </div>
                            <a class="kiss-cover" :href="$route(`/content/singleton/item/${model.name}`)"></a>
                        </div>
                        <div class="kiss-padding-small kiss-flex-1 kiss-position-relative">
                            <div class="kiss-size-small kiss-text-bold kiss-text-truncate">{{ model.label || model.name }}</div>
                            <div class="kiss-margin-xsmall-top kiss-color-muted kiss-size-xsmall kiss-text-truncate">{{model.info || t('Singleton')}}</div>
                            <a class="kiss-cover" :href="$route(`/content/singleton/item/${model.name}`)"></a>
                        </div>
                        <a class="kiss-padding-small" @click="toggleModelActions(model)"><icon>more_horiz</icon></a>
                    </kiss-card>

                </kiss-grid>

                <div class="kiss-margin" v-if="lists.length">

                    <div class="kiss-margin kiss-text-caption kiss-text-bold kiss-color-muted kiss-size-small"><?=t('Lists')?></div>

                    <kiss-card class="kiss-margin-small kiss-flex animated fadeIn" theme="shadowed contrast" hover="shadow" v-for="model in lists">
                        <div class="kiss-position-relative kiss-padding-small kiss-bgcolor-contrast">
                            <canvas width="40" height="40"></canvas>
                            <div class="kiss-cover kiss-flex kiss-flex-middle kiss-flex-center">
                                <div :style="{color: model.color || 'inherit' }"><kiss-svg :src="$base(model.icon || 'content:assets/icons/'+model.type+'.svg')" width="30" height="30"></kiss-svg></div>
                            </div>
                            <a class="kiss-cover" :href="$route(`/content/${model.type}/items/${model.name}`)"></a>
                        </div>
                        <div class="kiss-padding-small kiss-flex-1 kiss-position-relative">
                            <div class="kiss-size-small kiss-text-bold kiss-text-truncate">{{ model.label || model.name }}</div>
                            <div class="kiss-margin-xsmall-top kiss-color-muted kiss-size-xsmall kiss-text-truncate">{{model.info || model.type}}</div>
                            <a class="kiss-cover" :href="$route(`/content/${model.type}/items/${model.name}`)"></a>
                        </div>
                        <a class="kiss-padding-small" @click="toggleModelActions(model)"><icon>more_horiz</icon></a>
                    </kiss-card>

                </div>

            </div>

            <app-actionbar>

                <kiss-container>
                    <div class="kiss-flex kiss-flex-middle">
                        <div v-if="groups.length">
                            <span class="kiss-text-caption kiss-color-muted"><?=t('group')?></span>
                            <div class="kiss-margin-xsmall-top kiss-display-block kiss-overlay-input">
                                <div class="kiss-size-4" :class="{'kiss-color-muted': !group, 'kiss-text-bold': group}">{{ group || t('All groups') }}</div>
                                <select v-model="group">
                                    <option :value="null">{{t('All')}}</option>
                                    <option :selected="group == name" v-for="name in groups">{{ name }}</option>
                                </select>
                            </div>
                        </div>
                        <div class="kiss-flex-1"></div>
                        <?php if ($this->helper('acl')->isAllowed("content/models/manage")): ?>
                        <a class="kiss-button kiss-button-primary" href="<?=$this->route('/content/models/create')?>"><?=t('Create model')?></a>
                        <?php endif ?>
                    </div>
                </kiss-container>

            </app-actionbar>

            <kiss-popout :open="actionModel && 'true'" @popoutclose="toggleModelActions(null)">
                <kiss-content>
                        <kiss-navlist v-if="actionModel">
                            <ul>
                                <li class="kiss-nav-header">{{ actionModel.label || actionModel.name }}</li>
                                <li>
                                    <a class="kiss-flex kiss-flex-middle" :href="$route(`/content/models/edit/${actionModel.name}`)">
                                        <icon class="kiss-margin-small-right">create</icon>
                                        <?=t('Edit')?>
                                    </a>
                                </li>
                                <li class="kiss-nav-divider"></li>
                                <li>
                                    <a class="kiss-flex kiss-flex-middle" @click="clone(actionModel)">
                                        <icon class="kiss-margin-small-right">control_point_duplicate</icon>
                                        <?=t('Clone')?>
                                    </a>
                                </li>
                                <li v-if="actionModel.type=='collection'">
                                    <a class="kiss-flex kiss-flex-middle" :href="$route(`/content/collection/item/${actionModel.name}`)">
                                        <icon class="kiss-margin-small-right">add_circle_outline</icon>
                                        <?=t('Create item')?>
                                    </a>
                                </li>
                                <li class="kiss-nav-divider"></li>
                                <li>
                                    <a class="kiss-color-danger kiss-flex kiss-flex-middle" @click="remove(actionModel)">
                                        <icon class="kiss-margin-small-right">delete</icon>
                                        <?=t('Delete')?>
                                    </a>
                                </li>
                            </ul>
                        </kiss-navlist>
                </kiss-content>
            </kiss-popout>

            <teleport to="#content-models-aside" v-if="!loading">

                <kiss-card class="kiss-bgcolor-contrast kiss-padding-small kiss-margin-small" theme="bordered">
                    <strong class="kiss-size-xsmall"><?=t('Models')?></strong>
                    <div class="kiss-size-3 kiss-text-bold">{{ (singletons.length + lists.length) }}</div>
                </kiss-card>

                <kiss-grid cols="2" gap="small" v-if="!filterModelType">
                    <kiss-card class="kiss-padding-small" theme="bordered">
                        <span class="kiss-size-xsmall kiss-color-muted"><?=t('Lists')?></span>
                        <div class="kiss-size-3 kiss-color-muted">{{ lists.length }}</div>
                    </kiss-card>
                    <kiss-card class="kiss-padding-small" theme="bordered">
                        <span class="kiss-size-xsmall kiss-color-muted"><?=t('Singletons')?></span>
                        <div class="kiss-size-3 kiss-color-muted">{{ singletons.length }}</div>
                    </kiss-card>
                </kiss-grid>
            </teleport>

        </template>

        <script type="module">

            export default {
                data() {
                    return {
                        models: [],
                        loading: false,
                        actionModel: null,
                        group: null,
                        filter: '',
                        filterModelType: null
                    }
                },

                computed: {

                    lists() {

                        if (this.filterModelType && this.filterModelType != 'lists') {
                            return [];
                        }

                        return this.models.filter(model => {

                            if (this.filter && !`${model.name} ${model.label}`.toLocaleLowerCase().includes(this.filter.toLocaleLowerCase())) {
                                return false;
                            }

                            return ['collection', 'tree'].includes(model.type) && (!this.group || this.group == model.group);
                        });
                    },

                    singletons() {

                        if (this.filterModelType && this.filterModelType != 'singletons') {
                            return [];
                        }

                        return this.models.filter(model => {

                            if (this.filter && !`${model.name} ${model.label}`.toLocaleLowerCase().includes(this.filter.toLocaleLowerCase())) {
                                return false;
                            }

                            return model.type == 'singleton' && (!this.group || this.group == model.group)
                        });
                    },

                    groups() {

                        let groups = [];

                        (this.models || []).forEach(model => {
                            if (!model.group || groups.indexOf(model.group) > -1) return;
                            groups.push(model.group);
                        });

                        return groups.sort();
                    }
                },

                mounted() {
                    this.load();
                },

                methods: {

                    load() {

                        this.loading = true;

                        this.$request('/content/models/load').then(models => {
                            this.models = models;
                            this.loading = false;
                        })
                    },

                    toggleModelActions(model) {

                        if (!model) {
                            setTimeout(() => this.actionModel = null, 300);
                            return;
                        }

                        this.actionModel = model;
                    },

                    remove(model) {

                        App.ui.confirm('Are you sure?', () => {

                            this.$request(`/content/models/remove/${model.name}`, {}).then(res => {
                                this.models.splice(this.models.indexOf(model), 1);
                                App.ui.notify('Model removed!');
                            }).catch(rsp => {
                                App.ui.notify(rsp.error || 'Removing model failed!', 'error');
                            });;
                        });
                    },

                    clone(model) {

                        App.ui.prompt(this.t('New model name'), '', name => {

                            this.$request(`/content/models/clone/${model.name}`, {name}).then(newmodel => {
                                this.models.push(newmodel);
                                App.ui.notify('Model duplicated!');
                            }).catch(rsp => {
                                App.ui.notify(rsp.error || 'Duplicating model failed!', 'error');
                            });
                        });
                    }
                }
            }
        </script>

    </vue-view>


</kiss-container>


<?php $this->start('app-side-panel') ?>

<h2 class="kiss-size-4"><?=t('Content')?></h2>

<kiss-navlist>
    <ul>
        <li>
            <a class="kiss-link-muted kiss-flex kiss-flex-middle kiss-text-bold" href="<?=$this->route('/content')?>">
                <kiss-svg class="kiss-margin-small-right" src="<?=$this->base('content:icon.svg')?>" width="20" height="20"><canvas width="20" height="20"></canvas></kiss-svg>
                <?=t('Overview')?>
            </a>
        </li>
    </ul>
</kiss-navlist>

<div class="kiss-margin" id="content-models-aside"></div>

<?php if (1==2 && $this->helper('acl')->isAllowed("content/models/manage")): ?>
<kiss-navlist>
    <ul>
        <li class="kiss-nav-header kiss-margin-top kiss-margin-xsmall-bottom"><?=t('Create')?></li>
        <li>
            <a class="kiss-color-muted kiss-flex kiss-flex-middle" href="<?=$this->route('/content/models/create')?>?type=singleton">
                <kiss-svg class="kiss-margin-small-right" src="<?=$this->base('content:assets/icons/singleton.svg')?>" width="20" height="20"><canvas width="20" height="20"></canvas></kiss-svg>
                <?=t('Singleton')?>
            </a>
        </li>
        <li class="kiss-nav-divider"></li>
        <li>
            <a class="kiss-color-muted kiss-flex kiss-flex-middle" href="<?=$this->route('/content/models/create')?>?type=collection">
                <kiss-svg class="kiss-margin-small-right" src="<?=$this->base('content:assets/icons/collection.svg')?>" width="20" height="20"><canvas width="20" height="20"></canvas></kiss-svg>
                <?=t('Collection')?>
            </a>
        </li>
        <li>
            <a class="kiss-color-muted kiss-flex kiss-flex-middle" href="<?=$this->route('/content/models/create')?>?type=tree">
                <kiss-svg class="kiss-margin-small-right" src="<?=$this->base('content:assets/icons/tree.svg')?>" width="20" height="20"><canvas width="20" height="20"></canvas></kiss-svg>
                <?=t('Tree')?>
            </a>
        </li>
    </ul>
</kiss-navlist>
<?php endif ?>

<div class="kiss-margin kiss-visible@m">


</div>

<?php $this->end('app-side-panel') ?>
