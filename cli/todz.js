#!/usr/bin/env node

import { Commander } from "./commander.js";
import { Help } from "./cmd/help.js";
import { Init } from "./cmd/init.js";
import { Add } from "./cmd/add.js";
import { List } from "./cmd/list.js";
import { Remove } from "./cmd/remove.js";
import { Cancel } from "./cmd/cancel.js";

function cli() {
    const commander = new Commander();

    commander.register("init", Init);
    commander.register("help", Help);

    commander.register("add", Add);
    commander.register("remove", Remove);
    commander.register("edit", null);
    commander.register("list", List);
    commander.register("complete", null);
    commander.register("incomplete", null);
    commander.register("cancel", Cancel);

    const cmd = commander.consume();
    if (!cmd) {
        commander.exec("help");
        process.exit(1);
    }

    commander.parse(cmd);
}

cli();
