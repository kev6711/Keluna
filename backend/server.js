import "dotenv/config";
import express from "express";
import { connectDB } from "./src/config/db.js";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/api/health", (req, res) => {
    res.status(200).json({
        status: "ok",
        message: "Keluna API is running",
    });
});

const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

startServer();
