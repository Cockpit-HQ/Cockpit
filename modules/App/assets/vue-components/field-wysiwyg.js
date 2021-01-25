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
        }
    },

    watch: {
        modelValue() {
            if (this.editor && !this.editor.isFocused) {
                this.editor.setContent(this.modelValue);
            }
        }
    },

    template: /*html*/`
        <div>
            <textarea hidden></textarea>
        </div>
    `,

    mounted() {

        ready.then(() => {

            tinymce.init({
                target: this.$el.querySelector('textarea'),
                setup: (editor) => {

                    this.editor = editor;

                    editor.on('init', e => {

                        editor.setContent(this.modelValue);

                        editor.on('input ExecCommand', e => {
                            this.$emit('update:modelValue', editor.getContent())
                        });

                        editor.on('focus blur', e => editor.isFocused = !editor.isFocused);
                    });

                },
                skin_url: App.base('/modules/App/assets/css/vendor/tinymce')
            });
        })
    },

    methods: {
        update() {
            this.$emit('update:modelValue', this.editor.getContent())
        }
    }
}