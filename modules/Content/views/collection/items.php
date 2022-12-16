<kiss-container class="kiss-margin-small">

    <ul class="kiss-breadcrumbs">
        <li><a href="<?= $this->route('/content') ?>"><?= t('Content') ?></a></li>
    </ul>

    <vue-view>

        <template>

            <div class="kiss-flex kiss-flex-middle kiss-margin-bottom">
                <div class="kiss-margin-small-right">
                    <kiss-svg class="kiss-margin-auto" src="<?= $this->base(isset($model['icon']) && $model['icon'] ? $model['icon'] : 'content:assets/icons/collection.svg') ?>" width="30" height="30" style="color:<?= ($this->escape($model['color'] ?? 'inherit')) ?>"><canvas width="30" height="30"></canvas></kiss-svg>
                </div>

                <a class="kiss-color-muted kiss-margin-small-right" onclick="VueView.ui.offcanvas('content:assets/dialogs/switch-model-view.js')">
                    <icon>expand_circle_down</icon>
                </a>

                <div class="kiss-margin-small-right">
                    <div class="kiss-size-5 kiss-text-bold"><?= $this->escape($model['label'] ? $model['label'] : $model['name']) ?></div>
                </div>

                <kiss-card class="kiss-flex kiss-flex-middle kiss-overlay-input kiss-padding-small kiss-margin-small-right" theme="contrast shadowed" v-if="Object.keys(App._locales).length > 1">
                    <icon class="kiss-margin-xsmall-right">language</icon>
                    <span class="kiss-size-small kiss-text-caption kiss-text-bolder">{{ App._locales[this.locale] }}</span>
                    <select v-model="locale"><option :value="i18n" v-for="(label,i18n) in App._locales">{{label}}</option></select>
                </kiss-card>

                <div>
                    <a class="kiss-size-large" kiss-popoutmenu="#model-menu-actions">
                        <icon>more_horiz</icon>
                    </a>
                </div>
            </div>

            <form class="kiss-flex kiss-flex-middle" v-if="fieldTypes && ((!loading && items.length) || filter)" @submit.prevent="filter = txtFilter">

                <input type="text" class="kiss-input kiss-flex-1 kiss-margin-xsmall-right" :placeholder="t('Filter items...')" v-model="txtFilter">

                <div class="kiss-button-group kiss-margin-small-left">
                    <button type="button" class="kiss-button" @click="filter = ''" v-if="filter"><?= t('Reset') ?></button>
                    <button class="kiss-button kiss-flex"><?= t('Search') ?></button>
                </div>
            </form>

            <app-loader class="kiss-margin" v-if="!fieldTypes || loading"></app-loader>

            <div class="animated fadeIn kiss-height-50vh kiss-flex kiss-flex-middle kiss-flex-center kiss-align-center kiss-color-muted" v-if="fieldTypes && !loading && !items.length">
                <div>
                    <kiss-svg class="kiss-margin-auto" src="<?= $this->base('content:assets/icons/collection.svg') ?>" width="40" height="40"><canvas width="40" height="40"></canvas></kiss-svg>
                    <p class="kiss-size-large kiss-text-bold kiss-margin-small-top"><?= t('No items') ?></p>
                </div>
            </div>

            <div class="table-scroll kiss-margin" ref="tblContainer" v-show="!loading && items.length">
                <table class="kiss-table animated fadeIn" v-if="!loading && items.length">
                    <thead>
                        <tr>
                            <th fixed="left" class="kiss-align-center" width="70">
                                <div class="kiss-flex kiss-flex-middle">
                                    <input class="kiss-checkbox" type="checkbox" @click="toggleAllSelect">
                                    <span class="kiss-margin-small-left">ID</span>
                                </div>
                            </th>
                            <th class="kiss-position-relative kiss-align-center" width="20">
                                <div class="kiss-flex kiss-flex-middle">
                                    <span><?= t('State') ?></span>
                                    <span class="kiss-size-6" v-if="sort._state">
                                        <icon>{{sort._state == 1 ? 'south':'north'}}</icon><span>
                                </div>
                                <a class="kiss-cover" @click="sortItems('_state')"></a>
                            </th>
                            <th class="kiss-position-relative" v-for="field in visibleFields">
                                <div class="kiss-flex kiss-flex-middle">
                                    <span>{{ field.label || field.name}}</span>
                                    <span class="kiss-size-6" v-if="sort[field.name]">
                                        <icon>{{sort[field.name] == 1 ? 'south':'north'}}</icon><span>
                                </div>
                                <a class="kiss-cover" @click="sortItems(field.name)"></a>
                            </th>
                            <th class="kiss-position-relative" width="120">
                                <div class="kiss-flex kiss-flex-middle">
                                    <span><?= t('Modified') ?></span>
                                    <span class="kiss-size-6" v-if="sort._modified">
                                        <icon>{{sort._modified == 1 ? 'south':'north'}}</icon><span>
                                </div>
                                <a class="kiss-cover" @click="sortItems('_modified')"></a>
                            </th>
                            <th class="kiss-position-relative" width="120">
                                <div class="kiss-flex kiss-flex-middle">
                                    <span><?= t('Created') ?></span>
                                    <span class="kiss-size-6" v-if="sort._created">
                                        <icon>{{sort._created == 1 ? 'south':'north'}}</icon><span>
                                </div>
                                <a class="kiss-cover" @click="sortItems('_created')"></a>
                            </th>
                            <th fixed="right" width="20">
                                <a class="kiss-size-4" :class="model.fields.length != visibleFields.length ? 'kiss-color-danger': 'kiss-link-muted'" kiss-popoutmenu="#model-column-options">
                                    <icon>more_horiz</icon>
                                </a>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in items">
                            <td fixed="left" class="kiss-align-center">
                                <div class="kiss-flex kiss-flex-middle">
                                    <input class="kiss-checkbox" type="checkbox" v-model="selected" :value="item._id">
                                    <a class="kiss-badge kiss-link-muted kiss-margin-small-left" :href="$route(`/content/collection/item/${model.name}/${item._id}`)" :title="item._id"><icon>edit</icon>...{{ item._id.substr(-5) }}</a>
                                </div>
                            </td>
                            <td class="kiss-align-center">
                                <icon :class="{'kiss-color-success': item._state === 1, 'kiss-color-danger': !item._state, 'kiss-color-muted': item._state === -1}">trip_origin</icon>
                            </td>
                            <td v-for="field in visibleFields">
                                <span class="kiss-badge kiss-badge-outline kiss-color-muted" v-if="item[field.name] == null">n/a</span>
                                <div class="kiss-text-truncate" v-else-if="fieldTypes[field.type] && fieldTypes[field.type].render" v-html="fieldTypes[field.type].render(item[field.name], field, 'table-cell')"></div>
                                <div class="kiss-text-truncate" v-else>
                                    <span class="kiss-badge kiss-badge-outline" v-if="Array.isArray(item[field.name])">{{ item[field.name].length }}</span>
                                    <span class="kiss-badge kiss-badge-outline" v-else-if="typeof(item[field.name]) == 'object'">Object</span>
                                    <span v-else>{{ item[field.name] }}</span>
                                </div>
                            </td>
                            <td><span class="kiss-flex kiss-badge kiss-badge-outline kiss-color-primary" :title="(new Date(item._modified * 1000).toLocaleString())">{{ (new Date(item._modified * 1000).toLocaleString()) }}</span></td>
                            <td><span class="kiss-flex kiss-badge kiss-badge-outline kiss-color-muted" :title="(new Date(item._created * 1000).toLocaleString())">{{ (new Date(item._created * 1000).toLocaleString()) }}</span></td>
                            <td class="kiss-align-center" fixed="right">
                                <a @click="toggleItemActions(item)">
                                    <icon>more_horiz</icon>
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <teleport to="body">

                <kiss-popoutmenu :open="actionItem && 'true'" @popoutmenuclose="toggleItemActions(null)">
                    <kiss-content>
                        <kiss-navlist v-if="actionItem">
                            <ul>
                                <li class="kiss-nav-header">{{ t('Item actions') }}</li>
                                <li>
                                    <a class="kiss-flex kiss-flex-middle" :href="$route(`/content/collection/item/${model.name}/${actionItem._id}`)">
                                        <icon class="kiss-margin-small-right">create</icon>
                                        <?= t('Edit') ?>
                                    </a>
                                </li>
                                <li class="kiss-nav-divider"></li>
                                <li>
                                    <a class="kiss-color-danger kiss-flex kiss-flex-middle" @click="remove(actionItem)">
                                        <icon class="kiss-margin-small-right">delete</icon>
                                        <?= t('Delete') ?>
                                    </a>
                                </li>
                            </ul>
                        </kiss-navlist>
                    </kiss-content>
                </kiss-popoutmenu>

                <kiss-popoutmenu id="model-column-options" modal="true">
                    <kiss-content>
                        <kiss-navlist class="kiss-margin">
                            <ul>
                                <li class="kiss-nav-header"><?= t('Show Fields') ?></li>
                            </ul>

                            <ul class="kiss-overflow-y-auto" style="max-height:250px;">
                                <li v-for="field in model.fields">
                                    <div class="kiss-flex kiss-flex-middle" :class="field.__visible === false ? 'kiss-color-muted':''">
                                        <div class="kiss-margin-small-right"><input class="kiss-checkbox" type="checkbox" v-model="field.__visible"></div>
                                        <div>{{ field.label || field.name}}</div>
                                    </div>
                                </li>

                            </ul>
                        </kiss-navlist>

                        <button type="button" class="kiss-button kiss-button-small kiss-width-1-1 kiss-margin-small-top" kiss-popoutmenu-close><?= t('Close') ?></button>
                    </kiss-content>
                </kiss-popoutmenu>

            </teleport>

            <app-actionbar>

                <kiss-container>
                    <div class="kiss-flex kiss-flex-middle">
                        <div class="kiss-flex kiss-flex-middle" v-if="!loading && count">
                            <div class="kiss-size-small">{{ `${count} ${count == 1 ? t('Item') : t('Items')}` }}</div>
                            <div class="kiss-margin-small-left kiss-overlay-input">
                                <span class="kiss-badge kiss-badge-outline kiss-color-muted">{{ page }} / {{pages}}</span>
                                <select v-model="page" @change="load(page)" v-if="pages > 1">
                                    <option v-for="p in pages" :value="p">{{ p }}</option>
                                </select>
                            </div>
                            <div class="kiss-margin-small-left kiss-size-small">
                                <a class="kiss-margin-small-right" v-if="(page - 1) >= 1" @click="load(page - 1)"><?= t('Previous') ?></a>
                                <a v-if="(page + 1) <= pages" @click="load(page + 1)"><?= t('Next') ?></a>
                            </div>
                        </div>
                        <div class="kiss-flex-1"></div>
                        <div class="kiss-margin-right" v-if="selected.length">
                            <button class="kiss-button kiss-button-danger" @click="removeSelected()">{{ t('Delete') }} -{{ selected.length }}-</button>
                        </div>
                        <div class="kiss-button-group">
                            <a class="kiss-button" href="<?= $this->route("/content") ?>"><?= t('Close') ?></a>
                            <?php if ($this->helper('acl')->isAllowed("content/{$model['name']}/create")) : ?>
                                <a class="kiss-button kiss-button-primary" href="<?= $this->route("/content/collection/item/{$model['name']}") ?>"><?= t('Create item') ?></a>
                            <?php endif ?>
                        </div>
                    </div>
                </kiss-container>

            </app-actionbar>

        </template>

        <script type="module">
            export default {

                data() {

                    let model = <?= json_encode($model) ?>,
                        hiddenFields = App.session.get(`content.${model.name}.hiddenFields`, []);

                    model.fields.forEach(field => {
                        field.__visible = !hiddenFields.includes(field.name);
                    });

                    return {
                        model,
                        locales: <?= json_encode($locales) ?>,
                        actionItem: null,
                        items: [],
                        selected: [],
                        fieldTypes: null,
                        filter: '',
                        sort: (model.meta && model.meta.sort) || {
                            _created: -1
                        },
                        txtFilter: '',
                        page: 1,
                        pages: 1,
                        limit: 25,
                        count: 0,
                        loading: false,
                        locale: 'default'
                    }
                },

                mounted() {

                    App.utils.import('system:assets/js/settings.js').then(exp => {

                        exp.FieldTypes.get().then(types => {

                            this.fieldTypes = types;

                            let searchParams = new URLSearchParams(location.search);

                            if (searchParams.has('state')) {
                                try {
                                    var q = JSON.parse(atob(searchParams.get('state')));
                                    if (q.sort) this.sort = q.sort;
                                    if (q.page) this.page = q.page;
                                    if (q.limit) this.limit = (parseInt(q.limit) || this.limit);
                                    if (q.filter) {
                                        this.filter = q.filter;
                                        this.txtFilter = q.filter;
                                    }
                                } catch (e) {}
                            }

                            this.load(this.page, false);

                            window.addEventListener('resize', () => this.fixTableContainerWidth());
                        });
                    });
                },

                watch: {
                    filter(val) {
                        this.txtFilter = val;
                        this.load();
                    },

                    'model.fields': {
                        handler() {

                            let hiddenFields = [];

                            this.model.fields.forEach(field => {
                                if (field.__visible === false) hiddenFields.push(field.name);
                            });

                            App.session.set(`content.${this.model.name}.hiddenFields`, hiddenFields);
                        },
                        deep: true
                    },
                    locale() {
                        this.load();
                    }
                },

                computed: {

                    visibleFields() {

                        return this.model.fields.filter(field => {
                            return field.__visible !== false;
                        });
                    }
                },

                methods: {

                    load(page = 1, history = true) {

                        let options = {
                            limit: this.limit,
                            skip: (page - 1) * this.limit,
                            sort: this.sort
                        };

                        let process = {};

                        this.loading = true;
                        this.selected = [];

                        if (this.filter) {
                            options.filter = this.filter;
                        }

                        if (this.locale != 'default') {
                            process.locale = this.locale;
                        }

                        if (history) {

                            window.history.pushState(
                                null, null,
                                App.route(['/content/collection/items/', this.model.name, '?state=', btoa(JSON.stringify({
                                    page: this.page || null,
                                    filter: this.filter || null,
                                    sort: this.sort || null,
                                    limit: this.limit
                                }))].join(''))
                            );
                        }

                        this.$request(`/content/collection/find/${this.model.name}`, {
                            options, process
                        }).then(rsp => {
                            this.items = rsp.items;
                            this.page = rsp.page;
                            this.pages = rsp.pages;
                            this.count = rsp.count;

                            this.loading = false;
                            this.fixTableContainerWidth();
                        })
                    },

                    toggleItemActions(item) {

                        if (!item) {
                            setTimeout(() => this.actionItem = null, 300);
                            return;
                        }

                        this.actionItem = item;
                    },

                    remove(item) {

                        App.ui.confirm('Are you sure?', () => {

                            this.$request(`/content/collection/remove/${this.model.name}`, {
                                ids: [item._id]
                            }).then(res => {
                                this.load(this.page == 1 ? 1 : (this.items.length - 1 ? this.page : this.page - 1));
                                App.ui.notify('Item removed!');
                            });
                        });
                    },

                    removeSelected() {
                        App.ui.confirm('Are you sure?', () => {

                            this.$request(`/content/collection/remove/${this.model.name}`, {
                                ids: this.selected
                            }).then(res => {
                                this.load(this.page == 1 ? 1 : (this.items.length - this.selected.length ? this.page : this.page - 1));
                                App.ui.notify('Items removed!');
                            });
                        });
                    },

                    toggleAllSelect(e) {

                        this.selected = [];

                        if (e.target.checked) {
                            this.items.forEach(item => this.selected.push(item._id));
                        }
                    },

                    sortItems(field) {

                        if (this.sort[field]) {
                            this.sort[field] = this.sort[field] == 1 ? -1 : 1;
                        } else {
                            this.sort = {};
                            this.sort[field] = 1;
                        }

                        this.load();
                    },

                    // fix browser behaviour if table is too long
                    fixTableContainerWidth() {
                        Object.assign(this.$refs.tblContainer.style, {position: 'absolute', opacity: 0});
                        this.$refs.tblContainer.style.maxWidth = this.$refs.tblContainer.parentNode.offsetWidth + 'px';
                        Object.assign(this.$refs.tblContainer.style, {position: '', opacity: ''});
                    }
                }
            }
        </script>


    </vue-view>

</kiss-container>

<kiss-popoutmenu id="model-menu-actions">
    <kiss-content>
        <kiss-navlist class="kiss-margin">
            <ul>
                <li class="kiss-nav-header"><?= t('Model actions') ?></li>
                <li>
                    <a class="kiss-flex kiss-flex-middle" href="<?= $this->route("/content/models/edit/{$model['name']}") ?>">
                        <icon class="kiss-margin-small-right">create</icon>
                        <?= t('Edit') ?>
                    </a>
                </li>
                <li class="kiss-nav-divider"></li>
                <li>
                    <a class="kiss-flex kiss-flex-middle" href="<?= $this->route("/content/collection/item/{$model['name']}") ?>">
                        <icon class="kiss-margin-small-right">add_circle_outline</icon>
                        <?= t('Create item') ?>
                    </a>
                </li>
            </ul>
        </kiss-navlist>
    </kiss-content>
</kiss-popoutmenu>
