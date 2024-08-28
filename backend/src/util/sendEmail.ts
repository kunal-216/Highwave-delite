import nodemailer from "nodemailer";
import env from "./validateEnv";

const transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: false,
    auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
    },
});

export const sendOTP = async (email: string, otp: string) => {
    await transporter.sendMail({
        from: env.SMTP_USER,
        to: email,
        subject: "Your OTP Code",
        text: `Your OTP code is ${otp}`,
    });
};