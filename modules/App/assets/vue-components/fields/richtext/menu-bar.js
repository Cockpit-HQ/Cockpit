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
        call(action) {
            this.actions.action(action).action(this.editor);
        }
    },

    template: /*html*/`
        <div class="kiss-margin-small kiss-flex" gap="small" v-if="groups">
            <div class="kiss-button-group" v-for="group in groups">
                <button type="button" class="kiss-button kiss-button-small" :class="{'kiss-button-primary': actions.isActive(action)}" @click="call(action)" v-for="action in group"><icon>{{ actions.action(action).icon }}</icon></button>
            </div>
        </div>
    `
};
