class Toast {
    constructor() {
        this.container = null;
    }

    getContainer() {

        let container = document.querySelector('.kiss-toast-container');

        if (!container) {
            container = document.createElement('div');
            container.classList.add('kiss-toast-container');
            document.body.appendChild(container);
        }

        return container;
    }

    show(message, options = {}) {

        const {
            type = 'info',
            timeout = 2500,
            title = '',
        } = options;

        const container = this.getContainer();
        const toast = document.createElement('div');
        const contentDiv = document.createElement('div');
        const messageElement = document.createElement('div');

        toast.classList.add('kiss-toast');
        toast.setAttribute('type', type);
        toast.setAttribute('data-title', title ? 'true' : 'false');

        contentDiv.classList.add('kiss-toast-content');

        if (title) {
            const titleElement = document.createElement('div');
            titleElement.classList.add('kiss-toast-title');
            titleElement.innerHTML = title;
            contentDiv.appendChild(titleElement);
        }

        messageElement.classList.add('kiss-toast-message');
        messageElement.innerHTML = message;
        contentDiv.appendChild(messageElement);

        const release = () => {
            toast.removeAttribute('show');
            setTimeout(() => {
                container.removeChild(toast);
            }, 300);
        };

        toast.appendChild(contentDiv);
        container.insertBefore(toast, container.firstChild);

        // Trigger reflow to enable transition
        toast.offsetHeight;
        toast.setAttribute('show', 'true');

        toast.addEventListener('click', () => release());

        if (timeout) {
            const startReleaseTimer = () => {
                toast.rtidle = setTimeout(() => {
                    release();
                }, timeout);
            }

            startReleaseTimer();
            toast.addEventListener('mouseenter', () => clearTimeout(toast.rtidle));
            toast.addEventListener('mouseleave', () => startReleaseTimer());
        }
    }
}

Toast.notify = function (message, options = {}) {
    new Toast().show(message, options);
}

window.KissToast = Toast;
