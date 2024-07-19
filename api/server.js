import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;
connectDB();
app.listen(port, () => console.log(`Listening on port ${port}`));
