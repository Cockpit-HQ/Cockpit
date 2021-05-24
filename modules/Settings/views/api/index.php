
<kiss-container class="kiss-margin" size="small">

    <ul class="kiss-breadcrumbs">
        <li><a href="<?=$this->route('/settings')?>"><?=t('Settings')?></a></li>
    </ul>

    <vue-view>

        <template>

            <div class="kiss-flex kiss-flex-middle">
                <div class="kiss-size-1 kiss-flex-1"><strong><?=t('API & Security')?></strong></div>
            </div>

            <kiss-card class="kiss-margin kiss-margin-large-bottom kiss-bgcolor-contrast">
                <div class="kiss-padding">
                    <label><?=('REST-API endpoint')?></label>
                    <div class="kiss-flex kiss-flex-middle">
                        <div class="kiss-text-truncate kiss-text-monospace kiss-flex-1">
                            <?=$this->getSiteUrl(true)?>
                        </div>
                        <div class="kiss-margin-left"><a href="#" @click="copyEndpoint"><icon>content_copy</icon></a></div>
                        <div class="kiss-margin-small-left kiss-width-1-5"><a class="kiss-button kiss-button-small kiss-width-1-1" href="#" @click="showApiViewer()">{{ t('Show Api viewer') }}</a></div>
                    </div>
                </div>
                <hr class="kiss-margin-remove">
                <div class="kiss-padding">
                    <label><?=('GraphQL endpoint')?></label>
                    <div class="kiss-flex kiss-flex-middle">
                        <div class="kiss-text-truncate kiss-text-monospace kiss-flex-1">
                            <?=$this->getSiteUrl(true)?>/api/graphql
                        </div>
                        <div class="kiss-margin-left"><a href="#" @click="copyEndpoint"><icon>content_copy</icon></a></div>
                        <div class="kiss-margin-small-left kiss-width-1-5"><a class="kiss-button kiss-button-small kiss-width-1-1" href="#" @click="showGraphQLViewer()">{{ t('GraphQL Playground') }}</a></div>
                    </div>
                </div>
            </kiss-card>

            <app-loader class="kiss-margin-large" v-if="loading"></app-loader>

            <div class="animated fadeIn kiss-height-50vh kiss-flex kiss-flex-middle kiss-flex-center kiss-align-center kiss-color-muted" v-if="keys && !keys.length">
                <div>
                    <icon class="kiss-size-xlarge">vpn_key</icon>
                    <p class="kiss-size-large kiss-text-bold"><?=t('No api keys')?></p>
                </div>
            </div>

            <div class="animated fadeIn kiss-margin-large" v-if="keys && keys.length">

                <div class="kiss-margin kiss-text-caption"><strong><?=t('Api keys')?></strong></div>

                <ul class="app-list-items">

                    <li v-for="(key, idx) in keys">
                        <div class="kiss-margin kiss-flex kiss-flex-middle">
                            <div class="kiss-margin-small-right"><icon>vpn_key</icon></div>
                            <div class="kiss-size-5 kiss-flex-1 kiss-position-relative">
                                <strong>{{key.name}}</strong>
                                <a class="kiss-cover" :href="$route('/settings/api/key/'+key._id)"></a>
                            </div>
                            <div class="kiss-margin-left kiss-align-right kiss-text-monospace kiss-color-muted">*****{{ key.key.substr(-5, 5)}}</div>
                            <a class="kiss-margin-left" href="#" @click="copyApiKey(key.key)"><icon>content_copy</icon></a>
                            <a class="kiss-margin-small-left kiss-color-danger" @click="remove(key)"><icon>delete</icon></a>
                        </div>
                    </li>

                </ul>

            </div>

            <app-actionbar>

                <kiss-container size="small">
                    <div class="kiss-flex kiss-flex-middle kiss-flex-right">
                        <a class="kiss-button kiss-button-primary" href="<?=$this->route('/settings/api/create')?>"><?=t('Add key')?></a>
                    </div>
                </kiss-container>

            </app-actionbar>

        </template>

        <script type="module">

            export default {
                data() {
                    return {
                        keys: null,
                        loading: false
                    }
                },

                mounted() {
                    this.load()
                },

                methods: {

                    load() {

                        this.loading = true;

                        this.$request('/settings/api/load', {options:{}}).then(keys => {

                            this.keys = keys;
                            this.loading = false;
                        });
                    },

                    copyEndpoint(e) {

                        e.preventDefault();

                        App.utils.copyText('<?=$this->getSiteUrl(true)?>', () => {
                            App.ui.notify('Api endpoint copied!');
                        });
                    },

                    copyApiKey(key) {

                        App.utils.copyText(key, () => {
                            App.ui.notify('Api key copied!');
                        });
                    },

                    remove(key) {

                        App.ui.confirm('Are you sure?', () => {

                            this.$request('/settings/api/remove', {key}).then(res => {
                                this.keys.splice(this.keys.indexOf(key), 1);
                            });
                        });
                    },

                    showApiViewer() {
                        App.utils.vueOffcanvas('settings:assets/dialogs/api-viewer.js', {openApiUrl: this.$route('/settings/api/openapi')}, {}, {flip: true, size: 'xxlarge'})
                    },

                    showGraphQLViewer() {
                        App.utils.vueOffcanvas('settings:assets/dialogs/graphql-viewer.js', {}, {}, {flip: true, size: 'xxlarge'})
                    }
                }
            }
        </script>
    </vue-view>

</kiss-container>