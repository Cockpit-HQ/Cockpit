
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
            uid: `tiptap-editor-${++instanceCount}`,
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
            default: '400px'
        },

        toolbar: {
            type: String,
            default: 'format | color | alignLeft alignCenter alignRight | link image | listBullet listOrdered | table hr'
        }
    },

    components: {
        MenuBar: Vue.defineAsyncComponent(() => App.utils.import('app:assets/vue-components/fields/richtext/menu-bar.js')),
        EditorContent: Vue.defineAsyncComponent(() => {
            return new Promise(resolve => {
                ready.then(() => resolve(window.VueTiptap.EditorContent));
            })
        }),
        BubbleMenu: Vue.defineAsyncComponent(() => {
            return new Promise(resolve => {
                ready.then(() => resolve(window.VueTiptap.BubbleMenu));
            })
        }),
        FloatingMenu: Vue.defineAsyncComponent(() => {
            return new Promise(resolve => {
                ready.then(() => resolve(window.VueTiptap.FloatingMenu));
            })
        })
    },

    watch: {
        modelValue() {
            if (this.editor && !this.editor.isFocused) {
                setTimeout(() => {
                    if (this.editor.isFocused) return;
                    this.editor.commands.setContent(this.modelValue || '', false)
                }, 150);
            }
        }
    },

    beforeUnmount() {
        if (this.editor) this.editor.destroy();
    },

    mounted() {

        let $this = this;

        ready.then(() => {

            let config = {
                extensions: [
                    VueTiptap.extensions.StarterKit,
                    VueTiptap.extensions.Subscript,
                    VueTiptap.extensions.Superscript,
                    VueTiptap.extensions.Underline,
                    VueTiptap.extensions.ListKeymap,
                    VueTiptap.extensions.TextStyle,
                    VueTiptap.extensions.Color,

                    VueTiptap.extensions.Table.configure({
                        resizable: true,
                        HTMLAttributes: {
                            class: 'kiss-table',
                        },
                    }),
                    VueTiptap.extensions.TableRow,
                    VueTiptap.extensions.TableHeader,
                    VueTiptap.extensions.TableCell,

                    VueTiptap.extensions.Placeholder.configure({
                        emptyNodeClass: 'tiptap-node-is-empty',
                        showOnlyCurrent: true,
                        placeholder: ({ node }) => {
                            return $this.modelValue ? '...' : '';
                        }
                    }),
                    VueTiptap.extensions.TextAlign.configure({
                        types: ['heading', 'paragraph'],
                    }),
                    VueTiptap.extensions.Link.configure({
                        openOnClick: false,
                        protocols: ['ftp', 'mailto'],

                    }),
                    VueTiptap.extensions.Image.configure({
                        inline: false,
                        allowBase64: true,
                    }),
                ],

                onUpdate: ({ editor }) => {
                    $this.update()
                }
            };

            App.trigger('field-richtext-config', [config]);

            this.editor = new VueTiptap.Editor(config);

            App.trigger('field-richtext-init', [this.editor]);

            this.editor.commands.setContent(this.modelValue || '', false);
        });
    },

    methods: {
        update() {
            this.$emit('update:modelValue', this.editor.getHTML())
        },

        shouldBubbleMenuTextShow() {

            let selection = this.editor.state.selection;

            if (selection.empty) return false;
            if (selection.node?.type.name === 'image') return false;

            return ['paragraph', 'heading', 'listItem', 'tableCell'].some(n => this.editor.isActive(n))
        }
    },

    template: /*html*/`
        <div field="wysiwyg" v-if="editor">
            <kiss-card class="kiss-padding-small kiss-flex kiss-flex-column" theme="contrast bordered" :style="{height}">
                <menu-bar :euid="uid" :editor="editor" :toolbar="toolbar" />
                <div class="kiss-padding-small kiss-flex-1" :style="{overflow: 'auto'}">
                    <editor-content :id="uid" class="tiptap-content-wrapper" :editor="editor"  />
                </div>
                <bubble-menu :editor="editor" :tippy-options="{ placement: 'bottom', duration: 100 }" :should-show="shouldBubbleMenuTextShow" v-if="editor">
                    <kiss-card class="kiss-button-group" theme="shadowed" hover="bordered-primary">
                        <button type="button" class="kiss-button kiss-button-small" :class="{'kiss-button-primary': editor.isActive('bold')}" @click="editor.chain().focus().toggleBold().run()" :title="t('Bold')"><icon>format_bold</icon></button>
                        <button type="button" class="kiss-button kiss-button-small" :class="{'kiss-button-primary': editor.isActive('italic')}" @click="editor.chain().focus().toggleItalic().run()" :title="t('Italic')"><icon>format_italic</icon></button>
                        <button type="button" class="kiss-button kiss-button-small" :class="{'kiss-button-primary': editor.isActive('underline')}" @click="editor.chain().focus().toggleUnderline().run()" :title="t('Underline')"><icon>format_underlined</icon></button>
                        <button type="button" class="kiss-button kiss-button-small" :class="{'kiss-button-primary': editor.isActive('subscript')}" @click="editor.chain().focus().toggleSubscript().run()" :title="t('Subscript')"><icon>subscript</icon></button>
                        <button type="button" class="kiss-button kiss-button-small" :class="{'kiss-button-primary': editor.isActive('superscript')}" @click="editor.chain().focus().toggleSuperscript().run()" :title="t('Superscript')"><icon>superscript</icon></button>
                    </kiss-card>
                </bubble-menu>
            </kiss-card>
        </div>
    `
}
