
export default {

    data() {

        return {
            loading: true
        }
    },

    props: {
        asset: {
            type: Object,
            default: {}
        }
    },

    watch: {
        asset: {
            handler() {
                setTimeout(() => this.update());
            },
            deep: true
        }
    },

    mounted() {
        setTimeout(() => this.update());
    },

    methods: {

        update() {

            if (this.asset.type == 'image') {
                let img = new Image();

                img.onload = () => {
                    this.loading = false;
                }

                img.src = this.$route(`/assets/thumbnail/${this.asset._id}?m=bestFit&mime=auto&h=300&t=${this.asset._modified}`);
            }

        }
    },

    template: /*html*/`
        <div>
            <div class="kiss-cover kiss-flex kiss-flex-middle kiss-flex-center" v-if="asset.type=='image'">
                <img class="animated fadeIn kiss-margin-auto kiss-responsive-height" loading="lazy" :src="$route('/assets/thumbnail/'+asset._id+'?m=bestFit&mime=auto&h=300&t='+asset._modified)" :style="{minHeight: asset.mime == 'image/svg+xml' ? '60%':''}" v-if="!loading">
                <app-loader size="small" v-if="loading"></app-loader>
            </div>
            <kiss-svg :src="$base('assets:assets/icons/video.svg')" width="80" height="80" v-else-if="asset.type=='video'"></kiss-svg>
            <kiss-svg :src="$base('assets:assets/icons/file.svg')" width="80" height="80" v-else></kiss-svg>
        </div>
    `
}