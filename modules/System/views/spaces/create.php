<kiss-container class="kiss-margin" size="small">

    <ul class="kiss-breadcrumbs">
        <li><a href="<?=$this->route('/system')?>"><?=t('Settings')?></a></li>
        <li><a href="<?=$this->route('/system/spaces')?>"><?=t('Spaces')?></a></li>
    </ul>

    <vue-view>
        <template>

            <div class="kiss-margin-large-bottom kiss-size-4">
                <strong><?=t('Create space')?></strong>
            </div>

            <form :class="{'kiss-disabled':saving}" @submit.prevent="save">

                <div class="kiss-margin-large">
                    <label><?=t('Name')?></label>
                    <input class="kiss-input" type="text" v-model="space.name" required>
                </div>

                <div class="kiss-text-caption kiss-text-bold"><?=t('Admin user')?></div>

                <kiss-grid class="kiss-margin" cols="2@m">
                    <div><input class="kiss-input" type="text" v-model="space.user.name" placeholder="<?=t('Username')?>" required></div>
                    <div><input class="kiss-input" type="text" v-model="space.user.password" placeholder="<?=t('Password')?>" required></div>
                </kiss-grid>



                <app-actionbar>

                    <kiss-container size="small">
                        <div class="kiss-flex kiss-flex-middle kiss-flex-right">
                            <div class="kiss-button-group">
                                <a class="kiss-button" href="<?=$this->route('/system/spaces')?>">
                                    <?=t('Cancel')?>
                                </a>
                                <button type="submit" class="kiss-button kiss-button-primary">
                                    <?=t('Create space')?>
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
                        space: {
                            name: '',
                            user: {}
                        }
                    };
                },

                methods: {

                    save() {

                        this.saving = true;

                        this.$request('/system/spaces/create', {space: this.space}).then(space => {

                            this.saving = false;

                            App.ui.notify('Space created!');

                        }).catch(res => {
                            this.saving = false;
                            App.ui.notify(res.error || 'Creating failed!', 'error');
                        })

                    }
                }
            }

        </script>
    </vue-view>


</kiss-container>
