import assetsManager from "../vue-components/assets-manager.js";

export default {

    data() {
        return {
            ASSETS_BASE_URL: window.ASSETS_BASE_URL,
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
                <assets-manager :modal="true" :selectAsset="selectAsset"></assets-manager>
            </div>

        </div>
    `,

    methods: {
        selectAsset(asset) {
            this.$call('selectAsset', asset);
            this.$close();
        }
    }
}