<kiss-container class="kiss-margin-small" size="small">
    <ul class="kiss-breadcrumbs">
        <li><a href="<?= $this->route('/system') ?>"><?= t('Settings') ?></a></li>
    </ul>
    <vue-view>
        <template>

            <div class="kiss-margin-large-bottom kiss-flex kiss-flex-middle">
                <div class="kiss-size-4 kiss-flex-1"><strong><?= t('Users') ?></strong></div>
            </div>

            <app-loader v-if="loading"></app-loader>

            <div v-if="!loading && users && users.length">

                <form class="kiss-flex kiss-flex-middle kiss-margin-large-bottom" @submit.prevent="filter = txtFilter">

                    <input type="text" class="kiss-input kiss-flex-1 kiss-margin-xsmall-right" :placeholder="t('Filter users...')" v-model="txtFilter">

                    <div class="kiss-button-group kiss-margin-small-left">
                        <button type="button" class="kiss-button" @click="filter = ''" v-if="filter"><?= t('Reset') ?></button>
                        <button class="kiss-button kiss-flex"><?= t('Search') ?></button>
                    </div>
                </form>

                <ul class="app-list-items animated fadeIn">

                    <li v-for="(user, idx) in users" :class="{'kiss-inactive': !user.active}">

                        <kiss-card class="kiss-padding-small kiss-flex" hover="contrast scale-small bordered-primary">
                            <div class="kiss-margin-right kiss-position-relative">
                                <app-avatar size="50" :name="user.name"></app-avatar>
                                <a class="kiss-cover" :href="$routeUrl('/system/users/user/'+user._id)"></a>
                            </div>
                            <div class="kiss-flex-1 kiss-position-relative">
                                <div class="kiss-size-5"><strong>{{user.name}}</strong></div>
                                <div class="kiss-color-muted kiss-size-small">
                                    <span class="kiss-color-primary">{{user.user}}</span> &bullet; {{user.email}}
                                </div>
                                <a class="kiss-cover" :href="$routeUrl('/system/users/user/'+user._id)"></a>
                            </div>
                            <div class="kiss-margin-left" v-if="user._id != '<?= $this['user/_id'] ?>'">
                                <a class="kiss-color-danger" @click="remove(user)">
                                    <icon class="kiss-size-large">delete</icon>
                                </a>
                            </div>
                        </kiss-card>

                    </li>

                </ul>
            </div>

            <app-actionbar>

                <kiss-container size="small">
                    <div class="kiss-flex kiss-flex-middle">
                        <div class="kiss-flex kiss-flex-middle" v-if="!loading && count">
                            <div class="kiss-size-small">{{ `${count} ${count == 1 ? t('User') : t('Users')}` }}</div>
                            <div class="kiss-margin-small-left kiss-overlay-input">
                                <span class="kiss-badge kiss-badge-outline kiss-color-muted">{{ page }} / {{pages}}</span>
                                <select v-model="page" @change="load(page)" v-if="pages > 1">
                                    <option v-for="p in pages" :value="p">{{ p }}</option>
                                </select>
                            </div>
                            <div class="kiss-margin-small-left kiss-size-small">
                                <a class="kiss-margin-small-right" v-if="(page - 1) >= 1" @click="load(page - 1)"><?= t('Previous') ?></a>
                                <a v-if="(page + 1) <= pages" @click="load(page + 1)"><?= t('Next') ?></a>
                            </div>
                        </div>
                        <div class="kiss-flex-1"></div>
                        <div class="kiss-button-group">
                            <?php if ($this->helper('acl')->isAllowed('app.roles.manage')) : ?>
                                <a class="kiss-button" href="<?= $this->route('/system/users/roles') ?>"><?= t('Manage roles') ?></a>
                            <?php endif ?>
                            <a class="kiss-button kiss-button-primary" href="<?= $this->route('/system/users/create') ?>"><?= t('Add user') ?></a>
                        </div>
                    </div>
                </kiss-container>

            </app-actionbar>

        </template>
        <script type="module">
            export default {

                data() {
                    return {
                        users: null,
                        loading: false,
                        filter: '',
                        txtFilter: '',

                        page: 1,
                        pages: 1,
                        limit: 10,
                        count: 0
                    }
                },

                mounted() {

                    let searchParams = new URLSearchParams(location.search);

                    if (searchParams.has('state')) {
                        try {
                            let q = JSON.parse(App.utils.base64decode(searchParams.get('state')));
                            if (q.page) this.page = q.page;
                            if (q.limit) this.limit = (parseInt(q.limit) || this.limit);
                            if (q.filter) {
                                this.filter = q.filter;
                                this.txtFilter = q.filter;
                            }
                        } catch (e) {}
                    }

                    this.load(this.page, false);
                },

                watch: {
                    filter(val) {
                        this.txtFilter = val;
                        this.load();
                    }
                },

                methods: {


                    load(page = 1, history = true) {

                        this.loading = true;

                        let options = {
                            limit: this.limit,
                            skip: (page - 1) * this.limit
                        };

                        if (this.filter) {
                            options.filter = this.filter;
                        }

                        if (history) {

                            window.history.pushState(
                                null, null,
                                App.route(['/system/users', '?state=', App.utils.base64encode(JSON.stringify({
                                    page: this.page || null,
                                    filter: this.filter || null,
                                    limit: this.limit
                                }))].join(''))
                            );
                        }

                        this.$request('/system/users/load', {
                            options
                        }).then(data => {

                            this.users = data.users;
                            this.pages = data.pages;
                            this.page = data.page;
                            this.count = data.count;

                            this.loading = false;
                        });
                    },

                    remove(user) {

                        App.ui.confirm('Are you sure?', () => {

                            App.ui.prompt('Action verification', '', (pwd) => {

                                this.$request('/system/users/remove', {
                                    user,
                                    password: pwd
                                }).then(res => {
                                    this.load(this.page == 1 ? 1 : (this.items.length - 1 ? this.page : this.page - 1));
                                }).catch(res => {
                                    App.ui.notify(res.error || 'Removing user failed!', 'error');
                                });

                            }, {
                                type: 'password',
                                info: 'Please enter your password to verify this action'
                            });
                        });
                    }
                }
            }
        </script>
    </vue-view>


</kiss-container>
