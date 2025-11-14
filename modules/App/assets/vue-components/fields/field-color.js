let instanceCount = 0;

export default {

    _meta: {
        label: 'Color',
        info: 'Color input',
        icon: 'system:assets/icons/color.svg',
        settings: [
            {name: 'size', type: 'number', opts: {placeholder: '40'}},
            {name: 'colors', type: 'color', multiple: true, info: 'Set of colors to choose from'},
        ],
        render(value, field, context) {

            if (!value) {
                return '';
            }

            if (Array.isArray(value)) {
                return value.length;
            }

            return `<icon size="larger" style="color:${value}">invert_colors</icon>`;
        }
    },

    data() {
        return {
            uid: `field-date-${++instanceCount}`,
            val: this.modelValue,
            transparent: {
                backgroundImage: 'linear-gradient(45deg, #808080 25%, transparent 25%), linear-gradient(-45deg, #808080 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #808080 75%), linear-gradient(-45deg, transparent 75%, #808080 75%)',
                backgroundSize: '10px 10px',
                backgroundPosition: '0 0, 0 5px, 5px -5px, -5px 0px'
            }
        }
    },

    props: {
        modelValue: {
            type: String,
            default: null
        },
        size: {
            type: Number,
            default: 40
        },
        colors: {
            type: Array,
            default: []
        }
    },

    computed: {
        hasColorSet() {
            return Array.isArray(this.colors) && this.colors.length > 0;
        },
        bgStyle() {
            return this.val ?
                    {background: this.val} :
                    {
                        backgroundImage: 'linear-gradient(45deg, #808080 25%, transparent 25%), linear-gradient(-45deg, #808080 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #808080 75%), linear-gradient(-45deg, transparent 75%, #808080 75%)',
                        backgroundSize: '10px 10px',
                        backgroundPosition: '0 0, 0 5px, 5px -5px, -5px 0px'
                    };
        }
    },

    watch: {

        val() {
            this.update();
        },
        modelValue() {
            this.val = this.modelValue;
            this.update();
        }
    },

    methods: {

        update() {
            this.$emit('update:modelValue', this.val)
        }
    },

    template: /*html*/`
        <div class="kiss-overlay-input" field="color">
            <canvas class="app-border-radius" :width="size || 40" :height="size || 40" :style="bgStyle"></canvas>
            <input v-model="val" type="color" style="cursor:pointer;" @change="update" v-if="!hasColorSet">
            <a class="kiss-cover" :href="'#'+uid+'-popout'" kiss-popout></a>

            <teleport to="body" v-if="hasColorSet">
                <kiss-popout :id="uid+'-popout'">
                    <kiss-content>
                        <kiss-navlist>
                            <ul style="--kiss-navlist-padding-vertical: 6px">
                                <li class="kiss-nav-header">{{ t('Select color') }}</li>
                                <li v-for="color in colors">
                                    <a class="kiss-flex kiss-flex-middle" :class="{'kiss-color-muted': (val != color), 'kiss-text-bold': (val == color)}" @click="val = color">
                                        <icon class="kiss-size-4 kiss-margin-small-right" size="larger" :style="{color}">invert_colors</icon>
                                        {{ color }}
                                    </a>
                                </li>
                            </ul>
                        </kiss-navlist>
                    </kiss-content>
                </kiss-popout>
            </teleport>
        </div>
    `
}
