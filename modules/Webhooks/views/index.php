<kiss-container class="kiss-margin" size="medium">

    <ul class="kiss-breadcrumbs">
        <li><a href="<?=$this->route('/settings')?>"><?=t('Settings')?></a></li>
    </ul>


    <vue-view>

        <template>

            <div class="kiss-margin-large-bottom kiss-size-1 kiss-text-bold">
                <?=t('Webhooks')?>
            </div>

            <app-loader v-if="loading"></app-loader>

            <div class="animated fadeIn kiss-height-50vh kiss-flex kiss-flex-middle kiss-flex-center kiss-align-center kiss-color-muted" v-if="webhooks && !webhooks.length">
                <div>
                    <kiss-svg :src="$base('webhooks:icon.svg')" width="40" height="40"></kiss-svg>
                    <p class="kiss-size-large kiss-text-bold kiss-margin-small-top"><?=t('No webhooks')?></p>
                </div>
            </div>

            <div v-if="webhooks && webhooks.length">

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
                    <input type="text" class="kiss-input" :placeholder="t('Filter webhooks...')" v-model="filter">
                </div>

                <kiss-card class="kiss-margin-small kiss-padding kiss-flex kiss-flex-middle animated fadeIn" theme="shadowed contrast" hover="shadow" v-for="webhook in filtered">
                    <div :class="[webhook.enabled ? 'kiss-color-success':'kiss-color-danger']">
                        <kiss-svg :src="$base('webhooks:icon.svg')" width="30" height="30"></kiss-svg>
                    </div>
                    <div class="kiss-margin-small-left">
                        <a class="kiss-text-bold kiss-link-muted" :href="$route(`/webhooks/webhook/${webhook._id}`)">{{ webhook.name }}</a>
                    </div>
                    <div class="kiss-flex-1 kiss-size-small kiss-color-muted kiss-margin-small-left">{{ webhook.info }}</div>
                    <div class=" kiss-margin-small-left">
                        <a @click="toggleWebhookActions(webhook)"><icon>more_horiz</icon></a>
                    </div>
                </kiss-card>

            </div>

            <app-actionbar>

                <kiss-container size="medium">
                    <div class="kiss-flex kiss-flex-middle">
                        <div class="kiss-flex-1"></div>
                        <a class="kiss-button kiss-button-primary" href="<?=$this->route('/webhooks/webhook')?>"><?=t('Create webhook')?></a>
                    </div>
                </kiss-container>

            </app-actionbar>

            <kiss-popoutmenu :open="actionWebhook && 'true'" @popoutmenuclose="toggleWebhookActions(null)">
                <kiss-content>
                        <kiss-navlist v-if="actionWebhook">
                            <ul>
                                <li class="kiss-nav-header">{{ actionWebhook.name }}</li>
                                <li>
                                    <a class="kiss-flex kiss-flex-middle" :href="$route(`/webhooks/webhook/${actionWebhook._id}`)">
                                        <icon class="kiss-margin-small-right">create</icon>
                                        <?=t('Edit')?>
                                    </a>
                                </li>
                                <li class="kiss-nav-divider"></li>
                                <li>
                                    <a class="kiss-color-danger kiss-flex kiss-flex-middle" @click="remove(actionWebhook)">
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
                        webhooks: null,
                        group: null,
                        filter: '',
                        loading: false,
                        actionWebhook: null
                    }
                },

                mounted() {
                    this.load()
                },

                computed: {

                    filtered() {

                        let webhooks = [];

                        (this.webhooks || []).forEach(w => {

                            if (this.filter && !w.name.toLocaleLowerCase().includes(this.filter.toLocaleLowerCase())) {
                                return;
                            }

                            if (this.group && w.group != this.group ) return;
                            webhooks.push(w)
                        });

                        return webhooks;
                    },

                    groups() {
                        let groups = [];

                        (this.webhooks || []).forEach(w => {
                            if (!w.group || groups.indexOf(w.group) > -1) return;
                            groups.push(w.group);
                        });

                        return groups.sort();
                    }
                },

                methods: {

                    load() {

                        this.loading = true;

                        this.$request('/webhooks/load', {options:{}}).then(webhooks => {

                            this.webhooks = webhooks;
                            this.loading = false;
                        });
                    },

                    remove(webhook) {

                        App.ui.confirm('Are you sure?', () => {

                            this.$request('/webhooks/remove', {webhook}).then(res => {
                                this.webhooks.splice(this.webhooks.indexOf(webhook), 1);
                            });
                        });
                    },

                    toggleWebhookActions(webhook) {

                        if (!webhook) {
                            setTimeout(() => this.actionWebhook = null, 300);
                            return;
                        }

                        this.actionWebhook = webhook;
                    }
                }
            }

        </script>

    </vue-view>

</kiss-container>