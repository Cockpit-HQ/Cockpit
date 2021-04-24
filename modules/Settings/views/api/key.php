<kiss-container class="kiss-margin" size="small">

    <ul class="kiss-breadcrumb">
        <li><a href="<?=$this->route('/settings')?>"><?=t('Settings')?></a></li>
        <li><a href="<?=$this->route('/settings/api')?>"><?=t('API & Security')?></a></li>
    </ul>

    <vue-view>
        <template>

            <h1 class="kiss-margin-large-bottom">
                <span v-if="!key._id"><?=t('Create key')?></span>
                <span v-if="key._id"><?=t('Edit key')?></span>
            </h1>

            <form :class="{'kiss-disabled':saving}" @submit.prevent="save">

                <div class="kiss-margin">
                    <label><?=t('Name')?></label>
                    <input class="kiss-input" type="text" v-model="key.name" required>
                </div>

                <kiss-card class="kiss-margin kiss-margin-large-top kiss-padding" theme="bordered">
                    <label><?=t('API Key')?></label>
                    <div class="kiss-flex kiss-flex-middle">
                        <div class="kiss-flex-1 kiss-margin-small-right kiss-text-truncate kiss-disabled">
                            <span class="kiss-text-caption" v-if="!key.key"><?=t('No api key created yet')?></span>
                            <span class="kiss-text-monospace kiss-text-bold" v-if="key.key">{{ key.key }}</span>
                        </div>
                        <a @click="generateToken"><icon>refresh</icon></a>
                        <a class="kiss-margin-small-left" v-if="key.key" @click="copyToken"><icon>content_copy</icon></a>
                    </div>
                </kiss-card>

                <app-actionbar>

                    <kiss-container size="small">
                        <div class="kiss-flex kiss-flex-middle kiss-flex-right">
                            <div class="kiss-button-group">
                                <a class="kiss-button kiss-button-link" href="<?=$this->route('/settings/api')?>">
                                    <span v-if="!key._id"><?=t('Cancel')?></span>
                                    <span v-if="key._id"><?=t('Close')?></span>
                                </a>
                                <button type="submit" class="kiss-button kiss-button-primary">
                                    <span v-if="!key._id"><?=t('Create key')?></span>
                                    <span v-if="key._id"><?=t('Update key')?></span>
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
                        key: <?=json_encode($key)?>
                    };
                },

                methods: {

                    save() {

                        let isUpdate = this.key._id;

                        this.saving = true;

                        this.$request('/settings/api/save', {key: this.key}).then(key => {

                            this.key = key;
                            this.saving = false;

                            if (isUpdate) {
                                App.ui.notify('Api key updated!');
                            } else {
                                App.ui.notify('Api key created!');
                            }
                        }).catch(res => {
                            this.saving = false;
                            App.ui.notify(res.error || 'Saving failed!', 'error');
                        })

                    },

                    generateToken() {

                        this.$request('/utils/generateToken').then(res => {
                            this.key.key = `API-${res.token}`;
                        });
                    },
                    copyToken() {
                        App.utils.copyText(this.key.key, () => {
                            App.ui.notify('Api key copied!');
                        });
                    },
                }
            }
        </script>

    </vue-view>

</kiss-container>