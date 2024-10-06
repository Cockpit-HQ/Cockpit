

customElements.define('app-textcomplete', class extends HTMLElement {

    constructor() {
        super();
        this.itemList = [];
        this.triggerChar = '@';
        this.isAutocompleteActive = false;
    }

    static get observedAttributes() {
        return ['items', 'trigger'];
    }

    connectedCallback() {
        this.input = this.querySelector('input, textarea');

        if (!this.input) {
            this.input = document.createElement('input');
            this.input.type = 'text';
            this.input.placeholder = 'Enter text...';
            this.appendChild(this.input);
        }

        this.autocompleteList = document.createElement('div');
        this.autocompleteList.className = 'app-textcomplete-autocomplete-list';

        this.input.addEventListener('input', this.handleInput.bind(this));
        this.input.addEventListener('keydown', this.handleKeyDown.bind(this));
        document.addEventListener('click', this.handleClickOutside.bind(this));

        this.updateItems();
        this.updateTrigger();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'items') {
            this.updateItems();
        } else if (name === 'trigger') {
            this.updateTrigger();
        }
    }

    updateItems() {
        const itemsAttr = this.getAttribute('items');
        this.itemList = itemsAttr ? itemsAttr.split(',').map(s => s.trim()) : [];
    }

    updateTrigger() {
        const triggerAttr = this.getAttribute('trigger');
        this.triggerChar = triggerAttr ? triggerAttr : '@';
    }

    handleInput(e) {
        const cursorPosition = e.target.selectionStart;
        const inputValue = e.target.value;
        const lastTriggerIndex = inputValue.lastIndexOf(this.triggerChar, cursorPosition);

        if (lastTriggerIndex !== -1 && lastTriggerIndex === cursorPosition - 1) {
            this.showItems(this.itemList);
        } else if (lastTriggerIndex !== -1) {
            const currentWord = inputValue.slice(lastTriggerIndex + 1, cursorPosition);
            const filteredItems = this.itemList.filter(item =>
                item.toLowerCase().startsWith(currentWord.toLowerCase())
            );
            this.showItems(filteredItems);
        } else {
            this.hideItems();
        }
    }

    showItems(items) {

        this.autocompleteList.innerHTML = '';

        if (items.length === 0) {
            this.hideItems();
            return;
        }

        // Append autocomplete list to body
        document.body.appendChild(this.autocompleteList);

        const rect = this.input.getBoundingClientRect();

        Object.assign(this.autocompleteList.style, {
            top: `${rect.bottom + window.scrollY}px`,
            left: `${rect.left + window.scrollX}px`,
            width: `${rect.width}px`,
        });

        items.forEach(item => {
            const div = document.createElement('div');
            div.textContent = item;
            div.className = 'autocomplete-item';
            div.addEventListener('click', () => this.selectItem(item));
            this.autocompleteList.appendChild(div);
        });

        this.autocompleteList.style.display = 'block';
        this.isAutocompleteActive = true;
        this.setAttribute('active', 'true');
    }

    hideItems() {
        this.autocompleteList.style.display = 'none';
        this.isAutocompleteActive = false;
        this.setAttribute('active', '');

        if (this.autocompleteList.parentNode) {
            this.autocompleteList.parentNode.removeChild(this.autocompleteList);
        }
    }

    selectItem(item) {
        const cursorPosition = this.input.selectionStart;
        const inputValue = this.input.value;
        const lastTriggerIndex = inputValue.lastIndexOf(this.triggerChar, cursorPosition);

        const newValue = inputValue.slice(0, lastTriggerIndex) + item + inputValue.slice(cursorPosition);
        this.input.value = newValue;
        this.input.focus();
        const newCursorPosition = lastTriggerIndex + item.length;
        this.input.setSelectionRange(newCursorPosition, newCursorPosition);
        this.hideItems();
    }

    handleKeyDown(e) {
        if (!this.isAutocompleteActive) return;

        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            const items = this.autocompleteList.getElementsByClassName('autocomplete-item');
            if (items.length === 0) return;

            const activeItem = this.autocompleteList.querySelector('.autocomplete-item.active');
            let nextItem;

            if (!activeItem) {
                nextItem = e.key === 'ArrowDown' ? items[0] : items[items.length - 1];
            } else {
                activeItem.classList.remove('active');
                const currentIndex = Array.from(items).indexOf(activeItem);
                const nextIndex = e.key === 'ArrowDown'
                    ? (currentIndex + 1) % items.length
                    : (currentIndex - 1 + items.length) % items.length;
                nextItem = items[nextIndex];
            }

            nextItem.classList.add('active');
            nextItem.scrollIntoView({ block: 'nearest' });
        } else if (e.key === 'Enter') {
            const activeItem = this.autocompleteList.querySelector('.autocomplete-item.active');
            if (activeItem) {
                e.preventDefault();
                e.stopImmediatePropagation();
                this.selectItem(activeItem.textContent);
            }
        } else if (e.key === ' ' || e.key === 'Escape') {
            this.cancelAutocomplete();
        }
    }

    cancelAutocomplete() {
        this.hideItems();
        // Remove any partial input after the trigger character
        const cursorPosition = this.input.selectionStart;
        const inputValue = this.input.value;
        const lastTriggerIndex = inputValue.lastIndexOf(this.triggerChar, cursorPosition);
        if (lastTriggerIndex !== -1) {
            this.input.value = inputValue.slice(0, lastTriggerIndex + 1);
            this.input.setSelectionRange(lastTriggerIndex + 1, lastTriggerIndex + 1);
        }
    }

    handleClickOutside(e) {
        if (!this.contains(e.target)) {
            this.hideItems();
        }
    }
});
