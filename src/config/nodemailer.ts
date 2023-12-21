import nodemailer from "nodemailer";

const emailAddress = process.env.EMAIL_ADDRESS;
const password = process.env.EMAIL_PASSWORD;

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: emailAddress,
        pass: password,
    },
});

export const mailOptions = {
    from: emailAddress,
};
