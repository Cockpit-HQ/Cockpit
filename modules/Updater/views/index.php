<kiss-container class="kiss-margin-small" size="small">

    <ul class="kiss-breadcrumbs">
        <li><a href="<?=$this->route('/system')?>"><?=t('Settings')?></a></li>
    </ul>

    <div class="kiss-margin-large-bottom kiss-size-4"><strong><?=t('System Update')?></strong></div>

    <vue-view>

        <template>

            <div>

                <kiss-card class="kiss-text-monospace kiss-text-caption kiss-margin" v-if="!isNewVersionAvailable" >
                    <icon class="kiss-color-primary kiss-margin-xsmall-right" size="large">check_circle</icon> <?=t('Your system is up to date')?>
                </kiss-card>

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
                            <div class="kiss-overlay-input">
                                <div class="kiss-text-light kiss-size-4 kiss-color-muted kiss-margin-small">
                                    Target
                                </div>
                                <div class="kiss-size-xlarge kiss-text-light" :class="{'kiss-color-muted':!selectedVersion}">{{ selectedVersion ? (selectedVersion == 'develop' ? 'Develop':'<?=$meta['version']?>') : 'Select...' }}</div>
                                <select v-model="selectedVersion">
                                    <option :value="null"><?=t('Select version...')?></option>
                                    <hr>
                                    <option value="master" v-if="isNewVersionAvailable">v<?=$meta['version']?></option>
                                    <option value="develop"><?=t('Latest development version')?></option>
                                </select>
                            </div>
                        </kiss-card>
                    </kiss-grid>
                </kiss-card>

                <kiss-card class="kiss-margin-large" v-if="selectedVersion">

                    <div>

                        <div class="kiss-margin kiss-text-light kiss-size-3 kiss-color-muted">
                            Proceeding with this update is at your own risk. It may affect system stability and data integrity.
                            Ensure you have backed up important data and files before continuing with the update process.
                        </div>

                        <hr>

                        <div class="kiss-text-monospace">
                            <input class="kiss-checkbox kiss-margin-small-right" type="checkbox" v-model="confirmed">
                            <span>{{ t('I acknowledge the risks') }}</span>
                        </div>
                    </div>

                </kiss-card>
            </div>

            <teleport to="body">

                <app-actionbar v-if="selectedVersion && confirmed">
                    <kiss-container size="small">
                        <button class="kiss-button kiss-button-large kiss-button-primary kiss-width-1-1" @click="loadUpdate">{{ t('Update') }}</button>
                    </kiss-container>
                </app-actionbar>

            </teleport>

        </template>

        <script type="module">
            export default {

                data() {
                    return {
                        isNewVersionAvailable: <?=(version_compare($meta['version'], APP_VERSION, '>') ? 'true' : 'false')?>,
                        confirmed: false,
                        selectedVersion: null
                    }
                },

                methods: {

                    loadUpdate() {

                        if (!this.confirmed) {
                            return App.ui.notify('Please confirm that you have read and understood the risks of updating your system.');
                        }

                        App.ui.block('Updating system ...');

                        this.$request('/updater/update', {
                            version: this.selectedVersion
                        }).then(response => {
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


</kiss-container>
