
export default {

    name: 'items-tree',

    data() {
        return {
            loading: false,
            maxlevel: false,
            actionItem: null
        }
    },

    props: {
        model: {
            type: Object,
            default: null
        },
        modelValue: {
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

        items: {
            get() {
                return this.modelValue || []
            },
            set(value) {
                this.$emit('update:modelValue', value)
            }
        },

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

    watch: {
        actionItem(val) {

            if (val) {
                setTimeout(() => {
                    document.getElementById('popout-content-tree-context-menu').show();
                }, 50);
            }
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

        lstUpdate() {
            if (this.p) {
                this.p._children = this.p.children.length;
                this.p._showChildren = true;
            }
        },

        onEnd(evt) {

            if (!this.allowMoving) {
                return App.ui.notify('You are not allowed to move content items', 'error');
            }

            const { data, from, to, oldIndex, newIndex } = evt;

            setTimeout(() => {

                let pId = to.closest('[data-item-id]')?.getAttribute('data-item-id')  || null;
                let toUpdate = {}

                data._pid = pId;

                [...to.children].forEach((child, idx) => {

                    let page = {_id: child.getAttribute('data-item-id'), _o: idx};

                    if (page._id === data._id) {
                        page._pid = pId;
                        page._o = newIndex;
                    }

                    toUpdate[page._id] = page;
                });

                [...from.children].forEach((child, idx) => {
                    let page = {_id: child.getAttribute('data-item-id'), _o: idx};

                    if (!toUpdate[page._id]) {
                        toUpdate[page._id] = page;
                    }
                });

                toUpdate = Object.values(toUpdate);

                if (toUpdate.length) {
                    this.$request(`/content/tree/updateOrder/${this.model.name}`, {items:toUpdate})
                }

            }, 0);

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
            location.href = this.$routeUrl(`/content/tree/item/${this.model.name}?pid=${pid}`);
        },

        onMove() {
            return this.allowMoving;
        },

        moveItem(item, pos) {

            if (!pos || this.items.length < 2) return;

            if (pos === 'first') {
                this.items.unshift(this.items.splice(this.items.indexOf(item), 1)[0]);
            }

            if (pos === 'last') {
                this.items.push(this.items.splice(this.items.indexOf(item), 1)[0])
            }

            let toUpdate = []

            this.items.forEach((p, idx) => {
                toUpdate.push({_id: p._id, _o: idx});
            });

            this.$request(`/content/tree/updateOrder/${this.model.name}`, {items:toUpdate});
        },

        toggleActionItemActions(item, tree) {

            if (!tree) {
                tree = this;
            }

            if (this.p) {
                this.$emit('show-item-actions', item, tree);
                return;
            }

            let val =  (!item || this.actionItem?.item === item) ? null : {tree, item};

            this.actionItem = val;
        }
    },

    template: /*html*/`
        <div>
            <app-loader size="small" v-if="loading"></app-loader>

            <vue-draggable
                v-model="items"
                handle=".fm-handle"
                class="items-tree-dragarea"
                :group="'items'"
                :swapThreshold="0.35"
                :animation="100"
                @add="lstUpdate"
                @remove="lstUpdate"
                @end="onEnd"
                @move="onMove"

            >
                <div class="kiss-margin-xsmall" :data-item-id="element._id" :data-item-idx="idx" :key="element._id" v-for="(element, idx) in items">
                    <kiss-card class="kiss-padding-small kiss-flex kiss-flex-middle kiss-margin-xsmall" gap="small" theme="bordered contrast shadowed">
                        <a class="fm-handle kiss-color-muted kiss-cursor-grab" v-if="allowMoving"><icon>drag_handle</icon></a>
                        <a class=" kiss-color-muted" :class="{'kiss-hidden': !element._children}" :placeholder="t('Toggle children')" @click="element._showChildren = !element._showChildren">
                            <icon>{{ element._showChildren ? 'indeterminate_check_box' : 'add_box' }}</icon>
                        </a>
                        <div class="kiss-position-relative kiss-flex-1">
                            <tree-item :model="model" :item="element"></tree-item>
                            <a class="kiss-cover" :href="$routeUrl('/content/tree/item/'+model.name+'/'+element._id)"></a>
                        </div>
                        <a @click="toggleActionItemActions(element)"><icon>more_horiz</icon></a>
                    </kiss-card>
                    <div v-if="!isMaxLevel && (element._showChildren || !element._children)" :style="{paddingLeft: (((level+1)*23)+'px')}">
                        <items-tree class="items-tree" :model="model" v-model="element.children" :level="level+1" :p="element" :locale="locale" :allow-moving="allowMoving" @show-item-actions="(item, tree) => toggleActionItemActions(item, tree)"></items-tree>
                    </div>
                </div>
            </vue-draggable>
        </div>
        <teleport to="body" v-if="!p && actionItem">
            <kiss-popout id="popout-content-tree-context-menu" @popoutclose="toggleActionItemActions(null)">
                <kiss-content>
                    <kiss-navlist class="kiss-margin">
                        <ul>
                            <li class="kiss-nav-header">{{ t('Item actions') }}</li>
                            <li v-if="actionAsset">
                                <div class="kiss-color-muted kiss-text-truncate kiss-margin-small-bottom">{{ t('Item actions')}}</div>
                            </li>
                            <li>
                                <a class="kiss-flex kiss-flex-middle" :href="$routeUrl('/content/tree/item/'+model.name+'/'+actionItem.item._id)">
                                    <icon class="kiss-margin-small-right" size="larger">create</icon>
                                    {{ t('Edit') }}
                                </a>
                            </li>
                            <li v-if="!actionItem.tree.isMaxLevel">
                                <a class="kiss-flex kiss-flex-middle" @click="actionItem.tree.createItem(actionItem.item._id)">
                                    <icon class="kiss-margin-small-right" size="larger">create_new_folder</icon>
                                    {{ t('Add child item') }}
                                </a>
                            </li>
                            <li class="kiss-nav-divider"></li>
                            <li>
                                <a class="kiss-flex kiss-flex-middle kiss-color-danger"  @click="actionItem.tree.remove(actionItem.item)">
                                    <icon class="kiss-margin-small-right" size="larger">delete</icon>
                                    {{ t('Delete') }}
                                </a>
                            </li>
                        </ul>
                        <ul class="kiss-margin-small" v-if="Array.isArray(actionItem.tree.items) && actionItem.tree.items.length > 1">
                            <li class="kiss-nav-header">{{ t('Move item') }}</li>
                            <li v-if="actionItem.tree.items.indexOf(actionItem.item) !== 0">
                                <a class="kiss-flex kiss-flex-middle" @click="actionItem.tree.moveItem(actionItem.item, 'first')">
                                        <icon class="kiss-margin-small-right">arrow_upward</icon>
                                        {{ t('Move first') }}
                                    </a>
                                </li>
                            <li v-if="actionItem.tree.items.indexOf(actionItem.item) !== actionItem.tree.items.length - 1">
                                <a class="kiss-flex kiss-flex-middle" @click="actionItem.tree.moveItem(actionItem.item, 'last')">
                                    <icon class="kiss-margin-small-right">arrow_downward</icon>
                                    {{ t('Move last') }}
                                </a>
                            </li>
                        </ul>
                        </kiss-navlist>
                </kiss-content>
            </kiss-popout>
        </teleport>
    `
}
