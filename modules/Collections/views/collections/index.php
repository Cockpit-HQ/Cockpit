<kiss-container class="kiss-margin-large">

    <vue-view>
        <template>

            <div class="kiss-flex kiss-flex-middle">
                <div class="kiss-flex-1"></div>
            </div>


            <app-loader class="kiss-margin-large" v-if="loading"></app-loader>

            <div class="animated fadeIn kiss-height-30vh kiss-flex kiss-flex-middle kiss-flex-center kiss-align-center kiss-color-muted kiss-margin-large" v-if="!loading && !collections.length">
                <div>
                    <kiss-svg src="<?=$this->base('collections:icon.svg')?>" width="40" height="40"></kiss-svg>
                    <p class="kiss-size-large kiss-text-bold kiss-margin-top"><?=t('No collections')?></p>
                </div>
            </div>

            <div class="kiss-margin-large" v-if="!loading && collections.length">

                <kiss-row class="kiss-child-width-1-4@m kiss-child-width-1-5@l">

                    <div v-for="collection in collections">
                        <kiss-card class="kiss-position-relative" theme="bordered" hover="shadow">

                            <div class="kiss-padding kiss-position-relative">
                                <canvas width="600" height="300"></canvas>
                                <div class="kiss-cover kiss-flex kiss-flex-middle kiss-flex-center kiss-padding">
                                    <div><kiss-svg src="<?=$this->base('collections:icon.svg')?>" width="80" height="60"></kiss-svg></div>
                                </div>

                            </div>

                            <div class="kiss-padding">
                                {{ collection.label || collection.name }}
                            </div>
                            <a class="kiss-cover" href=""></a>

                        </kiss-card>
                    </div>

                </kiss-row>

            </div>


            <app-actionbar>

                <kiss-container size="small">
                    <div class="kiss-flex kiss-flex-middle kiss-flex-right">
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