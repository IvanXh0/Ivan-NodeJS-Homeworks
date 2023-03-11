import express from "express";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import studentRoutes from "./routes/student.routes.js";
import trainerRoutes from "./routes/trainer.routes.js";

// WORKAROUND for __filename and __dirname with ES6 imports
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//PATHS
const staticPageOne = path.join(__dirname, "static-page");
const publicFolder = path.join(__dirname, "public");

const PORT = 3000;
const HOSTNAME = "localhost";

const app = express();

app.use(express.json());

app.use(cors());

// Providing APIs
app.use("/api", studentRoutes);
app.use("/api", trainerRoutes);

// Providing a static page
app.use("/static-page", express.static(staticPageOne));
app.use("/home", express.static(publicFolder));

app.listen(PORT, HOSTNAME, () => {
  console.log(`Server started listening on http://${HOSTNAME}:${PORT}`);
});

// CRUD

// C - Create - POST
// R - Read - GET
// U - Update - PUT - PATCH
// D - Delete - DELETE
