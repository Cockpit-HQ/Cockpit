<style>

    icon[type="info"] { color: blue; }
    icon[type="warning"] { color: orange; }
    icon[type="error"] { color: red;}
    icon[type="notice"] { color: yellow;}
    icon[type="debug"] { color: turquoise;}
    icon[type="alert"] { color: darkmagenta;}

</style>


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

                    <div class="animated fadeIn kiss-height-50vh kiss-flex kiss-flex-middle kiss-flex-center kiss-align-center kiss-color-muted" v-if="!loading && !items.length">
                        <div>
                            <kiss-svg class="kiss-margin-auto" src="<?= $this->base('system:assets/icons/logging.svg') ?>" width="60" height="60"><canvas width="60" height="60"></canvas></kiss-svg>
                            <p class="kiss-size-large kiss-text-bold kiss-margin-small-top"><?= t('No log items') ?></p>
                        </div>
                    </div>

                    <table class="kiss-table animated fadeIn" v-if="!loading && items.length">
                        <thead>
                            <tr>
                                <th width="30">Type</th>
                                <th width="100">Date</th>
                                <th width="25" v-if="!activeChannel">Channel</th>
                                <th>Message</th>
                                <th width="25"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in items">
                                <td class="kiss-align-center"><icon :type="item.type">trip_origin</icon></td>
                                <td class="kiss-text-bold kiss-text-monospace"><div class="kiss-size-xsmall">{{ (new Date(item.timestamp * 1000).toLocaleString()) }}</div></td>
                                <td class="kiss-text-bold kiss-color-muted kiss-align-center" v-if="!activeChannel"><app-avatar :name="item.channel" size="25" kiss-tooltip="bottom" :aria-label="item.channel"></app-avatar></td>
                                <td>{{ item.message }}</td>
                                <td class="kiss-align-center"><a class="kiss-color-primary kiss-size-3" v-if="item.context" @click="showContext(item.context)"><icon>more_horiz</icon></a></td>
                            </tr>
                        </tbody>
                    </table>

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

                watch: {
                    activeChannel() {
                        this.load(1);
                    }
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

                        if (this.activeChannel) {
                            options.filter = {channel: this.activeChannel};
                        }

                        if (this.filter) {
                            options.filter = this.filter;
                        }

                        this.$request(`/system/logs/load`, { options }).then(rsp => {
                            this.items = rsp.items;
                            this.page = rsp.page;
                            this.pages = rsp.pages;
                            this.count = rsp.count;

                            this.loading = false;
                        });
                    },

                    showContext(context) {
                        VueView.ui.offcanvas('system:assets/dialogs/json-viewer.js', {data: context, caption: 'LOG Context'}, {}, {flip: true, size: 'large'})
                    },
                }
            }

        </script>
    </vue-view>


</kiss-container>