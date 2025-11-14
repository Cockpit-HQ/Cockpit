class EditorActions {

    constructor(editor) {

        this.editor = editor;

        this.actions = {
            color: {
                title: 'Color',
                component: Vue.defineAsyncComponent(() => App.utils.import('app:assets/vue-components/fields/richtext/components/color.js'))
            },
            format: {
                title: 'Format',
                component: Vue.defineAsyncComponent(() => App.utils.import('app:assets/vue-components/fields/richtext/components/format.js'))
            },
            table: {
                icon: 'table',
                title: 'Table',
                action: (editor) => {
                    if (editor.isActive('table')) return;
                    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
                },
                isActive: (editor) => editor.isActive('table'),
            },
            undo: {
                icon: 'undo',
                title: 'Undo',
                action: (editor) => editor.chain().focus().undo().run(),
            },
            redo: {
                icon: 'redo',
                title: 'Redo',
                action: (editor) => editor.chain().focus().redo().run(),
            },
            bold: {
                icon: 'format_bold',
                title: 'Bold',
                action: (editor) => editor.chain().focus().toggleBold().run(),
                isActive: (editor) => editor.isActive('bold')
            },
            italic: {
                icon: 'format_italic',
                title: 'Italic',
                action: (editor) => editor.chain().focus().toggleItalic().run(),
                isActive: (editor) => editor.isActive('italic')
            },
            strikethrough: {
                icon: 'format_strikethrough',
                title: 'Strikethrough',
                action: (editor) => editor.chain().focus().toggleStrike().run(),
                isActive: (editor) => editor.isActive('strike')
            },
            underline: {
                icon: 'format_underlined',
                title: 'Underline',
                action: (editor) => editor.chain().focus().toggleUnderline().run(),
                isActive: (editor) => editor.isActive('underline')
            },
            subscript: {
                icon: 'subscript',
                title: 'Subscript',
                action: (editor) => editor.chain().focus().toggleSubscript().run(),
                isActive: (editor) => editor.isActive('subscript')
            },
            superscript: {
                icon: 'superscript',
                title: 'Superscript',
                action: (editor) => editor.chain().focus().toggleSuperscript().run(),
                isActive: (editor) => editor.isActive('superscript')
            },
            alignLeft: {
                icon: 'format_align_left',
                title: 'Align Left',
                action: (editor) => editor.chain().focus().setTextAlign('left').run(),
                isActive: (editor) => editor.isActive({ textAlign: 'left' })
            },
            alignCenter: {
                icon: 'format_align_center',
                title: 'Align Center',
                action: (editor) => editor.chain().focus().setTextAlign('center').run(),
                isActive: (editor) => editor.isActive({ textAlign: 'center' })
            },
            alignRight: {
                icon: 'format_align_right',
                title: 'Align Right',
                action: (editor) => editor.chain().focus().setTextAlign('right').run(),
                isActive: (editor) => editor.isActive({ textAlign: 'right' })
            },
            alignJustify: {
                icon: 'format_align_justify',
                title: 'Align Justify',
                action: (editor) => editor.chain().focus().setTextAlign('justify').run(),
                isActive: (editor) => editor.isActive({ textAlign: 'justify' })
            },
            listBullet: {
                icon: 'format_list_bulleted',
                title: 'List Bullet',
                action: (editor) => editor.chain().focus().toggleBulletList().run(),
                isActive: (editor) => editor.isActive('bulletList')
            },
            listOrdered: {
                icon: 'format_list_numbered',
                title: 'List Ordered',
                action: (editor) => editor.chain().focus().toggleOrderedList().run(),
                isActive: (editor) => editor.isActive('orderedList')
            },
            image: {
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

                    VueView.ui.modal('app:assets/vue-components/fields/richtext/dialogs/image.js', {meta}, {

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
                icon: 'link',
                title: 'Link',
                action: (editor) => {
                    const attr = editor.getAttributes('link');

                    let meta = {
                        href: attr.href,
                        title: attr.title,
                        target: attr.target,
                    }

                    VueView.ui.modal('app:assets/vue-components/fields/richtext/dialogs/link.js', {meta}, {

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
                icon: 'horizontal_rule',
                title: 'Horizontal Rule',
                action: (editor) => editor.chain().focus().setHorizontalRule().run(),
            },
        };
    }

    action(name) {
        return this.actions[name] || null;
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
