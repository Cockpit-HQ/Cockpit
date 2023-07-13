
let uuid = 0, cache = {};

export default {

    data() {

        return {
            uuid: `assetPreview${++uuid}`,
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

            if (this.asset.type == 'video') {
                setTimeout(() => this.captureFrame(), 0);
            }
        },

        captureFrame() {

            let videoURL = this.$base(`#uploads:${this.asset.path}`);
            let timeInSeconds = 2;

            const finalize = (img) => {

                let canvas = document.querySelector(`#${this.uuid} canvas`),
                    image = new Image();

                image.onload = () => {

                    canvas.width = image.width;
                    canvas.height = image.height;

                    // draw frame
                    let ctx = canvas.getContext('2d');
                    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
                };

                image.src = img;

                this.loading = false;
            };

            if (!cache[this.asset.path]) {

                cache[this.asset.path] = new Promise((resolve, reject) => {

                    let video = document.createElement('video');

                    video.onseeked = () => {

                        let canvas = document.createElement('canvas');
                        canvas.height = video.videoHeight;
                        canvas.width = video.videoWidth;

                        // draw frame
                        let ctx = canvas.getContext('2d');
                        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

                        resolve(canvas.toDataURL());
                    };

                    video.muted = true;
                    video.src = videoURL;
                    video.crossOrigin = 'anonymous';  // may be needed in some cases

                    video.onloadedmetadata = () => {

                        if (timeInSeconds > video.duration) {
                            timeInSeconds = Math.round(video.duration / 2);
                        }

                        // seek to time
                        video.currentTime = timeInSeconds;
                    };
                });
            }

            cache[this.asset.path].then((img) => {
                finalize(img);
            });
        }
    },

    template: /*html*/`
        <div :id="uuid">
            <div class="kiss-cover kiss-flex kiss-flex-middle kiss-flex-center" v-if="asset.type=='image'">
                <img class="animated fadeIn kiss-margin-auto kiss-responsive-height" loading="lazy" :src="$route('/assets/thumbnail/'+asset._id+'?m=bestFit&mime=auto&h=300&t='+asset._modified)" :style="{minHeight: asset.mime == 'image/svg+xml' ? '60%':''}" v-if="!loading">
                <app-loader size="small" v-if="loading"></app-loader>
            </div>
            <div class="kiss-cover kiss-flex kiss-flex-middle kiss-flex-center" v-else-if="asset.type=='video'">
                <canvas class="kiss-margin-auto kiss-responsive-height" style="opacity:.5"></canvas>
                <div class="kiss-cover kiss-flex kiss-flex-middle kiss-flex-center">
                    <app-loader size="small" v-if="loading"></app-loader>
                    <kiss-svg :src="$base('assets:assets/icons/video.svg')" width="80" height="80" v-if="!loading"></kiss-svg>
                </div>
            </div>
            <kiss-svg :src="$base('assets:assets/icons/file.svg')" width="80" height="80" v-else></kiss-svg>
        </div>
    `
}
