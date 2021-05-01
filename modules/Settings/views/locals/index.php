
<kiss-container class="kiss-margin" size="small">

    <ul class="kiss-breadcrumb">
        <li><a href="<?=$this->route('/settings')?>"><?=t('Settings')?></a></li>
    </ul>

    <vue-view>
        <template>

            <div class="kiss-margin-large-bottom kiss-flex kiss-flex-middle">
                <div class="kiss-size-1 kiss-flex-1"><strong><?=t('Locals')?></strong></div>
            </div>

            <app-loader v-if="loading"></app-loader>

            <div class="animated fadeIn kiss-height-30vh kiss-flex kiss-flex-middle kiss-flex-center kiss-align-center kiss-color-muted" v-if="locals && !locals.length">
                <div>
                    <icon class="kiss-size-xlarge">language</icon>
                    <p class="kiss-size-large kiss-text-bold"><?=t('No locals')?></p>
                </div>
            </div>

            <ul class="app-list-items animated fadeIn" v-if="locals && locals.length">

                <li v-for="(local, idx) in locals">

                    <div class="kiss-margin kiss-flex kiss-flex-middle">
                        <div class="kiss-margin-small-right"><icon>language</icon></div>
                        <div class="kiss-size-5 kiss-flex-1 kiss-position-relative">
                            <strong>{{local.name || local.i18n}}</strong>
                            <a class="kiss-cover" :href="$route('/settings/locals/local/'+local._id)"></a>
                        </div>
                        <div class="kiss-margin-left kiss-size-small kiss-align-right kiss-text-caption" :class="local.i18n == 'default' ? 'kiss-color-primary' : 'kiss-color-muted'"><strong>{{ local.i18n }}</strong></div>
                        <a class="kiss-display-block kiss-margin-left kiss-color-danger" @click="remove(local)"><icon>delete</icon></a>
                    </div>

                </li>

            </ul>

            <app-actionbar>

                <kiss-container size="small">
                    <div class="kiss-flex kiss-flex-middle kiss-flex-right">
                        <a class="kiss-button kiss-button-primary" href="<?=$this->route('/settings/locals/create')?>"><?=t('Add local')?></a>
                    </div>
                </kiss-container>

            </app-actionbar>


        </template>
        <script type="module">

            export default {

                data() {
                    return {
                        locals: null,
                        loading: false
                    }
                },

                mounted() {
                    this.load()
                },

                methods: {


                    load() {

                        this.loading = true;

                        this.$request('/settings/locals/load', {options:{}}).then(locals => {

                            this.locals = locals;
                            this.loading = false;
                        });
                    },

                    remove(local) {

                        App.ui.confirm('Are you sure?', () => {

                            this.$request('/settings/locals/remove', {local}).then(res => {
                                this.locals.splice(this.locals.indexOf(local), 1);
                            });
                        });
                    }
                }
            }

        </script>
    </vue-view>


</kiss-container>
