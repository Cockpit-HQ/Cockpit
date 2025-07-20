
let checkSessionTimeout = function() {

    if (checkSessionTimeout.idle) {
        clearTimeout(checkSessionTimeout.idle);
    }

    let isActive = document.getElementById('app-session-login');

    App.request('/check-session').then(rsp => {

        App.csrf = rsp.csrf || '';

        if (rsp && rsp.status && isActive) {
            isActive.closest('kiss-dialog').close();
        }

        if (rsp && !rsp.status && !isActive) {
            VueView.ui.modal(Vue.defineAsyncComponent(() => import(`${App.route('/auth/dialog')}?v=${App.version}`)));
        }

    }).catch(rsp => {
        // todo
    });

    checkSessionTimeout.idle = setTimeout(checkSessionTimeout, 30000);
};

checkSessionTimeout.idle = null;

const isUserLoggedOut = () => document.getElementById('app-session-login');
const isAppSearchActive = () => document.getElementById('app-search');

let showAppSearch = function(value) {

    let isActive = isAppSearchActive(),
        isLoggedOut = isUserLoggedOut();

    if (!isActive && !isLoggedOut) {
        VueView.ui.modal('app:assets/dialog/app-search.js', {value}, {}, {}, 'app-search');
    } else if (isActive && !isLoggedOut){
        isActive.querySelector('input').focus();
    }
}

window.AppEventStream =  {
    _idle: null,
    _registry: {
        notify: [
            function(evt) {
                App.ui.notify(evt.data.message, evt.data.status || 'info', {
                    timeout: evt.data.timeout || false
                });
            }
        ],

        alert: [
            function(evt) {
                App.ui.alert(evt.data.message);
            }
        ],

        logout: [
            function(evt) {
                App.ui.notify(evt.data?.message || 'You have been logged out!', 'danger');

                setTimeout(() => {
                    window.location.href = App.route('/auth/logout?force=1');
                }, 1500);
            }
        ]
    },

    start() {

        let check = () => {

            App.request('/app-event-stream').then(events => {

                events.forEach(evt => {
                    this.trigger(evt);
                });

                this._idle = setTimeout(check, 10000);

            }).catch(rsp => {
                // todo
            });
        }

        check();
    },

    stop() {

        if (this._idle) {
            clearTimeout(this._idle);
        }
    },

    on(eventType, fn) {

        if (!this._registry[eventType]) this._registry[eventType] = [];

        this._registry[eventType].push(fn);
    },

    trigger(evt) {

        if (evt.type && this._registry[evt.type]) {
            this._registry[evt.type].forEach(fn => fn(evt));
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {

    checkSessionTimeout();
    AppEventStream.start();

    // bind global command for app search
    Mousetrap.bind(['alt+f', 'ctrl+space'], e => {
        e.preventDefault();
        showAppSearch();
        return false;
    });

    document.addEventListener('keydown', (e) => {

        const IGNORED_KEYS = [
            'Escape', 'Enter', 'Tab',
            'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight',
            'Backspace', 'Delete', 'Home', 'End', 'PageUp', 'PageDown',
            'Space', 'CapsLock', 'Shift'
        ];

        //ctrl-c, ctrl-v etc.
        if (e.ctrlKey || e.altKey || e.metaKey || IGNORED_KEYS.includes(e.key)) return;

        if (
            e.target.tagName?.toLowerCase() === 'body' &&
            /^[A-Za-zÀ-ÿ]$/u.test(e.key) &&
            !isAppSearchActive() &&
            !isUserLoggedOut()
        ) {
            showAppSearch(e.key);
        }
    }, false);

    document.querySelectorAll('[app-search]').forEach(ele => {
        ele.addEventListener('click', e => {
            e.preventDefault();
            showAppSearch();
        });
    });

}, false);

document.addEventListener('visibilitychange', function() {

    if (document.hidden) {
        return
    }

    checkSessionTimeout();
    App.storage.load();

}, false);
