<kiss-container class="kiss-margin-large" size="medium">

    <vue-view>

        <template>

            <app-loader v-if="loading"></app-loader>

            <div class="animated fadeIn kiss-height-50vh kiss-flex kiss-flex-middle kiss-flex-center kiss-align-center kiss-color-muted" v-if="menus && !menus.length">
                <div>
                    <kiss-svg :src="$base('pages:assets/icons/nav.svg')" width="40" height="40"><canvas width="40" height="40"></canvas></kiss-svg>
                    <p class="kiss-size-large kiss-text-bold kiss-margin-small-top"><?=t('No menus')?></p>
                </div>
            </div>

            <div v-if="menus && menus.length">

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
                    <input type="text" class="kiss-input" :placeholder="t('Filter menus...')" v-model="filter">
                </div>

                <kiss-card class="kiss-margin-small kiss-padding kiss-flex kiss-flex-middle animated fadeIn" theme="shadowed contrast" hover="shadow" v-for="menu in filtered">
                    <div>
                        <kiss-svg :src="$base('pages:assets/icons/nav.svg')" width="30" height="30" :style="{color: menu.color || 'inherit' }"></kiss-svg>
                    </div>
                    <div class="kiss-margin-small-left">
                        <a class="kiss-text-bold kiss-link-muted" :href="$route(`/pages/menus/menu/${menu.name}`)">{{ menu.label || menu.name}}</a>
                    </div>
                    <div class="kiss-flex-1 kiss-size-small kiss-color-muted kiss-margin-small-left">{{ menu.info }}</div>
                    <div class=" kiss-margin-small-left">
                        <a @click="togglemenuActions(menu)"><icon>more_horiz</icon></a>
                    </div>
                </kiss-card>

            </div>

            <app-actionbar>

                <kiss-container size="medium">
                    <div class="kiss-flex kiss-flex-middle">
                        <div class="kiss-flex-1"></div>
                        <a class="kiss-button kiss-button-primary" href="<?=$this->route('/pages/menus/menu')?>"><?=t('Create menu')?></a>
                    </div>
                </kiss-container>

            </app-actionbar>

            <kiss-popoutmenu :open="actionMenu && 'true'" @popoutmenuclose="togglemenuActions(null)">
                <kiss-content>
                        <kiss-navlist v-if="actionMenu">
                            <ul>
                                <li class="kiss-nav-header">{{ actionMenu.label || actionMenu.name }}</li>
                                <li>
                                    <a class="kiss-flex kiss-flex-middle" :href="$route(`/pages/menus/menu/${actionMenu.name}`)">
                                        <icon class="kiss-margin-small-right">create</icon>
                                        <?=t('Edit')?>
                                    </a>
                                </li>
                                <li class="kiss-nav-divider"></li>
                                <li>
                                    <a class="kiss-color-danger kiss-flex kiss-flex-middle" @click="remove(actionMenu)">
                                        <icon class="kiss-margin-small-right">delete</icon>
                                        <?=t('Delete')?>
                                    </a>
                                </li>
                            </ul>
                        </kiss-navlist>
                </kiss-content>
            </kiss-popoutmenu>

        </template>

        <script type="module">

            export default {

                data() {
                    return {
                        menus: null,
                        group: null,
                        filter: '',
                        loading: false,
                        actionMenu: null
                    }
                },

                mounted() {
                    this.load()
                },

                computed: {

                    filtered() {

                        let menus = [];

                        (this.menus || []).forEach(p => {

                            if (this.filter && !`${p.name} ${p.label || ''}`.toLocaleLowerCase().includes(this.filter.toLocaleLowerCase())) {
                                return;
                            }

                            if (this.group && p.group != this.group ) return;
                            menus.push(p)
                        });

                        return menus;
                    },

                    groups() {
                        let groups = [];

                        (this.menus || []).forEach(p => {
                            if (!p.group || groups.indexOf(p.group) > -1) return;
                            groups.push(p.group);
                        });

                        return groups.sort();
                    }
                },

                methods: {

                    load() {

                        this.loading = true;

                        this.$request('/pages/menus/load', {options:{}}).then(menus => {

                            this.menus = menus;
                            this.loading = false;
                        }).catch(res => {
                            this.loading = false;
                            App.ui.notify(res.error || 'Loading failed!', 'error');
                        });
                    },

                    remove(menu) {

                        App.ui.confirm('Are you sure?', () => {

                            this.$request('/pages/menus/remove', {menu}).then(res => {
                                this.menus.splice(this.menus.indexOf(menu), 1);
                            });
                        });
                    },

                    togglemenuActions(menu) {

                        if (!menu) {
                            setTimeout(() => this.actionMenu = null, 300);
                            return;
                        }

                        this.actionMenu = menu;
                    }
                }
            }

        </script>

    </vue-view>


</kiss-container>