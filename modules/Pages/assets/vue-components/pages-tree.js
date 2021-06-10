
export default {

    name: 'pages-tree',

    data() {
        return {
            loading: false
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
        },
        p: {
            type: Object,
            default: null
        }
    },

    mounted() {

        if (this.p && this.p._children) {

            this.loading = true;

            this.$request('/pages/load', {_pid:this.p._id}).then(pages => {

                this.p.children = pages;
                this.loading = false;
            }).catch(res => {
                this.loading = false;
                App.ui.notify(res.error || 'Loading children failed!', 'error');
            });
        }
    },

    template: /*html*/`
        <div>
            <app-loader size="small" v-if="loading"></app-loader>

            <vue-draggable
                :list="pages"
                handle=".fm-handle"
                class="pages-tree-dragarea"
                :group="'pages'"
                :swapThreshold="0.35"
                :animation="100",
                :fallbackOnBody="false"
                @change="change"
                itemKey="_id"

                v-if="!loading"
            >
                <template #item="{ element }">
                    <div class="kiss-margin-xsmall">
                        <kiss-card class="kiss-padding-small kiss-flex kiss-flex-middle kiss-margin-xsmall" theme="bordered contrast">
                            <a class="fm-handle kiss-margin-small-right kiss-color-muted"><icon>drag_handle</icon></a>
                            <a class="kiss-margin-small-right kiss-color-muted" :class="{'kiss-hidden': !element._children}" :placeholder="t('Toggle children')" @click="element._showChildren = !element._showChildren">
                                <icon>{{ element._showChildren ? 'indeterminate_check_box' : 'add_box' }}</icon>
                            </a>
                            <div class="kiss-margin-small-right">
                                <icon :class="{'kiss-color-danger': !element._state, 'kiss-color-success': element._state === 1}">circle</icon>
                            </div>
                            <div class="kiss-flex-1 kiss-size-small kiss-text-truncate">
                                <a class="kiss-link-muted" :href="$route('/pages/page/'+element._id)" :class="{'kiss-text-bold': element.children.length}">
                                {{ element.title }}
                                </a>
                            </div>
                            <div class="kiss-color-muted kiss-size-xsmall">
                                {{ element._r }}
                            </div>
                            <a class="kiss-margin-small-left" :href="$route('/pages/page?parent='+element._id)"><icon>create_new_folder</icon></a>
                            <a class="kiss-margin-small-left kiss-color-danger" @click="remove(element)"><icon>delete</icon></a>
                        </kiss-card>
                        <div v-if="element._showChildren || !element._children" :style="{paddingLeft: (((level+1)*15)+'px')}">
                            <pages-tree class="pages-tree" :pages="element.children" :level="level+1" :p="element"></pages-tree>
                        </div>
                    </div>
                </template>
            </vue-draggable>
        </div>
    `,

    methods: {

        change(actions) {

            let toUpdate = [],
                pId = this.p ? this.p._id : null,
                list = pId ? this.p.children : this.pages;

            if (actions.added) {

                let element = actions.added.element

                element._pid = pId;

                list.forEach((p, idx) => {

                    let item = {_id: p._id, _o: idx}

                    if (item._id == element._id) {
                        item._pid = pId;
                    }

                    toUpdate.push(item);
                });

                this.updateRoutes(element, this.p);
            }

            if (actions.moved || actions.removed) {

                list.forEach((p, idx) => {
                    toUpdate.push({_id: p._id, _o: idx});
                });
            }

            if (this.p) {
                this.p._children = this.p.children.length;
                this.p._showChildren = true;
            }

            if (toUpdate.length) {
                this.$request('/pages/utils/updateOrder', {pages:toUpdate})
            }
        },

        updateRoutes(element, parent) {

            let route = [element.slug], p = parent;

            while(p) {
                route.unshift(p.slug);
                p = p.p;
            }

            element._r = `/${route.join('/')}`;

            element.children.forEach(ele => this.updateRoutes(ele, element))
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