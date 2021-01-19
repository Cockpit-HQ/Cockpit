customElements.define('kiss-parallax', class extends HTMLElement {

    connectedCallback() {

        let $this = this;

        this.speed = .3
        this.mobilePx = 450
        this.mobileDisable = this.getAttribute('mobile') == 'false';
        this.conditions = []
        this.active = true

        this.transform = this.getAttribute('transform') || 'translateY';

        this.winHeight = window.innerHeight
        this.accumulated = 0
        this.getRect()

        this.startScroll = this.targetR.top - this.winHeight > 0
          ? this.targetR.top - this.winHeight
          : 0

        window.addEventListener('scroll', event => {
            requestAnimationFrame(() => {
                if ($this.mobileDisable && window.innerWidth < this.mobilePx) return

                if ($this.active) {
                  $this.update()
                }
            })
        })
    }

    // HELPERS
    scrollY() {
        return window.scrollY || window.pageYOffset;
    }

    getTranslation() {
        const dist = this.scrollY() - this.startScroll;
        const translation = (dist * this.speed) + this.accumulated;
        return translation >= 0 ? translation : 0;
    }

    getRect() {
        this.targetR = this.getBoundingClientRect();
        return this.targetR;
    }

    inWindow() {
        this.getRect()

        const top = this.targetR.top;
        const bottom = this.targetR.bottom;

        return top < this.winHeight && bottom > 0;
    }

    update() {

        if (this._isHidden()) {
            return;
        }

        let translate = this.getTranslation();
        let percent = ((translate / this.speed)/this.winHeight) * 100;

        if (percent < 0) percent = 0;
        if (percent > 100) percent = 100;

        let style = {transform : '', filter: ''}, mod;

        this.transform.split(' ').forEach(prop => {

            mod = prop.split('*');
            prop = mod[0];
            mod = Number(mod[1] || 1);

            switch (prop) {
                case 'translateX':
                case 'translateY':
                    style.transform += ` ${prop}(${(translate * mod)}px)`;
                    break;

                case 'rotate':
                case 'rotateX':
                case 'rotateY':
                    style.transform += ` ${prop}(${(translate * mod)}deg)`;
                    break;

                case 'opacity':
                    style.opacity = (mod < 0 ?  (percent/100) : 1 - (percent/100)) * Math.abs(mod);
                    break;
            }
        });

        Object.assign(this.style, style);
    }

    _isHidden() {
        return (this.offsetTop === null)
    }
});
