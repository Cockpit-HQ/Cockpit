export default {

    props: {
        editor: {
            type: Object,
            default: null
        },
        actions: {
            type: Object,
            default: null
        },
        names: {
            type: Array,
            default: []
        }
    },

    template: /*html*/`
        <button type="button" class="kiss-button kiss-button-small" :class="{'kiss-button-primary': actions.isActive(name)}" :title="t(actions.action(name).title || '')" @click="actions.call(name)" v-for="name in names">
            <component v-if="actions.action(name).component" :is="actions.action(name).component" :editor="editor" :actions="actions" />
            <span v-else-if="actions.action(name).label">{{ actions.action(name).label }}</span>
            <icon v-else>{{ actions.action(name).icon }}</icon>
        </button>
    `
}
