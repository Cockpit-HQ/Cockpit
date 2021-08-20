
<kiss-container class="kiss-margin" size="medium">

    <ul class="kiss-breadcrumbs">
        <li><a href="<?=$this->route('/settings')?>"><?=t('Settings')?></a></li>
    </ul>

    <vue-view>

        <template>

            <div class="kiss-margin-large-bottom kiss-size-1 kiss-text-bold">
                <?=t('Layout Components')?>
            </div>

            <app-loader v-if="loading"></app-loader>

            <div class="animated fadeIn kiss-height-50vh kiss-flex kiss-flex-middle kiss-flex-center kiss-align-center kiss-color-muted" v-if="components && !components.length">
                <div>
                    <kiss-svg :src="$base('layout:assets/icons/component.svg')" width="60" height="60"></kiss-svg>
                    <p class="kiss-size-large kiss-text-bold kiss-margin-small-top"><?=t('No components')?></p>
                </div>
            </div>

            <div v-if="components && components.length">

                <app-tabs static="true" v-if="groups.length">
                    <ul class="app-tabs-nav">
                        <li :active="group === null">
                            <a class="app-tabs-nav-link" @click="group = null">{{t('All')}}</a>
                        </li>
                        <li :active="group == name" v-for="name in groups">
                            <a class="app-tabs-nav-link" @click="group = name">{{ name }}</a>
                        </li>
                    </ul>
                </app-tabs>

                <div class="kiss-margin">
                    <input type="text" class="kiss-input" :placeholder="t('Filter components...')" v-model="filter">
                </div>

                <ul class="app-list-items animated fadeIn">

                    <li v-for="(component, idx) in filtered">

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

            </div>

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
                        group: null,
                        filter: '',
                        loading: false
                    }
                },

                computed: {

                    filtered() {

                        let components = [];

                        (this.components || []).forEach(c => {

                            if (this.filter && !`${c.name} ${c.meta.label || ''}`.toLocaleLowerCase().includes(this.filter.toLocaleLowerCase())) {
                                return;
                            }

                            if (this.group && c.meta.group != this.group ) return;
                            components.push(c)
                        });

                        return components;
                    },

                    groups() {
                        let groups = [];

                        (this.components || []).forEach(c => {
                            if (!c.meta.group || groups.indexOf(c.meta.group) > -1) return;
                            groups.push(c.meta.group);
                        });

                        return groups.sort();
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