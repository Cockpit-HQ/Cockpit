
export default {

    data() {

        return {
            ASSETS_BASE_URL: window.ASSETS_BASE_URL,
            loading: true
        }
    },

    props: {
        asset: {
            type: Object,
            default: {}
        }
    },

    mounted() {

        if (this.asset.type == 'image') {
            let img = new Image();

            img.onload = () => {
                this.loading = false;
            }

            img.src = ASSETS_BASE_URL + this.asset.path;
        }

    },

    template: /*html*/`
        <div>
            <div class="kiss-cover kiss-flex kiss-flex-middle kiss-flex-center" v-if="asset.type=='image'">
                <img class="animated fadeIn kiss-margin-auto kiss-responsive-height" :src="ASSETS_BASE_URL+asset.path" v-if="!loading">
                <app-loader size="small" v-if="loading"></app-loader>
            </div>
            <kiss-svg :src="$base('assets:assets/icons/video.svg')" width="80" height="80" v-else-if="asset.type=='video'"></kiss-svg>
            <kiss-svg :src="$base('assets:assets/icons/file.svg')" width="80" height="80" v-else></kiss-svg>
        </div>
    `
}