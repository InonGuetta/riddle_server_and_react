import { createRiddle, fetchAllRiddles, deleteRiddleByQuestion, updateRiddleById } from "../DAL/riddels.js";

export async function getAllRiddles(req, res) {
    try {
        const data = await fetchAllRiddles();
        res.json(data);
    } catch (error) {
        console.error("Error getting riddles:", error.message);
        res.status(500).json({ msg: "Server error. Please try again later." });
    }
}

export async function addRiddle(req, res) {
    try {
        const { name, taskDescription, correctAnswer } = req.body;
        if (!name || !taskDescription || !correctAnswer) {
            return res.status(400).json({ msg: "All fields are required." });
        }

        const newRiddle = await createRiddle({ name, taskDescription, correctAnswer });
        res.status(201).json(newRiddle);
    } catch (error) {
        console.error("Error adding riddle:", error.message);
        res.status(500).json({ msg: "Server error. Please try again later." });
    }
}

export async function deleteRiddle(req, res) {
    try {
        const { taskDescription } = req.body;
        if (!taskDescription) {
            return res.status(400).json({ msg: "taskDescription not found" });
        }
        const result = await deleteRiddleByQuestion(taskDescription);
        res.status(200).json({ msg: "riddle deleted successfully.", deleted: result.deletedCount });
    } catch (error) {
        res.status(500).json({ msg: "server error. please try again later." })
    }
}

export async function updateRiddle(req, res) {
    const { id, name, taskDescription, correctAnswer } = req.body;

    console.log("id:", id);
    console.log("name:", name);
    console.log("taskDescription:", taskDescription);
    console.log("correctAnswer:", correctAnswer);

    const newRiddle = await updateRiddleById(id, { name, correctAnswer, taskDescription });
    res.json({ message: "Riddle updated" });
}
