<kiss-container class="kiss-margin-large" size="medium">

    <vue-view>

        <template>


            <app-loader v-if="loading === null"></app-loader>

            <div class="animated fadeIn kiss-height-50vh kiss-flex kiss-flex-middle kiss-flex-center kiss-align-center kiss-color-muted" v-if="pages && !pages.length">
                <div>
                    <kiss-svg :src="$base('pages:icon.svg')" width="40" height="40"><canvas width="40" height="40"></canvas></kiss-svg>
                    <p class="kiss-size-large kiss-text-bold kiss-margin-small-top"><?=t('No pages')?></p>
                </div>
            </div>

            <div v-if="Array.isArray(pages) && pages.length">
                <pages-tree :pages="pages"></pages-tree>
            </div>

        </template>

        <script type="module">

            export default {

                data() {
                    return {
                        pages: null,
                        loading: false
                    }
                },

                mounted() {
                    this.load();
                },

                components: {
                    'pages-tree': 'pages:assets/vue-components/pages-tree.js',
                },

                methods: {

                    load(pid = null) {

                        this.loading = pid;

                        this.$request('/pages/load', {_pid:{}}).then(pages => {

                            this.pages = pages;
                            this.loading = false;
                        }).catch(res => {
                            this.loading = false;
                            App.ui.notify(res.error || 'Loading failed!', 'error');
                        });
                    },
                }
            }

        </script>

    </vue-view>

</kiss-container>

<app-actionbar>
    <kiss-container size="medium">
        <div class="kiss-flex kiss-flex-middle kiss-flex-right">

            <a class="kiss-button kiss-button-primary" href="<?=$this->route('/pages/page')?>">
                <?=t('Create page')?>
            </a>
        </div>
    </kiss-container>
</app-actionbar>