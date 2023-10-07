
let register = [];

document.addEventListener('scroll', () => {

    if (!register.length) return;

    const stickies = document.querySelectorAll('kiss-sticky, [data-sticky="true"]');
    let stickyHeight = 0;

    stickies.forEach((sticky, idx) => {

        const offset = parseInt(sticky.getAttribute('data-offset')) || 0;

        sticky.style.top = (stickyHeight + offset) + 'px';

        if (sticky.getBoundingClientRect().top <= stickyHeight + offset) {
            sticky.style.zIndex = stickies.length - idx;
        } else {
            sticky.style.zIndex = 0;
        }

        stickyHeight += sticky.offsetHeight + offset;
    });
});

customElements.define('kiss-sticky', class extends HTMLElement {

    connectedCallback() {
        register.push(this);
    }

    disconnectedCallback() {
        register.slice(register.indexOf(this), 1);
    }
});
