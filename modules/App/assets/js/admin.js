
let checkSessionTimeout = function() {

    let csrf;
    let check = function() {

        let isActive = document.getElementById('app-session-login');

        App.request('/check-session').then(res => {

            if (res && res.status && isActive) {
                isActive.closest('kiss-dialog').close();
            }

            if (res && !res.status && !isActive) {
                VueView.ui.modal('app:assets/dialog/login.js', {csrf})
            }

        }).catch(rsp => {
            // todo
        });
    };

    setInterval(check, 30000);

    document.addEventListener('visibilitychange', function() {
        if (!document.hidden) check();
    }, false);

    // get login csrf token
    App.request('/utils/csrf/login').then(res => {
        csrf = res.token;
    });

}

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

document.addEventListener('DOMContentLoaded', e => {

    checkSessionTimeout();

    AppEventStream.start();

    // bind global command for app search
    Mousetrap.bind(['alt+f', 'ctrl+space'], function(e) {
        e.preventDefault();
        showAppSearch();
        return false;
    });

    document.querySelectorAll('[app-search]').forEach(ele => {
        ele.addEventListener('click', e => {
            e.preventDefault();
            showAppSearch();
        });
    })

}, false);
