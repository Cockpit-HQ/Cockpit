export default {

    _meta: {
        size: 'medium',
    },

    data() {
        return {
            src: this.meta.src || '',
            alt: this.meta.alt || '',
            width: this.meta.width || '',
            height: this.meta.height || '',
            sources: {}
        }
    },

    props: {
        meta: {
            type: Object,
            default: {}
        }
    },

    mounted() {
        App.trigger('field-richtext-image-sources', [this]);
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
                <div class="kiss-margin-small kiss-flex kiss-flex-middle" gap="small" v-if="Object.keys(sources).length">
                    <icon>folder_data</icon>
                    <a class="kiss-size-small" v-for="(clb, name) in sources" @click="() => clb()">{{ name }}</a>
                </div>
            </div>

            <div class="kiss-margin kiss-position-relative kiss-bgcolor-transparentimage" v-if="src">
                <canvas width="800" height="400"></canvas>
                <div class="kiss-cover kiss-flex kiss-flex-middle kiss-flex-center">
                    <img class="kiss-position-absolute kiss-margin-auto kiss-responsive-height" :src="src" v-if="src">
                </div>
            </div>

            <div class="kiss-margin">
                <label class="kiss-text-capitalize">{{ t('Alternative text') }}</label>
                <input class="kiss-input" type="text" v-model="alt">
            </div>

            <!--
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
            -->

            <div class="kiss-margin-top kiss-flex kiss-flex-middle kiss-button-group">
                <button type="button" class="kiss-button kiss-flex-1" @click="$close()">{{ t('Cancel') }}</button>
                <button type="button" class="kiss-button kiss-button-primary kiss-flex-1" @click="save">{{ t('Save') }}</button>
            </div>
        </div>
    `
}
