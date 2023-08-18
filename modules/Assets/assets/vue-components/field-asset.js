export default {

    _meta: {
        label: 'Asset',
        info: 'Asset link',
        icon: 'assets:icon.svg',
        render(value, field, context) {

            if (value.type == 'image') {

                let height = context == 'table-cell' ? 20 : 50;

                return '<img class="kiss-responsive-height" src="'+App.route(`/assets/thumbnail/${value._id}?m=bestFit&mime=auto&h=${height}&t=${value._modified}`)+'" style="height:'+height+'px">'
            }

            return value.type;
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
        }
    },

    watch: {

        val() {
            this.update();
        },
        modelValue() {
            this.val = this.modelValue;
            this.update();
        }
    },

    methods: {

        pickAsset() {

            VueView.ui.modal('assets:assets/dialogs/asset-picker.js', {filter: this.filter}, {
                selectAsset: (asset) => {

                    this.val = asset;
                    this.update();
                }
            }, {size: 'xlarge'})
        },

        edit() {

            VueView.ui.offcanvas('assets:assets/dialogs/asset.js', {asset: this.val}, {

                update: updatedAsset => {
                    this.val = updatedAsset;
                    this.update();
                }

            }, {flip: true, size: 'large'})
        },

        update() {
            this.$emit('update:modelValue', this.val)
        }
    },

    template: /*html*/`
        <div field="asset">

            <div class="kiss-bgcolor-contrast kiss-padding-large kiss-margin-small kiss-align-center kiss-color-muted kiss-position-relative" v-if="!val">
                <kiss-svg :src="$base('assets:icon.svg')" width="30" height="30"><canvas width="30" height="30"></canvas></kiss-svg>
                <div class="kiss-margin-small kiss-size-small">{{ t('No asset selected') }}</div>
                <a class="kiss-cover" @click="pickAsset()"></a>
            </div>

            <div class="kiss-margin-small" v-if="val">

                <div class="kiss-bgcolor-contrast kiss-position-relative kiss-padding" :class="{'kiss-bgcolor-transparentimage': val.type == 'image'}">
                    <canvas width="400" height="150"></canvas>
                    <div class="kiss-cover kiss-align-center kiss-flex kiss-flex-middle kiss-flex-center"><asset-preview :asset="val"></asset-preview></div>
                    <a class="kiss-cover" :href="$base('#uploads:'+val.path)" target="_blank" rel="noopener"></a>
                </div>
                <div class="kiss-margin-small kiss-flex kiss-flex-middle">
                    <div class="kiss-text-truncate kiss-size-xsmall kiss-flex-1">{{ val.title }}</div>
                </div>

            </div>

            <div class="kiss-button-group">
                <a class="kiss-button kiss-button-small" @click="pickAsset()">
                    <icon class="kiss-margin-small-right">link</icon>
                    {{ t('Link asset') }}
                </a>
                <a class="kiss-button kiss-button-small" v-if="val" @click="edit()">
                    <icon class="kiss-margin-small-right">create</icon>
                    {{ t('Edit asset') }}
                </a>
            </div>
        </div>
    `
}
