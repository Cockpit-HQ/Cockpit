<style>

    icon[type="info"] { color: #4082fd; }
    icon[type="info"]:before { content: "\e88e"; }

    icon[type="warning"] { color: orange; }
    icon[type="warning"]:before { content: "\e002"; }

    icon[type="error"] { color: red;}
    icon[type="error"]:before { content: "\e031"; }

    icon[type="notice"] { color: yellow;}
    icon[type="notice"]:before { content: "\f1fc"; }

    icon[type="debug"] { color: turquoise;}
    icon[type="debug"]:before { content: "\e868"; }

    icon[type="alert"] { color: darkmagenta;}
    icon[type="alert"]:before { content: "\e7f7"; }

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

                <div class="kiss-flex-1">

                    <div class="kiss-flex kiss-flex-middle kiss-margin-bottom">
                        <div class="kiss-margin-small-right" v-if="selectedChannel"><kiss-svg class="kiss-color-muted" :src="$base(channels[selectedChannel].icon)" width="25" height="25"><canvas width="20" height="20"></canvas></kiss-svg></div>
                        <div class="kiss-size-4 kiss-text-light kiss-flex-1">{{ (selectedChannel && channels[selectedChannel].label) || 'All' }}</div>
                    </div>

                    <div class="kiss-margin">

                        <button class="kiss-button kiss-button-small kiss-margin-small-right" :class="{'kiss-button-primary': !selectedTypes.length}" @click="selectedTypes = []">All</button>

                        <div class="kiss-button-group">
                            <button class="kiss-button kiss-button-small" :class="{'kiss-button-primary': selectedTypes.indexOf('alert') > -1}" @click="toggleType('alert')">Alert</button>
                            <button class="kiss-button kiss-button-small" :class="{'kiss-button-primary': selectedTypes.indexOf('debug') > -1}" @click="toggleType('debug')">Debug</button>
                            <button class="kiss-button kiss-button-small" :class="{'kiss-button-primary': selectedTypes.indexOf('error') > -1}" @click="toggleType('error')">Error</button>
                            <button class="kiss-button kiss-button-small" :class="{'kiss-button-primary': selectedTypes.indexOf('info') > -1}" @click="toggleType('info')">Info</button>
                            <button class="kiss-button kiss-button-small" :class="{'kiss-button-primary': selectedTypes.indexOf('notice') > -1}" @click="toggleType('notice')">Notice</button>
                            <button class="kiss-button kiss-button-small" :class="{'kiss-button-primary': selectedTypes.indexOf('warning') > -1}" @click="toggleType('warning')">Warning</button>
                        </div>
                    </div>

                    <app-loader class="kiss-margin" v-if="loading"></app-loader>

                    <div class="kiss-height-50vh kiss-flex kiss-flex-middle kiss-flex-center kiss-align-center kiss-color-muted" v-if="!loading && !items.length">
                        <div class="animated fadeInUp">
                            <kiss-svg class="kiss-margin-auto" src="<?= $this->base('system:assets/icons/logging.svg') ?>" width="60" height="60"><canvas width="60" height="60"></canvas></kiss-svg>
                            <p class="kiss-size-large kiss-margin-small-top"><?= t('No log items') ?></p>
                        </div>
                    </div>

                    <table class="kiss-table animated fadeIn" v-if="!loading && items.length">
                        <thead>
                            <tr>
                                <th width="30">Type</th>
                                <th width="100">Date</th>
                                <th width="25" v-if="!selectedChannel">Channel</th>
                                <th>Message</th>
                                <th width="25"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in items">
                                <td class="kiss-align-center"><icon class="kiss-size-3" :type="item.type"></icon></td>
                                <td class="kiss-text-bold kiss-text-monospace"><div class="kiss-size-xsmall">{{ (new Date(item.timestamp * 1000).toLocaleString()) }}</div></td>
                                <td class="kiss-text-bold kiss-color-muted kiss-align-center" v-if="!selectedChannel"><app-avatar :name="item.channel" size="25" kiss-tooltip="bottom" :aria-label="item.channel"></app-avatar></td>
                                <td>{{ item.message }}</td>
                                <td class="kiss-align-center"><a class="kiss-color-primary kiss-size-3" v-if="item.context" @click="showContext(item.context)"><icon>more_horiz</icon></a></td>
                            </tr>
                        </tbody>
                    </table>

                </div>
                <div class="kiss-width-1-6@m">

                    <kiss-navlist>
                        <ul>
                            <li class="kiss-nav-header kiss-padding-small">Channels</li>
                            <li>
                                <kiss-card class="kiss-padding-small" :theme="!selectedChannel && 'bordered contrast'">
                                    <a class="kiss-display-block" @click="selectedChannel = null" :class="!selectedChannel ? 'kiss-text-bold kiss-color-primary':'kiss-color-muted'">{{ t('All') }}</a>
                                </kiss-card>
                            </li>
                            <li class="kiss-nav-divider"></li>
                            <li v-for="channel in channels">
                                <kiss-card class="kiss-flex kiss-flex-middle kiss-padding-small" :theme="selectedChannel == channel.name && 'bordered contrast'">
                                    <a class="kiss-flex-1" @click="selectedChannel = channel.name" :class="selectedChannel == channel.name ? 'kiss-text-bold kiss-color-primary':'kiss-color-muted'">{{ channel.label}}</a>
                                    <div class="kiss-margin-xsmall-left" v-if="selectedChannel == channel.name">
                                        <kiss-svg class="kiss-color-muted" :src="$base(channel.icon)" width="20" height="20"><canvas width="20" height="20"></canvas></kiss-svg>
                                    </div>
                                </kiss-card>
                            </li>
                        </ul>
                    </kiss-navlist>

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
                        selectedChannel: null,
                        selectedTypes: [],
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
                    selectedChannel() {
                        this.load(1);
                    },
                    selectedTypes: {
                        handler() { this.load(1) },
                        deep: true
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

                        if (this.selectedChannel || this.selectedTypes.length) {

                            options.filter = {};

                            if (this.selectedChannel) options.filter.channel = this.selectedChannel;
                            if (this.selectedTypes.length) options.filter.type = {$in: this.selectedTypes};
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
                        VueView.ui.offcanvas('system:assets/dialogs/json-viewer.js', {data: context, caption: 'LOG Context'}, {}, {flip: true, size: 'xlarge'})
                    },

                    toggleType($type) {

                        let idx = this.selectedTypes.indexOf($type);

                        if (idx > -1) {
                            this.selectedTypes.splice(idx, 1);
                        } else {
                            this.selectedTypes.push($type);
                        }

                    }
                }
            }

        </script>
    </vue-view>


</kiss-container>