function initUppy() {

    return new Uppy.Core({
        autoProceed: false,
        restrictions: {
            //maxFileSize: 1000000,
            //maxNumberOfFiles: 3,
            minNumberOfFiles: 1,
            allowedFileTypes: ['image/*', 'video/*']
        }
    }).use(Uppy.Dashboard, {
        showProgressDetails: true,
        //note: 'Images and video only, 2–3 files, up to 1 MB',
        height: 470,
        metaFields: [
            { id: 'name', name: 'Name', placeholder: 'file name' },
            { id: 'caption', name: 'Caption', placeholder: 'describe what the image is about' }
        ],
        browserBackButtonClose: false
    }).use(Uppy.XHRUpload, {
        endpoint: App.route('/assets/upload')
    }).use(Uppy.Webcam, { target: Uppy.Dashboard })
    .use(Uppy.ScreenCapture, { target: Uppy.Dashboard })
    //.use(Uppy.Url, { target: Uppy.Dashboard, companionUrl: 'https://companion.uppy.io' })
    .use(Uppy.ImageEditor, { target: Uppy.Dashboard });
}


export default {

    data() {
        return {
            assets: [],
            selected: [],
            folders: [],
            folder: null,

            page: 1,
            count: 0,
            pages: 1,
            limit: 15,

            loading: false,
            modal: false,
            view: 'assets',
            uppy: null
        }
    },

    mounted() {

        this.load();

        App.assets.require([
            'assets:assets/vendor/uppy/uppy.js',
            'assets:assets/vendor/uppy/uppy.css',
        ]).then(() => {

            App.assets.require([
                'assets:assets/css/uppy.css',
            ]);

            this.uppy = initUppy();

            this.uppy.on('complete', result => {
                console.log('successful files:', result.successful)
                console.log('failed files:', result.failed)
                this.load();
            })

            //this.uppy.getPlugin('Dashboard').openModal()
        }, 1000)
    },

    template: /*html*/`

        <div class="DashboardContainer"></div>

        <div class="kiss-margin-large" v-if="view == 'assets'">

            <app-loader class="kiss-margin-large" v-if="loading"></app-loader>

            <div class="animated fadeIn kiss-margin-large kiss-color-muted kiss-align-center" :class="{'kiss-height-30vh kiss-flex kiss-flex-middle kiss-flex-center': !modal}" v-if="!loading && !assets.length">
                <div>
                    <kiss-svg :src="$base('assets:icon.svg')" width="35" height="35"><canvas width="35" height="35"></canvas></kiss-svg>
                    <p class="kiss-margin-small-top">{{ t('No assets') }}</p>
                </div>
            </div>

            <kiss-row class="kiss-child-width-1-5" v-if="!loading && assets.length" match="true" hover="shadow">
                <div v-for="asset in assets">
                    <kiss-card theme="bordered">
                        <div class="kiss-bgcolor-contrast"><canvas width="400" height="300"></canvas></div>
                        <div class="kiss-padding-small kiss-size-xsmall">
                            <div class="kiss-text-truncate">{{ asset.title }}</div>
                        </div>
                    </kiss-card>
                </div>
            </kiss-row>

            <app-actionbar v-show="!modal">
                <kiss-container id="assets-component-actionbar">
                    <div class="kiss-flex kiss-flex-middle">
                        <div class="kiss-flex kiss-flex-middle" v-if="!loading && count">
                            <div class="kiss-size-small">{{ count}} {{ count == 1 ? t('Item') : t('Items') }}</div>
                            <div class="kiss-margin-small-left kiss-overlay-input">
                                <span class="kiss-badge kiss-badge-outline kiss-color-muted">{{ page }} / {{pages}}</span>
                                <select v-model="page" @change="load(page)" v-if="pages > 1"><option v-for="p in pages" :value="p">{{ p }}</option></select>
                            </div>
                            <div class="kiss-margin-small-left kiss-size-small">
                                <a class="kiss-margin-small-right" v-if="(page - 1) >= 1" @click="load(page - 1)"><?=t('Previous')?></a>
                                <a v-if="(page + 1) <= pages" @click="load(page + 1)"><?=t('Next')?></a>
                            </div>
                        </div>
                        <div class="kiss-flex-1"></div>
                        <button class="kiss-button kiss-button-primary" :disabled="!uppy" @click="uppy.getPlugin('Dashboard').openModal()">{{ t('Upload asset') }}</button>
                    </div>
                </kiss-container>
            </app-actionbar>

        </div>
    `,

    methods: {

        load(page = 1) {

            let options = {
                limit: this.limit,
                skip: (page - 1) * this.limit,
            };

            this.loading = true;
            this.selected = [];

            this.$request('/assets/assets', {options}).then(rsp => {
                this.assets = rsp.assets;
                this.page = rsp.page;
                this.pages = rsp.pages;
                this.count = rsp.count;

                this.view = 'assets';
                this.loading = false;
            })
        }
    }

}