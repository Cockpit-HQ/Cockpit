export default {

    data() {

        return {

        }
    },

    props: {
        uri: {
            type: String
        },
        fields: {
            type: Array
        },
        item: {
            type: Object,
            default: null
        }
    },

    template: /*html*/`

        <div class="app-offcanvas-container">
            <div class="kiss-padding kiss-flex kiss-flex-middle">
                <div class="kiss-flex-1 kiss-text-bold">{{ t('Content preview') }}</div>
                <a class="kiss-button kiss-button-small" kiss-offcanvas-close>{{ t('Close preview') }}</a>
            </div>
            <div class="app-offcanvas-content kiss-position-relative kiss-bgcolor-contrast kiss-flex kiss-flex-1">
                <div class="kiss-padding" style="min-width:450px;background:yellow">

                </div>
                <div class="kiss-flex-1 kiss-position-relative" style="background:red">
                    <iframe style="position:absolute;top:0;left:0;width:100%;height:100%;"></iframe>
                </div>

            </div>
        </div>
    `,
}