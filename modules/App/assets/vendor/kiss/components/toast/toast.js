class Toast {
    constructor() {
        this.container = null;
        this.createContainer();
    }

    createContainer() {

        if (document.querySelector('.kiss-toast-containe')) {
            return;
        }

        this.container = document.createElement('div');
        this.container.classList.add('kiss-toast-container');
        document.body.appendChild(this.container);
    }

    show(message, options = {}) {

        const {
            type = 'info',
            timeout = 2500,
            info = '',
        } = options;

        const toast = document.createElement('div');
        const contentDiv = document.createElement('div');
        const messageElement = document.createElement('div');

        toast.classList.add('kiss-toast');
        toast.setAttribute('type', type);

        contentDiv.classList.add('kiss-toast-content');

        messageElement.classList.add('kiss-toast-message');
        messageElement.textContent = message;
        contentDiv.appendChild(messageElement);

        if (info) {
            const infoElement = document.createElement('div');
            infoElement.classList.add('kiss-toast-info');
            infoElement.textContent = info;
            contentDiv.appendChild(infoElement);
        }

        const release = () => {
            toast.removeAttribute('show');
            setTimeout(() => {
                this.container.removeChild(toast);
            }, 300);
        };

        toast.appendChild(contentDiv);
        this.container.insertBefore(toast, this.container.firstChild);

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
