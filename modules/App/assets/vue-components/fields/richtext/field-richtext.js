
let ready = new Promise((resolve) => {

    App.assets.require([
        'app:assets/vendor/vue/components/vue-tiptap.js',
        'app:assets/css/vendor/tiptap.css',
    ], () => {
        resolve(window.VueTiptap);
    });
});

let instanceCount = 0;

export default {

    _meta: {
        label: 'Wysiwyg',
        info: 'Rich text field',
        icon: 'system:assets/icons/wysiwyg.svg',
        render(value, field, context) {

            if (Array.isArray(value)) {
                return value.length ? `${value.length}x...` : '';
            }

            if (typeof(value) !== 'string') {
                return 'n/a';
            }

            return value ? App.utils.truncate(App.utils.stripTags(value), context == 'table-cell' ? 20 : 50) : '';
        }
    },

    data() {
        return {
            id: ++instanceCount,
            editor: null
        }
    },

    props: {
        modelValue: {
            type: String,
            default: false
        },

        height: {
            type: String,
            default: '500px'
        },

        toolbar: {
            type: String,
            default: 'bold italic strikethrough underline | alignLeft alignCenter alignRight alignJustify | link image | listBullet listOrdered | hr'
        }
    },

    components: {
        MenuBar: Vue.defineAsyncComponent(() => App.utils.import('app:assets/vue-components/fields/richtext/menu-bar.js')),
        EditorContent: Vue.defineAsyncComponent(() => {
            return new Promise(resolve => {
                ready.then(() => resolve(window.VueTiptap.EditorContent));
            })
        })
    },

    watch: {
        modelValue() {
            if (this.editor && !this.editor.isFocused) {
                setTimeout(() => {
                    if (this.editor.isFocused) return;
                    this.editor.commands.setContent(this.modelValue || '', false)
                }, 300);
            }
        }
    },

    beforeUnmount() {
        if (this.editor) this.editor.destroy();
    },

    mounted() {

        let $this = this;

        ready.then(() => {

            this.editor = new VueTiptap.Editor({
                extensions: [
                    VueTiptap.extensions.StarterKit,
                    VueTiptap.extensions.TextAlign.configure({
                        types: ['heading', 'paragraph'],
                    }),
                    VueTiptap.extensions.Link.configure({
                        openOnClick: false,
                    }),
                    VueTiptap.extensions.Underline,
                    VueTiptap.extensions.Image.configure({
                        inline: true,
                        allowBase64: true,
                    }),
                ],

                onUpdate: ({ editor }) => {
                    $this.update()
                }
            });

            this.editor.commands.setContent(this.modelValue || '', false);
        });
    },

    methods: {
        update() {
            this.$emit('update:modelValue', this.editor.getHTML())
        }
    },

    template: /*html*/`
        <div field="wysiwyg" v-if="editor">
            <kiss-card class="kiss-padding-small" theme="contrast bordered">
                <menu-bar :editor="editor" :toolbar="toolbar" />
                <div class="kiss-padding-small" :style="{minHeight:'200px', maxHeight: height, overflow: 'scroll'}">
                    <editor-content :id="'tiptap-editor-'+id" class="tiptap-content-wrapper" :editor="editor"  />
                </div>
            </kiss-card>
        </div>
    `
}
