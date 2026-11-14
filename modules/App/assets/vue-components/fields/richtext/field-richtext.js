import { FEATURES, LOOKS, blockStyleNodeName, resolveSettings } from './config.js';
import { createBlockStyle } from './extensions/block-style.js';
import { createLink } from './extensions/link.js';
import EditorActions from './editor-actions.js';
import ActionButtons from './components/action-buttons.js';

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
        settings: [
            {name: 'height', type: 'text', info: 'Editor height, e.g. 400px'},
            {name: 'placeholder', type: 'text'},
            {name: 'toolbar', type: 'text', info: 'Toolbar actions, groups separated by "|". Empty = default, "none" = hidden'},
            {name: 'bubbleMenu', type: 'text', info: 'Actions shown on text selection. Empty = default, "none" = hidden'},
            {name: 'floatingMenu', type: 'text', info: 'Actions shown on empty lines. Empty = default, "none" = hidden'},
            {name: 'disable', type: 'select', opts: {multiple: true, options: FEATURES}, info: 'Remove features completely (buttons, shortcuts and pasted content)'},
            {name: 'headings', type: 'select', opts: {multiple: true, options: ['1', '2', '3', '4', '5', '6']}, info: 'Allowed heading levels. None selected = all'},
            {name: 'blockStyles', type: 'set', multiple: true, info: 'Custom block styles, saved as tag + class', opts: {fields: [
                {name: 'name', type: 'text', info: 'Unique key, also usable as toolbar action, e.g. titleLarge'},
                {name: 'label', type: 'text'},
                {name: 'tag', type: 'text', info: 'HTML tag to save. Default: p'},
                {name: 'class', type: 'text', info: 'CSS class to save'},
                {name: 'look', type: 'select', opts: {options: LOOKS}, info: 'Display like this heading inside the editor'},
                {name: 'icon', type: 'text', info: 'Material icon name. Default: title'},
            ]}},
        ],
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
            editor: null,
            actions: null,
            settings: null
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

        placeholder: {
            type: String,
            default: null
        },

        // null = default (see config.js), false or 'none' = hidden
        toolbar: {
            type: [String, Boolean],
            default: null
        },

        bubbleMenu: {
            type: [String, Boolean],
            default: null
        },

        floatingMenu: {
            type: [String, Boolean],
            default: null
        },

        disable: {
            type: [Array, String],
            default: null
        },

        headings: {
            type: [Array, String, Boolean],
            default: null
        },

        blockStyles: {
            type: Array,
            default: null
        }
    },

    components: {
        ActionButtons,
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
                    this.editor.commands.setContent(this.modelValue || '', { emitUpdate: false })
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
                let settings = resolveSettings(this.$props);

                let config = {
                    extensions: this.createExtensions(settings, ImageResizer),

                    onUpdate: ({ editor }) => {
                        $this.update()
                    }
                };

                App.trigger('field-richtext-config', [config, settings]);

                let editor = new VueTiptap.Editor(config);

                this.settings = settings;
                this.actions = Vue.markRaw(new EditorActions(editor, settings));
                this.editor = editor;

                App.trigger('field-richtext-init', [this.editor]);

                this.editor.commands.setContent(this.modelValue || '', { emitUpdate: false });

            }); // end import
        });
    },

    computed: {
        bubbleMenuGroups() {
            return this.actions ? this.actions.groups(this.settings.bubbleMenu) : [];
        },

        floatingMenuGroups() {
            return this.actions ? this.actions.groups(this.settings.floatingMenu) : [];
        }
    },

    methods: {
        update() {
            this.$emit('update:modelValue', this.editor.getHTML())
        },

        createExtensions(settings, ImageResizer) {

            const on = feature => settings.isEnabled(feature);
            const hasLists = on('bulletList') || on('orderedList');
            const blockStyles = settings.blockStyles.map(style => blockStyleNodeName(style.name));

            const starterKit = {
                link: false,
                underline: false,
                listKeymap: false,
                heading: settings.headings.length ? { levels: settings.headings } : false,
            };

            // StarterKit extension => feature name
            Object.entries({
                bold: 'bold',
                italic: 'italic',
                strike: 'strike',
                code: 'code',
                codeBlock: 'codeBlock',
                blockquote: 'blockquote',
                horizontalRule: 'hr',
                bulletList: 'bulletList',
                orderedList: 'orderedList',
            }).forEach(([extension, feature]) => {
                if (!on(feature)) starterKit[extension] = false;
            });

            if (!hasLists) starterKit.listItem = false;

            const extensions = [VueTiptap.StarterKit.configure(starterKit)];

            if (on('subscript')) extensions.push(VueTiptap.Subscript);
            if (on('superscript')) extensions.push(VueTiptap.Superscript);
            if (on('underline')) extensions.push(VueTiptap.Underline);
            if (hasLists) extensions.push(VueTiptap.ListKeymap);
            if (on('color')) extensions.push(VueTiptap.TextStyle, VueTiptap.Color);

            if (on('table')) {
                extensions.push(
                    VueTiptap.Table.configure({
                        resizable: true,
                        HTMLAttributes: {
                            class: 'kiss-table',
                        },
                    }),
                    VueTiptap.TableRow,
                    VueTiptap.TableHeader,
                    VueTiptap.TableCell,
                );
            }

            if (on('textAlign')) {
                extensions.push(VueTiptap.TextAlign.configure({
                    types: ['heading', 'paragraph', ...blockStyles],
                }));
            }

            if (on('link')) {
                extensions.push(createLink().configure({
                    openOnClick: false,
                    protocols: ['ftp', 'mailto', 'http', 'https', 'tel', 'sms'],
                    isAllowedUri: (url, ctx) => {

                        if (url.includes('://')) {
                            try {
                                const uri = new URL(url);
                                return ctx.protocols.includes(uri.protocol.replace(':', ''));
                            } catch (e) {
                                return false;
                            }
                        }

                        return true;
                    }
                }));
            }

            if (on('image')) {
                extensions.push(VueTiptap.Image.extend({
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
                }));
            }

            extensions.push(VueTiptap.Placeholder.configure({
                emptyNodeClass: 'tiptap-node-is-empty',
                showOnlyCurrent: true,
                placeholder: this.placeholder || App.i18n.get('Start writing...')
            }));

            settings.blockStyles.forEach(style => extensions.push(createBlockStyle(style)));

            //if (VueTiptap.TaskList) extensions.push(VueTiptap.TaskList);
            //if (VueTiptap.TaskItem) extensions.push(VueTiptap.TaskItem.configure({ nested: true }));
            if (on('highlight') && VueTiptap.Highlight) extensions.push(VueTiptap.Highlight);
            if (VueTiptap.Focus) extensions.push(VueTiptap.Focus.configure({ className: 'has-focus', mode: 'all' }));

            return extensions;
        },

        shouldBubbleMenuTextShow() {

            let selection = this.editor.state.selection;

            if (selection.empty) return false;
            if (selection.node?.type.name === 'image') return false;

            const blockStyles = this.settings.blockStyles.map(style => blockStyleNodeName(style.name));

            return ['paragraph', 'heading', 'listItem', 'tableCell', 'taskItem', ...blockStyles].some(n => this.editor.isActive(n))
        },

        focus(e) {
            if (e.target.closest('.ProseMirror')) return;
            if (e.target.closest('button')) return;
            if (e.target.closest('.kiss-button-group')) return;
            this.editor?.commands.focus('end');
        }
    },

    template: /*html*/`
        <div field="wysiwyg" v-if="editor">
            <kiss-card class="kiss-padding-small kiss-flex kiss-flex-column" theme="contrast bordered" :style="{height}">
                <menu-bar :euid="uid" :editor="editor" :actions="actions" :toolbar="settings.toolbar" />
                <div class="editor-container kiss-padding-small kiss-flex-1" :style="{overflow: 'auto'}" @click="focus">
                    <editor-content :id="uid" class="tiptap-content-wrapper" :editor="editor"  />
                </div>

                <floating-menu :editor="editor" :options="{ duration: 100, offset: {mainAxis: 0, crossAxis: 30} }" v-if="floatingMenuGroups.length">
                    <div class="kiss-flex" gap="xsmall">
                        <kiss-card class="kiss-button-group" theme="shadowed" hover="bordered-primary" v-for="group in floatingMenuGroups">
                            <action-buttons :editor="editor" :actions="actions" :names="group" />
                        </kiss-card>
                    </div>
                </floating-menu>

                <bubble-menu :editor="editor" :options="{ placement: 'bottom', duration: 100 }" :should-show="shouldBubbleMenuTextShow" v-if="bubbleMenuGroups.length">
                    <div class="kiss-flex" gap="xsmall">
                        <kiss-card class="kiss-button-group" theme="shadowed" hover="bordered-primary" v-for="group in bubbleMenuGroups">
                            <action-buttons :editor="editor" :actions="actions" :names="group" />
                        </kiss-card>
                    </div>
                </bubble-menu>
            </kiss-card>
        </div>
    `
}
