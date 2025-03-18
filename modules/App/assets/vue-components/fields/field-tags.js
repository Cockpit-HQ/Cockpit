
let instanceCount = 0;

let ready = new Promise(function(resolve) {

    App.assets.require([
        'app:assets/components/app-tags/app-tags.js',
        'app:assets/components/app-tags/app-tags.css',
    ], function() {
        resolve();
    });
});

export default {

    _meta: {
        label: 'Tags',
        info: 'Tags list',
        icon: 'system:assets/icons/tags.svg',
        settings: [
            {name: 'placeholder', type: 'text'},
            {name: 'max', type: 'number', info: 'Max items'},
            {name: 'list', type: 'text', multiple: true, info: 'Options list'},
        ],
        render(value, field, context) {

            if (typeof(value) === 'object') {
                value = JSON.stringify(value).replace(/("|\[|\])/g, '');
            } else {
                value = '';
            }

            return context == 'table-cell' && value.length > 100 ? App.utils.truncate(value, 100) : value;
        }
    },

    data() {
        return {
            uid: `field-tags-${++instanceCount}`,
            val: this.modelValue || [],
            options: [],
            loading: false,
            tagsElement: null
        }
    },

    props: {
        modelValue: {
            type: Array,
            default: []
        },
        placeholder: {
            type: String,
            default: ''
        },
        max: {
            type: Number
        },
        minChars: {
            type: Number,
            default: 0
        },
        strictMode: {
            type: Boolean,
            default: false
        },
        list: {
            type: Array,
            default: []
        },
        src: {
            type: Object,
            default: null
        }
    },

    mounted() {

        this.tagsElement = this.$refs.tags;

        ready.then(() => {

            // Set other options
            if (this.max) {
                this.tagsElement.setAttribute('max-tags', this.max);
            }
            if (this.minChars) {
                this.tagsElement.setAttribute('min-chars', this.minChars);
            }
            if (this.placeholder) {
                this.tagsElement.setAttribute('placeholder', this.placeholder);
            }
            if (this.strictMode) {
                this.tagsElement.setAttribute('strict-mode', '');
            }

            if (this.src || (Array.isArray(this.list) && this.list.length)) {
                this.resolveOptions();
            }

            this.tagsElement.addEventListener('tags-changed', this.update);
            this.tagsElement.setTags(Array.isArray(this.modelValue) ? this.modelValue : []);
        });

    },

    beforeUnmount() {
        if (this.tagsElement) {
            this.tagsElement.removeEventListener('tags-changed', this.update);
        }
    },

    watch: {
        modelValue: {
            handler(newValue) {
                if (this.tagsElement) {
                    const currentTags = this.tagsElement.getTags();
                    if (JSON.stringify(currentTags) !== JSON.stringify(newValue)) {
                        this.tagsElement.setTags(newValue);
                    }
                }
            },
            deep: true
        },

        list: {
            handler() { this.resolveOptions(); },
            deep: true
        },

        src: {
            handler() { this.resolveOptions(); },
            deep: true
        }
    },

    computed: {

    },

    methods: {

        updateOptions() {
            if (this.loading) return;
            this.tagsElement.setSuggestions(this.options);
        },

        update(e) {
            this.$emit('update:modelValue', e.detail.tags);
        },

        resolveOptions() {

            this.options = [];

            if (!this.src && (!Array.isArray(this.list) || !this.list.length)) {
                return;
            }

            this.loading = true;

            (this.src ? this.resolveItemsBySrc() : this.resolveItemsByList()).then(options => {
                this.loading = false;
                this.options = options;
                this.updateOptions();
            });
        },

        resolveItemsByList() {

            return new Promise((resolve) => {

                if (Array.isArray(this.list) && this.list.length) {

                    let id, value, label, options = [];

                    options = this.list.map((item, idx) => {

                        id = item.id ?? idx;
                        value = item.value ?? item;
                        label = item.label ?? value;

                        return { id, value, label }
                    });

                    resolve(options)
                }
            });
        },

        resolveItemsBySrc() {

            const mapping = Object.assign({
                value: '',
                label: '',
            }, this.src.map || {});

            return new Promise((resolve) => {

                let options = [];

                this.$request(this.src.route, this.src.params || {}).then(list => {

                    if (!Array.isArray(list)) {
                        resolve(options);
                        return;
                    }

                    list.forEach((item, idx) => {

                        options.push({
                            value: item[mapping.value] ?? item,
                            label: item[mapping.label] || item[mapping.value] || item,
                            id: item[mapping.id] ?? item[mapping.value] ?? idx
                        });
                    });

                    resolve(options);
                }).catch((err) => {
                    console.error(err);
                    resolve([]);
                });
            });
        }
    },

    template: /*html*/`
        <div field="tags">
            <app-tags ref="tags" />
        </div>
    `
}
