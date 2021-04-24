<kiss-container class="kiss-margin-large">

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

                <kiss-row class="kiss-child-width-1-4@m kiss-child-width-1-5@l kiss-child-width-1-6@xl" v-if="mode=='grid'">

                    <div v-for="collection in collections">
                        <kiss-card class="animated fadeIn kiss-position-relative" theme="bordered" hover="shadow">

                            <div class="kiss-padding">

                                <div class="kiss-position-relative">
                                    <canvas width="600" height="450"></canvas>
                                    <div class="kiss-cover kiss-flex kiss-flex-middle kiss-flex-center kiss-align-center kiss-padding">
                                        <div>
                                            <div :style="{color: collection.color || 'inherit' }">
                                                <kiss-svg class="kiss-margin-auto" src="<?=$this->base('collections:icon.svg')?>" width="80" height="80"></kiss-svg>
                                            </div>
                                            <div class="kiss-padding kiss-margin-top kiss-text-truncate">
                                                <strong>{{ collection.label || collection.name }}</strong>
                                            </div>
                                        </div>
                                    </div>
                                    <a class="kiss-cover" :href="$route(`/collections/entries/list/${collection.name}`)"></a>
                                </div>

                                <div class="kiss-align-center">
                                    <a class="kiss-size-large" @click="toggleCollectionActions(collection)"><icon>more_horiz</icon></a>
                                </div>

                            </div>

                        </kiss-card>
                    </div>

                </kiss-row>

                <div v-if="mode=='list'">

                    <div class="kiss-margin-small" v-for="collection in collections">
                        <kiss-card class="animated fadeIn" theme="bordered" hover="shadow">
                            <div class="kiss-padding-small kiss-flex kiss-flex-middle">
                                <div class="kiss-margin-small-right" :style="{color: collection.color || 'inherit' }">
                                    <kiss-svg class="kiss-margin-auto" src="<?=$this->base('collections:icon.svg')?>" width="25" height="25"></kiss-svg>
                                </div>
                                <div class="kiss-flex-1"><a class="kiss-link-muted"><a class="kiss-link-muted" :href="$route(`/collections/entries/list/${collection.name}`)"><strong>{{ collection.label || collection.name }}</strong></a></div>
                                <div>
                                    <a @click="toggleCollectionActions(collection)"><icon>menu</icon></a>
                                </div>
                            </div>
                        </kiss-card>
                    </div>

                </div>

            </div>


            <app-actionbar>

                <kiss-container>
                    <div class="kiss-flex kiss-flex-middle">
                        <div class="kiss-button-group">
                            <button class="kiss-button" :class="{'kiss-button-primary': (mode=='list')}" @click="mode='list'"><icon>list</icon></button>
                            <button class="kiss-button" :class="{'kiss-button-primary': (mode=='grid')}" @click="mode='grid'"><icon>view_comfy</icon></button>
                        </div>
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
                                <li><a :href="$route(`/collections/edit/${actionCollection.name}`)"><?=t('Edit')?></a></li>
                                <li class="kiss-nav-divider"></li>
                                <a class="kiss-color-danger" @click="remove(actionCollection)"><?=t('Delete')?></a>
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
                        mode: 'grid',
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