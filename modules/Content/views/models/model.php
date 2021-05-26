<kiss-container class="kiss-margin" size="small">

    <ul class="kiss-breadcrumbs">
        <li><a href="<?=$this->route('/content')?>"><?=t('Content')?></a></li>
    </ul>

    <vue-view>
        <template>

            <h1 class="kiss-margin-large-bottom">
                <span v-if="!isUpdate"><?=t('Create model')?></span>
                <span v-if="isUpdate"><?=t('Edit model')?></span>
            </h1>

            <form :class="{'kiss-disabled':saving}" @submit.prevent="save">

                <div class="kiss-margin-large" v-if="!isUpdate">
                    <label><?=t('Type')?></label>

                    <kiss-row class="kiss-child-width-1-4">
                        <div>
                            <kiss-card class="kiss-padding-large kiss-position-relative kiss-align-center" :class="model.type == 'singleton' ? 'kiss-color-primary kiss-bgcolor-contrast': 'kiss-color-muted'">
                                <div>
                                    <kiss-svg src="<?=$this->base('content:assets/icons/singleton.svg')?>" width="50" height="50"><canvas width="50" height="50"></canvas></kiss-svg>
                                    <div class="kiss-size-xsmall kiss-margin-top">
                                        {{ t('Singleton') }}
                                    </div>
                                </div>
                                <a class="kiss-cover" @click="model.type = 'singleton'"></a>
                            </kiss-card>
                        </div>
                        <div>
                            <kiss-card class="kiss-padding-large kiss-position-relative kiss-padding kiss-align-center" :class="model.type == 'collection' ? 'kiss-color-primary kiss-bgcolor-contrast': 'kiss-color-muted'">
                                <div>
                                    <kiss-svg src="<?=$this->base('content:assets/icons/collection.svg')?>" width="50" height="50"><canvas width="50" height="50"></canvas></kiss-svg>
                                    <div class="kiss-size-xsmall kiss-margin-top">
                                        {{ t('Collection') }}
                                    </div>
                                </div>
                                <a class="kiss-cover" @click="model.type = 'collection'"></a>
                            </kiss-card>
                        </div>
                    </kiss-row>
                </div>

                <div class="kiss-margin" v-if="isUpdate">
                    <span class="kiss-badge kiss-text-upper">{{ model.type }}</span>
                </div>

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
                    <input class="kiss-input" type="text" list="model-groups" v-model="model.group">
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
                                <a class="kiss-button" :href="$route(`/content/collection/items/${model.name}`)" v-if="model.type == 'collection'"><?=t('Goto items')?></a>
                                <a class="kiss-button" :href="$route(`/content/singleton/item/${model.name}`)" v-if="model.type == 'singleton'"><?=t('Goto form')?></a>
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

            <datalist id="model-groups" v-if="groups.length">
                <option v-for="group in groups">{{ group }}</option>
            </datalist>

        </template>

        <script type="module">

            export default {
                data() {
                    return {
                        model: <?=json_encode($model)?>,
                        groups: <?=json_encode($groups)?>,
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