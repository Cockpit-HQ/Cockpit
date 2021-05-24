export default {

    data() {

        return {

        }
    },

    template: /*html*/`

        <div class="app-offcanvas-container">
            <div class="app-offcanvas-content kiss-position-relative kiss-bgcolor-contrast kiss-flex-1">
                <iframe :src="$route('/settings/api/graphqlViewer')" style="position:absolute;top:0;left:0;width:100%;height:100%;"></iframe>
            </div>
        </div>
    `,
}