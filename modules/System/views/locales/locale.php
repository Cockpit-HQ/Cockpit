<script>
    window.TMP_LOCALES_LIST = <?= json_encode(include($this->path('system:data/locales.php'))) ?>;
</script>

<kiss-container class="kiss-margin-small" size="small">

    <ul class="kiss-breadcrumbs">
        <li><a href="<?=$this->route('/system')?>"><?=t('Settings')?></a></li>
        <li><a href="<?=$this->route('/system/locales')?>"><?=t('Locales')?></a></li>
    </ul>

    <vue-view>
        <template>

            <div class="kiss-margin-large-bottom kiss-size-4">
                <strong v-if="!locale._id"><?=t('Create locale')?></strong>
                <strong v-if="locale._id"><?=t('Edit locale')?></strong>
            </div>

            <form :class="{'kiss-disabled':saving}" @submit.prevent="save">

                <div class="kiss-margin" :class="{'kiss-disabled': locale._id}">
                    <label><?=t('i18n')?></label>
                    <input class="kiss-input" type="text" list="lst-locales" pattern="[a-zA-Z0-9_]+" v-model="locale.i18n" :disabled="locale._id" required>
                    <datalist id="lst-locales">
                        <option v-for="(meta, locale) in lstLocales">{{ locale }}</option>
                    </datalist>
                </div>

                <div class="kiss-margin">
                    <label><?=t('Name')?></label>
                    <input class="kiss-input" type="text" v-model="locale.name" required>
                    <div class="kiss-size-xsmall kiss-color-muted kiss-margin-small" v-if="nameSuggestion">
                        {{ t('Suggestion for name') }}: <a @click="locale.name = nameSuggestion.name">{{nameSuggestion.name}}</a>, <a @click="locale.name = nameSuggestion.native">{{nameSuggestion.native}}</a>
                    </div>
                </div>

                <div class="kiss-margin">
                    <label><?=t('Enabled')?></label>
                    <field-boolean v-model="locale.enabled"></field-boolean>
                </div>

                <app-actionbar>

                    <kiss-container size="small">
                        <div class="kiss-flex kiss-flex-middle kiss-flex-right">
                            <div class="kiss-button-group">
                                <a class="kiss-button" href="<?=$this->route('/system/locales')?>">
                                    <span v-if="!locale._id"><?=t('Cancel')?></span>
                                    <span v-if="locale._id"><?=t('Close')?></span>
                                </a>
                                <button type="submit" class="kiss-button kiss-button-primary">
                                    <span v-if="!locale._id"><?=t('Create locale')?></span>
                                    <span v-if="locale._id"><?=t('Update locale')?></span>
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
                        locale: <?=json_encode($locale)?>,
                        lstLocales: TMP_LOCALES_LIST
                    };
                },

                computed: {
                    nameSuggestion() {

                        const loc = (this.locale.i18n || '').trim();

                        if (!loc) return null;

                        let locale = this.lstLocales[loc] || null;

                        if (locale && locale.name !== this.locale.name && locale.native !== this.locale.name) {
                            return locale;
                        }

                        return null;
                    }
                },

                methods: {

                    save() {

                        let isUpdate = this.locale._id;

                        this.saving = true;

                        this.$request('/system/locales/save', {locale: this.locale}).then(locale => {

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
