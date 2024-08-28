import { Request, Response } from "express";
import { User } from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import env from "../util/validateEnv";
import { sendOTP } from "../util/sendEmail";
import { IUser } from "../models/user"; 

interface AuthRequest extends Request {
    user?: IUser;
}

// User registration controller
export const register = async (req: Request, res: Response) => {
    const { email, password, name, gender } = req.body;

    if (!email || !password || !name || !gender) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({ email, password, name, gender });
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;

    await user.save();
    await sendOTP(email, otp);

    res.status(201).json({ message: "User registered, please verify OTP" });
};

// OTP verification controller
export const verifyOTP = async (req: Request, res: Response) => {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user || user.otp !== otp) {
        return res.status(400).json({ message: "Invalid OTP" });
    }

    user.isVerified = true;
    user.otp = undefined;
    await user.save();

    const token = jwt.sign({ id: user._id }, env.JWT_SECRET, { expiresIn: "30d" });
    res.json({ token });
};

// User login controller
export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ message: "Invalid email or password" });
    }

    if (!user.isVerified) {
        return res.status(400).json({ message: "Please verify your email before logging in" });
    }

    const token = jwt.sign({ id: user._id }, env.JWT_SECRET, { expiresIn: "30d" });
    res.json({ token });
};

// Password reset controller
export const resetPassword = async (req: AuthRequest, res: Response) => {
    const { currentPassword, newPassword } = req.body;
    const user = req.user;

    if (!user) {
        return res.status(401).json({ message: "Unauthorized, no user found" });
    }

    // Check if current password matches
    if (!(await bcrypt.compare(currentPassword, user.password))) {
        return res.status(400).json({ message: "Current password is incorrect" });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.json({ message: "Password updated successfully" });
};
