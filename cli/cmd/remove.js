import { checkInitializationStatus } from "./init.js";
import { tasks } from "../database.js";

/** @param {import("../commander").Commander} commander */
export function Remove(commander) {
    checkInitializationStatus();

    const taskId = commander.consume();
    if (!taskId) {
        console.error("You must provide a task id.");
        return;
    }

    if (isNaN(taskId)) {
        console.error("Task id must be a number.");
        return;
    }

    const task = tasks().get(taskId);
    if (task.length === 0) {
        console.error("Task does not exist.");
        return;
    }

    tasks().remove([taskId]);
    console.info("Task successfully removed!");
}
