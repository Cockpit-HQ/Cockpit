export default {

    data() {

        return {
            loaded: false
        }
    },

    template: /*html*/`

        <div class="app-offcanvas-container">
            <div class="app-offcanvas-content kiss-position-relative kiss-bgcolor-contrast kiss-flex-1 kiss-flex kiss-flex-middle kiss-flex-center">
                <div v-if="!loaded"><app-loader></app-loader></div>
                <iframe :src="$route('/settings/api/graphqlViewer')" style="position:absolute;top:0;left:0;width:100%;height:100%;" @load="loaded=true"></iframe>
            </div>
        </div>
    `,
}