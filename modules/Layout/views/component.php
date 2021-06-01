<kiss-container class="kiss-margin" size="small">

    <ul class="kiss-breadcrumbs">
        <li><a href="<?=$this->route('/settings')?>"><?=t('Settings')?></a></li>
        <li><a href="<?=$this->route('/layout-components')?>"><?=t('Layout components')?></a></li>
    </ul>

    <vue-view>
        <template>

            <h1 class="kiss-margin-large-bottom">
                <span v-if="!component._id"><?=t('Create component')?></span>
                <span v-if="component._id"><?=t('Edit component')?></span>
            </h1>

            <form :class="{'kiss-disabled':saving}" @submit.prevent="save">

                <div class="kiss-margin">
                    <label><?=t('Name')?></label>
                    <input class="kiss-input" type="text" pattern="[a-zA-Z0-9_]+" v-model="component.name" required>
                </div>

                <kiss-row class="kiss-child-width-1-2@m kiss-margin">

                    <div>
                        <label><?=t('Display name')?></label>
                        <input class="kiss-input" type="text" v-model="component.meta.label">
                    </div>

                    <div>
                        <label><?=t('Group')?></label>
                        <input class="kiss-input" type="text" v-model="component.meta.group">
                    </div>

                </kiss-row>

                <div class="kiss-margin">
                    <label><?=t('Has child components?')?></label>
                    <field-boolean v-model="component.meta.children"></field-boolean>
                </div>

                <div class="kiss-margin">
                    <label><?=t('Data')?></label>
                    <fields-manager v-model="component.meta.fields"></fields-manager>
                </div>

                <div class="kiss-margin">
                    <label><?=t('Options')?></label>
                    <field-object v-model="component.meta.opts"></field-object>
                </div>

                <app-actionbar>

                    <kiss-container size="small">
                        <div class="kiss-flex kiss-flex-middle kiss-flex-right">
                            <div class="kiss-button-group">
                                <a class="kiss-button" href="<?=$this->route('/layout-components')?>">
                                    <span v-if="!component._id"><?=t('Cancel')?></span>
                                    <span v-if="component._id"><?=t('Close')?></span>
                                </a>
                                <button type="submit" class="kiss-button kiss-button-primary">
                                    <span v-if="!component._id"><?=t('Create component')?></span>
                                    <span v-if="component._id"><?=t('Update component')?></span>
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
                        component: <?=json_encode($component)?>
                    };
                },

                methods: {

                    save() {

                        let isUpdate = this.component._id;

                        this.saving = true;

                        this.$request('/layout-components/save', {component: this.component}).then(component => {

                            this.component = component;
                            this.saving = false;

                            if (isUpdate) {
                                App.ui.notify('Component updated!');
                            } else {
                                App.ui.notify('Component created!');
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