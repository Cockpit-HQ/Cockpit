// linkify (used by the Link extension) keeps custom schemes globally and only reads them once, on first use.
// The default Link extension registers its schemes on every editor create and resets linkify on every destroy:
// further editors log "already initialized" warnings and closing one editor drops the schemes of all others.
// Register each scheme once per page instead and never reset.
const registered = new Set();

export function createLink() {

    return window.VueTiptap.Link.extend({

        onCreate() {

            const protocols = this.options.protocols;

            // the parent hook registers this.options.protocols, so only hand over new schemes
            this.options.protocols = protocols.filter(protocol => {

                const scheme = typeof protocol === 'string' ? protocol : protocol.scheme;

                if (registered.has(scheme)) return false;

                registered.add(scheme);
                return true;
            });

            this.parent?.();
            this.options.protocols = protocols;
        },

        onDestroy() {},
    });
}
