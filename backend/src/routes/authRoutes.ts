import express from "express";
import { register, verifyOTP, login, resetPassword } from "../controllers/authControllers"
import { protect } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/register", register);
router.post("/verify-otp", verifyOTP);
router.post("/login", login);
router.post("/reset-password", protect, resetPassword);

export default router;
