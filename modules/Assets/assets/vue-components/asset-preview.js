import { thumbHashToDataURL } from '../vendor/thumbhash.js';


let uuid = 0, cache = {};

export default {

    data() {

        return {
            uuid: `assetPreview${++uuid}`,
            loading: true,
            preview: null
        }
    },

    props: {
        asset: {
            type: Object,
            default: {}
        },
        maxHeight: {
            type: String,
            default: null,
        }
    },

    watch: {
        asset: {
            handler(ov, nv) {

                if (ov?.path === nv?.path) {
                    return;
                }

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

            this.preview = null;

            if (this.asset.thumbhash) {
                this.preview = thumbHashToDataURL(this.asset.thumbhash.split('-'))
            }

            if (this.asset.type == 'image') {

                this.$request(`/assets/thumbnail/${this.asset._id}?m=bestFit&mime=auto&h=300&t=${this.asset._modified}&re=0`).then(rsp => {
                    this.preview = rsp.url;
                    this.loading = false;
                });
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
                <img class="kiss-position-absolute kiss-margin-auto kiss-responsive-height" :alt="asset.title" loading="lazy" :src="preview" :width="asset.width" :height="asset.height" :style="{height: '100%'}" v-if="preview && loading">
                <img class="kiss-position-absolute kiss-margin-auto kiss-responsive-height animated fadeIn" :alt="asset.title" loading="lazy" :src="preview" :width="asset.width" :height="asset.height" :style="{height: maxHeight}" v-if="preview && !loading">
                <app-loader size="small" v-if="loading"></app-loader>
            </div>
            <div class="kiss-cover kiss-flex kiss-flex-middle kiss-flex-center" v-else-if="asset.type=='video'">
                <canvas class="kiss-margin-auto kiss-responsive-height" style="opacity:.5" :style="{height: maxHeight}"></canvas>
                <div class="kiss-cover kiss-flex kiss-flex-middle kiss-flex-center">
                    <app-loader size="small" v-if="loading"></app-loader>
                    <kiss-svg :src="$base('assets:assets/icons/video.svg')" width="80" height="80" style="max-width:50%" v-if="!loading"></kiss-svg>
                </div>
            </div>
            <kiss-svg :src="$base('assets:assets/icons/file.svg')" width="80" height="80" v-else></kiss-svg>
        </div>
    `
}
