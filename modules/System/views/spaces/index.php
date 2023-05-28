<kiss-container class="kiss-margin">

    <ul class="kiss-breadcrumbs">
        <li><a href="<?=$this->route('/system')?>"><?=t('Settings')?></a></li>
    </ul>

    <vue-view>

        <template>

            <div class="kiss-margin-large-bottom kiss-flex kiss-flex-middle">
                <span class="kiss-size-4 kiss-text-bold"><?=t('Spaces')?></span>
                <span class="kiss-badge kiss-margin-small-left">BETA</span>
            </div>

            <app-loader v-if="loading"></app-loader>

            <div class="animated fadeIn kiss-height-50vh kiss-flex kiss-flex-middle kiss-flex-center kiss-align-center kiss-color-muted" v-if="spaces && !spaces.length">
                <div>
                    <kiss-svg :src="$base('system:assets/icons/spaces.svg')" width="40" height="40"></kiss-svg>
                    <p class="kiss-size-large kiss-margin-small-top"><?=t('No spaces')?></p>
                </div>
            </div>

            <div v-if="spaces && spaces.length">

                <div class="kiss-margin">
                    <input type="text" class="kiss-input" :placeholder="t('Filter spaces...')" v-model="filter">
                </div>

                <kiss-grid cols="4@m">
                    <kiss-card class="kiss-flex kiss-flex-middle animated fadeIn" theme="shadowed contrast" hover="shadow" v-for="space in filtered">
                        <div class="kiss-position-relative kiss-padding-small kiss-bgcolor-contrast">
                            <canvas width="40" height="40"></canvas>
                            <div class="kiss-cover kiss-flex kiss-flex-middle kiss-flex-center">
                                <div><kiss-svg :src="$base('system:assets/icons/spaces.svg')" width="30" height="30"></kiss-svg></div>
                            </div>
                            <a class="kiss-cover" :href="space.url" target="_blank" rel="noopener noreferrer"></a>
                        </div>
                        <div class="kiss-padding-small kiss-margin-small-left kiss-flex-1">
                            <a class="kiss-text-bold kiss-link-muted" :href="space.url" target="_blank" rel="noopener noreferrer">{{ space.name}}</a>
                        </div>
                        <div class="kiss-padding-small kiss-margin-small-left">
                            <a @click="togglespaceActions(space)"><icon>more_horiz</icon></a>
                        </div>
                    </kiss-card>
                </kiss-grid>

            </div>

            <app-actionbar>

                <kiss-container>
                    <div class="kiss-flex kiss-flex-middle">
                        <div class="kiss-flex-1"></div>
                        <a class="kiss-button kiss-button-primary" href="<?=$this->route('/system/spaces/create')?>"><?=t('Create space')?></a>
                    </div>
                </kiss-container>

            </app-actionbar>

            <kiss-popout :open="actionSpace && 'true'" @popoutclose="togglespaceActions(null)">
                <kiss-content>
                        <kiss-navlist v-if="actionSpace">
                            <ul>
                                <li class="kiss-nav-header">{{ actionSpace.name }}</li>
                                <li>
                                    <a class="kiss-flex kiss-flex-middle" :href="actionSpace.url" target="_blank" rel="noopener noreferrer">
                                        <icon class="kiss-margin-small-right">link</icon>
                                        <?=t('Open space')?>
                                    </a>
                                </li>
                                <li class="kiss-nav-divider"></li>
                                <li>
                                    <a class="kiss-color-danger kiss-flex kiss-flex-middle" @click="remove(actionSpace)">
                                        <icon class="kiss-margin-small-right">delete</icon>
                                        <?=t('Delete')?>
                                    </a>
                                </li>
                            </ul>
                        </kiss-navlist>
                </kiss-content>
            </kiss-popout>

        </template>

        <script type="module">

            export default {

                data() {
                    return {
                        spaces: null,
                        filter: '',
                        loading: false,
                        actionSpace: null
                    }
                },

                mounted() {
                    this.load()
                },

                computed: {

                    filtered() {

                        let spaces = [];

                        (this.spaces || []).forEach(p => {

                            if (this.filter && !`${p.name} ${p.label || ''}`.toLocaleLowerCase().includes(this.filter.toLocaleLowerCase())) {
                                return;
                            }
                            spaces.push(p)
                        });

                        return spaces;
                    },
                },

                methods: {

                    load() {

                        this.loading = true;

                        this.$request('/system/spaces/load', {options:{}}).then(spaces => {
                            this.spaces = spaces;
                            this.loading = false;
                        });
                    },

                    remove(space) {

                        App.ui.confirm('Are you sure?', () => {

                            this.$request('/system/spaces/remove', {space}).then(res => {
                                this.spaces.splice(this.spaces.indexOf(space), 1);
                            });
                        });
                    },

                    togglespaceActions(space) {

                        if (!space) {
                            setTimeout(() => this.actionSpace = null, 300);
                            return;
                        }

                        this.actionSpace = space;
                    }
                }
            }

        </script>

    </vue-view>


</kiss-container>
