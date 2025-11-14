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

                <form :class="{'kiss-disabled': loading}" @submit.prevent="sendLink" v-if="!sent">

                    <div class="kiss-margin">
                        <input type="email" name="email" class="kiss-input kiss-form-large" placeholder="<?=t('Your Email')?>" autofocus required v-model="email">
                    </div>

                    <div>
                        <button type="submit" class="kiss-button kiss-button-primary kiss-width-expand"><?=t('Send link')?></button>
                    </div>

                </form>

                <kiss-card class="kiss-align-center animated fadeIn" v-if="sent">
                    <icon class="kiss-size-xlarge kiss-color-primary animated slideInLeft slow">forward_to_inbox</icon>
                    <div class="kiss-text-bold kiss-margin-small"><?=t('Check your inbox')?></div>
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
                    sent: false,
                    email: null,
                    loading: false
                }
            },

            methods: {
                sendLink() {

                    this.loading = true;

                    this.$request('/auth/reset',{
                        email: this.email,
                        csrf: "<?= $csrfToken ?>"
                    }).then(() => {
                        this.sent = true;
                    }).catch(rsp => {
                        App.ui.notify(rsp.error || 'Sending failed!', 'error');
                    }).finally(() => {
                        this.loading = false;
                    });
                }
            }
        }
    </script>


</vue-view>
