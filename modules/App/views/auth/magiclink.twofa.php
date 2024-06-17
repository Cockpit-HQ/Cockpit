<vue-view class="kiss-cover kiss-flex kiss-flex kiss-flex-middle kiss-flex-center">

    <template>
        <div class="animated pulse kiss-width-3-4 kiss-width-1-2@m kiss-width-1-4@xl" :class="{'kiss-disabled': loading}">

            <kiss-card>

                <kiss-row class="kiss-flex-middle">
                    <div><app-avatar size="50" :name="user.name"></app-avatar></div>
                    <div class="kiss-size-small">
                        <div class="kiss-text-bold">{{ user.name }}</div>
                        <div class="kiss-color-muted">{{ user.email }}</div>
                    </div>
                </kiss-row>

            </kiss-card>

            <form class="kiss-margin-top" @submit.prevent="verify2FA">
                <div>
                    <input class="kiss-input kiss-text-monospace" type="text" placeholder="2FA Code" aria-label="2FA Code" v-model="twofaCode" autofocus required>
                </div>
                <div class="kiss-margin-top">
                    <button class="kiss-button kiss-button-outline kiss-button-primary kiss-width-1-1">{{ t('Verify code') }}</button>
                </div>
            </form>

        </div>
    </template>

    <script type="module">

        export default {

            data() {

                return {
                    user: <?=json_encode($user)?>,
                    twofaCode: null,
                    loading: false
                }
            },

            methods: {
                verify2FA() {

                    this.loading = true;

                    this.$request('/auth/validate2FA', {
                        code: this.twofaCode,
                        token: this.user.twofa
                    }).then(rsp => {

                        if (rsp && rsp.success) {
                            setTimeout(() => window.location = '<?= $this->routeUrl('/') ?>', 1500);
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
