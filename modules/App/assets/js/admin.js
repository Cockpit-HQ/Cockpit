let checkSessionTimeout = function() {

    let csrf;
    let check = function() {

        let isActive = document.querySelector('.app-login-form');

        App.request('/check-session').then(res => {

            if (res && res.status && isActive) {
                isActive.closest('kiss-dialog').close();
            }

            if (res && !res.status && !isActive) {

                App.utils.vueModal('app:assets/dialog/login.js', {csrf})
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