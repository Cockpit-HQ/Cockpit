
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
            VueView.ui.modal('/auth/dialog');
        }

    }).catch(rsp => {
        // todo
    });

    checkSessionTimeout.idle = setTimeout(checkSessionTimeout, 30000);
};

checkSessionTimeout.idle = null;

let showAppSearch = function() {

    let isActive = document.getElementById('app-search'),
        isLoggedOut = document.getElementById('app-session-login');

    if (!isActive && !isLoggedOut) {
        VueView.ui.modal('app:assets/dialog/app-search.js', {}, {}, {size:'large'}, 'app-search');
    } else if (isActive && !isLoggedOut){
        document.getElementById('app-search').querySelector('input').focus();
    }
}

window.AppEventStream =  {
    _idle: null,
    _registry: {
        notify: [
            function(evt) {
                App.ui.notify(evt.data.message, evt.data.status || 'info', evt.data.timeout || false);
            }
        ],

        alert: [
            function(evt) {
                App.ui.alert(evt.data.message);
            }
        ]
    },

    start() {

        let check = () => {

            App.request('/app-event-stream').then(events => {

                events.forEach(evt => {
                    this.trigger(evt);
                });

            }).catch(rsp => {
                // todo
            });
        }

        this._idle = setInterval(check, 15000);
    },

    stop() {

        if (this._idle) {
            clearInterval(this._idle);
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
