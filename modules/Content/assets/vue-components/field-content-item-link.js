
let instanceCount = 0;

export default {

    _meta: {
        label: 'Content Link',
        info: 'Content item reference',
        icon: 'content:assets/icons/reference.svg',
        settings: [
            {name: 'link', type: 'options-linkModel'},
            {name: 'display', type: 'text'},
        ],
        render(value, field, context) {

            if (Array.isArray(value)) {
                return `<span class="kiss-badge kiss-badge-outline">${value.length}</span>`;
            }

            if (!field.opts.link) {
                return 'n/a'
            }

            if (!field.opts.display) {
                return `<span class="kiss-badge kiss-badge-outline">${value._id.substr(-5)}</span>`
            }

            let id = `cil-${App.utils.uuid()}`;

            let getItem = new Promise((resolve => {

                App.request(`/content/collection/find/${field.opts.link}`, {
                    options: {
                        filter:{_id:value._id},
                        limit:1
                    }
                }).then(resp => resolve(resp.items[0] || null));
            }))

            getItem.then(item => {

                let html = 'n/a', ele;

                if (item) {
                    try {
                        html = App.utils.interpolate(field.opts.display, {item, data:item});
                    } catch(e) {}
                }

                ele = document.querySelector(`#${id}`);

                if (ele) {
                    ele.innerText = html;
                }
            })

            return `<span id="${id}"><app-loader class="kiss-margin-remove-horizontal" size="small"></app-loader></span>`;
        }
    },

    data() {
        return {
            uid: `field-content-item-link-${++instanceCount}`,
            val: this.modelValue,
            model: null,
            item: null
        }
    },

    props: {
        modelValue: {
            type: Object,
            default: null
        },
        link: {
            type: String,
            default: null
        },
        filter: {
            type: Object,
            default: null
        },
        display: {
            type: String,
            default: null
        }
    },

    watch: {
        modelValue() {
            this.val = this.modelValue;
            this.update();
        }
    },

    mounted() {

        this.$request('/content/models/load').then(models => {

            this.model = false;

            models.forEach(m => {
                if (m.name == this.link) this.model = m;
            });
        });
    },

    methods: {

        pickItem() {

            VueView.ui.modal('content:assets/dialogs/select-content-item.js', {model: this.model, filter: this.filter}, {
                pickItem: (item) => {

                    this.val = {
                        _model: this.model.name,
                        _id: item._id
                    };
                    this.item = item;
                    this.update();
                }
            }, {size: 'xlarge'})
        },

        getDisplay() {

            let getItem = new Promise((resolve => {

                if (this.item) {
                    resolve(this.item)
                } else {

                    this.$request(`/content/collection/find/${this.model.name}`, {
                        options: {
                            filter:{_id:this.val._id},
                            limit:1
                        }
                    }).then(resp => {
                        this.item = resp.items[0] || null;
                        resolve(this.item);
                    })
                }
            }))

            getItem.then(item => {

                let html = '';

                    if (item) {
                    try {
                        html = App.utils.interpolate(this.display, { /* deprecated */ item, data:item});
                    } catch(e) {
                        html = 'ERROR';
                    }

                } else {
                    html = '';
                }

                this.$el.querySelector('.content-link-item-display').innerText = html;
            })

            return '<span class="content-link-item-display"><app-loader class="kiss-margin-remove-horizontal" size="small"></app-loader></span>'
        },

        update() {
            this.$emit('update:modelValue', this.val)
        }
    },

    template: /*html*/`
        <div field="content-item-link">

            <div class="kiss-size-small kiss-color-muted" v-if="!link">
                {{ t('No model selected') }}
            </div>

            <div class="kiss-size-small kiss-color-muted" v-if="link && model === false">
                {{ t('Unknown model') }}
            </div>

            <div v-if="link && model">

                <kiss-card class="kiss-padding kiss-color-muted kiss-align-center kiss-margin-small kiss-position-relative" theme="contrast" v-if="!val">
                    <kiss-svg :src="$base('content:assets/icons/reference.svg')" width="40" height="40"></kiss-svg>
                    <div class="kiss-margin-small kiss-size-small">{{ t('No content item linked' )}}</div>
                    <a class="kiss-cover" @click="pickItem()"></a>
                </kiss-card>

                <div class="kiss-margin-small kiss-position-relative" v-if="val && val._id">
                    <div class="kiss-size-small" v-if="display" v-html="getDisplay()"></div>
                    <span class="kiss-badge kiss-badge-outline kiss-color-primary" v-else>{{ val._id}}</span>
                    <a class="kiss-cover" :href="$route('/content/'+model.type+'/item/'+model.name+'/'+val._id)" target="_blank" rel="noopener"></a>
                </div>

                <a class="kiss-button kiss-button-small" @click="pickItem()">
                    <icon class="kiss-margin-small-right">link</icon>
                    {{ 'Link '+(model.name || model.label)+' item' }}
                </a>

            </div>
        </div>
    `
}
