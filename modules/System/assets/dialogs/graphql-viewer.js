export default {

    data() {

        return {
            loaded: false
        }
    },

    props: {
        apiKey: {
            type: String
        }
    },

    computed: {
        iframeSrc() {

            let apiKey = this.apiKey || '';
            let computedStyle = getComputedStyle(document.documentElement);

            let primaryColor = computedStyle.getPropertyValue('--kiss-color-primary').trim().replace('#', '%23');
            let theme = computedStyle.getPropertyValue('--app-auto-theme').trim()

            return this.$routeUrl(`/system/api/graphqlViewer?theme=${theme}&primaryColor=${primaryColor}&apiKey=${apiKey}`);
        }
    },

    template: /*html*/`

        <div class="app-offcanvas-container">
            <div class="app-offcanvas-content kiss-position-relative kiss-bgcolor-contrast kiss-flex-1 kiss-flex kiss-flex-middle kiss-flex-center">
                <div v-if="!loaded"><app-loader></app-loader></div>
                <iframe :src="iframeSrc" style="position:absolute;top:0;left:0;width:100%;height:100%;" @load="loaded=true"></iframe>
            </div>
        </div>
    `,
}
