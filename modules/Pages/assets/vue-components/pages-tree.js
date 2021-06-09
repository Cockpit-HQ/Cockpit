
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
        },
        level: {
            type: Number,
            default: 0
        }
    },

    template: /*html*/`
        <vue-draggable
            :list="pages"
            handle=".fm-handle"
            class="pages-tree-dragarea"
            :group="'pages'"
            :swapThreshold="0.65"
            :animation="150",
            :fallbackOnBody="true"
            @change="change"
        >
            <template #item="{ element }">
                <div class="kiss-margin-small">
                    <kiss-card class="kiss-padding-small kiss-flex kiss-flex-middle kiss-margin-small" theme="bordered contrast">
                        <a class="fm-handle kiss-margin-small-right kiss-color-muted"><icon>drag_handle</icon></a>
                        <div class="kiss-margin-small-right">
                            <icon :class="{'kiss-color-danger': !element._state, 'kiss-color-success': element._state === 1}">circle</icon>
                        </div>
                        <div class="kiss-flex-1"><a class="kiss-link-muted" :href="$route('/pages/page/'+element._id)">{{ element.title }}</a></div>
                        <a class="kiss-margin-small-left kiss-color-danger" @click="remove(element)"><icon>delete</icon></a>
                    </kiss-card>
                    <div :style="{paddingLeft: (((level+1)*15)+'px')}">
                        <pages-tree class="pages-tree" :pages="element.children" :level="level+1"></pages-tree>
                    </div>
                </div>
            </template>
        </vue-draggable>
    `,

    methods: {

        change(t) {
            console.log(t)
        },

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