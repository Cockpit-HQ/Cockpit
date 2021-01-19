export function on(element, name, delegate, fn) {

    if (!fn) {
       element.addEventListener(name, arguments[2]);
    } else {
        element.addEventListener(name, function (e) {

            let target = e.target;

            while (target !== element) {

                if (!target) {
                    break;
                }

                if (target.matches(delegate)){
                    return fn.apply(target, arguments);
                }
                
                target = target.parentNode;
            }
        });
    }

    return element;
};
