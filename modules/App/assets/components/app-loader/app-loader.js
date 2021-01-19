customElements.define('app-loader', class extends HTMLElement {

    static get observedAttributes() {
        return ['label', 'mode']; 
    }

    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(oldvalue, newvalue) {
        if (oldvalue != newvalue)this.render();
    }

    render() {

        let template;
        let mode = this.getAttribute('mode');

        switch (mode) {
            case 'dots':
                template = '<div></div><div></div><div></div><div></div>';
                break;
            default:

                if (mode !== 'orbit') {
                    this.setAttribute('mode', 'orbit');
                }

                template = '<div><div></div><div></div><div></div></div>';
        }

        this.innerHTML = template;
    }
});

customElements.define('app-loader-cover', class extends HTMLElement {

    static get observedAttributes() {
        return ['label', 'mode']; 
    }

    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <div>
            <app-loader></app-loader>
            <div class="app-loader-cover-label"></div> 
        </div>
        `;

        this.label = this.querySelector('.app-loader-cover-label');
        this.loader = this.querySelector('app-loader');

        this.render();
    }

    attributeChangedCallback() {
        this.render();
    }

    render() {

        this.label.innerText = this.getAttribute('label') || '';
        this.loader.setAttribute('mode', this.getAttribute('mode'));
    }
});