<?php $this->start('app.layout.header') ?>
<style>
    .login-wrapper {
        position: relative;
        width:400px;
        max-width: 90%;
        margin-top: 20vh;
        padding: 30px;
        border-radius: 10px;
    }

    .login-wrapper::before {
        content: "";
        position:absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 10px;
        background: var(--kiss-base-background-color);
        z-index: -1;
        opacity: .8;

        box-shadow:
            0 2.8px 2.2px rgba(0, 0, 0, 0.034),
            0 6.7px 5.3px rgba(0, 0, 0, 0.048),
            0 12.5px 10px rgba(0, 0, 0, 0.06),
            0 22.3px 17.9px rgba(0, 0, 0, 0.072),
            0 41.8px 33.4px rgba(0, 0, 0, 0.086),
            0 100px 80px rgba(0, 0, 0, 0.12);
    }
</style>
<?php $this->end('app.layout.header') ?>

<vue-view class="kiss-margin-large-top">
    <template>

        <kiss-container class="login-wrapper animated pulse">

            <div class="kiss-flex kiss-flex-center kiss-margin-large">
                <img class="app-logo" src="<?=$this->helper('theme')->logo()?>" style="height: 40px;" alt="Logo">
            </div>

            <form class="animated" :class="{'kiss-disabled': loading}" @submit.prevent="login" v-if="view=='form'">

                <div class="kiss-text-bold kiss-text-caption kiss-margin-bottom"><?=t('Welcome')?></div>

                <div class="kiss-margin">
                    <input class="kiss-input" type="text" placeholder="<?=t('Username or Email')?>" v-model="auth.user" autocomplete="off" autofocus required>
                </div>

                <div class="kiss-margin">
                    <input class="kiss-input" type="password" autocomplete="current-password" placeholder="<?=t('Password')?>" v-model="auth.password" required>
                </div>

                <div class="kiss-margin">
                    <button class="kiss-button kiss-button-primary kiss-width-1-1"><?=t('Login')?></button>
                </div>

            </form>

            <kiss-card class="kiss-padding animated fadeIn" theme="contrast" v-if="!loading && view=='success'">

                <kiss-row>
                    <div><app-avatar size="50" :name="user.name"></app-avatar></div>
                    <div class="kiss-size-small">
                        <div class="kiss-text-bold">{{ user.name }}</div>
                        <div class="kiss-color-muted">{{ user.email }}</div>
                    </div>
                </kiss-row>

            </kiss-card>

        </kiss-container>

        <app-loader class="animated fadeIn kiss-margin-top" v-if="loading"></app-loader>

    </template>

    <script type="module">

        export default {

            data() {

                return {
                    auth: {user:'',password:''},
                    view: 'form',
                    loading: false,
                    user: null
                }
            },

            mounted() {

            },

            methods: {

                login() {

                    this.loading = true;

                    this.$request('/auth/check', {
                        auth: this.auth,
                        csrf : "<?=$this->helper('csrf')->token('login')?>"
                    }).then(rsp => {

                        this.loading = false;

                        if (!rsp.success) {

                            App.ui.notify('Login failed.', 'error');

                            this.$el.parentNode.classList.remove('shake');

                            setTimeout(() => {
                                this.$el.parentNode.classList.add('animated');
                                this.$el.parentNode.classList.add('shake');
                            }, 100)

                            return;
                        }

                        this.user = rsp.user;
                        this.view = 'success';

                        setTimeout(() => {
                            window.location = '<?=$redirectTo?>';
                        }, 1500)

                    }, rsp => {
                        this.loading = false;
                        App.ui.notify(rsp && (rsp.message || rsp.error) ? (rsp.message || rsp.error) : '<?=t('Login failed.')?>', 'error');
                    });
                }
            }
        }

    </script>

</vue-view>
