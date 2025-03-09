

export function debounce(func, wait, immediate) {

    let timeout;

    return function () {
        let context = this, args = arguments;
        let later = () => {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        let callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

export function isInViewport(element, partly = false) {

    let rect = element.getBoundingClientRect();

    // If partly is false, check if the element is fully in the viewport
    if (partly === false) {
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Calculate the visible percentage of the element
    let visibleHeight = Math.min(rect.bottom, window.innerHeight || document.documentElement.clientHeight) -
        Math.max(rect.top, 0);
    let visibleWidth = Math.min(rect.right, window.innerWidth || document.documentElement.clientWidth) -
        Math.max(rect.left, 0);

    // Ensure that the dimensions are not negative
    visibleHeight = Math.max(visibleHeight, 0);
    visibleWidth = Math.max(visibleWidth, 0);

    // Calculate the percentage of the element that is visible
    let visiblePercentage = (visibleHeight * visibleWidth) / (rect.height * rect.width) * 100;

    // If partly is between 0 and 100, check if the visible percentage of the element is >= partly
    return (partly > 0 && partly <= 100) && visiblePercentage >= partly;
}

export function isElementInView(element, container = null) {
    // Find the closest scrollable parent if no container is specified
    if (!container) {
        container = document.body;
    }

    // If we still don't have a container, use the viewport
    if (!container) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= window.innerHeight &&
            rect.right <= window.innerWidth
        );
    }

    // Regular container check
    const containerRect = container.getBoundingClientRect();
    const containerTop = container.scrollTop;
    const containerBottom = containerTop + container.clientHeight;

    const elementRect = element.getBoundingClientRect();
    const elementTop = elementRect.top - containerRect.top + container.scrollTop;
    const elementBottom = elementTop + element.clientHeight;

    return (
        elementBottom > containerTop &&
        elementTop < containerBottom
    );
}

export function isElementOnTop(element) {
    const rect = element.getBoundingClientRect();
    let topElement = document.elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2);
    while (topElement && topElement.parentElement) {
        if (topElement === element) {
            return true;
        }
        topElement = topElement.parentElement;
    }
    return false;
}

export function setHighestZindex(element, max = 19998) {

    let highestZindex = parseInt(getComputedStyle(element).zIndex) || 0,
        offsetParent = element.offsetParent || document.body,
        zIndex;

    Array.from(offsetParent.children).forEach((node) => {
        zIndex = parseInt(getComputedStyle(node).zIndex) || 0;

        if (max > 0 && zIndex > max) {
            return;
        }

        if (zIndex > highestZindex) highestZindex = zIndex;
    });

    if (max > 0 && highestZindex >= max) {
        highestZindex = max;
    }

    element.style.zIndex = highestZindex + 1;
}


export default {
    debounce,
    isInViewport,
    isElementInView,
    isElementOnTop,
    setHighestZindex,
}
