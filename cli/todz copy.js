#!/usr/bin/env node

import fs from "fs";

import { MycroDatabase } from "mycro-db";
import { safeNumber, safeString } from "typx";

const args = process.argv;

const Task = {
    id: Number(),
    description: String(),
    completed: Boolean(),
};

function __client__() {
    if (!fs.existsSync(".todz")) {
        console.error("You must initialize Todz first.");
        process.exit();
    }

    return new MycroDatabase(fs.readFileSync(".todz", "utf-8"));
}

function __taskExist__(id) {
    return (
        __client__()
            .collection("tasks", Task)
            .query((task) => task.id === id).length === 1
    );
}

function init() {
    // Verificar se foi passado a flag --path
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

    // Salvar o caminho para a Database
    fs.writeFileSync(".todz", path);

    // Criar a Database
    const db = new MycroDatabase(path);

    // Criar a Collection
    db.collection("tasks", Task);

    // Salvar a Database
    db.sync();

    console.info("Todz successfully initialized!");

    // TODO: Verificar se já existe uma Database, e se sim, avisar e pedir confirmação de sobrescrita.
}

function add() {
    let taskDescription;
    try {
        taskDescription = safeString(args[3]);
    } catch (error) {
        console.error("You must provide a description.");
        return;
    }

    const task = {
        description: taskDescription.get,
        completed: false,
    };

    const db = __client__();

    db.collection("tasks", Task).insert(task);
    db.sync();

    console.info("Task successfully added!");
}

function edit() {
    let taskId;
    try {
        taskId = safeNumber(Number(args[3])).get;
    } catch {
        console.error("You must provide a task id.");
        return;
    }

    if (!__taskExist__(taskId)) {
        console.error("Task does not exist.");
        return;
    }

    let taskDescription;
    try {
        taskDescription = safeString(args[4]);
    } catch (error) {
        console.error("You must provide a description.");
        return;
    }

    const task = {
        description: taskDescription.get,
    };

    const db = __client__();

    db.collection("tasks", Task).update((task) => task.id === taskId, task);
    db.sync();

    console.info("Task successfully updated!");
}

function list() {
    let filter = null;

    const flag = args[3] === "--status";
    const flagArg = args[4]?.length === 0 ? args[4] : null;

    if (flag && flagArg) {
        switch (flagArg) {
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
    let taskId;
    try {
        taskId = safeNumber(Number(args[3])).get;
    } catch {
        console.error("You must provide a task id.");
        return;
    }

    if (!__taskExist__(taskId)) {
        console.error("Task does not exist.");
        return;
    }

    const db = __client__();

    db.collection("tasks", Task).update((task) => task.id === taskId, {
        completed: true,
    });
    db.sync();

    console.info("Task successfully marked as completed!");
}

function incomplete() {
    let taskId;
    try {
        taskId = safeNumber(Number(args[3])).get;
    } catch {
        console.error("You must provide a task id.");
        return;
    }

    if (!__taskExist__(taskId)) {
        console.error("Task does not exist.");
        return;
    }

    const db = __client__();

    db.collection("tasks", Task).update((task) => task.id === taskId, {
        completed: false,
    });
    db.sync();

    console.info("Task successfully marked as incomplete!");
}

function remove() {
    let taskId;
    try {
        taskId = safeNumber(Number(args[3])).get;
    } catch {
        console.error("You must provide a task id.");
        return;
    }

    if (!__taskExist__(taskId)) {
        console.error("Task does not exist.");
        return;
    }

    const db = __client__();

    db.collection("tasks", Task).remove((task) => task.id === taskId);
    db.sync();

    console.info("Task successfully removed!");
}

function help() {
    console.log("Todz");
}

function cli() {
    const command = args[2];

    const commands = {
        init,
        add,
        edit,
        list,
        complete,
        incomplete,
        remove,
        help,
    };

    if (!commands[command]) {
        return help();
    }

    commands[command]();
}

cli();
