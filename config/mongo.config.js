import { config } from "dotenv"
import { MongoClient, Db } from "mongodb"
config()

const client = new MongoClient(process.env.URL_MONGO || "mongodb://localhost:27017")

/**
 * @type {Db | null}
 */
let db = null;

/**
 * @returns {Promise<Db>}
 */

export async function connect() {
    if (!db) {
        try {
            await client.connect()
            db = client.db("riddles_db");
            console.log("Connected to MongoDB");
        } catch (error) {
            console.error("MongoDB connection failed:", error.message);
            console.log("Server will run without database connection");
            return null;
        }
    }
    return db;
}
