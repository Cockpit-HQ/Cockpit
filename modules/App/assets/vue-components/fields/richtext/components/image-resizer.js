const NodeViewWrapper = null;


export default {
    components: {

    },
    props: ['node', 'updateAttributes', 'selected'],
    data() {
        return {
            resizing: false,
            startX: 0,
            startWidth: 0,
        };
    },
    computed: {
        src() {
            return this.node.attrs.src;
        },
        alt() {
            return this.node.attrs.alt;
        },
        width() {
            return this.node.attrs.width;
        },
    },
    methods: {
        onMouseDown(event) {
            event.preventDefault();
            this.resizing = true;
            this.startX = event.clientX;
            this.startWidth = this.$refs.image.clientWidth;

            document.addEventListener('mousemove', this.onMouseMove);
            document.addEventListener('mouseup', this.onMouseUp);
        },
        onMouseMove(event) {
            if (!this.resizing) return;
            const currentX = event.clientX;
            const diffX = currentX - this.startX;
            const newWidth = Math.max(20, this.startWidth + diffX);

            this.updateAttributes({ width: newWidth });
        },
        onMouseUp() {
            this.resizing = false;
            document.removeEventListener('mousemove', this.onMouseMove);
            document.removeEventListener('mouseup', this.onMouseUp);
        },
    },
    mounted() {
        if (this.$el && !this.$el.hasAttribute('data-node-view-wrapper')) {
            this.$el.setAttribute('data-node-view-wrapper', '');
        }
    },
    template: /*html*/`
        <div class="node-view-wrapper image-resizer" style="display: inline-block; position: relative; line-height: 0;" data-node-view-wrapper>
            <img ref="image" :src="src" :alt="alt" :width="width" :class="{ 'ProseMirror-selectednode': selected }" style="max-width: 100%; height: auto; display: block;" />
            <div
                v-show="selected"
                class="resize-handle"
                @mousedown="onMouseDown"
                style="position: absolute; right: -6px; bottom: -6px; width: 12px; height: 12px; background-color: var(--kiss-color-primary, #000); cursor: nwse-resize; border: 2px solid white; border-radius: 2px; z-index: 10;"
            ></div>
        </div>
    `,
};
