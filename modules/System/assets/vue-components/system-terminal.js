

export default {

    data() {
        return {
            terminal: null,
            command: ''
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
        ], () => {

            this.terminal =  new Terminal({
                fontSize: 13,
                fontFamily: '"Cascadia Code", Menlo, monospace',
                cursorBlink: true,
            });

            this.terminal.open(this.$refs.terminal);

            this.terminal.onData(e => {

                switch (e) {
                    case '\u0003': // Ctrl+C

                        break;
                    case '\r': // Enter
                        this.run(this.command);
                        break;
                    case '\u007F': // Backspace (DEL)
                        // Do not delete the prompt
                        if (this.terminal._core.buffer.x > 2) {
                            this.terminal.write('\b \b');
                            if (this.command.length > 0) {
                                this.command = this.command.substr(0, this.command.length - 1);
                            }
                        }
                        break;
                    default: // Print all other characters
                        if (e >= String.fromCharCode(0x20) && e <= String.fromCharCode(0x7E) || e >= '\u00a0') {
                        this.command += e;
                        this.terminal.write(e);
                        }
                    }
            });

            this.terminal.prompt = () => {
                this.terminal.write('\r\n\x1b[32m$\x1b[0m ');
            };

            const fitAddon = new FitAddon.FitAddon();
            this.terminal.loadAddon(fitAddon);
            fitAddon.fit();

            this.terminal.writeln('\r\nHello 👋  Welcome to the Tower terminal.\r\n');
            this.terminal.prompt();
            this.terminal.focus();
        });
    },

    methods: {

        run(command) {

            if (command) {
                this.command = command;
            }

            if (this.command === 'clear') {
                this.command = '';
                this.terminal.prompt();
                this.terminal.clear();
                return;
            }

            this.terminal.writeln('');

            this.$request('/system/tower/exec', {command: this.command}).then(resp => {
                this.terminal.write(`\r\n${resp.output}\r\n`);
                this.terminal.prompt();
            });

            this.command = '';
        }
    },

    template: /*html*/`
    <div class="system-terminal">
        <div ref="terminal" :style="{height:height+'px'}"></div>
    </div>`
}
