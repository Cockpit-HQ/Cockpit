
<kiss-container class="kiss-margin-small" size="small">

    <ul class="kiss-breadcrumbs">
        <li><a href="<?=$this->route('/system')?>"><?=t('Settings')?></a></li>
    </ul>

    <vue-view>

        <template>

            <div class="kiss-flex kiss-flex-middle">
                <div class="kiss-size-4 kiss-flex-1"><strong><?=t('API & Security')?></strong></div>
            </div>

            <kiss-card class="kiss-margin kiss-margin-large-bottom kiss-bgcolor-contrast">
                <div class="kiss-padding">
                    <label><?=('REST-API endpoint')?></label>
                    <div class="kiss-flex kiss-flex-middle">
                        <div class="kiss-text-truncate kiss-text-monospace kiss-flex-1">
                        <?=$this->module('system')->spaceUrl('/api')?>
                        </div>
                        <div class="kiss-margin-left"><a href="#" @click.prevent="copyEndpoint('<?=$this->module('system')->spaceUrl('/api')?>', 'REST-Api endpoint copied!')"><icon>content_copy</icon></a></div>
                        <div class="kiss-margin-small-left kiss-width-1-5 kiss-visible@m"><a class="kiss-button kiss-button-small kiss-width-1-1" href="#" @click="showApiViewer()">{{ t('Playground') }}</a></div>
                    </div>
                </div>
                <hr class="kiss-margin-remove">
                <div class="kiss-padding">
                    <label><?=('GraphQL endpoint')?></label>
                    <div class="kiss-flex kiss-flex-middle">
                        <div class="kiss-text-truncate kiss-text-monospace kiss-flex-1">
                        <?=$this->module('system')->spaceUrl('/api/gql')?>
                        </div>
                        <div class="kiss-margin-left"><a href="#" @click.prevent="copyEndpoint('<?=$this->getSiteUrl(true)?>/api/gql', 'GraphQL endpoint copied!')"><icon>content_copy</icon></a></div>
                        <div class="kiss-margin-small-left kiss-width-1-5 kiss-visible@m"><a class="kiss-button kiss-button-small kiss-width-1-1" href="#" @click="showGraphQLViewer()">{{ t('Playground') }}</a></div>
                    </div>
                </div>
            </kiss-card>

            <div class="kiss-text-caption kiss-text-bold kiss-margin-large-top">
                <?=t('Access')?>
            </div>

            <kiss-card class="kiss-padding kiss-flex kiss-flex-middle kiss-margin-small" theme="bordered contrast">
                <div></div><icon>public</icon></div>
                <div class="kiss-flex-1 kiss-margin-small-left kiss-margin-small-right">
                    <div class="kiss-color-muted kiss-size-small">
                        <?=t('Public API access permissions for unauthenticated requests.')?>
                    </div>
                </div>
                <div class="kiss-margin-small-left kiss-width-1-5"><a class="kiss-button kiss-button-small kiss-width-1-1" :href="$routeUrl('/system/api/public')"><?=t('Configure')?></a></div>
            </kiss-card>

            <app-loader class="kiss-margin-large" v-if="loading"></app-loader>

            <div class="animated fadeIn kiss-height-50vh kiss-flex kiss-flex-middle kiss-flex-center kiss-align-center kiss-color-muted" v-if="keys && !keys.length">
                <div>
                    <icon class="kiss-size-xlarge">vpn_key</icon>
                    <p class="kiss-size-large"><?=t('No API keys')?></p>
                </div>
            </div>

            <kiss-card class="animated fadeIn kiss-padding kiss-margin" theme="bordered" v-if="keys && keys.length">

                <div class="kiss-margin kiss-text-caption"><strong><?=t('API keys')?></strong></div>

                <ul class="app-list-items">

                    <li v-for="(key, idx) in keys">
                        <div class="kiss-flex kiss-flex-middle">
                            <div class="kiss-margin-small-right"><icon>vpn_key</icon></div>
                            <div class="kiss-size-5 kiss-position-relative">
                                <strong>{{key.name}}</strong>
                                <a class="kiss-cover" :href="$routeUrl('/system/api/key/'+key._id)"></a>
                            </div>
                            <div class="kiss-flex-1 kiss-margin-left kiss-align-right kiss-text-monospace kiss-color-muted">*****{{ key.key.substr(-5, 5)}}</div>
                            <a class="kiss-margin-left" href="#" @click="copyApiKey(key.key)"><icon>content_copy</icon></a>
                            <a class="kiss-margin-small-left kiss-color-danger" @click="remove(key)"><icon>delete</icon></a>
                            <div class="kiss-margin-left kiss-width-1-5 kiss-button-group kiss-visible@m" :class="{'kiss-disabled': !key.key}">
                                <a class="kiss-button kiss-button-small kiss-flex-1" href="#" @click="showApiViewer(key.key)">REST</a>
                                <a class="kiss-button kiss-button-small kiss-flex-1" href="#" @click="showGraphQLViewer(key.key)">GraphQL</a>
                            </div>
                        </div>
                    </li>

                </ul>

            </kiss-card>

            <app-actionbar>

                <kiss-container size="small">
                    <div class="kiss-flex kiss-flex-middle kiss-flex-right">
                        <a class="kiss-button kiss-button-primary" href="<?=$this->route('/system/api/create')?>"><?=t('Add key')?></a>
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

                        this.$request('/system/api/load', {options:{}}).then(keys => {

                            this.keys = keys;
                            this.loading = false;
                        });
                    },

                    copyEndpoint(endpoint, text) {

                        App.utils.copyText(endpoint, () => {
                            App.ui.notify(text);
                        });
                    },

                    copyApiKey(key) {

                        App.utils.copyText(key, () => {
                            App.ui.notify('Api key copied!');
                        });
                    },

                    remove(key) {

                        App.ui.confirm('Are you sure?', () => {

                            this.$request('/system/api/remove', {key}).then(res => {
                                this.keys.splice(this.keys.indexOf(key), 1);
                            });
                        });
                    },

                    showApiViewer(apiKey = null) {
                        VueView.ui.offcanvas('system:assets/dialogs/api-viewer.js', {
                            openApiUrl: this.$routeUrl('/system/api/openapi'),
                            apiKey
                        }, {}, {flip: true, size: 'xxlarge'})
                    },

                    showGraphQLViewer(apiKey = null) {
                        VueView.ui.offcanvas('system:assets/dialogs/graphql-viewer.js', {
                            apiKey
                        }, {}, {flip: true, size: 'xxlarge'})
                    }
                }
            }
        </script>
    </vue-view>

</kiss-container>
