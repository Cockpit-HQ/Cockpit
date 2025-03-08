customElements.define('app-tags', class extends HTMLElement {
    constructor() {
        super();
        this.tags = [];
        this.selectedSuggestionIndex = -1;
        this.filteredSuggestions = [];
        this.normalizedSuggestions = [];

        this.dropdown = document.createElement('div');
        this.dropdown.className = 'app-tags-input-autocomplete-dropdown';
        this.dropdown.style.display = 'none';
        document.body.appendChild(this.dropdown);

        // Bind methods that need 'this' context
        this.updateDropdownPosition = this.updateDropdownPosition.bind(this);
        this.handleKeydown = this.handleKeydown.bind(this);
        this.updateSuggestions = this.updateSuggestions.bind(this);
        this.showDropdown = this.showDropdown.bind(this);
        this.hideDropdown = this.hideDropdown.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    static get observedAttributes() {
        return ['max-tags', 'allow-duplicates', 'min-chars', 'placeholder', 'strict-mode', 'suggestions'];
    }

    get maxTags() {
        return parseInt(this.getAttribute('max-tags')) || Infinity;
    }

    get allowDuplicates() {
        return this.hasAttribute('allow-duplicates');
    }

    get minChars() {
        return parseInt(this.getAttribute('min-chars')) || 0;
    }

    get placeholder() {
        return this.getAttribute('placeholder') || 'Type and press Enter to add tags';
    }

    get strictMode() {
        return this.hasAttribute('strict-mode');
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            switch (name) {
                case 'suggestions':
                    this.normalizeSuggestions();
                    if (this.dropdown.style.display !== 'none') {
                        this.updateSuggestions();
                    }
                    break;
                case 'placeholder':
                    if (this.input) {
                        this.input.placeholder = this.placeholder;
                    }
                    break;
                }
        }
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
        this.normalizeSuggestions();
    }

    disconnectedCallback() {
        this.dropdown.remove();
        window.removeEventListener('scroll', this.updateDropdownPosition);
        window.removeEventListener('resize', this.updateDropdownPosition);
        document.removeEventListener('click', this.handleClickOutside);
    }

    render() {
        const html = `
            <div class="app-tags-list"></div>
            <input type="text" class="app-tags-input" placeholder="${this.placeholder}">
        `;

        this.innerHTML = '';
        this.innerHTML += html;

        this.input = this.querySelector('.app-tags-input');
        this.tagList = this.querySelector('.app-tags-list');
    }

    setupEventListeners() {
        // Input events
        this.input.addEventListener('keydown', this.handleKeydown);
        this.input.addEventListener('input', this.updateSuggestions);
        this.input.addEventListener('focus', this.updateSuggestions);

        // Document and window events
        document.addEventListener('click', this.handleClickOutside);
        window.addEventListener('scroll', this.updateDropdownPosition, true);
        window.addEventListener('resize', this.updateDropdownPosition);
    }

    handleClickOutside(e) {
        if (!this.contains(e.target) && !this.dropdown.contains(e.target)) {
            this.hideDropdown();
        }
    }

    updateDropdownPosition() {
        if (this.dropdown.style.display === 'none') return;

        const inputRect = this.getBoundingClientRect();
        const dropdownHeight = this.dropdown.offsetHeight;
        const windowHeight = window.innerHeight;

        const spaceBelow = windowHeight - inputRect.bottom;
        const showBelow = spaceBelow >= Math.min(dropdownHeight, 200) || spaceBelow >= inputRect.top;

        if (showBelow) {
            this.dropdown.style.top = `${inputRect.bottom + window.scrollY}px`;
        } else {
            this.dropdown.style.top = `${inputRect.top + window.scrollY - dropdownHeight}px`;
        }

        this.dropdown.style.left = `${inputRect.left + window.scrollX}px`;
        this.dropdown.style.width = `${inputRect.width}px`;
    }

    getLabelForValue(value) {
        const suggestion = this.normalizedSuggestions.find(s => s.value === value);
        return suggestion ? suggestion.label : value;
    }

    normalizeSuggestions() {
        const suggestions = this.getSuggestions();
        this.normalizedSuggestions = suggestions.map(suggestion => {
            if (typeof suggestion === 'string') {
                return { value: suggestion, label: suggestion };
            }
            return suggestion;
        });
    }

    getSuggestions() {
        const suggestionsAttr = this.getAttribute('suggestions');
        if (suggestionsAttr) {
            try {
                return JSON.parse(suggestionsAttr);
            } catch (e) {
                // If parsing fails, treat as comma-separated string
                return suggestionsAttr.split(',').map(s => s.trim());
            }
        }
        return [];
    }

    setSuggestions(suggestions) {
        if (Array.isArray(suggestions)) {
            // Convert suggestions to string to match the attribute format
            const suggestionsString = JSON.stringify(suggestions);
            this.setAttribute('suggestions', suggestionsString);
            this.normalizeSuggestions();

            // If dropdown is open, update it
            if (this.dropdown.style.display !== 'none') {
                this.updateSuggestions();
            }

            this.setTags(this.getTags());
        } else {
            throw new Error('Suggestions must be an array');
        }
    }

    handleKeydown(e) {
        switch (e.key) {
            case 'Enter':
                e.preventDefault();
                if (this.selectedSuggestionIndex !== -1) {
                    this.addTag(this.filteredSuggestions[this.selectedSuggestionIndex].value);
                } else if (!this.strictMode) {
                    const inputValue = this.input.value.trim();
                    if (inputValue) {
                        this.addTag(inputValue);
                    }
                }
                break;
            case 'Backspace':
                if (this.input.value === '') {
                    this.removeLastTag();
                }
                break;
            case 'ArrowDown':
                e.preventDefault();
                this.moveSelection(1);
                break;
            case 'ArrowUp':
                e.preventDefault();
                this.moveSelection(-1);
                break;
            case 'Escape':
                this.hideDropdown();
                break;
            case 'Tab':
                if (this.selectedSuggestionIndex !== -1) {
                    e.preventDefault();
                    this.addTag(this.filteredSuggestions[this.selectedSuggestionIndex].value);
                }
                break;
        }
    }

    updateSuggestions() {
        const value = this.input.value.trim().toLowerCase();

        if (value.length < this.minChars) {
            this.hideDropdown();
            return;
        }

        this.filteredSuggestions = this.normalizedSuggestions.filter(suggestion => {
            const matchesSearch = !value || suggestion.label.toLowerCase().includes(value) ||
                                suggestion.value.toLowerCase().includes(value);
            const notDuplicate = this.allowDuplicates || !this.tags.includes(suggestion.value);
            return matchesSearch && notDuplicate;
        });

        if (this.filteredSuggestions.length === 0) {
            this.hideDropdown();
            return;
        }

        this.selectedSuggestionIndex = -1;
        this.showDropdown();
    }

    showDropdown() {
        this.dropdown.style.display = 'block';
        this.renderDropdown();
        this.updateDropdownPosition();
    }

    hideDropdown() {
        this.dropdown.style.display = 'none';
        this.selectedSuggestionIndex = -1;
    }

    renderDropdown() {
        this.dropdown.innerHTML = this.filteredSuggestions
            .map((suggestion, index) => `
                <div class="app-tags-autocomplete-item ${index === this.selectedSuggestionIndex ? 'selected' : ''}"
                     data-index="${index}">
                    ${suggestion.label}
                </div>
            `)
            .join('');

        this.dropdown.querySelectorAll('.app-tags-autocomplete-item').forEach(item => {
            item.addEventListener('click', () => {
                const index = parseInt(item.dataset.index);
                this.addTag(this.filteredSuggestions[index].value);
            });
        });
    }

    moveSelection(direction) {
        if (this.filteredSuggestions.length === 0) return;

        this.selectedSuggestionIndex += direction;

        if (this.selectedSuggestionIndex >= this.filteredSuggestions.length) {
            this.selectedSuggestionIndex = 0;
        } else if (this.selectedSuggestionIndex < 0) {
            this.selectedSuggestionIndex = this.filteredSuggestions.length - 1;
        }

        this.renderDropdown();

        // Ensure selected item is visible in dropdown
        const selectedItem = this.dropdown.children[this.selectedSuggestionIndex];
        if (selectedItem) {
            selectedItem.scrollIntoView({ block: 'nearest' });
        }
    }

    addTag(value) {
        if (!value) return;

        if (this.tags.length >= this.maxTags) {
            this.dispatchEvent(new CustomEvent('tag-error', {
                detail: { message: 'Maximum tags limit reached' }
            }));
            return;
        }

        if (!this.allowDuplicates && this.tags.includes(value)) {
            this.dispatchEvent(new CustomEvent('tag-error', {
                detail: { message: 'Duplicate tag' }
            }));
            return;
        }

        const tagElement = document.createElement('div');
        tagElement.className = 'app-tags-tag';
        tagElement.innerHTML = `
            <span class="app-tags-tag-text">${this.getLabelForValue(value)}</span>
            <span class="app-tags-tag-remove">×</span>
        `;

        tagElement.querySelector('.app-tags-tag-remove').addEventListener('click', () => {
            this.removeTag(value);
            tagElement.remove();
        });

        this.tagList.appendChild(tagElement);
        this.tags.push(value);

        this.input.value = '';
        this.hideDropdown();

        this.dispatchEvent(new CustomEvent('tags-changed', {
            detail: { tags: this.tags }
        }));
    }

    removeTag(value) {
        const index = this.tags.indexOf(value);
        if (index > -1) {
            this.tags.splice(index, 1);
            this.dispatchEvent(new CustomEvent('tags-changed', {
                detail: { tags: this.tags }
            }));
        }
    }

    removeLastTag() {
        if (this.tags.length > 0) {
            const lastTag = this.tags[this.tags.length - 1];
            this.removeTag(lastTag);
            this.tagList.lastElementChild.remove();
        }
    }

    // Public API methods
    getTags() {
        return [...this.tags];
    }

    setTags(tags) {
        this.tags = [];
        this.tagList.innerHTML = '';
        tags.forEach(tag => {
            const value = typeof tag === 'string' ? tag : tag.value;
            this.addTag(value);
        });
    }

    clearTags() {
        this.tags = [];
        this.tagList.innerHTML = '';
        this.dispatchEvent(new CustomEvent('tags-changed', {
            detail: { tags: this.tags }
        }));
    }
});
