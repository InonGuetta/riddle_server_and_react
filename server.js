import express from "express";
import dotenv from "dotenv";
import configRoutes from "./routes/configRoutes.js";
import toPlayers from "./routes/players.routes.js";
import sequelize from './config/db.config.js';
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const server = express();
server.use(cors());
server.use(express.json());
configRoutes(server);

try {
    await sequelize.sync();
    console.log("PostgreSQL connected and synced");
} catch (error) {
    console.error("PostgreSQL connection failed:", error.message);
}

toPlayers(server);

server.get('/api', (req, res) => {
  res.json({ message: 'Server is running!' });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log("Server running on port", PORT);
});
