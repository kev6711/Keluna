import express from "express";
import { createProfile } from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/profile", authMiddleware, createProfile);

export default router;
