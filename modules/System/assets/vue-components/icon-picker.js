
let promise = {};

function getIcons(src) {

    if (promise[src]) {
        return promise[src];
    }

    promise[src] = new Promise((resolve, reject) => {
        App.request('/system/utils/icons').then(icons => resolve(icons));
    });

    return promise[src];
}

let IconPicker = {

    data() {

        return {
            icon: this.modelValue || '',
            icons: null,
            filter: '',
            select: false
        }
    },

    props: {
        modelValue: {
            type: String,
            default: null
        },
        src: {
            type: String,
            default: '/system/utils/icons'
        },
        group: {
            type: String,
            default: null
        },
        size: {
            type: Number,
            default: 40
        },
        placeholder: {
            type: String,
            default: null
        },
    },

    watch: {
        icon() {
            this.update();
        },
        modelValue(val) {
            this.icon = typeof(val) === 'string' ? val : null;
        },
        select(val) {

            if (val && !Array.isArray(this.icons)) {
                getIcons(this.src).then(icons => this.icons = icons);
            }
        }
    },

    computed: {

        filtered() {

            if (!this.filter.trim()) {
                return this.icons;
            }

            let filter = this.filter.trim().toLocaleLowerCase();

            return this.icons.filter(icn => {
                return `${icn.name} ${icn.path}`.toLocaleLowerCase().includes(filter);
            });
        }
    },


    methods: {

        selectIcon(icon) {
            this.icon = icon?.path || null;
            this.select = null;
        },

        update() {

            this.error = null

            try {
                this.$emit('update:modelValue', this.icon);
            } catch(e) {
                this.error = `${e.lineNumber}: ${e.message}`;
            }
        }
    },

    template: /*html*/`
        <div>

            <kiss-card class="kiss-display-inline-block kiss-position-relative">
                <canvas :width="size" :height="size" :class="{'kiss-bgcolor-transparentimage': !icon}"></canvas>
                <div class="kiss-cover kiss-flex kiss-flex-middle kiss-flex-center kiss-align-center">
                    <div v-if="icon || placeholder">
                        <kiss-svg :src="$baseUrl(icon || placeholder)" width="100%"></kiss-svg>
                    </div>
                </div>
                <a class="kiss-cover" @click="select = true"></a>
            </kiss-card>

        </div>

        <teleport to="body">
            <kiss-dialog open="true" size="large" v-if="select">
                <kiss-content class="animated fadeInUp faster">

                    <div class="kiss-size-4 kiss-text-bold">
                        {{ t('Select icon') }}
                    </div>

                    <div class="kiss-margin">
                        <input type="text" class="kiss-input kiss-width-1-1" :placeholder="t('Filter icons...')" v-model="filter" :disabled="!Array.isArray(icons)">
                    </div>

                    <div class="kiss-margin kiss-dialog-overflow">

                        <app-loader v-if="!Array.isArray(icons)"></app-loader>

                        <div class="kiss-align-center kiss-color-muted kiss-margin-large-top kiss-size-3" v-if="Array.isArray(icons) && !filtered.length">
                            {{ t('No icons found') }}
                        </div>

                        <kiss-grid gap="small" cols="4 8@m 10@xl" v-if="Array.isArray(icons) && icons.length">
                            <kiss-card class="kiss-padding kiss-align-center kiss-position-relative app-icon-preview" theme="bordered" hover="shadow contrast" v-for="icn in filtered">
                                <img loading="lazy" width="100" height="100" :src="$baseUrl(icn.path)">
                                <a class="kiss-cover" @click="selectIcon(icn)"></a>
                            </kiss-card>
                        </kiss-grid>

                    </div>


                    <div class="kiss-margin kiss-flex kiss-flex-right">

                        <div class="kiss-button-group">
                            <a class="kiss-button" @click="selectIcon(null)" v-if="icon">
                                {{ t('Reset') }}
                            </a>
                            <a class="kiss-button kiss-button-primary" @click="select=null">
                                {{ t('Cancel') }}
                            </a>
                        </div>
                    </div>

                </kiss-content>
            </kiss-dialog>

        </teleport>
    `
}

export default IconPicker;
