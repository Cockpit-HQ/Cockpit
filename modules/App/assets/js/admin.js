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

document.addEventListener('DOMContentLoaded', e => {
    checkSessionTimeout();
}, false);