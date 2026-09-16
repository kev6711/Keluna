import "dotenv/config";
import cors from "cors";
import express from "express";
import { connectDB } from "./src/config/db.js";
import auth from "./src/routes/auth.routes.js";
import userRoutes from "./src/routes/user.routes.js";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(
    cors({
        origin: process.env.FRONTEND_URL,
    }),
);

app.use(express.json());

app.use("/api/auth", auth);
app.use("/api/users", userRoutes);

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
