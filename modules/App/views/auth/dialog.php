
export default {

data() {
    return  {
        auth: {
            user: '',
            password: ''
        },
        view: 'form',
        loading: false,
        user: null,
        twofaCode: null,
        csrf: '<?=$csrfToken?>'
    }
},

template: /*html*/`
    <div id="app-session-login">

        <div class="kiss-size-small kiss-text-caption kiss-text-bold kiss-margin-bottom">{{ t('Session expired') }}</div>

        <form class="app-login-form animated" :class="{'kiss-disabled': loading}" @submit.prevent="login" v-if="view=='form'">

            <div class="kiss-margin">
                <input class="kiss-input" type="text" :placeholder="t('Username or Email')" :aria-label="t('Username or Email')" v-model="auth.user" :disabled="loading" autocomplete="off" required>
            </div>

            <div class="kiss-margin">
                <input class="kiss-input" type="password" autocomplete="current-password" :placeholder="t('Password')" :aria-label="t('Password')" :disabled="loading" v-model="auth.password" required>
            </div>

            <div class="kiss-margin">
                <button class="kiss-button kiss-button-primary kiss-width-1-1">{{ t('Log in') }}</button>
            </div>

        </form>

        <div class="kiss-padding animated fadeIn" :class="{'kiss-disabled': loading}" v-if="view=='success' && user.twofa">

            <kiss-card>

                <kiss-row class="kiss-flex-middle">
                    <div><app-avatar size="50" :name="user.name"></app-avatar></div>
                    <div class="kiss-size-small">
                        <div class="kiss-text-bold">{{ user.name }}</div>
                        <div class="kiss-color-muted">{{ user.email }}</div>
                    </div>
                </kiss-row>

            </kiss-card>

            <form class="kiss-margin-top" @submit.prevent="verify2FA" v-if="!loading">
                <div>
                    <input class="kiss-input kiss-text-monospace" type="text" placeholder="2FA Code" aria-label="2FA Code" v-model="twofaCode" autofocus required>
                </div>
                <div class="kiss-margin-top">
                    <button class="kiss-button kiss-button-outline kiss-button-primary kiss-width-1-1">{{ t('Verify code') }}</button>
                </div>
            </form>

        </div>

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

            this.user = rsp.user;
            this.view = 'success';

            // redirect if twofa is disabled for the user
            if (!this.user.twofa) {
                App.csrf = rsp.csrf;
                AppEventStream.start();
                this.$close();
            }

        }, (rsp) => {

            if (rsp?.error === 'APP_LOGIN_SESSION_INVALID') {
                App.ui.notify('Login session expired.', 'error');
                setTimeout(() => location.reload() , 600);
                return;
            }

            this.loading = false;
            App.ui.notify(rsp && (rsp.message || rsp.error) ? (rsp.message || rsp.error) : this.t('Login failed.'), 'error');
        });
    },

    verify2FA() {

        this.loading = true;

        this.$request('/auth/validate2FA', {
            code: this.twofaCode,
            token : this.user.twofa
        }).then(rsp => {

            this.loading = false;

            if (rsp && rsp.success) {
                App.csrf = rsp.csrf;
                AppEventStream.start();
                this.$close();
                return;
            }

        }, rsp => {

            this.loading = false;

            App.ui.notify(rsp && (rsp.message || rsp.error) ? (rsp.message || rsp.error) : this.t('Verification failed.'), 'error');

            setTimeout(() => {
                // this.$el.parentNode.classList.add('animated');
                // this.$el.parentNode.classList.add('shake');
            }, 100);
        });
    }
}
}
