import {setHighestZindex} from '../../../App/assets/vendor/kiss/js/utils.js'

export const initUppyUploader = function(meta = {}, options = {}) {

    options = Object.assign({
        bundle: false
    }, options || {});

    let _uppy = null;

    const p = new Promise((resolve, reject) => {

        App.assets.require([
            'assets:assets/css/uppy.css',
        ]).then(() => {

            App.utils.import('assets:assets/vendor/uppy/uppy.js').then(mod => {

                // Uppy v5 switched to ESM. Support both named and default exports.
                const M = (mod && (mod.Uppy || mod.Dashboard || mod.XHRUpload))
                    ? mod
                    : (mod && mod.default && (mod.default.Uppy || mod.default.Dashboard || mod.default.XHRUpload))
                        ? mod.default
                        : null;

                if (!M) {
                    reject(new Error('Uppy module could not be loaded'));
                    return;
                }

                const UppyCtor = typeof M.Uppy === 'function' ? M.Uppy : (typeof M === 'function' ? M : null);
                const Dashboard = M.Dashboard;
                const XHRUpload = M.XHRUpload;
                const Webcam = M.Webcam;
                const ScreenCapture = M.ScreenCapture;
                const ImageEditor = M.ImageEditor;

                if (!UppyCtor || !Dashboard || !XHRUpload) {
                    reject(new Error('Uppy core or required plugins missing'));
                    return;
                }

                _uppy = new UppyCtor({
                    meta,
                    autoProceed: false,
                    restrictions: {
                        maxFileSize: App._vars.maxUploadSize || null,
                        maxNumberOfFiles: options.maxNumberOfFiles || (options.bundle ? (App._vars.maxFileUploads || 20) : null),
                        minNumberOfFiles: 1,
                        // allowedFileTypes: ['image/*', 'video/*']
                    },
                    // keep false to avoid multiple batches; ignored if not supported
                    allowMultipleUploadBatches: false
                })
                .use(Dashboard, {
                    showProgressDetails: true,
                    // note: 'Images and video only, 2–3 files, up to 1 MB',
                    height: 450,
                    browserBackButtonClose: false
                })
                .use(XHRUpload, {
                    endpoint: options.endpoint || App.route('/assets/upload'),
                    headers: {
                        'X-CSRF-TOKEN': App.csrf
                    },
                    bundle: options.bundle,
                });

                // Optional plugins if present in the bundle
                if (Webcam) {
                    _uppy.use(Webcam, { target: Dashboard, showVideoSourceDropdown: true });
                }
                if (ScreenCapture) {
                    _uppy.use(ScreenCapture, { target: Dashboard });
                }
                if (ImageEditor) {
                    _uppy.use(ImageEditor, { target: Dashboard });
                }

                // Prevent Vue from proxying the Uppy instance (private fields in v5).
                try {

                    if (typeof Vue !== 'undefined' && Vue && typeof Vue.markRaw === 'function') {
                        _uppy = Vue.markRaw(_uppy);
                    } else {
                        // best-effort hint for Vue reactivity system
                        _uppy.__v_skip = true;
                    }

                } catch (e) {}

                _uppy.openModal = () => {

                    const dash = _uppy.getPlugin('Dashboard');

                    dash.openModal();

                    setTimeout(() => {
                        setHighestZindex(document.querySelector('.uppy-Root'));
                    }, 0);
                };

                _uppy.on('dashboard:modal-closed', () => {
                    _uppy.destroy();
                    _uppy = null;
                });

                resolve(_uppy);

            }).catch(reject);
            
        }).catch(reject);
    });

    return p;
}
