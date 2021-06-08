<kiss-container class="kiss-margin" size="small">

    <ul class="kiss-breadcrumbs">
        <li><a href="<?=$this->route('/pages/menus')?>"><?=t('Menus')?></a></li>
    </ul>

    <vue-view>
        <template>

            <h1 class="kiss-margin-large-bottom">
                <span v-if="!menu._id"><?=t('Create menu')?></span>
                <span v-if="menu._id"><?=t('Edit menu')?></span>
            </h1>

            <form :class="{'kiss-disabled':saving}" @submit.prevent="save">

                <kiss-row class="kiss-margin kiss-child-width-1-2@m">
                    <div :class="{'kiss-disabled': isUpdate}">
                        <label><?=t('Name')?></label>
                        <input class="kiss-input" type="text" pattern="[a-zA-Z0-9_]+" v-model="menu.name" :disabled="isUpdate" required>
                    </div>
                    <div>
                        <label><?=t('Display name')?></label>
                        <input class="kiss-input" type="text" v-model="menu.label">
                    </div>
                </kiss-row>

                <div class="kiss-margin">
                    <label><?=t('Group')?></label>
                    <input class="kiss-input" type="text" list="menu-groups" v-model="menu.group">
                </div>

                <div class="kiss-margin">
                    <label><?=t('Info')?></label>
                    <textarea class="kiss-input kiss-textarea" style="height:100px;" v-model="menu.info"></textarea>
                </div>

                <div class="kiss-margin">
                    <label><?=t('Color')?></label>
                    <field-color v-model="menu.color"></field-color>
                </div>

                <div class="kiss-margin">
                    <label><?=t('Links')?></label>
                    <field-nav v-model="menu.links"></field-nav>
                </div>

                <app-actionbar>

                    <kiss-container size="small">
                        <div class="kiss-flex kiss-flex-middle kiss-flex-right">

                            <div class="kiss-button-group">
                                <a class="kiss-button" href="<?=$this->route('/pages/menus')?>">
                                    <span v-if="!menu._id"><?=t('Cancel')?></span>
                                    <span v-if="menu._id"><?=t('Close')?></span>
                                </a>
                                <button type="submit" class="kiss-button kiss-button-primary">
                                    <span v-if="!menu._id"><?=t('Create menu')?></span>
                                    <span v-if="menu._id"><?=t('Update menu')?></span>
                                </button>
                            </div>
                        </div>
                    </kiss-container>

                </app-actionbar>

            </form>

            <datalist id="menu-groups" v-if="groups.length">
                <option v-for="group in groups">{{ group }}</option>
            </datalist>


        </template>
        <script type="module">
            export default {

                data() {
                    return {
                        menu: <?=json_encode($menu)?>,
                        groups: <?=json_encode($groups)?>,
                        saving: false
                    }
                },

                methods: {
                    save() {

                        let isUpdate = this.menu._id;

                        this.saving = true;

                        this.$request('/pages/menus/save', {menu: this.menu}).then(menu => {

                            this.menu = menu;
                            this.saving = false;

                            if (isUpdate) {
                                App.ui.notify('Menu updated!');
                            } else {
                                App.ui.notify('Menu created!');
                                this.isUpdate = true;
                            }
                        }).catch(res => {
                            this.saving = false;
                            App.ui.notify(res.error || 'Saving failed!', 'error');
                        });
                    }
                }

            }
        </script>
    </vue-view>

</kiss-container>