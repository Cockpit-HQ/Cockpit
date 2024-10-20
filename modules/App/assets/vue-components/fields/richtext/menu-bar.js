import EditorActions from './editor-actions.js';

export default {
    data() {

        let actions = new EditorActions(this.editor);

        return {
            actions: actions
        }
    },

    props: {
        editor: {
            type: Object,
            default: null
        },
        toolbar: {
            type: String,
            default: null
        },
        euid: {
            type: String,
            default: null
        }
    },

    computed: {
        groups() {
            let groups = [];

            if (!this.toolbar) return false;

            this.toolbar.split(' | ').forEach(item => {

                let group = [];

                item.split(' ').forEach(itm => {

                    itm = itm.trim();

                    if (!itm || !this.actions.actions[itm]) return;
                    group.push(itm);
                });

                if (group.length) groups.push(group);
            });

            return groups.length ? groups : false;
        }
    },

    methods: {
        isActive(action) {
            return this.actions.isActive(action);
        },
        call(action) {
            this.actions.call(action);
        }
    },

    template: /*html*/`
        <div class="kiss-margin-small kiss-flex" gap="small" v-if="groups">
            <div class="kiss-button-group" v-for="group in groups">
                <button type="button" class="kiss-button kiss-button-small" :class="{'kiss-button-primary': isActive(action)}" :title="t(actions.actions[action].title || '')" @click="call(action)" v-for="action in group">
                    <component v-if="actions.action(action).component" :is="actions.action(action).component" :editor="editor" />
                    <icon v-else>{{ actions.action(action).icon }}</icon>
                </button>
            </div>
            <div class="kiss-flex-1"></div>
            <div :id="euid+'-submenu'">

                <div class="kiss-flex" gap="small" v-if="editor.state.selection.empty && editor.isActive('table')">
                    <div class="kiss-button-group">
                        <button type="button" class="kiss-button kiss-button-small" @click="editor.chain().focus().addRowBefore().run()" :title="t('Add row above')"><icon>add_row_above</icon></button>
                        <button type="button" class="kiss-button kiss-button-small" @click="editor.chain().focus().addRowAfter().run()" :title="t('Add row below')"><icon>add_row_below</icon></button>
                        <button type="button" class="kiss-button kiss-button-small" @click="editor.chain().focus().deleteRow().run()" :title="t('Delete row')"><icon>delete</icon></button>
                    </div>
                    <div class="kiss-button-group">
                        <button type="button" class="kiss-button kiss-button-small" @click="editor.chain().focus().addColumnBefore().run()" :title="t('Add column left')"><icon>add_column_left</icon></button>
                        <button type="button" class="kiss-button kiss-button-small" @click="editor.chain().focus().addColumnAfter().run()" :title="t('Add column right')"><icon>add_column_right</icon></button>
                        <button type="button" class="kiss-button kiss-button-small" @click="editor.chain().focus().deleteColumn().run()" :title="t('Delete column')"><icon>delete</icon></button>
                    </div>
                    <button type="button" class="kiss-button kiss-button-small kiss-button-danger" @click="editor.chain().focus().deleteTable().run()" :title="t('Delete table')"><icon>delete</icon></button>
                </div>

            </div>
        </div>
    `
};
