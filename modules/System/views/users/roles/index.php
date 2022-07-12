
<kiss-container class="kiss-margin-large" size="small">

<ul class="kiss-breadcrumbs">
    <li><a href="<?=$this->route('/system')?>"><?=t('Settings')?></a></li>
    <li><a href="<?=$this->route('/system/users')?>"><?=t('Users')?></a></li>
</ul>

<vue-view>
    <template>

        <div class="kiss-margin-large-bottom kiss-flex kiss-flex-middle">
            <div class="kiss-size-4 kiss-flex-1"><strong><?=t('Roles')?></strong></div>
        </div>

        <app-loader v-if="loading"></app-loader>

        <div class="animated fadeIn kiss-height-30vh kiss-flex kiss-flex-middle kiss-flex-center kiss-align-center kiss-color-muted" v-if="roles && !roles.length">
            <div>
                <icon class="kiss-size-xlarge">admin_panel_settings</icon>
                <p class="kiss-size-large kiss-text-bold"><?=t('No roles')?></p>
            </div>
        </div>

        <ul class="app-list-items animated fadeIn" v-if="roles && roles.length">

            <li v-for="(role, idx) in roles">

                <div class="kiss-margin kiss-flex">
                    <div class="kiss-margin-right kiss-position-relative">
                        <app-avatar size="50" :name="role.name"></app-avatar>
                        <a class="kiss-cover" :href="$route('/system/users/roles/role/'+role._id)"></a>
                    </div>
                    <div class="kiss-flex-1 kiss-position-relative">
                        <div class="kiss-size-5"><strong>{{role.name || role.appid}}</strong></div>
                        <div class="kiss-color-muted kiss-size-small">
                            {{role.info}}
                        </div>
                        <a class="kiss-cover" :href="$route('/system/users/roles/role/'+role._id)"></a>
                    </div>
                    <div class="kiss-margin-left">
                        <a class="kiss-color-danger" @click="remove(role)"><icon class="kiss-size-large">delete</icon></a>
                    </div>
                </div>

            </li>

        </ul>

        <app-actionbar>

            <kiss-container size="small">
                <div class="kiss-flex kiss-flex-middle kiss-flex-right">
                    <div class="kiss-button-group">
                        <?php if ($this->helper('acl')->isAllowed('app.users.manage')): ?>
                        <a class="kiss-button" href="<?=$this->route('/system/users')?>"><?=t('Manage users')?></a>
                        <?php endif ?>
                        <a class="kiss-button kiss-button-primary" href="<?=$this->route('/system/users/roles/create')?>"><?=t('Add role')?></a>
                    </div>
                </div>
            </kiss-container>

        </app-actionbar>


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

                    this.$request('/system/users/roles/load', {options:{}}).then(roles => {

                        this.roles = roles;
                        this.loading = false;
                    });
                },

                remove(role) {

                    App.ui.confirm('Are you sure?', () => {

                        this.$request('/system/users/roles/remove', {role}).then(res => {
                            this.roles.splice(this.roles.indexOf(role), 1);
                        });
                    });
                }
            }
        }

    </script>
</vue-view>


</kiss-container>
