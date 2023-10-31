import { checkInitializationStatus } from "./init.js";
import { tasks } from "../database.js";

/** @param {import("../commander").Commander} commander */
export function Add(commander) {
    checkInitializationStatus();

    const taskDescription = commander.consume();
    if (!taskDescription) {
        console.error("You must provide a description.");
        return;
    }

    let checkAlreadyExists =
        tasks().query(
            (t) => t?.description === taskDescription && t?.cancelled === false
        )?.docs?.length > 0;

    const forceFlag = commander.consume();
    if (forceFlag && forceFlag === "--force") {
        checkAlreadyExists = false;
    }

    // Verify if task already exists
    if (checkAlreadyExists) {
        console.error("Task already exists.");
        return;
    }

    const task = {
        description: taskDescription,
        completed: false,
        cancelled: false,
    };

    tasks().insert(task);
    console.info("Task successfully added!");
}
