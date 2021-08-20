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
                    <input class="kiss-input" type="text" pattern="[a-zA-Z0-9_]+" v-model="webhook.name" required>
                </div>

                <div class="kiss-margin">
                    <field-boolean v-model="webhook.enabled" :label="t('Enabled')"></field-boolean>
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
                                App.ui.notify('webhook updated!');
                            } else {
                                App.ui.notify('webhook created!');
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