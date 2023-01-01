
export default {

    name: 'items-tree',

    data() {
        return {
            loading: false,
            maxlevel: false
        }
    },

    props: {
        model: {
            type: Object,
            default: null
        },
        items: {
            type: Array,
            default: []
        },
        level: {
            type: Number,
            default: 0
        },
        locale: {
            type: String,
            default: 'default'
        },
        p: {
            type: Object,
            default: null
        },
        allowMoving: {
            type: Boolean,
            default: true
        }
    },

    components: {
        'tree-item': Vue.defineAsyncComponent(() => App.utils.import('content:assets/vue-components/tree-item.js')),
    },

    computed: {

        meta() {
            return (this.model.meta || {}).tree || {};
        },

        isMaxLevel() {

            if (this.meta.maxlevel === undefined || this.meta.maxlevel === null) {
                return false;
            }

            return (this.level + 1) > Number(this.meta.maxlevel);
        }
    },

    mounted() {

        if (this.p && this.p._children) {

            this.loading = true;

            let params = {_pid:this.p._id};

            if (this.locale && this.loacale !== 'default') {
                params.locale = this.locale;
            }

            this.$request(`/content/tree/load/${this.model.name}`, params).then(items => {

                this.p.children = items;
                this.loading = false;
            }).catch(res => {
                this.loading = false;
                App.ui.notify(res.error || 'Loading children failed!', 'error');
            });
        }
    },

    methods: {

        change(actions) {

            let toUpdate = [],
                pId = this.p ? this.p._id : null,
                list = pId ? this.p.children : this.items;

            if (actions.added) {

                let element = actions.added.element

                element._pid = pId;

                list.forEach((p, idx) => {

                    let item = {_id: p._id, _o: idx}

                    if (item._id === element._id) {
                        item._pid = pId;
                    }

                    toUpdate.push(item);
                });

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
                this.$request(`/content/tree/updateOrder/${this.model.name}`, {items:toUpdate})
            }
        },

        remove(item) {
            App.ui.confirm('Are you sure?', () => {

                this.$request(`/content/tree/remove/${this.model.name}`, {item}).then(res => {
                    this.items.splice(this.items.indexOf(item), 1);
                }).catch(res => {
                    App.ui.notify(res.error || 'Item removing failed!', 'error');
                });
            });
        },

        createItem(pid = null) {
            location.href = this.$route(`/content/tree/item/${this.model.name}?pid=${pid}`);
        },

        onMove() {
            return this.allowMoving;
        },

        onEnd() {
            if (!this.allowMoving) {
                App.ui.notify('You are not allowed to move content items', 'error');
            }
        }
    },

    template: /*html*/`
        <div>
            <app-loader size="small" v-if="loading"></app-loader>

            <vue-draggable
                :list="items"
                handle=".fm-handle"
                class="items-tree-dragarea"
                :group="'items'"
                :swapThreshold="0.35"
                :animation="100",
                :fallbackOnBody="false"
                @change="change"
                @end="onEnd"
                :move="onMove"
                itemKey="_id"

                v-if="!loading"
            >
                <template #item="{ element }">
                    <div class="kiss-margin-xsmall">
                        <kiss-card class="kiss-padding-small kiss-flex kiss-flex-middle kiss-margin-xsmall" theme="bordered contrast shadowed">
                            <a class="fm-handle kiss-margin-small-right kiss-color-muted"><icon>drag_handle</icon></a>
                            <a class="kiss-margin-small-right kiss-color-muted" :class="{'kiss-hidden': !element._children}" :placeholder="t('Toggle children')" @click="element._showChildren = !element._showChildren">
                                <icon>{{ element._showChildren ? 'indeterminate_check_box' : 'add_box' }}</icon>
                            </a>
                            <div class="kiss-position-relative kiss-flex-1">
                                <tree-item :model="model" :item="element"></tree-item>
                                <a class="kiss-cover" :href="$route('/content/tree/item/'+model.name+'/'+element._id)"></a>
                            </div>
                            <a class="kiss-margin-small-left" @click="createItem(element._id)" v-if="!isMaxLevel"><icon>create_new_folder</icon></a>
                            <a class="kiss-margin-small-left kiss-color-danger" @click="remove(element)"><icon>delete</icon></a>
                        </kiss-card>
                        <div v-if="!isMaxLevel && (element._showChildren || !element._children)" :style="{paddingLeft: (((level+1)*23)+'px')}">
                            <items-tree class="items-tree" :model="model" :items="element.children" :level="level+1" :p="element" :locale="locale" :allow-moving="allowMoving"></items-tree>
                        </div>
                    </div>
                </template>
            </vue-draggable>
        </div>
    `
}
