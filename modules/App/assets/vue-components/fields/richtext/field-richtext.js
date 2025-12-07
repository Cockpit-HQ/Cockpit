
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

            if (typeof (value) !== 'string') {
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

            App.utils.import('app:assets/vue-components/fields/richtext/components/image-resizer.js').then(resizer => {

                let ImageResizer = resizer.default || resizer;

                let config = {
                    extensions: [
                        VueTiptap.StarterKit.configure({
                            link: false,
                            underline: false,
                            listKeymap: false,
                        }),
                        VueTiptap.Subscript,
                        VueTiptap.Superscript,
                        VueTiptap.Underline,
                        VueTiptap.ListKeymap,
                        VueTiptap.TextStyle,
                        VueTiptap.Color,

                        VueTiptap.Table.configure({
                            resizable: true,
                            HTMLAttributes: {
                                class: 'kiss-table',
                            },
                        }),
                        VueTiptap.TableRow,
                        VueTiptap.TableHeader,
                        VueTiptap.TableCell,

                        VueTiptap.TextAlign.configure({
                            types: ['heading', 'paragraph'],
                        }),
                        VueTiptap.Link.configure({
                            openOnClick: false,
                            protocols: ['ftp', 'mailto'],
                        }),
                        VueTiptap.Image.extend({
                            addAttributes() {
                                return {
                                    ...this.parent?.(),
                                    width: {
                                        default: null,
                                    },
                                }
                            },
                            addNodeView() {
                                return VueTiptap.VueNodeViewRenderer(ImageResizer)
                            },
                        }).configure({
                            inline: false,
                            allowBase64: true,
                        }),
                        VueTiptap.Placeholder.configure({
                            emptyNodeClass: 'tiptap-node-is-empty',
                            showOnlyCurrent: true,
                            placeholder: $this.placeholder || 'Start writing...'
                        }),
                    ],

                    onUpdate: ({ editor }) => {
                        $this.update()
                    }
                };

                //if (VueTiptap.TaskList) config.extensions.push(VueTiptap.TaskList);
                //if (VueTiptap.TaskItem) config.extensions.push(VueTiptap.TaskItem.configure({ nested: true }));
                if (VueTiptap.Highlight) config.extensions.push(VueTiptap.Highlight);
                if (VueTiptap.Focus) config.extensions.push(VueTiptap.Focus.configure({ className: 'has-focus', mode: 'all' }));

                App.trigger('field-richtext-config', [config]);

                this.editor = new VueTiptap.Editor(config);

                App.trigger('field-richtext-init', [this.editor]);

                this.editor.commands.setContent(this.modelValue || '', false);

            }); // end import
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

            return ['paragraph', 'heading', 'listItem', 'tableCell', 'taskItem'].some(n => this.editor.isActive(n))
        },

        focus(e) {
            if (e.target.closest('.ProseMirror')) return;
            if (e.target.closest('button')) return;
            if (e.target.closest('.kiss-button-group')) return;
            this.editor?.commands.focus('end');
        },

        openImageDialog() {
            VueView.ui.modal('app:assets/vue-components/fields/richtext/dialogs/image.js', {}, {
                save: meta => {
                    if (meta && meta.src) {
                        this.editor.chain().focus().setImage(meta).run();
                    }
                }
            });
        },

        insertTable() {
            this.editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
        }
    },

    template: /*html*/`
        <div field="wysiwyg" v-if="editor">
            <kiss-card class="kiss-padding-small kiss-flex kiss-flex-column" theme="contrast bordered" :style="{height}">
                <menu-bar :euid="uid" :editor="editor" :toolbar="toolbar" />
                <div class="editor-container kiss-padding-small kiss-flex-1" :style="{overflow: 'auto'}" @click="focus">
                    <editor-content :id="uid" class="tiptap-content-wrapper" :editor="editor"  />
                </div>
                
                <floating-menu :editor="editor" :options="{ duration: 100, offset: {mainAxis: 20} }" v-if="editor">
                    <kiss-card class="kiss-button-group" theme="shadowed" hover="bordered-primary">
                        <button type="button" class="kiss-button kiss-button-small" :class="{'kiss-button-primary': editor.isActive('heading', { level: 1 })}" @click="editor.chain().focus().toggleHeading({ level: 1 }).run()">H1</button>
                        <button type="button" class="kiss-button kiss-button-small" :class="{'kiss-button-primary': editor.isActive('heading', { level: 2 })}" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()">H2</button>
                        <button type="button" class="kiss-button kiss-button-small" :class="{'kiss-button-primary': editor.isActive('heading', { level: 3 })}" @click="editor.chain().focus().toggleHeading({ level: 3 }).run()">H3</button>
                        <button type="button" class="kiss-button kiss-button-small" :class="{'kiss-button-primary': editor.isActive('bulletList')}" @click="editor.chain().focus().toggleBulletList().run()"><icon>format_list_bulleted</icon></button>
                        <button type="button" class="kiss-button kiss-button-small" :class="{'kiss-button-primary': editor.isActive('orderedList')}" @click="editor.chain().focus().toggleOrderedList().run()"><icon>format_list_numbered</icon></button>
                        <button type="button" class="kiss-button kiss-button-small" :class="{'kiss-button-primary': editor.isActive('image')}" @click="openImageDialog"><icon>image</icon></button>
                        <button type="button" class="kiss-button kiss-button-small" :class="{'kiss-button-primary': editor.isActive('table')}" @click="insertTable"><icon>table</icon></button>
                    </kiss-card>
                </floating-menu>

                <bubble-menu :editor="editor" :options="{ placement: 'bottom', duration: 100 }" :should-show="shouldBubbleMenuTextShow" v-if="editor">
                    <kiss-card class="kiss-button-group" theme="shadowed" hover="bordered-primary">
                        <button type="button" class="kiss-button kiss-button-small" :class="{'kiss-button-primary': editor.isActive('bold')}" @click="editor.chain().focus().toggleBold().run()" :title="t('Bold')"><icon>format_bold</icon></button>
                        <button type="button" class="kiss-button kiss-button-small" :class="{'kiss-button-primary': editor.isActive('italic')}" @click="editor.chain().focus().toggleItalic().run()" :title="t('Italic')"><icon>format_italic</icon></button>
                        <button type="button" class="kiss-button kiss-button-small" :class="{'kiss-button-primary': editor.isActive('underline')}" @click="editor.chain().focus().toggleUnderline().run()" :title="t('Underline')"><icon>format_underlined</icon></button>
                        <button type="button" class="kiss-button kiss-button-small" :class="{'kiss-button-primary': editor.isActive('highlight')}" @click="editor.chain().focus().toggleHighlight().run()" :title="t('Highlight')"><icon>ink_highlighter</icon></button>
                        <button type="button" class="kiss-button kiss-button-small" :class="{'kiss-button-primary': editor.isActive('subscript')}" @click="editor.chain().focus().toggleSubscript().run()" :title="t('Subscript')"><icon>subscript</icon></button>
                        <button type="button" class="kiss-button kiss-button-small" :class="{'kiss-button-primary': editor.isActive('superscript')}" @click="editor.chain().focus().toggleSuperscript().run()" :title="t('Superscript')"><icon>superscript</icon></button>
                    </kiss-card>
                </bubble-menu>
            </kiss-card>
        </div>
    `
}
