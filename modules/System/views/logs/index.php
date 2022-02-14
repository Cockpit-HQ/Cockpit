
<kiss-container class="kiss-margin">

    <ul class="kiss-breadcrumbs">
        <li><a href="<?=$this->route('/system')?>"><?=t('Settings')?></a></li>
    </ul>

    <div class="kiss-margin-large-bottom kiss-flex kiss-flex-middle">
        <div class="kiss-size-4 kiss-flex-1"><strong><?=t('Logs')?></strong></div>
    </div>


    <vue-view>
        <template>

            <kiss-row gap="large">
                <div class="kiss-width-1-6@m">

                    <kiss-navlist>
                        <ul>
                            <li class="kiss-nav-header kiss-padding-small">Channels</li>
                            <li>
                                <kiss-card class="kiss-padding-small" :theme="!activeChannel && 'bordered contrast'">
                                    <a class="kiss-display-block" @click="activeChannel = null" :class="!activeChannel ? 'kiss-text-bold kiss-color-primary':'kiss-color-muted'">{{ t('All') }}</a>
                                </kiss-card>
                            </li>
                            <li class="kiss-nav-divider"></li>
                            <li v-for="channel in channels">
                                <kiss-card class="kiss-flex kiss-flex-middle kiss-padding-small" :theme="activeChannel == channel.name && 'bordered contrast'">
                                    <a class="kiss-flex-1" @click="activeChannel = channel.name" :class="activeChannel == channel.name ? 'kiss-text-bold kiss-color-primary':'kiss-color-muted'">{{ channel.label}}</a>
                                    <div class="kiss-margin-xsmall-left" v-if="activeChannel == channel.name">
                                        <kiss-svg class="kiss-color-muted" :src="$base(channel.icon)" width="20" height="20"><canvas width="20" height="20"></canvas></kiss-svg>
                                    </div>
                                </kiss-card>
                            </li>
                        </ul>
                    </kiss-navlist>

                </div>
                <div class="kiss-flex-1">

                    <app-loader class="kiss-margin" v-if="loading"></app-loader>

                </div>
            </kiss-row>

            <app-actionbar>

                <kiss-container>
                    <kiss-card class="kiss-flex kiss-flex-middle kiss-padding" theme="shadowed contrast" v-if="!loading && count">

                        <div class="kiss-size-small">{{ `${count} ${count == 1 ? t('Item') : t('Items')}` }}</div>
                        <div class="kiss-margin-small-left kiss-overlay-input">
                            <span class="kiss-badge kiss-badge-outline kiss-color-muted">{{ page }} / {{pages}}</span>
                            <select v-model="page" @change="load(page)" v-if="pages > 1">
                                <option v-for="p in pages" :value="p">{{ p }}</option>
                            </select>
                        </div>
                        <div class="kiss-margin-small-left kiss-size-small">
                            <a class="kiss-margin-small-right" v-if="(page - 1) >= 1" @click="load(page - 1)"><?= t('Previous') ?></a>
                            <a v-if="(page + 1) <= pages" @click="load(page + 1)"><?= t('Next') ?></a>
                        </div>

                    </kiss-card>
                </kiss-container>

            </app-actionbar>

        </template>

        <script type="module">

            export default {

                data() {
                    return {
                        channels: <?=json_encode($channels)?>,
                        activeChannel: null,
                        items: [],
                        filter: '',
                        txtFilter: '',
                        page: 1,
                        pages: 1,
                        limit: 50,
                        count: 0,
                        loading: false
                    }
                },

                mounted() {
                    this.load();
                },

                methods: {

                    load(page = 1, history = true) {

                        let options = {
                            limit: this.limit,
                            skip: (page - 1) * this.limit,
                            sort: this.sort
                        };

                        this.loading = true;
                        this.selected = [];

                        if (this.filter) {
                            options.filter = this.filter;
                        }

                        this.$request(`/system/logs/load`, { options }).then(rsp => {
                            this.items = rsp.items;
                            this.page = rsp.page;
                            this.pages = rsp.pages;
                            this.count = rsp.count;
                            console.log(this.items)
                            this.loading = false;
                        });
                    }
                }
            }

        </script>
    </vue-view>


</kiss-container>