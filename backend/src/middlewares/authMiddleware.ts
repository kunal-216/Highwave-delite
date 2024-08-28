import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { User } from "../models/user";
import env from "../util/validateEnv";
import { IUser } from "../models/user";

interface AuthRequest extends Request {
    user?: IUser; 
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
        try {
            const decoded = jwt.verify(token, env.JWT_SECRET) as { id: string };
            const user = await User.findById(decoded.id).select("-password");
            if (!user) {
                return res.status(401).json({ message: "User not found" });
            }
            req.user = user;
            next();
        } catch (error) {
            res.status(401).json({ message: `Not authorized, token failed: ${(error as Error).message}` });
        }
    } else {
        res.status(401).json({ message: "Not authorized, no token" });
    }
};
