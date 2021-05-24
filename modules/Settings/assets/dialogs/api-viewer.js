export default {

    data() {

        return {

        }
    },

    props: {
        openApiUrl: {
            type: String
        }
    },

    template: /*html*/`

        <div class="app-offcanvas-container">
            <div class="kiss-padding kiss-text-bold">
                {{ t('Rest-Api Viewer') }}
            </div>
            <div class="app-offcanvas-content kiss-position-relative kiss-bgcolor-contrast kiss-flex-1">
                <iframe :src="$route('/settings/api/restApiViewer?specUrl='+openApiUrl)" style="position:absolute;top:0;left:0;width:100%;height:100%;"></iframe>
            </div>
        </div>
    `,
}