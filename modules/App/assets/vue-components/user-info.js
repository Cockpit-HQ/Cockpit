let cache = {};
let cacheTimer = null;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
const MAX_CACHE_SIZE = 100; // Maximum number of cached users

// Clean up old cache entries periodically
const cleanupCache = () => {
    const now = Date.now();
    const entries = Object.entries(cache);
    
    // Remove expired entries
    for (const [userId, data] of entries) {
        if (data.timestamp && (now - data.timestamp) > CACHE_TTL) {
            delete cache[userId];
        }
    }
    
    // If still too many entries, remove oldest ones
    if (Object.keys(cache).length > MAX_CACHE_SIZE) {
        const sorted = entries.sort((a, b) => (a[1].timestamp || 0) - (b[1].timestamp || 0));
        const toRemove = sorted.slice(0, sorted.length - MAX_CACHE_SIZE);
        toRemove.forEach(([userId]) => delete cache[userId]);
    }
};

const user = (userId) => {

    if (!userId) {
        return null;
    }

    // Check if we have a valid cached entry
    if (cache[userId]) {
        const cached = cache[userId];
        const now = Date.now();
        
        // Return cached data if it's still fresh
        if (cached.timestamp && (now - cached.timestamp) < CACHE_TTL) {
            return cached.promise;
        }
        
        // Otherwise, remove stale cache
        delete cache[userId];
    }

    const options = {
        filter: {_id: userId},
        limit: 1
    }

    const promise = new Promise(resolve => {
        App.request('/system/users/load', {options}).then(users => {
            resolve(users.users[0]);
        }).catch(() => {
            resolve(null);
        });
    });

    cache[userId] = {
        promise,
        timestamp: Date.now()
    };
    
    // Schedule cleanup if not already scheduled
    if (!cacheTimer) {
        cacheTimer = setTimeout(() => {
            cleanupCache();
            cacheTimer = null;
        }, CACHE_TTL);
    }

    return promise;
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
