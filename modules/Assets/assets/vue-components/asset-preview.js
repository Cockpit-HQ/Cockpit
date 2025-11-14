import { thumbHashToDataURL } from '../vendor/thumbhash.js';


let uuid = 0,
    hasWebPSupport = document.createElement('canvas').toDataURL('image/webp').startsWith('data:image/webp'),
    cache = {};


const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting || !entry.target.$updatePreview) return;
        observer.unobserve(entry.target);
        setTimeout(() => entry.target.$updatePreview());
    });
});

export default {

    data() {

        return {
            uuid: `assetPreview${++uuid}`,
            loading: true,
            preview: null,
            path: null,
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
            handler() {
                setTimeout(() => this.update());
            },
            deep: true
        }
    },

    mounted() {

        this.$el.$updatePreview = this.update;
        setTimeout(() => observer.observe(this.$el));
    },

    methods: {

        update() {

            if (this.path === this.asset.path) {
                return;
            }

            this.path = this.asset.path;
            this.preview = null;

            if (this.asset.thumbhash) {
                this.preview = thumbHashToDataURL(this.asset.thumbhash.split('-'))
            }

            if (this.asset.type === 'image') {
                setTimeout(() => this.captureImageThumbnail(), 0);
            } else if (this.asset.type === 'video') {
                setTimeout(() => this.captureVideoThumbnail(), 0);
            }
        },

        captureImageThumbnail() {

            let start = (Date.now()),
            delay = 250,
            mime = hasWebPSupport ? 'webp' : 'auto',
            duration;

            this.$request(`/assets/thumbnail/${this.asset._id}?m=bestFit&mime=${mime}&h=300&t=${this.asset._modified}&re=0&q=70`).then(rsp => {

                duration = Date.now() - start;

                setTimeout(() => {
                    this.preview = rsp.url;
                    this.loading = false;
                }, duration > delay ? 0 : delay - (Date.now() - start));
            });

        },

        captureVideoThumbnail() {

            let videoURL = this.$baseUrl(`#uploads:${this.asset.path}`);
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

                    if (App._vars.ffmpeg) {

                        const mime = hasWebPSupport ? 'webp' : 'auto';

                        this.$request(`/assets/thumbnail/${this.asset._id}?m=bestFit&mime=${mime}&h=300&t=${this.asset._modified}&re=0&q=70`).then(rsp => {
                            resolve(rsp.url);
                        });

                        return;
                    }

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
                    video.crossOrigin = 'anonymous';  // may be needed in some cases

                    video.onloadedmetadata = () => {

                        if (timeInSeconds > video.duration) {
                            timeInSeconds = Math.round(video.duration / 2);
                        }

                        // seek to time
                        video.currentTime = timeInSeconds;
                    };

                    setTimeout(() => video.src = videoURL, 5);
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
                <img class="kiss-position-absolute kiss-margin-auto kiss-responsive-height" :alt="asset.title" loading="lazy" :src="preview" :width="asset.width" :height="asset.height" :style="{height: maxHeight ?? '100%'}" v-if="preview && loading">
                <img class="kiss-position-absolute kiss-margin-auto kiss-responsive-height animated fadeIn fast" :alt="asset.title" loading="lazy" :src="preview" :width="asset.width" :height="asset.height" :style="{height: maxHeight}" v-if="preview && !loading">
                <app-loader size="small" v-if="loading"></app-loader>
            </div>
            <div class="kiss-cover kiss-flex kiss-flex-middle kiss-flex-center" v-else-if="asset.type=='video'">
                <canvas class="kiss-margin-auto kiss-responsive-height" style="opacity:.5" :style="{height: maxHeight}"></canvas>
                <div class="kiss-cover kiss-flex kiss-flex-middle kiss-flex-center">
                    <app-loader size="small" v-if="loading"></app-loader>
                    <kiss-svg :src="$baseUrl('assets:assets/icons/video.svg')" width="80" height="80" style="max-width:50%" v-if="!loading"></kiss-svg>
                </div>
            </div>
            <kiss-svg :src="$baseUrl('assets:assets/icons/file.svg')" width="80" height="80" v-else></kiss-svg>
        </div>
    `
}
