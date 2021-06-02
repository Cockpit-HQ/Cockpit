<kiss-container class="kiss-margin" size="small">

    <ul class="kiss-breadcrumbs">
        <li><a href="<?=$this->route('/lokalize/projects')?>"><?=t('Lokalize')?></a></li>
    </ul>

    <vue-view>
        <template>

            <h1 class="kiss-margin-large-bottom">
                <span v-if="!project._id"><?=t('Create project')?></span>
                <span v-if="project._id"><?=t('Edit project')?></span>
            </h1>

            <form :class="{'kiss-disabled':saving}" @submit.prevent="save">

                <kiss-row class="kiss-margin kiss-child-width-1-2@m">
                    <div :class="{'kiss-disabled': isUpdate}">
                        <label><?=t('Name')?></label>
                        <input class="kiss-input" type="text" pattern="[a-zA-Z0-9_]+" v-model="project.name" :disabled="isUpdate" required>
                    </div>
                    <div>
                        <label><?=t('Display name')?></label>
                        <input class="kiss-input" type="text" v-model="project.label">
                    </div>
                </kiss-row>

                <div class="kiss-margin">
                    <label><?=t('Group')?></label>
                    <input class="kiss-input" type="text" list="project-groups" v-model="project.group">
                </div>

                <div class="kiss-margin">
                    <label><?=t('Info')?></label>
                    <textarea class="kiss-input kiss-textarea" style="height:100px;" v-model="project.info"></textarea>
                </div>

                <div class="kiss-margin">
                    <label><?=t('Color')?></label>
                    <field-color v-model="project.color"></field-color>
                </div>

                <div class="kiss-margin">
                    <label><?=t('Locales')?></label>
                    <vue-draggable
                        class="kiss-margin-small"
                        :list="project.locales"
                        :swapThreshold="0.65"
                        :animation="150",
                        :fallbackOnBody="true",
                        handle=".lm-handle"
                    >
                        <template #item="{ element }">
                            <kiss-card class="kiss-margin-small">
                                <div class="kiss-flex kiss-flex-middle">
                                    <div class="kiss-width-1-4">
                                        <input class="kiss-input" type="text" v-model="element.i18n" placeholder="e.g. 'en_GB'" required>
                                    </div>
                                    <div class="kiss-flex-1 kiss-margin-small-left">
                                        <input class="kiss-input" type="text" v-model="element.name" placeholder="e.g. 'British English'" required>
                                    </div>
                                    <a class="kiss-margin-small-left kiss-color-danger" @click="remove(element)"><icon>delete</icon></a>
                                    <a class="lm-handle kiss-margin-small-left kiss-color-muted"><icon>drag_handle</icon></a>
                                </div>
                            </kiss-card>
                        </template>
                    </vue-draggable>
                    <a class="kiss-button kiss-button-small" @click="project.locales.push({i18n:'', name:''})"><?=t('Add locale')?></a>
                </div>


                <app-actionbar>

                    <kiss-container size="small">
                        <div class="kiss-flex kiss-flex-middle kiss-flex-right">

                            <div class="kiss-button-group">
                                <a class="kiss-button" href="<?=$this->route('/lokalize/projects')?>">
                                    <span v-if="!project._id"><?=t('Cancel')?></span>
                                    <span v-if="project._id"><?=t('Close')?></span>
                                </a>
                                <button type="submit" class="kiss-button kiss-button-primary">
                                    <span v-if="!project._id"><?=t('Create project')?></span>
                                    <span v-if="project._id"><?=t('Update project')?></span>
                                </button>
                            </div>
                        </div>
                    </kiss-container>

                </app-actionbar>

                </form>

                <datalist id="project-groups" v-if="groups.length">
                    <option v-for="group in groups">{{ group }}</option>
                </datalist>


        </template>
        <script type="module">
            export default {

                data() {
                    return {
                        project: <?=json_encode($project)?>,
                        groups: <?=json_encode($groups)?>,
                        saving: false
                    }
                },

                methods: {
                    save() {

                        if (!this.project.locales.length) {
                            App.ui.notify('Please add some locales!', 'error');
                            return;
                        }

                        let isUpdate = this.project._id;

                        this.saving = true;

                        this.$request('/lokalize/projects/save', {project: this.project}).then(project => {

                            this.project = project;
                            this.saving = false;

                            if (isUpdate) {
                                App.ui.notify('Project updated!');
                            } else {
                                App.ui.notify('Project created!');
                                this.isUpdate = true;
                            }
                        }).catch(res => {
                            this.saving = false;
                            App.ui.notify(res.error || 'Saving failed!', 'error');
                        });
                    },

                    remove(locale) {
                        this.project.locales.splice(this.project.locales.indexOf(locale), 1);
                    }
                }

            }
        </script>
    </vue-view>

</kiss-container>