

export default {

    notify: function (message, status, timeout) {

        if (timeout !== false && !timeout) {
            timeout = 2500
        }

        new Noty({
            type: status || 'info',
            text: message,
            timeout: timeout,
            layout: 'topCenter',
            theme: 'app',
            progressBar: true
        }).show();
    },

    block: function (info='', context = 'ui-block') {

        document.body.insertAdjacentHTML('beforeend', `
            <app-loader-cover class="${context}" label="${info}"></app-loader-cover>
        `);
    },

    unblock: function (context = 'ui-block') {
        document.querySelectorAll(`.${context}`).forEach(node => node.parentNode.removeChild(node))
    },

    offcanvas: function (content, options) {

        let id = crypto.randomUUID(),
            size = '';

        options = options || {};

        switch (options.size) {
            case 'large':
                size = 'kiss-width-1-3@m kiss-width-1-4@xl';
                break;
            case 'xlarge':
                size = 'kiss-width-2-3@m kiss-width-1-2@xl';
                break;
            case 'xxlarge':
                size = 'kiss-width-3-4';
                break;
            case 'screen':
                size = 'kiss-width-1-1';
                break;
        }

        document.body.insertAdjacentHTML('beforeend', `
            <kiss-offcanvas id="offcanvas-${id}" flip="${(options.flip && 'true') || ''}">
                <kiss-content class="${size}">
                    ${content}
                </kiss-content>
            </kiss-offcanvas>
        `);

        let offcanvas = document.getElementById(`offcanvas-${id}`);

        if (options && options.zIndex) {
            offcanvas.style.zIndex = options.zIndex;
        }

        offcanvas.__close = offcanvas.close;
        offcanvas.__show = offcanvas.show;

        offcanvas.close = function() {
            offcanvas.__close();
            setTimeout(() => {
                offcanvas.parentNode.removeChild(offcanvas);
            }, 300)
        };

        offcanvas.show = function() {
            offcanvas.__show();

            setTimeout(() => {
                let ele = offcanvas.querySelector('[autofocus]');

                if (ele) {
                    ele.focus();
                }
            }, 300)
        };

        return offcanvas;
    },


    dialog: function (content, options, dialogtype) {

        let id = crypto.randomUUID();

        document.body.insertAdjacentHTML('beforeend', `
            <kiss-dialog id="dialog-${id}" size="${(options && options.size) || ''}" type="${dialogtype}" esc="${(options && options.escape) ? 'true':'false'}">
                <kiss-content class="animated fadeInUp faster">
                    ${content}
                </kiss-content>
            </kiss-dialog>
        `);

        let dialog = document.getElementById(`dialog-${id}`);

        if (options && options.zIndex) {
            dialog.style.zIndex = options.zIndex;
        }

        dialog.__close = dialog.close;
        dialog.__show = dialog.show;

        dialog.close = function() {
            dialog.__close();
            dialog.parentNode.removeChild(dialog);
        };

        dialog.show = function() {
            dialog.__show();

            setTimeout(() => {
                let ele = dialog.querySelector('[autofocus]');

                if (ele) {
                    ele.focus();
                }
            }, 300);
        };

        return dialog;
    },

    alert: function (content, options) {

        options = Object.assign({escape:true}, options || {});

        let dialog = this.dialog(/*html*/`
            <div class="kiss-margin kiss-dialog-alert-message">
                ${content}
            </div>
            <div class="kiss-margin-top kiss-flex kiss-flex-middle">
                <button type="button" class="kiss-button kiss-button-large kiss-button-primary kiss-flex-1" kiss-dialog-close>${App.i18n.get('Ok')}</button>
            </div>
        `, options, 'alert');

        dialog.show();
    },

    confirm: function (text, onconfirm, oncancel, options) {

        options = Object.assign({escape:true}, options || {});

        let dialog = this.dialog(/*html*/`
            <div class="kiss-margin-bottom kiss-dialog-confirm-message">
                ${text}
            </div>
            <div class="kiss-margin-top kiss-flex kiss-flex-middle kiss-button-group">
                <button type="button" class="kiss-button-cancel kiss-button kiss-button-large kiss-flex-1">${App.i18n.get('Cancel')}</button>
                <button type="button" class="kiss-button-confirm kiss-button kiss-button-large kiss-button-primary kiss-flex-1">${App.i18n.get('Ok')}</button>
            </div>
        `, options, 'confirm');

        App.utils.on(dialog, 'click', '.kiss-button-confirm', () => {
            if (onconfirm) onconfirm();
            dialog.close();
        });

        App.utils.on(dialog, 'click', '.kiss-button-cancel', () => {
            if (oncancel) oncancel();
            dialog.close();
        });

        dialog.show();
    },

    prompt: function (text, value = '', clb, options) {
        let dialog = this.dialog(/*html*/`
            <form>
                <div class="kiss-margin kiss-dialog-prompt-message">${text}</div>
                <div class="kiss-margin-bottom">
                    <input class="kiss-width-1-1 kiss-input" type="text" required>
                </div>
                <div class="kiss-margin-top kiss-flex kiss-flex-middle kiss-button-group">
                    <button type="button" class="kiss-button-cancel kiss-button kiss-flex-1">${App.i18n.get('Cancel')}</button>
                    <button type="submit" class="kiss-button-confirm kiss-button kiss-button-primary kiss-flex-1">${App.i18n.get('Ok')}</button>
                </div>
            </form>
        `, options, 'prompt');

        let input = dialog.querySelector('.kiss-input');

        input.value = value;

        App.utils.on(dialog, 'submit', (e) => {
            e.preventDefault();
            if (clb) clb(input.value);
            dialog.close();
        });

        App.utils.on(dialog, 'click', '.kiss-button-cancel', () => {
            dialog.close();
        });

        dialog.show();

        setTimeout(() => input.focus(), 300);
    },

    popout: function (content, options) {

        let id = crypto.randomUUID(),
        size = '';

        options = options || {};

        document.body.insertAdjacentHTML('beforeend', `
            <kiss-popout id="popout-${id}" size="${options.size || ''}">
                <kiss-content class="${size}">
                    ${content}
                </kiss-content>
            </kiss-popout>
        `);

        let popout = document.getElementById(`popout-${id}`);

        if (options && options.zIndex) {
            popout.style.zIndex = options.zIndex;
        }

        popout.__close = popout.close;
        popout.__show = popout.show;

        popout.close = function() {
            popout.__close();
            setTimeout(() => {
                popout.parentNode.removeChild(popout);
            }, 300)
        };

        popout.show = function() {
            popout.__show();

            setTimeout(() => {
                let ele = popout.querySelector('[autofocus]');

                if (ele) {
                    ele.focus();
                }
            }, 300)
        };

        return popout;
    }
};
