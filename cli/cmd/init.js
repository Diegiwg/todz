import fs from "fs";
import path from "path";
import os from "os";
import { MycroDatabase, JsonStorage } from "mycro-db";

/** @param {import("../commander").Commander} commander  */
export function Init(commander) {
    let filePath = path.join(os.homedir(), "todz.db");

    // Try get the --path flag
    const pathFlag = commander.consume();
    if (pathFlag && pathFlag === "--path") {
        const userPath = commander.consume();
        if (!userPath) {
            console.log("You must provide a path.");
            process.exit(1);
        }

        // Check if path is valid
        if (!fs.existsSync(userPath)) {
            console.log("Path does not exist.");
            process.exit(1);
        }

        // Check if path is a directory
        if (!fs.statSync(userPath).isDirectory()) {
            console.error("Path is not a directory.");
            return;
        }

        filePath = path.join(userPath, "todz.db");
    }

    // Create .todz
    fs.writeFileSync(path.join(os.homedir(), ".todz"), filePath);

    // Create the database file
    const storage = new JsonStorage(filePath);
    const db = new MycroDatabase(storage);

    db.collection("task", null);
}

export function checkInitializationStatus() {
    if (!fs.existsSync(path.join(os.homedir(), ".todz"))) {
        console.error("You must initialize Todz first.", "\nTry `todz help`");
        process.exit(1);
    }
}
