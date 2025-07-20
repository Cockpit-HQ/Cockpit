export default {

    data() {

        return {
            val: this.modelValue,
        }
    },

    props: {

        modelValue: {
            type: String,
            default: null
        },

        bucket: {
            type: String,
            default: null
        },

        type: {
            default: null
        }
    },

    computed: {

        file() {
            return this.val?.file;
        },

        fileUrl() {

            if (!this.val || !this.val.file) {
                return null;
            }

            return `${App._vars.bucketsUrl}/${this.val.bucket}/${this.val.file.path}`;
        },

        thumbUrl() {

            if (!this.val || !this.val.file) {
                return null;
            }

            return `uploads://buckets/${this.val.bucket}/${this.val.file.path}`;
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

        pickFile() {

            VueView.ui.modal('system:assets/dialogs/bucket-picker.js', {bucket: this.bucket, type: this.type, selectFile: (file) => {

                this.val = {
                    bucket: this.bucket,
                    file: {
                        name: file.name,
                        path: file.path,
                        type: file.type,
                    }
                };

                this.update();

            }});
        },

        update() {
            this.$emit('update:modelValue', this.val)
        }
    },

    template: /*html*/`
        <div class="bucket-file">

            <kiss-card class="kiss-margin-small kiss-position-relative kiss-bgcolor-contrast" theme="bordered" v-if="file">
                <div class="kiss-position-relative" :class="{'kiss-bgcolor-transparentimage': file.type === 'image'}">
                    <canvas class="kiss-display-block kiss-margin-auto" width="400" height="200"></canvas>
                    <div class="kiss-cover kiss-padding kiss-flex kiss-flex-middle kiss-flex-center">
                        <div v-if="file.type === 'image'">
                            <display-image class="kiss-display-block" :src="thumbUrl" w="400" h="200"></display-image>
                        </div>
                        <div class="kiss-align-center" v-if="file.type !== 'image'">
                            <icon class="kiss-size-xlarge">file_present</icon>
                            <div class="kiss-color-muted kiss-size-small kiss-margin-small">{{ file.name }}</div>
                        </div>
                    </div>
                </div>
                <a class="kiss-cover" @click="pickFile()"></a>
            </kiss-card>

            <kiss-card class="kiss-margin-small kiss-position-relative kiss-bgcolor-contrast" theme="bordered" v-if="!file">
                <div class="kiss-position-relative">
                    <canvas class="kiss-display-block kiss-margin-auto" width="400" height="200"></canvas>
                    <div class="kiss-cover kiss-padding kiss-flex kiss-flex-middle kiss-flex-center">
                        <div class="kiss-align-center kiss-color-muted kiss-disabled">
                            <icon class="kiss-size-xlarge">link_off</icon>
                            <div class="kiss-size-small kiss-margin-small">{{ t('No file linked') }}</div>
                        </div>
                    </div>
                </div>
                <a class="kiss-cover" @click="pickFile()"></a>
            </kiss-card>

            <div class="kiss-button-group">

                <button type="button" class="kiss-button kiss-button-small" @click="pickFile()">
                    <icon class="kiss-margin-small-right">link</icon>
                    {{ t('Link file') }}
                </button>
                <button type="button" class="kiss-button kiss-button-small" @click="val=null" v-if="file">{{ t('Reset') }}</button>
            </div>
        </div>
    `
}
