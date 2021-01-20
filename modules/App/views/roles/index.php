
<kiss-container class="kiss-margin-large" size="small">

<vue-view>
    <template>

        <div class="kiss-margin-large-bottom kiss-flex kiss-flex-middle">
            <div class="kiss-size-1 kiss-flex-1"><strong><?=_t('Roles')?></strong></div>
            <a class="kiss-button kiss-margin-small-right" href="<?=$this->route('/users')?>"><?=_t('Manage users')?></a>
            <a class="kiss-button kiss-button-primary" href="<?=$this->route('/users/roles/create')?>"><?=_t('Add role')?></a>
        </div>

        <app-loader v-if="loading"></app-loader>

        <div class="animated fadeIn kiss-height-30vh kiss-flex kiss-flex-middle kiss-flex-center kiss-align-center kiss-color-muted" v-if="roles && !roles.length">
            <div>
                <icon class="kiss-size-xlarge">admin_panel_settings</icon>
                <p class="kiss-size-large kiss-text-bold"><?=_t('No roles')?></p>
            </div>
        </div>

        <div class="animated fadeIn" v-if="roles && roles.length">

            <div v-for="(role, idx) in roles">

                <div class="kiss-margin kiss-flex">
                    <div class="kiss-margin-right kiss-position-relative">
                        <app-avatar size="50" :name="role.name"></app-avatar>
                        <a class="kiss-cover" :href="App.route('/users/roles/role/'+role._id)"></a>
                    </div>
                    <div class="kiss-flex-1 kiss-position-relative">
                        <div class="kiss-size-5"><strong>{{role.name || role.appid}}</strong></div>
                        <div class="kiss-color-muted kiss-size-small">
                            {{role.info}}
                        </div>
                        <a class="kiss-cover" :href="App.route('/users/roles/role/'+role._id)"></a>
                    </div>
                    <div class="kiss-margin-left">
                        <a class="kiss-size-large kiss-color-danger" @click="remove(role)"><icon>delete</icon></a>
                    </div>
                </div>

                <hr v-if="(idx+1) < roles.length">

            </div>

        </div>


    </template>
    <script type="module">

        export default {
            
            data() {
                return {
                    roles: null,
                    loading: false
                }
            },


            mounted() {
                this.load()
            },

            methods: {

                
                load() {

                    this.loading = true;
                    
                    App.request('/users/roles/load', {options:{}}).then(roles => {

                        this.roles = roles;
                        this.loading = false;
                    });
                },

                remove(role) {

                    App.ui.confirm('Are you sure?', () => {

                        App.request('/users/roles/remove', {role}).then(res => {
                            this.roles.splice(this.roles.indexOf(role), 1);
                        });
                    });
                }
            }
        }

    </script>
</vue-view>


</kiss-container>
