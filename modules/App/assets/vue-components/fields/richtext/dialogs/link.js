export default {

    _meta: {
        size: 'medium',
    },

    data() {
        return {
            href: this.meta.href || '',
            title: this.meta.title || '',
            target: this.meta.target || '',
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
        App.trigger('field-richtext-link-sources', [this]);
    },

    methods: {
        save() {
            this.$call('save', {
                href: this.href,
                title: this.title,
                target: this.target
            });

            this.$close();
        }
    },

    template: /*html*/`
        <div>
            <div class="kiss-size-4 kiss-text-bold">{{ t('Link') }}</div>

            <div class="kiss-margin">
                <label class="kiss-text-capitalize">{{ t('Url') }}</label>
                <input class="kiss-input" type="text" v-model="href">
                <div class="kiss-margin-small kiss-flex kiss-flex-middle" gap="small" v-if="Object.keys(sources).length">
                    <icon>folder_data</icon>
                    <a class="kiss-size-small" v-for="(clb, name) in sources" @click="() => clb()">{{ name }}</a>
                </div>
            </div>

            <img class="kiss-margin" :src="src" v-if="src">

            <div class="kiss-margin">
                <label class="kiss-text-capitalize">{{ t('Title') }}</label>
                <input class="kiss-input" type="text" v-model="title">
            </div>

            <div>
                <label class="kiss-text-capitalize">{{ t('Target') }}</label>
                <input class="kiss-input" type="text" v-model="target">
            </div>

            <div class="kiss-margin-top kiss-flex kiss-flex-middle kiss-button-group">
                <button type="button" class="kiss-button kiss-flex-1" @click="$close()">{{ t('Cancel') }}</button>
                <button type="button" class="kiss-button kiss-button-primary kiss-flex-1" @click="save">{{ t('Save') }}</button>
            </div>
        </div>
    `
}
