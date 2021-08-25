<kiss-container class="kiss-margin" size="small">

    <ul class="kiss-breadcrumbs">
        <li><a href="<?=$this->route('/settings')?>"><?=t('Settings')?></a></li>
        <li><a href="<?=$this->route('/webhooks')?>"><?=t('Webhooks')?></a></li>
    </ul>

    <vue-view>
        <template>

            <h1 class="kiss-margin-large-bottom">
                <span v-if="!webhook._id"><?=t('Create webhook')?></span>
                <span v-if="webhook._id"><?=t('Edit webhook')?></span>
            </h1>

            <form :class="{'kiss-disabled':saving}" @submit.prevent="save">

                <div class="kiss-margin">
                    <label><?=t('Name')?></label>
                    <input class="kiss-input" type="text" v-model="webhook.name" required>
                </div>

                <div class="kiss-margin">
                    <field-boolean v-model="webhook.enabled" :label="t('Enabled')"></field-boolean>
                </div>

                <div class="kiss-margin-large">

                    <div class="kiss-flex kiss-flex-middle">
                        <div class="kiss-size-xsmall kiss-text-bold kiss-text-upper kiss-color-muted kiss-margin-small-right"><?=t('HTTP settings')?></div>
                        <hr class="kiss-flex-1 kiss-margin-remove">
                    </div>

                    <div class="kiss-margin">
                        <label><?=t('Url')?></label>
                        <input class="kiss-input" type="url" v-model="webhook.url" placeholder="https://domain.tld/webhook" required>
                    </div>

                    <div class="kiss-margin">
                        <label><?=t('Custom headers')?></label>

                        <kiss-card class="animated fadeIn kiss-padding kiss-align-center kiss-text-caption kiss-margin-small" theme="bordered contrast" v-if="!webhook.headers.length">
                            <div class="kiss-text-bold"><?=t('No custom headers defined')?></div>
                        </kiss-card>

                        <div class="kiss-margin-small kiss-flex kiss-flex-middle" v-for="header in webhook.headers">
                            <input class="kiss-input kiss-input-small kiss-flex-1 kiss-margin-small-right" type="text" v-model="header.key" placeholder="Key" required>
                            <input class="kiss-input kiss-input-small kiss-flex-1 kiss-margin-small-right" type="text" v-model="header.val" placeholder="Value">
                            <a class="kiss-margin-small-left kiss-color-danger" @click="webhook.headers.splice(webhook.headers.indexOf(header), 1)"><icon>delete</icon></a>
                        </div>

                        <div class="kiss-margin-small">
                            <a class="kiss-button kiss-button-small" @click="webhook.headers.push({key:'', val:''})"><?=t('Add header')?></a>
                        </div>

                    </div>

                </div>

                <div class="kiss-margin-large">

                    <div class="kiss-flex kiss-flex-middle">
                        <div class="kiss-size-xsmall kiss-text-bold kiss-text-upper kiss-color-muted kiss-margin-small-right"><?=t('HTTP body')?></div>
                        <hr class="kiss-flex-1 kiss-margin-remove">
                    </div>

                    <div class="kiss-margin-small">
                        <field-boolean v-model="webhook.body.payload" :label="t('Include payload')"></field-boolean>
                    </div>

                    <div class="kiss-margin-small">
                        <field-boolean v-model="webhook.body.custom" :label="t('Custom payload')" v-if="webhook.body.payload"></field-boolean>
                    </div>

                    <div class="kiss-margin" v-if="webhook.body.payload && webhook.body.custom">
                        <label><?=t('Payload')?></label>
                        <field-object v-model="webhook.body.contents" :label="t('Custom payload')"></field-object>
                    </div>

                </div>


                <app-actionbar>

                    <kiss-container size="small">
                        <div class="kiss-flex kiss-flex-middle kiss-flex-right">
                            <div class="kiss-button-group">
                                <a class="kiss-button" href="<?=$this->route('/webhooks')?>">
                                    <span v-if="!webhook._id"><?=t('Cancel')?></span>
                                    <span v-if="webhook._id"><?=t('Close')?></span>
                                </a>
                                <button type="submit" class="kiss-button kiss-button-primary">
                                    <span v-if="!webhook._id"><?=t('Create webhook')?></span>
                                    <span v-if="webhook._id"><?=t('Update webhook')?></span>
                                </button>
                            </div>
                        </div>
                    </kiss-container>

                </app-actionbar>

            </form>

        </template>

        <script type="module">

            export default {
                data() {

                    return {
                        saving: false,
                        webhook: <?=json_encode($webhook)?>
                    };
                },

                methods: {

                    save() {

                        let isUpdate = this.webhook._id;

                        this.saving = true;

                        this.$request('/webhooks/save', {webhook: this.webhook}).then(webhook => {

                            this.webhook = webhook;
                            this.saving = false;

                            if (isUpdate) {
                                App.ui.notify('Webhook updated!');
                            } else {
                                App.ui.notify('Webhook created!');
                            }
                        }).catch(res => {
                            this.saving = false;
                            App.ui.notify(res.error || 'Saving failed!', 'error');
                        })

                    }
                }
            }
        </script>

    </vue-view>

</kiss-container>