
<kiss-container class="kiss-margin-large" size="small">

    <vue-view>
        <template>

            <h1 class="kiss-margin-large-bottom"><?=_t('Users')?></h1>


            <app-loader v-if="loading"></app-loader>

            <div class="animated fadeIn" v-if="users && !users.length">

            </div>

            <div class="animated fadeIn" v-if="users && users.length">

                <div v-for="(user, idx) in users" :class="{'kiss-inactive': !user.active}">

                    <div class="kiss-margin kiss-flex">
                        <div class="kiss-margin-right kiss-position-relative">
                            <app-avatar size="50" :name="user.name"></app-avatar>
                            <a class="kiss-cover" :href="App.route('/users/user/'+user._id)"></a>
                        </div>
                        <div class="kiss-flex-1 kiss-position-relative">
                            <div class="kiss-size-5"><strong>{{user.name}}</strong></div>
                            <div class="kiss-color-muted kiss-size-small">
                                <span class="kiss-color-primary">{{user.user}}</span> &bullet; {{user.email}}
                            </div>
                            <a class="kiss-cover" :href="App.route('/users/user/'+user._id)"></a>
                        </div>
                        <div class="kiss-margin-left" v-if="user._id != '<?=$this['user/_id']?>'">
                            <a class="kiss-size-large kiss-color-danger" @click="remove(user)"><icon>delete</icon></a>
                        </div>
                    </div>

                    <hr v-if="(idx+1) < users.length">

                </div>

            </div>


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
                        
                        App.request('/users/load', {options:{}}).then(data => {

                            this.users = data.users;
                            this.pages = data.pages;
                            this.page  = data.page;
                            this.count = data.count;

                            this.loading = false;

                        })
                    },

                    remove(user) {

                        App.ui.confirm('Are you sure?', () => {

                        });

                    }
                }
            }

        </script>
    </vue-view>


</kiss-container>
