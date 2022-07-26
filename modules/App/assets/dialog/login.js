
export default {

    data() {
        return  {
            auth: {
                user: '',
                password: ''
            },
            loading: false
        }
    },

    props: {
        csrf: {type: String, default: ''}
    },

    template: /*html*/`
        <div id="app-session-login">

            <div class="kiss-size-small kiss-text-caption kiss-text-bold kiss-margin-bottom">{{ t('Session expired') }}</div>

            <form class="app-login-form animated" :class="{'kiss-disabled': loading}" @submit.prevent="login">

                <div class="kiss-margin">
                    <input class="kiss-input" type="text" :placeholder="t('Username or Email')" v-model="auth.user" :disabled="loading" autocomplete="off" required>
                </div>

                <div class="kiss-margin">
                    <input class="kiss-input" type="password" autocomplete="current-password" :placeholder="t('Password')" :disabled="loading" v-model="auth.password" required>
                </div>

                <div class="kiss-margin">
                    <button class="kiss-button kiss-button-primary kiss-width-1-1">{{ t('Log in') }}</button>
                </div>

            </form>

        </div>
    `,

    mounted() {
        AppEventStream.stop();
    },

    methods: {

        login() {

            let form = this.$el.querySelector('form');

            this.loading = true;

            this.$request('/auth/check', {
                auth: this.auth,
                csrf: this.csrf
            }).then(rsp => {

                this.loading = false;

                if (!rsp.success) {

                    App.ui.notify('Login failed.', 'error');

                    form.classList.remove('shake');

                    setTimeout(() => {
                        form.classList.add('animated');
                        form.classList.add('shake');
                    }, 100)

                    return;
                }

                AppEventStream.start();

                this.$close();

            }, rsp => {
                this.loading = false;
                App.ui.notify(rsp && (rsp.message || rsp.error) ? (rsp.message || rsp.error) : this.t('Login failed.'), 'error');
            });
        }
    }
}
