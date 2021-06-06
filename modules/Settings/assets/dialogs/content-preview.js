import fieldsRenderer from "../vue-components/fields-renderer.js"

export default {

    data() {

        return {
            data: JSON.parse(JSON.stringify(this.item)),
            previewLoaded: false
        }
    },

    props: {
        uri: {
            type: String
        },
        fields: {
            type: Array,
            default: []
        },
        locales: {
            type: Array,
            default: []
        },
        item: {
            type: Object,
            default: null
        }
    },

    computed: {
        url() {
            return this.uri;
        }
    },

    components: {
        fieldsRenderer
    },

    template: /*html*/`

        <div class="app-offcanvas-container">
            <div class="kiss-padding kiss-flex kiss-flex-middle">
                <div class="kiss-flex-1 kiss-text-bold">{{ t('Content preview') }}</div>
                <a class="kiss-button kiss-button-small" kiss-offcanvas-close>{{ t('Close preview') }}</a>
            </div>
            <div class="app-offcanvas-content kiss-position-relative kiss-bgcolor-contrast kiss-flex kiss-flex-1">
                <div class="kiss-flex kiss-flex-column" style="min-width:600px;">
                    <div class="kiss-flex-1 kiss-padding kiss-overflow-y-auto">
                        <fields-renderer v-model="data" :fields="fields" :locales="locales"></fields-renderer>
                    </div>
                    <div class="kiss-padding">
                        <div class="kiss-button-group kiss-child-width-1-2 kiss-width-1-1">
                            <button type="button" class="kiss-button" kiss-offcanvas-close>{{ t('Close') }}</button>
                            <button type="button" class="kiss-button kiss-button-primary">{{ t('Update & Close') }}</button>
                        </div>
                    </div>
                </div>
                <div class="kiss-flex kiss-flex-1 kiss-flex-middle kiss-flex-center kiss-position-relative">
                    <div v-if="!previewLoaded">
                        <app-loader></app-loader>
                    </div>
                    <iframe :src="url" style="position:absolute;top:0;left:0;width:100%;height:100%;background-color:#fff;" @load="previewLoaded=true" :style="{visibility: (previewLoaded ? 'visible':'hidden')}"></iframe>
                </div>

            </div>
        </div>
    `,
}