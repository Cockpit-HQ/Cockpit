
<kiss-container class="kiss-margin-small" size="small">

    <ul class="kiss-breadcrumbs">
        <li><a href="<?=$this->route('/system')?>"><?=t('Settings')?></a></li>
    </ul>

    <vue-view>
        <template>

            <div class="kiss-margin-large-bottom kiss-flex kiss-flex-middle">
                <div class="kiss-size-4 kiss-flex-1"><strong><?=t('Locales')?></strong></div>
            </div>

            <app-loader v-if="loading"></app-loader>

            <div class="animated fadeIn kiss-height-50vh kiss-flex kiss-flex-middle kiss-flex-center kiss-align-center kiss-color-muted" v-if="locales && !locales.length">
                <div>
                    <icon class="kiss-size-xlarge">language</icon>
                    <p class="kiss-size-large"><?=t('No locales')?></p>
                </div>
            </div>

            <ul class="app-list-items animated fadeIn" v-if="locales && locales.length">

                <li v-for="(locale, idx) in locales">

                    <kiss-card class="kiss-padding-small kiss-flex kiss-flex-middle" :class="{'kiss-color-muted': locale.enabled === false}" hover="contrast scale-small bordered-primary">
                        <div class="kiss-margin-small-right"><icon>language</icon></div>
                        <div class="kiss-size-5 kiss-flex-1 kiss-position-relative">
                            <strong>{{locale.name || locale.i18n}}</strong>
                            <a class="kiss-cover" :href="$routeUrl('/system/locales/locale/'+locale._id)"></a>
                        </div>
                        <div class="kiss-margin-left kiss-size-small kiss-align-right" :class="locale.i18n == 'default' ? 'kiss-color-primary' : 'kiss-color-muted'"><strong>{{ locale.i18n }}</strong></div>
                        <a class="kiss-display-block kiss-margin-left kiss-color-danger" @click="remove(locale)"><icon class="kiss-size-large">delete</icon></a>
                    </kiss-card>

                </li>

            </ul>

            <app-actionbar>

                <kiss-container size="small">
                    <div class="kiss-flex kiss-flex-middle kiss-flex-right">
                        <a class="kiss-button kiss-button-primary" href="<?=$this->route('/system/locales/create')?>"><?=t('Add locale')?></a>
                    </div>
                </kiss-container>

            </app-actionbar>


        </template>
        <script type="module">

            export default {

                data() {
                    return {
                        locales: null,
                        loading: false
                    }
                },

                mounted() {
                    this.load()
                },

                methods: {


                    load() {

                        this.loading = true;

                        this.$request('/system/locales/load', {options:{}}).then(locales => {

                            this.locales = locales;
                            this.loading = false;
                        });
                    },

                    remove(locale) {

                        App.ui.confirm('Are you sure?', () => {

                            this.$request('/system/locales/remove', {locale}).then(res => {
                                this.locales.splice(this.locales.indexOf(locale), 1);
                            });
                        });
                    }
                }
            }

        </script>
    </vue-view>


</kiss-container>
