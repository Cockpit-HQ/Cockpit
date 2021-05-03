<kiss-container class="kiss-margin-large">


    <vue-view>
        <template>

            <app-loader class="kiss-margin-large" v-if="loading"></app-loader>

            <div class="animated fadeIn kiss-height-30vh kiss-flex kiss-flex-middle kiss-flex-center kiss-align-center kiss-color-muted kiss-margin-large" v-if="!loading && !models.length">
                <div>
                    <kiss-svg src="<?=$this->base('models:icon.svg')?>" width="40" height="40"></kiss-svg>
                    <p class="kiss-size-large kiss-text-bold kiss-margin-top"><?=t('No models')?></p>
                </div>
            </div>

            <div class="kiss-margin-large" v-if="!loading && models.length">

                <div>

                    <div class="kiss-margin-small" v-for="model in models">
                        <kiss-card class="animated fadeIn" theme="bordered" hover="shadow">
                            <div class="kiss-padding-small kiss-flex kiss-flex-middle">
                                <div class="kiss-margin-small-right" :style="{color: model.color || 'inherit' }">
                                    <kiss-svg class="kiss-margin-auto" src="<?=$this->base('content:icon.svg')?>" width="30" height="30"></kiss-svg>
                                </div>
                                <div class="kiss-flex-1 kiss-position-relative"><a class="kiss-link-muted">
                                    {{ model.label || model.name }}
                                    <a class="kiss-cover" :href="$route(`/content/collection/items/${model.name}`)"></a>
                                </div>
                                <div>
                                    <a @click="toggleModelActions(model)"><icon>more_horiz</icon></a>
                                </div>
                            </div>
                        </kiss-card>
                    </div>

                </div>

            </div>


            <app-actionbar>

                <kiss-container>
                    <div class="kiss-flex kiss-flex-middle">
                        <div class="kiss-flex-1"></div>
                        <a class="kiss-button kiss-button-primary" href="<?=$this->route('/content/models/create')?>"><?=t('Create model')?></a>
                    </div>
                </kiss-container>

            </app-actionbar>

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
                        actionModel: null
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
                            });
                        });
                    }
                }
            }
        </script>

    </vue-view>


</kiss-container>