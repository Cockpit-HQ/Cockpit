<kiss-container class="kiss-margin" size="small">

    <ul class="kiss-breadcrumb">
        <li><a href="<?=$this->route('/settings')?>"><?=t('Settings')?></a></li>
        <li><a href="<?=$this->route('/settings/locals')?>"><?=t('Locals')?></a></li>
    </ul>

    <vue-view>
        <template>

            <h1 class="kiss-margin-large-bottom">
                <span v-if="!local._id"><?=t('Create local')?></span>
                <span v-if="local._id"><?=t('Edit local')?></span>
            </h1>

            <form :class="{'kiss-disabled':saving}" @submit.prevent="save">

                <div class="kiss-margin" :class="{'kiss-disabled': local._id}">
                    <label><?=t('i18n')?></label>
                    <input class="kiss-input" type="text" pattern="[a-zA-Z0-9_]+" v-model="local.i18n" :disabled="local._id" required>
                </div>

                <div class="kiss-margin">
                    <label><?=t('Name')?></label>
                    <input class="kiss-input" type="text" v-model="local.name" required>
                </div>

                <app-actionbar>

                    <kiss-container size="small">
                        <div class="kiss-flex kiss-flex-middle kiss-flex-right">
                            <div class="kiss-button-group">
                                <a class="kiss-button" href="<?=$this->route('/settings/locals')?>">
                                    <span v-if="!local._id"><?=t('Cancel')?></span>
                                    <span v-if="local._id"><?=t('Close')?></span>
                                </a>
                                <button type="submit" class="kiss-button kiss-button-primary">
                                    <span v-if="!local._id"><?=t('Create local')?></span>
                                    <span v-if="local._id"><?=t('Update local')?></span>
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
                        local: <?=json_encode($local)?>
                    };
                },

                methods: {

                    save() {

                        let isUpdate = this.local._id;

                        this.saving = true;

                        this.$request('/settings/locals/save', {local: this.local}).then(local => {

                            this.local = local;
                            this.saving = false;

                            if (isUpdate) {
                                App.ui.notify('Local updated!');
                            } else {
                                App.ui.notify('Local created!');
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