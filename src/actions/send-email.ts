"use server";
import connectDb from "@/lib/mongodb";

import { auth } from "@/auth";
import { User } from "@/models/user";
import {
    createMailVerificationTemplate,
    generateVerifyMailToken,
} from "@/lib/utils";
import { mailOptions, transporter } from "@/config/nodemailer";

export const sendVerifyEmail = async (userId: string) => {
    await connectDb();
    const user = await User.findById(userId);
    if (!user) return;

    // generate a verify token
    const verifyMailToken = await generateVerifyMailToken({
        email: user.email,
        _id: user._id.toString(),
        username: user.username,
    });

    // save verify token to db
    user.verifyCode = verifyMailToken;
    await user.save();

    // send email to user
    await transporter.sendMail({
        from: mailOptions.from,
        to: user.email,
        subject: "MangaDex Verify Email",
        html: createMailVerificationTemplate(
            `http://localhost:3000/verify-email?token=${verifyMailToken}`
        ),
    });

    console.log("send verify mail success!");
};
