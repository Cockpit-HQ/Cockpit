<div class="bg-animation-northern-lights"></div>

<vue-view class="kiss-position-relative">
    <template>

        <kiss-container class="login-wrapper">

            <div class="login-dialog animated pulse">

                <div class="kiss-flex kiss-flex-middle kiss-margin-large" gap>
                    <div><img class="app-logo" src="<?= $this->helper('theme')->logo() ?>" style="height:40px;width:auto;" alt="Logo"></div>
                    <div>
                        <strong class="kiss-size-5"><?= $this['app.name'] ?></strong>
                        <div class="kiss-color-muted kiss-size-xsmall kiss-margin-xsmall"><?= t('Log in to your account') ?></div>
                    </div>
                </div>

                <form :class="{'kiss-disabled': loading}" @submit.prevent="login" v-if="view=='form'">

                    <div class="kiss-margin">
                        <input class="kiss-input" type="text" placeholder="<?= t('Username or Email') ?>" aria-label="<?= t('Username or Email') ?>" v-model="auth.user" autocomplete="off" autofocus required>
                    </div>

                    <div class="kiss-margin">
                        <input class="kiss-input" type="password" autocomplete="current-password" placeholder="<?= t('Password') ?>" aria-label="<?= t('Password') ?>" v-model="auth.password" required>
                    </div>

                    <div class="kiss-margin">
                        <button class="kiss-button kiss-button-large kiss-button-primary kiss-width-1-1"><?= t('Log in') ?></button>
                    </div>

                </form>

                <kiss-card class="animated fadeIn"v-if="!loading && view=='success' && !user.twofa">

                    <kiss-row class="kiss-flex-middle">
                        <div><app-avatar size="50" :name="user.name"></app-avatar></div>
                        <div class="kiss-size-small">
                            <div class="kiss-text-bold">{{ user.name }}</div>
                            <div class="kiss-color-muted">{{ user.email }}</div>
                        </div>
                    </kiss-row>

                </kiss-card>

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

        </kiss-container>

        <app-loader class="animated fadeIn kiss-margin-top" v-if="loading"></app-loader>

    </template>

    <script type="module">
        export default {

            data() {

                return {
                    auth: {
                        user: '',
                        password: ''
                    },
                    view: 'form',
                    loading: false,
                    user: null,
                    twofaCode: null
                }
            },

            mounted() {

            },

            watch: {
                view() {
                    setTimeout(() => {

                        const input = this.$el.parentNode.querySelector('input[type="text"]');

                        if (input) {
                            input.focus();
                        }

                    }, 300);
                }
            },

            methods: {

                login() {

                    this.loading = true;

                    this.$request('/auth/check', {
                        auth: this.auth,
                        csrf: "<?= $this->helper('csrf')->token('login') ?>"
                    }).then(rsp => {

                        this.loading = false;

                        if (!rsp.success) {

                            App.ui.notify('Login failed.', 'error');

                            this.$el.parentNode.classList.remove('shake');

                            setTimeout(() => {
                                this.$el.parentNode.classList.add('animated');
                                this.$el.parentNode.classList.add('shake');
                            }, 100);

                            return;
                        }

                        this.user = rsp.user;
                        this.view = 'success';

                        // redirect if twofa is disabled for the user
                        if (!this.user.twofa) {
                            setTimeout(() => window.location = '<?= $redirectTo ?>', 1500);
                        }

                    }, rsp => {
                        this.loading = false;
                        App.ui.notify(rsp && (rsp.message || rsp.error) ? (rsp.message || rsp.error) : '<?= t('Login failed.') ?>', 'error');
                    });
                },

                verify2FA() {

                    this.loading = true;

                    this.$request('/auth/validate2FA', {
                        code: this.twofaCode,
                        token: this.user.twofa
                    }).then(rsp => {

                        if (rsp && rsp.success) {
                            setTimeout(() => window.location = '<?= $redirectTo ?>', 1500);
                            return;
                        }

                    }, rsp => {

                        this.loading = false;

                        App.ui.notify(rsp && (rsp.message || rsp.error) ? (rsp.message || rsp.error) : '<?= t('Verification failed.') ?>', 'error');

                        setTimeout(() => {
                            this.$el.parentNode.classList.add('animated');
                            this.$el.parentNode.classList.add('shake');
                        }, 100);
                    });

                }
            }
        }
    </script>

</vue-view>

<style>
@keyframes bg-animation-northern-lights {
    from { background-position: 50% 50%, 50% 50%; }
    to { background-position: 350% 50%, 350% 50%; }
}

.bg-animation-northern-lights {

    --stripes: repeating-linear-gradient(
        100deg,
        #fff 0%,
        #fff 7%,
        transparent 10%,
        transparent 12%,
        #fff 16%
    );
    --stripesDark: repeating-linear-gradient(
        100deg,
        #000 0%,
        #000 7%,
        transparent 10%,
        transparent 12%,
        #000 16%
    );
    --rainbow: repeating-linear-gradient(
        100deg,
        #60a5fa 10%,
        #e879f9 15%,
        #60a5fa 20%,
        #5eead4 25%,
        #60a5fa 30%
    );

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    background-image: var(--stripes), var(--rainbow);
    background-size: 300%, 200%;
    background-position: 50% 50%, 50% 50%;

    filter: blur(10px) invert(100%);
    mask-image: radial-gradient(ellipse at 100% 0%, black 40%, transparent 75%);

    pointer-events: none;
    opacity: 0.5;
    z-index: 0;
}

.bg-animation-northern-lights::after {
    content: "";
    position: absolute;
    inset: 0;
    background-image: var(--stripes), var(--rainbow);
    background-size: 200%, 100%;
    animation: bg-animation-northern-lights 60s linear infinite;
    background-attachment: fixed;
    mix-blend-mode: difference;
}

[data-theme="dark"] .bg-animation-northern-lights {
    background-image: var(--stripesDark), var(--rainbow);
    filter: blur(10px) opacity(40%) saturate(200%);
}
[data-theme="dark"] .bg-animation-northern-lights::after {
    background-image: var(--stripesDark), var(--rainbow);
}

</style>
