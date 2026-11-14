import { blockStyleNodeName } from './config.js';

class EditorActions {

    constructor(editor, settings = {}) {

        this.editor = editor;
        this.extensions = new Set(editor.extensionManager.extensions.map(ext => ext.name));
        this.blockStyles = settings.blockStyles || [];

        this.actions = {
            color: {
                extension: 'color',
                title: 'Color',
                component: Vue.defineAsyncComponent(() => App.utils.import('app:assets/vue-components/fields/richtext/components/color.js'))
            },
            format: {
                title: 'Format',
                component: Vue.defineAsyncComponent(() => App.utils.import('app:assets/vue-components/fields/richtext/components/format.js'))
            },
            table: {
                extension: 'table',
                icon: 'table',
                title: 'Table',
                action: (editor) => {
                    if (editor.isActive('table')) return;
                    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
                },
                isActive: (editor) => editor.isActive('table'),
            },
            undo: {
                extension: 'undoRedo',
                icon: 'undo',
                title: 'Undo',
                action: (editor) => editor.chain().focus().undo().run(),
            },
            redo: {
                extension: 'undoRedo',
                icon: 'redo',
                title: 'Redo',
                action: (editor) => editor.chain().focus().redo().run(),
            },
            bold: {
                extension: 'bold',
                icon: 'format_bold',
                title: 'Bold',
                action: (editor) => editor.chain().focus().toggleBold().run(),
                isActive: (editor) => editor.isActive('bold')
            },
            italic: {
                extension: 'italic',
                icon: 'format_italic',
                title: 'Italic',
                action: (editor) => editor.chain().focus().toggleItalic().run(),
                isActive: (editor) => editor.isActive('italic')
            },
            strikethrough: {
                extension: 'strike',
                icon: 'format_strikethrough',
                title: 'Strikethrough',
                action: (editor) => editor.chain().focus().toggleStrike().run(),
                isActive: (editor) => editor.isActive('strike')
            },
            underline: {
                extension: 'underline',
                icon: 'format_underlined',
                title: 'Underline',
                action: (editor) => editor.chain().focus().toggleUnderline().run(),
                isActive: (editor) => editor.isActive('underline')
            },
            subscript: {
                extension: 'subscript',
                icon: 'subscript',
                title: 'Subscript',
                action: (editor) => editor.chain().focus().toggleSubscript().run(),
                isActive: (editor) => editor.isActive('subscript')
            },
            superscript: {
                extension: 'superscript',
                icon: 'superscript',
                title: 'Superscript',
                action: (editor) => editor.chain().focus().toggleSuperscript().run(),
                isActive: (editor) => editor.isActive('superscript')
            },
            alignLeft: {
                extension: 'textAlign',
                icon: 'format_align_left',
                title: 'Align Left',
                action: (editor) => editor.chain().focus().setTextAlign('left').run(),
                isActive: (editor) => editor.isActive({ textAlign: 'left' })
            },
            alignCenter: {
                extension: 'textAlign',
                icon: 'format_align_center',
                title: 'Align Center',
                action: (editor) => editor.chain().focus().setTextAlign('center').run(),
                isActive: (editor) => editor.isActive({ textAlign: 'center' })
            },
            alignRight: {
                extension: 'textAlign',
                icon: 'format_align_right',
                title: 'Align Right',
                action: (editor) => editor.chain().focus().setTextAlign('right').run(),
                isActive: (editor) => editor.isActive({ textAlign: 'right' })
            },
            alignJustify: {
                extension: 'textAlign',
                icon: 'format_align_justify',
                title: 'Align Justify',
                action: (editor) => editor.chain().focus().setTextAlign('justify').run(),
                isActive: (editor) => editor.isActive({ textAlign: 'justify' })
            },
            listBullet: {
                extension: 'bulletList',
                icon: 'format_list_bulleted',
                title: 'List Bullet',
                action: (editor) => editor.chain().focus().toggleBulletList().run(),
                isActive: (editor) => editor.isActive('bulletList')
            },
            listOrdered: {
                extension: 'orderedList',
                icon: 'format_list_numbered',
                title: 'List Ordered',
                action: (editor) => editor.chain().focus().toggleOrderedList().run(),
                isActive: (editor) => editor.isActive('orderedList')
            },
            image: {
                extension: 'image',
                icon: 'image',
                title: 'Image',
                action: (editor) => {

                    const attr = editor.getAttributes('image');

                    let meta = {
                        src: attr.src || '',
                        alt: attr.alt || '',
                        width: attr.width || '',
                        height: attr.height || ''
                    };

                    VueView.ui.modal('app:assets/vue-components/fields/richtext/dialogs/image.js', { meta }, {

                        save: meta => {

                            if (meta && meta.src) {
                                editor.chain().focus().setImage(meta).run();
                            }
                        }
                    });
                },
                isActive: (editor) => editor.isActive('image')
            },
            link: {
                extension: 'link',
                icon: 'link',
                title: 'Link',
                action: (editor) => {
                    const attr = editor.getAttributes('link');

                    let meta = {
                        href: attr.href,
                        title: attr.title,
                        target: attr.target,
                    }

                    VueView.ui.modal('app:assets/vue-components/fields/richtext/dialogs/link.js', { meta }, {

                        save: meta => {

                            if (meta.href) {
                                editor.chain().focus().extendMarkRange('link').setLink(meta).run()
                            }

                            if (!meta.href) {
                                editor.chain().focus().extendMarkRange('link').unsetLink().run()
                            }
                        }
                    });

                },
                isActive: (editor) => editor.isActive('link')
            },
            hr: {
                extension: 'horizontalRule',
                icon: 'horizontal_rule',
                title: 'Horizontal Rule',
                action: (editor) => editor.chain().focus().setHorizontalRule().run(),
            },
            checklist: {
                extension: 'taskList',
                icon: 'check_box',
                title: 'Task List',
                action: (editor) => editor.chain().focus().toggleTaskList().run(),
                isActive: (editor) => editor.isActive('taskList')
            },
            highlight: {
                extension: 'highlight',
                icon: 'ink_highlighter',
                title: 'Highlight',
                action: (editor) => editor.chain().focus().toggleHighlight().run(),
                isActive: (editor) => editor.isActive('highlight')
            },
            code: {
                extension: 'code',
                icon: 'code',
                title: 'Code',
                action: (editor) => editor.chain().focus().toggleCode().run(),
                isActive: (editor) => editor.isActive('code')
            },
            codeBlock: {
                extension: 'codeBlock',
                icon: 'data_object',
                title: 'Code Block',
                action: (editor) => editor.chain().focus().toggleCodeBlock().run(),
                isActive: (editor) => editor.isActive('codeBlock')
            },
            blockquote: {
                extension: 'blockquote',
                icon: 'format_quote',
                title: 'Blockquote',
                action: (editor) => editor.chain().focus().toggleBlockquote().run(),
                isActive: (editor) => editor.isActive('blockquote')
            },
            clear: {
                icon: 'format_clear',
                title: 'Clear Formatting',
                action: (editor) => editor.chain().focus().unsetAllMarks().clearNodes().run(),
            },
        };

        [1, 2, 3, 4, 5, 6].forEach(level => {
            this.actions[`h${level}`] = {
                extension: 'heading',
                label: `H${level}`,
                title: `Heading ${level}`,
                available: () => this.headingLevels().includes(level),
                action: (editor) => editor.chain().focus().toggleHeading({ level }).run(),
                isActive: (editor) => editor.isActive('heading', { level })
            };
        });

        this.blockStyles.forEach(style => {

            if (this.actions[style.name]) {
                console.warn(`Richtext block style "${style.name}" conflicts with an existing editor action`);
                return;
            }

            const node = blockStyleNodeName(style.name);

            this.actions[style.name] = {
                extension: node,
                icon: style.icon,
                title: style.label,
                action: (editor) => editor.isActive(node) ? editor.chain().focus().setParagraph().run() : editor.chain().focus().setNode(node).run(),
                isActive: (editor) => editor.isActive(node)
            };
        });
    }

    action(name) {
        return this.actions[name] || null;
    }

    headingLevels() {
        return this.editor.extensionManager.extensions.find(ext => ext.name === 'heading')?.options.levels || [];
    }

    isAvailable(name) {

        const action = this.actions[name];

        if (!action) return false;
        if (action.extension && !this.extensions.has(action.extension)) return false;

        return action.available ? action.available(this.editor) : true;
    }

    // 'bold italic | link' => [['bold', 'italic'], ['link']] without unavailable actions
    groups(menu) {

        if (!menu) return [];

        return String(menu).split('|')
            .map(group => group.split(' ').map(name => name.trim()).filter(name => name && this.isAvailable(name)))
            .filter(group => group.length);
    }

    formats() {

        const formats = [{
            icon: 'format_paragraph',
            title: 'Paragraph',
            isActive: (editor) => editor.isActive('paragraph'),
            apply: (editor) => editor.chain().focus().setParagraph().run()
        }];

        if (this.extensions.has('codeBlock')) {
            formats.push({
                icon: 'data_object',
                title: 'Code',
                isActive: (editor) => editor.isActive('codeBlock'),
                apply: (editor) => editor.chain().focus().toggleCodeBlock().run()
            });
        }

        this.headingLevels().forEach(level => {
            formats.push({
                icon: `format_h${level}`,
                title: `Heading ${level}`,
                isActive: (editor) => editor.isActive('heading', { level }),
                apply: (editor) => editor.chain().focus().toggleHeading({ level }).run()
            });
        });

        this.blockStyles.forEach(style => {

            const node = blockStyleNodeName(style.name);

            if (!this.extensions.has(node)) return;

            formats.push({
                icon: style.icon,
                title: style.label,
                isActive: (editor) => editor.isActive(node),
                apply: (editor) => editor.chain().focus().setNode(node).run()
            });
        });

        return formats;
    }

    isActive(name) {
        return this.actions[name]?.isActive ? this.actions[name].isActive(this.editor) : false;
    }

    call(name) {

        if (!this.actions[name]?.action) {
            return;
        }

        this.actions[name].action(this.editor);
    }
}

export default EditorActions;
