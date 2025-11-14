<kiss-container class="kiss-margin-small" size="small">

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
                        <kiss-svg :src="$baseUrl('system:assets/icons/spaces.svg')" width="40" height="40"></kiss-svg>
                    </div>
                    <div class="kiss-size-2"><?=t('Space created')?></div>
                    <div class="kiss-margin-large">
                        <a class="kiss-button kiss-button-primary kiss-display-block kiss-margin-small" :href="space.url" target="_blank" rel="noopener noreferrer"><?=t('Open space')?></a>
                        <a class="kiss-button kiss-display-block kiss-margin-small" href="<?=$this->route('/system/spaces')?>"><?=t('Close')?></a>
                    </div>
                </div>
            </div>

            <form :class="{'kiss-disabled':saving}" @submit.prevent="save" v-if="!created">

                <div class="kiss-margin-small">
                    <label><?=t('Name')?></label>
                    <input class="kiss-input" type="text" v-model="space.name" required>
                </div>

                <div class="kiss-margin-small">
                    <label><?=t('Group')?></label>
                    <input class="kiss-input" type="text" v-model="space.options.group" list="space-groups">
                </div>
                <?php if (count($groups)): ?>
                <datalist id="space-groups">
                    <?php foreach($groups as $group): ?>
                    <option><?=$group?></option>
                    <?php endforeach ?>
                </datalist>
                <?php endif ?>

                <div class="kiss-text-caption kiss-text-bold kiss-margin-large-top"><?=t('Admin user')?></div>

                <div class="kiss-margin">
                    <div class="kiss-margin-small"><input class="kiss-input" type="text" v-model="space.options.user" placeholder="<?=t('Username')?>" required></div>
                    <div class="kiss-margin-small"><input class="kiss-input" type="text" v-model="space.options.password" placeholder="<?=t('Password')?>" required></div>
                </div>

                <div class="kiss-text-caption kiss-text-bold"><?=t('Datastorage')?></div>

                <div class="kiss-margin">

                    <kiss-card class="kiss-padding kiss-margin-small kiss-position-relative" :theme="storageType == 'mongolite' ? 'bordered contrast': 'bordered'" :class="{'kiss-color-muted': storageType != 'mongolite'}" :style="{borderColor: storageType == 'mongolite' ? 'var(--kiss-color-primary)':null}">
                        <span :class="{'kiss-text-bold': storageType == 'mongolite'}">Mongolite</span>

                        <a class="kiss-cover" v-show="storageType != 'mongolite'" @click="space.options.datastorage.type = 'mongolite'"></a>
                    </kiss-card>

                    <?php if (extension_loaded('mongodb')): ?>
                    <kiss-card class="kiss-padding kiss-margin-small kiss-position-relative" :theme="storageType == 'mongodb' ? 'bordered contrast': 'bordered'" :class="{'kiss-color-muted': storageType != 'mongodb'}" :style="{borderColor: storageType == 'mongodb' ? 'var(--kiss-color-primary)':null}">
                        <span :class="{'kiss-text-bold': storageType == 'mongodb'}">MongoDB</span>

                        <div class="kiss-margin" :class="{'kiss-disabled': checkingDatabaseConnection}" v-if="storageType == 'mongodb'">

                            <div class="kiss-margin-small">
                                <label class="kiss-text-normal">Server</label>
                                <input class="kiss-input" type="text" v-model="space.options.datastorage.server" placeholder="mongodb://..." required>
                            </div>

                            <div class="kiss-margin-small">
                                <label class="kiss-text-normal">Database</label>
                                <input class="kiss-input" type="text" v-model="space.options.datastorage.database" required>
                            </div>

                            <button v-if="!checkingDatabaseConnection" type="button" class="kiss-button kiss-button-small" :class="{'kiss-disabled':!(space.options.datastorage.server && space.options.datastorage.database)}" :disabled="!(space.options.datastorage.server && space.options.datastorage.database)" @click="checkDatabaseConnection()">{{ t('Test connection') }}</button>
                            <app-loader v-if="checkingDatabaseConnection" class="kiss-margin-remove" mode="dots"></app-loader>
                        </div>

                        <a class="kiss-cover" v-show="storageType != 'mongodb'" @click="space.options.datastorage.type = 'mongodb'"></a>
                    </kiss-card>
                    <?php endif ?>
                </div>

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
                        checkingDatabaseConnection: false,
                        space: {
                            name: '',
                            options: {
                                group: null,
                                datastorage: {
                                    type: 'mongolite',
                                    server: <?=($this->dataStorage->type == 'mongodb' && extension_loaded('mongodb')) ? "'{$this['database/server']}'" : "''"?>,
                                    database: ''
                                }
                            }
                        }
                    };
                },

                computed: {
                    storageType() {
                        return this.space.options.datastorage.type;
                    }
                },

                methods: {

                    save() {

                        this.saving = true;

                        this.$request('/system/spaces/create', {space: this.space}).then(ret => {

                            this.space = ret.space;
                            this.created = true;

                        }).catch(res => {
                            App.ui.notify(res.error || 'Creating failed!', 'error');
                        }).finally(() => {
                            this.saving = false;
                        });

                    },

                    checkDatabaseConnection() {

                        this.checkingDatabaseConnection = true;

                        this.$request('/system/spaces/checkDatabaseConnection', {
                            options: this.space.options.datastorage
                        }).then(rsp => {
                            App.ui.notify('Connection successful!', 'success');
                        }).catch(rsp => {
                            App.ui.notify(rsp.error || 'Connection failed!', 'error');
                        }).finally(() => {
                            this.checkingDatabaseConnection = false;
                        });
                    }
                }
            }

        </script>
    </vue-view>


</kiss-container>
