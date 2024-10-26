<kiss-container class="kiss-margin-small" size="small">

    <ul class="kiss-breadcrumbs">
        <li><a href="<?=$this->route('/system')?>"><?=t('Settings')?></a></li>
    </ul>

    <div class="kiss-margin-large-bottom kiss-size-4"><strong><?=t('System Update')?></strong></div>

    <?php if (version_compare($meta['version'], APP_VERSION, '>')): ?>
    <vue-view>

        <template>

            <kiss-card theme="bordered">

                <kiss-grid class="kiss-margin-large kiss-margin" cols="2@m">

                    <kiss-card class="kiss-padding-larger">
                        <div>
                            <div class="kiss-text-light kiss-size-4 kiss-color-muted kiss-margin-small">
                                Current
                            </div>
                            <div class="kiss-size-xlarge kiss-text-light"><?=APP_VERSION?></div>
                        </div>
                    </kiss-card>
                    <kiss-card class="kiss-padding-larger" theme="contrast">
                        <div>
                            <div class="kiss-text-light kiss-size-4 kiss-color-muted kiss-margin-small">
                                Available
                            </div>
                            <div class="kiss-size-xlarge kiss-text-light"><?=$meta['version']?></div>
                        </div>
                    </kiss-card>
                </kiss-grid>
            </kiss-card>

            <kiss-card class="kiss-margin-large">

                <div>

                    <div class="kiss-margin kiss-size-3 kiss-color-muted kiss-text-light">
                        Proceeding with this update is at your own risk. It may affect system stability and data integrity.
                        Ensure you have backed up important data and files before continuing with the update process.
                    </div>

                    <hr>

                    <div class=" kiss-text-monospace">
                        <input class="kiss-checkbox kiss-margin-small-right" type="checkbox" v-model="confirmed">
                        <span>{{ t('I acknowledge the risks') }}</span>
                    </div>
                </div>

            </kiss-card>

            <button class="kiss-button kiss-button-large kiss-button-primary kiss-width-1-1" @click="loadUpdate" v-if="confirmed">{{ t('Update') }}</button>

        </template>

        <script type="module">
            export default {

                data() {
                    return {
                        confirmed: false,
                    }
                },

                methods: {

                    loadUpdate() {

                        App.ui.block('Updating system ...');

                        this.$request('/updater/update').then(response => {
                            location.reload();
                        }).catch(res => {
                            App.ui.unblock();
                            App.ui.notify(res.error || 'Updating failed!', 'error');
                        });
                    }
                }
            }
        </script>
    </vue-view>
    <?php else: ?>
    <div class="kiss-flex kiss-flex-middle kiss-flex-center kiss-height-50vh kiss-size-1 kiss-color-muted kiss-text-light kiss-margin-large">
        <?=t('Your system is up to date.')?>
    </div>
    <?php endif ?>

</kiss-container>
