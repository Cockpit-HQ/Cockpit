import ActionButtons from './components/action-buttons.js';

export default {

    components: {
        ActionButtons
    },

    props: {
        editor: {
            type: Object,
            default: null
        },
        actions: {
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
            return this.actions.groups(this.toolbar);
        }
    },

    template: /*html*/`
        <div class="kiss-margin-small kiss-flex" gap="small" v-if="groups.length || (editor.state.selection.empty && editor.isActive('table'))">
            <div class="kiss-button-group" v-for="group in groups">
                <action-buttons :editor="editor" :actions="actions" :names="group" />
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
