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

            <div class="kiss-margin-large kiss-height-50vh kiss-flex kiss-flex-middle kiss-flex-center kiss-align-center" v-if="created">
                <div class="animated fadeInUp kiss-width-1-2@m">
                    <div class="kiss-margin kiss-color-success">
                        <kiss-svg :src="$base('system:assets/icons/spaces.svg')" width="40" height="40"></kiss-svg>
                    </div>
                    <div class="kiss-size-2"><?=t('Space created')?></div>
                    <div class="kiss-margin-large">
                        <a class="kiss-button kiss-button-primary kiss-display-block kiss-margin-small" :href="space.url" target="_blank" rel="noopener noreferrer"><?=t('Open space')?></a>
                        <a class="kiss-button kiss-display-block kiss-margin-small" href="<?=$this->route('/system/spaces')?>"><?=t('Close')?></a>
                    </div>
                </div>
            </div>

            <form :class="{'kiss-disabled':saving}" @submit.prevent="save" v-if="!created">

                <div class="kiss-margin-large">
                    <label><?=t('Name')?></label>
                    <input class="kiss-input" type="text" v-model="space.name" required>
                </div>

                <div class="kiss-text-caption kiss-text-bold"><?=t('Admin user')?></div>

                <kiss-grid class="kiss-margin" cols="2@m">
                    <div><input class="kiss-input" type="text" v-model="space.options.user" placeholder="<?=t('Username')?>" required></div>
                    <div><input class="kiss-input" type="text" v-model="space.options.password" placeholder="<?=t('Password')?>" required></div>
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
                        created: false,
                        saving: false,
                        space: {
                            name: '',
                            options: {}
                        }
                    };
                },

                methods: {

                    save() {

                        this.saving = true;

                        this.$request('/system/spaces/create', {space: this.space}).then(ret => {

                            this.space = ret.space;
                            this.created = true;
                            this.saving = false;

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
