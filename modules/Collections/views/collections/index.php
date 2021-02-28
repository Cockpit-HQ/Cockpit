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

                <kiss-row class="kiss-child-width-1-2 kiss-child-width-1-4@m kiss-child-width-1-6@l" v-if="mode=='grid'">

                    <div v-for="collection in collections">
                        <kiss-card class="animated fadeIn kiss-position-relative" theme="bordered" hover="shadow">

                            <div class="kiss-padding kiss-position-relative">
                                <canvas width="600" height="450"></canvas>
                                <div class="kiss-cover kiss-flex kiss-flex-middle kiss-flex-center kiss-align-center kiss-padding">
                                    <div>
                                        <div :style="{color: collection.color || 'inherit' }">
                                            <kiss-svg class="kiss-margin-auto" src="<?=$this->base('collections:icon.svg')?>" width="80" height="60"></kiss-svg>
                                        </div>
                                        <div class="kiss-padding kiss-size-small kiss-text-truncate">
                                            <strong>{{ collection.label || collection.name }}</strong>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <a class="kiss-cover" href=""></a>

                        </kiss-card>
                    </div>

                </kiss-row>

                <div v-if="mode=='list'">

                    <div class="kiss-margin-small" v-for="collection in collections">
                        <kiss-card class="animated fadeIn" theme="bordered" hover="shadow">
                            <div class="kiss-padding kiss-flex kiss-flex-middle">
                                <div class="kiss-margin-small-right" :style="{color: collection.color || 'inherit' }">
                                    <kiss-svg class="kiss-margin-auto" src="<?=$this->base('collections:icon.svg')?>" width="30" height="30"></kiss-svg>
                                </div>
                                <div class="kiss-flex-1"><a class="kiss-link-muted"><strong>{{ collection.label || collection.name }}</strong></a></div>
                                <div>
                                    <kiss-dropdown>
                                        <a><icon>menu</icon></a>
                                        <kiss-dropdownbox pos="aside-left">
                                            <kiss-navlist>
                                                <ul>
                                                    <li class="kiss-nav-header">{{ collection.label || collection.name }}</li>
                                                    <li><a :href="$route(`/collections/edit/${collection.name}`)"><?=t('Edit')?></a></li>
                                                </ul>
                                            </navlist>
                                        </kiss-dropdownbox>
                                    </kiss-dropdown>
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


        </template>

        <script type="module">

            export default {
                data() {
                    return {
                        collections: [],
                        mode: 'list',
                        loading: false
                    }
                },

                mounted() {
                    this.load();
                },

                methods: {

                    load() {

                        this.loading = true;

                        App.request('/collections/load').then(collections => {
                            this.collections = collections;
                            this.loading = false;
                        })
                    }
                }
            }
        </script>

    </vue-view>


</kiss-container>