<vue-view>

    <template>
        <kiss-container class="auth-wrapper animated pulse" style="max-width: 500px;">

            <div class="auth-dialog">

                <div class="kiss-flex kiss-flex-middle kiss-margin-large" gap>
                    <div><img class="app-logo" src="<?= $this->helper('theme')->logo() ?>" style="height:40px;width:auto;" alt="Logo"></div>
                    <div>
                        <strong class="kiss-size-5"><?= $this['app.name'] ?></strong>
                        <div class="kiss-color-muted kiss-size-xsmall kiss-margin-xsmall"><?=t('Password reset')?></div>
                    </div>
                </div>

                <form :class="{'kiss-disabled': loading}" @submit.prevent="updatePassword" v-if="!updated">

                    <div class="kiss-margin">
                        <input type="password" name="password" class="kiss-input kiss-form-large" placeholder="<?=t('New Password')?>" autofocus required v-model="password">
                    </div>

                    <div>
                        <button type="submit" class="kiss-button kiss-button-primary kiss-width-expand"><?=t('Update password')?></button>
                    </div>

                </form>

                <kiss-card class="kiss-align-center animated fadeIn" v-if="updated">
                    <icon class="kiss-size-xlarge kiss-color-primary animated fadeIn slow">check</icon>
                    <div class="kiss-text-bold kiss-margin-small"><?=t('Password updated!')?></div>
                </kiss-card>

                <app-loader class="kiss-margin-top" v-if="loading"></app-loader>

            </div>

            <div class="kiss-align-center kiss-margin">
                <a class="kiss-size-small kiss-text-caption kiss-color-muted" href="<?=$this->route('/auth/login')?>"><?=t('Back to login')?></a>
            </div>

        </kiss-container>


    </template>

    <script type="module">

        export default {

            data() {
                return {
                    updated: false,
                    password: null,
                    loading: false
                }
            },

            methods: {
                updatePassword() {

                    this.loading = true;

                    this.$request('/auth/reset',{
                        token: "<?= $token ?>",
                        csrf: "<?= $csrfToken ?>",
                        password: this.password
                    }).then(() => {
                        this.updated = true;
                    }).catch(rsp => {
                        App.ui.notify(rsp.error || 'Updating password failed!', 'error');
                    }).finally(() => {
                        this.loading = false;
                    });
                }
            }
        }
    </script>


</vue-view>
