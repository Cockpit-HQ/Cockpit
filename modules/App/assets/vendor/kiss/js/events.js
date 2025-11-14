
// WebReflection / element-notifier
export function onMutation(callback, root) {

    let loop = function loop(nodes, added, removed, connected, pass) {

        for (let i = 0, length = nodes.length; i < length; i++) {

            let node = nodes[i];

            if (pass || 'querySelectorAll' in node) {

                if (connected) {
                    if (!added.has(node)) {
                        added.add(node);
                        removed["delete"](node);
                        callback(node, connected);
                    }
                } else if (!removed.has(node)) {
                    removed.add(node);
                    added["delete"](node);
                    callback(node, connected);
                }

                if (!pass) loop((node.shadowRoot || node)['querySelectorAll']('*'), added, removed, connected, true);
            }
        }
    };

    let observer = new MutationObserver(records => {
        for (let added = new Set(), removed = new Set(), i = 0, length = records.length; i < length; i++) {
            let _records$i = records[i],
                addedNodes = _records$i.addedNodes,
                removedNodes = _records$i.removedNodes;
            loop(removedNodes, added, removed, false, false);
            loop(addedNodes, added, removed, true, false);
        }
    });

    observer.observe(root || document, {
        subtree: true,
        childList: true
    });

    return observer;
}

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
        }, true);
    }

    return element;
};


export function trigger(ele, name, data = {}) {
    ele.dispatchEvent(new CustomEvent(name, Object.assign({bubbles: true}, data)));
}

export default {
    onMutation,
    on,
    trigger,
}
