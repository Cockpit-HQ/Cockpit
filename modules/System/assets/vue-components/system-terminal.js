export default {

    data() {
        return {
            terminal: null,
            command: '',
            cursorIndex: 0,
            commandHistory: [],
            historyIndex: -1,
        }
    },

    props: {
        height: {
            type: Number,
            default: 400
        }
    },

    mounted() {
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
            });

            this.terminal.open(this.$refs.terminal);

            this.terminal.onData(this.handleTerminalInput);

            this.terminal.prompt = () => {
                this.command = '';
                this.cursorIndex = 0;
                this.historyIndex = this.commandHistory.length;
                this.terminal.write('\r\n\x1b[32m$\x1b[0m ');
            };

            const fitAddon = new FitAddon.FitAddon();
            this.terminal.loadAddon(fitAddon);
            fitAddon.fit();

            window.addEventListener('resize', () => fitAddon.fit());

            this.terminal.writeln('\r\nHello 👋  Welcome to the Tower terminal.\r\n');
            this.terminal.prompt();
            this.terminal.focus();
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
            if (command) {
                this.commandHistory.push(command);
                this.historyIndex = this.commandHistory.length;
            }
        },

        resetCommand() {
            this.command = '';
            this.cursorIndex = 0;
        },

        handleError(err) {
            console.error('Failed to load assets:', err);
        }
    },

    beforeDestroy() {
        window.removeEventListener('resize', this.fitTerminal);
    },

    template: /*html*/`
    <div class="system-terminal">
        <div ref="terminal" :style="{height: height + 'px'}"></div>
    </div>`
}
