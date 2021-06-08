<kiss-container class="kiss-margin-small">

    <ul class="kiss-breadcrumbs">
        <li><a href="<?=$this->route('/content')?>"><?=t('Content')?></a></li>
    </ul>

    <div class="kiss-flex kiss-flex-middle kiss-margin-large-bottom">
        <div class="kiss-margin-small-right">
            <kiss-svg class="kiss-margin-auto" src="<?=$this->base('content:assets/icons/collection.svg')?>" width="25" height="25" style="color:<?=($this->escape($model['color'] ?? 'inherit'))?>"><canvas width="35" height="35"></canvas></kiss-svg>
        </div>
        <div class="kiss-margin-small-right">
            <div class="kiss-size-5 kiss-text-bold"><?=$this->escape($model['label'] ? $model['label'] : $model['name'])?></div>
        </div>
        <div>
            <a class="kiss-size-large" kiss-popoutmenu="#model-menu-actions"><icon>more_horiz</icon></a>
        </div>
    </div>

    <vue-view>

        <template>

            <app-loader v-if="!fieldTypes || loading"></app-loader>

            <div class="animated fadeIn kiss-height-50vh kiss-flex kiss-flex-middle kiss-flex-center kiss-align-center kiss-color-muted" v-if="fieldTypes && !loading && !items.length">
                <div>
                    <kiss-svg class="kiss-margin-auto" src="<?=$this->base('content:assets/icons/collection.svg')?>" width="40" height="40"><canvas width="40" height="40"></canvas></kiss-svg>
                    <p class="kiss-size-large kiss-text-bold kiss-margin-small-top"><?=t('No items')?></p>
                </div>
            </div>

            <table class="kiss-table kiss-margin-large animated fadeIn" v-if="!loading && items.length">
                <thead>
                    <tr>
                        <th class="kiss-align-center" width="20"><input class="kiss-checkbox" type="checkbox" @click="toggleAllSelect"></th>
                        <th width="50">ID</th>
                        <th width="20">State</th>
                        <th v-for="field in model.fields">{{ field.label || field.name}}</th>
                        <th width="120"><?=t('Modified')?></th>
                        <th width="20"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in items">
                        <td class="kiss-align-center"><input class="kiss-checkbox" type="checkbox" v-model="selected" :value="item._id"></td>
                        <td><a class="kiss-badge kiss-link-muted" :href="$route(`/content/collection/item/${model.name}/${item._id}`)" :title="item._id">...{{ item._id.substr(-5) }}</a></td>
                        <td class="kiss-align-center"><icon :class="{'kiss-color-success': item._state === 1, 'kiss-color-danger': !item._state}">trip_origin</icon></td>
                        <td v-for="field in model.fields">
                            <span class="kiss-badge kiss-badge-outline kiss-color-muted" v-if="item[field.name] == null">n/a</span>
                            <div class="kiss-text-truncate" v-else-if="fieldTypes[field.type] && fieldTypes[field.type].render" v-html="fieldTypes[field.type].render(item[field.name], field, 'table')"></div>
                            <div class="kiss-text-truncate" v-else>
                                <span class="kiss-badge kiss-badge-outline" v-if="Array.isArray(item[field.name])">{{ item[field.name].length }}</span>
                                <span class="kiss-badge kiss-badge-outline" v-else-if="typeof(item[field.name]) == 'object'">Object</span>
                                <span v-else>{{ item[field.name] }}</span>
                            </div>
                        </td>
                        <td><span class="kiss-flex kiss-badge kiss-badge-outline kiss-color-primary">{{ (new Date(item._modified * 1000).toLocaleString()) }}</span></td>
                        <td>
                            <a @click="toggleItemActions(item)"><icon>more_horiz</icon></a>
                        </td>
                    </tr>
                </tbody>
            </table>

            <kiss-popoutmenu :open="actionItem && 'true'" @popoutmenuclose="toggleItemActions(null)">
                <kiss-content>
                        <kiss-navlist v-if="actionItem">
                            <ul>
                                <li class="kiss-nav-header">{{ t('Item actions') }}</li>
                                <li>
                                    <a class="kiss-flex kiss-flex-middle" :href="$route(`/content/collection/item/${model.name}/${actionItem._id}`)">
                                        <icon class="kiss-margin-small-right">create</icon>
                                        <?=t('Edit')?>
                                    </a>
                                </li>
                                <li class="kiss-nav-divider"></li>
                                <li>
                                    <a class="kiss-color-danger kiss-flex kiss-flex-middle" @click="remove(actionItem)">
                                        <icon class="kiss-margin-small-right">delete</icon>
                                        <?=t('Delete')?>
                                    </a>
                                </li>
                            </ul>
                        </kiss-navlist>
                </kiss-content>
            </kiss-popoutmenu>

            <app-actionbar>

                <kiss-container>
                    <div class="kiss-flex kiss-flex-middle">
                        <div class="kiss-flex kiss-flex-middle" v-if="!loading && count">
                            <div class="kiss-size-small">{{ `${count} ${count == 1 ? t('Item') : t('Items')}` }}</div>
                            <div class="kiss-margin-small-left kiss-overlay-input">
                                <span class="kiss-badge kiss-badge-outline kiss-color-muted">{{ page }} / {{pages}}</span>
                                <select v-model="page" @change="load(page)" v-if="pages > 1"><option v-for="p in pages" :value="p">{{ p }}</option></select>
                            </div>
                            <div class="kiss-margin-small-left kiss-size-small">
                                <a class="kiss-margin-small-right" v-if="(page - 1) >= 1" @click="load(page - 1)"><?=t('Previous')?></a>
                                <a v-if="(page + 1) <= pages" @click="load(page + 1)"><?=t('Next')?></a>
                            </div>
                        </div>
                        <div class="kiss-flex-1"></div>
                        <div class="kiss-margin-right" v-if="selected.length">
                            <button class="kiss-button kiss-button-danger" @click="removeSelected()">{{ t('Delete') }} -{{ selected.length }}-</button>
                        </div>
                        <div class="kiss-button-group">
                            <a class="kiss-button" href="<?=$this->route("/content")?>"><?=t('Close')?></a>
                            <a class="kiss-button kiss-button-primary" href="<?=$this->route("/content/collection/item/{$model['name']}")?>"><?=t('Create item')?></a>
                        </div>
                    </div>
                </kiss-container>

            </app-actionbar>

        </template>

        <script type="module">

            export default {
                data() {
                    return {
                        model: <?=json_encode($model)?>,
                        locales: <?=json_encode($locales)?>,
                        actionItem: null,
                        items: [],
                        selected: [],
                        fieldTypes: null,
                        page: 1,
                        pages: 1,
                        limit: 25,
                        count: 0,
                        loading: false
                    }
                },

                mounted() {

                    App.utils.import('settings:assets/js/settings.js').then(exp => {

                        exp.FieldTypes.get().then(types => {
                            this.fieldTypes = types;
                            this.load();
                        });
                    });
                },

                methods: {

                    load(page = 1) {

                        let options = {
                            limit: this.limit,
                            skip: (page - 1) * this.limit,
                        };

                        this.loading = true;
                        this.selected = [];

                        this.$request(`/content/collection/find/${this.model.name}`, {options}).then(rsp => {
                            this.items = rsp.items;
                            this.page = rsp.page;
                            this.pages = rsp.pages;
                            this.count = rsp.count;

                            this.loading = false;
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

                            this.$request(`/content/collection/remove/${this.model.name}`, {ids: [item._id]}).then(res => {
                                this.load(this.page == 1 ? 1 : (this.items.length - 1 ? this.page : this.page - 1));
                                App.ui.notify('Item removed!');
                            });
                        });
                    },

                    removeSelected() {
                        App.ui.confirm('Are you sure?', () => {

                            this.$request(`/content/collection/remove/${this.model.name}`, {ids: this.selected}).then(res => {
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
                <li class="kiss-nav-header"><?=t('Model actions')?></li>
                <li>
                    <a class="kiss-flex kiss-flex-middle" href="<?=$this->route("/content/models/edit/{$model['name']}")?>">
                        <icon class="kiss-margin-small-right">create</icon>
                        <?=t('Edit')?>
                    </a>
                </li>
                <li class="kiss-nav-divider"></li>
                <li>
                    <a class="kiss-flex kiss-flex-middle" href="<?=$this->route("/content/collection/item/{$model['name']}")?>">
                        <icon class="kiss-margin-small-right">add_circle_outline</icon>
                        <?=t('Create item')?>
                    </a>
                </li>
            </ul>
        </kiss-navlist>
    </kiss-content>
</kiss-popoutmenu>
