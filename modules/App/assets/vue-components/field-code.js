let ready = new Promise(function(resolve) {

    App.assets.require([
        '/modules/App/assets/vendor/codemirror/lib/codemirror.js',
        '/modules/App/assets/css/vendor/codemirror.css',
    ], function() {
        resolve(window.CodeMirror);
    });
});

export default {

    _meta: {
        label: 'Code',
        info: 'Code input'
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
            if (this.editor && !this.editor.hasFocus()) {
                this.editor.setValue(this.modelValue);
            }
        }
    },

    template: /*html*/`
        <div>
            <div class="codemirror-wrapper"></div>
        </div>
    `,

    mounted() {

        ready.then(CodeMirror => {

            let wrapper = this.$el.querySelector('.codemirror-wrapper');

            this.editor = CodeMirror(wrapper, {
                value: this.modelValue || '',
                lineNumbers: true,
                mode: null
            });

            this.$el.editor = this.editor;

            this.editor.on('change', () => {
                this.$emit('update:modelValue', this.editor.getValue())
            });
        })
    },

    methods: {
        update() {
            if (this.editor) this.$emit('update:modelValue', this.editor.getValue())
        }
    }
}