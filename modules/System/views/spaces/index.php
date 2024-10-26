<?php

    $isFinderAvailable = $this->module('finder') && !$this->retrieve('finder.disabled', false) && $this->helper('acl')->isSuperAdmin();

?><kiss-container class="kiss-margin-small">

    <ul class="kiss-breadcrumbs">
        <li><a href="<?=$this->route('/system')?>"><?=t('Settings')?></a></li>
    </ul>

    <vue-view>

        <template>

            <div class="kiss-margin-large-bottom kiss-flex kiss-flex-middle">
                <span class="kiss-size-4 kiss-text-bold"><?=t('Spaces')?></span>
                <span class="kiss-badge kiss-margin-small-left">BETA</span>

                <div class="kiss-flex-1"></div>

                <?php if ($isFinderAvailable): ?>
                <button class="kiss-button kiss-button-blank kiss-margin-left kiss-padding-remove-horizontal" type="button" @click="openFinder()">
                    <icon class="kiss-margin-small-right">folder</icon>
                    {{ t('Open Finder') }}
                </button>
                <?php endif ?>
            </div>

            <app-loader v-if="loading"></app-loader>

            <div class="animated fadeIn kiss-height-50vh kiss-flex kiss-flex-middle kiss-flex-center kiss-align-center kiss-color-muted" v-if="spaces && !spaces.length">
                <div>
                    <kiss-svg :src="$baseUrl('system:assets/icons/spaces.svg')" width="40" height="40"></kiss-svg>
                    <p class="kiss-size-large kiss-margin-small-top"><?=t('No spaces')?></p>
                </div>
            </div>

            <div v-if="spaces && spaces.length">

                <div class="kiss-margin">
                    <input type="text" class="kiss-input" :placeholder="t('Filter spaces...')" v-model="filter">
                </div>

                <div class="animated fadeIn kiss-height-50vh kiss-flex kiss-flex-middle kiss-flex-center kiss-align-center kiss-color-muted" v-if="!filtered.length">
                    <div>
                        <kiss-svg :src="$baseUrl('system:assets/icons/spaces.svg')" width="40" height="40"></kiss-svg>
                        <p class="kiss-size-large kiss-margin-small-top"><?=t('No spaces')?></p>
                    </div>
                </div>

                <kiss-grid cols="4@m 5@xl">
                    <kiss-card class="kiss-flex kiss-flex-middle animated fadeIn" theme="shadowed contrast" hover="shadow bordered-primary" v-for="space in filtered">
                        <div class="kiss-position-relative kiss-padding-small kiss-bgcolor-contrast">
                            <canvas width="40" height="40"></canvas>
                            <div class="kiss-cover kiss-flex kiss-flex-middle kiss-flex-center">
                                <div><kiss-svg :src="$baseUrl('system:assets/icons/spaces.svg')" width="30" height="30"></kiss-svg></div>
                            </div>
                            <a class="kiss-cover" :href="space.url" target="_blank" rel="noopener noreferrer"></a>
                        </div>
                        <div class="kiss-padding-small kiss-margin-small-left kiss-flex-1">
                            <a class="kiss-text-bold kiss-link-muted" :href="space.url" target="_blank" rel="noopener noreferrer">{{ space.name}}</a>
                        </div>
                        <div class="kiss-padding-small kiss-margin-small-left">
                            <a @click="togglespaceActions(space)"><icon>more_horiz</icon></a>
                        </div>
                    </kiss-card>
                </kiss-grid>

            </div>

            <app-actionbar>

                <kiss-container>
                    <div class="kiss-flex kiss-flex-middle">
                        <div v-if="groups.length">
                            <span class="kiss-text-caption kiss-color-muted"><?= t('Group') ?></span>
                            <div class="kiss-margin-xsmall-top kiss-display-block kiss-overlay-input">
                                <div class="kiss-size-4" :class="{'kiss-color-muted': !group, 'kiss-text-bold': group}">{{ group || t('All groups') }}</div>
                                <select v-model="group">
                                    <option :value="null">{{t('All')}}</option>
                                    <option :selected="group == name" v-for="name in groups">{{ name }}</option>
                                </select>
                            </div>
                        </div>
                        <div class="kiss-flex-1"></div>
                        <a class="kiss-button kiss-button-primary" href="<?=$this->route('/system/spaces/create')?>"><?=t('Create space')?></a>
                    </div>
                </kiss-container>

            </app-actionbar>

            <kiss-popout :open="actionSpace && 'true'" @popoutclose="togglespaceActions(null)">
                <kiss-content>
                        <kiss-navlist v-if="actionSpace">
                            <ul>
                                <li class="kiss-nav-header">{{ actionSpace.name }}</li>
                                <li>
                                    <a class="kiss-flex kiss-flex-middle" :href="actionSpace.url" target="_blank" rel="noopener noreferrer">
                                        <icon class="kiss-margin-small-right">link</icon>
                                        <?=t('Open space')?>
                                    </a>
                                </li>
                                <?php if ($isFinderAvailable): ?>
                                <li>
                                    <a class="kiss-flex kiss-flex-middle" @click="openFinder(actionSpace.name)">
                                        <icon class="kiss-margin-small-right">folder</icon>
                                        <?=t('Open Finder')?>
                                    </a>
                                </li>
                                <?php endif ?>
                                <li class="kiss-nav-divider"></li>
                                <li>
                                    <a class="kiss-color-danger kiss-flex kiss-flex-middle" @click="remove(actionSpace)">
                                        <icon class="kiss-margin-small-right">delete</icon>
                                        <?=t('Delete')?>
                                    </a>
                                </li>
                            </ul>
                        </kiss-navlist>
                </kiss-content>
            </kiss-popout>

        </template>

        <script type="module">

            export default {

                data() {
                    return {
                        spaces: null,
                        filter: '',
                        loading: false,
                        actionSpace: null,
                        group: null,
                    }
                },

                mounted() {
                    this.load()
                },

                computed: {

                    filtered() {

                        let spaces = [];

                        (this.spaces || []).forEach(space => {

                            if (this.group && this.group !== space.group) {
                                return;
                            }

                            if (this.filter && !`${space.name}`.toLocaleLowerCase().includes(this.filter.toLocaleLowerCase())) {
                                return;
                            }

                            spaces.push(space)
                        });

                        return spaces;
                    },

                    groups() {

                        let groups = [];

                        (this.spaces || []).forEach(space => {
                            if (!space.group || groups.indexOf(space.group) > -1) return;
                            groups.push(space.group);
                        });

                        return groups.sort();
                    }
                },

                methods: {

                    load() {

                        this.loading = true;

                        this.$request('/system/spaces/load', {options:{}}).then(spaces => {
                            this.spaces = spaces;
                            this.loading = false;
                        });
                    },

                    remove(space) {

                        App.ui.prompt('Action verification', '', (password) => {

                            if (!password) return

                            this.$request('/system/spaces/remove', {space, password}).then(res => {
                                this.spaces.splice(this.spaces.indexOf(space), 1);
                                App.ui.notify('Space removed!', 'success');
                            }).catch(res => {
                                App.ui.notify(res.error || 'Removing space failed!', 'error');
                            });

                        }, {
                            type: 'password',
                            info: 'Please enter your password to verify this action'
                        });
                    },

                    togglespaceActions(space) {

                        if (!space) {
                            setTimeout(() => this.actionSpace = null, 300);
                            return;
                        }

                        this.actionSpace = space;
                    },

                    openFinder(path = '') {

                        VueView.ui.offcanvas('finder:assets/dialogs/finder.js', {
                            root: '#root:',
                            path: `/.spaces/${path}`
                        }, {


                        }, {flip: true, size: 'xxlarge'})
                    },

                }
            }

        </script>

    </vue-view>


</kiss-container>
