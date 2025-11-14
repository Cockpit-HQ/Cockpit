<kiss-container class="kiss-margin-small" size="small">
    <ul class="kiss-breadcrumbs">
        <li><a href="<?= $this->route('/system') ?>"><?= t('Settings') ?></a></li>
    </ul>
    <vue-view>
        <template>

            <div class="kiss-margin-large-bottom kiss-flex kiss-flex-middle">
                <div class="kiss-size-4 kiss-flex-1"><strong><?= t('Users') ?></strong></div>
            </div>

            <form class="kiss-margin-large-bottom" :class="{'kiss-disabled': loading}" @submit.prevent="filter = txtFilter">

                <div class="kiss-flex kiss-flex-middle">

                    <input type="text" class="kiss-input kiss-flex-1 kiss-margin-xsmall-right" :placeholder="t('Filter users...')" v-model="txtFilter">

                    <div class="kiss-button-group kiss-margin-small-left">
                        <button type="button" class="kiss-button" @click="filter = ''" v-if="filter"><?= t('Reset') ?></button>
                        <button class="kiss-button kiss-flex"><?= t('Search') ?></button>
                    </div>

                </div>

                <div class="kiss-margin">

                    <button class="kiss-button kiss-button-small kiss-overlay-input" type="button">
                        <span class="kiss-margin-small-right">{{ role || t('All') }}</span><icon>expand_more</icon>

                        <select v-model="role">
                            <option value="">{{ t('All') }}</option>
                            <hr>
                            <option :value="role.appid" v-for="role in roles">{{ role.name }}</option>
                        </select>
                    </button>
                </div>
            </form>

            <app-loader v-if="loading"></app-loader>

            <div class="animated fadeIn kiss-height-30vh kiss-flex kiss-flex-middle kiss-flex-center kiss-align-center kiss-color-muted" v-if="!loading && users && !users.length">
                <div>
                    <p class="kiss-size-large"><?=t('No users found')?></p>
                </div>
            </div>

            <div v-if="!loading && users && users.length">

                <ul class="app-list-items animated fadeIn">

                    <li v-for="(user, idx) in users" :class="{'kiss-inactive': !user.active}">

                        <kiss-card class="kiss-padding-small kiss-flex" hover="contrast scale-small">
                            <div class="kiss-margin-right kiss-position-relative">
                                <app-avatar size="50" :name="user.name"></app-avatar>
                                <a class="kiss-cover" :href="$routeUrl('/system/users/user/'+user._id)"></a>
                            </div>
                            <div class="kiss-flex-1 kiss-position-relative">
                                <div class="kiss-size-5"><strong>{{user.name}}</strong></div>
                                <div class="kiss-color-muted kiss-size-small kiss-flex kiss-flex-middle kiss-margin-xsmall" gap="small">
                                    <span class="kiss-badge kiss-text-upper" :class="{'kiss-badge-outline': user.role !== 'admin'}">{{ user.role }}</span>
                                    <span class="kiss-color-primary">{{user.user}}</span>
                                    {{user.email}}
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
                        roles: <?= json_encode($this->helper('acl')->roles()) ?>,
                        loading: false,
                        role: '',
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
                                this.role = q.role;
                            }
                        } catch (e) {}
                    }

                    this.load(this.page, false);
                },

                watch: {
                    filter(val) {
                        this.txtFilter = val;
                        this.load();
                    },
                    role() {
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

                        if (this.role) {
                            options.role = this.role;
                        }

                        if (history) {

                            window.history.pushState(
                                null, null,
                                App.route(['/system/users', '?state=', App.utils.base64encode(JSON.stringify({
                                    page: this.page || null,
                                    filter: this.filter || null,
                                    role: this.role || '',
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
