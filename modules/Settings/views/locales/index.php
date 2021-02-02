
<kiss-container class="kiss-margin-large" size="small">

<vue-view>
    <template>

        <div class="kiss-margin-large-bottom kiss-flex kiss-flex-middle">
            <div class="kiss-size-1 kiss-flex-1"><strong><?=t('Locales')?></strong></div>
            <a class="kiss-button kiss-button-primary" href="<?=$this->route('/settings/locales/create')?>"><?=t('Add locale')?></a>
        </div>

        <app-loader v-if="loading"></app-loader>

        <div class="animated fadeIn kiss-height-30vh kiss-flex kiss-flex-middle kiss-flex-center kiss-align-center kiss-color-muted" v-if="locales && !locales.length">
            <div>
                <icon class="kiss-size-xlarge">language</icon>
                <p class="kiss-size-large kiss-text-bold"><?=t('No locales')?></p>
            </div>
        </div>

        <ul class="app-list-items animated fadeIn" v-if="locales && locales.length">

            <li v-for="(locale, idx) in locales">

                <div class="kiss-margin kiss-flex kiss-flex-middle">
                    <div class="kiss-margin-small-right"><icon>language</icon></div>
                    <div class="kiss-size-5 kiss-flex-1 kiss-position-relative">
                        <strong>{{locale.name || locale.i18n}}</strong>
                        <a class="kiss-cover" :href="$route('/settings/locales/locale/'+locale._id)"></a>
                    </div>
                    <div class="kiss-margin-left kiss-size-small kiss-align-right kiss-text-caption" :class="locale.i18n == 'default' ? 'kiss-color-primary' : 'kiss-color-muted'"><strong>{{ locale.i18n }}</strong></div>
                    <a class="kiss-display-block kiss-margin-left kiss-color-danger" @click="remove(locale)"><icon>delete</icon></a>
                </div>

            </li>

        </ul>


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

                    this.$request('/settings/locales/load', {options:{}}).then(locales => {

                        this.locales = locales;
                        this.loading = false;
                    });
                },

                remove(locale) {

                    App.ui.confirm('Are you sure?', () => {

                        this.$request('/settings/locales/remove', {locale}).then(res => {
                            this.locales.splice(this.locales.indexOf(locale), 1);
                        });
                    });
                }
            }
        }

    </script>
</vue-view>


</kiss-container>
