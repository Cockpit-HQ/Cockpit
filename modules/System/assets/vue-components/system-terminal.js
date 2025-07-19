export default {

    data() {
        return {
            terminal: null,
            command: '',
            cursorIndex: 0,
            commandHistory: [],
            historyIndex: -1,
            resizeHandler: null,
            historyStorageKey: 'cockpit-tower-history',
            maxHistorySize: 1000,
        }
    },

    props: {
        height: {
            type: Number,
            default: 400
        }
    },

    mounted() {
        this.loadCommandHistory();
        App.assets.require([
            'system:assets/vendor/xterm/xterm.js',
            'system:assets/vendor/xterm/xterm-addon-fit.js',
            'system:assets/vendor/xterm/xterm.css',
        ], this.initializeTerminal, this.handleError);
    },

    methods: {
        initializeTerminal() {
            this.terminal = new Terminal({
                fontSize: 13,
                fontFamily: '"Cascadia Code", Menlo, monospace',
                cursorBlink: true,
                allowProposedApi: true,
            });

            this.terminal.open(this.$refs.terminal);

            this.terminal.onData(this.handleTerminalInput);

            // Set up keyboard shortcuts
            this.terminal.attachCustomKeyEventHandler((event) => {
                if (event.type === 'keydown' && event.ctrlKey) {
                    switch (event.key) {
                        case 'v': // Paste
                            this.handlePaste();
                            return false;
                        case 'l': // Clear screen
                            this.terminal.clear();
                            return false;
                        case 'u': // Clear line before cursor
                            this.command = this.command.slice(this.cursorIndex);
                            this.cursorIndex = 0;
                            this.updateInput();
                            return false;
                        case 'k': // Clear line after cursor
                            this.command = this.command.slice(0, this.cursorIndex);
                            this.updateInput();
                            return false;
                        case 'a': // Move to start of line
                            this.cursorIndex = 0;
                            this.updateInput();
                            return false;
                        case 'e': // Move to end of line
                            this.cursorIndex = this.command.length;
                            this.updateInput();
                            return false;
                        case 'w': // Delete word before cursor
                            const beforeCursor = this.command.slice(0, this.cursorIndex);
                            const lastSpaceIndex = beforeCursor.lastIndexOf(' ');
                            if (lastSpaceIndex === -1) {
                                this.command = this.command.slice(this.cursorIndex);
                                this.cursorIndex = 0;
                            } else {
                                this.command = this.command.slice(0, lastSpaceIndex + 1) + this.command.slice(this.cursorIndex);
                                this.cursorIndex = lastSpaceIndex + 1;
                            }
                            this.updateInput();
                            return false;
                    }
                }
                return true;
            });

            this.terminal.prompt = () => {
                this.command = '';
                this.cursorIndex = 0;
                this.historyIndex = this.commandHistory.length;
                this.terminal.write('\r\n\x1b[32m$\x1b[0m ');
            };

            const fitAddon = new FitAddon.FitAddon();
            this.terminal.loadAddon(fitAddon);
            fitAddon.fit();

            this.resizeHandler = () => fitAddon.fit();
            window.addEventListener('resize', this.resizeHandler);

            this.terminal.writeln('\r\nHello 👋  Welcome to the Tower terminal.\r\n');
            this.terminal.prompt();
            this.terminal.focus();

            // Handle paste events
            this.$refs.terminal.addEventListener('paste', (e) => {
                e.preventDefault();
                const text = e.clipboardData.getData('text');
                if (text) {
                    this.command = this.command.slice(0, this.cursorIndex) + text + this.command.slice(this.cursorIndex);
                    this.cursorIndex += text.length;
                    this.updateInput();
                }
            });
        },

        handleTerminalInput(e) {
            switch (e) {
                case '\u0003': // Ctrl+C
                    this.resetCommand();
                    this.terminal.prompt();
                    break;
                case '\r': // Enter
                    this.run(this.command);
                    break;
                case '\u007F': // Backspace (DEL)
                    if (this.cursorIndex > 0) {
                        this.command = this.command.slice(0, this.cursorIndex - 1) + this.command.slice(this.cursorIndex);
                        this.cursorIndex--;
                        this.updateInput();
                    }
                    break;
                case '\x1b[D': // Left arrow
                    if (this.cursorIndex > 0) {
                        this.cursorIndex--;
                        this.terminal.write('\x1b[D');
                    }
                    break;
                case '\x1b[C': // Right arrow
                    if (this.cursorIndex < this.command.length) {
                        this.cursorIndex++;
                        this.terminal.write('\x1b[C');
                    }
                    break;
                case '\x1b[A': // Up arrow
                    this.navigateHistoryUp();
                    break;
                case '\x1b[B': // Down arrow
                    this.navigateHistoryDown();
                    break;
                default:
                    if (e >= String.fromCharCode(0x20) && e <= String.fromCharCode(0x7E) || e >= '\u00a0') {
                        this.command = this.command.slice(0, this.cursorIndex) + e + this.command.slice(this.cursorIndex);
                        this.cursorIndex++;
                        this.updateInput();
                    }
            }
        },

        updateInput() {
            this.terminal.write('\x1b[2K\r\x1b[32m$\x1b[0m ' + this.command);
            this.terminal.write('\x1b[' + (this.cursorIndex + 3) + 'G');
        },

        navigateHistoryUp() {
            if (this.historyIndex > 0) {
                this.historyIndex--;
                this.command = this.commandHistory[this.historyIndex] || '';
                this.cursorIndex = this.command.length;
                this.updateInput();
            }
        },

        navigateHistoryDown() {
            if (this.historyIndex < this.commandHistory.length - 1) {
                this.historyIndex++;
                this.command = this.commandHistory[this.historyIndex] || '';
            } else {
                this.command = '';
                this.historyIndex = this.commandHistory.length;
            }
            this.cursorIndex = this.command.length;
            this.updateInput();
        },

        run(command) {
            if (command) {
                this.command = command;
            }

            this.addToHistory(this.command);

            if (this.command === 'clear') {
                this.command = '';
                this.terminal.prompt();
                this.terminal.clear();
                return;
            }

            if (this.command === 'help' || this.command === '?') {
                this.terminal.writeln('');
                this.terminal.writeln('\r\nKeyboard Shortcuts:');
                this.terminal.writeln('\r\n  Ctrl+L   Clear screen');
                this.terminal.writeln('\r\n  Ctrl+U   Clear line before cursor');
                this.terminal.writeln('\r\n  Ctrl+K   Clear line after cursor');
                this.terminal.writeln('\r\n  Ctrl+A   Move to start of line');
                this.terminal.writeln('\r\n  Ctrl+E   Move to end of line');
                this.terminal.writeln('\r\n  Ctrl+W   Delete word before cursor');
                this.terminal.writeln('\r\n  Ctrl+V   Paste from clipboard');
                this.terminal.writeln('\r\n  Ctrl+C   Cancel current command');
                this.terminal.writeln('\r\n  ↑/↓      Navigate command history');
                this.terminal.writeln('\r\n\r\nCommands:');
                this.terminal.writeln('\r\n  clear    Clear the terminal');
                this.terminal.writeln('\r\n  help     Show this help message');
                this.terminal.prompt();
                return;
            }

            this.terminal.writeln('');

            this.$request('/system/tower/exec', { command: this.command })
                .then(resp => {
                    if (resp.error) {
                        this.terminal.write(`\r\nError: ${resp.error}\r\n`);
                    } else {
                        this.terminal.write(`\r\n${resp.output}\r\n`);
                    }
                    this.terminal.prompt();
                })
                .catch(err => {
                    this.terminal.write(`\r\nCommand execution failed: ${err.message}\r\n`);
                    this.terminal.prompt();
                });

            this.command = '';
            this.cursorIndex = 0;
        },

        addToHistory(command) {
            if (command && command.trim()) {
                // Remove duplicate if exists
                const existingIndex = this.commandHistory.indexOf(command);
                if (existingIndex !== -1) {
                    this.commandHistory.splice(existingIndex, 1);
                }

                this.commandHistory.push(command);

                // Limit history size
                if (this.commandHistory.length > this.maxHistorySize) {
                    this.commandHistory.shift();
                }

                this.historyIndex = this.commandHistory.length;
                this.saveCommandHistory();
            }
        },

        loadCommandHistory() {
            try {
                const saved = localStorage.getItem(this.historyStorageKey);
                if (saved) {
                    this.commandHistory = JSON.parse(saved);
                    this.historyIndex = this.commandHistory.length;
                }
            } catch (err) {
                console.warn('Failed to load command history:', err);
                this.commandHistory = [];
            }
        },

        saveCommandHistory() {
            try {
                localStorage.setItem(this.historyStorageKey, JSON.stringify(this.commandHistory));
            } catch (err) {
                console.warn('Failed to save command history:', err);
            }
        },

        resetCommand() {
            this.command = '';
            this.cursorIndex = 0;
        },

        handlePaste() {
            navigator.clipboard.readText()
                .then(text => {
                    if (text) {
                        // Insert pasted text at cursor position
                        this.command = this.command.slice(0, this.cursorIndex) + text + this.command.slice(this.cursorIndex);
                        this.cursorIndex += text.length;
                        this.updateInput();
                    }
                })
                .catch(err => {
                    console.warn('Failed to read clipboard:', err);
                });
        },


        handleError(err) {
            console.error('Failed to load assets:', err);
        }
    },

    beforeDestroy() {
        if (this.resizeHandler) {
            window.removeEventListener('resize', this.resizeHandler);
        }
        if (this.terminal) {
            this.terminal.dispose();
        }
    },

    template: /*html*/`
    <div class="system-terminal">
        <div ref="terminal" :style="{height: height + 'px'}"></div>
    </div>`
}
