import fs from "fs";
import path from "path";

/** @param {import("../commander").Commander} commander */
export function Help(commander) {
    const version = fs.readFileSync(
        path.join(commander.cliDir, "version"),
        "utf-8"
    );

    console.log(`Todz CLI - v${version}`);
}
