customElements.define('app-datetime', class extends HTMLElement {
    static get observedAttributes() {
        return [
            'datetime',      // timestamp (unix/iso)
            'type',         // 'relative' | 'date' | 'time' | 'datetime'
            'format',       // 'narrow' | 'short' | 'long' | 'full'
            'locale',       // language code
            'update-interval', // for relative time updates
            'numeric',      // 'always' | 'auto' for relative time
            'hour12',       // 'true' | 'false'
            'weekday',      // 'narrow' | 'short' | 'long'
            'era',          // 'narrow' | 'short' | 'long'
            'year',         // 'numeric' | '2-digit'
            'month',        // 'numeric' | '2-digit' | 'narrow' | 'short' | 'long'
            'day',          // 'numeric' | '2-digit'
            'hour',         // 'numeric' | '2-digit'
            'minute',       // 'numeric' | '2-digit'
            'second',       // 'numeric' | '2-digit'
            'timeZone',     // IANA time zone name
            'timeZoneName'  // 'short' | 'long'
        ];
    }

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this._interval = null;
        this._formatter = null;
    }

    connectedCallback() {
        this._initializeFormatter();
        this._startUpdating();
    }

    disconnectedCallback() {
        this._stopUpdating();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return;

        if (name === 'update-interval') {
            this._startUpdating();
        } else {
            this._initializeFormatter();
            this._update();
        }
    }

    _parseDate(datetime) {
        if (!datetime) return new Date();

        // Handle Unix timestamp (seconds or milliseconds)
        if (/^\d+$/.test(datetime)) {
            const timestamp = parseInt(datetime);
            return new Date(
                datetime.length <= 10 ? timestamp * 1000 : timestamp
            );
        }

        // Handle other formats
        return new Date(datetime);
    }

    _initializeFormatter() {
        const locale = this.getAttribute('locale') || document.documentElement.getAttribute('lang') || navigator.language;
        const type = this.getAttribute('type') || 'datetime';

        try {
            if (type === 'relative') {
                this._formatter = new Intl.RelativeTimeFormat(locale, {
                    numeric: this.getAttribute('numeric') || 'auto',
                    style: this.getAttribute('format') || 'long'
                });
            } else {
                const options = {
                    hour12: this.getAttribute('hour12') === 'true',
                    timeZone: this.getAttribute('timeZone') || 'UTC',
                };

                // Add optional formatting parameters
                ['weekday', 'era', 'year', 'month', 'day', 'hour', 'minute', 'second', 'timeZoneName']
                    .forEach(attr => {
                        const value = this.getAttribute(attr);
                        if (value) options[attr] = value;
                    });

                // Handle preset formats
                const format = this.getAttribute('format');
                if (format) {
                    if (format === 'full') {
                        options.dateStyle = 'full';
                        options.timeStyle = 'full';
                    } else if (format === 'long') {
                        options.dateStyle = 'long';
                        options.timeStyle = 'long';
                    } else if (format === 'short') {
                        options.dateStyle = 'short';
                        options.timeStyle = 'short';
                    }
                }

                // Set default formatting options if none provided
                if (!Object.keys(options).some(key => ['dateStyle', 'timeStyle', 'year', 'month', 'day', 'hour', 'minute'].includes(key))) {
                    if (type === 'date') {
                        options.year = 'numeric';
                        options.month = '2-digit';
                        options.day = '2-digit';
                    } else if (type === 'time') {
                        options.hour = '2-digit';
                        options.minute = '2-digit';
                    } else {
                        // datetime default
                        options.year = 'numeric';
                        options.month = '2-digit';
                        options.day = '2-digit';
                        options.hour = '2-digit';
                        options.minute = '2-digit';
                    }
                }

                // Force 2-digit format for day and month if they're set
                if (options.day) options.day = '2-digit';
                if (options.month && ['2-digit', 'short', 'long', 'narrow'].includes(options.month)) {
                    options.month = '2-digit';
                }

                this._formatter = new Intl.DateTimeFormat(locale, options);
            }
        } catch (e) {
            console.warn('Formatter initialization failed:', e, 'Falling back to basic format');
            this._formatter = new Intl.DateTimeFormat();
        }
    }

    _startUpdating() {
        this._stopUpdating();
        this._update();

        if (this.getAttribute('type') === 'relative') {
            const interval = parseInt(this.getAttribute('update-interval')) || 60000;
            this._interval = setInterval(() => this._update(), interval);
        }
    }

    _stopUpdating() {
        if (this._interval) {
            clearInterval(this._interval);
            this._interval = null;
        }
    }

    _padTo2Digits(num) {
        return num.toString().padStart(2, '0');
    }

    _formatDate(date) {
        if (this.getAttribute('type') === 'relative') {
            return this._formatter.format(date);
        }

        const type = this.getAttribute('type') || 'datetime';
        const format = this.getAttribute('format');

        // If a specific format is requested, use the Intl formatter
        if (format || this.getAttribute('weekday') || this.getAttribute('era') ||
            this.getAttribute('timeZone') || this.getAttribute('timeZoneName')) {
            return this._formatter.format(date);
        }

        // Otherwise use our custom formatting to ensure 2-digit display
        const day = this._padTo2Digits(date.getDate());
        const month = this._padTo2Digits(date.getMonth() + 1);
        const year = date.getFullYear();
        const hours = this._padTo2Digits(date.getHours());
        const minutes = this._padTo2Digits(date.getMinutes());

        if (type === 'date') {
            return `${day}.${month}.${year}`;
        } else if (type === 'time') {
            return `${hours}:${minutes}`;
        } else {
            return `${day}.${month}.${year}, ${hours}:${minutes}`;
        }
    }

    _update() {
        const date = this._parseDate(this.getAttribute('datetime'));
        let formattedDate;

        if (this.getAttribute('type') === 'relative') {
            const now = new Date();
            const diffInSeconds = (date - now) / 1000;

            let unit;
            let value;

            if (Math.abs(diffInSeconds) < 60) {
                unit = 'second';
                value = Math.round(diffInSeconds);
            } else if (Math.abs(diffInSeconds) < 3600) {
                unit = 'minute';
                value = Math.round(diffInSeconds / 60);
            } else if (Math.abs(diffInSeconds) < 86400) {
                unit = 'hour';
                value = Math.round(diffInSeconds / 3600);
            } else if (Math.abs(diffInSeconds) < 2592000) {
                unit = 'day';
                value = Math.round(diffInSeconds / 86400);
            } else if (Math.abs(diffInSeconds) < 31536000) {
                unit = 'month';
                value = Math.round(diffInSeconds / 2592000);
            } else {
                unit = 'year';
                value = Math.round(diffInSeconds / 31536000);
            }

            formattedDate = this._formatter.format(value, unit);
        } else {
            formattedDate = this._formatDate(date);
        }

        const span = document.createElement('span');
        span.textContent = formattedDate;

        // Always add full datetime title on hover
        const fullFormatter = new Intl.DateTimeFormat(
            this.getAttribute('locale') || document.documentElement.getAttribute('lang') || navigator.language,
            {dateStyle: 'full', timeStyle: 'full'}
        );
        span.title = fullFormatter.format(date);

        this.shadowRoot.innerHTML = '';
        this.shadowRoot.appendChild(span);
    }
});
