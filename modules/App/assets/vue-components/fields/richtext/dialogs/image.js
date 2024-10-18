export default {

    data() {
        return {
            src: this.meta.src || '',
            alt: this.meta.alt || '',
            width: this.meta.width || '',
            height: this.meta.height || '',
        }
    },

    props: {
        meta: {
            type: Object,
            default: {}
        }
    },

    methods: {
        save() {
            this.$call('save', {
                src: this.src,
                alt: this.alt,
                width: this.width,
                height: this.height,
            });

            this.$close();
        }
    },

    template: /*html*/`
        <div>
            <div class="kiss-size-4 kiss-text-bold">{{ t('Image') }}</div>

            <div class="kiss-margin">
                <label class="kiss-text-capitalize">{{ t('Source') }}</label>
                <input class="kiss-input" type="text" v-model="src">
            </div>

            <img class="kiss-margin" :src="src" v-if="src">

            <div class="kiss-margin">
                <label class="kiss-text-capitalize">{{ t('Alternative text') }}</label>
                <input class="kiss-input" type="text" v-model="alt">
            </div>

            <kiss-grid cols="2@m" class="kiss-margin">
                <div>
                    <label class="kiss-text-capitalize">{{ t('Width') }}</label>
                    <input class="kiss-input" type="text" v-model="width">
                </div>
                <div>
                    <label class="kiss-text-capitalize">{{ t('Height') }}</label>
                    <input class="kiss-input" type="text" v-model="height">
                </div>
            </kiss-grid>

            <div class="kiss-margin-top kiss-flex kiss-flex-middle kiss-button-group">
                <button type="button" class="kiss-button kiss-flex-1" @click="$close()">{{ t('Cancel') }}</button>
                <button type="button" class="kiss-button kiss-button-primary kiss-flex-1" @click="save">{{ t('Save') }}</button>
            </div>
        </div>
    `
}
