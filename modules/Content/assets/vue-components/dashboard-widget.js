export default {

    components: {
        'content-recent-items': Vue.defineAsyncComponent(() =>
            App.utils.import('content:assets/vue-components/content-recent-items.js')
        )
    },

    props: {
        models: {
            type: Array,
            default: () => []
        }
    },

    template: /*html*/`
        <kiss-card>
            <div class="kiss-text-caption kiss-text-bold">{{ t('Content') }}</div>
            <div class="kiss-color-muted kiss-size-small kiss-margin-xsmall">{{ t('Latest updated content items') }}</div>

            <content-recent-items :models="models"></content-recent-items>

            <div class="kiss-margin-small">
                <a class="kiss-button kiss-button-small" :href="$routeUrl('/content')">{{ t('Go to content') }}</a>
            </div>

        </kiss-card>
    `
}
