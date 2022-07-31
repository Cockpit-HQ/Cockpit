<kiss-container class="kiss-margin" size="small">

    <ul class="kiss-breadcrumbs">
        <li><a href="<?=$this->route('/content')?>"><?=t('Content')?></a></li>
    </ul>

    <vue-view>
        <template>

            <div class="kiss-margin-large-bottom kiss-size-4">
                <strong v-if="!isUpdate"><?=t('Create model')?></strong>
                <strong v-if="isUpdate"><?=t('Edit model')?></strong>
            </div>

            <form :class="{'kiss-disabled':saving}" @submit.prevent="save">

                <div class="kiss-margin-large" v-if="!isUpdate">
                    <label><?=t('Type')?></label>

                    <kiss-grid cols="3@m" gap="small">

                        <kiss-card class="kiss-flex kiss-padding kiss-position-relative" theme="bordered" :class="model.type == 'singleton' ? '': 'kiss-color-muted'" :style="{borderColor:model.type == 'singleton' ? 'var(--kiss-color-primary)': null}">
                            <div class="kiss-margin-small-right"><kiss-svg src="<?=$this->base('content:assets/icons/singleton.svg')?>" width="30" height="30"><canvas width="30" height="30"></canvas></kiss-svg></div>
                            <div class="kiss-size-small">
                                <strong>{{ t('Singleton') }}</strong>
                                <div class="kiss-size-xsmall kiss-color-muted kiss-margin-xsmall-top">
                                    <?=t('Model has one single item')?>
                                </div>
                            </div>
                            <a class="kiss-cover" @click="model.type = 'singleton'"></a>
                        </kiss-card>

                        <kiss-card class="kiss-flex kiss-padding kiss-position-relative kiss-padding" theme="bordered" :class="model.type == 'collection' ? '': 'kiss-color-muted'" :style="{borderColor:model.type == 'collection' ? 'var(--kiss-color-primary)': null}">
                            <div class="kiss-margin-small-right"><kiss-svg src="<?=$this->base('content:assets/icons/collection.svg')?>" width="30" height="30"><canvas width="30" height="30"></canvas></kiss-svg></div>
                            <div class="kiss-size-small">
                                <strong>{{ t('Collection') }}</strong>
                                <div class="kiss-size-xsmall kiss-color-muted kiss-margin-xsmall-top">
                                    <?=t('Model can have multiple items')?>
                                </div>
                            </div>
                            <a class="kiss-cover" @click="model.type = 'collection'"></a>
                        </kiss-card>

                        <kiss-card class="kiss-flex kiss-padding kiss-position-relative kiss-padding" theme="bordered" :class="model.type == 'tree' ? '': 'kiss-color-muted'" :style="{borderColor:model.type == 'tree' ? 'var(--kiss-color-primary)': null}">
                            <div class="kiss-margin-small-right"><kiss-svg src="<?=$this->base('content:assets/icons/tree.svg')?>" width="30" height="30"><canvas width="30" height="30"></canvas></kiss-svg></div>
                            <div class="kiss-size-small">
                                <strong>{{ t('Tree') }}</strong>
                                <div class="kiss-size-xsmall kiss-color-muted kiss-margin-xsmall-top">
                                    <?=t('Organize content items as tree')?>
                                </div>
                            </div>
                            <a class="kiss-cover" @click="model.type = 'tree'"></a>
                        </kiss-card>

                    </kiss-grid>
                </div>

                <div class="kiss-margin-large" v-if="isUpdate">
                    <kiss-card class="kiss-flex kiss-padding" theme="bordered">
                        <div class="kiss-margin-small-right" v-if="model.type=='singleton'"><kiss-svg src="<?=$this->base('content:assets/icons/singleton.svg')?>" width="40" height="40"><canvas width="40" height="40"></canvas></kiss-svg></div>
                        <div class="kiss-margin-small-right" v-if="model.type=='collection'"><kiss-svg src="<?=$this->base('content:assets/icons/collection.svg')?>" width="40" height="40"><canvas width="40" height="40"></canvas></kiss-svg></div>
                        <div class="kiss-margin-small-right" v-if="model.type=='tree'"><kiss-svg src="<?=$this->base('content:assets/icons/tree.svg')?>" width="40" height="40"><canvas width="40" height="40"></canvas></kiss-svg></div>
                        <div class="kiss-size-small">
                            <strong v-if="model.type=='singleton'">{{ t('Singleton') }}</strong>
                            <strong v-if="model.type=='collection'">{{ t('Collection') }}</strong>
                            <strong v-if="model.type=='tree'">{{ t('Tree') }}</strong>
                            <div class="kiss-size-xsmall kiss-color-muted kiss-margin-xsmall-top">
                                <span v-if="model.type=='collection'"><?=t('Model can have multiple items')?></span>
                                <span v-if="model.type=='singleton'"><?=t('Model has one single item')?></span>
                                <span v-if="model.type=='tree'"><?=t('Organize content items as tree')?></span>
                            </div>
                        </div>
                    </kiss-card>
                </div>

                <kiss-grid cols="2@m" class="kiss-margin">
                    <div :class="{'kiss-disabled': isUpdate}">
                        <label><?=t('Name')?></label>
                        <input class="kiss-input" type="text" pattern="[a-zA-Z0-9_]+" v-model="model.name" :disabled="isUpdate" required>
                    </div>
                    <div>
                        <label><?=t('Display name')?></label>
                        <input class="kiss-input" type="text" v-model="model.label">
                    </div>
                </kiss-grid>

                <div class="kiss-margin">
                    <label><?=t('Group')?></label>
                    <input class="kiss-input" type="text" list="model-groups" v-model="model.group">
                </div>

                <div class="kiss-margin">
                    <label><?=t('Info')?></label>
                    <textarea class="kiss-input kiss-textarea" style="height:100px;" v-model="model.info"></textarea>
                </div>

                <div class="kiss-margin kiss-margin-large-top">

                    <kiss-tabs class="kiss-margin-large">
                        <tab :caption="t('Fields')">
                            <fields-manager v-model="model.fields"></fields-manager>
                        </tab>
                        <tab :caption="t('Preview')">

                            <kiss-card class="animated fadeIn kiss-padding kiss-align-center kiss-text-caption" theme="bordered contrast" v-if="!model.preview.length">
                                <div class="kiss-text-bold"><?=t('No content preview urls defined')?></div>
                            </kiss-card>

                            <vue-draggable v-model="model.preview" v-if="model.preview.length" handle=".fm-handle">
                                <template #item="{ element }">
                                    <kiss-card class="kiss-flex kiss-flex-middle kiss-margin-small">
                                        <div class="kiss-margin-small-right">
                                            <icon class="kiss-size-3" :class="{'kiss-color-muted': !(element.name && element.uri)}">visibility</icon>
                                        </div>
                                        <div class="kiss-width-1-4"><input type="text" class="kiss-input kiss-input-small" v-model="element.name" placeholder="<?=t('Name')?>"></div>
                                        <div class="kiss-margin-small-left kiss-flex-1"><input type="url" class="kiss-input kiss-input-small" v-model="element.uri" placeholder="https://..."></div>
                                        <a class="kiss-margin-small-left kiss-color-danger" @click="model.preview.splice(model.preview.indexOf(element), 1)"><icon>delete</icon></a>
                                        <a class="fm-handle kiss-margin-small-left kiss-color-muted"><icon>drag_handle</icon></a>
                                    </kiss-card>
                                </template>
                            </vue-draggable>

                            <div class="kiss-margin kiss-align-center">
                                <a class="kiss-size-large" @click="model.preview.push({name:'', uri:''})"><icon>control_point</icon></a>
                            </div>

                        </tab>
                        <tab :caption="'Other'">

                            <div class="kiss-flex">
                                <div class="kiss-flex-1">
                                    <label><?=t('Color')?></label>
                                    <div class="kiss-size-xsmall kiss-color-muted kiss-margin-xsmall-top">
                                        <?=t('Model accent color')?>
                                    </div>
                                </div>
                                <field-color v-model="model.color" size="30"></field-color>
                            </div>

                            <hr>

                            <div class="kiss-flex">
                                <div class="kiss-flex-1">
                                    <label><?=t('Icon')?></label>
                                    <div class="kiss-size-xsmall kiss-color-muted kiss-margin-xsmall-top">
                                        <?=t('Model icon')?>
                                    </div>
                                </div>
                                <div><icon-picker v-model="model.icon" size="30"></icon-picker></div>
                            </div>

                            <hr>

                            <div class="kiss-flex">
                                <div class="kiss-flex-1">
                                    <label><?=t('Enable revisions')?></label>
                                    <div class="kiss-size-xsmall kiss-color-muted kiss-margin-xsmall-top">
                                        <?=t('Store every content update as version')?>
                                    </div>
                                </div>
                                <field-boolean class="kiss-size-large" v-model="model.revisions"></field-boolean>
                            </div>
                        </tab>
                        <tab :caption="t('Meta')">
                            <field-object v-model="model.meta"></field-object>
                        </tab>
                    </kiss-tabs>
                </div>

                <app-actionbar>

                    <kiss-container size="small">
                        <div class="kiss-flex kiss-flex-middle kiss-flex-right">

                            <div class="kiss-flex-1" v-if="isUpdate">
                                <a class="kiss-button" :href="$route(`/content/tree/items/${model.name}`)" v-if="model.type == 'tree'"><?=t('Goto items')?></a>
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

                methods: {

                    save() {

                        this.saving = true;
                        this.model.preview = this.model.preview.filter(preview => (preview.name && preview.uri));

                        this.$request('/content/models/save', {model: this.model, isUpdate: this.isUpdate}).then(model => {

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
