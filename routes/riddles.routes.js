import express from "express";
import { getAllRiddles, addRiddle, deleteRiddle, updateRiddle } from "../controllers/riddles.controllers.js";

const router = express.Router();

router.get("/riddles", getAllRiddles);
router.post("/add-riddle", addRiddle);
router.delete("/delete-riddle", deleteRiddle);
router.put("/update-riddle", updateRiddle);

export default router;
