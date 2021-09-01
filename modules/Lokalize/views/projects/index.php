<kiss-container class="kiss-margin" size="medium">

    <ul class="kiss-breadcrumbs">
        <li><a href="<?=$this->route('/lokalize/projects')?>"><?=t('Lokalize')?></a></li>
    </ul>


    <vue-view>

        <template>

            <app-loader v-if="loading"></app-loader>

            <div class="animated fadeIn kiss-height-50vh kiss-flex kiss-flex-middle kiss-flex-center kiss-align-center kiss-color-muted" v-if="projects && !projects.length">
                <div>
                    <kiss-svg :src="$base('lokalize:icon.svg')" width="40" height="40"></kiss-svg>
                    <p class="kiss-size-large kiss-text-bold kiss-margin-small-top"><?=t('No projects')?></p>
                </div>
            </div>

            <div v-if="projects && projects.length">

                <app-tabs static="true" v-if="groups.length">
                    <ul class="app-tabs-nav">
                        <li :active="group === null">
                            <a class="app-tabs-nav-link" @click="group = null">{{t('All')}}</a>
                        </li>
                        <li :active="group == name" v-for="name in groups">
                            <a class="app-tabs-nav-link" @click="group = name">{{ name }}</a>
                        </li>
                    </ul>
                </app-tabs>

                <div class="kiss-margin">
                    <input type="text" class="kiss-input" :placeholder="t('Filter projects...')" v-model="filter">
                </div>

                <kiss-card class="kiss-margin-small kiss-padding kiss-flex kiss-flex-middle animated fadeIn" theme="shadowed contrast" hover="shadow" v-for="project in filtered">
                    <div>
                        <kiss-svg class="kiss-display-inline-block" :src="$base('lokalize:icon.svg')" width="30" height="30" :style="{color: project.color || 'inherit' }"></kiss-svg>
                    </div>
                    <div class="kiss-margin-small-left">
                        <a class="kiss-text-bold kiss-link-muted" :href="$route(`/lokalize/projects/project/${project.name}`)" :aria-label="project.name" kiss-tooltip="right">{{ project.label || project.name}}</a>
                    </div>
                    <div class="kiss-flex-1 kiss-size-small kiss-color-muted kiss-margin-small-left">{{ project.info }}</div>
                    <div class="kiss-align-right kiss-size-small kiss-margin-left">{{ project.status._overall }}%</div>
                    <div class=" kiss-margin-small-left">
                        <a @click="toggleProjectActions(project)"><icon>more_horiz</icon></a>
                    </div>
                </kiss-card>

            </div>

            <app-actionbar>

                <kiss-container size="medium">
                    <div class="kiss-flex kiss-flex-middle">
                        <div class="kiss-flex-1"></div>
                        <a class="kiss-button kiss-button-primary" href="<?=$this->route('/lokalize/projects/create')?>"><?=t('Create project')?></a>
                    </div>
                </kiss-container>

            </app-actionbar>

            <kiss-popoutmenu :open="actionProject && 'true'" @popoutmenuclose="toggleProjectActions(null)">
                <kiss-content>
                        <kiss-navlist v-if="actionProject">
                            <ul>
                                <li class="kiss-nav-header">{{ actionProject.label || actionProject.name }}</li>
                                <li>
                                    <a class="kiss-flex kiss-flex-middle" :href="$route(`/lokalize/projects/edit/${actionProject.name}`)">
                                        <icon class="kiss-margin-small-right">create</icon>
                                        <?=t('Edit')?>
                                    </a>
                                </li>
                                <li class="kiss-nav-divider"></li>
                                <li>
                                    <a class="kiss-color-danger kiss-flex kiss-flex-middle" @click="remove(actionProject)">
                                        <icon class="kiss-margin-small-right">delete</icon>
                                        <?=t('Delete')?>
                                    </a>
                                </li>
                            </ul>
                        </kiss-navlist>
                </kiss-content>
            </kiss-popoutmenu>

        </template>

        <script type="module">

            export default {

                data() {
                    return {
                        projects: null,
                        group: null,
                        filter: '',
                        loading: false,
                        actionProject: null
                    }
                },

                mounted() {
                    this.load()
                },

                computed: {

                    filtered() {

                        let projects = [];

                        (this.projects || []).forEach(p => {

                            if (this.filter && !`${p.name} ${p.label || ''}`.toLocaleLowerCase().includes(this.filter.toLocaleLowerCase())) {
                                return;
                            }

                            if (this.group && p.group != this.group ) return;
                            projects.push(p)
                        });

                        return projects;
                    },

                    groups() {
                        let groups = [];

                        (this.projects || []).forEach(p => {
                            if (!p.group || groups.indexOf(p.group) > -1) return;
                            groups.push(p.group);
                        });

                        return groups.sort();
                    }
                },

                methods: {

                    load() {

                        this.loading = true;

                        this.$request('/lokalize/projects/load', {options:{}}).then(projects => {

                            this.projects = projects;
                            this.loading = false;
                        });
                    },

                    remove(project) {

                        App.ui.confirm('Are you sure?', () => {

                            this.$request('/lokalize/projects/remove', {project}).then(res => {
                                this.projects.splice(this.projects.indexOf(project), 1);
                            });
                        });
                    },

                    toggleProjectActions(project) {

                        if (!project) {
                            setTimeout(() => this.actionProject = null, 300);
                            return;
                        }

                        this.actionProject = project;
                    }
                }
            }

        </script>

    </vue-view>


</kiss-container>