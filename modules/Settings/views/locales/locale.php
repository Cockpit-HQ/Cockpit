<kiss-container class="kiss-margin-large" size="small">

    <vue-view>
        <template>

            <h1 class="kiss-margin-large-bottom">
                <span v-if="!locale._id"><?=_t('Create locale')?></span>
                <span v-if="locale._id"><?=_t('Edit locale')?></span>
            </h1>

            <form :class="{'kiss-disabled':saving}" @submit.prevent="save">

                <div class="kiss-margin" :class="{'kiss-disabled': locale._id}">
                    <label><?=_t('i18n')?></label>
                    <input class="kiss-input" type="text" pattern="[a-zA-Z0-9_]+" v-model="locale.i18n" :disabled="locale._id" required>
                </div>

                <div class="kiss-margin">
                    <label><?=_t('Name')?></label>
                    <input class="kiss-input" type="text" v-model="locale.name" required>
                </div>


                <div class="kiss-margin-large kiss-flex kiss-flex-middle">
                    <button type="submit" class="kiss-button kiss-button-primary">
                        <span v-if="!locale._id"><?=_t('Create locale')?></span>
                        <span v-if="locale._id"><?=_t('Update locale')?></span>
                    </button>
                    <a class="kiss-margin-left kiss-button kiss-button-link" href="<?=$this->route('/settings/locales')?>">
                        <span v-if="!locale._id"><?=_t('Cancel')?></span>
                        <span v-if="locale._id"><?=_t('Close')?></span>
                    </a>
                </div>

            </form>

        </template>

        <script type="module">

            export default {
                data() {

                    return {
                        saving: false,
                        locale: <?=json_encode($locale)?>
                    };
                },

                methods: {

                    save() {

                        let isUpdate = this.locale._id;

                        this.saving = true;

                        App.request('/settings/locales/save', {locale: this.locale}).then(locale => {

                            this.locale = locale;
                            this.saving = false;

                            if (isUpdate) {
                                App.ui.notify('Locale updated!');
                            } else {
                                App.ui.notify('Locale created!');
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