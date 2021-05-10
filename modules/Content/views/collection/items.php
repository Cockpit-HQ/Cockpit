
<kiss-container class="kiss-margin">

    <ul class="kiss-breadcrumb">
        <li><a href="<?=$this->route('/content')?>"><?=t('Content')?></a></li>
    </ul>

    <div class="kiss-flex kiss-flex-middle kiss-margin-large-bottom">
        <div class="kiss-margin-small-right">
            <kiss-svg class="kiss-margin-auto" src="<?=$this->base('content:assets/icons/collection.svg')?>" width="35" height="35" style="color:<?=($this->escape($model['color'] ?? 'inherit'))?>"><canvas width="35" height="35"></canvas></kiss-svg>
        </div>
        <div class="kiss-margin-small-right">
            <div class="kiss-size-large kiss-text-bold"><?=$this->escape($model['label'] ? $model['label'] : $model['name'])?></div>
        </div>
        <div>
            <a class="kiss-size-large" kiss-popoutmenu="#model-menu-actions"><icon>more_horiz</icon></a>
        </div>
    </div>

    <vue-view>

        <template>


            <app-loader v-if="loading"></app-loader>

            <div class="animated fadeIn kiss-height-50vh kiss-flex kiss-flex-middle kiss-flex-center kiss-align-center kiss-color-muted" v-if="!loading && !items.length">
                <div>
                    <kiss-svg class="kiss-margin-auto" src="<?=$this->base('content:assets/icons/collection.svg')?>" width="35" height="35"><canvas width="35" height="35"></canvas></kiss-svg>
                    <p class="kiss-size-large kiss-text-bold"><?=t('No items')?></p>
                </div>
            </div>


            <table class="kiss-table kiss-margin-large animated fadeIn" v-if="!loading && items.length">
                <thead>
                    <tr>
                        <th width="20"><input class="kiss-checkbox" type="checkbox"></th>
                        <th width="50">ID</th>
                        <th></th>
                        <th width="120"><?=t('Modified')?></th>
                    </tr>
                    <tbody>
                        <tr v-for="item in items">
                            <td><input class="kiss-checkbox" type="checkbox"></td>
                            <td><a class="kiss-badge kiss-link-muted" :href="$route(`/content/collection/item/${model.name}/${item._id}`)" :title="item._id">...{{ item._id.substr(-5) }}</a></td>
                            <td></td>
                            <td><span class="kiss-flex kiss-badge kiss-badge-outline kiss-color-primary">{{ (new Date(item._modified * 1000).toLocaleString()) }}</span></td>

                        </tr>
                    </tbody>
                </thead>
            </table>


            <app-actionbar>

                <kiss-container>
                    <div class="kiss-flex kiss-flex-middle">
                        <div class="kiss-flex kiss-flex-middle" v-if="!loading && count">
                            <div class="kiss-size-small">{{ `${count} ${count == 1 ? t('Item') : t('Items')}` }}</div>
                            <div class="kiss-margin-left kiss-overlay-input">
                                <span class="kiss-badge kiss-badge-outline kiss-color-muted">{{ page }} / {{pages}}</span>
                                <select v-model="page" @change="load(page)"><option v-for="p in pages" :value="p">{{ p }}</option></select>
                            </div>
                            <div class="kiss-margin-small-left kiss-size-small">
                                <a class="kiss-margin-small-right" v-if="(page - 1) >= 1" @click="load(page - 1)"><?=t('Previous')?></a>
                                <a v-if="(page + 1) <= pages" @click="load(page + 1)"><?=t('Next')?></a>
                            </div>
                        </div>
                        <div class="kiss-flex-1"></div>
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
                        items: [],
                        page: 1,
                        pages: 1,
                        limit: 25,
                        count: 0,
                        loading: false
                    }
                },

                mounted() {
                    this.load();
                },

                methods: {

                    load(page = 1) {

                        let options = {
                            limit: this.limit,
                            skip: (page - 1) * this.limit,
                        };

                        this.loading = true;

                        this.$request(`/content/collection/find/${this.model.name}`, {options}).then(resp => {
                            this.items = resp.items;
                            this.page = resp.page;
                            this.pages = resp.pages;
                            this.count = resp.count;

                            this.loading = false;
                        })
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
                <li class="kiss-nav-header"><?=t('Actions')?></li>
                <li>
                    <a class="kiss-flex kiss-flex-middle" href="<?=$this->route("/content/models/edit/{$model['name']}")?>">
                        <icon class="kiss-margin-small-right">create</icon>
                        <?=t('Edit')?>
                    </a>
                </li>
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
