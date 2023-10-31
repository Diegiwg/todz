import { MycroDatabase, JsonStorage } from "mycro-db";
import { dbPath } from "./utils.js";

const db = new MycroDatabase(new JsonStorage(dbPath()));
const Tasks = db.collection("task", {
    id: Number,
    description: String,
    completed: Boolean,
    cancelled: Boolean,
});

export function tasks() {
    return Tasks;
}
