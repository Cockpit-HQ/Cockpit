<vue-view>
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
