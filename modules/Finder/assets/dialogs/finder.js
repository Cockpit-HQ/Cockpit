export default {

    _meta: {flip: true, size: 'xxlarge'},

    data() {
        return {

        }
    },

    props: {
        root: {
            type: String,
            default: null
        },
        path: {
            default: null
        }
    },

    mounted() {


    },

    components: {
        finder: Vue.defineAsyncComponent(() => App.utils.import('finder:assets/vue-components/finder.js'))
    },

    template: /*html*/`
        <div class="app-offcanvas-container">

            <div class="kiss-padding kiss-text-bold kiss-flex kiss-flex-middle">
                <icon class="kiss-margin-small-right kiss-size-3" size="larger">folder</icon>
                <div class="kiss-flex-1">{{ t('Finder') }}</div>
            </div>

            <div class="app-offcanvas-content kiss-bgcolor-contrast kiss-flex-1">
                <div class="kiss-padding kiss-flex kiss-flex-column" style="height:100%">
                    <finder :root="root" :modal="true" :root-path="path || '/'"></finder>
                </div>
            </div>

        </div>
    `,

}
