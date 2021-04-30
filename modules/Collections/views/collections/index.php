<kiss-container class="kiss-margin-large">

    <h1><?=t('Collections')?></h1>

    <vue-view>
        <template>

            <app-loader class="kiss-margin-large" v-if="loading"></app-loader>

            <div class="animated fadeIn kiss-height-30vh kiss-flex kiss-flex-middle kiss-flex-center kiss-align-center kiss-color-muted kiss-margin-large" v-if="!loading && !collections.length">
                <div>
                    <kiss-svg src="<?=$this->base('collections:icon.svg')?>" width="40" height="40"></kiss-svg>
                    <p class="kiss-size-large kiss-text-bold kiss-margin-top"><?=t('No collections')?></p>
                </div>
            </div>

            <div class="kiss-margin-large" v-if="!loading && collections.length">

                <div>

                    <div class="kiss-margin-small" v-for="collection in collections">
                        <kiss-card class="animated fadeIn" theme="bordered" hover="shadow">
                            <div class="kiss-padding-small kiss-flex kiss-flex-middle">
                                <div class="kiss-margin-small-right" :style="{color: collection.color || 'inherit' }">
                                    <kiss-svg class="kiss-margin-auto" src="<?=$this->base('collections:icon.svg')?>" width="30" height="30"></kiss-svg>
                                </div>
                                <div class="kiss-flex-1 kiss-position-relative"><a class="kiss-link-muted">
                                    {{ collection.label || collection.name }}
                                    <a class="kiss-cover" :href="$route(`/collections/items/list/${collection.name}`)"></a>
                                </div>
                                <div>
                                    <a @click="toggleCollectionActions(collection)"><icon>more_horiz</icon></a>
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
                        <a class="kiss-button kiss-button-primary" href="<?=$this->route('/collections/create')?>"><?=t('Add collection')?></a>
                    </div>
                </kiss-container>

            </app-actionbar>

            <kiss-popoutmenu :open="actionCollection && 'true'" @popoutmenuclose="toggleCollectionActions(null)">
                <kiss-content>
                        <kiss-navlist v-if="actionCollection">
                            <ul>
                                <li class="kiss-nav-header">{{ actionCollection.label || actionCollection.name }}</li>
                                <li>
                                    <a class="kiss-flex kiss-flex-middle" :href="$route(`/collections/edit/${actionCollection.name}`)">
                                        <icon class="kiss-margin-small-right">create</icon>
                                        <?=t('Edit')?>
                                    </a>
                                </li>
                                <li>
                                    <a class="kiss-flex kiss-flex-middle" :href="$route(`/collections/items/item/${actionCollection.name}`)">
                                        <icon class="kiss-margin-small-right">add_circle_outline</icon>
                                        <?=t('Create item')?>
                                    </a>
                                </li>
                                <li class="kiss-nav-divider"></li>
                                <li>
                                    <a class="kiss-color-danger kiss-flex kiss-flex-middle" @click="remove(actionCollection)">
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
                        collections: [],
                        loading: false,
                        actionCollection: null
                    }
                },

                mounted() {
                    this.load();
                },

                methods: {

                    load() {

                        this.loading = true;

                        this.$request('/collections/load').then(collections => {
                            this.collections = collections;
                            this.loading = false;
                        })
                    },

                    toggleCollectionActions(collection) {

                        if (!collection) {
                            setTimeout(() => this.actionCollection = null, 300);
                            return;
                        }

                        this.actionCollection = collection;
                    },

                    remove(collection) {

                        App.ui.confirm('Are you sure?', () => {

                            this.$request(`/collections/remove/${collection.name}`, {}).then(res => {
                                this.collections.splice(this.collections.indexOf(collection), 1);
                            });
                        });
                    }
                }
            }
        </script>

    </vue-view>


</kiss-container>