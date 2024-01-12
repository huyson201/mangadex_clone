"use server";

import { mailOptions, transporter } from "@/config/nodemailer";
import { prisma } from "@/lib";
import {
    createMailVerificationTemplate,
    generateVerifyMailToken,
} from "@/lib/utils";
export const sendVerifyEmail = async (userId: string) => {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return;

    // generate a verify token
    const verifyMailToken = await generateVerifyMailToken({
        email: user.email,
        _id: user.id.toString(),
        username: user.username,
    });

    // save verify token to db
    user.verifyCode = verifyMailToken;
    await prisma.user.update({
        where: { id: userId },
        data: {
            verifyCode: verifyMailToken,
        },
    });

    // send email to user
    await transporter.sendMail({
        from: mailOptions.from,
        to: user.email,
        subject: "MangaDex Verify Email",
        html: createMailVerificationTemplate(
            `${
                process.env.VERCEL_URL || process.env.SITE_URL
            }/verify-email?token=${verifyMailToken}`
        ),
    });
};
