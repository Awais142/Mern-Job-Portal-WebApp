import express from "express";
import {
  login,
  register,
  getUser,
  logout,
  updatePassword,
} from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/getUser", isAuthenticated, getUser);
router.get("/logout", isAuthenticated, logout);
router.put("/update-password", isAuthenticated, updatePassword);

export default router;
