let cache = {};

const user = (userId) => {

    if (!userId) {
        return null;
    }

    if (cache[userId]) {
        return cache[userId];
    }

    const options = {
        filter: {_id: userId},
        limit: 1
    }

    cache[userId] = new Promise(resolve => {

        App.request('/system/users/load', {options}).then(users => {
            resolve(users.users[0]);
        }).catch(() => {
            resolve(null);
        });
    });

    return cache[userId];
}

export default {

    data() {

        return {
            uid: `user-info-${App.utils.uuid()}`,
            user: null,
        }
    },

    props: {
        userId: String,
        mode: {
            type: String,
            default: 'icon'
        }
    },

    mounted() {
        this.fetch();
    },

    watch: {
        userId() {
            this.fetch();
        }
    },

    methods: {

        fetch() {

            this.user = null;

            if (!this.userId) {
                return;
            }

            user(this.userId).then(user => this.user = user);
        }
    },

    template: /*html*/`
        <a class="kiss-link-muted" :class="{'kiss-disabled': !user}" :title="user && (user.name || user.user)" :kiss-popout="'#'+uid" kiss-popout-pos="right">
            <icon>account_circle</icon>
        </a>

        <teleport to="body">
            <kiss-popout :id="uid">
                <kiss-content v-if="user">
                    <kiss-row class="kiss-flex-middle" gap="small">
                        <div>
                            <app-avatar size="40" :name="user.name || user.user">
                                <canvas width="40" height="40"></canvas>
                            </app-avatar>
                        </div>
                        <div>
                            <strong class="kiss-size-small">{{ user.name || user.user }}</strong>
                            <a class="kiss-display-block kiss-color-muted kiss-size-small kiss-text-truncate" :href="'mailto:'+user.email">{{ user.email }}</a>
                        </div>
                    </kiss-row>
                </kiss-content>
            </kiss-popout>
        </teleport>
    `

}
