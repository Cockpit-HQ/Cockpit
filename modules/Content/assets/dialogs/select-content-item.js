export default {

    props: {
        model: {
            type: Object,
            default: null
        }
    },

    template: /*html */`
        <div>

            <div class="kiss-size-4 kiss-text-bold kiss-margin kiss-flex kiss-flex-middle">
                <icon class="kiss-margin-small-right kiss-size-3" size="larger">playlist_add_check</icon>
                {{ t('Select model item') }}
            </div>



            <div class="kiss-flex kiss-flex-right kiss-margin-top">

                <button class="kiss-button kiss-button-primary" @click="$close()">
                    {{ t('Cancel') }}
                </button>
            </div>
        </div>
    `
}