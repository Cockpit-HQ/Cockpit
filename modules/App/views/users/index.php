
<kiss-container class="kiss-margin-large" size="small">

    <vue-view>
        <template>

            <div class="kiss-margin-large-bottom kiss-flex kiss-flex-middle">

                <div class="kiss-size-1 kiss-flex-1"><strong><?=t('Users')?></strong></div>

                <div class="kiss-button-group">
                    <?php if (_allowed('app.roles.manage')): ?>
                    <a class="kiss-button" href="<?=$this->route('/users/roles')?>"><?=t('Manage roles')?></a>
                    <?php endif ?>
                    <a class="kiss-button kiss-button-primary" href="<?=$this->route('/users/create')?>"><?=t('Add user')?></a>
                </div>
            </div>

            <app-loader v-if="loading"></app-loader>

            <ul class="app-list-items animated fadeIn" v-if="users && users.length">

                <li v-for="(user, idx) in users" :class="{'kiss-inactive': !user.active}">

                    <div class="kiss-margin kiss-flex">
                        <div class="kiss-margin-right kiss-position-relative">
                            <app-avatar size="50" :name="user.name"></app-avatar>
                            <a class="kiss-cover" :href="$route('/users/user/'+user._id)"></a>
                        </div>
                        <div class="kiss-flex-1 kiss-position-relative">
                            <div class="kiss-size-5"><strong>{{user.name}}</strong></div>
                            <div class="kiss-color-muted kiss-size-small">
                                <span class="kiss-color-primary">{{user.user}}</span> &bullet; {{user.email}}
                            </div>
                            <a class="kiss-cover" :href="$route('/users/user/'+user._id)"></a>
                        </div>
                        <div class="kiss-margin-left" v-if="user._id != '<?=$this['user/_id']?>'">
                            <a class="kiss-color-danger" @click="remove(user)"><icon>delete</icon></a>
                        </div>
                    </div>

                </li>

            </ul>

        </template>
        <script type="module">

            export default {

                data() {
                    return {
                        users: null,
                        loading: false,

                        page: 1,
                        pages: 1,
                        count: 0
                    }
                },


                mounted() {
                    this.load()
                },

                methods: {


                    load() {

                        this.loading = true;

                        this.$request('/users/load', {options:{}}).then(data => {

                            this.users = data.users;
                            this.pages = data.pages;
                            this.page  = data.page;
                            this.count = data.count;

                            this.loading = false;
                        });
                    },

                    remove(user) {

                        App.ui.confirm('Are you sure?', () => {

                            this.$request('/users/remove', {user}).then(res => {
                                this.users.splice(this.users.indexOf(user), 1);
                            });
                        });
                    }
                }
            }

        </script>
    </vue-view>


</kiss-container>
