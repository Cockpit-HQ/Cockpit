export default {

    _meta: {
        label: 'Asset',
        info: 'Asset link',
        icon: 'assets:icon.svg',
        multipleListMode: 'grid',
        addFieldItem(field, value) {

            VueView.ui.modal('assets:assets/dialogs/asset-picker.js', { filter: field?.opts?.filter, multiple: true }, {
                onSelect: (assets) => {

                    if (!Array.isArray(value)) {
                        value = [];
                    }

                    assets.forEach((asset) => {
                        value.push(asset)
                    });
                }
            }, { size: 'xlarge' })

        },
        render(value, field, context) {

            if (!value) {
                return '';
            }

            if (Array.isArray(value)) {
                return value.length;
            }

            if (context === 'table-cell') {

                if (value.type === 'image') {

                    const src = App.route(`/assets/thumbnail/${value._id}?m=bestFit&mime=auto&h=20&t=${value._modified}`);

                    return `<img loading="lazy" class="kiss-responsive-height" src="${src}" style="height:20px">`;
                }

                return `<kiss-svg width="20" height="20" src="${App.base(value.type === 'video' ? 'assets:assets/icons/video.svg' : 'assets:assets/icons/file.svg')}"><canvas width="20" height="20"></canvas></kiss-svg>`;
            }

            const mediaSize= 70;

            let media = `<kiss-svg width="${mediaSize}" height="${mediaSize}" src="${App.base(value.type === 'video' ? 'assets:assets/icons/video.svg' : 'assets:assets/icons/file.svg')}"><canvas width="${mediaSize}" height="${mediaSize}"></canvas></kiss-svg>`;

            if (value.type === 'image') {

                const src = App.route(`/assets/thumbnail/${value._id}?m=bestFit&mime=auto&h=${(mediaSize * 2)}&t=${value._modified}`);

                media = `<img loading="lazy" class="kiss-responsive-height kiss-margin-auto" src="${src}" style="height:${mediaSize}px;object-fit:contain;object-position:center;">`;
            }

            return /*html*/ `
                <kiss-row class="kiss-flex-middle" gap="small">
                    <div class="kiss-position-relative">
                        <canvas width="${mediaSize}" height="${mediaSize}"></canvas>
                        <div class="kiss-cover ${ value.type === 'image' ? 'kiss-bgcolor-transparentimage' : '' }" style="--kiss-bgcolor-transparentimage-size:10px">${media}</div>
                    </div>
                    <div class="kiss-flex-1 kiss-size-xsmall">
                        <div class="kiss-text-truncate">${value.title}</div>
                        <div class="kiss-color-muted">${App.utils.formatSize(value.size) }</div>
                    </div>
                </kiss-row>
            `;
        }
    },

    data() {
        return {
            val: this.modelValue,
        }
    },

    props: {
        modelValue: {
            type: Object,
            default: null
        },

        filter: {
            default: null
        },

        meta: {
            type: Array,
            default: null
        }
    },

    mounted() {

        if (this.val && this.val._id) {

            const options = {
                filter: [{_id: this.val._id}],
                limit: 1
            };

            this.$request('/assets/assets', { options }).then(rsp => {

                const asset = rsp.assets[0] ?? null;

                if (asset && this.val._data) {
                    asset._data = this.val._data;
                }

                this.val = asset;
            });
        }
    },

    watch: {

        val() {
            this.update();
        },
        modelValue() {
            this.val = this.modelValue;
        }
    },

    methods: {

        pickAsset() {

            VueView.ui.modal('assets:assets/dialogs/asset-picker.js', {filter: this.filter}, {
                onSelect: (asset) => {
                    this.val = asset;
                }
            }, {size: 'xlarge'})
        },

        edit() {

            VueView.ui.offcanvas('assets:assets/dialogs/asset.js', {asset: this.val}, {

                update: updatedAsset => {
                    this.val = updatedAsset;
                }

            }, {flip: true, size: 'large'})
        },

        editMeta() {

            if (!this.val._data) {
                this.val._data = {};
            }

            VueView.ui.offcanvas('system:assets/dialogs/form.js', {
                caption: this.t('Additional asset meta information'),
                data: this.val._data,
                fields: this.meta
            }, {

                save: data => {
                    this.val._data = data;
                }

            }, { flip: true, size: 'large' })
        },

        update() {
            this.$emit('update:modelValue', this.val)
        }
    },

    template: /*html*/`
        <div field="asset">

            <kiss-card class="kiss-flex kiss-flex-column kiss-flex-center kiss-padding-larger kiss-margin-small kiss-align-center kiss-color-muted kiss-position-relative" theme="contrast" style="height:150px" v-if="!val">
                <kiss-svg :src="$baseUrl('assets:icon.svg')" width="30" height="30"><canvas width="30" height="30"></canvas></kiss-svg>
                <div class="kiss-margin-small kiss-size-small">{{ t('No asset selected') }}</div>
                <a class="kiss-cover" @click="pickAsset()"></a>
            </kiss-card>

            <div class="kiss-margin-small" v-if="val">

                <div class="kiss-bgcolor-contrast kiss-position-relative kiss-padding" :class="{'kiss-bgcolor-transparentimage': val.type == 'image'}">
                    <canvas width="400" height="150"></canvas>
                    <div class="kiss-cover kiss-align-center kiss-flex kiss-flex-middle kiss-flex-center"><asset-preview :asset="val"></asset-preview></div>
                    <a class="kiss-cover" :href="$baseUrl('#uploads:'+val.path)" target="_blank" rel="noopener"></a>
                    <div class="kiss-position-top-right kiss-padding-small">
                        <div class="kiss-button-group">
                            <button type="button" class="kiss-button kiss-button-small" :title="t('Edit asset')" v-if="val" @click="edit()">
                                <icon>create</icon>
                            </button>
                            <button type="button" class="kiss-button kiss-button-small" :title="t('Additional meta information')" v-if="val && meta" @click="editMeta()">
                                <icon>tune</icon>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="kiss-margin-small kiss-flex kiss-flex-middle">
                    <div class="kiss-text-truncate kiss-size-xsmall kiss-flex-1">{{ val.title }}</div>
                </div>

            </div>

            <button type="button" class="kiss-button kiss-button-small" @click="pickAsset()">
                <icon class="kiss-margin-small-right">link</icon>
                {{ val ? t('Replace asset') : t('Link asset') }}
            </button>
        </div>
    `
}
