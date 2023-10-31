import { checkInitializationStatus } from "./init.js";
import { tasks } from "../database.js";

function showTask(task) {
    const completed = task.cancelled ? "[C]" : task.completed ? "[V]" : "[ ]";
    return `${task.id}: ${completed} ${task.description}`;
}

/** @param {import("../commander").Commander} commander */
export function List(commander) {
    checkInitializationStatus();

    let tasksList;

    const subCommand = commander.consume() || "";
    switch (subCommand) {
        case "--status":
            const filter = commander.consume();
            if (!filter) {
                console.error("You must provide a status filter.");
                return;
            }

            switch (filter) {
                case "completed":
                    tasksList = tasks().query((task) => task.completed);
                    break;

                case "incomplete":
                    tasksList = tasks().query((task) => !task.completed);
                    break;

                case "cancelled":
                    tasksList = tasks().query((task) => task.cancelled);
                    break;

                default:
                    console.error(`The '${filter}' is not a valid filter.`);
                    return;
            }

            break;

        default:
            break;
    }

    if (!tasksList) tasksList = tasks().query((t) => !t.cancelled);

    if (tasksList.docs.length === 0) {
        console.info("No tasks found.");
        return;
    }

    for (const task of tasksList.docs) {
        console.info(showTask(task));
    }
}
