import assetsManager from "../vue-components/assets-manager.js";

export default {

    _meta: {
        size: 'xlarge',
    },

    data() {
        return {

        }
    },

    props: {
        filter: {
            default: null
        },
        multiple: {
            type: Boolean,
            default: false
        }
    },


    components: {
        assetsManager
    },

    template: /*html*/`
        <div>

            <div class="kiss-size-4 kiss-text-bold kiss-margin kiss-flex kiss-flex-middle">
                <icon class="kiss-margin-small-right kiss-size-3" size="larger">link</icon>
                <div class="kiss-flex-1">{{ t('Select asset') }}</div>
            </div>

            <div class="kiss-margin">
                <assets-manager :modal="true" :onSelect="onSelect" :selectMultiple="multiple" :initFilter="filter"></assets-manager>
            </div>

        </div>
    `,

    methods: {
        onSelect(selected) {
            this.$call('onSelect', selected);
            this.$close();
        }
    }
}
