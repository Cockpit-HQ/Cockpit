export default {

    data() {

        let data = Object.assign({
            name: '',
            filter: '',
            private: true
        }, this.view || {})

        return {
            val: data,
            loading: false
        }
    },

    props: {
        view: {
            type: Object,
            default: {}
        }
    },

    methods: {

        save() {

            const isUpdate = this.val._id ? true : false;

            this.loading = true;

            this.$request('/content/collection/saveView', {view:this.val}).then(rsp => {
                this.val = rsp.view;

                this.$call('viewUpdate', this.val);

                if (isUpdate) {
                    App.ui.notify('View updated!', 'info');
                } else {
                    App.ui.notify('View created!', 'success');
                }

                this.$close();
            }).catch(res => {
                App.ui.notify(res.error || 'Saving failed!', 'error');
            }).finally(() => {
                this.loading = false;
            });
        }
    },

    template: /*html*/`
        <div :class="{'kiss-disabled': loading}">

            <div class="kiss-size-4 kiss-text-bold">
                {{ t(val._id ? 'Update view' : 'Create view') }}
            </div>

            <div class="kiss-margin">
                <label>{{ t('Name') }}</label>
                <input class="kiss-input" type="text" v-model="val.name" autocomplete="off" autofocus required>
            </div>

            <div class="kiss-margin">

                <label>{{ t('Visibility') }}</label>

                <kiss-card class="kiss-padding kiss-position-relative kiss-margin-small" :theme="val.private ? 'bordered contrast': 'bordered'" :class="{'kiss-color-muted': !val.private}" :style="{borderColor: val.private ? 'var(--kiss-color-primary)':null}">
                    <strong class="kiss-size-small">{{ t('Private') }}</strong>
                    <div class="kiss-color-muted kiss-size-xsmall kiss-margin-xsmall-top">{{ t('This view is visible only to you') }}</div>
                    <a class="kiss-cover" @click="val.private = true"></a>
                </kiss-card>

                <kiss-card class="kiss-padding kiss-position-relative kiss-margin-small" :theme="!val.private ? 'bordered contrast': 'bordered'" :class="{'kiss-color-muted': val.private}" :style="{borderColor: !val.private ? 'var(--kiss-color-primary)':null}">
                    <strong class="kiss-size-small">{{ t('Shared') }}</strong>
                    <div class="kiss-color-muted kiss-size-xsmall kiss-margin-xsmall-top">{{ t('This view is visible to everyone') }}</div>
                    <a class="kiss-cover" @click="val.private = false"></a>
                </kiss-card>
            </div>


            <div class="kiss-flex kiss-button-group kiss-margin-top">
                <button class="kiss-button kiss-flex-1" @click="$close()">
                    {{ t('Cancel') }}
                </button>
                <button class="kiss-button kiss-button-primary kiss-flex-1" @click="save()" :disabled="!val.name">
                    {{ t(val._id ? 'Update' : 'Create') }}
                </button>
            </div>
        </div>
    `
}
