
export default {

    name: 'pages-tree',

    data() {
        return {

        }
    },

    props: {
        pages: {
            type: Array,
            default: []
        }
    },

    template: /*html*/`
        <vue-draggable
            v-model="pages"
            handle=".fm-handle"
        >
            <template #item="{ element }">
                <kiss-card class="kiss-padding-small kiss-flex kiss-flex-middle kiss-margin-small" theme="bordered contrast">
                    <a class="fm-handle kiss-margin-small-right kiss-color-muted"><icon>drag_handle</icon></a>
                    <div class="kiss-margin-small-right">
                        <icon :class="{'kiss-color-danger': !element._state, 'kiss-color-success': element._state === 1}">circle</icon>
                    </div>
                    <div class="kiss-flex-1"><a class="kiss-link-muted" :href="$route('/pages/page/'+element._id)">{{ element.title }}</a></div>
                    <a class="kiss-margin-small-left kiss-color-danger" @click="remove(element)"><icon>delete</icon></a>
                </kiss-card>
            </template>
        </vue-draggable>
    `,

    methods: {
        remove(page) {
            App.ui.confirm('Are you sure?', () => {

                this.$request('/pages/remove', {page}).then(res => {
                    this.pages.splice(this.pages.indexOf(page), 1);
                }).catch(res => {
                    App.ui.notify(res.error || 'Page removing failed!', 'error');
                });
            });
        }
    }

}