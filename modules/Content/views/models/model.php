<kiss-container class="kiss-margin" size="small">

    <ul class="kiss-breadcrumb">
        <li><a href="<?=$this->route('/content')?>"><?=t('Content')?></a></li>
    </ul>

    <vue-view>
        <template>

            <h1 class="kiss-margin-large-bottom">
                <span v-if="!isUpdate"><?=t('Create model')?></span>
                <span v-if="isUpdate"><?=t('Edit model')?></span>
            </h1>

            <form :class="{'kiss-disabled':saving}" @submit.prevent="save">

                <kiss-row class="kiss-margin kiss-child-width-1-2@m">
                    <div :class="{'kiss-disabled': isUpdate}">
                        <label><?=t('Name')?></label>
                        <input class="kiss-input" type="text" pattern="[a-zA-Z0-9_]+" v-model="model.name" :disabled="isUpdate" required>
                    </div>
                    <div>
                        <label><?=t('Display name')?></label>
                        <input class="kiss-input" type="text" v-model="model.label">
                    </div>
                </kiss-row>

                <div class="kiss-margin">
                    <label><?=t('Group')?></label>
                    <input class="kiss-input" type="text" v-model="model.group">
                </div>

                <div class="kiss-margin">
                    <label><?=t('Info')?></label>
                    <textarea class="kiss-input kiss-textarea" style="height:100px;" v-model="model.info"></textarea>
                </div>

                <div class="kiss-margin">
                    <label><?=t('Color')?></label>
                    <field-color v-model="model.color"></field-color>
                </div>

                <div class="kiss-margin kiss-margin-large-top">

                    <div class="kiss-text-bold kiss-text-caption kiss-margin"><?=t('Fields')?></div>

                    <fields-manager class="kiss-margin" v-model="model.fields"></fields-manager>

                </div>

                <app-actionbar>

                    <kiss-container size="small">
                        <div class="kiss-flex kiss-flex-middle kiss-flex-right">

                            <div class="kiss-flex-1" v-if="isUpdate">
                                <a class="kiss-button" :href="$route(`/content/collection/items/${model.name}`)"><?=t('Goto items')?></a>
                            </div>

                            <div class="kiss-button-group">
                                <a class="kiss-button" href="<?=$this->route('/content')?>">
                                    <span v-if="!isUpdate"><?=t('Cancel')?></span>
                                    <span v-if="isUpdate"><?=t('Close')?></span>
                                </a>
                                <button type="submit" class="kiss-button kiss-button-primary">
                                    <span v-if="!isUpdate"><?=t('Create model')?></span>
                                    <span v-if="isUpdate"><?=t('Update model')?></span>
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
                        model: <?=json_encode($model)?>,
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

                        this.$request('/content/models/save', {model: this.model}).then(model => {

                            this.model = model;
                            this.saving = false;

                            if (this.isUpdate) {
                                App.ui.notify('Model updated!');
                            } else {
                                App.ui.notify('Model created!');
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