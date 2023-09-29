#!/usr/bin/env node

import fs from "fs";

import { MycroDatabase } from "mycro-db";

const args = process.argv;

const Task = {
    id: Number(),
    description: String(),
    completed: Boolean(),
};

function __client__() {
    if (!fs.existsSync(".todz")) {
        console.error("You must initialize Todz first.");
        return;
    }

    return new MycroDatabase(fs.readFileSync(".todz", "utf-8"));
}

function __taskExist__(id) {
    return (
        __client__()
            .collection("tasks", Task)
            .query((task) => task.id === Number(id)).length === 1
    );
}

function init() {
    let path = "todz.db";

    if (args[3]) {
        const userPath = args[4];

        if (!userPath || userPath.length === 0) {
            console.error("You must provide a path.");
            return;
        }

        if (!fs.existsSync(userPath)) {
            console.error("Path does not exist.");
            return;
        }

        if (!fs.statSync(userPath).isDirectory()) {
            console.error("Path is not a directory.");
            return;
        }

        path = userPath + "\\todz.db";
    }

    fs.writeFileSync(".todz", path);

    const db = new MycroDatabase(path);
    db.collection("tasks", Task);
    db.sync();

    console.info("Todz successfully initialized!");
}

function add() {
    if (!args[3] || args[3].length === 0) {
        console.error("You must provide a description.");
        return;
    }

    const task = {
        description: args[3],
        completed: false,
    };

    const db = __client__();

    db.collection("tasks", Task).insert(task);
    db.sync();

    console.info("Task successfully added!");
}

function edit() {
    if (!args[3] || args[3].length === 0) {
        console.error("You must provide a task id.");
        return;
    }

    if (isNaN(args[3])) {
        console.error("Task id must be a number.");
        return;
    }

    if (!args[4] || args[4].length === 0) {
        console.error("You must provide a description.");
        return;
    }

    if (!__taskExist__(args[3])) {
        console.error("Task does not exist.");
        return;
    }

    const task = {
        description: args[4],
    };

    const db = __client__();

    db.collection("tasks", Task).update(
        (task) => task.id === Number(args[3]),
        task
    );
    db.sync();

    console.info("Task successfully updated!");
}

function list() {
    let filter = null;

    if (args[3]) {
        if (!args[4] || args[4]?.length === 0) {
            console.error("You must provide a filter.");
            return;
        }

        switch (args[4]) {
            case "completed":
                filter = (task) => task.completed;
                break;

            case "incomplete":
                filter = (task) => !task.completed;
                break;

            default:
                console.error("Invalid filter.");
                return;
        }
    }

    const db = __client__();

    const tasks = db.collection("tasks", Task).query(filter);

    if (tasks.length === 0) {
        console.info("No tasks found.");
        return;
    }

    tasks.forEach((task) => {
        console.log(
            `[${task.id}] ${task.description} ${
                task.completed ? "(completed)" : "(incomplete)"
            }`
        );
    });
}

function complete() {
    if (!args[3] || args[3].length === 0) {
        console.error("You must provide a task id.");
        return;
    }

    if (isNaN(args[3])) {
        console.error("Task id must be a number.");
        return;
    }

    if (!__taskExist__(args[3])) {
        console.error("Task does not exist.");
        return;
    }

    const db = __client__();

    db.collection("tasks", Task).update((task) => task.id === Number(args[3]), {
        completed: true,
    });
    db.sync();

    console.info("Task successfully marked as completed!");
}

function incomplete() {
    if (!args[3] || args[3].length === 0) {
        console.error("You must provide a task id.");
        return;
    }

    if (isNaN(args[3])) {
        console.error("Task id must be a number.");
        return;
    }

    if (!__taskExist__(args[3])) {
        console.error("Task does not exist.");
        return;
    }

    const db = __client__();

    db.collection("tasks", Task).update((task) => task.id === Number(args[3]), {
        completed: false,
    });
    db.sync();

    console.info("Task successfully marked as incomplete!");
}

function remove() {
    if (!args[3] || args[3].length === 0) {
        console.error("You must provide a task id.");
        return;
    }

    if (isNaN(args[3])) {
        console.error("Task id must be a number.");
        return;
    }

    if (!__taskExist__(args[3])) {
        console.error("Task does not exist.");
        return;
    }

    const db = __client__();

    db.collection("tasks", Task).remove((task) => task.id === Number(args[3]));
    db.sync();

    console.info("Task successfully removed!");
}

function help() {
    console.log("Todz");
}

function cli() {
    const command = args[2];

    switch (command) {
        case "init":
            init();
            break;

        case "add":
            add();
            break;

        case "edit":
            edit();
            break;

        case "list":
            list();
            break;

        case "complete":
            complete();
            break;

        case "incomplete":
            incomplete();
            break;

        case "remove":
            remove();
            break;

        default:
            help();
            break;
    }
}

cli();
