import fs from "fs";
import path from "path";
import os from "os";

export function dbPath() {
    return fs.readFileSync(path.join(os.homedir(), ".todz"), "utf-8");
}
