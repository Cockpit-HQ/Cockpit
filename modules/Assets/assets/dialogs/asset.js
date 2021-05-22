export default {

    data() {

        return {
            item: Object.assign({...this.asset})
        }
    },

    props: {
        asset: {
            type: Object
        }
    },

    template: /*html*/`

        <div class="kiss-height-100vh kiss-flex kiss-flex-column">
            <div class="kiss-padding kiss-size-4 kiss-text-bold kiss-flex kiss-flex-middle">
                <div class="kiss-margin-small-right"><icon size-larger>create</icon></div>
                {{ t('Edit asset') }}
            </div>
            <div class="app-offcanvas-content kiss-padding">

            </div>
            <div class="kiss-padding">
                <div class="kiss-button-group kiss-flex kiss-child-width-1-2">
                    <button class="kiss-button" kiss-offcanvas-close>{{ t('Close') }}</button>
                    <button class="kiss-button kiss-button-primary">{{ t('Update asset') }}</button>
                </div>
            </div>
        </div>

    `,

    methods: {

    }
}