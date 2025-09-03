import { connect } from "../config/mongo.config.js"
import { ObjectId } from "mongodb";
const db = await connect()

export async function fetchAllRiddles() {
    try {
        const data = await db.collection("riddles").find().toArray()
        console.log(data);
        return data
    } catch (err) {
        console.log(`your err is: ${err}`);
        throw new Error("Could not retrieve riddles from the database")
    }
}

export async function createRiddle(riddle) {
    try {
        const result = await db.collection("riddles").insertOne(riddle);
        return result.insertedId;
    } catch (err) {
        console.error(`Error creating riddle: ${err}`);
        throw new Error("Could not insert new riddle");
    }
}

export async function deleteRiddleByQuestion(riddleToDelete) {
    try {
        const result = await db.collection("riddles").deleteOne({ taskDescription: riddleToDelete });
        if (result.deletedCount === 0) {
            throw new Error("the riddle not found");
        }
        return result;
    } catch (err) {
        console.error(`Error deleting riddle: ${err}`);
        throw new Error("Could not delete the riddle");
    }
}

export async function updateRiddleById(id, newRiddle) {
    try {
        const result = await db.collection("riddles").updateOne(
            { _id: new ObjectId(id) },
            { $set: newRiddle }
        );
        if (result.matchedCount === 0) {
            throw new Error("the riddle not found");
        }
        return result;
    } catch (err) {
        console.error(`Error updating riddle: ${err}`);
        throw new Error("Could not update the riddle");
    }
}
