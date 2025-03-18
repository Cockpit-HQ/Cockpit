<kiss-container class="kiss-margin-small" size="small">

    <ul class="kiss-breadcrumbs">
        <li><a href="<?= $this->route('/system') ?>"><?= t('Settings') ?></a></li>
        <li><span><?= t('Jobs') ?></span></li>
    </ul>


    <vue-view>
        <template>

            <kiss-grid class="kiss-margin" cols="2 4@m" :class="{'kiss-disabled': loading}" v-if="stats">
                <kiss-card class="kiss-padding kiss-position-relative" :theme="status === 'pending' ? 'contrast bordered-primary' : 'bordered'" :class="{'kiss-color-muted': status !== 'pending'}">

                    <div class="kiss-text-caption kiss-text-bold">Pending</div>
                    <div class="kiss-size-1 kiss-text-monospace kiss-margin-small">{{ stats.pending || 0}}</div>
                    <a class="kiss-cover" @click="status='pending'"></a>

                </kiss-card>
                <kiss-card class="kiss-padding kiss-position-relative" :theme="status === 'completed' ? 'contrast bordered-primary' : 'bordered'" :class="{'kiss-color-muted': status !== 'completed'}">

                    <div class="kiss-text-caption kiss-text-bold">Completed</div>
                    <div class="kiss-size-1 kiss-text-monospace kiss-margin-small">{{ stats.completed || 0}}</div>
                    <a class="kiss-cover" @click="status='completed'"></a>

                </kiss-card>
                <kiss-card class="kiss-padding kiss-position-relative" :theme="status === 'reserved' ? 'contrast bordered-primary' : 'bordered'" :class="{'kiss-color-muted': status !== 'reserved'}">

                    <div class="kiss-text-caption kiss-text-bold">Reserved</div>
                    <div class="kiss-size-1 kiss-text-monospace kiss-margin-small">{{ stats.reserved || 0}}</div>
                    <a class="kiss-cover" @click="status='reserved'"></a>

                </kiss-card>
                <kiss-card class="kiss-padding kiss-position-relative" :theme="status === 'failed' ? 'contrast bordered-primary' : 'bordered'" :class="{'kiss-color-muted': status !== 'failed'}">

                    <div class="kiss-text-caption kiss-text-bold">Failed</div>
                    <div class="kiss-size-1 kiss-text-monospace kiss-margin-small">{{ stats.failed || 0}}</div>
                    <a class="kiss-cover" @click="status='failed'"></a>

                </kiss-card>
            </kiss-grid>

            <div class="animated fadeIn kiss-height-50vh kiss-flex kiss-flex-middle kiss-flex-center kiss-align-center kiss-color-muted" v-if="loading">
                <app-loader></app-loader>
            </div>


            <div class="animated fadeIn kiss-height-50vh kiss-flex kiss-flex-middle kiss-flex-center kiss-align-center kiss-color-muted" v-if="!loading && !jobs.length">
                <div>
                    <icon class="kiss-size-xlarge">playlist_play</icon>
                    <p class="kiss-size-large"><?=t('No jobs')?></p>
                </div>
            </div>

            <div class="kiss-margin-large" v-if="!loading && jobs.length">

                <div class="kiss-flex kiss-flex-middle" gap="small">
                    <icon class="kiss-size-4">playlist_play</icon>
                    <div class="kiss-text-caption kiss-text-bold">Jobs</div>
                </div>

                <kiss-card class="kiss-padding-small kiss-flex kiss-flex-middle kiss-margin-small" theme="contrast shadowed" hover="bordered-primary" gap="small" v-for="job in jobs" :key="job._id">
                    <icon>{{ icons[status] }}</icon>
                    <a class="kiss-link-muted kiss-flex-1 kiss-size-small" @click="showJob(job)">{{ job.data.job }}</a>
                    <app-datetime class="kiss-size-xsmall kiss-text-monospace" :datetime="job.created_at"></app-datetime>
                </kiss-card>

            </div>

            <app-actionbar :class="{'kiss-disablede': loading}">

                    <kiss-container class="kiss-flex kiss-flex-middle" gap size="small">
                        <app-pagination class="kiss-flex" gap="small" v-if="page > 1 || jobs.length === limit">
                            <a v-if="(page - 1) >= 1" @click="load(page - 1)"><?= t('Previous') ?></a>
                            <a v-if="jobs.length === limit" @click="load(page + 1)"><?= t('Next') ?></a>
                        </app-pagination>
                        <div class="kiss-flex-1"></div>
                        <button type="button" class="kiss-button" @click="load(page)"><?=t('Reload')?></button>
                    </kiss-container>
            </app-actionbar>

        </template>

        <script type="module">

            export default {

                data() {
                    return {
                        status: 'pending',
                        loading: true,
                        stats: null,
                        jobs: [],

                        icons: {
                            'pending': 'work',
                            'completed': 'check',
                            'reserved': 'clock',
                            'failed': 'close'
                        },

                        page: 1,
                        limit: 25,
                    }
                },

                mounted() {
                    this.load();
                },

                watch: {
                    status() {
                        this.load();
                    }
                },

                methods: {

                    load(page = 1) {

                        this.loading = true;
                        this.page = page;

                        this.$request('/system/jobs/load', {
                            status: this.status,
                            limit: this.limit,
                            skip: (page - 1) * this.limit,
                        }).then(rsp => {
                            this.stats = rsp.stats;
                            this.jobs = rsp.jobs;
                        }).catch(err => {

                        }).finally(() => {
                            this.loading = false;
                        });

                    },

                    showJob(job) {
                        VueView.ui.offcanvas('system:assets/dialogs/json-viewer.js', {
                            caption: 'Job',
                            data: job
                        }, {}, {flip: true, size: 'large'})
                    }
                }
            }

        </script>
    </vue-view>

</kiss-container>
