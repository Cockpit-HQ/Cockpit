import {setHighestZindex} from '../../../App/assets/vendor/kiss/js/utils.js'

export const initUppyUploader = function(meta = {}, options = {}) {

    options = Object.assign({
        bundle: false
    }, options || {});

    let _uppy = null;

    return App.assets.require([
        'assets:assets/vendor/uppy/uppy.js',
        'assets:assets/css/uppy.css',
    ]).then(() => {

        _uppy = new Uppy.Uppy({
            meta,
            autoProceed: false,
            restrictions: {
                maxFileSize: App._vars.maxUploadSize || null,
                maxNumberOfFiles: options.maxNumberOfFiles || (options.bundle ? (App._vars.maxFileUploads || 20) : null),
                minNumberOfFiles: 1,
                //allowedFileTypes: ['image/*', 'video/*']
            },
            allowMultipleUploadBatches: false
        }).use(Uppy.Dashboard, {
            showProgressDetails: true,
            //note: 'Images and video only, 2–3 files, up to 1 MB',
            height: 450,
            browserBackButtonClose: false
        }).use(Uppy.XHRUpload, {
            endpoint: options.endpoint || App.route('/assets/upload'),
            headers: {
                'X-CSRF-TOKEN': App.csrf
            },
            bundle: options.bundle,
        }).use(Uppy.Webcam, { target: Uppy.Dashboard, showVideoSourceDropdown: true })
        .use(Uppy.ScreenCapture, { target: Uppy.Dashboard })
        //.use(Uppy.Url, { target: Uppy.Dashboard, companionUrl: 'https://companion.uppy.io' })
        .use(Uppy.ImageEditor, { target: Uppy.Dashboard });

        _uppy.openModal = () => {
            _uppy.getPlugin('Dashboard').openModal();

            setTimeout(() => {
                setHighestZindex(document.querySelector('.uppy-Root'));
            }, 0);
        };

        _uppy.on('dashboard:modal-closed', () => {
            _uppy.destroy();
            _uppy = null;
        });

        return _uppy;
    });

}
