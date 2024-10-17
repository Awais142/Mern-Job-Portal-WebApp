import express from "express";
import { login, register, getUser } from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/getUser", isAuthenticated, getUser);

export default router;
