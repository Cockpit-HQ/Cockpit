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

                <vue-draggable v-model="pages" handle=".fm-handle">
                    <template #item="{ element }">
                        <kiss-card class="kiss-padding-small kiss-flex kiss-flex-middle kiss-margin-small" theme="bordered contrast">
                            <a class="fm-handle kiss-margin-small-right kiss-color-muted"><icon>drag_handle</icon></a>
                            <div class="kiss-margin-small-right">
                                <icon :class="{'kiss-color-danger': !element._state, 'kiss-color-success': element._state === 1}">circle</icon>
                            </div>
                            <div class="kiss-flex-1"><a class="kiss-link-muted" :href="$route(`/pages/page/${element._id}`)">{{ element.title }}</a></div>
                            <a class="kiss-margin-small-left kiss-color-danger" @click="remove(element)"><icon>delete</icon></a>
                        </kiss-card>
                    </template>
                </vue-draggable>

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

                    remove(page) {

                        App.ui.confirm('Are you sure?', () => {

                            this.$request('/pages/remove', {page}).then(res => {
                                this.pages.splice(this.pages.indexOf(page), 1);
                            }).catch(res => {
                                App.ui.notify(res.error || 'Page removing failed!', 'error');
                            });
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