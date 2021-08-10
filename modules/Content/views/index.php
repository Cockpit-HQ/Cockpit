<kiss-container class="kiss-margin-large" size="medium">

    <ul class="kiss-breadcrumbs">
        <li><a href="<?=$this->route('/content')?>"><?=t('Content')?></a></li>
    </ul>

    <vue-view>
        <template>

            <app-loader class="kiss-margin-large" v-if="loading"></app-loader>

            <div class="animated fadeIn kiss-height-30vh kiss-flex kiss-flex-middle kiss-flex-center kiss-align-center kiss-color-muted kiss-margin-large" v-if="!loading && !models.length">
                <div>
                    <kiss-svg src="<?=$this->base('content:icon.svg')?>" width="40" height="40"></kiss-svg>
                    <p class="kiss-size-large kiss-text-bold kiss-margin-top"><?=t('No models')?></p>
                </div>
            </div>

            <div class="kiss-margin-large" v-if="!loading && models.length">

                <app-tabs class="kiss-margin-large-bottom" static="true" v-if="groups.length">
                    <ul class="app-tabs-nav">
                        <li :active="group === null">
                            <a class="app-tabs-nav-link" @click="group = null">{{t('All')}}</a>
                        </li>
                        <li :active="group == name" v-for="name in groups">
                            <a class="app-tabs-nav-link" @click="group = name">{{ name }}</a>
                        </li>
                    </ul>
                </app-tabs>

                <div class="kiss-margin">
                    <input type="text" class="kiss-input" :placeholder="t('Filter models...')" v-model="filter">
                </div>

                <div class="kiss-margin-large-top" v-if="singletons.length">

                    <kiss-row class="kiss-row-small kiss-child-width-1-3@m" match="true">
                        <div v-for="model in singletons">
                            <kiss-card class="animated fadeIn kiss-flex" theme="shadowed contrast" hover="shadow">
                                <div class="kiss-position-relative kiss-padding-small kiss-bgcolor-contrast kiss-width-1-6">
                                    <canvas width="600" height="200"></canvas>
                                    <div class="kiss-cover kiss-flex kiss-flex-middle kiss-flex-center">
                                        <div :style="{color: model.color || 'inherit' }"><kiss-svg src="<?=$this->base('content:assets/icons/singleton.svg')?>" width="30" height="30"></kiss-svg></div>
                                    </div>
                                    <a class="kiss-cover" :href="$route(`/content/singleton/item/${model.name}`)"></a>
                                </div>
                                <div class="kiss-padding-small kiss-flex-1">
                                    <div class="kiss-flex kiss-flex-middle">
                                        <a class="kiss-flex-1 kiss-margin-right kiss-text-bold kiss-link-muted" :href="$route(`/content/singleton/item/${model.name}`)">{{ model.label || model.name }}</a>
                                        <a @click="toggleModelActions(model)"><icon>more_horiz</icon></a>
                                    </div>
                                    <div class="kiss-margin-xsmall-top kiss-color-muted kiss-size-xsmall" v-if="model.info">{{model.info}}</div>
                                </div>
                            </kiss-card>
                        </div>
                        <div>
                            <kiss-card class="animated fadeIn kiss-padding kiss-flex kiss-flex-middle kiss-flex-center" theme="bordered" hover="shadow">
                                <a class="kiss-size-large" href="<?=$this->route('/content/models/create')?>?type=singleton" title="<?=t('Add singleton model')?>"><icon>add_circle_outline</icon></a>
                            </kiss-card>
                        </div>
                    </kiss-row>

                </div>


                <div class="kiss-margin-large" v-if="collections.length">

                    <div class="kiss-margin kiss-text-caption kiss-text-bold kiss-color-muted kiss-size-small"><?=t('Collections')?></div>

                    <div class="kiss-margin-small" v-for="model in collections">
                        <kiss-card class="animated fadeIn" theme="shadowed contrast" hover="shadow">
                            <div class="kiss-padding kiss-flex kiss-flex-middle">
                                <div class="kiss-margin-small-right" :style="{color: model.color || 'inherit' }">
                                    <kiss-svg class="kiss-margin-auto" src="<?=$this->base('content:assets/icons/collection.svg')?>" width="30" height="30"></kiss-svg>
                                </div>
                                <div class="kiss-flex-1 kiss-position-relative kiss-margin-right kiss-text-bold kiss-link-muted">
                                    {{ model.label || model.name }}
                                    <a class="kiss-cover" :href="$route(`/content/collection/items/${model.name}`)"></a>
                                </div>
                                <div class="kiss-color-muted kiss-size-xsmall kiss-margin-right kiss-visible@m " v-if="model.info">
                                    {{model.info}}
                                </div>
                                <div>
                                    <a @click="toggleModelActions(model)"><icon>more_horiz</icon></a>
                                </div>
                            </div>
                        </kiss-card>
                    </div>

                    <div>
                        <kiss-card class="animated fadeIn kiss-padding-small kiss-align-center">
                            <a class="kiss-size-large" href="<?=$this->route('/content/models/create')?>?type=collection" title="<?=t('Add collection model')?>"><icon>add_circle_outline</icon></a>
                        </kiss-card>
                    </div>

                </div>

            </div>

            <?php if (_allowed("content/models/manage")): ?>
            <app-actionbar>

                <kiss-container size="medium">
                    <div class="kiss-flex kiss-flex-middle">
                        <div class="kiss-flex-1"></div>
                        <a class="kiss-button kiss-button-primary" href="<?=$this->route('/content/models/create')?>"><?=t('Create model')?></a>
                    </div>
                </kiss-container>

            </app-actionbar>
            <?php endif ?>

            <kiss-popoutmenu :open="actionModel && 'true'" @popoutmenuclose="toggleModelActions(null)">
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
            </kiss-popoutmenu>

        </template>

        <script type="module">

            export default {
                data() {
                    return {
                        models: [],
                        loading: false,
                        actionModel: null,
                        group: null,
                        filter: ''
                    }
                },

                computed: {

                    collections() {
                        return this.models.filter(model => {

                            if (this.filter && !`${model.name} ${model.label}`.toLocaleLowerCase().includes(this.filter.toLocaleLowerCase())) {
                                return false;
                            }

                            return model.type == 'collection' && (!this.group || this.group == model.group)
                        });
                    },

                    singletons() {
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