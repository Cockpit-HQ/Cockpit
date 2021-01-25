
<kiss-container class="kiss-margin-large" size="small">

    <vue-view>

        <template>

            <div class="kiss-flex kiss-flex-middle">
                <div class="kiss-size-1 kiss-flex-1"><strong><?=t('API & Security')?></strong></div>
                <a class="kiss-button kiss-button-primary" href="<?=$this->route('/settings/api/create')?>"><?=t('Add key')?></a>
            </div>

            <kiss-card class="kiss-margin kiss-margin-large-bottom kiss-padding" theme="bordered">
                <label><?=('API endpoint')?></label>
                <div class="kiss-flex kiss-flex-middle">
                    <div class="kiss-text-truncate kiss-text-monospace">
                        <?=$this->getSiteUrl(true)?>/api
                    </div>
                    <div class="kiss-margin-left"><a href="#" @click="copyEndpoint"><icon>content_copy</icon></a></div>
                </div>
            </kiss-card>

            <app-loader class="kiss-margin-large" v-if="loading"></app-loader>

            <div class="animated fadeIn kiss-height-30vh kiss-flex kiss-flex-middle kiss-flex-center kiss-align-center kiss-color-muted" v-if="keys && !keys.length">
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
                                <a class="kiss-cover" :href="App.route('/settings/api/key/'+key._id)"></a>
                            </div>
                            <div class="kiss-margin-left kiss-align-right kiss-text-monospace kiss-color-muted">*****{{ key.key.substr(-5, 5)}}</div>
                            <a class="kiss-margin-left" href="#" @click="copyApiKey(key.key)"><icon>content_copy</icon></a>
                            <a class="kiss-margin-small-left kiss-color-danger" @click="remove(key)"><icon>delete</icon></a>
                        </div>
                    </li>

                </ul>

            </div>

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

                        App.request('/settings/api/load', {options:{}}).then(keys => {

                            this.keys = keys;
                            this.loading = false;
                        });
                    },

                    copyEndpoint(e) {

                        e.preventDefault();

                        App.utils.copyText('<?=$this->getSiteUrl(true)?>/api', () => {
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

                            App.request('/settings/api/remove', {key}).then(res => {
                                this.keys.splice(this.keys.indexOf(key), 1);
                            });
                        });
                    }
                }
            }
        </script>
    </vue-view>

</kiss-container>