<?php

    $handlers = new ArrayObject([]);
    $this->trigger('worker.handlers.collect', [$handlers]);
    $handlers = array_keys($handlers->getArrayCopy());

?>

<kiss-container class="kiss-margin-small" size="small">

    <ul class="kiss-breadcrumbs">
        <li><a href="<?= $this->route('/system') ?>"><?= t('System') ?></a></li>
    </ul>

    <div class="kiss-margin-large-bottom kiss-flex kiss-flex-middle" gap="small">
        <div class="kiss-size-4"><strong><?= t('Worker') ?></strong></div>
        <span class="kiss-badge">BETA</span>
    </div>


    <vue-view>
        <template>

            <div class="kiss-margin-large animated fadeIn" v-if="stats && workers">

                <div class="kiss-text-caption kiss-text-bold" :class="{'kiss-color-muted': !workers.length}"><?=t('Active workers')?></div>

                <kiss-card class="kiss-padding kiss-margin-small kiss-size-small kiss-color-muted" theme="contrast" v-if="!workers.length">
                    <?=t('No active workers')?>
                </kiss-card>

                <table class="kiss-table kiss-margin-small" v-if="workers.length">
                    <thead>
                        <tr>
                            <th width="20"></th>
                            <th width="120">PID</th>
                            <th><?=t('Mode')?></th>
                            <th class="kiss-align-right"><?=t('Start')?></th>
                            <?php if ($canStopProcess): ?>
                            <th width="20"></th>
                            <?php endif; ?>
                        </tr>
                    </thead>
                    <tbody class="kiss-text-monospace">
                        <tr v-for="w in workers">
                            <td><icon :class="{'kiss-color-success': w.alive === true, 'kiss-color-danger': w.alive === false, 'kiss-color-warning': w.alive === null}">circle</icon></td>
                            <td><div class="kiss-size-xsmall kiss-text-bold">{{ w.pid }}</div></td>
                            <td><div class="kiss-size-xsmall">{{ w.mode }}</div></td>
                            <td class="kiss-align-right"><div class="kiss-size-xsmall"><app-datetime type="relative" :datetime="w.start"></app-datetime></div></td>
                            <?php if ($canStopProcess): ?>
                            <td><a @click="stopWorker(w.pid)" :title="t('Stop Worker')" v-if="w.alive"><icon class="kiss-size-4">stop_circle</icon></a></td>
                            <?php endif; ?>
                        </tr>
                    </tbody>
                </table>

            </div>

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

            <form class="kiss-flex kiss-flex-middle" gap="small" @submit.prevent="load()" :class="{'kiss-disabled': loading}" v-if="stats">

                <app-textcomplete class="kiss-flex-1 kiss-margin-xsmall-right" :items="handlers" trigger="@">
                    <input type="text" class="kiss-input" :placeholder="t('Filter jobs...')" v-model="filter">
                </app-textcomplete>

                <div class="kiss-button-group">
                    <button type="button" class="kiss-button" @click="() => {filter = ''; load()}" v-if="filter"><?= t('Reset') ?></button>
                    <button class="kiss-button kiss-flex"><?= t('Search') ?></button>
                </div>

            </form>

            <div class="animated fadeIn kiss-height-50vh kiss-flex kiss-flex-middle kiss-flex-center kiss-align-center kiss-color-muted" v-if="loading">
                <app-loader></app-loader>
            </div>

            <div class="animated fadeIn kiss-height-50vh kiss-flex kiss-flex-middle kiss-flex-center kiss-align-center kiss-color-muted" v-if="!loading && !jobs.length">
                <div>
                    <kiss-svg src="<?=$this->baseUrl('system:assets/icons/queue.svg')?>" width="40" height="40"></kiss-svg>
                    <p class="kiss-size-large kiss-margin-small"><?=t('No jobs')?></p>
                </div>
            </div>

            <div class="kiss-margin-large" v-if="!loading && jobs.length">

                <div class="kiss-flex kiss-flex-middle" gap="small">
                    <icon class="kiss-size-4">playlist_play</icon>
                    <div class="kiss-text-caption kiss-text-bold">Jobs</div>
                </div>

                <kiss-card class="kiss-padding-small kiss-flex kiss-flex-middle kiss-margin-small" theme="contrast shadowed" hover="bordered-primary" gap="small" v-for="job in jobs" :key="job._id">
                    <icon>{{ icons[status] }}</icon>
                    <a class="kiss-link-muted kiss-flex-1 kiss-size-small kiss-text-monospace" @click="showJob(job)">{{ job.data.job }}</a>
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
                        handlers: <?=json_encode($handlers)?>,
                        loading: true,
                        stats: null,
                        workers: null,
                        jobs: [],

                        icons: {
                            'pending': 'work',
                            'completed': 'check',
                            'reserved': 'lock',
                            'failed': 'close'
                        },

                        filter: '',

                        page: 1,
                        limit: 25,
                    }
                },

                mounted() {

                    this.load();

                    this.$el.parentElement.addEventListener('textcomplete-select', (e) => {
                        this.filter = e.detail.newValue;
                    });
                },

                watch: {
                    status() {
                        this.load();
                    },
                },

                methods: {

                    load(page = 1) {

                        this.loading = true;
                        this.page = page;

                        this.$request('/system/worker/load', {
                            filter: this.filter.trim(),
                            status: this.status,
                            limit: this.limit,
                            skip: (page - 1) * this.limit,
                        }).then(rsp => {
                            this.stats = rsp.stats;
                            this.workers = rsp.workers || null;
                            this.jobs = rsp.jobs;
                        }).catch(err => {

                        }).finally(() => {
                            this.loading = false;
                        });

                    },

                    stopWorker(pid) {

                        App.ui.confirm('Are you sure you want to stop this worker?', () => {

                            this.$request('/system/worker/stop', {pid}).then(rsp => {

                                if (rsp?.success) {
                                    this.workers = this.workers.filter(w => w.pid !== pid);
                                    App.ui.notify('Worker stopped', 'success');
                                } else {
                                    App.ui.notify('Stop worker failed', 'error');
                                }

                            }).catch(err => {
                                App.ui.notify(err?.message || 'Stop worker failed', 'error');
                            });
                        });
                    },

                    showJob(job) {
                        VueView.ui.offcanvas('system:assets/dialogs/json-viewer.js', {
                            caption: 'Job',
                            data: job
                        });
                    }
                }
            }

        </script>
    </vue-view>

</kiss-container>
