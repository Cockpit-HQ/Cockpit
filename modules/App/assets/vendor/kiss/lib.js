import "./components/accordion/accordion.js";
import "./components/carousel/carousel.js";
import "./components/dropdown/dropdown.js";
import "./components/dialog/dialog.js";
import "./components/offcanvas/offcanvas.js";
import "./components/popout/popout.js";
import "./components/parallax/parallax.js";
import "./components/sticky/sticky.js";
import "./components/svg/svg.js";
import "./components/tabs/tabs.js";
import "./components/toast/toast.js";
import "./components/tooltip/tooltip.js";
import events from "./js/events.js";
import utils from "./js/utils.js";

HTMLElement.prototype.on = function(event, selector, handler) {
    return events.on(this, event, selector, handler)
};

HTMLElement.prototype.onMutation = function(callback) {
    return events.onMutation(callback, this)
};

window.KISS = Object.assign(window.KISS || {}, {
    events,
    utils,
});

