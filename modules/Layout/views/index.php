
<kiss-container class="kiss-margin" size="medium">

    <ul class="kiss-breadcrumbs">
        <li><a href="<?=$this->route('/settings')?>"><?=t('Settings')?></a></li>
    </ul>

    <vue-view>

        <template>

            <div class="kiss-margin-large-bottom kiss-flex kiss-flex-middle">
                <div class="kiss-size-1 kiss-flex-1"><strong><?=t('Layout Components')?></strong></div>
            </div>

            <app-loader v-if="loading"></app-loader>

            <div class="animated fadeIn kiss-height-50vh kiss-flex kiss-flex-middle kiss-flex-center kiss-align-center kiss-color-muted" v-if="components && !components.length">
                <div>
                    <kiss-svg :src="$base('layout:assets/icons/component.svg')" width="60" height="60"></kiss-svg>
                    <p class="kiss-size-large kiss-text-bold kiss-margin-small-top"><?=t('No components')?></p>
                </div>
            </div>

            <ul class="app-list-items animated fadeIn" v-if="components && components.length">

                <li v-for="(component, idx) in components">

                    <div class="kiss-margin kiss-flex kiss-flex-middle">
                        <div class="kiss-margin-small-right">
                            <kiss-svg :src="$base('layout:assets/icons/component.svg')" width="30" height="30"></kiss-svg>
                        </div>
                        <div class="kiss-size-5 kiss-flex-1 kiss-position-relative">
                            <strong>{{component.meta.label || component.name}}</strong>
                            <a class="kiss-cover" :href="$route('/layout-components/component/'+component._id)"></a>
                        </div>
                        <div class="kiss-color-muted kiss-size-small">{{component.meta.group}}</div>
                        <a class="kiss-display-block kiss-margin-left kiss-color-danger" @click="remove(component)"><icon>delete</icon></a>
                    </div>

                </li>

            </ul>

            <app-actionbar>

                <kiss-container size="medium">
                    <div class="kiss-flex kiss-flex-middle kiss-flex-right">
                        <a class="kiss-button kiss-button-primary" href="<?=$this->route('/layout-components/component')?>"><?=t('Add component')?></a>
                    </div>
                </kiss-container>

            </app-actionbar>


        </template>

        <script type="module">

            export default {
                data() {
                    return {
                        components: null,
                        loading: false
                    }
                },

                mounted() {
                    this.load()
                },

                methods: {

                    load() {

                        this.loading = true;

                        this.$request('/layout-components/load', {options:{}}).then(components => {

                            this.components = components;
                            this.loading = false;
                        });
                    },

                    remove(component) {

                        App.ui.confirm('Are you sure?', () => {

                            this.$request('/layout-components/remove', {component}).then(res => {
                                this.components.splice(this.components.indexOf(component), 1);
                            });
                        });
                    }
                }
            }

        </script>

    </vue-view>

</kiss-container>