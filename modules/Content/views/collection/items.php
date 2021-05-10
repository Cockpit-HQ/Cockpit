
<kiss-container class="kiss-margin">

    <ul class="kiss-breadcrumb">
        <li><a href="<?=$this->route('/content')?>"><?=t('Content')?></a></li>
    </ul>

    <div class="kiss-flex kiss-flex-middle">
        <div class="kiss-margin-right">
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
                        limit: 20,
                        count: 0,
                        loading: false
                    }
                },

                mounted() {
                    this.load();
                },

                methods: {

                    load() {

                        let options = {
                            limit: this.limit,
                            page: this.page
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

    <app-actionbar>

        <kiss-container>
            <div class="kiss-flex kiss-flex-middle">
                <div class="kiss-flex-1"></div>
                <div class="kiss-button-group">
                    <a class="kiss-button" href="<?=$this->route("/content")?>"><?=t('Close')?></a>
                    <a class="kiss-button kiss-button-primary" href="<?=$this->route("/content/collection/item/{$model['name']}")?>"><?=t('Create item')?></a>
                </div>
            </div>
        </kiss-container>

    </app-actionbar>

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
