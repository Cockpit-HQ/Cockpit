<kiss-container class="kiss-margin-small">

    <ul class="kiss-breadcrumbs">
        <li><a href="<?= $this->route('/content') ?>"><?= t('Content') ?></a></li>
    </ul>

    <vue-view>

        <template>

            <div class="kiss-flex kiss-flex-middle kiss-margin-bottom">
                <div class="kiss-margin-small-right">
                    <kiss-svg class="kiss-margin-auto" src="<?= $this->base(isset($model['icon']) && $model['icon'] ? $model['icon'] : 'content:assets/icons/tree.svg') ?>" width="30" height="30" style="color:<?= ($this->escape($model['color'] ?? 'inherit')) ?>"><canvas width="30" height="30"></canvas></kiss-svg>
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
                    <a class="kiss-size-large" kiss-popout="#model-menu-actions">
                        <icon>more_horiz</icon>
                    </a>
                </div>
            </div>

            <form class="kiss-flex kiss-margin" :class="{'kiss-disabled': loading}" @submit.prevent="filter = txtFilter">

                <input type="text" class="kiss-input kiss-flex-1 kiss-margin-xsmall-right" :placeholder="t('Filter items...')" v-model="txtFilter">

                <div class="kiss-button-group kiss-margin-small-left">
                    <button type="button" class="kiss-button" @click="filter = ''" v-if="filter"><?=t('Reset')?></button>
                    <button class="kiss-button kiss-flex"><?=t('Search')?></button>
                </div>
            </form>

            <div class="animated fadeIn kiss-height-50vh kiss-flex kiss-flex-middle kiss-flex-center kiss-align-center kiss-color-muted" v-if="!loading && Array.isArray(items) && !items.length">
                <div>
                    <kiss-svg class="kiss-margin-auto" src="<?= $this->base('content:assets/icons/tree.svg') ?>" width="40" height="40"><canvas width="40" height="40"></canvas></kiss-svg>
                    <p class="kiss-size-large kiss-text-bold kiss-margin-small-top"><?=t('No items')?></p>
                </div>
            </div>

            <div class="kiss-margin" v-if="!loading && filter && Array.isArray(items) && items.length">

                <div class="kiss-margin kiss-text-caption kiss-color-muted"><?=t('Filtered items')?>:</div>

                <div class="kiss-margin-xsmall" v-for="item in items">
                    <kiss-card class="kiss-padding-small kiss-flex kiss-flex-middle kiss-margin-xsmall" theme="bordered contrast">
                        <div class="kiss-position-relative kiss-flex-1">
                            <tree-item :model="model" :item="item"></tree-item>
                            <a class="kiss-cover" :href="$route('/content/tree/item/'+model.name+'/'+item._id)"></a>
                        </div>
                        <a class="kiss-margin-small-left" @click="createItem(item._id)"><icon>create_new_folder</icon></a>
                        <a class="kiss-margin-small-left kiss-color-danger" @click="remove(item)"><icon>delete</icon></a>
                    </kiss-card>
                </div>
            </div>

            <div v-if="loading !== true && (!filter) && Array.isArray(items) && items.length">
                <items-tree :model="model" :items="items" :locale="locale" :allow-moving="allowMoving"></items-tree>
            </div>

            <app-loader v-if="loading === null || loading === true"></app-loader>

            <teleport to="body">

                <app-actionbar>
                    <kiss-container>
                        <div class="kiss-flex kiss-flex-middle kiss-flex-right">
                            <div class="kiss-button-group">
                                <a class="kiss-button" href="<?= $this->route('/content') ?>"><?=t('Close')?></a>
                                <a class="kiss-button kiss-button-primary" href="<?= $this->route("/content/tree/item/{$model['name']}") ?>"><?=t('Create item')?></a>
                            </div>
                        </div>
                    </kiss-container>
                </app-actionbar>
            </teleport>

        </template>

        <script type="module">

            export default {

                data() {
                    return {
                        model: <?= json_encode($model) ?>,
                        allowMoving: <?=($allowMoving ? 'true' : 'false')?>,
                        items: null,
                        loading: true,
                        filter: '',
                        txtFilter: '',
                        locale: 'default',
                    }
                },

                mounted() {

                    this.load();
                },

                components: {
                    'items-tree': 'content:assets/vue-components/items-tree.js',
                    'tree-item': 'content:assets/vue-components/tree-item.js',
                },

                watch: {
                    filter(val) {
                        this.txtFilter = val;

                        if (val) {
                            this.find();
                        } else {
                            this.load();
                        }
                    },
                    locale() {

                        if (this.filter) {
                            this.find();
                        } else {
                            this.load();
                        }
                    }
                },

                methods: {

                    load(pid = null) {

                        this.loading = pid;

                        let params = {
                            _pid: {}
                        };

                        if (this.locale != 'default') {
                            params.locale = this.locale;
                        }

                        this.$request(`/content/tree/load/${this.model.name}`, params).then(items => {
                            this.items = items;
                            this.loading = false;
                        }).catch(res => {
                            this.loading = false;
                            App.ui.notify(res.error || 'Loading failed!', 'error');
                        });
                    },

                    find() {

                        let options = {
                            filter: this.filter,
                            limit: 20
                        };

                        if (this.locale != 'default') {
                            options.locale = this.locale;
                        }

                        this.loading = true;

                        this.$request(`/content/collection/find/${this.model.name}`, {options}).then(res => {
                            this.items = res.items;
                            this.loading = false;
                        }).catch(res => {
                            this.loading = false;
                            App.ui.notify(res.error || 'Loading failed!', 'error');
                        });
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
                    }
                }
            }

        </script>

    </vue-view>

</kiss-container>

<kiss-popout id="model-menu-actions">
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
                    <a class="kiss-flex kiss-flex-middle" href="<?= $this->route("/content/tree/item/{$model['name']}") ?>">
                        <icon class="kiss-margin-small-right">add_circle_outline</icon>
                        <?= t('Create item') ?>
                    </a>
                </li>
            </ul>
        </kiss-navlist>
    </kiss-content>
</kiss-popout>
