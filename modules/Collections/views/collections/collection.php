<kiss-container class="kiss-margin-large" size="small">

    <vue-view>
        <template>

            <h1 class="kiss-margin-large-bottom">
                <span v-if="!isUpdate"><?=t('Create collection')?></span>
                <span v-if="isUpdate"><?=t('Edit collection')?></span>
            </h1>

            <form :class="{'kiss-disabled':saving}" @submit.prevent="save">

                <kiss-row class="kiss-margin kiss-child-width-1-2@m">
                    <div :class="{'kiss-disabled': isUpdate}">
                        <label><?=t('Name')?></label>
                        <input class="kiss-input" type="text" pattern="[a-zA-Z0-9_]+" v-model="collection.name" :disabled="isUpdate" required>
                    </div>
                    <div>
                        <label><?=t('Display name')?></label>
                        <input class="kiss-input" type="text" v-model="collection.label">
                    </div>
                </kiss-row>

                <div class="kiss-margin">
                    <label><?=t('Group')?></label>
                    <input class="kiss-input" type="text" v-model="collection.group">
                </div>

                <div class="kiss-margin">
                    <label><?=t('Info')?></label>
                    <textarea class="kiss-input kiss-textarea" style="height:100px;" v-model="collection.info"></textarea>
                </div>

                <div class="kiss-margin">
                    <label><?=t('Color')?></label>
                    <field-color v-model="collection.color"></field-color>
                </div>

                <div class="kiss-margin kiss-margin-large-top">

                    <div class="kiss-text-bold kiss-text-caption kiss-margin"><?=t('Fields')?></div>

                    <fields-manager class="kiss-margin" v-model="collection.fields"></fields-manager>

                </div>

                <app-actionbar>

                    <kiss-container size="small">
                        <div class="kiss-flex kiss-flex-middle kiss-flex-right">

                            <div class="kiss-flex-1" v-if="isUpdate">
                                <a class="kiss-button" :href="$route(`/collections/entries/list/${collection.name}`)"><?=t('Goto entries')?></a>
                            </div>

                            <div class="kiss-button-group">
                                <a class="kiss-button kiss-button-link" href="<?=$this->route('/collections')?>">
                                    <span v-if="!isUpdate"><?=t('Cancel')?></span>
                                    <span v-if="isUpdate"><?=t('Close')?></span>
                                </a>
                                <button type="submit" class="kiss-button kiss-button-primary">
                                    <span v-if="!isUpdate"><?=t('Create collection')?></span>
                                    <span v-if="isUpdate"><?=t('Update collection')?></span>
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
                        collection: <?=json_encode($collection)?>,
                        isUpdate: <?=json_encode($isUpdate)?>,
                        saving: false
                    }
                },

                components: {
                    'fields-manager': 'settings:assets/vue-components/fields-manager.js'
                },

                methods: {
                    save() {

                        this.saving = true;

                        this.$request('/collections/save', {collection: this.collection}).then(collection => {

                            this.collection = collection;
                            this.saving = false;

                            if (this.isUpdate) {
                                App.ui.notify('Collection updated!');
                            } else {
                                App.ui.notify('Collection created!');
                                this.isUpdate = true;
                            }
                        }).catch(res => {
                            this.saving = false;
                            App.ui.notify(res.error || 'Saving failed!', 'error');
                        });

                    },
                }
            }
        </script>

    </vue-view>


</kiss-container>