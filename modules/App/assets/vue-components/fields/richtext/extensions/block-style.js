import { blockStyleNodeName } from '../config.js';

// Creates a block node for a configured style, e.g. { tag: 'p', class: 'TitleLarge', look: 'h2' }
// saves <p class="TitleLarge">...</p> and is displayed like an h2 inside the editor only.
export function createBlockStyle(style) {

    const { Node, mergeAttributes } = window.VueTiptap;
    const classes = style.class ? { class: style.class } : {};
    const selector = style.tag + style.class.split(' ').filter(Boolean).map(cls => `.${CSS.escape(cls)}`).join('');

    const config = {
        name: blockStyleNodeName(style.name),
        group: 'block',
        content: 'inline*',
        defining: true,

        parseHTML() {
            // higher than the default rule priority (50), so <p class="..."> is not parsed as paragraph
            return [{ tag: selector, priority: 60 }];
        },

        renderHTML({ HTMLAttributes }) {
            return [style.tag, mergeAttributes(HTMLAttributes, classes), 0];
        },
    };

    if (style.look) {

        // editor-only rendering, getHTML() keeps using renderHTML()
        config.addNodeView = () => ({ node, HTMLAttributes }) => {

            const dom = document.createElement(style.look);
            const attrs = mergeAttributes(HTMLAttributes, classes, { 'data-block-style': style.name });

            Object.entries(attrs).forEach(([key, value]) => {
                if (value !== null && value !== undefined) dom.setAttribute(key, value);
            });

            return {
                dom,
                contentDOM: dom,
                // re-create the view when attributes (e.g. text align) change
                update: updatedNode => updatedNode.sameMarkup(node),
            };
        };
    }

    return Node.create(config);
}
