import path from "path";

export class Commander {
    workDir;
    cliDir;
    args;

    /** @type { Object<string, Function> } */
    commands = {};

    constructor() {
        this.workDir = process.cwd();
        this.cliDir = path.parse(process.argv[1]).dir;
        this.args = process.argv.slice(2);
    }

    register(name, cmd) {
        this.commands[name] = cmd;
    }

    parse(cmd) {
        if (cmd == undefined || this.commands[cmd] == undefined) {
            return this.commands["help"](this);
        }

        return this.commands[cmd](this);
    }

    exec(cmd) {
        return this.commands[cmd](this);
    }

    consume() {
        if (this.args.length === 0) {
            return null;
        }

        return this.args.shift();
    }
}
