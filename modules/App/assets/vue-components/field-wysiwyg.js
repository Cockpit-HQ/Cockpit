let ready = new Promise(function(resolve) {

    App.assets.require([
        '/modules/App/assets/vendor/tinymce/tinymce.min.js'
    ], function() {
        resolve(window.tinymce);
    });
});


export default {

    _meta: {
        label: 'Wysiwyg',
        info: 'A rich text field with formatting options'
    },

    data() {
        return {

        }
    },

    props: {
        modelValue: {
            type: String,
            default: false
        },

        tinymce: {
            type: Object,
            default: {}
        }
    },

    watch: {
        modelValue() {
            if (this.editor && !this.editor.isFocused) {
                this.editor.setContent(this.modelValue || '');
            }
        }
    },

    template: /*html*/`
        <div field="wysiwyg">
            <div class="wysiwyg-container"></div>
        </div>
    `,

    beforeUnmount() {

        if (this.editor) {
            tinymce.remove(this.editor)
        }
    },

    mounted() {

        ready.then(() => {

            tinymce.init(Object.assign({
                target: this.$el.querySelector('.wysiwyg-container'),
                height: 400,
                content_style: `
                    html,body {
                        background-color: ${getComputedStyle(document.documentElement).getPropertyValue('background-color')};
                        color: ${getComputedStyle(document.documentElement).getPropertyValue('color')};
                    }
                `,
                setup: (editor) => {

                    this.editor = editor;

                    editor.on('init', e => {

                        editor.setContent(this.modelValue || '');

                        editor.on('input ExecCommand', e => {
                            this.$emit('update:modelValue', editor.getContent())
                        });

                        editor.on('focus blur', e => {
                            editor.isFocused = !editor.isFocused;
                            this.$el.dispatchEvent(new Event(editor.isFocused ? 'focusin':'focusout', { bubbles: true, cancelable: true }));
                        });
                    });

                },
                skin_url: App.base('/modules/App/assets/css/vendor/tinymce')
            }, this.tinymce || {}));
        })
    },

    methods: {
        update() {
            this.$emit('update:modelValue', this.editor.getContent())
        }
    }
}